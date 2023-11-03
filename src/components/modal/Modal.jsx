import styles from "./modal.module.css";
import PropTypes from "prop-types";
import { useState } from "react";
import { checkTaskValid } from "../../utils/checkTaskValid";
import { regSubscription } from "../../utils/resSubscription";
import { removeNotification } from "../../utils/removeNotification";

const Modal = ({ setModal, setTasks, tasks, modal }) => {
  const [todo, setTodo] = useState({});
  const [titleErr, setTitleErr] = useState("");
  const [deadlineErr, setDeadlineErr] = useState("");

  async function createTodo(todo) {
    // Добавляем timestamp создания
    todo.createdAt = Date.now();
    todo.checked = false;
    // Сеттим задачу в LS
    const todoArr = JSON.parse(localStorage.getItem("todo-arr"));
    // Если есть ещё старые задачи в LS
    if (!!todoArr === true) {
      localStorage.setItem("todo-arr", JSON.stringify([...todoArr, todo]));
    } else {
      //   Если задача - первая и до неё никаких задач не создавалось
      localStorage.setItem("todo-arr", JSON.stringify([todo]));
    }

    await removeNotification(todo.createdAt);
    await regSubscription(todo);
    setTasks([...tasks, todo]);
  }

  async function updateTodo(id, todo) {
    
    const todoArr = JSON.parse(localStorage.getItem("todo-arr"));
    const index = todoArr.findIndex((item) => item.createdAt === id);
    todoArr[index] = { ...todo, createdAt: id };

    console.log(todoArr[index])
    localStorage.setItem("todo-arr", JSON.stringify(todoArr));
    setTasks(todoArr);

    await removeNotification(id);
    todoArr[index].checked === false ? await regSubscription(todoArr[index]) : ''
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // Проверка, ввёл ли пользователь значения тайтла и дедлайна
    const err = checkTaskValid(todo);
    // Если не прошли проверку
    if (!err.pass) {
      setTitleErr(err.title);
      setDeadlineErr(err.deadline);
      return;
    } else {
      // Если всё хорошо
      (await modal.mode) === "create"
        ? createTodo(todo)
        : updateTodo(modal.id, todo);

      // Выключаем/обнуляем модалку
      setModal({
        isShow: false,
        id: null,
        mode: "",
      });
    }
  }

  return (
    <div className={styles.modal}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>
          {modal.mode === "create" ? "Добавить задачу" : "Редактировать задачу"}
        </h2>
        <label className={styles.label}>
          Название
          {titleErr && <span className={styles.error}>{titleErr}</span>}
          <input
            className={styles.input}
            id="input-title"
            type="text"
            placeholder="Название"
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          />
        </label>
        <label className={styles.label}>
          Описание
          <input
            className={styles.input}
            id="input-description"
            type="text"
            placeholder="Описание"
            onChange={(e) => setTodo({ ...todo, description: e.target.value })}
          />
        </label>
        <label className={styles.label}>
          Срок выполнения:
          {deadlineErr && <span className={styles.error}>{deadlineErr}</span>}
          <input
            className={styles.input}
            type="datetime-local"
            onChange={(e) =>
              setTodo({ ...todo, deadline: new Date(e.target.value).getTime() })
            }
          />
        </label>
        <div className={styles.buttons}>
          <button
            onClick={() => setModal(false)}
            className={styles.buttonCancel}
            type="button"
          >
            Отмена
          </button>
          <button className={styles.buttonCreate} type="submit">
            Создать
          </button>
        </div>
      </form>
    </div>
  );
};

Modal.propTypes = {
  setModal: PropTypes.func.isRequired,
  setTasks: PropTypes.func.isRequired,
  tasks: PropTypes.array.isRequired,
  modal: PropTypes.object,
};

export default Modal;
