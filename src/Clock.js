import React, { useState, useEffect } from 'react';

export function Clock() {
    const [time, setTime] = useState(null);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        
        const fetchTime = async () => {
            try {
                const response = await fetch('https://worldtimeapi.org/api/timezone/America/Sao_Paulo');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setTime(new Date(data.datetime));
            } catch (error) {
                setError(error.message);
            }
        };

        fetchTime();
        const interval = setInterval(fetchTime, 60000); // Update time every minute

        return () => clearInterval(interval);
    }, []);

    const formatTime = (date) => {
        const timeString = date.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });

        const parts = timeString.split(':');
        return (
            <>
                {parts.map((part, index) => (
                    <React.Fragment key={index}>
                        {part}
                        {index < parts.length - 1 && <span>:</span>}
                    </React.Fragment>
                ))}
            </>
        );
    };

    if (error) {
        //return <>Error: {error}</>;
        return <></>;
    }

    if (!time) {
        return <>...</>;
    }

    return (
        <>{formatTime(time)}</>
    );
}
