import React, { useState } from "react";

const AddUserForm = (props) => {
  const initUser = { id: null, name: "", mail: "" };

  const [user, setUser] = useState(initUser);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  console.log(user);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.name && user.mail) {
      handleChange(e, props.addUser(user));
    }
  };

  return (
    <div className="accordion accordion-flush" id="accordionFlushExample">
      <div className="accordion-item">
        <h2 className="accordion-header" id="flush-headingOne">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-collapseOne"
            aria-expanded="false"
           
          ></button>
        </h2>
        <div
          id="flush-collapseOne"
          className="accordion-collapse collapse"
          aria-labelledby="flush-headingOne"
          data-bs-parent="#accordionFlushExample"
        >
          <div className="accordion-body">
            <form className="px-4 py-3">
              <div className="mb-3">
                <label htmlFor="exampleDropdownFormEmail1" className="form-label">
                  Mail
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleDropdownFormEmail1"
                  placeholder="email@example.com"
                  value={user.mail}
                  name="mail"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleDropdownFormPassword1" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleDropdownFormPassword1"
                  placeholder="Name"
                  value={user.name}
                  name="name"
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default AddUserForm;
