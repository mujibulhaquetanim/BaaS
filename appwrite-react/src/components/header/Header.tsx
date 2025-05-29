import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/rtkHooks";
import Logout from "./Logout";

export default function Header() {
  // const authStatus = useSelector((state: RootState) => state.auth.status);
  const authStatus = useAppSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    // if active is true, then the link will be active otherwise display something else
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <div>
      <header>
        <nav>
          <ul>
            {navItems.map((item, _) =>
              item.active ? (
                <li key={item.name}>
                  <button onClick={() => navigate(item.slug)}>
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            {authStatus && (
              <li>
                <Logout />
              </li>
            )}
          </ul>
        </nav>
      </header>
    </div>
  );
}
