import React from "react";
// import support from "../assets/support.png"
import { useState } from "react";
import "./support.css";

function Support() {
  const [name, setName] = useState("");
  const [textarea, setTextarea] = useState(
    ""
  );
  const handleChange = (event) => {
    setTextarea(event.target.value);
  };

  return (
    <>
      <div className="support">
        <form
          className="row col-4 p-5 rounded-3"
          style={{ marginLeft: "9rem" }}
        >
          <h4 className="fw-bold text-light">Contact</h4>

          <div className="form-group p-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Your Name"
            />
          </div>
          <div className="form-group p-3">
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Your Email"
            />
          </div>
          <div className="form-group p-3 d-flex flex-column align-items-end">
            <textarea
              className="rounded-3 col-12"
              value={textarea}
              onChange={handleChange}
              placeholder="Enter Your Questions Here"
            />
            <button type="submit" className="btn btn-primary col-6 mt-3">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Support;
