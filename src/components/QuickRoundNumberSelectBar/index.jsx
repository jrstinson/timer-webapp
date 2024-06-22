import { useState } from 'react'
import HorizontalRule from "@mui/icons-material/HorizontalRule";
import CustomIconButton from '../CustomIconButton';
import { Grid } from "@mui/material";
import InfinityIcon from '../InfinityIcon';
import IncrementingRoundButton from '../IncrementingRoundButton';

export default function QuickRoundNumberSelectBar({ numberOfRounds, setNumberOfRounds }) {

    const [roundNumberColor, setRoundNumberColor] = useState("primary.main")
    const [infiniteRoundColor, setInfiniteRoundColor] = useState("primary.main")
    const [selected, setSelected] = useState()

    const handleRoundNumberSelect = (roundCount) => {

        console.log(roundCount)
        if (roundCount === 1) {
            setRoundNumberColor("primary.main")
            setInfiniteRoundColor("secondary.main")
            setSelected(0)
            if (numberOfRounds === 999) {
                setNumberOfRounds(1)
            }
            else {
                setNumberOfRounds((prev) => prev + 1)
            }

        }
        else if (roundCount === 999) {
            setRoundNumberColor("secondary.main")
            setInfiniteRoundColor("primary.main")
            setNumberOfRounds(roundCount)
            setSelected(1)
            if (numberOfRounds === 999) {
                setNumberOfRounds(0)
                setRoundNumberColor("primary.main")
                setInfiniteRoundColor("primary.main")
                setSelected()
            }
        }
    }

    return (
        <Grid container spacing={4} alignItems={'center'}>
            <Grid item>
                <CustomIconButton onClick={() => handleRoundNumberSelect(1)} color={roundNumberColor} icon={<IncrementingRoundButton selected={selected === 0} numberOfRounds={numberOfRounds > 99 ? 1 : numberOfRounds}>|</IncrementingRoundButton>}></CustomIconButton>
            </Grid>
            <Grid item>
                <HorizontalRule sx={{ transform: 'scale(2)', color: 'primary.accent' }}></HorizontalRule>
            </Grid>
            <Grid item>
                <CustomIconButton onClick={() => handleRoundNumberSelect(999)} color={infiniteRoundColor} icon={<InfinityIcon selected={selected === 1}></InfinityIcon>}></CustomIconButton>
            </Grid>
        </Grid>
    )
}