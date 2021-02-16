import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import MoviesTable from "./moviesTable";
import SearchBox from "./searchBox";
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
    searchQuery: "",
    selectedGenre: null,
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
    this.setState({ selectedGenre: genre, searchQuerry: "", currentPage: 1 });
  };

  searchHandler = (query) => {
    console.log(query);
    this.setState({
      searchQuery: query,
      selectedGenre: null,
      currentPage: 1,
    });
  };

  sortHandler = (path) => {
    this.setState({ sortColumn: { path: path, order: "asc" } });

    if (this.state.sortColumn.order === "asc") {
      this.setState({ sortColumn: { path: path, order: "desc" } });
    }
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      searchQuery,
      movies: allMovies,
    } = this.state;

    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { filtered, data: movies };
  };

  render() {
    const { filtered, data: movies } = this.getPagedData();

    if (this.state.movies.length === 0) {
      return <h3>There are no movies in the database.</h3>;
    }

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
          <SearchBox
            value={this.state.searchQuery}
            onChange={this.searchHandler}
          />
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
