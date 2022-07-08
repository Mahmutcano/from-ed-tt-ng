import React from "react";
import { useState, useEffect } from "react";

const UserTable = (props) => {
  const [editing, setEdit] = useState([]);

  const toogleShown = (username) => {
    const showState = editing.slice();
    const index = showState.indexOf(username);
    if (index >= 0) {
      showState.splice(index, 1);
      setEdit(showState);
    } else {
      showState.push(username);
      setEdit(showState);
    }
  };

  useEffect(() => {
    setUser(props.currentUser);
  }, [props]);

  const [user, setUser] = useState(props.currentUser);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.mail && user.name) props.updateUser(user);
  };

  if (props.loading) {
    return <h1>Loading...</h1>;
  }
  function renderDate() {
    return (
      <div className="container mx-auto mt-5">
        <table className="table">
          <thead>
            <tr>
              <th>id</th>
              <th>Mail</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {props.users.length > 0 ? (
              props.users.map((user) => {
                const { id, mail, name } = user;
                return (
                  <>
                    <tr key={id}>
                      <td>{id}</td>
                      <td>{mail}</td>
                      <td>{name}</td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => toogleShown(id, user)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                    {editing.includes(id) && (
                      <tr className="additional-info">
                        <td colSpan={4}>
                          <form className="px-4 py-3">
                            <div className="mb-3">
                              <label
                                htmlFor="exampleDropdownFormEmail1"
                                className="form-label"
                              >
                                Mail
                              </label>
                              <input
                                type="email"
                                className="form-control"
                                id="exampleDropdownFormEmail1"
                                placeholder="email@example.com"
                                value={mail}
                                name="mail"
                                onChange={handleChange}
                              />
                            </div>
                            <div className="mb-3">
                              <label
                                htmlFor="exampleDropdownFormPassword1"
                                className="form-label"
                              >
                                Name
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="exampleDropdownFormPassword1"
                                placeholder="Name"
                                value={name}
                                name="name"
                                onChange={handleChange}
                              />
                            </div>
                            <button
                              type="submit"
                              className="btn btn-primary"
                              onClick={handleSubmit}
                            >
                              Update
                            </button>
                          </form>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })
            ) : (
              <tr>
                <td colSpan={4}>No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }

  return <>{renderDate()}</>;
};

export default UserTable;
