import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { NavLocation } from "../NavLocation";
import { Media } from "../Media";
import { Project } from "../Project";
import '../Tags.css';
import '../Project.css';
import '../Work.css';

function ProjectDetails({ onLinkClick }) {
    const { slug } = useParams();
    const [project, setProject] = useState(null);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch('/projects.json')
            .then(response => response.json())
            .then(data => {
                const foundProject = data.find(p => p.slug === slug);
                setProject(foundProject);
                setProjects(data.filter(p => p.slug !== slug)); // Filter out the current project
            })
            .catch(error => console.error('Error fetching project:', error));
    }, [slug]);

    if (!project) {
        return <div>Loading...</div>;
    }

    function generateRandomHex(bytes = 20) {
        const array = new Uint8Array(bytes);
        window.crypto.getRandomValues(array);
        return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    }

    const aspect = {
        aspectRatio: project.aspect,
    };

    return (
        <>
            <NavLocation />
            <section id="project" className="section highlight">
                <article className="project">
                    <header className="container-hover">
                        <figure style={aspect}>
                            <img src={project.image} alt={project.title}  className="original" />
                        </figure>
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
                        <Link 
                            to="/" className="close"
                            onClick={() => onLinkClick('/')}
                        >
                            <span>
                                <span className="text">Close project</span>
                                <span className="icon"></span>
                            </span>                    
                        </Link>
                    </div>  
                </article>
            </section>
            
            <section id="work" className="section highlight more">
                <div className="column">
                    {projects.length !== 0 && projects.map(project => (
                        <Project 
                            key={project.id} 
                            project={project} 
                            onLinkClick={onLinkClick} 
                        />
                    ))}
                </div>
            </section>
        </>
    );
}

export default ProjectDetails;