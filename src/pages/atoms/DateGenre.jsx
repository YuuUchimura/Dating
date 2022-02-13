import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Gift from "../../images/gift.jpg";
import Burger from "../../images/burgers.jpg";
import Cafe from "../../images/cafe.jpg";
import Chocolate from "../../images/chocolate.jpg";
import Luxury from "../../images/luxury.jpg";
import Parks from "../../images/parks.jpg";
import Relax from "../../images/relax.jpg";
import Romantic from "../../images/romantic.jpg";
import Shopping from "../../images/shopping.jpg";

export const DateGenre = ({ genre, setGenre }) => {
  return (
    <Autocomplete
      id="tags-standard"
      options={DateGenres}
      getOptionLabel={(option) => option}
      value={genre}
      onChange={(e, value) => {
        setGenre(value);
      }}
      renderInput={(params) => {
        return <TextField {...params} variant="standard" label="デートのジャンル" />;
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
  <img src={Gift} alt="記念日" />,
  <img src={Burger} alt="ランチ" />,
  <img src={Chocolate} alt="食べ歩き" />,
  <img src={Parks} alt="アクティブ" />,
  <img src={Cafe} alt="カジュアル" />,
  <img src={Relax} alt="のんびり" />,
  <img src={Luxury} alt="贅沢" />,
  <img src={Romantic} alt="ロマンティック" />,
  <img src={Shopping} alt="買い物" />,
];
