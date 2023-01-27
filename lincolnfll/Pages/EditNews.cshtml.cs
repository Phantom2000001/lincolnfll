using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Diagnostics;
using System.Web;

namespace lincolnfll.Pages
{
    public class EditNewsModel : PageModel
    {
        public IWebHostEnvironment env;
        public News News;

        public EditNewsModel(IWebHostEnvironment e)
        {
            env = e;
            News = new News("", "", "", 0);
        }

        public void OnGet()
        {
        }
    }

    public class News
    {
        public string? name;
        public string? description;
        public string? body;
        public int? type;
        public string date;

        public News(string title, string description, string body, int type)
        {
            name = title;
            this.description = description;
            this.body = body;
            this.type = type;
            date = DateTime.Now.ToString();
        }
    }
}
