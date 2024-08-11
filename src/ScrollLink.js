import './ScrollLink.css';

export function ScrollLink({...props}) {
    
    return (
        <a 
        className="scroll-link ease-scroll" 
        {...props}
        >
            <span className="text">{props.children}</span>
            <span className="icon"></span>
        </a>
    )
}