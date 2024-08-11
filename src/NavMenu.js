import { useEffect } from 'react';

export function NavMenu() {

    useEffect(() => {
        const sections = document.querySelectorAll('.highlight');
        
        const navHighlighter = () => {
          let scrollY = window.pageYOffset + window.innerHeight;
          
          sections.forEach((current) => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
              document.querySelector(`#menu a[href*=${sectionId}]`).classList.add('active');
            } else {
              document.querySelector(`#menu a[href*=${sectionId}]`).classList.remove('active');
            }
          });
        };
    
        window.addEventListener('scroll', navHighlighter);
    
        // Cleanup function to remove the event listener
        return () => {
          window.removeEventListener('scroll', navHighlighter);
        };

    }, []);

    return (
        <nav id="menu">
            <ul>
            <li><a className="ease-scroll about" href="#about"><span>About</span></a></li>
            <li><a className="ease-scroll work" href="#work"><span>Work</span></a></li>
            <li><a className="ease-scroll experiment" href="#experiment"><span>Experiment</span></a></li>
            <li><a className="ease-scroll contact" href="#contact"><span>Contact</span></a></li>
            </ul>
        </nav>
    )
}