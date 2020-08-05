import React, { useEffect, useState } from "react";
import { Form, ListGroup, ButtonGroup, Button, Col } from "react-bootstrap";

function ListItem({
  item,
  dragStart,
  dragEnter,
  dragDrop,
  dragOver,
  changeItem,
  deleteItem,
  dragStarted
}) {
  const [input, setInput] = useState({});
  const [state, setState] = useState({});
  const [edit, setEdit] = useState(false);


  useEffect(() => {
    if (item.value !== state.value) {
      setInput(item);
      setState(item);
    }
  }, [item.value]);

  const handleChange = (e) => {
    e.preventDefault();
    const state = Object.assign({}, input);
    state.value = e.target.value;
    setInput(state);
  };

  const handleSubmit = () => {
    setEdit(false);
    changeItem(input);
  };

  const className = `mb-2 ${dragStarted.position === item.position ? 'start-drag': ''}`;

  return (
    <div
      data-id={item.position}
      className={className}
      draggable
      onDrop={(e) => dragDrop(e, item)}
      onDragStart={(e) => dragStart(e, item)}
      onDragEnter={(e) => dragEnter(e, item)}
      onDragOver={dragOver}
    >
      {!edit && (
        <ListGroup.Item onDoubleClick={() => setEdit(true)}>
          {state.value}
        </ListGroup.Item>
      )}
      {edit && (
        <Form onSubmit={handleSubmit}>
          <Form.Row className="align-items-center">
            <Col xs="auto" sm={6}>
              <Form.Control
                onChange={handleChange}
                className="mb-2"
                type="text"
                value={input.value}
              />
            </Col>
            <Col xs="auto" sm={6}>
              <ButtonGroup aria-label="Basic example">
                <Button type="submit" className="mb-2">
                  Save
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setEdit(false)}
                  className="mb-2"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="danger"
                  onClick={() => deleteItem(item)}
                  className="mb-2"
                >
                  Delete
                </Button>
              </ButtonGroup>
            </Col>
          </Form.Row>
        </Form>
      )}
    </div>
  );
}

export default ListItem;
