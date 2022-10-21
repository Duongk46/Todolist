import React, { useEffect, useState } from 'react';
import { formatTime } from './Components/Todolist/Format';
import './Clock.scss';

function Clock() {
    const [timeString,setTimeString] = useState('');
    useEffect(() => {
        setInterval(() => {
            const now = new Date();
            setTimeString(formatTime);
        },1000)
    },[])
    return (
        <div >
            <p className='format-clock'>{timeString}</p>
        </div>
    );
}

export default Clock;