import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Card, CardMedia, CardTitle, CardText } from "material-ui/Card";
import { Link } from "react-router-dom";
import Page from "../../components/Page/Page";
import { addNotification } from "../../../actions/notification";
import { fetchImage, getImagePlaceholder } from "../../../helpers/dataHelper";

import { searchMovies, getMovie } from "../../../api/api";
import "./Homepage.css";

class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      showGlobalLoader: true,
      currentPage: 1
    };

    this.refImages = [];
  }

  /**
   * Check data to avoid error.
   *
   * @param {*} movie
   */
  async prepareData(movie) {
    let { poster } = movie;

    if (typeof poster !== "string" || !poster.startsWith("http")) {
      // Set default image if doesn't starts with http.
      poster = getImagePlaceholder();
    }

    // try {
    //   // Check poster: To avoid error with image (403).
    //   poster = await fetchImage(poster);
    //   // Now current poster is valid.
    // } catch (err) {
    //   // No image.
    //   poster = "";
    // }

    return {
      ...movie,
      poster
    };
  }

  async getMovieDetailled(movie) {
    const movieDetailled = await getMovie(movie.imdb);
    return await this.prepareData({
      ...movie,
      ...movieDetailled
    });
  }

  async getMoviesDetailled(movies) {
    return await Promise.all(
      movies.map(async movie => await this.getMovieDetailled(movie))
    );
  }

  async componentDidMount() {
    const movies = await searchMovies({
      terms: "matrix", // Required string
      //year: 1999, // optional number
      //type: "movie", // optional string ("series" || "movie" || "episode")
      page: 1 // optional number (1 - 100)
    });

    let moviesDetailled = await this.getMoviesDetailled(movies);

    console.log("DEBUG moviesDetailled", moviesDetailled);

    this.setState({
      movies: moviesDetailled,
      showGlobalLoader: false
    });
  }

  render() {
    const { movies } = this.state;
    return (
      <Page title="Homepage" id="homepage">
        <h1>See my world</h1>
        <button
          onClick={() => this.props.addNotification({ text: "this is great" })}
        >
          Add notification
        </button>
        {movies.map((movie, i) => (
          <div className="Card" key={i}>
            <button onClick={() => this.animate(i)}>Click</button>
            <Card>
              <Link to={`/movie/${movie.imdb.id}`} className="Card-link">
                <div ref={img => (this.refImages[i] = img)}>
                  <CardMedia
                    className="Card-media"
                    style={{ backgroundImage: `url(${movie.poster})` }}
                    overlay={<CardTitle title={movie.title} />}
                    overlayContentStyle={{ background: "transparent" }}
                    overlayStyle={{ color: "#fff" }}
                  />
                </div>
                <CardText>{movie.plot}</CardText>
              </Link>
            </Card>
          </div>
        ))}
      </Page>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ addNotification }, dispatch);

export default connect(null, mapDispatchToProps)(Homepage);
