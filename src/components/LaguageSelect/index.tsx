"use client";
import { useLanguage } from "@/app/providers/i18n-provider";
import {
  FormControl,
  MenuItem,
  Select,
  Box,
  Typography,
  SelectChangeEvent,
} from "@mui/material";

export default function LaguageSelect() {
  const { locale, setLocale } = useLanguage();

  const handleChange = (event: SelectChangeEvent) => {
    setLocale(event.target.value);
  };

  return (
    <FormControl size="small">
      <Select
        labelId="select-country-label"
        id="select-country"
        value={locale}
        onChange={handleChange}
      >
        <MenuItem value="pt">
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src="/flags/br.png"
              alt="Brasil"
              style={{ width: 24, height: 16, marginRight: 8 }}
            />
            <Typography>Brasil</Typography>
          </Box>
        </MenuItem>
        <MenuItem value="ko">
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src="/flags/kr.png"
              alt="Coreia do Sul"
              style={{ width: 24, height: 16, marginRight: 8 }}
            />
            <Typography>브라질</Typography>
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  );
}
