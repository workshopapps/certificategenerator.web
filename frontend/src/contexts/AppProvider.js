import { createContext, useState, useEffect } from "react";
import { Loader } from "../Component";
const AppContext = createContext();
export const AppProvider = ({ children }) => {
  const [file, setFile] = useState();
  const [user, setUser] = useState({});
  const [array, setArray] = useState([]);
  const [csvData, setCsvData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");

  const [logo, setLogo] = useState("");
  const [access, setAccess] = useState();
  const [message, setMessage] = useState("");
  const [issuedBy, setIssuedBy] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [awardeeName, setAwardeeName] = useState("");
  const [appLoading, setAppLoading] = useState(true);
  const [certificateTitle, setCertificateTitle] = useState("");

  useEffect(() => {
    setTimeout(function () {
      setAppLoading(false);
    }, 100);
  }, []);

  if (appLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "250px"
        }}
      >
        <Loader />
      </div>
    );
  }

  return (
    <AppContext.Provider
      value={{
        token,
        setToken,
        logo,
        setLogo,
        access,
        setAccess,
        message,
        setMessage,
        issuedBy,
        setIssuedBy,
        issueDate,
        setIssueDate,
        awardeeName,
        setAwardeeName,
        appLoading,
        setAppLoading,
        certificateTitle,
        setCertificateTitle,
        file,
        user,
        array,
        loading,
        setUser,
        csvData,
        setFile,
        setArray,
        setLoading,
        setCsvData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export default AppContext;
