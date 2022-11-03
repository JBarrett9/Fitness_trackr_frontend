import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { addActivityToRoutine, fetchActivities } from "../../../api/activities";
import SectionNav from "../../section-nav/section-nav";
import "./activities.css";

const Activities = (props) => {
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [resultsPerPage, setResultsPerPage] = useState(20);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(resultsPerPage);
  const [routine, setRoutine] = useState({});
  const [search, setSearch] = useState("");
  const [sortParam, setSortParam] = useState(-1);
  const [display, setDisplay] = useState(false);
  const [activity, setActivity] = useState({});
  const [count, setCount] = useState(1);
  const [duration, setDuration] = useState(1);
  const location = useLocation();

  useEffect(() => {
    getActivities();
    if (location.state !== null) {
      const { routine } = location.state;
      setRoutine(routine);
    }
  }, []);

  const getActivities = () => {
    async function getAllActivities() {
      await fetchActivities(setActivities).then(setIsLoading(false));
    }
    setStart(0);
    setEnd(resultsPerPage);
    getAllActivities();
  };

  const prev = () => {
    if (start >= resultsPerPage) {
      setStart(start - resultsPerPage);
      setEnd(end - resultsPerPage);
    }
  };

  const next = () => {
    setStart(start + resultsPerPage);
    setEnd(end + resultsPerPage);
  };

  const handleNumberOfResults = (num) => {
    setStart(0);
    setEnd(num);
    setResultsPerPage(num);
  };

  const handleClose = () => {
    setDisplay(false);
    setActivity({});
  };

  const handleMessage = () => {
    props.setMessage({});
  };

  const handleActivitySelection = (event, activity) => {
    setActivity(activity);
    setDisplay(true);
  };

  const addToRoutine = (e) => {
    e.preventDefault();
    addActivityToRoutine(
      routine,
      { activity, count, duration },
      props.token,
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

  const handleSort = (a, b) => {
    if (sortParam >= 0) {
      return a.name.toLowerCase() > b.name.toLowerCase()
        ? 1
        : a.name.toLowerCase() === b.name.toLowerCase()
        ? 1
        : -1;
    }
  };

  return (
    <div className="activities">
      {props.user.id && (
        <nav className="activities-nav">
          <Link to="/activities/create-activity">+ Create New Activity</Link>
        </nav>
      )}
      <SectionNav
        setSearch={setSearch}
        handleNumberOfResults={handleNumberOfResults}
        prev={prev}
        next={next}
        start={start}
        end={end}
        resultsPerPage={resultsPerPage}
        limit={activities.length}
        properties={["Activity Name"]}
        sortParam={sortParam}
        setSortParam={setSortParam}
      />
      {props.message.message && (
        <div
          className={"message " + props.message.type}
          onClick={handleMessage}
        >
          {props.message.message} <span className="close">x</span>
        </div>
      )}
      {isLoading ? (
        <p>...</p>
      ) : activities.length ? (
        <>
          <div
            className={
              "routine-activity-form " + (display ? "visible" : "hidden")
            }
          >
            <span className="routine-activity-form-head">
              <h3>{activity.name}</h3>
              <a className="material-symbols-outlined" onClick={handleClose}>
                close
              </a>
            </span>
            <form
              className="routine-activity-form-inputs"
              onSubmit={(e) => addToRoutine(e)}
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
              <button>Add Activity</button>
            </form>
          </div>
          <div className="activities-list">
            {activities
              .filter(
                (activity) =>
                  activity.name.toLowerCase().includes(search) ||
                  activity.description.toLowerCase().includes(search)
              )
              .sort((a, b) => handleSort(a, b))
              .slice(start, end)
              .map((activity) => (
                <div key={activity.id} className="activity-content">
                  <span className="activity-head">
                    <h3>{activity.name}</h3>
                    <span className="activity-options">
                      {props.user.id && (
                        <Link
                          to={`/activities/${activity.id}/edit`}
                          state={{ activity }}
                        >
                          <span className="material-symbols-outlined">
                            edit
                          </span>
                        </Link>
                      )}
                      {routine.id && (
                        <span>
                          <a
                            onClick={(e) =>
                              handleActivitySelection(e, activity)
                            }
                            className="material-symbols-outlined"
                          >
                            add
                          </a>
                        </span>
                      )}
                    </span>
                  </span>
                  <p>
                    <strong>Description:</strong> {activity.description}
                  </p>
                </div>
              ))}
          </div>
          <div className="page-buttons">
            <button onClick={prev} disabled={start <= 0}>
              Prev.
            </button>{" "}
            <button onClick={next} disabled={end > activities.length}>
              Next{" "}
            </button>
          </div>
        </>
      ) : (
        <p>Nothing to see here ...</p>
      )}
    </div>
  );
};

export default Activities;
