    // $(document).ready(function () {
    // //   var hiveonActiveWorkersOnline = '0'
    // //   var hiveonValidShares = '0'
    // //   var hiveonInvalidShares = '0'
    // //   var hiveonStaleShares = '0'
    // //   var hiveonReportedHashrate = '0'
    // //   var hiveonCurrentHashRate = '0'
    // //   var hiveonProfit = '0'
    // //   var coinsPerday = ''
    // //   var cortexProfitPerDay = ''
    // var cortexPrice = ''
    // var cortexProfitPerDay = ''
    //   $.ajax({
    //         type: "get", url: "https://api.coingecko.com/api/v3/coins/cortex",
    //         success: function (data, text) {

    //           var results = data
    //           var result = results.market_data.current_price.usd
    //           var cortexPrice1 = result
    //           var cortexPriceToString = cortexPrice1.toString().substring(0, 4)
    //         cortexPrice = cortexPriceToString
    //         //   var cortexProfitPerDay1 = coinsPerday * cortexPrice
    //         //   var cortexProfitPerDayString = cortexProfitPerDay1.toString();
    //         //   cortexProfitPerDay = cortexProfitPerDayString.substring(0, 5)
    //           $('.cortexPrice').html('Cortex Price <br>' + cortexPrice + '$')
    //           $('.cortexProfitPerDay').html('Profit per 24h <br>' + cortexProfitPerDay + '$')
    //         },
    //         error: function (request, status, error) {
    //           // alert(request.responseText);
    //         }
    //       })

    //       $.ajax({
    //         type: "get", url: "https://api.coingecko.com/api/v3/coins/ethereum",
    //         success: function (data, text) {
    //           var results = data
    //           var ethereumPrice = results.market_data.current_price.usd
    //           $('.ethereumPrice').html(ethereumPrice + '$')
    //         },
    //         error: function (request, status, error) {
    //           // alert(request.responseText);
    //         }
    //       })

    //   // var ethermineHeight = '1100';
    //   // $('.card').css('height', ethermineHeight)
    // //   var date = ''
    // //   var d = new Date();
    // //   var curr_date = d.getDate();
    // //   var curr_month = d.getMonth();
    // //   curr_month++;
    // //   var curr_year = d.getFullYear();
    // //   date = curr_date + "-" + curr_month + "-" + curr_year


    //   // START OF ETHERMINE API

    // //   $.ajax({
    // //     type: "get", url: "https://api.ethermine.org/miner/0x982A366CB0bFe6eA5C04A4017c839Ef83B02978C/dashboard",
    // //     success: function (data, text) {
    // //       var results = data
    // //       var dataLength = results.data.statistics.length - 1
    // //       var lastHR = results.data.statistics[dataLength]
    // //       var activeWorkers = results.data.statistics[dataLength].activeWorkers
    // //       var currentHashrate1 = results.data.statistics[dataLength].currentHashrate / 1000000
    // //       var currentHashrateToString = currentHashrate1.toString();
    // //       var currentHashrate = currentHashrateToString.substring(0, 6)
    // //       var invalidShares = results.data.statistics[dataLength].invalidShares
    // //       var reportedHashrate1 = results.data.statistics[dataLength].reportedHashrate / 1000000
    // //       var reportedHashrateToString = reportedHashrate1.toString();
    // //       var reportedHashrate = reportedHashrateToString.substring(0, 6);
    // //       var staleShares = results.data.statistics[dataLength].staleShares
    // //       var timeStamp = results.data.statistics[dataLength].time
    // //       var validShares = results.data.statistics[dataLength].validShares

    // //       if (reportedHashrate <= 300) {
    // //         $(".ethermine-img").attr("src", "./img/red.jpeg");
    // //       } else {
    // //         $(".ethermine-img").attr("src", "./img/green.jpeg");
    // //       }

    // //       if (reportedHashrate == 0) {
    // //         activeWorkers = 0
    // //       } else {
    // //         activeWorkers = activeWorkers
    // //       }
    // //       if (activeWorkers == 0) {
    // //         // Activate when ready $(".ethermine-container").hide();
    // //       }
          


    // //       $('.ethermineDate').html('Date <br>' + date)
    // //       $('.ethermineActiveWorkers').html(activeWorkers)
    // //       $('.ethermineCurrentHashRate').html(currentHashrate + 'MH/s')
    // //       $('.ethermineReportedHashrate').html(reportedHashrate + 'MH/s')
    // //       $('.ethermineValidShares').html(validShares)
    // //       $('.ethermineStaleshares').html(staleShares)
    // //       $('.ethermineInvalidShares').html(invalidShares)
    // //       $('.ethermineContainer').show() //IF ALL SUCCESS => SHOW
    // //     },
    // //     error: function (request, status, error) {
    // //       $('.ethermineContainer').hide() //IF ALL FAILED => HIDE
    // //     }
    // //   });

    // //   $.ajax({
    // //     type: "get", url: "https://api.ethermine.org/miner/0x982A366CB0bFe6eA5C04A4017c839Ef83B02978C/currentStats",
    // //     success: function (data, text) {
    // //       var results2 = data
    // //       var coinsPerMinute = results2.data.usdPerMin * 60
    // //       var coinsperday = coinsPerMinute * 24
    // //       var coinsPerdayString = coinsperday.toString();
    // //       coinsPerday = coinsPerdayString.substring(0, 5);
    // //       $('.ethermineCoinsPerDay').html(coinsPerday + "$")

    // //     },
    // //     error: function (request, status, error) {
    // //       // alert(request.responseText);
    // //     }
    // //   });
    // //   // END OF ETHERMINE API



    //   // START OF CORTEX API

    // //   $.ajax({
    // //     type: "get", url: "https://ctxc.2miners.com/api/accounts/0x277e50882683b8e94585f0116d6806176304af6b",
    // //     success: function (data, text) {
    // //       var cortexResult = data
    // //       var activeWorkers = cortexResult.workersOnline
    // //       var currentHashrate1 = cortexResult.currentHashrate
    // //       var currentHashrateToString = currentHashrate1.toString();
    // //       var currentHashrate = currentHashrateToString.substring(0, 5);
    // //       var averageHashrate24 = cortexResult.hashrate.toString().substring(0, 5)
    // //       var timeStamp = cortexResult.updatedAt
    // //       var cortexPer24 = cortexResult.sumrewards[2].reward
    // //       var cortextoString = cortexPer24.toString();
    // //       var cortexPerDayString = cortextoString.substring(0, 4);
    // //       var total1 = cortexResult.stats.paid
    // //       var totalToString = total1.toString();
    // //       var totalPaid1 = totalToString.substring(0, 6)
    // //       var a = cortexPerDayString;
    // //       var b = ".";
    // //       var position = 2;
    // //       var cortexPerDay = [a.slice(0, position), b, a.slice(position)].join('');
    // //       var c = totalPaid1;
    // //       var d = ".";
    // //       var position = 3;
    // //       var totalPaid = [c.slice(0, position), d, c.slice(position)].join('');
    // //       var currentLuck = cortexResult.currentLuck

    // //       if (currentHashrate <= 15) {
    // //         $(".cortex-img").attr("src", "./img/red.jpeg");
    // //       } else {
    // //         $(".cortex-img").attr("src", "./img/green.jpeg");
    // //       }

    // //       var power = ''
    // //       if (currentHashrate >= 1000) {
    // //         power = 'GH/S'
    // //       } else {
    // //         power = 'MH/s'
    // //       }

    // //       $('.cortexDate').html('Date <br>' + date)
    // //       $('.cortexActiveWorkers').html('Active Workers <br>' + activeWorkers)
    // //       $('.cortexCurrentHashRate').html('Current HashRate <br>' + currentHashrate + ' ' + power)
    // //       $('.cortexReportedHashrate').html('Reported HashRate <br>' + averageHashrate24 + ' ' + power)
    // //       $('.cortexCoinsPerDay').html('Cortex/24h <br>' + cortexPerDay)
    // //       $('.cortexTotalPaid').html('Total Paid <br>' + totalPaid)
    // //       $('.cortexcurrentLuck').html('Current Luck <br>' + currentLuck)

          
    // //     },
    // //     error: function (request, status, error) {

    // //     }
    // //   });
    //   // END OF CORTEX API

    //   //START OF HIVEON API




    // //   $.ajax({
    // //     type: "get", url: "https://hiveon.net/api/v1/stats/miner/982a366cb0bfe6ea5c04a4017c839ef83b02978c/ETH/billing-acc",
    // //     success: function (data, text) {
    // //       $.ajax({
    // //         type: "get", url: "https://api.coingecko.com/api/v3/coins/ethereum",
    // //         success: function (data, text) {
    // //           var results = data
    // //           var ethereumPrice = results.market_data.current_price.usd
    // //           $('.ethereumPrice').html('ethereum Price <br>' + ethereumPrice + '$')
    // //           var results = data
    // //           hiveonProfitEther = results.expectedReward24H
    // //           hiveonProfit = hiveonProfitEther * ethereumPrice
    // //         },
    // //         error: function (request, status, error) {
    // //           // alert(request.responseText);
    // //         }
    // //       })

    // //     },

    // //     error: function (request, status, error) {
    // //       // alert(request.responseText);
    // //     }
    // //   })

    // //   $.ajax({
    // //     type: "get", url: "https://hiveon.net/api/v1/stats/miner/982a366cb0bfe6ea5c04a4017c839ef83b02978c/ETH",
    // //     success: function (data, text) {
    // //       var results = data
    // //       hiveonActiveWorkersOnline = data.onlineWorkerCount
    // //       var shares = data.sharesStatusStats.validCount
    // //       hiveonValidShares = data.sharesStatusStats.validCount
    // //       hiveonInvalidShares = data.sharesStatusStats.invalidCount
    // //       hiveonStaleShares = data.sharesStatusStats.staleCount
    // //       hiveonCurrentHashRate = data.hashrate
    // //       hiveonReportedHashrate = data.reportedHashrate

    // //       var totalReportedhashratetostring = hiveonReportedHashrate / 1000000
    // //       var totalReportedhashrate = totalReportedhashratetostring.toString().substring(0, 6)
    // //       hiveonReportedHashrate = totalReportedhashrate

    // //       var totalCurrenthashratetostring = hiveonCurrentHashRate / 1000000
    // //       var totalCurrenthashrate = totalCurrenthashratetostring.toString().substring(0, 6)
    // //       hiveonCurrentHashRate = totalCurrenthashrate
    // //     },

    // //     error: function (request, status, error) {
    // //       // alert(request.responseText);
    // //     }
    // //   })

    // //   $.ajax({
    // //     type: "get", url: "https://hiveon.net/api/v1/stats/miner/982a366cb0bfe6ea5c04a4017c839ef83b02978c/ETH/workers",
    // //     success: function (data, text) {
    // //       var results = data.workers
    // //       var firstrig = '1_Rig_-_3060ti'
    // //       var secondrig = '2_Rig_-_3070'
    // //       var thirdrig = '3_Rig_-_Betty'
    // //       // console.log(results[firstrig])
    // //       // console.log(results[secondrig])
    // //       // console.log(results[thirdrig])

    // //       if (results == null ) {
    // //         console.log("No workers on Hiveon pool ETH")
    // //         $('.hiveonContainer').hide() //IF ALL FAIL => HIDE
    // //       } else {
    // //       var firsthashrate = results[firstrig].reportedHashrate
    // //       let secondhashrate = results[secondrig].reportedHashrate
    // //       let thirdhashrate = results[thirdrig].reportedHashrate

    // //       var power = ''
    // //       if (hiveonCurrentHashRate >= 1000) {
    // //         power = 'GH/S'
    // //       } else {
    // //         power = 'MH/s'
    // //       }

    // //       $('.hiveonDate').html('Date <br>' + date)
    // //       $('.hiveonActiveWorkersOnline').html('Active Workers <br>' + hiveonActiveWorkersOnline)
    // //       $('.hiveonCurrentHashRate').html('Current HashRate <br>' + hiveonCurrentHashRate + ' ' + power)
    // //       $('.hiveonReportedHashrate').html('Reported HashRate <br>' + hiveonReportedHashrate + ' ' + power)
    // //       $('.hiveonStaleshares').html('Stale Shares <br>' + hiveonStaleShares)
    // //       $('.hiveonInvalidShares').html('Invalid Shares <br>' + hiveonInvalidShares)
    // //       $('.hiveonValidShares').html('Valid Shares <br>' + hiveonValidShares)
    // //       $('.hiveonProfit').html('Valid Shares <br>' + hiveonProfit)
    // //       $('.hiveonContainer').show() //IF ALL SUCCESS => SHOW
    // //     }


    // //       setTimeout(
    // //         function () {

    // //           new Chart(document.getElementById("pie-chart"), {
    // //             type: 'pie',
    // //             data: {
    // //               labels: ["Ethermine", "Hiveon", "2miners Cortex"],
    // //               datasets: [{
    // //                 label: "Percent",
    // //                 backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f"],
    // //                 data: [coinsPerday, hiveonProfit, cortexProfitPerDay]
    // //               }]
    // //             },
    // //             options: {
    // //               title: {
    // //                 display: true,
    // //                 text: 'Revenue par pool/coin en $'
    // //               }
    // //             }
    // //           });
    // //         }, 2500);

    // //     },
    // //     error: function (request, status, error) {
    // //       //  $('.ethermineContainer').hide() //IF ALL FAILED => HIDE
    // //     },



    // //     error: function (request, status, error) {
    // //       // alert(request.responseText);
    // //     }
    // //   })


    // }); // End of Document Ready
 