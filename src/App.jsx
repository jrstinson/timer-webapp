import { useEffect, useState } from 'react'
import './App.css'
import RoundOptions from './pages/RoundOptions'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import "ldrs/ring"
import IntervalTimer from './pages/Stopwatch'
import { ring, ping } from 'ldrs'
import useWindowDimensions from './hooks/useWindowDimensions'
import { Backdrop, IconButton, Modal, Paper, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { HelpOutline } from '@mui/icons-material'

ping.register()
ring.register()

const theme = createTheme({
  palette: {
    primary: {
      main: '#7FB069',
      accent: "#FFFBBD",
      text: "#213547"
    },
    secondary: {
      main: '#E6AA68',
      accent: "#CA3C25",
      text: "#1d1a05"
    },
    background: {
      default: '#FFFBBD'
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
  text: {
    primary: {
      main: '#213547'
    }
  }
});

export const turnoverTime = 4500

function App() {
  const [roundOptions, setRoundOptions] = useState({})
  const [clockStarted, setClockStarted] = useState()
  const [flipCoin, setFlipCoin] = useState(false)
  const [loading, setLoading] = useState()
  const [timerLength, setTimerLength] = useState(0)
  const [numberOfRounds, setNumberOfRounds] = useState(0)
  const [openHelpModal, setOpenHelpModal] = useState(false)

  const { height, width } = useWindowDimensions()

  const audio = new Audio('/race-start-beeps.mp3')

  useEffect(() => {
    if (clockStarted === true && flipCoin === false) {
      setLoading(true)
      audio.play()
      setTimeout(() => {
        setLoading(false)
        setFlipCoin(true)
      }, turnoverTime)
    }
    else if (clockStarted === false) {
      setFlipCoin(false)
    }
  }, [clockStarted])

  useEffect(() => {
    setTimeout(() => {
      if (roundOptions.timerLength) {
        setTimerLength(roundOptions.timerLength)
      }
      if (roundOptions.numberOfRounds) {
        setNumberOfRounds(roundOptions.numberOfRounds)
      }
    }, turnoverTime)

  }, [roundOptions])

  document.body.style.backgroundColor = theme.palette.secondary.main

  var dotHeight = "95vw"
  var dotWidth = "95vw"

  var isSquareIsh = Math.abs(Math.max(width, height) / Math.min(width, height)) > 0.7

  if (isSquareIsh) {
    if (Math.max(width, height) === width) {
      dotHeight = "95vh"
      dotWidth = "95vh"
    }

  }

  const HelpModal = () => {
    return (
      <Modal open={openHelpModal} onClose={() => { setOpenHelpModal(false) }}>
        <Paper sx={{ bottom: '10vw', right: '10vw', position: 'absolute', textAlign: 'center', padding: '15px', width: '80vw', }}>
          <Typography variant='h5' style={{ color: theme.palette.primary.text }}>BJJ Round Timer</Typography>
          <br></br>
          <Typography style={{ color: theme.palette.primary.text, fontSize: height > width ? "4vw" : "4vh" }}>The first row of numbers represent the length of each round, in minutes.</Typography>
          <br></br>
          <Typography style={{ color: theme.palette.primary.text, fontSize: height > width ? "4vw" : "4vh" }}>The second row of numbers represent the number of rounds. The right icon represents infinite (999) rounds, so the clock will only stop when you stop it. The left icon can be clicked multiple times to increase the desired number of rounds by 1.</Typography>
          <br></br>
          <Typography style={{ color: theme.palette.primary.text, fontSize: height > width ? "4vw" : "4vh" }}>When you are ready to begin, press "GO!"</Typography>
        </Paper>

      </Modal>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <span className='dot' style={{
          transform: flipCoin ? "rotateY(180deg)" : "",
          borderRadius: "50%",
          transformStyle: "preserve-3d",
          transition: "all 0.25s ease",
          display: "flex",
          height: dotHeight,
          width: dotWidth,
        }}>
          {loading === true && (
            <div style={{
              zIndex: 999,
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              padding: 0,
            }}>
              <l-ring stroke={width > height ? height * .03 : width * .03} size={width > height ? height * .97 : width * .97} speed={2} color={theme.palette.primary.main}></l-ring>
            </div>
          )}
          <div className='dotfront' style={{ background: theme.palette.primary.accent }}>
            <RoundOptions setRoundOptions={setRoundOptions} setClockStarted={setClockStarted} clockStarted={clockStarted} ></RoundOptions>
          </div>
          <div className='dotback' style={{
            background: theme.palette.secondary.accent,
          }
          } >
            {flipCoin === true && (
              <IntervalTimer intervalLength={timerLength} numIntervals={numberOfRounds} setClockStarted={setClockStarted} clockStarted={clockStarted}></IntervalTimer>
            )}
          </div>
        </span>
        <IconButton onClick={(e) => { setOpenHelpModal(true) }} style={{ position: "absolute", bottom: "1vw", right: "1vw", }} >
          <HelpOutline style={{ color: theme.palette.primary.text, fontSize: height > width ? "5vh" : "5vw" }} />
        </IconButton>
        <HelpModal></HelpModal>
      </div>
    </ThemeProvider >
  )
}

export default App
