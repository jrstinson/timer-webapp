import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RoundOptions from './pages/RoundOptions'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Button, Grid } from '@mui/material'

const theme = createTheme({
  palette: {
    primary: {
      main: '#7FB069',
      accent: "#FFFBBD",
      text: "#1d1a05"
    },
    secondary: {
      main: '#E6AA68',
      accent: "#CA3C25",
      text: "#1d1a05"
    },
    background: {
      default: '#FFFBBD'
    },
    text: {
      primary: "#1d1a05"
    }
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

function App() {
  const [count, setCount] = useState(0)
  const [roundOptions, setRoundOptions] = useState({})
  const [clockStarted, setClockStarted] = useState(false)

  const [dotColor, setDotColor] = useState(theme.palette.primary.accent)

  document.body.style.backgroundColor = theme.palette.secondary.main

  useEffect(() => {
    if (clockStarted && clockStarted === true) {
      setDotColor(theme.palette.secondary.accent)
    }
    else {
      setDotColor(theme.palette.primary.accent)
    }
  }, [clockStarted])

  return (
    <ThemeProvider theme={theme}>
      <span className='dot' style={{ backgroundColor: dotColor, display: 'flex', transform: clockStarted ? "rotateY(180deg)" : "" }}>
        {!clockStarted && (
          <RoundOptions setRoundOptions={setRoundOptions} setClockStarted={setClockStarted} clockStarted={clockStarted}></RoundOptions>
        )}
        {clockStarted && (
          <Grid container sx={{ transform: "rotateY(180deg)" }} alignItems={'center'}>
            <Grid item xs={12}>
              <Button sx={{ color: theme.palette.primary.text }} onClick={(e) => {
                e.preventDefault()
                setClockStarted(false)
              }}>Flip</Button>
            </Grid>
          </Grid>
        )}
      </span>
    </ThemeProvider>
  )
}

export default App
