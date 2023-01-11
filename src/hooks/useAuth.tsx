import { AxiosResponse } from "axios";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  AppUser,
  LoginCredentials,
  USER_NAME_SESSION_ATTRIBUTE_NAME,
} from "../constants";
import AuthService from "../service/AuthService";
import { useLocalStorage } from "./useLocalStorage";

type authContextType = {
  user: any;
  setAppUser: (creds: AppUser) => void;
  login: (data: LoginCredentials) => Promise<AxiosResponse<any, any>>;
  logout: () => void;
};

const authContextDefaultValues: authContextType = {
  user: null,
  setAppUser: () => {},
  login: () => {
    return new Promise(() => {});
  },
  logout: () => {},
};

type Props = {
  children: ReactNode;
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useLocalStorage(
    USER_NAME_SESSION_ATTRIBUTE_NAME,
    null
  );
  const navigate = useNavigate();

  const setAppUser = (data: AppUser) => {
    setUser(data);
  };

  const login = useCallback(async (creds: LoginCredentials) => {
    return AuthService.exectuteJwtAuthenticationService(creds);

    // return axios.get("http://localhost:8081/basicauth", {
    //   headers: { authorization: AuthService.createBasicAuthToken(data) },
    // });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    navigate("/", { replace: true });
  }, [setUser, navigate]);

  // const login = async (data: any) => {
  //   console.log("ABCCC ", data);
  //   setUser(data);
  //   navigate("/auth/welcome", { replace: true });
  // };

  // const logout = () => {
  //   setUser(null);
  //   navigate("/", { replace: true });
  // };

  const value = useMemo(
    () => ({
      user,
      setAppUser,
      login,
      logout,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
