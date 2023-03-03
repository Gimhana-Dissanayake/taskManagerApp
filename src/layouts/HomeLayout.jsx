import { Navigate, useOutlet} from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


export const HomeLayout = () => {
  const { user } = useAuth();
  const outlet = useOutlet();

  console.log("USER ",user)

  if (user) {
    return <Navigate to="/auth/dashboard" replace />;
  }

  return (
    <div>
      {outlet}
    </div>
  );
};
