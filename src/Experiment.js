import React, { useEffect, useState } from 'react';
import { ExperimentProject } from "./ExperimentProject";
import { ExtLink } from "./ExtLink";
import { WordWrap } from "./WordWrap";
import { Carousel } from '@fancyapps/ui';
import '@fancyapps/ui/dist/carousel/carousel.css'; // Make sure to import the CSS

import './Experiment.css';

export function Experiment() {
    const [experiments, setExperiments] = useState([]);

    useEffect(() => {
        fetch('/experiments.json')
            .then(response => response.json())
            .then(data => setExperiments(data))
            .catch(error => console.error('Error fetching experiments:', error));
    }, []);

    useEffect(() => {
        if (experiments.length > 0) {
            const slider = new Carousel(document.querySelector('.carousel-container'), {
                transition: "slide",
                slidesPerPage: 1,
                infinite: false,
                Dots: false,
                Navigation: true,
                fill: true,
                center: false,
            });

            return () => {
                slider.destroy(); // Cleanup when component unmounts or experiments change
            };
        }
    }, [experiments]);

    return (
        <section id="experiment" className="section grid highlight">
            <h2>
                <WordWrap>I love having the freedom to experiment and push boundaries. </WordWrap>
                <WordWrap>Whether it’s through <ExtLink 
                    thumb="codepen"
                    href="https://codepen.io/thaslle" 
                    target="_blank" 
                    rel="noopener noreferrer">
                    front-end</ExtLink> experiments, <ExtLink 
                    thumb="illustration"
                    href="https://www.artstation.com/thaslle" 
                    target="_blank" 
                    rel="noopener noreferrer">
                    illustrations
                </ExtLink>,</WordWrap>
                <WordWrap> or <ExtLink 
                    thumb="architecture"
                    href="https://www.behance.net/estudioamarelo" 
                    target="_blank" 
                    rel="noopener noreferrer">
                    architecture
                </ExtLink> visualization, I enjoy exploring new ways </WordWrap>
                <WordWrap> to bring ideas to life and see where creativity takes me.</WordWrap>
            </h2>  

            <div className="list carousel-container">
                {experiments.length !== 0 && experiments.map((experiment, index) => {
                   return (
                    <ExperimentProject 
                        {...experiment}                    
                        key={index}
                    />
                    )
                })}
            </div>
        </section>
    )
}