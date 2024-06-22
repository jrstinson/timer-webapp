import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import SvgIcon from '@mui/material/SvgIcon';
import { Square } from '@mui/icons-material';
export default function InfinityIcon({ style, selected = false }) {
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
            <AllInclusiveIcon fontSize="large" sx={{ position: "absolute", color: selected ? "primary.accent" : "" }}></AllInclusiveIcon>
        </>

    )
}