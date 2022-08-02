import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

const Comment = (props) => {
  const { comment, setComment } = props;
  return (
    <div className="pwidget">
      <FloatingLabel
        controlId="floatingTextarea"
        label="Comments"
        className="mb-3"
        style={{ color: "#000" }}
      >
        <Form.Control
          onChange={(event) => setComment(event.target.value)}
          value={comment}
          as="textarea"
          placeholder="Leave a comment here"
        />
      </FloatingLabel>
    </div>
  );
};

export default Comment;
