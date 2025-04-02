using Microsoft.AspNetCore.Components.Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WaterProject.API.Data;

namespace WaterProject.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class WaterController : ControllerBase
    {
        private WaterDbContext _context; // This is creating an instance of the DbContext
        
        public WaterController(WaterDbContext temp) => _context = temp; // The result of this function is whatever is on the right of the lambda

        [HttpGet("AllProjects")]
        public IActionResult GetProjects(int pageHowMany = 10, int pageNum = 1, 
        [FromQuery] List<string>? projectTypes = null)
        {
            var query = _context.Projects.AsQueryable();

            if (projectTypes != null && projectTypes.Any())
            {
                query = query.Where(p => projectTypes.Contains(p.ProjectType));
            }

            var totalNumProject = query.Count();

            string? favProjType = Request.Cookies["FavoriteProjectType"];
            Console.WriteLine("~~~~Cookie~~~~\n" + favProjType);
            
            HttpContext.Response.Cookies.Append("FavoriteProjectType", "Hand Pump", 
                new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.Strict,
                    Expires = DateTime.Now.AddMinutes(1),
                } );
            
            
            var something = query
                .Skip((pageNum - 1) * pageHowMany)
                .Take(pageHowMany)
                .ToList();
            
            var newObject = new
            {
                Projects = something,
                TotalNum = totalNumProject
            };
            return Ok(newObject); 
        }

        [HttpGet("GetProjectTypes")]
        public IActionResult GetProjectTypes()
        {
            var projectTypes = _context.Projects.Select(p => p.ProjectType).Distinct().ToList();
            
            return Ok(projectTypes);
        }

        [HttpPost("AddProject")]
        public IActionResult AddProject([FromBody] Project newProject)
        {
            _context.Projects.Add(newProject);  
            _context.SaveChanges();
            return Ok(newProject);
        }

        [HttpPut("UpdateProject/{projectId}")]
        public IActionResult UpdateProject(int projectId, [FromBody] Project updatedProject)
        {
            var existingProject = _context.Projects.Find(projectId);
            
            existingProject.ProjectName = updatedProject.ProjectName;
            existingProject.ProjectType = updatedProject.ProjectType;
            existingProject.ProjectRegionalProgram = updatedProject.ProjectRegionalProgram;
            existingProject.ProjectImpact = updatedProject.ProjectImpact;
            existingProject.ProjectPhase = updatedProject.ProjectPhase;
            existingProject.ProjectFunctionalityStatus = updatedProject.ProjectFunctionalityStatus;
            
            _context.Projects.Update(existingProject);
            _context.SaveChanges();
            
            return Ok(updatedProject);
        }

        [HttpDelete("DeleteProject/{projectId}")]
        public IActionResult DeleteProject(int projectId)
        {
            var project = _context.Projects.Find(projectId);

            if (project == null)
            {
                return NotFound(new {message = "Not found"});
            }
            
            _context.Projects.Remove(project);
            _context.SaveChanges();
            
            return NoContent();
        }

    }
}
