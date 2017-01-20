/**
This is the main js class that gets data from server and builds UI
**/
(function () {
    var storedData = {};

    function successFunction(data) {
        storedData.data = data;
        $('#loadingDiv').hide();
        renderData();
      
    }

    function getData() {
        $.ajax({
            url: "/Home/getAllAds",
            dataType: "json",
            type: "GET",
            contentType: "application/json",
            success: successFunction
        });
    }


    function getCoverAds(obj) {
        var coverAds = $(storedData.data).filter(function (i, n) {
            return (n.position === 'Cover' && n.numPages >= 0.5);
        });
        $('#adstable').bootstrapTable('destroy');
        getAllAds(coverAds);

    }

    function cmp(x, y) {
        return x > y ? 1 : x < y ? -1 : 0;
    };

    function getTopBrands() {
        var dataByBrandIds = {};
        //sum all brand values
        storedData.data.forEach(function (entry) {
            if (!dataByBrandIds[entry.brandId]) {
                var obj = {};
                obj.brandId = entry.brandId;
                obj.brandName = entry.brandName;
                obj.numPages = entry.numPages;
                dataByBrandIds[entry.brandId] = obj
            } else {
                var newObj = {};
                newObj.brandId = entry.brandId;
                newObj.brandName = entry.brandName;
                var existCount = dataByBrandIds[entry.brandId].numPages;
                newObj.numPages = existCount + entry.numPages;
                delete dataByBrandIds[entry.brandId];
                dataByBrandIds[entry.brandId] = newObj;
            }

        });
        var topBrands = $.map(dataByBrandIds, function (v) {
            return v;
        });
        //sort it by total number of pages
        topBrands.sort(function (a, b) {
            return b.numPages - a.numPages;
        });

        var topFiveBrands = topBrands.slice(0, 5);
        topFiveBrands.sort(function (a, b) {
            //note the minus before -cmp, for descending order
            return cmp(
                [-cmp(a.numPages, b.numPages), cmp(a.brandName, b.brandName)], [-cmp(b.numPages, a.numPages), cmp(b.brandName, a.brandName)]
            );
        });
        $('#adstable').bootstrapTable('destroy');
        $('#adstable').bootstrapTable({
            data: topFiveBrands,
            sortName: "numPages",
            sortOrder: "desc",
            columns: [{
                field: 'brandId',
                title: 'Brand ID',
                "sortable": true
            },
                {
                    field: 'numPages',
                    title: 'Num of Pages',
                    "sortable": true

                }

            ]


        });

    }

    function getTopAds() {
        //sort data by number of pages
        storedData.data.sort(function (a, b) {
            return b.numPages - a.numPages;
        });
        // store top distinct brand names from sorted list
        var topFiveAds = {};
        var topFiveAdsData = [];
        var i = 0;
        for (var j = 0; j < storedData.data.length; j++) {
            var entry = storedData.data[j];
            if (!topFiveAds[entry.brandId]) {
                topFiveAds[entry.brandId] = true;
                topFiveAdsData.push(entry);
                i++;
            }

            if (i === 5) break;
        }
        //sort numPages descending then brand name ascending
        topFiveAdsData.sort(function (a, b) {
            //note the minus before -cmp, for descending order
            return cmp(
                [-cmp(a.numPages, b.numPages), cmp(a.brandName, b.brandName)], [-cmp(b.numPages, a.numPages), cmp(b.brandName, a.brandName)]
            );
        });
        $('#adstable').bootstrapTable('destroy');
        $('#adstable').bootstrapTable({
            data: topFiveAdsData,
            sortName: "numPages",
            sortOrder: "desc",
            columns: [{
                field: 'adId',
                title: 'Ad ID',
                "sortable": true
            }, {
                field: 'brandId',
                title: 'Brand ID',
                "sortable": true
            }, {
                field: 'brandName',
                title: 'Brand Name',
                "sortable": true


            },
                {
                    field: 'position',
                    title: 'Position',
                    "sortable": true

                },
                {
                    field: 'numPages',
                    title: 'Num of Pages',
                    "sortable": true

                }

            ]


        });

    }

    function getAllAds(data) {
        if (!data) data = storedData.data;
        $('#adstable').bootstrapTable('destroy');
        $('#adstable').bootstrapTable({
            columns: [{
                field: 'adId',
                title: 'Ad ID',
                "sortable": true
            }, {
                field: 'brandId',
                title: 'Brand ID',
                "sortable": true
            }, {
                field: 'brandName',
                title: 'Brand Name',
                "sortable": true

            },
                {
                    field: 'position',
                    title: 'Position',
                    "sortable": true

                },
                {
                    field: 'numPages',
                    title: 'Num of Pages',
                    "sortable": true

                }
            ],
            data: data,
            sortName: "brandName",
            sortOrder: "asc",
            pagination: true,
            pageSize: 25
        });
    }

    function renderData() {
        var tabSelected = location.hash;
        switch (tabSelected) {
            case "#all":
                getAllAds();
                break;
            case "#coverads":
                getCoverAds();
                break;
            case "#topads":
                getTopAds();
                break;
            case "#topbrands":
                getTopBrands();
                break;
            default:
                getAllAds();
        }
    }
    $(document).ready(function () {
        getData();

    });
    window.onhashchange = renderData;
})();
