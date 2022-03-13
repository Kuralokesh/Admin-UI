import React, { useEffect, useState } from "react";
import axios from "axios"; // axios dependencies
import "./index.css";
import Pagination from "../pagination";
import ReadOnlyRow from "../ReadOnlyRow";
import EditRow from "../EditRow";

const Admin = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState([false]);
  const [postPerpage] = useState([10]);
  const [currentPage, setCurrentPage] = useState([1]);
  const [searchInput, setSearchInput] = useState("");
  const [editContactId, setEditContactId] = useState([null]);
  const [editFormData, setEditFormData] = useState({
    fullName: "",
    email: "",
    role: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      setData(res.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const editUser = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      name: contact.name,
      email: contact.email,
      role: contact.role
    };
    setEditFormData(formValues);
  };

  const handelEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handelEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      name: editFormData.name,
      email: editFormData.email,
      role: editFormData.role
    };
    const newContacts = [...data];
    const index = data.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setData(newContacts);
    setEditContactId(null);
  };

  const deleteIcon = (contact) => {
    const newData = [...data];
    const index = data.findIndex((each) => each.id === contact.id);

    newData.splice(index, 1);

    setData(newData);
  };

  const handleChange = (event) => {
    const { name, checked } = event.target;
    if (name === "allSelect") {
      let tempUser = data.map((contact) => {
        return { ...contact, isChecked: checked };
      });
      setData(tempUser);
    } else {
      let tempUser = data.map((contact) =>
        contact.name === name ? { ...contact, isChecked: checked } : contact
      );
      setData(tempUser);
    }
  };

  const indexOfLastData = currentPage * postPerpage;
  const indexOfFirstData = indexOfLastData - postPerpage;
  const currentPost = data.slice(indexOfFirstData, indexOfLastData);

  const pageHandler = (page) => {
    setCurrentPage(page);
  };

  const onChangeSearchInput = (event) => setSearchInput(event.target.value);
  const searchResults = currentPost.filter(
    (eachUser) =>
      eachUser.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      eachUser.email.toLowerCase().includes(searchInput.toLowerCase()) ||
      eachUser.role.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="App">
      <div>
        <input
          type="search"
          placeholder="Search by name,email or role"
          value={searchInput}
          className="form-control p-1 m-2"
          onChange={onChangeSearchInput}
        />
      </div>
      <form onSubmit={handelEditFormSubmit}>
        <table className="table table-dark">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  name="allSelect"
                  checked={
                    data.filter((contact) => contact?.isChecked !== true)
                      .length < 1
                  }
                  onChange={handleChange}
                />
              </th>
              <th>Name </th>
              <th>Email </th>
              <th>Role </th>
              <th>Actions </th>
            </tr>
          </thead>
          <tbody className="table table-success table-striped new-table">
            {searchResults.map((contact) => (
              <>
                {editContactId === contact.id ? (
                  <EditRow
                    editFormData={editFormData}
                    handelEditFormChange={handelEditFormChange}
                  />
                ) : (
                  <ReadOnlyRow
                    handleChange={handleChange}
                    searchResults={searchResults}
                    contact={contact}
                    editUser={editUser}
                    deleteIcon={deleteIcon}
                  />
                )}
              </>
            ))}
          </tbody>
        </table>
      </form>
      <div className="d-flex justify-content-evenly footer">
        <button className="delete-button btn-sm">Delete selected</button>
        <Pagination
          className="pageNumbers"
          pageHandler={pageHandler}
          postPerPage={postPerpage}
          totalPosts={data.length}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default Admin;
