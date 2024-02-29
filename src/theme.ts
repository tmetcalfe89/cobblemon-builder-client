import { createTheme } from "@mui/material";

const activeHighlight = {
  "&.active": {
    backgroundColor: `rgba(144, 202, 249, 0.16)`,
  },
};

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          ...activeHighlight,
        },
      },
    },
  },
});

export default darkTheme;
