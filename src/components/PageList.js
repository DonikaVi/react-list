import React, { useEffect, useState } from "react";
import {
  Container,
  ListGroup,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import {generateArray, addEl, setDataState} from "../Utils";
import ListItem from "./ListItem";
import Paginate from "./Pagination";

function PageList() {
  const [data, setData] = useState([]);
  const [showData, setShowData] = useState([{ position: 0, value: "" }]);
  const [dragStarted, setDragStarted] = useState({});
  const [dragEntered, setDragEntered] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    data.length && paginatedData();
  }, [loading]);

  const onDragStart = (ev, item) => {
    setDragStarted(item);
    ev.dataTransfer.dropEffect = "move";

  };

  const numPages = () => {
    return Math.ceil(data.length / 10);
  };

  const addElement = () => {
    const position = data.length + 1;
    const el = addEl(position);
    const state = [...data];
    state.push(el);
    setDataState(state);
    setData(state);
    setLoading(!loading);
  };

  const onPaginationClick = (value) => {
    setPage(value);
    setLoading(!loading);
  };

  const paginatedData = () => {
    const perPage = 10;
    const from = page * perPage - perPage;
    const to = page * perPage;
    const items = data.slice(from, to);
    setShowData(items);
  };

  const onDragOver = (ev) => {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
  };

  const onDragEnter = (e, item) => {
    setDragEntered(item);
  };

  const onDragDrop = () => {
    const state = data.slice(0);
    const movedItemIndex = state.findIndex(
      (item) => item.position === dragStarted.position
    );
    const enterItemIndex = state.findIndex(
      (item) => item.position === dragEntered.position
    );
    state[movedItemIndex] = dragEntered;
    state[enterItemIndex] = dragStarted;

    setData(state);
    setDragStarted({});
    setDragEntered({});
    setDataState(state);
    setLoading(!loading);
  };

  const changeItem = (item) => {
    const state = data.slice(0);
    const index = state.findIndex((el) => el.position === item.position);
    state[index] = item;
    setData(state);
    setDataState(state);
    setLoading(!loading);
  };

  const deleteItem = (item) => {
    const state = [...data];
    const index = state.findIndex((el) => el.position === item.position);
    state.splice(index, 1);
    setData(state);
    setDataState(state);
    setLoading(!loading);
  };

  useEffect(() => {
    let newShowData = [];
    let newData = [];
    const localList = localStorage.getItem("list");
    if (localList) {
      newData = JSON.parse(localList);
    } else {
      newData = generateArray();
    }
    setData(newData);
    newShowData = newData.slice(0);
    setShowData(newShowData.splice(0));
    setLoading(!loading);
  }, []);

  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <ListGroup>
            {showData.map((item) => (
              <ListItem
                key={item.position}
                dragStart={onDragStart}
                dragEnter={onDragEnter}
                dragDrop={onDragDrop}
                dragOver={onDragOver}
                changeItem={changeItem}
                deleteItem={deleteItem}
                item={item}
                dragStarted={dragStarted}
              />
            ))}
          </ListGroup>
          <Button variant="success" className="mt-2" onClick={addElement}>
            Add el
          </Button>
          <div className="mt-5">
            <Paginate
              handleClick={onPaginationClick}
              active={page}
              length={numPages()}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default PageList;
