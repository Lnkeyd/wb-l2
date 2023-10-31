import MenuBar from "../menuBar/MenuBar";
import Modal from "../modal/Modal";
import Tasks from "../tasks/Tasks";
import styles from "./home.module.css";
import { useState } from "react";

const Home = () => {
  const todoArr = JSON.parse(localStorage.getItem("todo-arr"));
  const [tasks, setTasks] = useState(!!todoArr === true ? todoArr : []);

  // Если есть задачи из LS, то отображаем их
  const [modal, setModal] = useState(false);

  return (
    <>
      {modal && <Modal setModal={setModal} setTasks={setTasks} tasks={tasks} />}
      <div className={styles.container}>
        <MenuBar
          setModal={setModal}
          setTasks={setTasks}
          tasks={tasks}
        />
        <Tasks tasks={tasks} setTasks={setTasks} />
      </div>
    </>
  );
};

export default Home;
