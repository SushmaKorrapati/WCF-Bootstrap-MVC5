using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(AdsDataMVC5App.Startup))]
namespace AdsDataMVC5App
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
