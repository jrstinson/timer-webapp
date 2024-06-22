import { IconButton } from "@mui/material"
import { useState } from "react"

export default function CustomIconButton({ color = "primary.main", icon, onClick, isGo = false }) {
    const [colorOverride, setColorOverride] = useState()
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
        <IconButton onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClick} sx={{ color: colorOverride ? colorOverride : color }} >
            {icon}
        </IconButton>
    )
}
