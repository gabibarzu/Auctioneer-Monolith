using Microsoft.Extensions.DependencyInjection;

using Monolith.Services;
using Monolith.Services.Interfaces;

namespace Monolith.DependencyInjection
{
    public static class DependencyInjection
    {
        public static IServiceCollection InjectDependencies(this IServiceCollection services)
        {
            services.InjectServices();
            return services;
        }

        private static void InjectServices(this IServiceCollection services)
        {
            services.AddTransient<ICategoryService, CategoryService>();
            services.AddTransient<IProductService, ProductService>();
            services.AddTransient<IDealsService, DealsService>();
            services.AddTransient<IBidService, BidService>();
        }
    }
}
