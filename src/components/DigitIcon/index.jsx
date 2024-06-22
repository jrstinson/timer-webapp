import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import SvgIcon from '@mui/material/SvgIcon';
import { Typography } from '@mui/material';
import { Square } from '@mui/icons-material';

export default function DigitIcon({ digit, style, selected = false }) {
    return (
        <>
            <SvgIcon fontSize="large" sx={{ transform: 'scale(2)' }}>
                <CheckBoxOutlineBlankIcon ></CheckBoxOutlineBlankIcon>
            </SvgIcon>
            {selected && (
                <SvgIcon fontSize='large' sx={{ position: 'absolute', transform: 'scale(1.9)' }}>
                    <Square></Square>
                </SvgIcon>
            )}
            <Typography style={style} color={selected ? "primary.accent" : ""} variant='button' fontSize={"36px"} fontWeight={"bold"} sx={{ position: 'absolute' }} >{digit}</Typography>
        </>

    )
}