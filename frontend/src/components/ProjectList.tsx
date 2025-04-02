import { useNavigate } from 'react-router-dom';
import { Project } from '../types/Project';
import { useState, useEffect } from 'react';
import { fetchProjects } from '../api/ProjectsAPI';
import Pagination from './Pagination';

function ProjectList({ selectedCategories }: { selectedCategories: string[] }) {
  const [projects, setProjects] = useState<Project[]>([]); // projects is what will hold your json data
  // useState is what makes it possible for us to create an empty project array and then use setProjects to feed information to projects
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const data = await fetchProjects(pageSize, pageNum, selectedCategories); // This is the API method in the API folder

        setProjects(data.projects); // This is what will feed projects the data
        setTotalPages(Math.ceil(data.totalNum / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadProjects(); // call the method you created to pull the data
  }, [pageSize, pageNum, selectedCategories]);
  // you should have all of your state variables in here so it knows when to fetch again

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

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

            <button
              className="btn btn-success"
              onClick={() =>
                navigate(`/donate/${p.projectName}/${p.projectId}`)
              }
            >
              Donate
            </button>
          </div>
        </div>
      ))}
      {console.log(totalPages)}
      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageNum(1);
        }}
      />
    </>
  );
}
export default ProjectList;
