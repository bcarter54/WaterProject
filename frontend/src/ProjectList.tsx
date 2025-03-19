import { Project } from './types/Project';
import { useState, useEffect } from 'react';

function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]); // projects is what will hold your json data
  // useState is what makes it possible for us to create an empty project array and then use setProjects to feed information to projects

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch('https://localhost:5000/Water/AllProjects');
      const data = await response.json();

      setProjects(data); // This is what will feed projects the data 
    };

    fetchProjects(); // call the method you created to pull the data 
  }, []);

  return (
    <>
      <h1>Water Projects</h1>
      <br />
      {projects.map((p) => (
        <div id="projectCard">
          <h3>{p.projectName}</h3>
          <ul>
            <li>Project Type: {p.projectType}</li>
            <li>Regional Program: {p.projectRegionalProgram}</li>
            <li>Impact: {p.projectImpact}</li>
            <li>Project Phase: {p.projectPhase}</li>
            <li>Project Status: {p.projectFunctionalityStatus}</li>
          </ul>
        </div>
      ))}
    </>
  );
}
export default ProjectList;
