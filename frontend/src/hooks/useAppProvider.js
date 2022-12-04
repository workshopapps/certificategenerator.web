import { useContext } from "react";
import AppContext from "../contexts/AppProvider";

const useAppProvider = () => {
  return useContext(AppContext);
}

export default useAppProvider;
