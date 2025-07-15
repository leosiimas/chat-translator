"use client";

import Image from "next/image";
import { useLanguage } from "@/app/providers/i18n-provider";
import { useUser } from "@/app/providers/user-provider";
import {
  FormControl,
  MenuItem,
  Select,
  Box,
  Typography,
  SelectChangeEvent,
} from "@mui/material";

export default function LaguageSelect() {
  const { user, updateLanguageUser } = useUser();
  const { locale, setLocale } = useLanguage();

  const handleChange = (event: SelectChangeEvent) => {
    if (user) {
      console.log("here");
      updateLanguageUser(event.target.value);
    }
    setLocale(event.target.value);
  };

  return (
    <FormControl size="small">
      <Select
        labelId="select-country-label"
        id="select-country"
        value={user ? user?.userLang : locale}
        onChange={handleChange}
      >
        <MenuItem value="pt">
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Image
              src="/flags/br.png"
              alt="Brasil"
              width={20}
              height={20}
              style={{ width: 24, height: 16, marginRight: 8 }}
            />
            <Typography>Brasil</Typography>
          </Box>
        </MenuItem>
        <MenuItem value="ko">
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Image
              src="/flags/kr.png"
              alt="Coreia do Sul"
              width={20}
              height={20}
              style={{ width: 24, height: 16, marginRight: 8 }}
            />
            <Typography>브라질</Typography>
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  );
}
