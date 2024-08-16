import React, { useState, useEffect } from "react";
import { Container, CircularProgress, Typography, Skeleton } from "@mui/material";
import axios from "axios";
import TableResults from "./components/TableResults";
import SearchForm from "./components/SearchForm";
import NoResults from "./components/NoResults";
import logo from "./assets/logo.png"; // Import the image

const SearchInterface = () => {
  const [character, setCharacter] = useState("");
  const [season, setSeason] = useState("");
  const [episode, setEpisode] = useState("");
  const [quote, setQuote] = useState("");
  const [episodeName, setEpisodeName] = useState(""); // Add episodeName state
  const [results, setResults] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("season");
  const [loading, setLoading] = useState(false); // Add loading state
  const [searchInitiated, setSearchInitiated] = useState(false); // Track if search has been initiated

  const handleSearch = async () => {
    setSearchInitiated(true); // Set searchInitiated to true when search starts
    setLoading(true); // Set loading to true when search starts
    try {
      const response = await axios.get("http://localhost:3000/search", {
        params: {
          character,
          season,
          episode,
          quote,
          episodeName, // Include episodeName in the search
        },
      });
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Set loading to false when search completes
    }
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  useEffect(() => {
    setResults((prevResults) => sortResults(prevResults));
  }, [order, orderBy]);

  const sortResults = (data) => {
    return data.slice().sort((a, b) => {
      if (orderBy === "season" || orderBy === "number_in_season") {
        const aValue = Number(a[orderBy]);
        const bValue = Number(b[orderBy]);
        if (aValue < bValue) {
          return order === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return order === "asc" ? 1 : -1;
        }
      } else {
        if (a[orderBy] < b[orderBy]) {
          return order === "asc" ? -1 : 1;
        }
        if (a[orderBy] > b[orderBy]) {
          return order === "asc" ? 1 : -1;
        }
      }
      return 0;
    });
  };

  return (
    <Container>
      <img
        src={logo}
        alt="Kwik-E-Search Logo"
        style={{
          width: "100%",
          maxWidth: "400px",
          margin: "0 auto",
          display: "block",
        }}
      />
      <SearchForm
        character={character}
        setCharacter={setCharacter}
        season={season}
        setSeason={setSeason}
        episode={episode}
        setEpisode={setEpisode}
        quote={quote}
        setQuote={setQuote}
        episodeName={episodeName}
        setEpisodeName={setEpisodeName}
        handleSearch={handleSearch}
        loading={loading} // Pass loading state to SearchForm
      />
      {loading ? (
        <Skeleton
          variant="rectangular"
          sx={{ marginTop: "20px" }}
          height={400}
        />
      ) : !searchInitiated ? (
        <Typography variant="h6" align="center" sx={{ marginTop: "20px" }}>
          Please search for something!
        </Typography>
      ) : results.length > 0 ? (
        <TableResults
          results={results}
          order={order}
          orderBy={orderBy}
          handleRequestSort={handleRequestSort}
        />
      ) : (
        <NoResults />
      )}
    </Container>
  );
};

export default SearchInterface;
