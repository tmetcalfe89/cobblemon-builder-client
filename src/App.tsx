import { CssBaseline, ThemeProvider, createTheme } from "@mui/material"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import AccountView from "./views/AccountView";
import AddonView from "./views/AddonView";
import MonsterView from "./views/MonsterView";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <BrowserRouter>
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
