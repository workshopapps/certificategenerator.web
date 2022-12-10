import React, { useState } from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { BsCaretDownFill } from 'react-icons/bs';
import { ReactComponent as ActionIcon } from "./assets/actionIcon.svg";
import ViewModal from './Modal/ViewModal';
import "./dashboard.style.scss"

const TableRow = ({item, handleChangeCertificateStatus, handleDeleteCertificate, getUserCertificates }) => {
  const [openOptions, setOpenOptions] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [viewData, setViewData] = useState("")
  const [editData, setEditData] = useState("")
  const baseURL = "https://certgo.hng.tech/api";
  const accessToken = JSON.parse(localStorage.getItem("userData")).token
  const drop = useRef()

  const axiosPrivate = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    }
  });
  const viewCertificate = async (item) => {
    setViewData(item);
  }
  // const editCertificate = (item) => {
  //     console.log(item._id);
  //     setEditData(item);
  //   // const res = await axiosPrivate.get(`/certificates/${id}`);
  // }
  const handleViewModal = (id) => {
    setOpenViewModal(true)
    viewCertificate(id)
  }
  // const handleEditModal = (id) => {
  //   setOpenEditModal(true)
  //   editCertificate(id)
  // }
  const handleDelete = async (id) => {
    await handleDeleteCertificate(id)
    // getUserCertificates()
    setOpenOptions(!openOptions)
    getUserCertificates()
  }
  const handleStatus = async (item, id, status) => {
    if(item.status === status) {
      setOpenOptions(!openOptions)
      return
    }
    await handleChangeCertificateStatus(id, status)
    setOpenOptions(!openOptions)
    getUserCertificates()
  }
  useEffect(() => {
    function handleClickOutside(event) {
      if (drop.current && !drop.current.contains(event.target)) {
        setOpenOptions(false)
        setOpenStatus(false)
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
      {item.status === "pending" ? (
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
        <span 
        className="action-icon"
        onClick={() => setOpenOptions(!openOptions)}
        >
        <ActionIcon/> 
        </span>

        {openOptions && (
          <ul ref={drop} className="action__overlay">
            <li className="action__overlay--item" onClick={() => handleViewModal(item)}>View</li>
            {/* <li className="action__overlay--item" onClick={() => handleEditModal(item)}>Edit</li> */}
            <li className="action__overlay--item status" ><div style={{display: "flex", alignItems: "center" }} onClick={() => setOpenStatus(!openStatus)}><span>Status</span> <span style={{marginTop: "5px", marginLeft: "4px", width: "10px"}}><BsCaretDownFill style={{ width: "10px"}}/></span></div>
              {openStatus && (
                <ul>
                  <li className='status__pending' onClick={() => handleStatus(item, item._id, 'pending')}>Pending</li>
                  <li className='status__issued' onClick={() => handleStatus(item, item._id, 'issued')}>Issued</li>
                  {/* <li className='status__cancel' onClick={() => handleStatus(item._id, 'canceled')}>Cancelled</li> */}
                </ul>
              )}
            </li>
            <li className="action__overlay--item" onClick={() => handleDelete(item._id)}>Delete</li>
          </ul>
        )}
        <ViewModal open={openViewModal} viewData={viewData} onClose={() => setOpenViewModal(false)}/>
        {/* <EditModal open={openEditModal} editData={editData} getUserCertificates={getUserCertificates} onClose={() => setOpenEditModal(false)}/> */}
      </td>
    </tr>
  );
}

export default TableRow