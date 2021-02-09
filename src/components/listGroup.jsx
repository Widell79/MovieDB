import React from "react";

const ListGroup = (props) => {
  const { items, textProperty, valueProperty } = props;
  //textProperty and valueProperty is created to make the ListGroup more flexible on data sources
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li key={item[valueProperty]} className="list-group-item">
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
