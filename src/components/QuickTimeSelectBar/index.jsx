import { Grid } from '@mui/material';
import CustomIconButton from '../CustomIconButton';
import { useState } from 'react';
import DigitIcon from '../DigitIcon';
import useWindowDimensions from '../../hooks/useWindowDimensions';

// TODO FIX ME

export default function QuickTimeSelectBar({ timerLength, setTimerLength, timeOptions = [3, 5, 7] }) {

    const [firstColor, setFirstColor] = useState("primary.main")
    const [middleColor, setMiddleColor] = useState("primary.main")
    const [endColor, setEndColor] = useState("primary.main")
    const [selected, setSelected] = useState()

    const handleTimeSelect = (time) => {

        if (time === timerLength) {
            setFirstColor("primary.main")
            setMiddleColor("primary.main")
            setEndColor("primary.main")
            setTimerLength(0)
            setSelected()
            return
        }

        if (time === 60 * timeOptions[0]) {
            setFirstColor("primary.main")
            setMiddleColor("secondary.main")
            setEndColor("secondary.main")
            setSelected(0)
        } else if (time === 60 * timeOptions[1]) {
            setFirstColor("secondary.main")
            setMiddleColor("primary.main")
            setEndColor("secondary.main")
            setSelected(1)
        } else if (time === 60 * timeOptions[2]) {
            setFirstColor("secondary.main")
            setMiddleColor("secondary.main")
            setEndColor("primary.main")
            setSelected(2)
        }

        setTimerLength(time)
    }

    const { height, width } = useWindowDimensions()

    const portrait = height > width

    return (
        <div style={{ display: 'flex', }}>
            <div>
                <CustomIconButton onClick={() => handleTimeSelect(60 * timeOptions[0])} color={firstColor} icon={<DigitIcon digit={timeOptions[0]} selected={selected === 0}></DigitIcon>}></CustomIconButton>
            </div>
            <div>
                <CustomIconButton onClick={() => handleTimeSelect(60 * timeOptions[1])} color={middleColor} icon={<DigitIcon digit={timeOptions[1]} selected={selected === 1}></DigitIcon>}></CustomIconButton>
            </div>
            <div>
                <CustomIconButton onClick={() => handleTimeSelect(60 * timeOptions[2])} color={endColor} icon={<DigitIcon digit={timeOptions[2]} selected={selected === 2}></DigitIcon>}></CustomIconButton>
            </div>
        </div>
    )
}