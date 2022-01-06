using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using Monolith.Entities.Auction;

namespace Monolith.Database.Data
{
    public static class ProductSeed
    {
        public static List<Product> GenerateProducts()
        {
            var products = new List<Product>();

            const string root = @"..\\Monolith\Database\Data\Images\";
            var categoryEntries = Directory.GetDirectories(root);
            foreach (var category in categoryEntries)
            {
                var categoryName = category.Split("\\").Last();
                var categoryImageRoot = root + categoryName;
                products.AddRange(GenerateProductForCategory(categoryName, categoryImageRoot));
            }

            return products;
        }

        private static IEnumerable<Product> GenerateProductForCategory(string categoryName, string categoryImageRoot)
        {
            var products = new List<Product>();
            if (!CategorySeed.InitialCategories.Any())
            {
                return products;
            }

            var categoryId = Guid.Empty;
            var category = CategorySeed.InitialCategories.Find(c => c.Name == categoryName);
            if (category != null)
            {
                categoryId = category.Id;
            }

            var directoryInfo = new DirectoryInfo(categoryImageRoot);
            var imagesInfo = directoryInfo.GetFiles("*.jpg");
            var images = (from imageInfo in imagesInfo let image = ReadFile(imageInfo.FullName) select (Convert.ToBase64String(image), imageInfo.Name.Split(".jpg")[0])).ToList();

            for (var i = 1; i <= 50; i++)
            {
                var startingPrice = GeneratePrice();
                var instantPrice = GeneratePrice(startingPrice);
                var starTime = GenerateDate(DateTime.Now);
                var endTime = GenerateDate(starTime);

                var (base64, fileName) = images[GenerateRandomNumber(images.Count)];

                var product = new Product()
                {
                    Id = Guid.NewGuid(),
                    Name = GenerateName(fileName),
                    Description = GenerateDescription(),
                    Image = base64,
                    StartPrice = startingPrice,
                    InstantPrice = instantPrice,
                    StarTime = starTime,
                    EndTime = endTime,
                    Status = ProductStatus.Open,
                    CategoryId = categoryId
                };

                products.Add(product);
            }

            return products;
        }

        private static string GenerateName(string categoryName)
        {
            var names = new List<string>()
            {
                "Olivia", "Emma", "Ava", "Sophia", "Isabella", "Charlotte", "Amelia", "Mia", "Harper", "Evelyn",
                "Abigail", "Emily", "Ella", "Elizabeth", "Camila", "Luna", "Sofia", "Avery", "Mila", "Aria", "Scarlett",
                "Penelope", "Layla", "Chloe", "Victoria", "Madison", "Eleanor", "Grace", "Nora", "Riley", "Zoey",
                "Hannah", "Hazel", "Lily", "Ellie", "Violet", "Lillian", "Zoe", "Stella", "Aurora", "Natalie", "Emilia",
                "Everly", "Leah", "Aubrey", "Willow", "Addison", "Lucy", "Audrey", "Bella", "Nova", "Brooklyn",
                "Paisley", "Savannah", "Claire", "Skylar", "Isla", "Genesis", "Naomi", "Elena", "Caroline", "Eliana",
                "Anna", "Maya", "Valentina", "Ruby", "Kennedy", "Ivy", "Ariana", "Aaliyah", "Cora", "Madelyn", "Alice",
                "Kinsley", "Hailey", "Gabriella", "Allison", "Gianna", "Serenity", "Samantha", "Sarah", "Autumn",
                "Quinn", "Eva", "Piper", "Sophie", "Sadie", "Delilah", "Josephine", "Nevaeh", "Adeline", "Arya",
                "Emery", "Lydia", "Clara", "Vivian", "Madeline", "Peyton", "Julia", "Rylee",
                "Liam", "Noah", "Oliver", "William", "Elijah", "James", "Benjamin", "Lucas", "Mason", "Ethan",
                "Alexander", "Henry", "Jacob", "Michael", "Daniel", "Logan", "Jackson", "Sebastian", "Jack", "Aiden",
                "Owen", "Samuel", "Matthew", "Joseph", "Levi", "Mateo", "David", "John", "Wyatt", "Carter", "Julian",
                "Luke", "Grayson", "Isaac", "Jayden", "Theodore", "Gabriel", "Anthony", "Dylan", "Leo", "Lincoln",
                "Jaxon", "Asher", "Christopher", "Josiah", "Andrew", "Thomas", "Joshua", "Ezra", "Hudson", "Charles",
                "Caleb", "Isaiah", "Ryan", "Nathan", "Adrian", "Christian", "Maverick", "Colton", "Elias", "Aaron",
                "Eli", "Landon", "Jonathan", "Nolan", "Hunter", "Cameron", "Connor", "Santiago", "Jeremiah", "Ezekiel",
                "Angel", "Roman", "Easton", "Miles", "Robert", "Jameson", "Nicholas", "Greyson", "Cooper", "Ian",
                "Carson", "Axel", "Jaxson", "Dominic", "Leonardo", "Luca", "Austin", "Jordan", "Adam", "Xavier",
                "Jose", "Jace", "Everett", "Declan", "Evan", "Kayden", "Parker", "Wesley", "Kai"
            };

            return categoryName + " " + names.OrderBy(x => Guid.NewGuid()).FirstOrDefault();
        }

        private static string GenerateDescription()
        {
            var descriptions = new List<string>()
            {
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
                "Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
                "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
            };

            var randomDescriptions = descriptions.OrderBy(x => Guid.NewGuid()).Take(4);
            var generatedDescription = new StringBuilder();
            foreach (var description in randomDescriptions)
            {
                generatedDescription.Append(description);
                generatedDescription.Append(" ");
            }

            return generatedDescription.ToString();
        }

        private static decimal GeneratePrice(decimal start = 0, decimal end = 100)
        {
            if (start >= end)
            {
                end = start + 1000;
            }
            var random = new Random();
            var randomNumber = random.Next((int)start, (int)end);
            return randomNumber;
        }

        private static DateTime GenerateDate(DateTime startingTime)
        {
            var random = new Random();
            return startingTime.AddDays(random.Next(10, 100));
        }

        private static int GenerateRandomNumber(int end)
        {
            var random = new Random();
            return random.Next(0, end);
        }

        public static byte[] ReadFile(string sPath)
        {
            var fInfo = new FileInfo(sPath);
            var numBytes = fInfo.Length;

            var fStream = new FileStream(sPath, FileMode.Open, FileAccess.Read);

            var br = new BinaryReader(fStream);

            var data = br.ReadBytes((int)numBytes);
            return data;
        }
    }
}