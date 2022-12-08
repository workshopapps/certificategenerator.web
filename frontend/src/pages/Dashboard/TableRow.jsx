import React, { useState } from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
import { ReactComponent as ActionIcon } from "./assets/actionIcon.svg";
import "./dashboard.style.scss"

const TableRow = ({item, handleChangeCertificateStatus, handleDeleteCertificate, getUserCertificates }) => {
  const drop = useRef()
  const handleDelete = async (id) => {
    await handleDeleteCertificate(id)
    getUserCertificates()
    setOpenOptions(!openOptions)
  }
  const handleStatus = async (id, status) => {
    await handleChangeCertificateStatus(id, status)
    getUserCertificates()
    setOpenOptions(!openOptions)
  }
  const [openOptions, setOpenOptions] = useState(false);
  useEffect(() => {
    function handleClickOutside(event) {
      if (drop.current && !drop.current.contains(event.target)) {
        setOpenOptions(false)
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [])
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
          <ul ref={drop} className="action__overlay">
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