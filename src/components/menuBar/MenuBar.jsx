import PropTypes from "prop-types";
import styles from "./menuBar.module.css";
import { useState } from "react";

const MenuBar = ({ setModal, setTasks, tasks }) => {
  const [activeSelect, setActiveSelect] = useState("sort-creation");

  const sortTasks = (callback) => {
    console.log(activeSelect);
    const newArr = JSON.parse(JSON.stringify(tasks));
    // Здесь можно добавить оптимизаци, на случай
    // если пользователь дважды нажимает одну и ту же сортировку
    setTasks(newArr.sort(callback));
    localStorage.setItem("todo-arr", JSON.stringify(newArr));
  };

  return (
    <div className={styles.menuBar}>
      <label className={styles.label}>
        Сортировать по:
        <select
          onChange={(e) => {
            setActiveSelect(e.target.name);
            e.target.value === "new-first"
              ? sortTasks((a, b) => a.createdAt - b.createdAt)
              : sortTasks((a, b) => b.createdAt - a.createdAt);
          }}
          className={styles.select}
          name="sort-creation"
          style={{
            backgroundColor: activeSelect === "sort-creation" ? "#cedaff" : "",
          }}
        >
          <option value="new-first">Дате создания (сначала новые)</option>
          <option value="old-first">Дате создания (сначала старые)</option>
        </select>
        <select
          onChange={(e) => {
            setActiveSelect(e.target.name);
            e.target.value === "new-first"
              ? sortTasks((a, b) => a.deadline - b.deadline)
              : sortTasks((a, b) => b.deadline - a.deadline);
          }}
          className={styles.select}
          name="sort-deadline"
          style={{
            backgroundColor: activeSelect === "sort-deadline" ? "#cedaff" : "",
          }}
        >
          <option value="new-first">Сроку выполнения (срок ближе)</option>
          <option value="old-first">Сроку выполнения (срок дальше)</option>
        </select>
      </label>
      <button
        className={styles.button}
        onClick={() =>
          setModal({
            isShow: true,
            id: null,
            mode: "create",
          })
        }
      >
        + Создать запись
      </button>
    </div>
  );
};

MenuBar.propTypes = {
  setModal: PropTypes.func.isRequired,
  setTasks: PropTypes.func.isRequired,
  tasks: PropTypes.array.isRequired,
};

export default MenuBar;
