import { useState } from 'react';
import { Project } from '../types/Project';
import { addProject } from '../api/ProjectsAPI';

interface NewProjectFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const NewProjectForm = ({ onSuccess, onCancel}: NewProjectFormProps) => {
  const [formData, setFormData] = useState<Project>({
    projectId: 0,
    projectName: '',
    projectType: '',
    projectRegionalProgram: '',
    projectImpact: 0,
    projectPhase: '',
    projectFunctionalityStatus: '',
  });

  // This will update the formData with what you've entered 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Don't let the page auto refresh
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData)
    await addProject(formData);
    onSuccess();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Project</h2>
      <label htmlFor="">
        Project Name: <input type="text" name='projectName' value={formData.projectName} onChange={handleChange}/>
      </label>
      <label htmlFor="">
        Project Type: <input type="text" name='projectType' value={formData.projectType} onChange={handleChange}/> 
      </label>
      <label htmlFor="">
        Regional Program: <input type="text" name='projectRegionalProgram' value={formData.projectRegionalProgram} onChange={handleChange}/>
      </label>
      <label htmlFor="">
        Impact: <input type="number" name='projectImpact' value={formData.projectImpact} onChange={handleChange}/>
      </label>
      <label htmlFor="">
        Project Phase: <input type="text" name='projectPhase' value={formData.projectPhase} onChange={handleChange}/>
      </label>
      <label htmlFor="">
        Project Functionality Status: <input type="text" name='projectFunctionalityStatus' value={formData.projectFunctionalityStatus} onChange={handleChange}/>
      </label>
      <button type="submit">Add Project</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default NewProjectForm;
