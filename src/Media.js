export function Media({title,...props}) {

    if(props.type === "image") {
        return (
            <figure className={props.type}>
                <img src={props.url} alt={title} />
            </figure>
        )

    } else if(props.type === "video") {
        return (
            <figure className={props.type}>
                <iframe 
                src={props.url} 
                frameBorder="0" 
                allow="autoplay; fullscreen" 
                allowFullScreen="" 
                title={title} 
                data-ready="true">
                </iframe>
            </figure>
        )
    }
}