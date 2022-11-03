import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createActivity, updateActivity } from "../../../api/activities";
import "./activity-form.css";

const ActivityForm = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [method, setMethod] = useState("post");
  const [activity, setActivity] = useState({});
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      const { activity } = location.state;
      setActivity(activity);
      setName(activity.name);
      setDescription(activity.description);
      setMethod("patch");
    }
  }, []);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (method === "post") {
      createActivity(
        { name, description },
        props.token,
        navigate,
        props.setMessage
      );
    } else {
      updateActivity(
        activity.id,
        { name, description },
        props.token,
        navigate,
        props.setMessage
      );
    }
  };

  return (
    <form className="activity-form" onSubmit={(e) => handleSubmit(e)}>
      <h2>New Activity</h2>
      <label>Activity Name: </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>Description: </label>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>{activity.name ? "Update Activity" : "Create Activity"}</button>
    </form>
  );
};

export default ActivityForm;
