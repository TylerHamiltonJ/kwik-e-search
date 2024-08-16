const express = require("express");
const fs = require("fs").promises;
const Papa = require("papaparse");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 3000;

const scriptFilePath = path.join(__dirname, "data/simpsons_script_lines.csv");
const episodesFilePath = path.join(__dirname, "data/simpsons_episodes.csv");

// Use CORS middleware
app.use(cors());

// Function to read and parse CSV
async function parseCSV(filePath) {
  const data = await fs.readFile(filePath, "utf8");
  return new Promise((resolve, reject) => {
    Papa.parse(data, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => resolve(results.data),
      error: (error) => reject(error),
    });
  });
}

// Function to generate the wiki URL
function generateWikiUrl(title) {
  return `https://simpsons.fandom.com/wiki/${encodeURIComponent(title.replace(/\s+/g, "_"))}`;
}

// Endpoint to search by character, season, episode, quote, and episode name
app.get("/search", async (req, res) => {
  const {
    character = "",
    season = "",
    episode = "",
    quote = "",
    episodeName = "",
  } = req.query;

  try {
    // Parse both CSV files
    const [scriptLines, episodes] = await Promise.all([
      parseCSV(scriptFilePath),
      parseCSV(episodesFilePath),
    ]);

    // Create a map for episode data by id
    const episodeMap = new Map(
      episodes.map((episode) => [
        episode["id"],
        {
          title: episode["title"],
          season: episode["season"],
          number_in_season: episode["number_in_season"],
          wiki_url: generateWikiUrl(episode["title"]),
        },
      ])
    );

    // Filter script lines based on query parameters
    const filteredResults = scriptLines.filter((row) => {
      const rowCharacter = (row["raw_character_text"] || "").toLowerCase();
      const rowText = (row["raw_text"] || "")
        .replace(/^[^:]*: /, "") // Remove text before and including the colon
        .replace(/ *\([^)]*\) */g, "") // Remove text within parentheses
        .toLowerCase();
      const rowEpisodeId = row["episode_id"];
      const episodeData = episodeMap.get(rowEpisodeId) || {};

      return (
        (character === "" || rowCharacter.includes(character.toLowerCase())) &&
        (season === "" || episodeData.season.includes(season.toLowerCase())) &&
        (episode === "" ||
          episodeData.title.toLowerCase().includes(episode.toLowerCase())) &&
        (quote === "" || rowText.includes(quote.toLowerCase())) &&
        (episodeName === "" ||
          episodeData.title
            .toLowerCase()
            .includes(episodeName.toLowerCase())) &&
        rowCharacter.trim() !== ""
      ); // Exclude rows with no character
    });

    // Add episode data, season numbers, episode numbers, and wiki URLs to filtered results
    const resultsWithTitles = filteredResults.map((row) => {
      const episodeData = episodeMap.get(row["episode_id"]) || {};
      return {
        id: row["id"],
        episode_id: row["episode_id"],
        number: row["number"],
        season: episodeData.season || "Unknown",
        number_in_season: episodeData.number_in_season || "Unknown",
        raw_text: row["raw_text"].replace(/^[^:]*: /, ""),
        timestamp_in_ms: row["timestamp_in_ms"],
        speaking_line: row["speaking_line"],
        raw_character_text: row["raw_character_text"],
        episode_title: episodeData.title || "Unknown",
        wiki_url: episodeData.wiki_url || "Unknown",
      };
    });

    // Sort results by id and limit to 100 entries
    const sortedResults = resultsWithTitles
      .sort((a, b) => a.id - b.id) // Sort by id in ascending order
      .slice(0, 100); // Limit to 100 entries

    // Respond with JSON
    res.json(sortedResults);
  } catch (error) {
    console.error("Error processing the CSV files:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
