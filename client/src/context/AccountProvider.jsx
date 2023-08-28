import { createContext, useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

export const AccountContext = createContext(null);

const AccountProvider = ({ children }) => {
  const [account, setAccount] = useState();
  const [showloginButton, setShowloginButton] = useState(true);
  const [showlogoutButton, setShowlogoutButton] = useState(false);

  const [activeUsers, setActiveUsers] = useState([]);

  const [newMessageFlag, setNewMessageFlag] = useState(false);

  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:9000");

    const persistedAccount = sessionStorage.getItem("account");
    const persistedShowLoginButton = sessionStorage.getItem("showloginButton");
    const persistedShowLogoutButton = sessionStorage.getItem("showlogoutButton");
    const persistedActiveUsers = sessionStorage.getItem("activeUsers");
    const persistedNewMessageFlag = sessionStorage.getItem("newMessageFlag");
    // Load other persisted data similarly...

    if (persistedAccount) {
      try {
        setAccount(JSON.parse(persistedAccount));
      } catch (error) {
        console.error("Error parsing persisted account:", error);
      }
      
    }
    if (persistedShowLoginButton) {
      try {
        setShowloginButton(JSON.parse(persistedShowLoginButton));
      } catch (error) {
        console.error("Error parsing persisted account:", error);
      }
      
    }
    if (persistedShowLogoutButton) {
      try {
        setShowlogoutButton(JSON.parse(persistedShowLogoutButton));
      } catch (error) {
        console.error("Error parsing persisted account:", error);
      }
      
    }
    if (persistedActiveUsers) {
      try {
        setShowlogoutButton(JSON.parse(persistedActiveUsers));
      } catch (error) {
        console.error("Error parsing persisted account:", error);
      }
    }
    if (persistedNewMessageFlag) {
      try {
        setShowlogoutButton(JSON.parse(persistedNewMessageFlag));
      } catch (error) {
        console.error("Error parsing persisted account:", error);
      }
    }
    // Set other persisted data similarly...
  }, []);

    // Save data to sessionStorage whenever it changes
    useEffect(() => {
      sessionStorage.setItem("account", JSON.stringify(account));
      sessionStorage.setItem("showloginButton", JSON.stringify(showloginButton));
      sessionStorage.setItem("showlogoutButton", JSON.stringify(showlogoutButton));
      sessionStorage.setItem("activeUsers", JSON.stringify(activeUsers));
      sessionStorage.setItem("newMessageFlag", JSON.stringify(newMessageFlag));
      // Save other data similarly...
    }, [account, showloginButton, showlogoutButton, activeUsers, newMessageFlag]);
  

  return (
    <AccountContext.Provider
      value={{
        account,
        setAccount,
        showloginButton,
        setShowloginButton,
        showlogoutButton,
        setShowlogoutButton,
        socket,
        activeUsers,
        setActiveUsers,
        newMessageFlag,
        setNewMessageFlag,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;
