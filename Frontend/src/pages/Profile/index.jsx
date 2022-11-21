import React from "react";
// import Profile_Nav from "../../Component/Profile_Nav";
import Profile_Header from "../../Component/Profile_Header";
import UserForm from "../../Component/UserForm";
import Footer from "../../Component/Footer";

const Profile = () => {
  return <React.Fragment>
    {/* <Profile_Nav /> */}
    <Profile_Header />
    <UserForm />
    <Footer />
  </React.Fragment>
};

export default Profile;