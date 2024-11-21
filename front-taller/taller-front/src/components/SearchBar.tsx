import React from "react";
import { Box, TextField } from "@mui/material";
import Colors from "../utils/Colors";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  placeholder = "Buscar...",
}) => {
  return (
    <Box sx={{ mb: 3, display: "flex", justifyContent: "center" }}>
      <TextField
        variant="outlined"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{
          width: "100%",
          mx: "auto",
          backgroundColor: Colors.White,
          borderRadius: "24px",
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
        }}
      />
    </Box>
  );
};

export default SearchBar;
