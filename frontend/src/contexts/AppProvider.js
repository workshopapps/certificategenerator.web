import { createContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [csvData, setCsvData] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [file, setFile] = useState();

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        user,
        setUser,
        csvData,
        setCsvData,
        file,
        setFile,
        certificates,
        setCertificates,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
