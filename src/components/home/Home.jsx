import MenuBar from "../menuBar/MenuBar";
import Modal from "../modal/Modal";
import Tasks from "../tasks/Tasks";
import styles from "./home.module.css";
import { useState } from "react";

const Home = () => {
  const todoArr = JSON.parse(localStorage.getItem("todo-arr"));
  const [tasks, setTasks] = useState(!!todoArr === true ? todoArr : []);

  // Если есть задачи из LS, то отображаем их
  const [modal, setModal] = useState({
    isShow: false,
    id: null,
    mode: "",
  });

  return (
    <>
      {modal.isShow && <Modal setModal={setModal} setTasks={setTasks} tasks={tasks} modal={modal} />}
      <div className={styles.container}>
        <MenuBar setModal={setModal} setTasks={setTasks} tasks={tasks}/>
        <Tasks tasks={tasks} setTasks={setTasks} setModal={setModal}/>
      </div>
    </>
  );
};

export default Home;
