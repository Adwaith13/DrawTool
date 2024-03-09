import { useState } from "react";
import { loginApi } from "../apis/login";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const payload = await loginApi(userData);
      setUserData({
        username: "",
        password: "",
      });
      navigate("/canvas");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          required
          name="username"
          placeholder="Username"
          value={userData.username}
          onChange={(e) =>
            setUserData({ ...userData, username: e.target.value })
          }
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          name="password"
          required
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
        />
        <br />
        <button type="submit">Login</button>
      </form>
      <p>
        Not registered?<Link to="/register">Register Here</Link>
      </p>
    </div>
  );
}
