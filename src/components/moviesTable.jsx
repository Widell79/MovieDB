import React from "react";
import { Link } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";

const MoviesTable = ({ movies, onDelete, onSort, sortOrder, column, user }) => {
  const renderSortIcon = (thColumn) => {
    //Only show icon on active column
    if (thColumn !== column) return null;
    if (sortOrder === "asc") {
      return <i className="fa fa-sort-asc"></i>;
    } else if (sortOrder === "desc") {
      return <i className="fa fa-sort-desc"></i>;
    } else {
      return null;
    }
  };
  return (
    <table className="table table-striped">
      <thead className="clickable">
        <tr>
          <th onClick={() => onSort("title")} scope="col">
            Title
            {renderSortIcon("title")}
          </th>
          <th onClick={() => onSort("genre.name")} scope="col">
            Genre
            {renderSortIcon("genre.name")}
          </th>
          <th onClick={() => onSort("numberInStock")} scope="col">
            Stock
            {renderSortIcon("numberInStock")}
          </th>
          <th onClick={() => onSort("dailyRentalRate")} scope="col">
            Rate
            {renderSortIcon("dailyRentalRate")}
          </th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {movies.map((movie) => {
          return (
            <tr key={movie._id}>
              <td>
                {user ? (
                  <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
                ) : (
                  movie.title
                )}
              </td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td>
                {user && (
                  <button
                    onClick={() => onDelete(movie)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default MoviesTable;
