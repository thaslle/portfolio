import React from 'react';
import { Link } from 'react-router-dom';
import { PixelatedImage } from "./PixelatedImage";
import './Tags.css';

export function Project({ project, onLinkClick }) {

    
    return (
        <article className="project">
            <Link 
                to={`/project/${project.slug}`}
                onClick={() => onLinkClick(`/project/${project.slug}`)}
            >
                <header className="container-hover">
                    <PixelatedImage src={project.image} alt={project.title} ratio={project.aspect} />
                    <div className="text">
                        <div className="info">
                            <h3>{project.title}</h3>
                            <ul className="tags">
                                {project.tags.map((tag, idx) => (
                                    <li key={idx} className={tag.class}>{tag.name}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="preview">
                            <p>{project.description}</p>
                        </div>
                    </div>
                </header>
            </Link>  
        </article>
    );
}
