"use client";

import { useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
  Typography,
  SelectChangeEvent,
} from "@mui/material";

export default function LaguageSelect() {
  const [country, setCountry] = useState("br");

  const handleChange = (event: SelectChangeEvent) => {
    setCountry(event.target.value);
  };

  return (
    <FormControl size="small">
      <Select
        labelId="select-country-label"
        id="select-country"
        value={country}
        onChange={handleChange}
      >
        <MenuItem value="br">
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src="/flags/br.png"
              alt="Brasil"
              style={{ width: 24, height: 16, marginRight: 8 }}
            />
            <Typography>Brasil</Typography>
          </Box>
        </MenuItem>
        <MenuItem value="kr">
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src="/flags/kr.png"
              alt="Coreia do Sul"
              style={{ width: 24, height: 16, marginRight: 8 }}
            />
            <Typography>Coreia do Sul</Typography>
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  );
}
