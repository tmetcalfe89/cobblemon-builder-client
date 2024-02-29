import { CssBaseline, ThemeProvider } from "@mui/material"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import AccountView from "./views/AccountView";
import AddonView from "./views/AddonView";
import MonsterView from "./views/MonsterView";
import darkTheme from "./theme";



function App() {
  return (
    <BrowserRouter basename="cobblemon-builder-client">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<AccountView />} />
          <Route path="/addons/:addonId" element={<AddonView />} />
          <Route path="/addons/:addonId/monsters/:monsterId/*" element={<MonsterView />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
