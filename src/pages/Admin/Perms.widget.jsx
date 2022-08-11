import UserCreation from "./UserCreation.component";

import { ListGroup } from "react-bootstrap";

const cap = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const Perms = ({ users, refresh, setRefresh }) => {
  return (
    <div className="w-100 widget">
      <h3>Perms</h3>
      <div className="flex flex-row">
        <ListGroup
          className="w-50"
          style={{ margin: "1rem", textAlign: "center" }}
        >
          {users.map((user, i) => (
            <ListGroup.Item
              key={i}
              variant={user.perm === "admin" ? "warning" : "primary"}
            >
              {user.user}
            </ListGroup.Item>
          ))}
        </ListGroup>
        <ListGroup
          className="w-50"
          style={{ margin: "1rem", textAlign: "center" }}
        >
          {users.map((user, i) => (
            <ListGroup.Item
              variant={user.perm === "admin" ? "warning" : "primary"}
              key={i}
            >
              {cap(user.perm)}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <UserCreation {...{ refresh, setRefresh }} />
    </div>
  );
};

export default Perms;
