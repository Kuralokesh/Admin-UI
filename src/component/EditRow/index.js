import React from "react";
import "./index.css";

const EditRow = ({ editFormData, handelEditFormChange }) => {
  return (
    <tr className="edit-input">
      <td></td>
      <td>
        <input
          className="edit-input"
          type="text"
          required="required"
          placeholder="Enter name..."
          name="name"
          value={editFormData.name}
          onChange={handelEditFormChange}
        />
      </td>
      <td>
        <input
          className="edit-input"
          type="text"
          required="required"
          placeholder="Enter email..."
          name="email"
          value={editFormData.email}
          onChange={handelEditFormChange}
        />
      </td>
      <td>
        <input
          className="edit-input"
          type="text"
          required="required"
          placeholder="Enter role..."
          name="role"
          value={editFormData.role}
          onChange={handelEditFormChange}
        />
      </td>
      <td>
        <button type="submit" className="btn btn-sm button">
          save
        </button>
      </td>
    </tr>
  );
};

export default EditRow;
