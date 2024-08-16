import React from 'react';
import { TableCell, TableSortLabel } from '@mui/material';

const TableCells = ({ order, orderBy, onRequestSort }) => {
  return (
    <>
      <TableCell>
        <TableSortLabel
          active={orderBy === 'episode_title'}
          direction={orderBy === 'episode_title' ? order : 'asc'}
          onClick={() => onRequestSort('episode_title')}
        >
          Episode Title
        </TableSortLabel>
      </TableCell>
      <TableCell>
        <TableSortLabel
          active={orderBy === 'raw_character_text'}
          direction={orderBy === 'raw_character_text' ? order : 'asc'}
          onClick={() => onRequestSort('raw_character_text')}
        >
          Character
        </TableSortLabel>
      </TableCell>
      <TableCell>
        <TableSortLabel
          active={orderBy === 'raw_text'}
          direction={orderBy === 'raw_text' ? order : 'asc'}
          onClick={() => onRequestSort('raw_text')}
        >
          Quote
        </TableSortLabel>
      </TableCell>
      <TableCell>
        <TableSortLabel
          active={orderBy === 'season'}
          direction={orderBy === 'season' ? order : 'asc'}
          onClick={() => onRequestSort('season')}
        >
          Season
        </TableSortLabel>
      </TableCell>
      <TableCell>
        <TableSortLabel
          active={orderBy === 'number_in_season'}
          direction={orderBy === 'number_in_season' ? order : 'asc'}
          onClick={() => onRequestSort('number_in_season')}
        >
          Episode Number
        </TableSortLabel>
      </TableCell>
    </>
  );
};

export default TableCells;
