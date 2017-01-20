#Project Description
This project is a single page responsive webapp that is built using .NET mvc framework and javascript libraries(jquery/bootstrap). Application consumes data from a remote public webservice and than it aggregates/formats the data and displays in a responsive UI.

WCF service consumes data from http://apps.mediaradar.com/AdDataService/AdService.svc

##Features
1. All Ads data for a time period is shown in a grid which supports pagination/sorting
2. A tab that shows only ads that appeared on cover page and have atleast 50% coverage
3. A tab with top five ads by page coverage amount, distinct by brand. Sorted by page coverage amount(descending), 
   then brand name alphabetically. 
4. The top five brands by page coverage amount. A single brand may run multiple ads. 
   Also sorted by page coverage amount (descending), then brand name alphabetically.

##Technologies Used: 
1. WCF Service
2. Bootstrap
3. Jquery
4. .Net MVC5 


##Screen Shots

####Dislaying all Ads
![alt tag] (https://cloud.githubusercontent.com/assets/23296834/22132877/c1d34a7e-de8a-11e6-9e41-e77d08124d70.png
"A full list of the ads, including all object data (AdId, Brand Id and Name, NumPages, and Position)")

![alt tag](https://cloud.githubusercontent.com/assets/23296834/22115918/c69312f4-de3c-11e6-96aa-eea4100edc31.png)

####Dislaying Ads with Position Cover
![alt tag](https://cloud.githubusercontent.com/assets/23296834/22132880/c525221a-de8a-11e6-8b03-f69eb0ba535e.png
"A full list of the ads, including all object data (AdId, Brand Id and Name, NumPages, and Position) that appeared on Cover page")

####Dislaying top 5 Ads by coverage amount
![alt tag](https://cloud.githubusercontent.com/assets/23296834/22132884/c7709400-de8a-11e6-8e46-210c463ef817.png
"The top five ads by page coverage amount, distinct by brand. Sort by page coverage amount(descending), then brand name alphabetically")

####Dislaying top 5 Brands by coverage amount
![alt tag](https://cloud.githubusercontent.com/assets/23296834/22132886/c9190ba2-de8a-11e6-955e-8cfaba78863c.png
"The top five ads by page coverage amount, distinct by brand. Sort by page coverage amount(descending), then brand name alphabetically")
