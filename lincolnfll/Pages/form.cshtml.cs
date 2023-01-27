using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Newtonsoft.Json;

namespace lincolnfll.Pages
{
    public class form : PageModel
    {
        public IWebHostEnvironment env;

        public form(IWebHostEnvironment e)
        {
            env = e;
        }

        public void OnGet()
        {
        }

        public void GetData()
        {
            var Data = new object[6] {
                Request.Form["first"].ToString(),
                Request.Form["last"].ToString(),
                Request.Form["email"].ToString(),
                Request.Form["pemail"].ToString(),
                Request.Form["grade"].ToString(),
                Request.Form["team"].ToString(),
            };

            if (Directory.Exists(System.IO.Path.Combine(env.WebRootPath, "Members")))
            {
                if(System.IO.File.Exists(System.IO.Path.Combine(env.WebRootPath, "Members", "Members.json")) && System.IO.File.ReadAllLines(System.IO.Path.Combine(env.WebRootPath, "Members", "Members.json")).Length > 0)
                {
                    System.IO.File.AppendAllText(System.IO.Path.Combine(env.WebRootPath, "Members", "Members.json"), "\n" + JsonConvert.SerializeObject(Data));
                }
                else
                {
                    System.IO.File.WriteAllText(System.IO.Path.Combine(env.WebRootPath, "Members", "Members.json"), JsonConvert.SerializeObject(Data));
                }
            }
            else
            {
                Directory.CreateDirectory(System.IO.Path.Combine(env.WebRootPath, "Members"));
                System.IO.File.WriteAllText(System.IO.Path.Combine(env.WebRootPath, "Members", "Members.json"), JsonConvert.SerializeObject(Data));
            }

            Response.Redirect("main");
        }
    }
}
