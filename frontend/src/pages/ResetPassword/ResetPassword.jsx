import React,{ useState, useEffect} from "react";
import axios from "axios";
import { useNavigate, useParams,} from "react-router-dom";
import Input from "../../Component/Input";
import Layout from "./ResetLayout";
import Swal from "sweetalert2";

const ResetPassword = () => { 
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  })
  const { userId, token } = useParams();

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: toast => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    }
  });
  

  
  const handleChange = (e) =>{
    setFormData({
        ...formData,
         [e.target.name]: e.target.value
    })
  }
    async function resetPassword({...formData}) {
    return fetch(`https://certify-api.onrender.com/api/auth/changepassword/${userId}/${token}`, {
      method: "POST",
      //  //mode: 'no-cors',
      // credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Methods": "POST",
        // "Access-Control-Allow-Headers": "Content-Type, Authorization"
      },
      body: JSON.stringify({...formData})
      
    });
  }
  const handleSubmit = async (e) =>{
    e.preventDefault()
    try {
       if(formData.newPassword !== formData.confirmPassword){
      alert('password do not match')
    }else{
       const response = await resetPassword({...formData});
      //  const data = await response.json();
      // await axios.post(`https://certify-api.onrender.com/api/auth/changepassword/${userId}/${token}`, {...formData})
      // .then((response) => {
         if (response.status === 200 || response.status === 201) {
              Toast.fire({
                icon: "success",
                title: "password reset link sent to your email account"
              });
            navigate('/fff5')
            console.log(response);
            console.log(response.data.message);
         }
          // })
    }
    } catch (error) {
      
    }
   
    }

    
  const h2 = " Reset Password";
  const p = "Please enter your prefered password";

  const element = [
   <form onSubmit={handleSubmit}>
  <Input
      type={"password"}
      placeholder="New password"
      onChange={handleChange}
      id='newpassword'
      label="New password"
      eyecon={true}
    />
    <Input
      type={"password"}
      placeholder="Confirm new password"
      id='confirmpassword'
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