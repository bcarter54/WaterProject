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
        public IEnumerable<Project> Get()
        {
            var something = _context.Projects.ToList();

            return something;
        }
        [HttpGet("FunctionalProjects")]
        public IEnumerable<Project> GetFunctionalProjects()
        {
            var something = _context.Projects.Where(p => p.ProjectFunctionalityStatus == "Functional").ToList();
            return something;
        }

    }
}
