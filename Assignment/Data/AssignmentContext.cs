using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Data.Entity;
using System.Linq;
using System.Web;
using Assignment.Models;

namespace Assignment.Data
{
    public class AssignmentContext : DbContext
    {
        // You can add custom code to this file. Changes will not be overwritten.
        // 
        // If you want Entity Framework to drop and regenerate your database
        // automatically whenever you change your model schema, please use data migrations.
        // For more information refer to the documentation:
        // http://msdn.microsoft.com/en-us/data/jj591621.aspx
    
        public AssignmentContext() : base("name=AssignmentContext")
        {
            Database.SetInitializer<AssignmentContext>(new UniDbInitializer<AssignmentContext>());
        }

        public System.Data.Entity.DbSet<Assignment.Models.Category> Categories { get; set; }

        public System.Data.Entity.DbSet<Assignment.Models.Product> Products { get; set; }

        private class UniDbInitializer<T> : DropCreateDatabaseAlways<AssignmentContext>
        {

            protected override void Seed(AssignmentContext context)
            {
                IList<Category> categories = new List<Category>
                {
                    new Category()
                    {
                        Name = "Áo"
                    },

                    new Category()
                    {
                        Name = "Quần"
                    },
                };
                IList<Product> products = new List<Product>
                {
                    new Product()
                    {
                        Name = "Áo ông giá Noel",
                        Description = "Áo ngắn tay thoáng mát",
                        Price = 50000,
                        UrlImage = "https://product.hstatic.net/1000204695/product/ong_noel_master.png",
                        CategoryId = 1
                    },

                    new Product()
                    {
                        Name = "Áo chú hề",
                        Description = "Áo dài tay cá tính",
                        Price = 100000,
                        UrlImage = "https://ae01.alicdn.com/kf/HTB1UlocXyLrK1Rjy1zdq6ynnpXaA.jpg_q90.jpg",
                        CategoryId = 1
                    },

                    new Product()
                    {
                        Name = "Quần mặt cười",
                        Description = "Quần bò cá tính",
                        Price = 120000,
                        UrlImage = "https://img.alicdn.com/imgextra/i4/68579501/TB2R6VXXi6guuRjy1XdXXaAwpXa_!!68579501.jpg",
                        CategoryId = 2
                    }
                };

                foreach (var category in categories)
                    context.Categories.Add(category);
                foreach (var product in products)
                    context.Products.Add(product);
                base.Seed(context);
            }
        }
    }
}
