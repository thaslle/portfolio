import { PixelatedImage } from "./PixelatedImage";

export function ExperimentProject(experiment) {
    return (
        <article className="experiment f-carousel__slide">
            <a href={experiment.link} target="_blank" rel="noopener noreferrer" className="container-hover">
                <PixelatedImage src={experiment.image} alt={experiment.title} />
                <div className="text">

                    <div className="info">
                        <ul className="tags">
                            {experiment.tags.map((tag, idx) => (
                                <li key={idx} className={tag.class}>{tag.name}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="preview">
                        <p>{experiment.description}</p>
                    </div>
                </div>
            </a>            
        </article>
    )
}