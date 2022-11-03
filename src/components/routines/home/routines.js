import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchRoutines } from "../../../api";
import { fetchUserRoutines } from "../../../api/routines";
import SectionNav from "../../section-nav/section-nav";
import "./routines.css";

const Routines = (props) => {
  const [routines, setRoutines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [resultsPerPage, setResultsPerPage] = useState(9);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(resultsPerPage);
  const [search, setSearch] = useState("");
  const [sortParam, setSortParam] = useState(-1);

  useEffect(() => {
    getPublicRoutines();
    setTimeout(() => {
      props.setMessage({});
    }, 2000);
  }, []);

  const getPublicRoutines = () => {
    async function getRoutines() {
      await fetchRoutines(setRoutines).then(setIsLoading(false));
    }
    setStart(0);
    setEnd(resultsPerPage);
    getRoutines();
  };

  const getUserRoutines = () => {
    async function getRoutines() {
      await fetchUserRoutines(props.token, props.user.username, setRoutines);
    }
    setStart(0);
    setEnd(resultsPerPage);
    getRoutines();
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

  const handleSort = (a, b) => {
    if (sortParam == 0) {
      return a.name.toLowerCase() > b.name.toLowerCase()
        ? 1
        : a.name.toLowerCase() === b.name.toLowerCase()
        ? 1
        : -1;
    } else if (sortParam == 1) {
      return a.creatorName.toLowerCase() > b.creatorName.toLowerCase()
        ? 1
        : a.creatorName.toLowerCase() === b.creatorName.toLowerCase()
        ? 1
        : -1;
    }
  };

  const handleMessage = () => {
    props.setMessage({});
  };

  return (
    <div className="routines">
      {props.user.id && (
        <nav className="routines-nav">
          <a onClick={getPublicRoutines}>Public Routines</a>
          <a onClick={getUserRoutines}>My Routines</a>
          <Link to="/routines/create-routine">+ Create New Routine</Link>
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
        limit={routines.length}
        properties={["Routine Name", "Creator"]}
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
      ) : routines.length ? (
        <>
          <div className="routines-list">
            {routines
              .filter(
                (routine) =>
                  routine.name.toLowerCase().includes(search.toLowerCase()) ||
                  routine.creatorName
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                  routine.goal.toLowerCase().includes(search.toLowerCase())
              )
              .sort((a, b) => handleSort(a, b))
              .slice(start, end)
              .map((routine) => (
                <Link
                  className="routine-link"
                  to={`/routines/${routine.id}`}
                  state={{ routine }}
                >
                  <div key={routine.id} className="routine-content">
                    <h3
                      style={{
                        textAlign: "center",
                        textTransform: "capitalize",
                      }}
                    >
                      {routine.name}
                    </h3>
                    <div style={{ marginLeft: "2rem" }}>
                      <p>
                        <strong>Created by: </strong>
                        {routine.creatorName}
                      </p>
                      <p>
                        <strong>Goal:</strong> {routine.goal}
                      </p>
                      {routine.activities.length ? (
                        <span>
                          <strong>Activities: </strong>
                          <p>
                            {routine.activities
                              .slice(0, 3)
                              .map((activity) => activity.name + " ")}
                            {routine.activities.length > 3 && "..."}
                          </p>
                        </span>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
          </div>
          <div className="page-buttons">
            <button onClick={prev} disabled={start <= 0}>
              Prev.
            </button>{" "}
            <button onClick={next} disabled={end > routines.length}>
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

export default Routines;
