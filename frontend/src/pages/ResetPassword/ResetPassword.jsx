import React,{ useState, useEffect} from "react";
import axios from "axios";
import { useNavigate, useParams,} from "react-router-dom";
import Input from "../../Component/Input";
import Layout from "./ResetLayout";

const ResetPassword = () => { 
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  })
  const { userId, token } = useParams();

  
  const handleChange = (e) =>{
    setFormData({
        ...formData,
         [e.target.name]: e.target.value
    })
  }
  const handleSubmit = async (e) =>{
    e.preventDefault()
    if(formData.newPassword !== formData.confirmPassword){
      alert('password do not match')
    }else{
      await  axios.post(`https://certify-api.onrender.com/api/auth/changepassword/${userId}/${token}`, {...formData})
      .then((response) => {
            navigate('/fff5')
            console.log(response.data.message);
          }).catch(err =>{
            console.error(err)
          })
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