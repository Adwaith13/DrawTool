import { useState } from "react";
import { loginApi } from "../apis/login";
import { useNavigate, Link } from "react-router-dom";
import styles from "../styles/form.module.css";

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
    <div className={styles.container}>
      <h1 className={styles.head}>Login</h1>
      <form onSubmit={handleLogin} className={styles.form}>
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
        <button type="submit" className={styles.button}>Login</button>
      </form>
      <p className={styles.text}>
        Not registered?<Link to="/register">Register Here</Link>
      </p>
    </div>
  );
}
