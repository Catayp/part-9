import React from 'react';
import { CourseParts } from '../types';

const Total: React.FC<{courseParts: CourseParts}> = ({courseParts}) => {
  const tot = courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)
  return (
    <div>total exercises: {tot}</div>
  )
}

export default Total;