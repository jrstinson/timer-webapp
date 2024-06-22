import DigitIcon from "../DigitIcon"

export default function IncrementingRoundButton({ numberOfRounds, selected = false }) {
    return (
        <DigitIcon digit={numberOfRounds || 1} selected={selected}></DigitIcon>
    )
}