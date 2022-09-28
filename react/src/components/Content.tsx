import React from 'react';
import { CoursePart } from '../types';
import Part from './Part';

const Content: React.FC<{courseParts: CoursePart[]}> = ({courseParts}) => {
  let sum = 0;
  const list = courseParts.map(element => (
    <Part key={sum++} part={element}/>
  ));
  return (<ul>{list}</ul>) 
}
export default Content;