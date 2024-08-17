import React, { useEffect, useRef, useState } from 'react';
import { Project } from "./Project";
import './Work.css';

export function Work({ onLinkClick }) {
    const [projects, setProjects] = useState([]);
    const columnRef = useRef(null);
    const [columnHeight, setColumnHeight] = useState(0);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    
    useEffect(() => {
        fetch('/projects.json')
            .then(response => response.json())
            .then(data => setProjects(data))
            .catch(error => console.error('Error fetching projects:', error));
    }, []);

    /*const waitForImagesToLoad = () => {
        return new Promise((resolve) => {
            const images = Array.from(document.querySelectorAll('figure.pixels img.original'));
            let loadedCount = 0;

            if (images.length === 0) {
                resolve(); // No images to wait for
                return;
            }

            const onImageLoad = () => {
                loadedCount += 1;
                if (loadedCount === images.length) {
                    resolve();
                }
            };

            images.forEach(image => {
                if (image.complete) {
                    onImageLoad();
                } else {
                    image.addEventListener('load', onImageLoad);
                    image.addEventListener('error', onImageLoad); // Handle error cases
                }
            });
        });
    };*/

    useEffect(() => {
        const updateColumnHeight = async () => {
            if (window.innerWidth <= 767) return;

            //await waitForImagesToLoad();

            if (columnRef.current) {
                const articles = Array.from(columnRef.current.querySelectorAll('.project'));
                const breakIndex = articles.findIndex(article => article.nextElementSibling?.classList.contains('break'));

                if (breakIndex === -1) return;

                const firstColumnArticles = articles.slice(0, breakIndex);
                const secondColumnArticles = articles.slice(breakIndex + 1);

                const rowGap = parseInt(getComputedStyle(columnRef.current).rowGap, 10);

                const getHeightWithGaps = (articles) => {
                    if (articles.length === 0) return 0;

                    const totalHeight = articles.reduce((acc, article) => acc + article.offsetHeight, 0);
                    const gapsTotal = (articles.length - 1) * rowGap;
                    return totalHeight + gapsTotal;
                };

                const firstColumnHeight = getHeightWithGaps(firstColumnArticles);
                const secondColumnHeight = getHeightWithGaps(secondColumnArticles);

                const tallestHeight = Math.max(firstColumnHeight, secondColumnHeight) + 10;
                setColumnHeight(tallestHeight);
                setImagesLoaded(true);
            }
        };

        updateColumnHeight();
        window.addEventListener('resize', updateColumnHeight);

        return () => {
            window.removeEventListener('resize', updateColumnHeight);
        };
    }, [projects]);

    useEffect(() => {
        if (columnRef.current && imagesLoaded) {
            columnRef.current.style.height = `${columnHeight}px`;
        }
    }, [columnHeight, imagesLoaded]);

    const half = Math.ceil(projects.length / 2);

    return (
        <section id="work" className="section highlight">
            <div className="column" ref={columnRef}>
                {projects.length !== 0 && projects.map((project, index) => (
                    <React.Fragment 
                        key={project.id}
                    >
                        {index === half && <div className="break"></div>}
                        <Project 
                            key={project.id} 
                            project={project} 
                            onLinkClick={onLinkClick} 
                        />
                    </React.Fragment>
                ))}
            </div>
        </section>
    );
}