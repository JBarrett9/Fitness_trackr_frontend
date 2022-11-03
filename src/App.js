import { useEffect } from "react";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { getUser } from "./api";
import {
  Activities,
  Home,
  Header,
  Login,
  Register,
  Routines,
  RoutineForm,
  Routine,
} from "./components";
import "./app.css";
import { UserRoutines } from "./components/routines";
import { ActivityForm } from "./components/activities";

const App = () => {
  const storedToken = localStorage.getItem("jwt");
  const [token, setToken] = useState(storedToken);
  const [user, setUser] = useState({});
  const [message, setMessage] = useState({});

  useEffect(() => {
    if (token) getUser(token, setUser);
  }, [token]);

  return (
    <>
      <Header token={token} setToken={setToken} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/activities"
          element={
            <Activities
              token={token}
              user={user}
              message={message}
              setMessage={setMessage}
            />
          }
        />
        <Route
          path="/activities/create-activity"
          element={
            <ActivityForm token={token} user={user} setMessage={setMessage} />
          }
        />
        <Route
          path="/activities/:activityId/edit"
          element={
            <ActivityForm token={token} user={user} setMessage={setMessage} />
          }
        />
        <Route
          path="/routines"
          element={
            <Routines
              token={token}
              user={user}
              message={message}
              setMessage={setMessage}
            />
          }
        />
        <Route
          path="/routines/create-routine"
          element={
            <RoutineForm token={token} user={user} setMessage={setMessage} />
          }
        />
        <Route
          path="/routines/:routineId"
          element={
            <Routine
              token={token}
              user={user}
              setMessage={setMessage}
              message={message}
            />
          }
        />
        <Route
          path="/routines/:routineId/edit"
          element={
            <RoutineForm token={token} user={user} setMessage={setMessage} />
          }
        />
        <Route path="/users/login" element={<Login setToken={setToken} />} />
        <Route
          path="/users/register"
          element={<Register setToken={setToken} />}
        />
        <Route
          path="/users/:username/routines"
          element={
            <UserRoutines
              token={token}
              user={user}
              setMessage={setMessage}
              message={message}
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;
