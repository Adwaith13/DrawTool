import { useState } from "react";
import { registerApi } from "../apis/register";
import { useNavigate, Link } from "react-router-dom";
import styles from "../styles/form.module.css";

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
    <div className={styles.container}>
      <h1 className={styles.head}>Register</h1>
      <form onSubmit={handleRegister} className={styles.form}>
        <input
          className={styles.input}
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
          className={styles.input}
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
        <button type="submit" className={styles.button}>
          Register
        </button>
      </form>
      <p className={styles.text}>
        Already Registered?<Link to="/">Login Here</Link>
      </p>
    </div>
  );
}
