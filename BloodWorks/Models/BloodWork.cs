using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BloodWorks.Models
{
    //Creates model doing the required validations
    public class BloodWork
    {
        [Key]
        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int IdBloodWorks { get; set; }

        [Display(Name = "Created Date")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime DateCreated { get; set; }

        [Display(Name = "Exam Date")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime ExamDate { get; set; }

        [Display(Name = "Results Date")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime ResultsDate { get; set; }

        [StringLength(100)]
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
