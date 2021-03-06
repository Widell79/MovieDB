import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import MoviesTable from "./moviesTable";
import SearchBox from "./searchBox";
//import { getMovies, deleteMovie } from "../services/fakeMovieService";
import { getMovies, deleteMovie } from "../services/movieService";
//import { getGenres } from "../services/fakeGenreService";
import { getGenres } from "../services/genreService";
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
  //Local fake db data
  // componentDidMount() {
  //   const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
  //   this.setState({ movies: getMovies(), genres: genres });
  // }

  //Real db fetched data. {data} from axios result
  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];

    const { data: movies } = await getMovies();
    this.setState({ movies, genres: genres });
  }

  deleteHandler = async (movie) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((mov) => mov._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    } catch (exept) {
      if (exept.response && exept.response.status === 404)
        toast.error("This movie has already been deleted.");

      this.setState({ movies: originalMovies });
    }
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
    const { user } = this.props;

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.genreSelectHandler}
          />
          <br />
          {user && (
            <Link to="/movies/new" className="btn btn-primary">
              New Movie
            </Link>
          )}
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
            user={user}
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
