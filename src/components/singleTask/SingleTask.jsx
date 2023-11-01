import PropTypes from "prop-types";
import styles from "./singleTask.module.css";
import Checked from "../svg/checked";
import Unchecked from "../svg/unchecked";
import Trash from "../svg/trash";
import { convertDateTime } from "../../utils/convertDate";
import { useState } from "react";

const SingleTask = ({ item, setTasks, setModal }) => {
  const [checked, setChecked] = useState(item.checked);

  // Изменяем чекбокс в UI и сеттим в LS
  function handleCheck(e) {
    e.preventDefault();

    // Находить будем по createdAt, т.к.
    // время создания в любом случае является уникальным
    const arr = JSON.parse(localStorage.getItem("todo-arr"));
    const todoIndex = arr.findIndex(
      (storageItem) => storageItem.createdAt === item.createdAt
    );
    arr[todoIndex].checked = !checked;
    setChecked(!checked);
    localStorage.setItem("todo-arr", JSON.stringify(arr));
  }

  //   При удалении фильтруем изначальный массив в LS
  function handleDelete(e) {
    e.preventDefault();

    const arr = JSON.parse(localStorage.getItem("todo-arr"));
    const filtered = arr.filter(
      (storageItem) => storageItem.createdAt !== item.createdAt
    );
    localStorage.setItem("todo-arr", JSON.stringify(filtered));
    setTasks(filtered);
  }

  function handleUpdate() {
    setModal({
      isShow: true,
      id: item.createdAt,
      mode: "update",
    });
  }

  return (
    <li className={styles.container}>
      <div className={styles.check} onClick={handleCheck}>
        {checked ? <Checked /> : <Unchecked />}
      </div>
      <div className={styles.mainText} onClick={handleUpdate}>
        <h3>{item.title}</h3>
        {item.description && <p>{item.description}</p>}
      </div>
      <div className={styles.date}>
        до {convertDateTime(item.deadline / 1000)}
      </div>
      <div className={styles.trash} onClick={handleDelete}>
        <Trash />
      </div>
    </li>
  );
};

SingleTask.propTypes = {
  item: PropTypes.object.isRequired,
  setTasks: PropTypes.func.isRequired,
  setModal: PropTypes.func.isRequired,
};

export default SingleTask;
