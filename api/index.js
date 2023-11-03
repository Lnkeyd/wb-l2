/* eslint-disable no-undef */
const webpush = require("web-push");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 5174;

app.use(cors());
app.use(express.json());

// Можно сгенерировать свои ключи
// npx web-push generate-vapid-keys
const apiKeys = {
  publicKey:
    "BF-QXShM0r6TbtVfpmEWk9oh-VgDS1UV0hS-pw2_SEuROpLm6JAqDu5UxqIBO0C7SlJ8AyYspDIBvVO6oQd-WJM",
  privateKey: "yzZUWgxmodTQrjKMKxa37fxFiLrf7UCaCnlPsssfTZo",
};

let tasksArr = [];

webpush.setVapidDetails(
  "mailto:evgeniykozlovfordev@gmail.com",
  apiKeys.publicKey,
  apiKeys.privateKey
);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.post("/save-subscription", (req, res) => {
  const { sub, todo } = req.body;
  // console.log(sub);
  // console.log(todo);

  // Пять минут для наглядности, в продакшене можно использовать алгоритм
  // наподобие, чем дальше дедлайн, тем за более раннее время уведомлять пользователя
  // (таким образом, если пользователь поставит задачу через 3 часа и забудет, то уведомления
  // всё же сработают, например, за 40 минут до дедлайна)
  // или же придумать серию уведомлений

  // const threeHours = 1000 * 60 * 1; - для тестов в дебаге (1 мин)
  const threeHours = 1000 * 60 * 5; // для тестов в разработке (5 мин)
  const time = todo.deadline - todo.createdAt - threeHours;
  // Если обновляем задачу, то удаляем пуш-уведомление на предыдущей версии
  // const task = tasksArr.find((item) => item.todo.createdAt === todo.createdAt);
  // if (task) {
  //   console.log(task.timer);
  //   clearTimeout(task.timer);
  //   tasksArr = tasksArr.filter(
  //     (item) => item.todo.createdAt !== todo.createdAt
  //   );

  //   console.log("Предыдущий тайм-аут был уничтожен");
  //   console.log(task.timer);
  // }
  // CСкорее всего код выше придётся стирать

  // За 3 часа до дедлайна
  // const threeHours = 1000 * 60 * 60 * 3
  const timer = setTimeout(() => {
    webpush.sendNotification(sub, JSON.stringify({ title: todo.title }));
    tasksArr = tasksArr.filter(
      (item) => item.todo.createdAt !== todo.createdAt
    );
    console.log(tasksArr);
  }, time);
  tasksArr.push({ todo, timer });

  console.log(tasksArr);
  return res
    .status(200)
    .json("Подписка на уведомления успешно зарегистрирована");
});

// Отменить пуш, вызывается при Check и Delete Events на фронте
app.post("/cancel-notification", async (req, res) => {
  const { id } = await req.body;
  if (!id) return res.status(400).json("Нет идентификатора");

  // Ищем по createdAt нужную задачу
  const task = tasksArr.find((item) => item.todo.createdAt === id);
  if (!task) return res.status(200).json("Такого уведомления не найдено");

  clearTimeout(task.timer);
  tasksArr = tasksArr.filter((item) => item.todo.createdAt !== id);

  return res.status(200).json("Пуш-уведомление задачи отменено");
});

app.listen(port, () => {
  console.log("Server is running");
});
