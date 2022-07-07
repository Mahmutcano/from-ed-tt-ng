import React from "react";

const UserTable = (props) => {
  const fetchData = props.users.map((item) => item);
  console.log(fetchData);

  return (
    <table class="table">
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
              <tr key={id}>
                <td>{id}</td>
                <td>{mail}</td>
                <td>{name}</td>
                <td>
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne"
                    aria-expanded="false"
                    aria-controls="flush-collapseOne"
                    onClick={() => props.editUser(id, user)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
              
            );
          })
        ) : (
          <tr>
            <td colSpan={4}>No users found</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default UserTable;
