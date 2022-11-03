import { BASE_URL } from ".";

const createRoutine = async (routine, token, navigate, setMessage) => {
  const { name, goal, isPublic } = routine;

  await fetch(BASE_URL + "/routines", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      goal,
      isPublic,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
    })
    .then(() => {
      setMessage({ type: "success", message: "Routine Successfully Created" });
      navigate("/routines");
    })
    .catch((error) => {
      setMessage({ type: "error", message: error });
      navigate("/routines");
    });
};

const deleteRoutine = async (routineId, token, navigate, setMessage) => {
  fetch(`http://fitnesstrac-kr.herokuapp.com/api/routines/${routineId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
    })
    .then(() => {
      setMessage({ type: "success", message: "Routine Successfully Deleted" });
      navigate("/routines");
    })
    .catch(console.error);
};

const deleteRoutineActivity = async (
  routineActivityId,
  token,
  username,
  navigate,
  setMessage
) => {
  await fetch(
    `http://fitnesstrac-kr.herokuapp.com/api/routine_activities/${routineActivityId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
    })
    .then(() => {
      setMessage({ type: "success", message: "Activity Successfully Removed" });
      navigate(`/users/${username}/routines`);
    })
    .catch(console.error);
};

const fetchRoutines = async (setRoutines) => {
  await fetch(BASE_URL + "/routines", {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((result) => setRoutines(result))
    .catch(console.error);
};

const fetchRoutinesByUsername = async (username, setRoutines) => {
  await fetch(BASE_URL + `/users/${username}/routines`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((result) => {
      setRoutines(result);
    })
    .catch(console.error);
};

const fetchUserRoutines = async (token, username, setRoutines) => {
  await fetch(BASE_URL + `/users/${username}/routines`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((result) => {
      setRoutines(result);
    })
    .catch(console.error);
};

const updateRoutine = async (
  routineId,
  routine,
  token,
  navigate,
  setMessage
) => {
  const { name, goal, isPublic } = routine;
  fetch(`http://fitnesstrac-kr.herokuapp.com/api/routines/${routineId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      goal,
      isPublic,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
    })
    .then(() => {
      setMessage({ type: "success", message: "Routine Successfully Updated" });
      navigate("/routines");
    })
    .catch(console.error);
};

const updateRoutineActivity = async (
  routineActivityId,
  routineActivity,
  token,
  username,
  navigate,
  setMessage
) => {
  const { count, duration } = routineActivity;

  await fetch(
    `http://fitnesstrac-kr.herokuapp.com/api/routine_activities/${routineActivityId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        count,
        duration,
      }),
    }
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
    })
    .then(() => {
      setMessage({ type: "success", message: "Activity Successfully Updated" });
      navigate(`/users/${username}/routines`);
    })
    .catch(console.error);
};

export {
  createRoutine,
  deleteRoutine,
  deleteRoutineActivity,
  fetchRoutines,
  fetchRoutinesByUsername,
  fetchUserRoutines,
  updateRoutine,
  updateRoutineActivity,
};
