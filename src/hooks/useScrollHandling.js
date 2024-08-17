import { useEffect } from 'react';
import lenis from '../utils/lenis';

const useScrollHandling = () => {
  useEffect(() => {
    const scrollToAnchor = (anchorId) => {
      const element = document.getElementById(anchorId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    };

    const handleScroll = (event) => {
      event.preventDefault();
      const anchor = event.target.closest('a.ease-scroll');
      if (anchor && anchor.getAttribute('href')) {
        const anchorId = anchor.getAttribute('href').substring(1);
        scrollToAnchor(anchorId);
      }
    };

    const links = document.querySelectorAll('a.ease-scroll');
    links.forEach(link => {
      link.addEventListener('click', handleScroll);
    });

    return () => {
      links.forEach(link => {
        link.removeEventListener('click', handleScroll);
      });
    };
  }, []);

  useEffect(() => {
    const onScroll = (e) => {
      // Custom scroll handling
    };

    lenis.on('scroll', onScroll);

    return () => {
      lenis.off('scroll', onScroll);
    };
  }, []);
};

export default useScrollHandling;