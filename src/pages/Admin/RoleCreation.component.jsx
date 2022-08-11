import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const URL = import.meta.env.REACT_APP_URL ?? "http://localhost:8080";

const RoleCreation = ({ setRefresh, refresh, users, files }) => {
  const [toggle, setToggle] = useState(false);
  const [user, setUser] = useState("");
  const [file, setFile] = useState("");

  useEffect(() => {
    if (users[0]) setUser(users[0].user);
    if (files[0]) setFile(files[0].filename);
  }, [users, files]);

  const handleCreation = (event) => {
    event.preventDefault();
    if (!toggle) setToggle(true);
    else {
      if (!user || !file)
        return toast.error("Incomplete form !", {
          position: "bottom-center",
          theme: "dark",
        });
      const token = window.localStorage.getItem("token");
      if (!token)
        history.push("/login", {
          err: "Not currently signed in, please sign in",
        });
      fetch(URL + "/addrole", {
        method: "POST",
        body: JSON.stringify({ user, file }),
        headers: { "Content-Type": "application/json", Authorization: token },
      })
        .then((data) => data.json())
        .then(({ success, message }) => {
          if (success) {
            setRefresh(!refresh);
            toast.success("Added", { theme: "dark" });
          } else
            toast.error("Failed to add role, try again", {
              theme: "dark",
            });
          console.log(message);
        });
    }
  };
  console.log(user, file);
  return (
    <div id="user-creation" className="flex flex-row mt-auto">
      {toggle && (
        <>
          <Form.Select
            onChange={(event) => setUser(event.target.value)}
            value={user}
          >
            {users.map((user, i) => (
              <option key={i}>{user.user}</option>
            ))}
          </Form.Select>
          <Form.Select
            onChange={(event) => setFile(event.target.value)}
            value={file}
          >
            {files.map((file, i) => (
              <option key={i}>{file.filename}</option>
            ))}
          </Form.Select>
        </>
      )}
      <Button className="w-100" onClick={handleCreation}>
        Add new perm
      </Button>
    </div>
  );
};

export default RoleCreation;
