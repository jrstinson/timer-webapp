import { Grid, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import QuickTimeSelectBar from "../../components/QuickTimeSelectBar";
import QuickRoundNumberSelectBar from "../../components/QuickRoundNumberSelectBar";
import CustomIconButton from "../../components/CustomIconButton";
import DigitIcon from "../../components/DigitIcon";
import { StayPrimaryLandscape } from "@mui/icons-material";

const GO_TIMER_LENGTH_MS = 3000

export default function RoundOptions({ setRoundOptions, setClockStarted, clockStarted }) {
    const [timerLength, setTimerLength] = useState(0)
    const [numberOfRounds, setNumberOfRounds] = useState(0)
    const [goPressed, setGoPressed] = useState(false)
    const [elapsedGoTime, setElapsedGoTime] = useState(GO_TIMER_LENGTH_MS)
    const intervalIdRef = useRef(null)

    useEffect(() => {
        console.log("Timer length:", timerLength)
        console.log("Number of Rounds", numberOfRounds)
    }, [timerLength, numberOfRounds])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (goPressed) {
            stop()
        }
        else {
            setGoPressed(true)
        }
    }

    const stop = () => {
        setGoPressed(false)
        setElapsedGoTime(GO_TIMER_LENGTH_MS)
    }

    const formatTime = () => {
        let hours = Math.floor(elapsedGoTime / (1000 * 60 * 60))
        let minutes = Math.floor(elapsedGoTime / (1000 * 60) % 60)
        let seconds = Math.floor(elapsedGoTime / (1000) % 60)
        let milliseconds = Math.floor((elapsedGoTime % 1000) / 10)

        hours = String(seconds).padStart(2, "0")
        minutes = String(minutes).padStart(2, "0")
        //seconds = String(seconds).padStart(2, "0")
        milliseconds = String(milliseconds).padStart(2, "0")

        return `${seconds}`
    }

    useEffect(() => {
        if (goPressed) {
            setTimeout(() => {
                intervalIdRef.current = setInterval(() => {
                    setElapsedGoTime((gt) => gt - 10)
                }, 10)
            }, 1000)

        }
        return () => {
            clearInterval(intervalIdRef.current)
        }
    }, [goPressed])

    useEffect(() => {
        if (elapsedGoTime === 1000) {
            stop()
            setClockStarted(true)
        }
    }, [elapsedGoTime])

    return (
        <Grid container direction={'column'} spacing={6} alignItems={'center'} justifyContent={'center'}>
            <Grid item >
                <QuickTimeSelectBar timerLength={timerLength} setTimerLength={setTimerLength}></QuickTimeSelectBar>
            </Grid>
            <Grid item>
                <QuickRoundNumberSelectBar numberOfRounds={numberOfRounds} setNumberOfRounds={setNumberOfRounds}></QuickRoundNumberSelectBar>
            </Grid>
            <Grid item visibility={numberOfRounds && timerLength ? '' : 'hidden'}>
                <CustomIconButton onClick={(e) => handleSubmit(e)} isGo={true} icon={<DigitIcon selected={goPressed} digit={"GO!"} style={{ fontSize: "20px" }}></DigitIcon>}></CustomIconButton>
            </Grid >
            <Grid item>
                <Typography variant="h6" visibility={goPressed ? "" : "hidden"}>{formatTime(elapsedGoTime)}</Typography>
            </Grid>
        </Grid >
    )
}