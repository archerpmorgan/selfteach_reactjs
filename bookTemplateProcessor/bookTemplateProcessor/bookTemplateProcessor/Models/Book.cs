using System.Collections.Generic;

namespace bookTemplateProcessor
{
    public class Book
    {
        public string title { get; set; }
        public string subject { get; set; }
        public string author { get; set; }
        public string edition { get; set; }

        public string cover { get; set; }
        public IList<Section> sections { get; set; }
    }
}
