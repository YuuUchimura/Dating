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

const DateGenres = [
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
