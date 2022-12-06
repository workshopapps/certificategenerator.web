import React,{ useState, useEffect} from "react";
// import axios from "axios";
import { useNavigate, useParams,} from "react-router-dom";
import Input from "../../Component/Input";
import Layout from "./ResetLayout";
import Swal from "sweetalert2";
import Loader from "../Home/Loader";
import Button from "../../Component/button";

const ResetPassword = () => { 
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
  

    async function resetPassword({newPassword, confirmPassword}) {
    return fetch(`https://certify-api.onrender.com/api/auth/changepassword/${userId}/${token}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Methods": "POST",     
      },
      body: JSON.stringify({ newpassword: newPassword, confirmpassword: confirmPassword })
    });
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()

    setLoading(true);
    try {
       if(confirmPassword !== newPassword){
        Toast.fire({
          icon: "error",
          title: "Both passwords do not match"
        });
        setLoading(false)
        return false;
    }else if(newPassword.length < 6 && confirmPassword.length < 6){
          Toast.fire({
          icon: "error",
          title: "Passwords cannot be less than 6"
        });
        setLoading(false)
        return false;
    }else{
       const response = await resetPassword({newPassword, confirmPassword});
      //  const data = await response.json();
      // await axios.post(`https://certify-api.onrender.com/api/auth/changepassword/${userId}/${token}`, {...formData})
      // .then((response) => {
         if (response.status === 200) {
              Toast.fire({
                icon: "success",
                title: "password changed"
              });
            navigate('/fff5')
            setLoading(false);
            console.log(response);
            console.log(response.data.message);
         }else if (response.status === 400){
            Toast.fire({
                icon: "error",
                title: "Both passwords do not match"
              });
              console.log(response);
              setLoading(false)
          }else if (response.status === 401){
              Toast.fire({
                  icon: "error",
                  title: "Invalid token"
                });
                console.log('Invalid token');
                setLoading(false)
          }else if (response.status === 500) {
              Toast.fire({
                icon: "error",
                title: "Server Error"
              });
           throw new Error("Server Error");
      } else{
            setLoading(false)
            console.log('something went wront');
          }
          // })
    }
    } catch (error) {
        if(!error?.response){
            console.log('No Server Response')
        }else{
            console.log('Failed changing password!');
    }
    }
   
    }

    
  const h2 = " Reset Password";
  const p = "Please enter your prefered password";

  const element = [
   <form onSubmit={handleSubmit}>
  <Input
      type={"password"}
      placeholder="New password"
      id='newpassword'
      value = {newPassword}
      callback={e => setNewPassword(e.target.value)}
      label="New password"
      eyecon={true}
    />
    <Input
      type={"password"}
      placeholder="Confirm new password"
      id='confirmpassword'
      value = {confirmPassword}
      callback={e => setConfirmPassword(e.target.value)}
      label="Confirm new password"
      eyecon={true}
    />
    <Button type='submit' style={{width: '100%'}}>{loading? <Loader /> : <span>Change password</span>}</Button>
    </form>
  ];
  return (
    <>
      <Layout p={p} h2={h2} element={element} />
    </>
  );
};

export default ResetPassword;