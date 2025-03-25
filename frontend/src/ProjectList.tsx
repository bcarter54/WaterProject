import { Project } from './types/Project';
import { useState, useEffect } from 'react';

function ProjectList({ selectedCategories }: { selectedCategories: string[] }) {
  const [projects, setProjects] = useState<Project[]>([]); // projects is what will hold your json data
  // useState is what makes it possible for us to create an empty project array and then use setProjects to feed information to projects
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const fetchProjects = async () => {
      const categoryParams = selectedCategories
        .map((cat) => `projectTypes=${encodeURIComponent(cat)}`)
        .join('&');

      const response = await fetch(
        `https://localhost:5000/Water/AllProjects?pageHowMany=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`,
        {
          credentials: 'include',
        }
      );
      const data = await response.json();

      setProjects(data.projects); // This is what will feed projects the data
      setTotalItems(data.totalNum);
      setTotalPages(Math.ceil(totalItems / pageSize));
    };

    fetchProjects(); // call the method you created to pull the data
  }, [pageSize, pageNum, totalItems, selectedCategories]);
  // you should have all of your state variables in here so it knows when to fetch again

  return (
    <>
      <br />
      {projects.map((p) => (
        <div id="projectCard" className="card" key={p.projectId}>
          <h3 className="card-title">{p.projectName}</h3>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>Project Type: </strong> {p.projectType}
              </li>
              <li>
                <strong>Regional Program: </strong>
                {p.projectRegionalProgram}
              </li>
              <li>
                <strong>Impact: </strong> {p.projectImpact}
              </li>
              <li>
                <strong>Project Phase: </strong>
                {p.projectPhase}
              </li>
              <li>
                <strong>Project Status: </strong> {p.projectFunctionalityStatus}
              </li>
            </ul>
          </div>
        </div>
      ))}

      <button onClick={() => setPageNum(pageNum - 1)} disabled={pageNum === 1}>
        Previous
      </button>

      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index + 1}
          onClick={() => setPageNum(index + 1)}
          disabled={pageNum === index + 1}
        >
          {index + 1}
        </button>
      ))}
      {/* builds an array of size totalPages and maps out from 0 to the max size */}

      <button
        onClick={() => setPageNum(pageNum + 1)}
        disabled={pageNum === totalPages}
      >
        Next
      </button>

      <br />
      <label>
        Results per page:
        <select
          value={pageSize}
          onChange={(p) => {
            setPageSize(Number(p.target.value));
            setPageNum(1);
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </label>
    </>
  );
}
export default ProjectList;
