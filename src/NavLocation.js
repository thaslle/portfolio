import React, { useState, useEffect } from 'react';
import './NavLocation.css';

export function NavLocation() {
    const [time, setTime] = useState(null);
    const [error, setError] = useState(null);
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    useEffect(() => {
        // Load saved theme from localStorage
        const savedTheme = localStorage.getItem('theme');

        // Check for user preference if no theme is saved
        if (savedTheme) {
          setIsDarkTheme(savedTheme === 'dark');
          document.documentElement.setAttribute('data-theme', savedTheme);
        } else {
          const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
          const initialTheme = prefersDarkScheme ? 'dark' : 'light';
          setIsDarkTheme(prefersDarkScheme);
          document.documentElement.setAttribute('data-theme', initialTheme);
        }

        const fetchTime = async () => {
            try {
                const response = await fetch('http://worldtimeapi.org/api/timezone/America/Sao_Paulo');
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

    const toggleTheme = () => {
        const newTheme = isDarkTheme ? 'light' : 'dark';
        setIsDarkTheme(!isDarkTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme); // Save theme to localStorage
    };

    if (error) {
        return <>Error: {error}</>;
    }

    if (!time) {
        return <>Loading...</>;
    }

    return (
        <nav id="location" className="grid">
            <div>
                <p>São Paulo, <span className="clock">{formatTime(time)}</span></p>
                <button
                    className="change-theme"
                    role="switch"
                    type="button"
                    aria-checked={isDarkTheme}
                    onClick={toggleTheme}
                    title={isDarkTheme ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
                >                  
                </button>
            </div>
        </nav>
    );
}
