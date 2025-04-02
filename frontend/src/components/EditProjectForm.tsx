import { useState } from 'react';
import { Project } from '../types/Project';
import { updateProject } from '../api/ProjectsAPI';

interface EditProjectFormProps {
  project: Project;
  onSuccess: () => void;
  onCancel: () => void;
}

const EditProjectForm = ({
  project,
  onSuccess,
  onCancel,
}: EditProjectFormProps) => {
  const [formData, setFormData] = useState<Project>({ ...project });

  // This will update the formData with what you've entered
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Don't let the page auto refresh
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    await updateProject(formData.projectId, formData);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Project</h2>
      <label htmlFor="">
        Project Name:{' '}
        <input
          type="text"
          name="projectName"
          value={formData.projectName}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="">
        Project Type:{' '}
        <input
          type="text"
          name="projectType"
          value={formData.projectType}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="">
        Regional Program:{' '}
        <input
          type="text"
          name="projectRegionalProgram"
          value={formData.projectRegionalProgram}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="">
        Impact:{' '}
        <input
          type="number"
          name="projectImpact"
          value={formData.projectImpact}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="">
        Project Phase:{' '}
        <input
          type="text"
          name="projectPhase"
          value={formData.projectPhase}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="">
        Project Functionality Status:{' '}
        <input
          type="text"
          name="projectFunctionalityStatus"
          value={formData.projectFunctionalityStatus}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Update Project</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default EditProjectForm;
