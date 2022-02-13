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
}) => {
  return (
    <TextField
      className="w-full"
      type={type}
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
