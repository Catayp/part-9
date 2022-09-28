import React from "react";
import { CoursePart } from "../types"
import assertNever from "../assertNever";

const Part: React.FC<{part: CoursePart}> = ({ part }) => {
    switch (part.name) {
        case "Fundamentals":
            return(
                <label><strong>{ part.name }</strong> -  exercises : {part.exerciseCount}</label>
            );
            break;
        case "Using props to pass data":
            return(
                <div>
                    <strong>{ part.name }</strong>
                    <label> - groupProject: { part.groupProjectCount } -  exercises : {part.exerciseCount}</label>
                </div>
            );
            break;
        case "Deeper type usage":
            return(
               <div>
                <strong>{ part.name }</strong>  
                <label> - description: { part.description } - Link: { part.exerciseSubmissionLink }</label>
               </div>
            );
            break;
        case "bla":
            return(
                <div>
                <strong>{ part.name }</strong>  
                <label> - description: { part.description } - exercises: { part.exerciseCount }</label>
                </div>
            );
            break;
    
        default:
            return assertNever(part);
        break;
    }
}

export default Part;