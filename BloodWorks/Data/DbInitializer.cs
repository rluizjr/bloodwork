using BloodWorks.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BloodWorks.Data
{
    public class DbInitializer
    {
        public static void Initialize(BloodWorkContext context)
        {
            context.Database.EnsureCreated();

            if (context.BloodWork.Any())
            {
                return;
            }

            var bloodWorks = new BloodWork[]
            {
                new BloodWork{
                    DateCreated = DateTime.Parse("2017-02-02"),
                    Description = "Renato Testing",
                    ExamDate = DateTime.Parse("2017-02-02"),
                    Hematocrit = 2,
                    Hemoglobin = 6,
                    MCHC = 1,
                    MCV = 2,
                    PlateletCount = 1,
                    RDW = 8,
                    RedBloodCellCount = 2000,
                    ResultsDate = DateTime.Parse("2017-02-02"),
                    WhiteBloodCellCount = 3000
                },
                new BloodWork{
                    DateCreated = DateTime.Parse("2018-01-02"),
                    Description = "Renato Testing again",
                    ExamDate = DateTime.Parse("2018-02-02"),
                    Hematocrit = 5,
                    Hemoglobin = 8,
                    MCHC = 4,
                    MCV = 3,
                    PlateletCount = 1,
                    RDW = 81,
                    RedBloodCellCount = 10,
                    ResultsDate = DateTime.Parse("2018-02-03"),
                    WhiteBloodCellCount = 2556
                },
                new BloodWork{
                    DateCreated = DateTime.Parse("2018-02-02"),
                    Description = "Renato Testing",
                    ExamDate = DateTime.Parse("2018-02-02"),
                    Hematocrit = 3,
                    Hemoglobin = 3,
                    MCHC = 1,
                    MCV = 4,
                    PlateletCount = 1,
                    RDW = 234,
                    RedBloodCellCount = 234,
                    ResultsDate = DateTime.Parse("2018-02-02"),
                    WhiteBloodCellCount = 23435
                }
            };

            foreach (BloodWork b in bloodWorks)
            {
                context.BloodWork.Add(b);
            }

            try
            {
                context.SaveChanges();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
            }
            
        }
    }
}
