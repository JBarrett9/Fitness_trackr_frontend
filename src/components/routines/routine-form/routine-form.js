import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createRoutine, updateRoutine } from "../../../api/routines";
import "./routine-form.css";

const RoutineForm = (props) => {
  const [name, setName] = useState();
  const [goal, setGoal] = useState();
  const [isPublic, setIsPublic] = useState(false);
  const [method, setMethod] = useState("post");
  const [routine, setRoutine] = useState({});
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      const { routine } = location.state;
      setRoutine(routine);
      setName(routine.name);
      setGoal(routine.goal);
      setIsPublic(routine.isPublic);
      setMethod("patch");
    }
  }, []);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (method === "post") {
      createRoutine(
        { name, goal, isPublic },
        props.token,
        navigate,
        props.setMessage
      );
    } else {
      updateRoutine(
        routine.id,
        { name, goal, isPublic },
        props.token,
        navigate,
        props.setMessage
      );
    }
  };

  const handleCheck = () => {
    setIsPublic(!isPublic);
  };

  return (
    <form className="routine-form" onSubmit={(e) => handleSubmit(e)}>
      <h2>New Routine</h2>
      <label>Routine Name: </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <label>Goal: </label>
      <textarea
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
      ></textarea>
      <span>
        <label>Make Public </label>
        <input checked={isPublic} onChange={handleCheck} type="checkbox" />
      </span>
      <button>{routine.name ? "Update Routine" : "Create Routine"}</button>
    </form>
  );
};

export default RoutineForm;
