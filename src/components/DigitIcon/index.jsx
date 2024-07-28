import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import SvgIcon from '@mui/material/SvgIcon';
import { Typography } from '@mui/material';
import { Square } from '@mui/icons-material';
import useWindowDimensions from '../../hooks/useWindowDimensions';

export default function DigitIcon({ digit, style, selected = false }) {

    const { height, width } = useWindowDimensions()

    const portrait = height > width

    var textFontSize = "7vh"
    if (digit > 9) {
        textFontSize = "5vh"
    }

    var boxSize = "15vh"
    var fillSize = "14vh"

    if (portrait) {
        boxSize = "20vw"
        fillSize = "19vw"
        textFontSize = "12vw"
    }

    return (
        <>
            <SvgIcon fontSize="inherit" sx={{ fontSize: boxSize }}>
                <CheckBoxOutlineBlankIcon  ></CheckBoxOutlineBlankIcon>
            </SvgIcon>
            {selected && (
                <SvgIcon fontSize='inherit' sx={{ position: 'absolute', fontSize: fillSize }}>
                    <Square></Square>
                </SvgIcon>
            )}
            <Typography style={style} color={selected ? "primary.accent" : ""} variant='button' fontSize={textFontSize} fontWeight={"bold"} sx={{ position: 'absolute', pb: '3px' }} >{digit}</Typography>
        </>

    )
}