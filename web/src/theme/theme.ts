"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: { main: "#1f4e79" },
    secondary: { main: "#b5522b" },
  },
});

export default theme;
