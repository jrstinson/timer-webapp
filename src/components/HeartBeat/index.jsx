import { useTheme } from '@mui/material'

export default function HeartBeat({ timeRemaining, intervalLength, remainingIntervals, size = 50, stroke = 10 }) {
    const theme = useTheme()

    const totalSecondsRemaining = timeRemaining + (remainingIntervals * intervalLength)

    const speed = totalSecondsRemaining < 120 ? totalSecondsRemaining < 60 ? 0.5 : 0.75 : 1

    return <l-cardio stroke={10} size={size} speed={speed} color={theme.palette.primary.text}></l-cardio>
}