import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  deleteRoutine,
  deleteRoutineActivity,
  updateRoutineActivity,
} from "../../../api/routines";
import "./routine.css";

const Routine = (props) => {
  const location = useLocation();
  const [display, setDisplay] = useState(false);
  const [activity, setActivity] = useState({});
  const [count, setCount] = useState(1);
  const [duration, setDuration] = useState(1);
  const { routine } = location.state;

  const navigate = useNavigate();

  const handleActivityDelete = (e, activity) => {
    const { routineActivityId } = activity;
    deleteRoutineActivity(
      routineActivityId,
      props.token,
      props.user.username,
      navigate,
      props.setMessage
    );
  };

  const handleDelete = () => {
    deleteRoutine(routine.id, props.token, navigate, props.setMessage);
  };

  const handleActivitySelection = (event, activity) => {
    setActivity(activity);
    setDisplay(true);
  };

  const handleClose = () => {
    setDisplay(false);
    setActivity({});
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const { routineActivityId } = activity;

    updateRoutineActivity(
      routineActivityId,
      { count, duration },
      props.token,
      props.user.username,
      navigate,
      props.setMessage
    ).then(() => {
      setDisplay(false);
      setCount(1);
      setDuration(1);
      setActivity({});
      setTimeout(() => {
        props.setMessage({});
      }, 2000);
    });
  };

  const handleMessage = () => {
    props.setMessage({});
  };

  return (
    <>
      {props.message.message && (
        <div
          className={"message " + props.message.type}
          onClick={handleMessage}
        >
          {props.message.message} <span className="close">x</span>
        </div>
      )}
      <div
        className={"routine-activity-form " + (display ? "visible" : "hidden")}
      >
        <span className="routine-activity-form-head">
          <h3>{activity.name}</h3>
          <a className="material-symbols-outlined" onClick={handleClose}>
            close
          </a>
        </span>
        <form
          className="routine-activity-form-inputs"
          onSubmit={(e) => handleUpdate(e)}
        >
          <label>Count:</label>
          <input
            value={count}
            type="number"
            min="1"
            onChange={(e) => setCount(e.target.value)}
          />
          <label>Duration:</label>
          <input
            value={duration}
            type="number"
            min="1"
            onChange={(e) => setDuration(e.target.value)}
          />
          <button>Update Activity</button>
        </form>
      </div>
      <div className="routine-card">
        <h2>{routine.name}</h2>
        {props.user.id === routine.creatorId && (
          <span className="routine-options">
            <Link to={`/routines/${routine.id}/edit`} state={{ routine }}>
              <span class="material-symbols-outlined">edit</span>
            </Link>
            <a onClick={handleDelete}>
              <span class="material-symbols-outlined">delete</span>
            </a>
          </span>
        )}
        <div className="routine-details">
          <strong>Created by:</strong>
          <Link to={`/users/${routine.creatorName}/routines`}>
            {routine.creatorName}
          </Link>
          <p>
            <strong>Goal: </strong>
            {routine.goal}
          </p>
          {routine.activities.length ? <strong>Activities: </strong> : <></>}
          <div className="routine-activities">
            {routine.activities.map((activity) => (
              <div className="routine-activitity">
                <span className="routine-activity-head">
                  <Link
                    to={`/activities/${activity.id}`}
                    style={{ textTransform: "capitalize" }}
                  >
                    {activity.name}
                  </Link>
                  {props.user.id === routine.creatorId && (
                    <span className="activity-options">
                      <a onClick={(e) => handleActivitySelection(e, activity)}>
                        <span class="material-symbols-outlined">edit</span>
                      </a>
                      <a onClick={(e) => handleActivityDelete(e, activity)}>
                        <span class="material-symbols-outlined">delete</span>
                      </a>
                    </span>
                  )}
                </span>
                <p>{activity.description}</p>
                <p>
                  <strong>Count: </strong>
                  {activity.count}
                </p>
                <p>
                  <strong>Duration: </strong>
                  {activity.duration}
                </p>
              </div>
            ))}
            {props.user.id === routine.creatorId && (
              <Link to={`/activities`} state={{ routine }}>
                Add Activities
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Routine;
