import { IconButton } from "@mui/material"
import { useState } from "react"
import useWindowDimensions from "../../hooks/useWindowDimensions"

export default function CustomIconButton({ color = "primary.main", icon, onClick, isGo = false, disabled = false }) {
    const [colorOverride, setColorOverride] = useState()
    const { height, width } = useWindowDimensions()
    const portrait = height > width
    const onMouseEnter = (event) => {
        if (isGo && !colorOverride) {
            setColorOverride("secondary.accent")
        }
    }
    const onMouseLeave = (event) => {
        if (isGo && colorOverride) {
            setColorOverride()
        }
    }
    return (
        <IconButton style={{ padding: portrait ? "1.5vh" : "1.5vw" }} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClick} disabled={disabled} sx={{ color: colorOverride ? colorOverride : color, }} >
            {icon}
        </IconButton>
    )
}
