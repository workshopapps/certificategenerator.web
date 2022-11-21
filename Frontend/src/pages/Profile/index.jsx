import React from "react";

import Profile_Header from "../../Component/Profile_Header";
import UserForm from "../../Component/UserForm";

const Profile = () => {
  return (
    <React.Fragment>
      {/* <Profile_Nav /> */}
      <Profile_Header />
      <UserForm />
    </React.Fragment>
  );
};

export default Profile;
