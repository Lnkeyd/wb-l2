import styles from "./modal.module.css";
import PropTypes from "prop-types";
import { useState } from "react";

const Modal = ({ setModal, setTasks, tasks }) => {
  const [todo, setTodo] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: Тут должна быть проверка, ввёл ли пользователь значения тайтла и дедлайна

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
    setTasks([...tasks, todo]);
    setModal(false);
  }

  return (
    <div className={styles.modal}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Добавить задачу</h2>
        <label className={styles.label}>
          Название
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
};

export default Modal;
