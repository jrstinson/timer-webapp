import { useState, useEffect, useRef } from 'react';
import { Button, Typography } from '@mui/material';
import { cardio } from 'ldrs';
import HeartBeat from '../../components/HeartBeat';
import useWindowDimensions from '../../hooks/useWindowDimensions';

cardio.register();

const IntervalTimer = ({ intervalLength, numIntervals, setClockStarted }) => {
    const [timeRemaining, setTimeRemaining] = useState(intervalLength);
    const [currentInterval, setCurrentInterval] = useState(1);
    const [isRest, setIsRest] = useState(false);
    const { height, width } = useWindowDimensions()
    const interval = useRef(null);

    useEffect(() => {
        interval.current = setInterval(() => {
            setTimeRemaining((prevTime) => prevTime - 1);
        }, 1000);
        return () => {
            clearInterval(interval.current);
        };
    }, []);

    useEffect(() => {

        if (timeRemaining === 4) {
            new Audio('/race-start-beeps.mp3').play();
        }
        if (timeRemaining === 0 && currentInterval < numIntervals) {
            if (!isRest) {
                setIsRest(true);
                clearInterval(interval.current);
                setTimeRemaining(45);
                interval.current = setInterval(() => {
                    setTimeRemaining((prevTime) => prevTime - 1);
                }, 1000);
            }
            else {
                setIsRest(false);
                clearInterval(interval.current);
                setTimeRemaining(intervalLength);
                setCurrentInterval((prevInterval) => prevInterval + 1);
                interval.current = setInterval(() => {
                    setTimeRemaining((prevTime) => prevTime - 1);
                }, 1000);
            }
        }
        if (timeRemaining === 0 && currentInterval === numIntervals) {
            clearInterval(interval.current);
            setClockStarted(false);
        }
    }, [timeRemaining, isRest, currentInterval, numIntervals]);

    const formatTime = () => {
        let minutes = Math.floor(timeRemaining / 60);
        let seconds = timeRemaining % 60;

        minutes = String(minutes).padStart(2, '0');
        seconds = String(seconds).padStart(2, '0');

        return `${minutes}:${seconds}`;
    }

    const portrait = height > width

    var clockTextSize = portrait ? "25vw" : "25vh"
    var roundTextSize = portrait ? "7vw" : "7vh"
    var buttonSize = portrait ? "4vw" : "4vh"
    var heartBeatSize = portrait ? .2 * width : .2 * height
    var heartBeatStroke = portrait ? .05 * width : .05 * height


    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div>
                <Typography sx={{ color: 'primary.text' }} fontSize={clockTextSize} fontWeight={'bold'} margin={'auto'} >{formatTime()}</Typography>
            </div>
            {isRest && (<div>
                <Typography sx={{ color: 'primary.text' }} fontSize={roundTextSize}>Rest</Typography>
            </div>)}
            {!isRest &&
                (<><div style={{ paddingBottom: portrait ? "4vw" : "4vh" }}>
                    <HeartBeat size={heartBeatSize} stroke={heartBeatStroke} timeRemaining={timeRemaining} remainingIntervals={numIntervals - currentInterval} intervalLength={intervalLength} />
                </div>
                    < div >
                        <Typography sx={{ color: 'primary.text' }} fontSize={roundTextSize}>Round {currentInterval} of {numIntervals}</Typography>
                    </div></>)
            }

            <div style={{ paddingTop: portrait ? "6vw" : "4vh" }}>
                <Button sx={{ color: 'primary.text', padding: 0, fontSize: buttonSize }} onClick={() => setClockStarted(false)}>Stop</Button>
            </div>
        </div >
    );
};

export default IntervalTimer;