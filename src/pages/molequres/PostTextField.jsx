import React from "react";
import TextField from "@mui/material/TextField";

export const PostTextField = ({
  type = "text",
  label,
  title,
  onChange,
  id = "standard-required",
  defaultValue,
  variant = "standard",
  multiline,
  placeholder,
  rows,
  width = "30vw"
}) => {
  const textStyle = {
    width: { width },
  };
  return (
    <TextField
      type={type}
      sx={textStyle}
      required
      id={id}
      defaultValue={defaultValue}
      label={label}
      variant={variant}
      value={title}
      onChange={onChange}
      multiline={multiline}
      rows={rows}
      placeholder={placeholder}
    />
  );
};
