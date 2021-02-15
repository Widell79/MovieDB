import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import MoviesTable from "./moviesTable";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./listGroup";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "" },
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres: genres });
  }

  deleteHandler = (movie) => {
    const filtered_movies = this.state.movies.filter(
      (mov) => mov._id !== movie._id
    );
    this.setState({ movies: filtered_movies });
  };

  pageHandler = (page) => {
    this.setState({ currentPage: page });
  };

  genreSelectHandler = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  sortHandler = (path) => {
    this.setState({ sortColumn: { path: path, order: "asc" } });

    if (this.state.sortColumn.order === "asc") {
      this.setState({ sortColumn: { path: path, order: "desc" } });
    }
  };
  render() {
    if (this.state.movies.length === 0) {
      return <h3>There are no movies in the database.</h3>;
    }
    const filtered =
      this.state.selectedGenre && this.state.selectedGenre._id
        ? this.state.movies.filter(
            (m) => m.genre._id === this.state.selectedGenre._id
          )
        : this.state.movies;

    const sorted = _.orderBy(
      filtered,
      [this.state.sortColumn.path],
      [this.state.sortColumn.order]
    );

    const movies = paginate(
      sorted,
      this.state.currentPage,
      this.state.pageSize
    );
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.genreSelectHandler}
          />
          <br />
          <Link to="/movies/new">
            <button className="btn btn-primary">New Movie</button>
          </Link>
        </div>
        <div className="col">
          <h3>{`Showing ${filtered.length} movies in the database.`}</h3>
          <br />
          <MoviesTable
            movies={movies}
            onDelete={this.deleteHandler}
            onSort={this.sortHandler}
            sortOrder={this.state.sortColumn.order}
            column={this.state.sortColumn.path}
          />
          <Pagination
            itemsCount={filtered.length}
            pageSize={this.state.pageSize}
            onPageChange={this.pageHandler}
            currentPage={this.state.currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
