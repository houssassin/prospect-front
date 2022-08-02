import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./Login.page.css";

const Login = () => {
  const onSubmit = (event) => {
    event.preventDefault();
    console.log("submitted");
  };
  return (
    <Form id="form" onSubmit={onSubmit}>
      <h2 style={{ fontSize: "1.5rem", textAlign: "center" }}>Login</h2>
      <Form.Group>
        <Form.Label htmlFor="email">Name</Form.Label>
        <Form.Control name="email" id="email" type="email" />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="password">Password</Form.Label>
        <Form.Control name="password" id="password" type="password" />
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
  );
};

export default Login;
