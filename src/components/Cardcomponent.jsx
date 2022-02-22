import React from "react";
const Cardcomponent = (props) => {
  return (
    <div className="col">
      <div className="card">
        <div
          className="bg-image hover-overlay ripple"
          data-mdb-ripple-color="light"
        >
          <img
            src={props.catBreeds.imageUrl}
            className="img-fluid "
            alt="Generic placeholder"
          />
        </div>
        <div className="card-body text-left">
          <h5 className="card-title text-left">
            <strong>{props.catBreeds.name}</strong>
          </h5>
          <div className="card-text">
            <p className="text-left">{props.catBreeds.temperament}</p>
            <p className="text-left">Life span: {props.catBreeds.life_span}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cardcomponent;
