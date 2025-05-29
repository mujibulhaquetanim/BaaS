import authService from "../../appwrite/auth";
import { logout } from "../../store/slices/authSlice";
import { useAppDispatch } from "../../hooks/rtkHooks";

export default function Logout() {
//   const dispatch = useDispatch<AppDispatch>();
const dispatch = useAppDispatch();

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
