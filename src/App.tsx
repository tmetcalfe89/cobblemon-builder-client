import { CssBaseline, ThemeProvider } from "@mui/material"
import { HashRouter, Route, Routes } from "react-router-dom"
import AccountView from "./views/AccountView";
import AddonView from "./views/AddonView";
import MonsterView from "./views/MonsterView";
import darkTheme from "./theme";

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
      </ThemeProvider>
    </HashRouter>
  )
}

export default App
