export const checkTaskValid = (task) => {
  const extraFiveMinutes = 1000 * 60 * 5;
  const err = {pass: true, title: "", deadline: "" };
  const timestamp = Date.now().valueOf();

  if (!task.title?.replace(" ", "")) {
    err.title = "Заполните поле";
    err.pass = false;
  }
  if (!task.deadline) {
    err.deadline = "Заполните дату";
    err.pass = false;
  } else if (task.deadline <= timestamp) {
    err.deadline = "Отрицательный дедлайн";
    err.pass = false;
  } else if (task.deadline <= timestamp + extraFiveMinutes) {
    err.deadline = "Слишком короткий дедлайн";
    err.pass = false;
  }
  return err;
};
