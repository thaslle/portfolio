import './ExtLink.css';

export function ExtLink({thumb,...props}) {
    
    return (
        <a 
        className={`ext-link ${thumb}`} 
        {...props}
        >
            <span className="thumb"></span>
            <span className="text">{props.children}</span>
        </a>
    )
}