import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  fetchRoutinesByUsername,
  fetchUserRoutines,
} from "../../../api/routines";
import "./user-routines.css";

const UserRoutines = (props) => {
  const [routines, setRoutines] = useState();

  const { username } = useParams();

  useEffect(() => {
    async function getRoutines() {
      if (props.user.username === username) {
        async function getRoutines() {
          await fetchUserRoutines(
            props.token,
            props.user.username,
            setRoutines
          );
        }
        getRoutines();
      } else {
        await fetchRoutinesByUsername(username, setRoutines);
      }
      setTimeout(() => {
        props.setMessage({});
      }, 2000);
    }
    getRoutines();
  }, []);

  const handleMessage = () => {
    props.setMessage({});
  };

  return (
    <div>
      {props.message.message && (
        <div
          className={"message " + props.message.type}
          onClick={handleMessage}
        >
          {props.message.message} <span className="close">x</span>
        </div>
      )}
      {routines &&
        routines.map((routine) => (
          <div key={routine.id} className="user-routine-details">
            <Link
              className="routine-link"
              to={`/routines/${routine.id}`}
              state={{ routine }}
            >
              <h2>{routine.name}</h2>
            </Link>
            <p>
              <strong>Goal: </strong>
              {routine.goal}
            </p>
            {routine.activities.length ? <h3>Activities: </h3> : <></>}
            <div className="routine-activities">
              {routine.activities.map((activity) => (
                <div key={activity.id} className="routine-activitity">
                  <Link
                    to={`/activities/${activity.id}`}
                    style={{ textTransform: "capitalize" }}
                  >
                    {activity.name}
                  </Link>
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
            </div>
          </div>
        ))}
    </div>
  );
};

export default UserRoutines;
