import React, { useState } from 'react'
import { ReactComponent as ActionIcon } from "./assets/actionIcon.svg";
import "./dashboard.style.scss"

const TableRow = ({item, handleChangeCertificateStatus, handleDeleteCertificate}) => {
  const handleDelete = (id) => {
    handleDeleteCertificate(id)
    setOpenOptions(!openOptions)
  }
  const handleStatus = (id, status) => {
    handleChangeCertificateStatus(id, status)
    setOpenOptions(!openOptions)
  }
  const [openOptions, setOpenOptions] = useState(false);
  return (
    <tr>
      <td>{item.name}</td>
      {item.status === "canceled" ? (
        <td>
          <button className="cancel">Canceled</button>
        </td>
      ) : item.status === "pending" ? (
        <td>
          <button className="pending">Pending</button>
        </td>
      ) : (
        <td>
          <button className="issue">Issued</button>
        </td>
      )}
      <td>{item.date}</td>
      {/* <td>{item.date}</td>
      <td>PDF</td> */}
      <td className="action">
        <ActionIcon
          className="action-icon"
          onClick={() => setOpenOptions(!openOptions)}
        />

        {openOptions && (
          <ul className="action__overlay">
            <li className="action__overlay--item">View</li>
            <li className="action__overlay--item">Edit</li>
            <li className="action__overlay--item" onClick={() => handleStatus(item._id, 'issued')}>Update status</li>
            <li className="action__overlay--item" onClick={() => handleDelete(item._id)}>Delete</li>
          </ul>
        )}
      </td>
    </tr>
  );
}

export default TableRow