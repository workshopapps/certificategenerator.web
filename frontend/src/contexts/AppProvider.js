import { createContext, useState } from "react";
const AppContext = createContext();
export const AppProvider = ({ children }) => {
  const [file, setFile] = useState();
  const [user, setUser] = useState({});
  const [array, setArray] = useState([]);
  const [csvData, setCsvData] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <AppContext.Provider
      value={{
        file,
        user,
        array,
        loading,
        setUser,
        csvData,
        setFile,
        setArray,
        setLoading,
        setCsvData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export default AppContext;
