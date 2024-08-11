
import { useEffect } from 'react';

import { NavLocation } from "./NavLocation";
import { NavMenu } from "./NavMenu";
import { About } from "./About";
import { Work } from "./Work";
import { Experiment } from "./Experiment";
import { Contact } from "./Contact";
import lenis from './utils/lenis';

import './App.css';


function App() {
  const scrollToAnchor = (anchorId) => {
    const element = document.getElementById(anchorId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
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

    // Cleanup function to remove event listeners
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

  return (
    <>

      <NavLocation />
      <NavMenu />
      <About />
      <Work />
      <Experiment />
      <Contact />
    </>
  );
}

export default App;
