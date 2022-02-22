import React from "react";

const Searchcomponent = (props) => {
  const search = (searchValue) => {
    if(searchValue.length >=3){
      props.setFilter(searchValue);
    }
  };

  const sorting = (setSortBy) => {
    props.setSortBy(setSortBy);
  };

  return (
    <div className="row row-col mb-3">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          onChange={(e) => search(e.target.value)}
        />
        <div className="input-group-append">
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => sorting(e.target.value)}
          >
            <option selected>Sort</option>
            <option value="name">Name</option>
            <option value="weight">Weight</option>
            <option value="averageLifeSpan">Life span</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Searchcomponent;
