import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { toast } from "react-toastify";

const URL = import.meta.env.REACT_APP_URL ?? "http://localhost:8080";

const Signout = ({ token, className }) => {
  const history = useHistory();

  const signout = (event) => {
    event.preventDefault();
    fetch(URL + "/signout", {
      method: "POST",
      headers: { Authorization: token },
    })
      .then((data) => data.json())
      .then(({ success }) => {
        if (success) {
          window.localStorage.removeItem("token");
          history.push("/login", { message: "Logout successful" });
        } else throw new Error("Couldn't log out, try again later");
      })
      .catch((err) =>
        toast.error(err.message, { position: "top-right", theme: "dark" })
      );
  };
  return (
    <Button className={className} onClick={signout} variant="danger">
      Signout
    </Button>
  );
};

export default Signout;
