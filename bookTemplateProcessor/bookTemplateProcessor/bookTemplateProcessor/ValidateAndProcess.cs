using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Text.Json;
using System.Web.Http;

namespace bookTemplateProcessor
{
    public static class ValidateAndProcess
    {
        static bool hasEnd(string[] lines)
        {
            foreach (string line in lines)
            {
                if (line.Contains("end of chapters"))
                {
                    return true;
                }
            }
            return false;
        }

        [FunctionName("ValidateAndProcess")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();

            int index = 0;

            var lines = requestBody.Split('\n');

            if (lines[index].Contains("ingestion template"))
            {
                index++;
            }
            else
            {
                return new BadRequestErrorMessageResult("Malformed first line");
            }

            Book book = new Book();

            var title = lines[index].Split(":")[1].Trim();
            book.title = title;
            index++;

            var subject = lines[index].Split(":")[1].Trim();
            book.subject = subject;
            index++;

            var author = lines[index].Split(":")[1].Trim();
            book.author = author;
            index++;

            var edition = lines[index].Split(":")[1].Trim();
            book.edition = edition;
            index++;

            var imageUrl = lines[index].Split(":")[1].Trim();
            book.url = imageUrl;
            index++;

            if (lines[index].Contains("name->description->number"))
            {
                index++;
            }
            else
            {
                return new BadRequestErrorMessageResult("malformed template: no break for start of chapters");
            }

            // check for end, then loop through and consume chapters
            if (hasEnd(lines))
            {
                index++;
            }
            else
            {
                return new BadRequestErrorMessageResult("malformed template: no end");
            }

            List<Section> sections = new List<Section>();
            while (!lines[index].Contains("end of chapters"))
            {
                var chapter_contents = lines[index].Split("->");
                List<Problem> section_problems = new List<Problem>();
                for (int i = 1; i < Int32.Parse(chapter_contents[2].Trim()) + 1; i++)
                {
                    section_problems.Add(new Problem
                    {
                        name = i.ToString(),
                        completed = false,
                        completionDate = ""
                    });
                }
                sections.Add(new Section
                {
                    name = chapter_contents[0].Trim(),
                    haveStudied = false,
                    studiedDate = "",
                    description = chapter_contents[1].Trim(),
                    problems = section_problems
                });
                index++;
            }

            book.sections = sections;

            var cosmosService = new CosmosDBService();
            await cosmosService.Initialize();
            await cosmosService.PostBook(book);

            return new OkObjectResult(System.Text.Json.JsonSerializer.Serialize(book));
        }
    }
}
