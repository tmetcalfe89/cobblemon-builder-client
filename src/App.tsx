import { CssBaseline, ThemeProvider, createTheme } from "@mui/material"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import AccountView from "./views/AccountView";

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
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
