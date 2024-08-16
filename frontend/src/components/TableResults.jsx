import React from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableCell,
} from "@mui/material";
import TableCells from "./TableCells";

const TableResults = ({ results, order, orderBy, handleRequestSort }) => {
  const sortedResults = results.slice().sort((a, b) => {
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

  return (
    <TableContainer component={Paper} style={{ marginTop: "20px" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCells
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedResults.map((result) => (
            <TableRow key={result.id}>
              <TableCell>
                <a
                  href={result.wiki_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {result.episode_title}
                </a>
              </TableCell>
              <TableCell>{result.raw_character_text}</TableCell>
              <TableCell>{result.raw_text}</TableCell>
              <TableCell>{result.season}</TableCell>
              <TableCell>{result.number_in_season}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableResults;
