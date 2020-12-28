import React, { Component, useState } from "react";
import "./App.css";
import queryString from "query-string";
import styled from "styled-components";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  createMuiTheme,
  ThemeProvider,
  Button,
  Input,
  FormHelperText,
  Grid,
} from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import ReactDOM from "react-dom";
import ArrowDropDownCircleOutlinedIcon from "@material-ui/icons/ArrowDropDownCircleOutlined";

const selectStyling = createMuiTheme({
  overrides: {
    // Style sheet name ⚛️
    MuiSelect: {
      // Name of the rule
      icon: {
        color: "white",
      },

      root: {
        color: "white",
      },

      "&:hover": {
        "border-bottom": "1px solid pink",
        "border-top": "1px solid pink",
      },
    },
  },
});

const menuStyling = createMuiTheme({
  overrides: {
    // Style sheet name ⚛️
    MuiMenuItem: {
      // Name of the rule
      icon: {
        color: "yellow",
      },
    },
  },
});

const formStyling = createMuiTheme({
  overrides: {
    // Style sheet name ⚛️
    MuiFormControl: {
      // Name of the rule

      "&:hover": {
        "border-bottom": "1px solid pink",
        "border-top": "1px solid pink",
      },

      root: {
        width: "300px",
        color: "white",
      },
    },
  },
});

const MainHeading = styled.h1`
  font-size: 54px;
  color: white;

  /* Small phones: from 0 to 480px */
  @media only screen and (max-width: 480px) {
    font-size: 40px;
  }
`;

const GenerateButton = styled.button`
  color: white;
  font-size: 20px;
  background-color: #1db954;
  border-radius: 30px;
  border: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  outline: none;
  border: 1px solid #1db954;
  padding: 10px 90px;
  margin-top: 20px;

  &:hover {
    transform: scale(1.05);
  }
`;

const RenderContainer = styled.div`
  margin: 40px 20% 0 20%;

  /* Laptops: from 1201px to 1686px */
  @media only screen and (max-width: 1686px) {
    margin: 40px 10px 0 10px;
  }

  /* Big tablet to 1200px (widths smaller than the 1140px row) */
  @media only screen and (max-width: 1200px) {
    margin: 40px auto 0 auto;
    text-align: center;
    display: inline-block;
  }

  /* Small tablet to big tablet: from 768px to 1023px */
  @media only screen and (max-width: 1023px) {
  }

  /* Small phones to small tablets: from 481px to 767px */
  @media only screen and (max-width: 767px) {
    display: block;
  }

  /* Small phones: from 0 to 480px */
  @media only screen and (max-width: 480px) {
    display: block;
  }
`;

const GreenButton = styled.button`
  color: white;
  font-size: 40px;
  background-color: #1db954;
  border-radius: 40px;
  border: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  outline: none;
  border: 1px solid #1db954;
  padding: 10px 90px;
  margin-top: 20%;

  &:hover {
    transform: scale(1.05);
  }
`;

const DivCard = styled.div`
  width: 300px;
  height: 240px;
  border-radius: 5px;
  background-color: #fff;
  padding-top: 10px;
  margin: 40px auto 10px auto;

  /* Big tablet to 1200px (widths smaller taht the 1140px row) */
  @media only screen and (max-width: 1200px) {
  }

  /* Small tablet to big tablet: from 768px to 1023px */
  @media only screen and (max-width: 1023px) {
  }

  /* Small phones to small tablets: from 481px to 767px */
  @media only screen and (max-width: 767px) {
  }

  /* Small phones: from 0 to 480px */
  @media only screen and (max-width: 480px) {
  }
`;

const BoldParagraph = styled.p`
  font-weight: bold;
`;

let defaultStyle = {
  color: "#fff",
};

class Artist extends Component {
  render() {
    let artist = this.props.artist;
    return (
      <DivCard>
        <BoldParagraph>({artist.index})</BoldParagraph>
        <img src={artist.imageUrl} style={{ height: "100px" }} />
        <h3>{artist.name}</h3>
      </DivCard>
    );
  }
}

