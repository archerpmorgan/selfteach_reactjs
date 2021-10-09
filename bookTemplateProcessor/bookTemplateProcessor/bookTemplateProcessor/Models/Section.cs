using System.Collections.Generic;

namespace bookTemplateProcessor
{
    public class Section
    {
        public string name { get; set; }
        public bool haveStudied { get; set; }
        public string studiedDate { get; set; }
        public string description { get; set; }
        public IList<Problem> problems { get; set; }
    }
}