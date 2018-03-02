import React, { Component } from "react";
import Page from "../../components/Page/Page";
import { getMovie } from "../../../api/api";

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {}
    };
  }

  componentDidMount() {
    this.refreshSingleMovie(this.props.match.params.imdbid);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.imdbid !== this.props.match.params.imdbid) {
      // Fix bug: force to refresh movie state when movie id change.
      this.refreshSingleMovie(nextProps.match.params.imdbid);
    }
  }

  async refreshSingleMovie(movieId) {
    const filterMovie = await getMovie(movieId);

    if (!filterMovie) {
      // This movie doesn't exist.
      return;
    }

    this.setState({
      movie: filterMovie
    });
  }

  render() {
    const { movie: { title, plot, poster } } = this.state;
    return (
      <Page
        title="Movie"
        description="This page will have a custom set description"
        id="movie"
      >
        <h1>{title}</h1>
        <img src={poster} alt={title} />
        <p>{plot}</p>
      </Page>
    );
  }
}

export default Movie;
