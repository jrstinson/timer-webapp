import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import SvgIcon from '@mui/material/SvgIcon';
import { Square } from '@mui/icons-material';
import useWindowDimensions from '../../hooks/useWindowDimensions';
export default function InfinityIcon({ style, selected = false }) {
    const { width, height } = useWindowDimensions()
    const portrait = height > width

    var boxSize = "15vh"
    var fillSize = "14vh"
    var textFontSize = "7vh"

    if (portrait) {
        boxSize = "20vw"
        fillSize = "19vw"
        textFontSize = "11vw"
    }

    return (
        <>
            <SvgIcon fontSize="inherit" sx={{ fontSize: boxSize }} >
                <CheckBoxOutlineBlankIcon ></CheckBoxOutlineBlankIcon>
            </SvgIcon>
            {selected && (
                <SvgIcon fontSize='inherit' sx={{ position: 'absolute', fontSize: fillSize }}>
                    <Square></Square>
                </SvgIcon>
            )}
            <AllInclusiveIcon fontSize="inherit" sx={{ position: "absolute", color: selected ? "primary.accent" : "", fontSize: textFontSize }}></AllInclusiveIcon>
        </>

    )
}