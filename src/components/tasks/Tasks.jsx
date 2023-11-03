import PropTypes from "prop-types";
import styles from "./tasks.module.css";
import SingleTask from "../singleTask/SingleTask";

const Tasks = ({ tasks, setTasks, setModal }) => {

  return (
    <div className={styles.container}>
      {tasks.map((item, index) => (
        <SingleTask key={index} item={item} setTasks={setTasks} setModal={setModal}/>
      ))}
    </div>
  );
};

Tasks.propTypes = {
  tasks: PropTypes.array.isRequired,
  setTasks: PropTypes.func.isRequired,
  setModal: PropTypes.func.isRequired,
};

export default Tasks;
