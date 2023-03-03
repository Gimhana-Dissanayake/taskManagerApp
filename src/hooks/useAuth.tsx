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
  LoginCredentials,
  USER_NAME_SESSION_ATTRIBUTE_NAME,
} from "../constants";
import User from "../models/User";
import AuthService from "../service/AuthService";
import { useLocalStorage } from "./useLocalStorage";

type authContextType = {
  user: User | null;
  setAppUser: (creds: User) => void;
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

  const setAppUser = (data: User) => {
    setUser(data);
  };

  const login = useCallback(async (creds: LoginCredentials) => {
    return AuthService.exectuteJwtAuthenticationService(creds);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    navigate("/", { replace: true });
  }, [setUser, navigate]);

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
