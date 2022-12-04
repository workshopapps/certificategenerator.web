import React,{useEffect} from "react";
import axios from "axios";
import { useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import Button from "../../Component/button";
import Input from "../../Component/Input";
import Layout from "./ResetLayout";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  })
  const { userId, token } = useParams();
  const navigate = useNavigate();
  
  const handleChange = (e) =>{
    setFormData({
        ...formData,
         [e.target.name]: e.target.value
    })
  }
  const handleSubmit = (e) =>{
    e.preventDefault()
    axios.post(`https://certgo.hng.tech/api/auth/changepassword/${userId}/${token}`, {...formData})
     .then((response) => {
            console.log(response.data.message);
            navigate('/fff5')
        }).catch(err =>{
          console.error(err)
        })
  }

  const h2 = " Reset Password";
  const p = "Please enter your prefered password";

  const element = [
   <form onSubmit={handleSubmit}>
  <Input
      type={"password"}
      placeholder="New password"
      onChange={handleChange}
      name='newPassword'
      label="New password"
      eyecon={true}
    />
    <Input
      type={"password"}
      placeholder="Confirm new password"
      name='confirmPassword'
      onChange={handleChange}
      label="Confirm new password"
      eyecon={true}
    />
    <Input type='submit' value="Change Password" style={{width: '100%'}} />
    </form>
  ];
  return (
    <>
      <Layout p={p} h2={h2} element={element} />
    </>
  );
};

export default ResetPassword;
