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
                    DateCreated = DateTime.Parse("2017-11-02"),
                    ExamDate = DateTime.Parse("2017-11-02"),
                    ResultsDate = DateTime.Parse("2017-11-15"),
                    Description = "Blood Test 1",
                    Hemoglobin = 14,
                    Hematocrit = 45,
                    WhiteBloodCellCount = 4300,
                    RedBloodCellCount = 5.9,
                    MCV = 90,
                    MCHC = 28,
                    RDW = 11,
                    PlateletCount = 300000
                },
                new BloodWork{
                    DateCreated = DateTime.Parse("2018-01-13"),
                    ExamDate = DateTime.Parse("2018-01-13"),
                    ResultsDate = DateTime.Parse("2018-01-20"),
                    Description = "Blood Test 2",
                    Hemoglobin = 16,
                    Hematocrit = 48,
                    WhiteBloodCellCount = 10800,
                    RedBloodCellCount = 4.2,
                    MCV = 100,
                    MCHC = 36,
                    RDW = 15,
                    PlateletCount = 150000
                },
                new BloodWork{
                    DateCreated = DateTime.Parse("2018-04-20"),
                    ExamDate = DateTime.Parse("2018-04-20"),
                    ResultsDate = DateTime.Parse("2018-04-28"),
                    Description = "Blood Test 3",
                    Hemoglobin = 18,
                    Hematocrit = 52,
                    WhiteBloodCellCount = 7800,
                    RedBloodCellCount = 5.0,
                    MCV = 80,
                    MCHC = 32,
                    RDW = 12,
                    PlateletCount = 400000
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
