import React from 'react';
import useScrollHandling from '../hooks/useScrollHandling';
import { NavLocation } from "../NavLocation";
import { NavMenu } from "../NavMenu";
import { About } from "../About";
import { Work } from "../Work";
import { Experiment } from "../Experiment";
import { Contact } from "../Contact";

const Main = ({ onLinkClick }) => {
  useScrollHandling(); // Apply the scroll handling

  return (
    <>
      <NavLocation />
      <NavMenu />
      <About />
      <Work onLinkClick={onLinkClick} />
      <Experiment />
      <Contact />
    </>
  );
};

export default Main;