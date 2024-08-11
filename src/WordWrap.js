import './WordWrap.css';

export function WordWrap({...props}) {
    
    return (
        <span 
        className="word-wrap">
        {props.children}
        </span>
    )
}