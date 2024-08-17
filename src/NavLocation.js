import React, { useState, useEffect } from 'react';
import { Clock } from "./Clock";
import './NavLocation.css';

export function NavLocation() {
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
    }, []);

    const toggleTheme = () => {
        const newTheme = isDarkTheme ? 'light' : 'dark';
        setIsDarkTheme(!isDarkTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme); // Save theme to localStorage
    };

    return (
        <nav id="location" className="grid">
            <div>
                <p>São Paulo, <span className="clock"><Clock /></span></p>
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
