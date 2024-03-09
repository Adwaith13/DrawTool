import { useState } from "react";
import { registerApi } from "../apis/register";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const payload = await registerApi(userData);
      console.log(payload.data);
      setUserData({
        username: "",
        password: "",
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
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
        <button type="submit">Register</button>
      </form>
      <p>
        Already Registered?<Link to="/login">Login Here</Link>
      </p>
    </div>
  );
}
