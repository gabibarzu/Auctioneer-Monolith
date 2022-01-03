using System.Collections.Generic;

namespace Monolith.Entities.Helpers
{
    public class PagedList<T>
    {
        public int RowsPerPage { get; set; }
        public List<T> Entities { get; set; }
        public int TotalNumberRows { get; set; }
    }
}