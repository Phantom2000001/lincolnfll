using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Newtonsoft.Json;

namespace lincolnfll.Pages
{
    public class MembersModel : PageModel
    {
        public int i = -1;
        public int j = -1;
        public IWebHostEnvironment env;
        public MembersModel(IWebHostEnvironment e)
        {
            env = e;
        }

        public void OnGet()
        {
        }

        public string[][] Read()
        {
            string[][] members = new string[0][];
            if (System.IO.File.Exists(System.IO.Path.Combine(env.WebRootPath, "Members", "Members.json")))
            {
                string[][] Members = new string[System.IO.File.ReadAllLines(System.IO.Path.Combine(env.WebRootPath, "Members", "Members.json")).Length][];

                for (int i = 0; i < Members.Length; i++)
                {
                    Members[i] = JsonConvert.DeserializeObject<string[]>(System.IO.File.ReadAllLines(System.IO.Path.Combine(env.WebRootPath, "Members", "Members.json"))[i]);
                }
                members = Members;
            }
            return members;
        }
        public string[] Read2()
        {
            string[] members = new string[0];
            if (System.IO.File.Exists(System.IO.Path.Combine(env.WebRootPath, "Members", "Members.json")))
            {
                string[] Members = new string[System.IO.File.ReadAllLines(System.IO.Path.Combine(env.WebRootPath, "Members", "Members.json")).Length];

                for (int i = 0; i < Members.Length; i++)
                {
                    Members[i] = System.IO.File.ReadAllLines(System.IO.Path.Combine(env.WebRootPath, "Members", "Members.json"))[i];
                }
                members = Members;
            }
            return members;
        }

        public string Process()
        {
            Console.WriteLine($"{i}, {j}");
            j++;
            string k = Read()[i][j];
            return k;
        }

        public void incrementIndex()
        {
            i++;
        }
        public void incrementSmall()
        {
            j++;
        }
        public void resetSmall()
        {
            j = 0;
        }
    }
}
