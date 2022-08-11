import { ListGroup } from "react-bootstrap";
import RoleCreation from "./RoleCreation.component";

const Role = ({ users, roles, files, refresh, setRefresh }) => {
  return (
    <div className="w-100 widget">
      <h3>Roles</h3>
      <ListGroup style={{ margin: "1rem", textAlign: "center" }}>
        {Object.entries(roles).length
          ? Object.entries(roles).map((elem, i) => (
              <>
                <ListGroup.Item variant="primary" key={i}>
                  {elem[0]}
                </ListGroup.Item>
                <ListGroup.Item
                  style={{ marginBottom: "2rem" }}
                  variant="primary"
                >
                  <ListGroup>
                    {elem[1].map((file) => (
                      <ListGroup.Item variant="info">{file}</ListGroup.Item>
                    ))}
                  </ListGroup>
                </ListGroup.Item>
              </>
            ))
          : "No roles yet"}
      </ListGroup>
      <RoleCreation {...{ refresh, setRefresh, users, files }} />
    </div>
  );
};

export default Role;
