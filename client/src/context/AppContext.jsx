import axios from "axios";
import url from "../helpers/url";
import { createContext, useState } from "react";
import { toast } from "react-hot-toast";

// create a new context file for the app
const AppContext = createContext();

const getUserFromSessionStorage = () => {
  const user = sessionStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const syncUserToSessionStorage = (user) => {
  if (user) {
    sessionStorage.setItem("user", JSON.stringify(user));
  } else {
    sessionStorage.removeItem("user");
  }
};

const AppContextProvider = ({ children }) => {
  const [state, setState] = useState({
    user: getUserFromSessionStorage(),
    isLoggedIn: false,
    isLoading: false,
    error: null,
  });

  const handleLogin = async ({ username, password }) => {
    try {
      let response = await axios.post(url + "/auth/login", {
        username,
        password,
      });
      if (response.data.success) {
        let user = {
          info: response.data.data,
          token: response.data.token,
        };
        setState({
          ...state,
          user,
          isLoggedIn: true,
        });
        syncUserToSessionStorage(user);
        toast.success("Login successful");
      }
    } catch (error) {
      handleError(error.response.data.message);
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const handleRegister = (user) => {
    setState({
      ...state,
      user,
      isLoggedIn: true,
    });
    syncUserToSessionStorage(user);
  };

  const handleLogout = () => {
    setState({
      ...state,
      user: {},
      isLoggedIn: false,
    });
    syncUserToSessionStorage(null);
  };

  const handleError = (error) => {
    setState({
      ...state,
      error,
    });
  };

  const handleLoading = (isLoading) => {
    setState({
      ...state,
      isLoading,
    });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        handleLogin,
        handleRegister,
        handleLogout,
        handleError,
        handleLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
