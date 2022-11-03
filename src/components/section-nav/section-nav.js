import "./section-nav.css";

const SectionNav = (props) => {
  return (
    <nav className="section-nav">
      <span>
        <label>Search:</label>
        <input onChange={(e) => props.setSearch(e.target.value)}></input>
      </span>
      <span>
        <label># of Results per Page:</label>
        <input
          type="number"
          value={props.resultsPerPage}
          onChange={(e) => props.handleNumberOfResults(Number(e.target.value))}
        ></input>
      </span>
      <span>
        <label>Sort by:</label>
        <select
          value={props.sortParam}
          onChange={(e) => props.setSortParam(e.target.value)}
          name="sortBy"
          id="sortBy"
        >
          <option disabled value={-1}>
            {" "}
            -- select --{" "}
          </option>
          {props.properties.map((property, idx) => (
            <option key={idx} value={idx}>
              {property}
            </option>
          ))}
        </select>
      </span>
      <span className="section-nav-buttons">
        <button onClick={props.prev} disabled={props.start <= 0}>
          Prev.
        </button>{" "}
        <button onClick={props.next} disabled={props.end > props.limit}>
          Next{" "}
        </button>
      </span>
    </nav>
  );
};

export default SectionNav;
