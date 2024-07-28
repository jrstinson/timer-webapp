import { useEffect, useState } from "react";
import QuickTimeSelectBar from "../../components/QuickTimeSelectBar";
import QuickRoundNumberSelectBar from "../../components/QuickRoundNumberSelectBar";
import CustomIconButton from "../../components/CustomIconButton";
import DigitIcon from "../../components/DigitIcon";
import useWindowDimensions from "../../hooks/useWindowDimensions";

export default function RoundOptions({ setRoundOptions, setClockStarted }) {
    const [timerLength, setTimerLength] = useState(0)
    const [numberOfRounds, setNumberOfRounds] = useState(0)
    const [goPressed, setGoPressed] = useState(false)
    const { height, width } = useWindowDimensions()

    const handleSubmit = (e) => {
        e.preventDefault()
        setGoPressed(true)
        setRoundOptions({ timerLength: timerLength, numberOfRounds: numberOfRounds })
        setTimeout(() => {
            setGoPressed(false)
        }, 4700)
    }

    useEffect(() => {
        if (goPressed === true) {
            setClockStarted(true)
        }
    }, [goPressed])

    const readyToGo = (timerLength && numberOfRounds)

    const portrait = height > width

    return (
        <div style={{ paddingTop: '7vh' }}>
            <div>
                <QuickTimeSelectBar timerLength={timerLength} setTimerLength={setTimerLength} timeOptions={[3, 5, 7]} ></QuickTimeSelectBar>
            </div>
            <div>
                <QuickRoundNumberSelectBar numberOfRounds={numberOfRounds} setNumberOfRounds={setNumberOfRounds}></QuickRoundNumberSelectBar>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <CustomIconButton disabled={!readyToGo} color={(readyToGo) ? "primary.main" : "grey"} onClick={(e) => handleSubmit(e)} isGo={true} icon={<DigitIcon selected={goPressed} digit={"GO!"} style={{ fontSize: portrait ? "4.5vw" : "4vh", color: "" }}></DigitIcon>}></CustomIconButton>
            </div>
        </div>
    )
}