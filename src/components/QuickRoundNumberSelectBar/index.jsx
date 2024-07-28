import { useState } from 'react'
import CustomIconButton from '../CustomIconButton';
import InfinityIcon from '../InfinityIcon';
import IncrementingRoundButton from '../IncrementingRoundButton';
import useWindowDimensions from '../../hooks/useWindowDimensions';

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

    const { height, width } = useWindowDimensions()

    const portrait = height > width

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div>
                <CustomIconButton onClick={() => handleRoundNumberSelect(1)} color={roundNumberColor} icon={<IncrementingRoundButton selected={selected === 0} numberOfRounds={numberOfRounds > 99 ? 1 : numberOfRounds}>|</IncrementingRoundButton>}></CustomIconButton>

            </div>
            <div style={{ display: 'flex' }}>
                <CustomIconButton onClick={() => handleRoundNumberSelect(999)} color={infiniteRoundColor} icon={<InfinityIcon selected={selected === 1}></InfinityIcon>}></CustomIconButton>
            </div>
        </div>
    )
}