class Track extends Component {
  render() {
    let track = this.props.track;
    return (
      <DivCard>
        <BoldParagraph>({track.index})</BoldParagraph>
        <img src={track.imageUrl} style={{ height: "100px" }} />
        <h3>{track.name}</h3>
      </DivCard>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      serverData: {},
      filterString: "",
    };
  }
  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    if (!accessToken) return;
    if (accessToken == "undefined") return;
    fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: "Bearer " + accessToken },
    })
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          user: {
            name: data.display_name,
          },
        })
      );

    fetch("https://api.spotify.com/v1/me/top/artists?time_range=long_term", {
      headers: { Authorization: "Bearer " + accessToken },
    })
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          artistsLongTerm: data.items.map((item, index) => {
            return {
              name: item.name,
              imageUrl: item.images[0].url,
              index: ++index,
            };
          }),
        })
      );

    fetch("https://api.spotify.com/v1/me/top/tracks?time_range=long_term", {
      headers: { Authorization: "Bearer " + accessToken },
    })
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          tracksLongTerm: data.items.map((item, index) => {
            return {
              name: item.name,
              imageUrl: item.album.images[0].url,
              index: ++index,
            };
          }),
        })
      );

    fetch("https://api.spotify.com/v1/me/top/artists?time_range=medium_term", {
      headers: { Authorization: "Bearer " + accessToken },
    })
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          artistsMediumTerm: data.items.map((item, index) => {
            return {
              name: item.name,
              imageUrl: item.images[0].url,
              index: ++index,
            };
          }),
        })
      );

    fetch("https://api.spotify.com/v1/me/top/tracks?time_range=medium_term", {
      headers: { Authorization: "Bearer " + accessToken },
    })
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          tracksMediumTerm: data.items.map((item, index) => {
            return {
              name: item.name,
              imageUrl: item.album.images[0].url,
              index: ++index,
            };
          }),
        })
      );

    fetch("https://api.spotify.com/v1/me/top/artists?time_range=short_term", {
      headers: { Authorization: "Bearer " + accessToken },
    })
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          artistsShortTerm: data.items.map((item, index) => {
            return {
              name: item.name,
              imageUrl: item.images[0].url,
              index: ++index,
            };
          }),
        })
      );

    fetch("https://api.spotify.com/v1/me/top/tracks?time_range=short_term", {
      headers: { Authorization: "Bearer " + accessToken },
    })
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          tracksShortTerm: data.items.map((item, index) => {
            return {
              name: item.name,
              imageUrl: item.album.images[0].url,
              index: ++index,
            };
          }),
        })
      );
  }

  render() {
    let type = "";

    const renderType = (event) => {
      let e = document.getElementById("preference");
      let typePrefrence = e.value;

      let f = document.getElementById("timeframe");
      let timeFrame = f.value;

      const renderArtistsLongTerm = (
        <Grid container>
          {artistToRenderLongTerm.map((artist) => (
            <Grid item xl={4} xs={12} sm={6} md={4} lg={4}>
              <Artist artist={artist} />
            </Grid>
          ))}
        </Grid>
      );

      const renderTracksLongTerm = (
        <Grid container>
          {tracksToRenderLongTerm.map((track) => (
            <Grid item xl={4} xs={12} sm={6} md={4} lg={4}>
              <Track track={track} />
            </Grid>
          ))}
        </Grid>
      );

      const renderArtistsMediumTerm = (
        <Grid container>
          {artistToRenderMediumTerm.map((artist) => (
            <Grid item xl={4} xs={12} sm={6} md={4} lg={4}>
              <Artist artist={artist} />
            </Grid>
          ))}
        </Grid>
      );

      const renderTracksMediumTerm = (
        <Grid container>
          {tracksToRenderMediumTerm.map((track) => (
            <Grid item xl={4} xs={12} sm={6} md={4} lg={4}>
              <Track track={track} />
            </Grid>
          ))}
        </Grid>
      );

      const renderArtistsShortTerm = (
        <Grid container>
          {artistToRenderShortTerm.map((artist) => (
            <Grid item xl={4} xs={12} sm={6} md={4} lg={4}>
              <Artist artist={artist} />
            </Grid>
          ))}
        </Grid>
      );

      const renderTracksShortTerm = (
        <Grid container>
          {tracksToRenderShortTerm.map((track) => (
            <Grid item xl={4} xs={12} sm={6} md={4} lg={4}>
              <Track track={track} />
            </Grid>
          ))}
        </Grid>
      );

      if (typePrefrence === "artists" && timeFrame === "alltime") {
        ReactDOM.render(
          renderArtistsLongTerm,
          document.getElementById("renderArea")
        );
      } else if (typePrefrence === "tracks" && timeFrame === "alltime") {
        ReactDOM.render(
          renderTracksLongTerm,
          document.getElementById("renderArea")
        );
      } else if (typePrefrence === "artists" && timeFrame === "sixmonths") {
        ReactDOM.render(
          renderArtistsMediumTerm,
          document.getElementById("renderArea")
        );
      } else if (typePrefrence === "tracks" && timeFrame === "sixmonths") {
        ReactDOM.render(
          renderTracksMediumTerm,
          document.getElementById("renderArea")
        );
      } else if (typePrefrence === "artists" && timeFrame === "month") {
        ReactDOM.render(
          renderArtistsShortTerm,
          document.getElementById("renderArea")
        );
      } else if (typePrefrence === "tracks" && timeFrame === "month") {
        ReactDOM.render(
          renderTracksShortTerm,
          document.getElementById("renderArea")
        );
      }
    };

    let artistToRenderLongTerm =
      this.state.user && this.state.artistsLongTerm
        ? this.state.artistsLongTerm.filter((artist) => artist.name)
        : [];

    let tracksToRenderLongTerm =
      this.state.user && this.state.tracksLongTerm
        ? this.state.tracksLongTerm.filter((track) => track.name)
        : [];

    let artistToRenderMediumTerm =
      this.state.user && this.state.artistsMediumTerm
        ? this.state.artistsMediumTerm.filter((artist) => artist.name)
        : [];

    let tracksToRenderMediumTerm =
      this.state.user && this.state.tracksMediumTerm
        ? this.state.tracksMediumTerm.filter((track) => track.name)
        : [];

    let artistToRenderShortTerm =
      this.state.user && this.state.artistsShortTerm
        ? this.state.artistsShortTerm.filter((artist) => artist.name)
        : [];

    let tracksToRenderShortTerm =
      this.state.user && this.state.tracksShortTerm
        ? this.state.tracksShortTerm.filter((track) => track.name)
        : [];

    return (
      <div className="App">
        {this.state.user ? (
          <div>
            <div>
              <MainHeading>{this.state.user.name}'s Profile</MainHeading>
            </div>
            <div>
              <form>
                <br />
                <br />
                <select
                  name="preference"
                  id="preference"
                  style={{
                    width: "300px",
                    height: "40px",
                    "text-align": "center",
                    "font-size": "20px",
                    "margin-right": "auto",
                    "margin-left": "auto",
                    "background-color": "#121212",
                    color: "#fff",
                    border: "none",
                    "border-bottom": "1px solid #fff",
                    "text-align-first": "center",
                  }}
                >
                  <option value="" disabled selected value>
                    Select Artists / Tracks
                  </option>
                  <option value="artists">Artists</option>
                  <option value="tracks">Tracks</option>
                </select>
              </form>
              <form>
                <br />
                <br />
                <select
                  name="timeframe"
                  id="timeframe"
                  style={{
                    width: "300px",
                    height: "40px",
                    "text-align": "center",
                    "font-size": "20px",
                    "margin-right": "auto",
                    "margin-left": "auto",
                    "background-color": "#121212",
                    color: "#fff",
                    border: "none",
                    "border-bottom": "1px solid #fff",
                    "text-align-first": "center",
                  }}
                >
                  <option value="" disabled selected value>
                    Select Timeframe
                  </option>
                  <option value="month">1 Month</option>
                  <option value="sixmonths">6 Months</option>
                  <option value="alltime">All Time</option>
                </select>
              </form>
              <GenerateButton onClick={renderType}>Generate</GenerateButton>
              <RenderContainer>
                <div id="renderArea"></div>
              </RenderContainer>
            </div>
          </div>
        ) : (
          <GreenButton
            className="btn"
            onClick={() => {
              window.location = window.location.href.includes("localhost")
                ? "http://localhost:8888/login"
                : "https://andrejs-tunes-backend.herokuapp.com/login";
            }}
          >
            Sign In
          </GreenButton>
        )}
      </div>
    );
  }
}

export default App;
