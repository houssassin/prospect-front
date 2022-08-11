import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const URL = import.meta.env.REACT_APP_URL ?? "http://localhost:8080";

const UserCreation = ({ setRefresh, refresh }) => {
  const [toggle, setToggle] = useState(false);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [perm, setPerm] = useState("User");

  const handleCreation = (event) => {
    event.preventDefault();
    if (!toggle) setToggle(true);
    else {
      if (!user || !perm || !password)
        return toast.error("Incomplete form !", {
          position: "bottom-center",
          theme: "dark",
        });
      const token = window.localStorage.getItem("token");
      if (!token)
        history.push("/login", {
          err: "Not currently signed in, please sign in",
        });
      fetch(URL + "/register", {
        method: "POST",
        body: JSON.stringify({ user, perm: perm.toLowerCase(), password }),
        headers: { "Content-Type": "application/json", Authorization: token },
      })
        .then((data) => data.json())
        .then(({ success }) => {
          if (success) {
            setRefresh(!refresh);
            toast.success("Created !", { theme: "dark" });
          } else
            toast.error("Failed to create account, try again", {
              theme: "dark",
            });
        });
    }
  };
  return (
    <div id="user-creation" className="flex flex-row mt-auto">
      {toggle && (
        <>
          <Form.Control
            name="user"
            value={user}
            onChange={(event) => setUser(event.target.value)}
            placeholder="Username"
          />
          <Form.Control
            name="password"
            value={password}
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
          />
          <Form.Select
            onChange={(event) => setPerm(event.target.value)}
            value={perm}
          >
            <option>User</option>
            <option>Admin</option>
          </Form.Select>
        </>
      )}
      <Button className="w-100" onClick={handleCreation}>
        Create new user
      </Button>
    </div>
  );
};

export default UserCreation;
