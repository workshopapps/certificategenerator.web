import Navbar from "../Navbar";
import Footer from "../Footer";
import { useLocation } from "react-router-dom";

const Layout = ({children}) => {
  const {pathname} = useLocation();
  
  return (
    <>
      <Navbar />
      {children}
      {pathname !== "/dashboard" && <Footer />}
      
    </>
  );
};

export default Layout;
