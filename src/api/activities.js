import { BASE_URL } from ".";

const addActivityToRoutine = async (
  routine,
  routineActivity,
  token,
  setMessage
) => {
  const { activity, count, duration } = routineActivity;
  const routineId = routine.id;
  const activityId = activity.id;

  await fetch(
    `https://fitnesstrac-kr.herokuapp.com/api/routines/${routineId}/activities`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        activityId,
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
      setMessage({
        type: "success",
        message: `${activity.name} successfully added to ${routine.name}`,
      });
    })
    .catch((error) => {
      setMessage({ type: "error", message: error });
    });
};

const createActivity = async (activity, token, navigate, setMessage) => {
  const { name, description } = activity;

  await fetch("https://fitnesstrac-kr.herokuapp.com/api/activities", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      description,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
    })
    .then(() => {
      setMessage({ type: "success", message: "Activity Successfully Created" });
      navigate("/activities");
    })
    .catch((error) => {
      setMessage({ type: "error", message: error });
      navigate("/activities");
    });
};

const fetchActivities = async (setActivities) => {
  await fetch(BASE_URL + "/activities", {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((result) => {
      setActivities(result);
    })
    .catch(console.error);
};

const fetchRoutinesByActivity = async (activityId, setActivities) => {
  fetch(
    `https://fitnesstrac-kr.herokuapp.com/api/activities/${activityId}/routines`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((result) => {
      setActivities(result);
    })
    .catch(console.error);
};

const updateActivity = async (
  activityId,
  activity,
  token,
  navigate,
  setMessage
) => {
  const { name, description } = activity;
  await fetch(
    `https://fitnesstrac-kr.herokuapp.com/api/activities/${activityId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        description,
      }),
    }
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
    })
    .then(() => {
      setMessage({ type: "success", message: "Activity Successfully Updated" });
      navigate("/activities");
    })
    .catch((error) => {
      setMessage({ type: "error", message: error });
      navigate("/routines");
    });
};

export {
  addActivityToRoutine,
  createActivity,
  fetchActivities,
  fetchRoutinesByActivity,
  updateActivity,
};
