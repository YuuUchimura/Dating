import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export const DateGenre = ({ genre, setGenre }) => {

  return (
    <Autocomplete
      multiple
      id="tags-standard"
      options={DateGenres}
      getOptionLabel={(option) => option}
      value={genre}
      onChange={(e, value) => {
        setGenre(value);
      }}
      renderInput={(params) => {
        return <TextField {...params} variant="standard" label="ジャンル" />;
      }}
    />
  );
};

export const DateGenres = [
  "記念日",
  "ランチ",
  "食べ歩き",
  "アクティブ",
  "カジュアル",
  "のんびり",
  "贅沢",
  "ロマンティック",
  "買い物",
];

export const DateGenreImages = [
  <img src="../../public/images/gift.jpg" alt=""/>,
  <img src="../../public/images/burgers.jpg" alt=""/>,
  <img src="../../public/images/chocolate.jpg" alt=""/>,
  <img src="../../public/images/parks.jpg" alt=""/>,
  <img src="../../public/images/cafe.jpg" alt=""/>,
  <img src="../../public/images/relax.jpg" alt=""/>,
  <img src="../../public/images/luxury.jpg" alt=""/>,
  <img src="../../public/images/romantic.jpg" alt=""/>,
  <img src="../../public/images/shopping.jpg" alt=""/>,
  // "記念日",
  // "ランチ",
  // "食べ歩き",
  // "アクティブ",
  // "カジュアル",
  // "のんびり",
  // "贅沢",
  // "ロマンティック",
  // "買い物",
];
