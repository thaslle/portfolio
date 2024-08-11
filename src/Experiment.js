import React, { useEffect, useState } from 'react';
import { ExperimentProject } from "./ExperimentProject";
import { ExtLink } from "./ExtLink";
import { WordWrap } from "./WordWrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



import './Experiment.css';


export function Experiment() {
    const [experiments, setExperiments] = useState([]);
    
    useEffect(() => {
        fetch('/experiments.json')
        .then(response => response.json())
        .then(data => setExperiments(data))
        .catch(error => console.error('Error fetching experiments:', error));
    }, []);

  const settings = {
    slidesToShow: 1, // Show one item per view
    slidesToScroll: 1,
    infinite: false,
    dots: false,
    arrows: true,
    focusOnSelect: true,
    variableWidth: true,
    centerMode: false
  };

  return (
    <section id="experiment" className="section grid highlight">
        <h2>
          <WordWrap>Having a safe space to create without constraints is </WordWrap> 
          <WordWrap>crucial to me. I've been exploring new ways to bring ideas </WordWrap> 
          <WordWrap>to life through <ExtLink 
          thumb="codepen"
          href="https://codepen.io/thaslle" 
          target="_blank" 
          rel="noopener noreferrer">
          front-end
        </ExtLink> experiments, <ExtLink 
          thumb="illustration"
          href="https://www.artstation.com/thaslle" 
          target="_blank" 
          rel="noopener noreferrer">
          illustrations
        </ExtLink> </WordWrap> 
        <WordWrap>& <ExtLink 
          thumb="architecture"
          href="https://www.behance.net/estudioamarelo" 
          target="_blank" 
          rel="noopener noreferrer">
          architecture
        </ExtLink> visualization projects.</WordWrap>
      </h2>  

        <div className="list slider-container">
          <Slider {...settings}>
            {experiments.length !== 0 && experiments.map((experiment, index) => {
                
                return (
                <ExperimentProject 
                    {...experiment}                    
                    key={index}
                />
                )
            })}
          </Slider>
        </div>
    </section>
  )
}