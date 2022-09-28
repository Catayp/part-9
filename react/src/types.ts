interface objectP {
    name: string,
    exerciseCount: number
  } 
export type CourseParts = Array<objectP>;

interface CoursePartDescription extends CoursePartBase {
  description?: string;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}
  
interface CoursePartOne extends CoursePartDescription {
  name: "Fundamentals";
}
  
interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}
  
interface CoursePartThree extends CoursePartDescription {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}
interface CoursePartF extends CoursePartDescription {
  name: "bla";
}
  
export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartF;