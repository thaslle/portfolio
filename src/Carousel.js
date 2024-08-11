import React, { useRef, useEffect } from 'react';

import { Carousel as NativeCarousel } from '@fancyapps/ui';
import '@fancyapps/ui/dist/carousel/carousel.css';

const defaults = {
    infinite: false,
    fill: true,
    Navigation: true,
    Dots: false,
    dragFree: false,
    on: {
        "*": (carousel, eventName) => {
          /*console.log(`Carousel eventName: ${eventName}`);*/
        },
    },
};

export function Carousel(props) {
    const containerRef = useRef(null);
    let instanceRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const options = {
        ...defaults,
        ...(props.options || {}),
        };

        if (!instanceRef.current) {
            instanceRef.current = new NativeCarousel(container, options);
        } else {
            instanceRef.current.reInit(options);
        }

        return () => {
            if (instanceRef.current) {
                instanceRef.current.destroy();
                instanceRef.current = null;
            }
        };
    }, [props.options]);

    return (
        <div className="f-carousel" ref={containerRef}>
            <div className="f-carousel__viewport">
                <div className="f-carousel__track">
                    {props.children}
                </div>
            </div>
        </div>
    );
}
