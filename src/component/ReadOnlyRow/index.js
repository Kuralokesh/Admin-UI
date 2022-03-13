import React from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai"; //react-icons dependency

import "./index.css";

const ReadOnlyRow = ({ handleChange, contact, deleteIcon, editUser }) => {
  return (
    <tr key={contact.name}>
      <td>
        <input
          type="checkbox"
          selection="true"
          name={contact.name}
          checked={contact.isChecked || false}
          onChange={handleChange}
        />
      </td>
      <td>{contact.name} </td>
      <td>{contact.email} </td>
      <td>{contact.role} </td>
      <td>
        <AiFillEdit
          key={contact.email}
          className="icon-button"
          value={contact}
          onClick={(event) => editUser(event, contact)}
        />
        <AiFillDelete
          key={contact.role}
          className="icon-button"
          onClick={(event) => deleteIcon(contact, event)}
        />
      </td>
    </tr>
  );
};
export default ReadOnlyRow;
