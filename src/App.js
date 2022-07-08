import React, { useState, useEffect } from "react";
import UserTable from "./tables/UserTable";
import AddUserForm from "./forms/AddUserForm";
import Pagination from "./tables/Pagination";

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    setLoading(true);
    const result = await fetch("https://176.53.61.139:7127/Mediator/Get");
    const getResult = await result.json();
    setUsers(getResult.data);
    setLoading(false);
  }

   const addUser = (user) => {
    user.id = users.length + 1;
    setUsers([...users, user]);

    fetch("https://176.53.61.139:7127/Mediator/Edit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    }).then((response) => response.json()).then(user => console.log(user))
  }

  const [setEditing] = useState(false);

  const initialUser = { id: null, mail: "", name: "" };

  const [currentUser, setCurrentUser] = useState(initialUser);

  const editUser = (id, user) => {
    setEditing(true);
    setCurrentUser(user);
  };

  const updateUser = (newUser) => {
    setUsers(
      users.map((user) => (user.id === currentUser.id ? newUser : user))
    );
    setCurrentUser(initialUser);
    setEditing(false);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = users.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-5">
      <h3>Data Grid</h3>
      <div className="row">
        <div className="col">
          {
            <div>
              <AddUserForm addUser={addUser} />
            </div>
          }
        </div>
        <div className="mx-auto">
          <UserTable
            users={currentPosts}
            currentUser={currentUser}
            editUser={editUser}
            setEditing={setEditing}
            updateUser={updateUser}
            loading={loading}
          />
          <div>
            {" "}
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={users.length}
              paginate={paginate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
