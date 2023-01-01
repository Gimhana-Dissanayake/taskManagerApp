import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

type authContextType = {
  user: any;
  login: (data: any) => Promise<void>;
  logout: () => void;
};

const authContextDefaultValues: authContextType = {
  user: null,
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
  const [user, setUser] = useLocalStorage("todoAuthUser", null);
  const navigate = useNavigate();

  const login = useCallback(
    async (data: any) => {
      setUser(data);
      navigate("/auth/welcome", { replace: true });
    },
    [setUser, navigate]
  );

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
