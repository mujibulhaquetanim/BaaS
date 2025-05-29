import authService from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import { AppDispatch } from "../../store/store";

export default function Logout() {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    authService
      .logout()
      .then(() => {
        dispatch(logout());
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
