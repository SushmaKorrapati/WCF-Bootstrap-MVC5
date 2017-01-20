using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Collections;




namespace AdsDataMVC5App.Controllers
{
    public class HomeController : Controller
    {
        private DateTime _fromDate = new DateTime(2011, 01, 01);
        private DateTime _toDate = new DateTime(2011, 04, 01);

        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult getAllAds()
        {
            var ads = new List<AdDto>();

            try
            {
                AdService.AdDataServiceClient service = new AdService.AdDataServiceClient();
                var data = service.GetAdDataByDateRange(_fromDate, _toDate);
                if (data != null)
                {

                    for (int i = 0; i < data.Length; i++)
                    {
                        AdDto adDto = new AdDto();
                        adDto.adId = data[i].AdId;
                        adDto.brandId = data[i].Brand.BrandId;
                        adDto.brandName = data[i].Brand.BrandName;
                        adDto.numPages = data[i].NumPages;
                        adDto.position = data[i].Position;
                        ads.Add(adDto);
                    }

                }
            }
            catch (Exception e)
            {
                throw e;
            }
            return Json(ads, JsonRequestBehavior.AllowGet);
        }

    }

}

