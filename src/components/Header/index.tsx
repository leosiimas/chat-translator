"use Client";

import { useTranslations } from "next-intl";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

import { Logout } from "@mui/icons-material";
import { Box, Avatar, Checkbox, FormControlLabel } from "@mui/material";

import LaguageSelect from "../LaguageSelect";

import { useUser } from "@/app/providers/user-provider";

export default function Header() {
  const t = useTranslations();
  const { user } = useUser();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        paddingLeft: { xs: 1, sm: 2 },
        paddingRight: { xs: 1, sm: 2 },
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Avatar
          alt="Remy Sharp"
          src=""
          sx={{
            width: 60,
            height: 60,
          }}
        />
        <Box
          sx={{
            marginLeft: 2,
          }}
        >
          {user?.userName}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
        }}
      >
        <LaguageSelect />
        <FormControlLabel
          sx={{ marginLeft: 2 }}
          control={<Checkbox defaultChecked />}
          label={t("autoTranslation")}
        />
      </Box>
      <Logout
        onClick={() => signOut(auth)}
        sx={{
          fontSize: 30,
          cursor: "pointer",
          "&:hover": {
            color: "primary.main",
          },
        }}
      />
    </Box>
  );
}
