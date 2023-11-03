import { urlBase64ToUint8Array } from "./base64Convert";

const PUBLIC_KEY =
  "BF-QXShM0r6TbtVfpmEWk9oh-VgDS1UV0hS-pw2_SEuROpLm6JAqDu5UxqIBO0C7SlJ8AyYspDIBvVO6oQd-WJM";

async function saveSubscription(subscription, todo) {
  const response = await fetch("http://localhost:5174/save-subscription", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify({ sub: subscription, todo: todo }),
  });

  return await response.json();
}

export async function regSubscription(todo) {
  const threeHours = 1000 * 60 * 5;
  
  // Пользователь снова подписался на пуш,
  // например пометил задачу как выполненную, но потом передумал и анчекнул,
  // следовательно, надо бы опять засеттить пуш-уведомление
  // но дедлайн итак близко, поэтому пуш не отправляем
  if (Date.now().valueOf() >= (todo.deadline - threeHours))
    return console.log("Уведомлять пользователя не нужно");

  const registerWorker = await navigator.serviceWorker.ready;
  const subscription = await registerWorker.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(PUBLIC_KEY),
  });

  const response = await saveSubscription(subscription, todo);
  console.log(response);
}
