import React, { useState, useEffect } from 'react';
import { Button, Typography } from '@mui/material';
import { cardio } from 'ldrs';
import HeartBeat from '../../components/HeartBeat';
import useWindowDimensions from '../../hooks/useWindowDimensions';

cardio.register();

const IntervalTimer = ({ intervalLength, numIntervals, setClockStarted }) => {
    const [currentTime, setCurrentTime] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(intervalLength);
    const [currentInterval, setCurrentInterval] = useState(1);
    const { height, width } = useWindowDimensions()
    const audio = new Audio('./public/race-start-beeps.mp3')

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining(prevTime => {
                if (prevTime === 4) {
                    audio.play()
                }
                return prevTime - 1
            });

        }, 1000);

        if (timeRemaining === 0) {
            clearInterval(timer);
            console.log(currentInterval, numIntervals)
            if (currentInterval < numIntervals) {
                setCurrentInterval(prevInterval => prevInterval + 1);
                setTimeRemaining(intervalLength);
                setCurrentTime(0);
            }
            if (currentInterval === numIntervals) {
                setClockStarted(false);
            }
        }

        return () => {
            clearInterval(timer);
        };
    }, [currentTime, timeRemaining, currentInterval, numIntervals, intervalLength, setClockStarted]);

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
                <Typography sx={{ color: 'primary.text' }} fontSize={clockTextSize} fontWeight={'bold'} margin={'auto'} >{formatTime(currentTime)}</Typography>
            </div>
            <div style={{ paddingBottom: portrait ? "4vw" : "4vh" }}>
                <HeartBeat size={heartBeatSize} stroke={heartBeatStroke} timeRemaining={timeRemaining} remainingIntervals={numIntervals - currentInterval} intervalLength={intervalLength} />
            </div>
            <div>
                <Typography sx={{ color: 'primary.text' }} fontSize={roundTextSize}>Round {currentInterval} of {numIntervals}</Typography>
            </div>
            <div style={{ paddingTop: portrait ? "6vw" : "4vh" }}>
                <Button sx={{ color: 'primary.text', padding: 0, fontSize: buttonSize }} onClick={() => setClockStarted(false)}>Stop</Button>
            </div>
        </div >
    );
};

export default IntervalTimer;