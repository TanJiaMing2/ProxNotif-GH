import { createContext, useContext, useState, useEffect } from "react";
const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [User, setUser] = useState(null);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    a;
  }, []);
  return <GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>;
};
