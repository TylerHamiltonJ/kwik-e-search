import React from "react";
import {
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Grid,
  CircularProgress,
} from "@mui/material";

const MAX_SEASON = 28;
const MAX_EPISODE = 30;

const SearchForm = ({
  character,
  setCharacter,
  season,
  setSeason,
  episode,
  setEpisode,
  quote,
  setQuote,
  episodeName,
  setEpisodeName,
  handleSearch,
  loading,
}) => {
  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <TextField
          // label="Quote"
          variant="outlined"
          fullWidth
          sx={{
            "& > :not(style)": { m: 1 },
          }}
          margin="normal"
          value={quote}
          placeholder="Search by quote: I sleep in a big bed with my wife."
          onChange={(e) => setQuote(e.target.value)}
        />
      </Grid>
      <Grid item container spacing={2} alignItems="center">
        <Grid item xs={12} md={3}>
          <TextField
            label="Character Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={character}
            onChange={(e) => setCharacter(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="Episode Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={episodeName}
            onChange={(e) => setEpisodeName(e.target.value)}
          />
        </Grid>
        <Grid item xs={6} md={2}>
          <FormControl variant="standard" fullWidth>
            <InputLabel>Season</InputLabel>
            <Select
              value={season}
              onChange={(e) => setSeason(e.target.value)}
              label="Season"
            >
              <MenuItem value="">All seasons</MenuItem>
              {Array.from({ length: MAX_SEASON }, (_, i) => (
                <MenuItem key={i + 1} value={i + 1}>
                  {i + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} md={2}>
          <FormControl variant="standard" fullWidth>
            <InputLabel>Episode</InputLabel>
            <Select
              value={episode}
              onChange={(e) => setEpisode(e.target.value)}
              label="Episode"
            >
              <MenuItem value="">All seasons</MenuItem>
              {Array.from({ length: MAX_EPISODE }, (_, i) => (
                <MenuItem key={i + 1} value={i + 1}>
                  {i + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          fullWidth
          disabled={loading} // Disable the button while loading
          endIcon={loading && <CircularProgress size={24} />} // Show spinner if loading
        >
          {loading ? "Searching..." : "Search"}
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchForm;
