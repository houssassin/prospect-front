import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { toast, ToastContainer } from "react-toastify";

import "./Login.page.css";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const URL = import.meta.env.REACT_APP_URL ?? "http://localhost:8080";

const Login = () => {
  const [user, setUser] = useState("yassine");
  const [password, setPassword] = useState("yassine");

  const history = useHistory();

  useEffect(() => {
    console.log(history.location.state);
    if (history.location.state && history.location.state.err)
      toast.error(history.location.state.err, {
        position: "bottom-center",
        theme: "dark",
      });
    if (history.location.state && history.location.state.message)
      toast.info(history.location.state.message, {
        position: "bottom-center",
        theme: "dark",
      });
    const token = window.localStorage.getItem("token");
    if (token)
      fetch(URL + "/signin", {
        headers: { "Content-Type": "application/json", Authorization: token },
        method: "POST",
      })
        .then((data) => data.json())
        .then((res) => {
          if (res.success) return history.push("/dashboard");
          else throw new Error(res.message);
        })
        .catch(() =>
          toast.error("Session has expired, please reconnect", {
            position: "bottom-center",
            theme: "dark",
          })
        );
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    if ((!user, !password))
      return toast.error("Incomplete form !", {
        position: "bottom-center",
        theme: "dark",
      });

    fetch(URL + "/signin", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, password }),
      method: "POST",
    })
      .then((data) => data.json())
      .then((res) => {
        if (res.success) return res.data;
        throw new Error(res.message);
      })
      .then(({ token }) => {
        window.localStorage.setItem("token", token);
        history.push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message, {
          position: "bottom-center",
          theme: "dark",
        });
      });
  };

  return (
    <>
      <ToastContainer />
      <Form id="form" onSubmit={onSubmit}>
        <h2 style={{ fontSize: "1.5rem", textAlign: "center" }}>Login</h2>
        <Form.Group>
          <Form.Label htmlFor="user">User</Form.Label>
          <Form.Control
            name="user"
            id="user"
            type="user"
            value={user}
            onChange={(event) => setUser(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            name="password"
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>
        <Form.Group id="submit-group">
          <Button
            id="submit-btn"
            style={{ margin: "0 auto" }}
            type="submit"
            variant="dark"
          >
            Login
          </Button>
        </Form.Group>
      </Form>
    </>
  );
};

export default Login;
