using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BloodWorks.Models
{
    public class BloodWork
    {
        public int IdBloodWorks { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime ExamDate { get; set; }
        public DateTime ResultsDate { get; set; }
        public string Description { get; set; }
        public Double Hemoglobin { get; set; }
        public Double Hematocrit { get; set; }
        public Double WhiteBloodCellCount { get; set; }
        public Double RedBloodCellCount { get; set; }
        public Double MCV { get; set; }
        public Double MCHC { get; set; }
        public Double RDW { get; set; }
        public Double PlateletCount { get; set; }
    }
}
