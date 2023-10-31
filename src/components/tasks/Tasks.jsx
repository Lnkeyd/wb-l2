import PropTypes from "prop-types";
import styles from "./tasks.module.css";
import SingleTask from "../singleTask/SingleTask";

const Tasks = ({ tasks, setTasks }) => {
  console.log('Rendered!')
  return (
    <div className={styles.container}>
      {tasks.map((item, index) => (
        <SingleTask key={index} item={item} setTasks={setTasks}/>
      ))}
    </div>
  );
};

Tasks.propTypes = {
  tasks: PropTypes.array.isRequired,
  setTasks: PropTypes.func.isRequired
};

export default Tasks;
