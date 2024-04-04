import { CssBaseline, Fab, ThemeProvider } from "@mui/material"
import { HashRouter, Route, Routes } from "react-router-dom"
import AccountView from "./views/AccountView";
import AddonView from "./views/AddonView";
import MonsterView from "./views/MonsterView";
import darkTheme from "./theme";
import { Coffee } from "@mui/icons-material";

function App() {
  return (
    <HashRouter>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<AccountView />} />
          <Route path="/addons/:addonId" element={<AddonView />} />
          <Route path="/addons/:addonId/monsters/:monsterId/*" element={<MonsterView />} />
        </Routes>
        <Fab sx={{ position: "fixed", bottom: 5, right: 5 }} size="small" href="https://ko-fi.com/timsminecraftmods" target="_blank">
          <Coffee />
        </Fab>
      </ThemeProvider>
    </HashRouter>
  )
}

export default App
