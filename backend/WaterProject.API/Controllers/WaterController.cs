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
        public IActionResult GetProjects(int pageHowMany = 10, int pageNum = 1)
        {
            var something = _context.Projects
                .Skip((pageNum - 1) * pageHowMany)
                .Take(pageHowMany)
                .ToList();
            
            var totalNumProject = _context.Projects.Count();

            var newObject = new
            {
                Projects = something,
                TotalNum = totalNumProject
            };
            return Ok(newObject); 
        }
        [HttpGet("FunctionalProjects")]
        public IEnumerable<Project> GetFunctionalProjects()
        {
            var something = _context.Projects.Where(p => p.ProjectFunctionalityStatus == "Functional").ToList();
            return something;
        }

    }
}
