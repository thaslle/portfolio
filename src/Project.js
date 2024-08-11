// Project.js

import React from 'react';
import { Media } from "./Media";
import { PixelatedImage } from "./PixelatedImage";
import './Tags.css';

export function Project({ project, isActive, onClick, onClose }) {

    function generateRandomHex(bytes = 20) {
        const array = new Uint8Array(bytes);
        window.crypto.getRandomValues(array);
        return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    }

    return (
        <article className={`project ${isActive ? 'active' : ''}`}>
            <header className="container-hover" onClick={onClick}>
                <PixelatedImage src={project.image} alt={project.title} />
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
            <div className="content">
                {project.info && project.info.length > 0 && (
                    <div className="more-info">
                        {project.info.map((infoItem, idx) => (
                            <div key={idx} className="info-item">
                                {infoItem.year && <div><h4>Year</h4> <p>{infoItem.year}</p></div>}
                                {infoItem.role && <div><h4>Role</h4> <p>{infoItem.role}</p></div>}
                                {infoItem.stack && <div><h4>Stack</h4> <p>{infoItem.stack}</p></div>}
                                <div><h4>Collaborators</h4> 
                                <p>{infoItem.collaborators.map((collaborator, index) => (
                                        <React.Fragment key={index}>
                                            <a href={collaborator.link} target="_blank" rel="noopener noreferrer">{collaborator.name}</a>
                                            {index < infoItem.collaborators.length - 1 ? ', ' : ''}
                                        </React.Fragment>
                                    ))}</p>
                                </div>
                                {infoItem.live && (
                                    <div><a href={infoItem.live} className="live" target="_blank" rel="noopener noreferrer"><span>View live</span></a></div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
                
                {project.lines !== undefined && project.lines.map(line => {
                    let lineType = `line ${line.class}`;
                    return (
                        <div className={lineType} key={generateRandomHex()}>
                            {line.media.map(media => (
                                <Media
                                    {...media}
                                    key={generateRandomHex()}
                                />
                            ))}
                        </div>
                    )
                })}
                <h2 className="more">See more</h2>
            </div>
            <div className="sticky">
                <button className="close" onClick={onClose}>
                    <span>
                        <span className="text">Close project</span>
                        <span className="icon"></span>
                    </span>                    
                </button>
            </div>    
        </article>
    );
}
