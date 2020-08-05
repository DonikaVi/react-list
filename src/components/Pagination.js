import React from "react";
import { Pagination } from "react-bootstrap";

function Paginate({ active, length, handleClick }) {
  const items = [];
  for (let number = 1; number <= length; number++) {
    items.push(
        <Pagination.Item onClick={() => handleClick(number)} key={number} active={number === active}>
          {number}
        </Pagination.Item>,
    );
  }
  return (
    <div>
      <Pagination>{items}</Pagination>
    </div>
  );
}

export default Paginate;
