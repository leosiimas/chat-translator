"use Client"

import { useTranslations } from "next-intl";

import { signOut} from "firebase/auth";
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
        paddingLeft: 5,
        paddingRight: 5,
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
      <Box>
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
