var sevenDays = []
var i;
for (i = 0; i < 7; ++i) {
    var date = new Date();
    date.setDate(date.getDate() - i);
    var formatedDate = ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '-' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '-' + date.getFullYear();
    sevenDays.push(formatedDate)
}

//CONFLUX
var ethValueUSD = ''
var confluxCoins = ''
var confluxValueUSD = ''
var confluxPrice = ''
$.ajax({
    type: "get", url: "https://api.coingecko.com/api/v3/coins/conflux-token",
    success: function (data, text) {
        var results = data
        confluxPrice = results.market_data.current_price.usd
        $.ajax({
            type: "get", url: "https://confluxscan.io/v1/account/cfx:aaj22yvf10hgkf1ntc420m467k104t86ejnhfgzevx?fields=cfxTransferCount&fields=erc20TransferCount&fields=erc721TransferCount&fields=erc1155TransferCount&fields=stakingBalance",
            success: function (data, text) {
                var results = data
                confluxCoins = results.cfxTransferCount
                confluxValueUSD = confluxPrice * confluxCoins
            },
            error: function (request, status, error) {
                // alert(request.responseText);
            }
        })


        $.ajax({
            type: "get", url: "https://confluxscan.io/v1/account/cfx:aaj22yvf10hgkf1ntc420m467k104t86ejnhfgzevx?fields=cfxTransferCount&fields=erc20TransferCount&fields=erc721TransferCount&fields=erc1155TransferCount&fields=stakingBalance",
            success: function (data, text) {
                var results = data

                confluxCoins = results.cfxTransferCount

            },
            error: function (request, status, error) {
                // alert(request.responseText);
            }
        })

    },
    error: function (request, status, error) {
        // alert(request.responseText);
    }
})
// END CONFLUX


// BITCOIN
var bitcoinPrice = ''
var bitcoinPercentsevendays = ''
$.ajax({
    type: "get", url: "https://api.coingecko.com/api/v3/coins/bitcoin",
    success: function (data, text) {
        var results = data
        bitcoinPercentsevendays = results.market_data.price_change_percentage_7d.toString().substring(0, 6)
        bitcoinPrice = results.market_data.current_price.usd
        $('.bitcoinPrice').html(bitcoinPrice + '$')
        $('.bitcoinPercentsevendays').html(bitcoinPercentsevendays + '%')
    },
    error: function (request, status, error) {
        // alert(request.responseText);
    }
})
var bitcoinDailyPrice = []
var d;
for (d = 0; d < sevenDays.length; ++d) {
    $.ajax({
        type: "get", url: "https://api.coingecko.com/api/v3/coins/bitcoin/history?date=" + sevenDays[d],
        success: function (data, text) {
            var results = data.market_data.current_price.usd
            var dailyPriceToString = results.toString().substring(0, 7)
            bitcoinDailyPrice.push(dailyPriceToString)
        },
        error: function (request, status, error) {
            // alert(request.responseText);
        }
    })
}
// END BITCOIN


// CORTEX
var cortexPrice = ''
var cortexPercentsevendays = ''
var cortexValueUSD = ''
$.ajax({
    type: "get", url: "https://api.coingecko.com/api/v3/coins/cortex",
    success: function (data, text) {
        var results = data
        cortexPercentsevendays = results.market_data.price_change_percentage_7d.toString().substring(0, 6)
        cortexPrice = results.market_data.current_price.usd
        var cortexTotalPaid = ''

        $.ajax({
            type: "get", url: "https://ctxc.2miners.com/api/accounts/0x277e50882683b8e94585f0116d6806176304af6b",
            success: function (data, text) {
                var cortexResult = data
                var cortexTotalPaid = (cortexResult.stats.paid.toString()) / 1000000000
                cortexValueUSD = cortexTotalPaid * cortexPrice
            },
            error: function (request, status, error) {
            }
        });
        $('.cortexPrice').html(cortexPrice + '$')
        $('.cortexPercentsevendays').html(cortexPercentsevendays + '%')
    },
    error: function (request, status, error) {
        // alert(request.responseText);
    }
})
var cortexDailyPrice = []
var c;
for (c = 0; c < sevenDays.length; ++c) {
    $.ajax({
        type: "get", url: "https://api.coingecko.com/api/v3/coins/cortex/history?date=" + sevenDays[c],
        success: function (data, text) {
            var results = data.market_data.current_price.usd
            var dailyPriceToString = results.toString().substring(0, 7)
            cortexDailyPrice.push(dailyPriceToString)
        },
        error: function (request, status, error) {
            // alert(request.responseText);
        }
    })
}
// END CORTEX


// Start of Ethereum Price API
var ethPrice = 'ethereumPrice'
var ethereumPrice = ''
var ethereumPercentsevendays = ''
$.ajax({
    type: "get", url: "https://api.coingecko.com/api/v3/coins/ethereum",
    success: function (data, text) {
        var results = data
        ethereumPrice = results.market_data.current_price.usd
        localStorage.setItem(ethPrice, ethereumPrice);
        ethereumPercentsevendays = results.market_data.price_change_percentage_7d.toString().substring(0, 6)
        var etherscanAPIKey = '86ED21HSPWXVCKUQJNHI2XU3MY6JGFN5PX'
        var ethBalance = ''
        $.ajax({
            type: "get", url: "https://api.etherscan.io/api?module=account&action=balance&address=0x982A366CB0bFe6eA5C04A4017c839Ef83B02978C&tag=latest&apikey=" + etherscanAPIKey,
            success: function (data, text) {
                var results = data
                ethBalance = (results.result) / 1000000000000000000
                console.log('results eth wallet ' + results)
                ethValueUSD = ethBalance * ethereumPrice
            },
            error: function (request, status, error) {
                // alert(request.responseText);
            }
        })
        $('.ethereumPrice').html(ethereumPrice + '$')
        $('.ethereumPercentsevendays').html(ethereumPercentsevendays + '%')
    },
    error: function (request, status, error) {
        // alert(request.responseText);
    }
})
var ethereumDailyPrice = []
var i;
for (i = 0; i < sevenDays.length; ++i) {
    $.ajax({
        type: "get", url: "https://api.coingecko.com/api/v3/coins/ethereum/history?date=" + sevenDays[i],
        success: function (data, text) {
            var results = data.market_data.current_price.eur
            var dailyPriceToString = results.toString().substring(0, 7)
            ethereumDailyPrice.push(dailyPriceToString)
        },
        error: function (request, status, error) {
            // alert(request.responseText);
        }
    })
}
setTimeout(function () {
    var payouts = []
    $.ajax({
        type: "get", url: "https://api.ethermine.org/miner/0x982A366CB0bFe6eA5C04A4017c839Ef83B02978C/dashboard/payouts",
        success: function (data, text) {
            var results = data.data.payouts
            var numberOfPayouts = results.length
            payouts.push(results)
            var p;
            var payoutindex = payouts[0]
            console.log(payoutindex)
            for (p = 0; p < payoutindex.length; ++p) {
                var txhash = payoutindex[p].txHash
                var shorttxhash = jQuery.trim(txhash).substring(0, 130).split(" ").slice(0, -1).join(" ") + "..."
                console.log(txhash)
                var transactionTime = payoutindex[p].paidOn
                var transactionAmount = payoutindex[p].amount / 1000000000000000000
                var tempEthereumPrice = localStorage.getItem(ethPrice);
                var ethamount = transactionAmount * tempEthereumPrice
                var ethamountostring = ethamount.toString().substring(0, 6)
                function format_date(date) {
                    month = date.getMonth();
                    month = month + 1; //javascript date goes from 0 to 11
                    if (month < 10) month = "0" + month; //adding the prefix
                    year = date.getFullYear();
                    day = date.getDate();
                    hour = date.getHours();
                    minutes = date.getMinutes();
                    seconds = date.getSeconds();
                    return day + "/" + month + "/" + year + " " + hour + ":" + minutes + ":" + seconds;
                }
                MyDate = new Date(transactionTime * 1000);
                formatedDate = format_date(MyDate);
                var transactionBlock = '<tr><td class="truncate">' + txhash + '</td><td>' + formatedDate + '</td><td>Completed</td><td>ETH : ' + transactionAmount + ' / ' + ethamountostring + ' €</td></tr>'
                $('.dbkit-table').append(transactionBlock)
            }
        },
        error: function (request, status, error) {
            // alert(request.responseText);
        }
    })
}, 1000);
// END OF ETHEREUM PRICE API


//START OF GOOGLE SHEET DATA
var totalInvestement = ''

$(document).ready(function () {
    setTimeout(function () {
    readData(); // Get the data from the google sheet
}, 1000);
});


var spData = null;
function doData(json) {
    spData = json.feed.entry;
}

//Here we sort the data by row and columns
function readData(parent) {
    var data = spData;
    var rowData = [];
    for (var r = 0; r < data.length; r++) {
        var cell = data[r]["gs$cell"];
        var val = cell["$t"];

        if (cell.col == 0) {
            rowData = [];
        }
        // Adding all data to the array rowData
        rowData.push(val);
    }
    totalInvestement = rowData[6]
}
//END OF GOOGLE SHEET DATA



setTimeout(function () {
    var totalWallets = ethValueUSD + cortexValueUSD + confluxValueUSD
    var totalWalletsToString = totalWallets.toString().substring(0, 7)
    $('.total-wallet').html('Total Wallets : ' + totalWalletsToString + ' $')
    /*--------------  coin_sales1 start ------------*/
    if ($('#coin_sales1').length) {
        var ctx = document.getElementById("coin_sales1").getContext('2d');
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',
            // The data for our dataset
            data: {
                labels: ["7days", "6days", "5days", "4days", "3days", "2days", "1day", "Today"],
                datasets: [{
                    label: "Sales",
                    backgroundColor: "rgba(117, 19, 246, 0.1)",
                    borderColor: '#0b76b6',
                    data: [bitcoinDailyPrice[6], bitcoinDailyPrice[5], bitcoinDailyPrice[4], bitcoinDailyPrice[3], bitcoinDailyPrice[2], bitcoinDailyPrice[1], bitcoinDailyPrice[0], bitcoinPrice],
                }]
            },
            // Configuration options go here
            options: {
                legend: {
                    display: false
                },
                animation: {
                    easing: "easeInOutBack"
                },
                scales: {
                    yAxes: [{
                        display: !1,
                        ticks: {
                            fontColor: "rgba(0,0,0,0.5)",
                            fontStyle: "bold",
                            beginAtZero: !0,
                            maxTicksLimit: 5,
                            padding: 0
                        },
                        gridLines: {
                            drawTicks: !1,
                            display: !1
                        }
                    }],
                    xAxes: [{
                        display: !1,
                        gridLines: {
                            zeroLineColor: "transparent"
                        },
                        ticks: {
                            padding: 0,
                            fontColor: "rgba(0,0,0,0.5)",
                            fontStyle: "bold"
                        }
                    }]
                }
            }
        });
    }


    /*--------------  coin_sales1 End ------------*/

    /*--------------  coin_sales2 start ------------*/
    if ($('#coin_sales2').length) {
        var ctx = document.getElementById("coin_sales2").getContext('2d');
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',
            // The data for our dataset
            data: {
                labels: ["7days", "6days", "5days", "4days", "3days", "2days", "1day", "Today"],
                datasets: [{
                    label: "Sales",
                    backgroundColor: "rgba(240, 180, 26, 0.1)",
                    borderColor: '#F0B41A',
                    data: [cortexDailyPrice[6], cortexDailyPrice[5], cortexDailyPrice[4], cortexDailyPrice[3], cortexDailyPrice[2], cortexDailyPrice[1], cortexDailyPrice[0], cortexPrice],
                }]
            },
            // Configuration options go here
            options: {
                legend: {
                    display: false
                },
                animation: {
                    easing: "easeInOutBack"
                },
                scales: {
                    yAxes: [{
                        display: !1,
                        ticks: {
                            fontColor: "rgba(0,0,0,0.5)",
                            fontStyle: "bold",
                            beginAtZero: !0,
                            maxTicksLimit: 5,
                            padding: 0
                        },
                        gridLines: {
                            drawTicks: !1,
                            display: !1
                        }
                    }],
                    xAxes: [{
                        display: !1,
                        gridLines: {
                            zeroLineColor: "transparent"
                        },
                        ticks: {
                            padding: 0,
                            fontColor: "rgba(0,0,0,0.5)",
                            fontStyle: "bold"
                        }
                    }]
                }
            }
        });
    }





    /*--------------  coin_sales2 End ------------*/

    /*--------------  coin_sales3 start ------------*/
    if ($('#coin_sales3').length) {
        var ctx = document.getElementById("coin_sales3").getContext('2d');
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',
            // The data for our dataset
            data: {
                labels: ["7days", "6days", "5days", "4days", "3days", "2days", "1day", "Today"],
                datasets: [{
                    label: "Sales",
                    backgroundColor: "rgba(290, 163, 58, 0.1)",
                    borderColor: '#fd9d24',
                    fill: true,
                    data: [ethereumDailyPrice[6], ethereumDailyPrice[5], ethereumDailyPrice[4], ethereumDailyPrice[3], ethereumDailyPrice[2], ethereumDailyPrice[1], ethereumDailyPrice[0], ethereumPrice]
                }]
            },
            // Configuration options go here
            options: {
                legend: {
                    display: false
                },
                animation: {
                    easing: "easeInOutBack"
                },
                scales: {
                    yAxes: [{
                        display: !1,
                        ticks: {
                            fontColor: "rgba(0,0,0,0.5)",
                            fontStyle: "bold",
                            beginAtZero: !0,
                            maxTicksLimit: 5,
                            padding: 0
                        },
                        gridLines: {
                            drawTicks: !1,
                            display: !1
                        }
                    }],
                    xAxes: [{
                        display: !1,
                        gridLines: {
                            zeroLineColor: "transparent"
                        },
                        ticks: {
                            padding: 0,
                            fontColor: "rgba(0,0,0,0.5)",
                            fontStyle: "bold"
                        }
                    }]
                }
            }
        });
    }

    /*--------------  coin_sales3 End ------------*/

    /*--------------  overview-chart start ------------*/
    // if ($('#verview-shart').length) {
    //     var myConfig = {
    //         "type": "line",

    //         "scale-x": { //X-Axis
    //             "label": {
    //                 "font-size": 14,
    //                 "offset-x": 0,
    //             },
    //             "item": { //Scale Items (scale values or labels)
    //                 "font-size": 10,
    //             },
    //             "guide": { //Guides
    //                 "visible": false,
    //                 "line-style": "solid", //"solid", "dotted", "dashed", "dashdot"
    //                 "alpha": 1
    //             }
    //         },
    //         "plot": { "aspect": "spline" },
    //         "series": [{
    //             "values": [0, totalWallets],
    //             "line-color": "#F0B41A",
    //             /* "dotted" | "dashed" */
    //             "line-width": 5 /* in pixels */,
    //             "marker": { /* Marker object */
    //                 "background-color": "#D79D3B",
    //                 /* hexadecimal or RGB value */
    //                 "size": 5,
    //                 /* in pixels */
    //                 "border-color": "#D79D3B",
    //                 /* hexadecimal or RBG value */
    //             }
    //         },
    //         {
    //             "values": [0, totalInvestement],
    //             "line-color": "#0884D9",
    //             /* "dotted" | "dashed" */
    //             "line-width": 5 /* in pixels */,
    //             "marker": { /* Marker object */
    //                 "background-color": "#067dce",
    //                 /* hexadecimal or RGB value */
    //                 "size": 5,
    //                 /* in pixels */
    //                 "border-color": "#067dce",
    //                 /* hexadecimal or RBG value */
    //             }
    //         }
    //         ]
    //     };

    //     zingchart.render({
    //         id: 'verview-shart',
    //         data: myConfig,
    //         height: "100%",
    //         width: "100%"
    //     });
    // }

    /*--------------  bar chart 10 amchart start ------------*/
    if ($('#ambarchart3').length) {
        var chart = AmCharts.makeChart("ambarchart3", {
            "type": "serial",
            "theme": "light",
            "categoryField": "year",
            "rotate": true,
            "startDuration": 1,
            "categoryAxis": {
                "gridPosition": "start",
                "position": "left"
            },
            "trendLines": [],
            "graphs": [{
                "balloonText": "Revenue:[[value]] $",
                "fillAlphas": 0.8,
                "id": "AmGraph-1",
                "lineAlpha": 0.2,
                "title": "Revenue",
                "type": "column",
                "valueField": "Revenue",
                "fillColorsField": "color"
            },
            {
                "balloonText": "Investment:[[value]] €",
                "fillAlphas": 0.8,
                "id": "AmGraph-2",
                "lineAlpha": 0.2,
                "title": "Investment",
                "type": "column",
                "valueField": "Investment",
                "fillColorsField": "color2"
            }
            ],
            "guides": [],
            "valueAxes": [{
                "id": "ValueAxis-1",
                "position": "top",
                "axisAlpha": 0
            }],
            "allLabels": [],
            "balloon": {},
            "titles": [],
            "dataProvider": [{
                "year": 2021,
                "Revenue": totalWallets,
                "Investment": totalInvestement,
                "color": "#7474f0",
                "color2": "#C5C5FD"
            }
            ],
            "export": {
                "enabled": true
            }

        });
    }
    /*--------------  bar chart 10 amchart END ------------*/
    /*--------------  overview-chart END ------------*/

    /*--------------  market status chart start ------------*/

    if ($('#mvaluechart').length) {
        var ctx = document.getElementById('mvaluechart').getContext('2d');
        var myLineChart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',
            // The data for our dataset
            data: {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [{
                    label: "Market Value",
                    backgroundColor: 'transparent',
                    borderColor: '#6e00ff',
                    borderWidth: 2,
                    data: [0, 15, 30, 10, 25, 0, 30],
                    pointBorderColor: "transparent",
                    pointBorderWidth: 10
                }]
            },

            // Configuration options go here
            options: {
                legend: {
                    display: false
                },
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return tooltipItem.yLabel;
                        }
                    }
                },
                elements: {
                    line: {
                        tension: 0, // disables bezier curves
                    }
                },
                scales: {
                    yAxes: [{
                        display: !1
                    }],
                    xAxes: [{
                        display: !1
                    }]
                }
            }
        });
    }

    if ($('#mvaluechart2').length) {
        var ctx = document.getElementById('mvaluechart2').getContext('2d');
        var myLineChart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',

            // The data for our dataset
            data: {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [{
                    label: "Market Value",
                    backgroundColor: 'transparent',
                    borderColor: '#6e00ff',
                    borderWidth: 2,
                    data: [0, 15, 30, 10, 25, 0, 50],
                    pointBorderColor: "transparent",
                    pointBorderWidth: 10
                }]
            },

            // Configuration options go here
            options: {
                legend: {
                    display: false
                },
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return tooltipItem.yLabel;
                        }
                    }
                },
                elements: {
                    line: {
                        tension: 0, // disables bezier curves
                    }
                },
                scales: {
                    yAxes: [{
                        display: !1
                    }],
                    xAxes: [{
                        display: !1
                    }]
                }
            }
        });
    }

    if ($('#mvaluechart3').length) {
        var ctx = document.getElementById('mvaluechart3').getContext('2d');
        var myLineChart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',

            // The data for our dataset
            data: {
                labels: ["January", "February", "March", "April", "May", "June", "July", "Agut"],
                datasets: [{
                    label: "Market Value",
                    backgroundColor: 'transparent',
                    borderColor: '#6e00ff',
                    borderWidth: 2,
                    data: [0, 15, 40, 10, 25, 0, 30, 20],
                    pointBorderColor: "transparent",
                    pointBorderWidth: 10
                }]
            },

            // Configuration options go here
            options: {
                legend: {
                    display: false
                },
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return tooltipItem.yLabel;
                        }
                    }
                },
                elements: {
                    line: {
                        tension: 0, // disables bezier curves
                    }
                },
                scales: {
                    yAxes: [{
                        display: !1
                    }],
                    xAxes: [{
                        display: !1
                    }]
                }
            }
        });
    }

    if ($('#mvaluechart4').length) {
        var ctx = document.getElementById('mvaluechart4').getContext('2d');
        var myLineChart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',

            // The data for our dataset
            data: {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [{
                    label: "Market Value",
                    backgroundColor: 'transparent',
                    borderColor: '#6e00ff',
                    borderWidth: 2,
                    data: [0, 30, 30, 10, 25, 0, 30],
                    pointBorderColor: "transparent",
                    pointBorderWidth: 10
                }]
            },

            // Configuration options go here
            options: {
                legend: {
                    display: false
                },
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return tooltipItem.yLabel;
                        }
                    }
                },
                elements: {
                    line: {
                        tension: 0, // disables bezier curves
                    }
                },
                scales: {
                    yAxes: [{
                        display: !1
                    }],
                    xAxes: [{
                        display: !1
                    }]
                }
            }
        });
    }

    /*--------------  market status chart END ------------*/

    /*--------------  visitor graph line chart start ------------*/
    if ($('#visitor_graph').length) {

        Highcharts.chart('visitor_graph', {
            chart: {
                type: 'areaspline'
            },
            title: false,
            yAxis: {
                title: false,
                gridLineColor: '#fbf7f7',
                gridLineWidth: 1
            },
            xAxis: {
                gridLineColor: '#fbf7f7',
                gridLineWidth: 1
            },
            series: [{
                name: 'USD',
                data: [400, 470, 520, 500, 420, 350, 320, 400, 550, 600, 500, 420, 400],
                fillColor: 'rgba(76, 57, 249, 0.5)',
                lineColor: 'transparent'
            },
            {
                name: 'BTC',
                data: [450, 520, 550, 400, 450, 500, 400, 450, 500, 450, 400, 500, 450],
                fillColor: 'rgba(103, 13, 251, 0.5)',
                lineColor: 'transparent'
            }
            ]
        });
    }
    /*--------------  END visitor graph line chart start ------------*/

    /*-------------- 1 line chart amchart start ------------*/
    if ($('#amlinechart1').length) {
        var chart = AmCharts.makeChart("amlinechart1", {
            "type": "serial",
            "theme": "light",
            "marginRight": 20,
            "autoMarginOffset": 20,
            "dataDateFormat": "YYYY-MM-DD HH:NN",
            "dataProvider": [{
                "date": "2012-01-01",
                "value": 8
            }, {
                "date": "2012-01-02",
                "color": "#6e00ff",
                "value": 10
            }, {
                "date": "2012-01-03",
                "value": 12
            }, {
                "date": "2012-01-04",
                "value": 14
            }, {
                "date": "2012-01-05",
                "value": 11
            }, {
                "date": "2012-01-06",
                "value": 6
            }, {
                "date": "2012-01-07",
                "value": 7
            }, {
                "date": "2012-01-08",
                "value": 9
            }, {
                "date": "2012-01-09",
                "value": 13
            }, {
                "date": "2012-01-10",
                "value": 15
            }, {
                "date": "2012-01-11",
                "color": "#6e00ff",
                "value": 19
            }, {
                "date": "2012-01-12",
                "value": 21
            }, {
                "date": "2012-01-13",
                "value": 22
            }, {
                "date": "2012-01-14",
                "value": 20
            }, {
                "date": "2012-01-15",
                "value": 18
            }, {
                "date": "2012-01-16",
                "value": 14
            }, {
                "date": "2012-01-17",
                "color": "#6e00ff",
                "value": 16
            }, {
                "date": "2012-01-18",
                "value": 18
            }, {
                "date": "2012-01-19",
                "value": 17
            }, {
                "date": "2012-01-20",
                "value": 15
            }, {
                "date": "2012-01-21",
                "value": 12
            }, {
                "date": "2012-01-22",
                "color": "#6e00ff",
                "value": 10
            }, {
                "date": "2012-01-23",
                "value": 8
            }],
            "valueAxes": [{
                "axisAlpha": 0,
                "guides": [{
                    "fillAlpha": 0.1,
                    "fillColor": "#6e00ff",
                    "lineAlpha": 0,
                    "toValue": 16,
                    "value": 10
                }],
                "position": "left",
                "tickLength": 0
            }],
            "graphs": [{
                "balloonText": "[[category]]<br><b><span style='font-size:14px;'>value:[[value]]</span></b>",
                "bullet": "round",
                "dashLength": 3,
                "colorField": "color",
                "valueField": "value"
            }],
            "trendLines": [{
                "finalDate": "2012-01-11 12",
                "finalValue": 19,
                "initialDate": "2012-01-02 12",
                "initialValue": 10,
                "lineColor": "#6e00ff"
            }, {
                "finalDate": "2012-01-22 12",
                "finalValue": 10,
                "initialDate": "2012-01-17 12",
                "initialValue": 16,
                "lineColor": "#6e00ff"
            }],
            "chartScrollbar": {
                "scrollbarHeight": 2,
                "offset": -1,
                "backgroundAlpha": 0.2,
                "backgroundColor": "#8816FD",
                "selectedBackgroundColor": "#815FF5",
                "selectedBackgroundAlpha": 1
            },
            "chartCursor": {
                "fullWidth": true,
                "valueLineEabled": true,
                "valueLineBalloonEnabled": true,
                "valueLineAlpha": 0.5,
                "cursorAlpha": 0
            },
            "categoryField": "date",
            "categoryAxis": {
                "parseDates": true,
                "axisAlpha": 0,
                "gridAlpha": 0.1,
                "minorGridAlpha": 0.1,
                "minorGridEnabled": true
            },
            "export": {
                "enabled": false
            }
        });

        chart.addListener("dataUpdated", zoomChart);

        function zoomChart() {
            chart.zoomToDates(new Date(2012, 0, 2), new Date(2012, 0, 13));
        }
    }
    /*-------------- 1 line chart amchart end ------------*/

    /*-------------- 2 line chart amchart start ------------*/
    if ($('#amlinechart2').length) {
        var chart = AmCharts.makeChart("amlinechart2", {
            "type": "serial",
            "theme": "light",
            "marginTop": 0,
            "marginRight": 20,
            "dataProvider": [{
                "year": "1950",
                "value": -0.307
            }, {
                "year": "1951",
                "value": -0.168
            }, {
                "year": "1952",
                "value": -0.073
            }, {
                "year": "1953",
                "value": -0.027
            }, {
                "year": "1954",
                "value": -0.251
            }, {
                "year": "1955",
                "value": -0.281
            }, {
                "year": "1956",
                "value": -0.348
            }, {
                "year": "1957",
                "value": -0.074
            }, {
                "year": "1958",
                "value": -0.011
            }, {
                "year": "1959",
                "value": -0.074
            }, {
                "year": "1960",
                "value": -0.124
            }, {
                "year": "1961",
                "value": -0.024
            }, {
                "year": "1962",
                "value": -0.022
            }, {
                "year": "1963",
                "value": 0
            }, {
                "year": "1964",
                "value": -0.296
            }, {
                "year": "1965",
                "value": -0.217
            }, {
                "year": "1966",
                "value": -0.147
            }, {
                "year": "1967",
                "value": -0.15
            }, {
                "year": "1968",
                "value": -0.16
            }, {
                "year": "1969",
                "value": -0.011
            }, {
                "year": "1970",
                "value": -0.068
            }, {
                "year": "1971",
                "value": -0.19
            }, {
                "year": "1972",
                "value": -0.056
            }, {
                "year": "1973",
                "value": 0.077
            }, {
                "year": "1974",
                "value": -0.213
            }, {
                "year": "1975",
                "value": -0.17
            }, {
                "year": "1976",
                "value": -0.254
            }, {
                "year": "1977",
                "value": 0.019
            }, {
                "year": "1978",
                "value": -0.063
            }, {
                "year": "1979",
                "value": 0.05
            }, {
                "year": "1980",
                "value": 0.077
            }, {
                "year": "1981",
                "value": 0.12
            }, {
                "year": "1982",
                "value": 0.011
            }, {
                "year": "1983",
                "value": 0.177
            }, {
                "year": "1984",
                "value": -0.021
            }, {
                "year": "1985",
                "value": -0.037
            }, {
                "year": "1986",
                "value": 0.03
            }, {
                "year": "1987",
                "value": 0.179
            }, {
                "year": "1988",
                "value": 0.18
            }, {
                "year": "1989",
                "value": 0.104
            }, {
                "year": "1990",
                "value": 0.255
            }, {
                "year": "1991",
                "value": 0.21
            }, {
                "year": "1992",
                "value": 0.065
            }, {
                "year": "1993",
                "value": 0.11
            }, {
                "year": "1994",
                "value": 0.172
            }, {
                "year": "1995",
                "value": 0.269
            }, {
                "year": "1996",
                "value": 0.141
            }, {
                "year": "1997",
                "value": 0.353
            }, {
                "year": "1998",
                "value": 0.548
            }, {
                "year": "1999",
                "value": 0.298
            }, {
                "year": "2000",
                "value": 0.267
            }, {
                "year": "2001",
                "value": 0.411
            }, {
                "year": "2002",
                "value": 0.462
            }, {
                "year": "2003",
                "value": 0.47
            }, {
                "year": "2004",
                "value": 0.445
            }, {
                "year": "2005",
                "value": 0.47
            }],
            "valueAxes": [{
                "axisAlpha": 0,
                "position": "left"
            }],
            "graphs": [{
                "id": "g1",
                "balloonText": "[[category]]<br><b><span style='font-size:14px;'>[[value]]</span></b>",
                "bullet": "round",
                "bulletSize": 8,
                "lineColor": "#9656e7",
                "lineThickness": 2,
                "negativeLineColor": "#c69cfd",
                "type": "smoothedLine",
                "valueField": "value"
            }],
            "chartScrollbar": {
                "graph": "g1",
                "gridAlpha": 0,
                "color": "#8816FD",
                "scrollbarHeight": 55,
                "backgroundAlpha": 0,
                "selectedBackgroundAlpha": 0.1,
                "selectedBackgroundColor": "#8816FD",
                "graphFillAlpha": 0,
                "autoGridCount": true,
                "selectedGraphFillAlpha": 0,
                "graphLineAlpha": 0.2,
                "graphLineColor": "#c2c2c2",
                "selectedGraphLineColor": "#9f46fc",
                "selectedGraphLineAlpha": 1

            },
            "chartCursor": {
                "categoryBalloonDateFormat": "YYYY",
                "cursorAlpha": 0,
                "valueLineEnabled": true,
                "valueLineBalloonEnabled": true,
                "valueLineAlpha": 0.5,
                "fullWidth": true
            },
            "dataDateFormat": "YYYY",
            "categoryField": "year",
            "categoryAxis": {
                "minPeriod": "YYYY",
                "parseDates": true,
                "minorGridAlpha": 0.1,
                "minorGridEnabled": true
            },
            "export": {
                "enabled": false
            }
        });

        chart.addListener("rendered", zoomChart);
        if (chart.zoomChart) {
            chart.zoomChart();
        }

        function zoomChart() {
            chart.zoomToIndexes(Math.round(chart.dataProvider.length * 0.4), Math.round(chart.dataProvider.length * 0.55));
        }
    }
    /*-------------- 2 line chart amchart end ------------*/

    /*-------------- 3 line chart amchart start ------------*/
    if ($('#amlinechart3').length) {
        var chartData = generateChartData();
        var chart = AmCharts.makeChart("amlinechart3", {
            "type": "serial",
            "theme": "light",
            "marginRight": 20,
            "autoMarginOffset": 20,
            "marginTop": 7,
            "dataProvider": chartData,
            "valueAxes": [{
                "axisAlpha": 0.2,
                "dashLength": 1,
                "position": "left"
            }],
            "mouseWheelZoomEnabled": true,
            "graphs": [{
                "id": "g1",
                "balloonText": "[[value]]",
                "bullet": "round",
                "bulletBorderAlpha": 1,
                "bulletColor": "#FFFFFF",
                "hideBulletsCount": 50,
                "title": "red line",
                "valueField": "visits",
                "useLineColorForBulletBorder": true,
                "balloon": {
                    "drop": true
                }
            }],
            "chartScrollbar": {
                "autoGridCount": true,
                "graph": "g1",
                "scrollbarHeight": 40,
                "color": "#fff",
                "selectedBackgroundAlpha": 1,
                "selectedBackgroundColor": "#815BF6",
                "selectedGraphFillAlpha": 0,
                "selectedGraphFillColor": "#8918FE",
                "graphLineAlpha": 0.2,
                "graphLineColor": "#c2c2c2",
                "selectedGraphLineColor": "#fff",
                "selectedGraphLineAlpha": 1
            },
            "chartCursor": {
                "limitToGraph": "g1"
            },
            "categoryField": "date",
            "categoryAxis": {
                "parseDates": true,
                "axisColor": "#DADADA",
                "dashLength": 1,
                "minorGridEnabled": true
            },
            "export": {
                "enabled": false
            }
        });

        chart.addListener("rendered", zoomChart);
        zoomChart();

        // this method is called when chart is first inited as we listen for "rendered" event
        function zoomChart() {
            // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
            chart.zoomToIndexes(chartData.length - 40, chartData.length - 1);
        }


        // generate some random data, quite different range

        // generate some random data, quite different range
        function generateChartData() {
            var chartData = [];
            var firstDate = new Date();
            firstDate.setDate(firstDate.getDate() - 5);
            var visits = 1200;
            for (var i = 0; i < 1000; i++) {
                // we create date objects here. In your data, you can have date strings
                // and then set format of your dates using chart.dataDateFormat property,
                // however when possible, use date objects, as this will speed up chart rendering.
                var newDate = new Date(firstDate);
                newDate.setDate(newDate.getDate() + i);

                visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);

                chartData.push({
                    date: newDate,
                    visits: visits
                });
            }
            return chartData;
        }
    }
    /*-------------- 3 line chart amchart end ------------*/

    /*-------------- 4 line chart amchart start ------------*/
    if ($('#amlinechart4').length) {
        var chart = AmCharts.makeChart("amlinechart4", {
            "type": "serial",
            "theme": "light",
            "legend": {
                "useGraphSettings": true
            },
            "dataProvider": [{
                "year": 1930,
                "italy": 1,
                "germany": 5,
                "uk": 3
            }, {
                "year": 1934,
                "italy": 1,
                "germany": 2,
                "uk": 6
            }, {
                "year": 1938,
                "italy": 2,
                "germany": 3,
                "uk": 1
            }, {
                "year": 1950,
                "italy": 3,
                "germany": 4,
                "uk": 1
            }, {
                "year": 1954,
                "italy": 5,
                "germany": 1,
                "uk": 2
            }, {
                "year": 1958,
                "italy": 3,
                "germany": 2,
                "uk": 1
            }, {
                "year": 1962,
                "italy": 1,
                "germany": 2,
                "uk": 3
            }, {
                "year": 1966,
                "italy": 2,
                "germany": 1,
                "uk": 5
            }, {
                "year": 1970,
                "italy": 3,
                "germany": 5,
                "uk": 2
            }, {
                "year": 1974,
                "italy": 4,
                "germany": 3,
                "uk": 6
            }, {
                "year": 1978,
                "italy": 1,
                "germany": 2,
                "uk": 4
            }],
            "startDuration": 0.5,
            "graphs": [{
                "balloonText": "place taken by Italy in [[category]]: [[value]]",
                "bullet": "round",
                "hidden": true,
                "title": "Italy",
                "valueField": "italy",
                "fillAlphas": 0,
                "lineColor": "#31ef98",
                "lineThickness": 2,
                "negativeLineColor": "#17e285",
            }, {
                "balloonText": "place taken by Germany in [[category]]: [[value]]",
                "bullet": "round",
                "title": "Germany",
                "valueField": "germany",
                "fillAlphas": 0,
                "lineColor": "#9656e7",
                "lineThickness": 2,
                "negativeLineColor": "#c69cfd"
            }, {
                "balloonText": "place taken by UK in [[category]]: [[value]]",
                "bullet": "round",
                "title": "United Kingdom",
                "valueField": "uk",
                "fillAlphas": 0,
                "lineColor": "#31aeef",
                "lineThickness": 2,
                "negativeLineColor": "#31aeef",
            }],
            "chartCursor": {
                "cursorAlpha": 0,
                "zoomable": false
            },
            "categoryField": "year",
            "categoryAxis": {
                "gridPosition": "start",
                "axisAlpha": 0,
                "fillAlpha": 0.05,
                "fillColor": "#000000",
                "gridAlpha": 0,
                "position": "top"
            },
            "export": {
                "enabled": false
            }
        });
    }
    /*-------------- 4 line chart amchart end ------------*/

    /*-------------- 5 line chart amchart start ------------*/
    if ($('#amlinechart5').length) {
        var chart = AmCharts.makeChart("amlinechart5", {
            "type": "serial",
            "theme": "light",
            "marginRight": 20,
            "marginTop": 17,
            "autoMarginOffset": 20,
            "dataProvider": [{
                "date": "2012-03-01",
                "price": 20
            }, {
                "date": "2012-03-02",
                "price": 75
            }, {
                "date": "2012-03-03",
                "price": 15
            }, {
                "date": "2012-03-04",
                "price": 75
            }, {
                "date": "2012-03-05",
                "price": 158
            }, {
                "date": "2012-03-06",
                "price": 57
            }, {
                "date": "2012-03-07",
                "price": 107
            }, {
                "date": "2012-03-08",
                "price": 89
            }, {
                "date": "2012-03-09",
                "price": 75
            }, {
                "date": "2012-03-10",
                "price": 132
            }, {
                "date": "2012-03-11",
                "price": 158
            }, {
                "date": "2012-03-12",
                "price": 56
            }, {
                "date": "2012-03-13",
                "price": 169
            }, {
                "date": "2012-03-14",
                "price": 24
            }, {
                "date": "2012-03-15",
                "price": 147
            }],
            "valueAxes": [{
                "logarithmic": true,
                "dashLength": 1,
                "guides": [{
                    "dashLength": 6,
                    "inside": true,
                    "label": "average",
                    "lineAlpha": 1,
                    "value": 90.4
                }],
                "position": "left"
            }],
            "graphs": [{
                "bullet": "round",
                "id": "g1",
                "bulletBorderAlpha": 1,
                "bulletColor": "#FFFFFF",
                "bulletSize": 7,
                "lineThickness": 2,
                "title": "Price",
                "type": "smoothedLine",
                "useLineColorForBulletBorder": true,
                "valueField": "price"
            }],
            "chartScrollbar": {},
            "chartCursor": {
                "valueLineEnabled": true,
                "valueLineBalloonEnabled": true,
                "valueLineAlpha": 0.5,
                "fullWidth": true,
                "cursorAlpha": 0.05
            },
            "dataDateFormat": "YYYY-MM-DD",
            "categoryField": "date",
            "categoryAxis": {
                "parseDates": true
            },
            "export": {
                "enabled": false
            }
        });

        chart.addListener("dataUpdated", zoomChart);

        function zoomChart() {
            chart.zoomToDates(new Date(2012, 2, 2), new Date(2012, 2, 10));
        }
    }
    /*-------------- 5 line chart amchart end ------------*/

    /*-------------- 6 line chart chartjs start ------------*/
    if ($('#seolinechart1').length) {
        var ctx = document.getElementById("seolinechart1").getContext('2d');
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',
            // The data for our dataset
            data: {
                labels: ["January", "February", "March", "April", "May", "June", "July", "January", "February", "March", "April", "May"],
                datasets: [{
                    label: "Likes",
                    backgroundColor: "rgba(104, 124, 247, 0.6)",
                    borderColor: '#8596fe',
                    data: [18, 41, 86, 49, 20, 35, 20, 50, 49, 30, 45, 25],
                }]
            },
            // Configuration options go here
            options: {
                legend: {
                    display: false
                },
                animation: {
                    easing: "easeInOutBack"
                },
                scales: {
                    yAxes: [{
                        display: !1,
                        ticks: {
                            fontColor: "rgba(0,0,0,0.5)",
                            fontStyle: "bold",
                            beginAtZero: !0,
                            maxTicksLimit: 5,
                            padding: 0
                        },
                        gridLines: {
                            drawTicks: !1,
                            display: !1
                        }
                    }],
                    xAxes: [{
                        display: !1,
                        gridLines: {
                            zeroLineColor: "transparent"
                        },
                        ticks: {
                            padding: 0,
                            fontColor: "rgba(0,0,0,0.5)",
                            fontStyle: "bold"
                        }
                    }]
                },
                elements: {
                    line: {
                        tension: 0, // disables bezier curves
                    }
                }
            }
        });
    }
    /*-------------- 6 line chart chartjs end ------------*/

    /*-------------- 7 line chart chartjs start ------------*/
    if ($('#seolinechart2').length) {
        var ctx = document.getElementById("seolinechart2").getContext('2d');
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',
            // The data for our dataset
            data: {
                labels: ["January", "February", "March", "April", "May", "June", "July", "January", "February", "March", "April", "May"],
                datasets: [{
                    label: "Share",
                    backgroundColor: "rgba(96, 241, 205, 0.2)",
                    borderColor: '#3de5bb',
                    data: [18, 41, 86, 49, 20, 35, 20, 50, 49, 30, 45, 25],
                }]
            },
            // Configuration options go here
            options: {
                legend: {
                    display: false
                },
                animation: {
                    easing: "easeInOutBack"
                },
                scales: {
                    yAxes: [{
                        display: !1,
                        ticks: {
                            fontColor: "rgba(0,0,0,0.5)",
                            fontStyle: "bold",
                            beginAtZero: !0,
                            maxTicksLimit: 5,
                            padding: 0
                        },
                        gridLines: {
                            drawTicks: !1,
                            display: !1
                        }
                    }],
                    xAxes: [{
                        display: !1,
                        gridLines: {
                            zeroLineColor: "transparent"
                        },
                        ticks: {
                            padding: 0,
                            fontColor: "rgba(0,0,0,0.5)",
                            fontStyle: "bold"
                        }
                    }]
                },
                elements: {
                    line: {
                        tension: 0, // disables bezier curves
                    }
                }
            }
        });
    }
    /*-------------- 7 line chart chartjs end ------------*/

    /*-------------- 8 line chart chartjs start ------------*/
    if ($('#seolinechart3').length) {
        var ctx = document.getElementById("seolinechart3").getContext('2d');
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',
            // The data for our dataset
            data: {
                labels: ["January", "February", "March", "April", "May", "June", "July", "January", "February", "March", "April", "May"],
                datasets: [{
                    label: "Share",
                    backgroundColor: "rgba(96, 241, 205, 0)",
                    borderColor: '#fff',
                    data: [18, 41, 86, 49, 20, 35, 20, 50, 49, 30, 45, 25],
                }]
            },
            // Configuration options go here
            options: {
                legend: {
                    display: false
                },
                animation: {
                    easing: "easeInOutBack"
                },
                scales: {
                    yAxes: [{
                        display: !1,
                        ticks: {
                            fontColor: "rgba(0,0,0,0.5)",
                            fontStyle: "bold",
                            beginAtZero: !0,
                            maxTicksLimit: 5,
                            padding: 0
                        },
                        gridLines: {
                            drawTicks: !1,
                            display: !1
                        }
                    }],
                    xAxes: [{
                        display: !1,
                        gridLines: {
                            zeroLineColor: "transparent"
                        },
                        ticks: {
                            padding: 0,
                            fontColor: "rgba(0,0,0,0.5)",
                            fontStyle: "bold"
                        }
                    }]
                },
                elements: {
                    line: {
                        tension: 0, // disables bezier curves
                    }
                }
            }
        });
    }
    /*-------------- 8 line chart chartjs end ------------*/

    /*-------------- 9 line chart chartjs start ------------*/
    if ($('#seolinechart4').length) {
        var ctx = document.getElementById("seolinechart4").getContext('2d');
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',
            // The data for our dataset
            data: {
                labels: ["January", "February", "March", "April", "May", "June", "July", "January", "February", "March", "April", "May"],
                datasets: [{
                    label: "New user",
                    backgroundColor: "rgba(96, 241, 205, 0)",
                    borderColor: '#fff',
                    data: [18, 41, 86, 49, 20, 35, 20, 50, 49, 30, 45, 25],
                }]
            },
            // Configuration options go here
            options: {
                legend: {
                    display: false
                },
                animation: {
                    easing: "easeInOutBack"
                },
                scales: {
                    yAxes: [{
                        display: !1,
                        ticks: {
                            fontColor: "rgba(0,0,0,0.5)",
                            fontStyle: "bold",
                            beginAtZero: !0,
                            maxTicksLimit: 5,
                            padding: 0
                        },
                        gridLines: {
                            drawTicks: !1,
                            display: !1
                        }
                    }],
                    xAxes: [{
                        display: !1,
                        gridLines: {
                            zeroLineColor: "transparent"
                        },
                        ticks: {
                            padding: 0,
                            fontColor: "rgba(0,0,0,0.5)",
                            fontStyle: "bold"
                        }
                    }]
                },
                elements: {
                    line: {
                        tension: 0, // disables bezier curves
                    }
                }
            }
        });
    }
    /*-------------- 9 line chart chartjs end ------------*/

    /*-------------- 10 line chart amchart start ------------*/
    if ($('#user-statistics').length) {
        var chart = AmCharts.makeChart("user-statistics", {
            "type": "serial",
            "theme": "light",
            "marginRight": 0,
            "marginLeft": 40,
            "autoMarginOffset": 20,
            "dataDateFormat": "YYYY-MM-DD",
            "valueAxes": [{
                "id": "v1",
                "axisAlpha": 0,
                "position": "left",
                "ignoreAxisWidth": true
            }],
            "balloon": {
                "borderThickness": 1,
                "shadowAlpha": 0
            },
            "graphs": [{
                "id": "g1",
                "balloon": {
                    "drop": true,
                    "adjustBorderColor": false,
                    "color": "#ffffff",
                    "type": "smoothedLine"
                },
                "fillAlphas": 0.2,
                "bullet": "round",
                "bulletBorderAlpha": 1,
                "bulletColor": "#FFFFFF",
                "bulletSize": 5,
                "hideBulletsCount": 50,
                "lineThickness": 2,
                "title": "red line",
                "useLineColorForBulletBorder": true,
                "valueField": "value",
                "balloonText": "<span style='font-size:18px;'>[[value]]</span>"
            }],
            "chartCursor": {
                "valueLineEnabled": true,
                "valueLineBalloonEnabled": true,
                "cursorAlpha": 0,
                "zoomable": false,
                "valueZoomable": true,
                "valueLineAlpha": 0.5
            },
            "valueScrollbar": {
                "autoGridCount": true,
                "color": "#5E72F3",
                "scrollbarHeight": 30
            },
            "categoryField": "date",
            "categoryAxis": {
                "parseDates": true,
                "dashLength": 1,
                "minorGridEnabled": true
            },
            "export": {
                "enabled": false
            },
            "dataProvider": [{
                "date": "2012-07-27",
                "value": 13
            }, {
                "date": "2012-07-28",
                "value": 11
            }, {
                "date": "2012-07-29",
                "value": 15
            }, {
                "date": "2012-07-30",
                "value": 16
            }, {
                "date": "2012-07-31",
                "value": 18
            }, {
                "date": "2012-08-01",
                "value": 13
            }, {
                "date": "2012-08-02",
                "value": 22
            }, {
                "date": "2012-08-03",
                "value": 23
            }, {
                "date": "2012-08-04",
                "value": 20
            }, {
                "date": "2012-08-05",
                "value": 17
            }, {
                "date": "2012-08-06",
                "value": 16
            }, {
                "date": "2012-08-07",
                "value": 18
            }, {
                "date": "2012-08-08",
                "value": 21
            }, {
                "date": "2012-08-09",
                "value": 26
            }, {
                "date": "2012-08-10",
                "value": 24
            }, {
                "date": "2012-08-11",
                "value": 29
            }, {
                "date": "2012-08-12",
                "value": 32
            }, {
                "date": "2012-08-13",
                "value": 18
            }, {
                "date": "2012-08-14",
                "value": 24
            }, {
                "date": "2012-08-15",
                "value": 22
            }, {
                "date": "2012-08-16",
                "value": 18
            }, {
                "date": "2012-08-17",
                "value": 19
            }, {
                "date": "2012-08-18",
                "value": 14
            }, {
                "date": "2012-08-19",
                "value": 15
            }, {
                "date": "2012-08-20",
                "value": 12
            }, {
                "date": "2012-08-21",
                "value": 8
            }, {
                "date": "2012-08-22",
                "value": 9
            }, {
                "date": "2012-08-23",
                "value": 8
            }, {
                "date": "2012-08-24",
                "value": 7
            }, {
                "date": "2012-08-25",
                "value": 5
            }, {
                "date": "2012-08-26",
                "value": 11
            }, {
                "date": "2012-08-27",
                "value": 13
            }, {
                "date": "2012-08-28",
                "value": 18
            }, {
                "date": "2012-08-29",
                "value": 20
            }, {
                "date": "2012-08-30",
                "value": 29
            }, {
                "date": "2012-08-31",
                "value": 33
            }, {
                "date": "2012-09-01",
                "value": 42
            }, {
                "date": "2012-09-02",
                "value": 35
            }, {
                "date": "2012-09-03",
                "value": 31
            }, {
                "date": "2012-09-04",
                "value": 47
            }, {
                "date": "2012-09-05",
                "value": 52
            }, {
                "date": "2012-09-06",
                "value": 46
            }, {
                "date": "2012-09-07",
                "value": 41
            }, {
                "date": "2012-09-08",
                "value": 43
            }, {
                "date": "2012-09-09",
                "value": 40
            }, {
                "date": "2012-09-10",
                "value": 39
            }, {
                "date": "2012-09-11",
                "value": 34
            }, {
                "date": "2012-09-12",
                "value": 29
            }, {
                "date": "2012-09-13",
                "value": 34
            }, {
                "date": "2012-09-14",
                "value": 37
            }, {
                "date": "2012-09-15",
                "value": 42
            }, {
                "date": "2012-09-16",
                "value": 49
            }, {
                "date": "2012-09-17",
                "value": 46
            }, {
                "date": "2012-09-18",
                "value": 47
            }, {
                "date": "2012-09-19",
                "value": 55
            }, {
                "date": "2012-09-20",
                "value": 59
            }, {
                "date": "2012-09-21",
                "value": 58
            }, {
                "date": "2012-09-22",
                "value": 57
            }, {
                "date": "2012-09-23",
                "value": 61
            }, {
                "date": "2012-09-24",
                "value": 59
            }, {
                "date": "2012-09-25",
                "value": 67
            }, {
                "date": "2012-09-26",
                "value": 65
            }, {
                "date": "2012-09-27",
                "value": 61
            }, {
                "date": "2012-09-28",
                "value": 66
            }, {
                "date": "2012-09-29",
                "value": 69
            }, {
                "date": "2012-09-30",
                "value": 71
            }, {
                "date": "2012-10-01",
                "value": 67
            }, {
                "date": "2012-10-02",
                "value": 63
            }, {
                "date": "2012-10-03",
                "value": 46
            }, {
                "date": "2012-10-04",
                "value": 32
            }, {
                "date": "2012-10-05",
                "value": 21
            }, {
                "date": "2012-10-06",
                "value": 18
            }, {
                "date": "2012-10-07",
                "value": 21
            }, {
                "date": "2012-10-08",
                "value": 28
            }, {
                "date": "2012-10-09",
                "value": 27
            }, {
                "date": "2012-10-10",
                "value": 36
            }, {
                "date": "2012-10-11",
                "value": 33
            }, {
                "date": "2012-10-12",
                "value": 31
            }, {
                "date": "2012-10-13",
                "value": 30
            }, {
                "date": "2012-10-14",
                "value": 34
            }, {
                "date": "2012-10-15",
                "value": 38
            }, {
                "date": "2012-10-16",
                "value": 37
            }, {
                "date": "2012-10-17",
                "value": 44
            }, {
                "date": "2012-10-18",
                "value": 49
            }, {
                "date": "2012-10-19",
                "value": 53
            }, {
                "date": "2012-10-20",
                "value": 57
            }, {
                "date": "2012-10-21",
                "value": 60
            }, {
                "date": "2012-10-22",
                "value": 61
            }, {
                "date": "2012-10-23",
                "value": 69
            }, {
                "date": "2012-10-24",
                "value": 67
            }, {
                "date": "2012-10-25",
                "value": 72
            }, {
                "date": "2012-10-26",
                "value": 77
            }, {
                "date": "2012-10-27",
                "value": 75
            }, {
                "date": "2012-10-28",
                "value": 70
            }, {
                "date": "2012-10-29",
                "value": 72
            }, {
                "date": "2012-10-30",
                "value": 70
            }, {
                "date": "2012-10-31",
                "value": 72
            }, {
                "date": "2012-11-01",
                "value": 73
            }, {
                "date": "2012-11-02",
                "value": 67
            }, {
                "date": "2012-11-03",
                "value": 68
            }, {
                "date": "2012-11-04",
                "value": 65
            }, {
                "date": "2012-11-05",
                "value": 71
            }, {
                "date": "2012-11-06",
                "value": 75
            }, {
                "date": "2012-11-07",
                "value": 74
            }, {
                "date": "2012-11-08",
                "value": 71
            }, {
                "date": "2012-11-09",
                "value": 76
            }, {
                "date": "2012-11-10",
                "value": 77
            }, {
                "date": "2012-11-11",
                "value": 81
            }, {
                "date": "2012-11-12",
                "value": 83
            }, {
                "date": "2012-11-13",
                "value": 80
            }, {
                "date": "2012-11-14",
                "value": 81
            }, {
                "date": "2012-11-15",
                "value": 87
            }, {
                "date": "2012-11-16",
                "value": 82
            }, {
                "date": "2012-11-17",
                "value": 86
            }, {
                "date": "2012-11-18",
                "value": 80
            }, {
                "date": "2012-11-19",
                "value": 87
            }, {
                "date": "2012-11-20",
                "value": 83
            }, {
                "date": "2012-11-21",
                "value": 85
            }, {
                "date": "2012-11-22",
                "value": 84
            }, {
                "date": "2012-11-23",
                "value": 82
            }, {
                "date": "2012-11-24",
                "value": 73
            }, {
                "date": "2012-11-25",
                "value": 71
            }, {
                "date": "2012-11-26",
                "value": 75
            }, {
                "date": "2012-11-27",
                "value": 79
            }, {
                "date": "2012-11-28",
                "value": 70
            }, {
                "date": "2012-11-29",
                "value": 73
            }, {
                "date": "2012-11-30",
                "value": 61
            }, {
                "date": "2012-12-01",
                "value": 62
            }, {
                "date": "2012-12-02",
                "value": 66
            }, {
                "date": "2012-12-03",
                "value": 65
            }, {
                "date": "2012-12-04",
                "value": 73
            }, {
                "date": "2012-12-05",
                "value": 79
            }, {
                "date": "2012-12-06",
                "value": 78
            }, {
                "date": "2012-12-07",
                "value": 78
            }, {
                "date": "2012-12-08",
                "value": 78
            }, {
                "date": "2012-12-09",
                "value": 74
            }, {
                "date": "2012-12-10",
                "value": 73
            }, {
                "date": "2012-12-11",
                "value": 75
            }, {
                "date": "2012-12-12",
                "value": 70
            }, {
                "date": "2012-12-13",
                "value": 77
            }, {
                "date": "2012-12-14",
                "value": 67
            }, {
                "date": "2012-12-15",
                "value": 62
            }, {
                "date": "2012-12-16",
                "value": 64
            }, {
                "date": "2012-12-17",
                "value": 61
            }, {
                "date": "2012-12-18",
                "value": 59
            }, {
                "date": "2012-12-19",
                "value": 53
            }, {
                "date": "2012-12-20",
                "value": 54
            }, {
                "date": "2012-12-21",
                "value": 56
            }, {
                "date": "2012-12-22",
                "value": 59
            }, {
                "date": "2012-12-23",
                "value": 58
            }, {
                "date": "2012-12-24",
                "value": 55
            }, {
                "date": "2012-12-25",
                "value": 52
            }, {
                "date": "2012-12-26",
                "value": 54
            }, {
                "date": "2012-12-27",
                "value": 50
            }, {
                "date": "2012-12-28",
                "value": 50
            }, {
                "date": "2012-12-29",
                "value": 51
            }, {
                "date": "2012-12-30",
                "value": 52
            }, {
                "date": "2012-12-31",
                "value": 58
            }, {
                "date": "2013-01-01",
                "value": 60
            }, {
                "date": "2013-01-02",
                "value": 67
            }, {
                "date": "2013-01-03",
                "value": 64
            }, {
                "date": "2013-01-04",
                "value": 66
            }, {
                "date": "2013-01-05",
                "value": 60
            }, {
                "date": "2013-01-06",
                "value": 63
            }, {
                "date": "2013-01-07",
                "value": 61
            }, {
                "date": "2013-01-08",
                "value": 60
            }, {
                "date": "2013-01-09",
                "value": 65
            }, {
                "date": "2013-01-10",
                "value": 75
            }, {
                "date": "2013-01-11",
                "value": 77
            }, {
                "date": "2013-01-12",
                "value": 78
            }, {
                "date": "2013-01-13",
                "value": 70
            }, {
                "date": "2013-01-14",
                "value": 70
            }, {
                "date": "2013-01-15",
                "value": 73
            }, {
                "date": "2013-01-16",
                "value": 71
            }, {
                "date": "2013-01-17",
                "value": 74
            }, {
                "date": "2013-01-18",
                "value": 78
            }, {
                "date": "2013-01-19",
                "value": 85
            }, {
                "date": "2013-01-20",
                "value": 82
            }, {
                "date": "2013-01-21",
                "value": 83
            }, {
                "date": "2013-01-22",
                "value": 88
            }, {
                "date": "2013-01-23",
                "value": 85
            }, {
                "date": "2013-01-24",
                "value": 85
            }, {
                "date": "2013-01-25",
                "value": 80
            }, {
                "date": "2013-01-26",
                "value": 87
            }, {
                "date": "2013-01-27",
                "value": 84
            }, {
                "date": "2013-01-28",
                "value": 83
            }, {
                "date": "2013-01-29",
                "value": 84
            }, {
                "date": "2013-01-30",
                "value": 81
            }]
        });
    }

    /*-------------- 10 line chart amchart end ------------*/

    /*-------------- 11 line chart amchart start ------------*/
    if ($('#salesanalytic').length) {

        var chart = AmCharts.makeChart("salesanalytic", {
            "type": "serial",
            "theme": "light",
            "dataDateFormat": "YYYY-MM-DD",
            "precision": 2,
            "valueAxes": [{
                "id": "v1",
                "title": "Sales",
                "position": "left",
                "autoGridCount": false,
                "labelFunction": function (value) {
                    return "$" + Math.round(value) + "M";
                }
            }, {
                "id": "v2",
                "title": "Duration",
                "gridAlpha": 0,
                "position": "right",
                "autoGridCount": false
            }],
            "graphs": [{
                "id": "g3",
                "valueAxis": "v1",
                "lineColor": "#F3F8FB",
                "fillColors": "#F3F8FB",
                "fillAlphas": 1,
                "type": "column",
                "title": "Actual Sales",
                "valueField": "sales2",
                "clustered": false,
                "columnWidth": 0.5,
                "legendValueText": "$[[value]]M",
                "balloonText": "[[title]]<br /><small style='font-size: 130%'>$[[value]]M</small>"
            }, {
                "id": "g4",
                "valueAxis": "v1",
                "lineColor": "#5C6DF4",
                "fillColors": "#5C6DF4",
                "fillAlphas": 1,
                "type": "column",
                "title": "Target Sales",
                "valueField": "sales1",
                "clustered": false,
                "columnWidth": 0.3,
                "legendValueText": "$[[value]]M",
                "balloonText": "[[title]]<br /><small style='font-size: 130%'>$[[value]]M</small>"
            }, {
                "id": "g1",
                "valueAxis": "v2",
                "bullet": "round",
                "bulletBorderAlpha": 1,
                "bulletColor": "#FFFFFF",
                "bulletSize": 5,
                "hideBulletsCount": 50,
                "lineThickness": 2,
                "lineColor": "#815FF6",
                "type": "smoothedLine",
                "title": "Duration",
                "useLineColorForBulletBorder": true,
                "valueField": "market1",
                "balloonText": "[[title]]<br /><small style='font-size: 130%'>[[value]]</small>"
            }, {
                "id": "g2",
                "valueAxis": "v2",
                "bullet": "round",
                "bulletBorderAlpha": 1,
                "bulletColor": "#FFFFFF",
                "bulletSize": 5,
                "hideBulletsCount": 50,
                "lineThickness": 2,
                "lineColor": "#ffe598",
                "type": "smoothedLine",
                "dashLength": 5,
                "title": "Market Days ALL",
                "useLineColorForBulletBorder": true,
                "valueField": "market2",
                "balloonText": "[[title]]<br /><small style='font-size: 130%'>[[value]]</small>"
            }],
            "chartScrollbar": {
                "graph": "g1",
                "oppositeAxis": false,
                "offset": 50,
                "scrollbarHeight": 45,
                "backgroundAlpha": 0,
                "selectedBackgroundAlpha": 0.5,
                "selectedBackgroundColor": "#f9f9f9",
                "graphFillAlpha": 0.1,
                "graphLineAlpha": 0.4,
                "selectedGraphFillAlpha": 0,
                "selectedGraphLineAlpha": 1,
                "autoGridCount": true,
                "color": "#95a1f9"
            },
            "chartCursor": {
                "pan": true,
                "valueLineEnabled": true,
                "valueLineBalloonEnabled": true,
                "cursorAlpha": 0,
                "valueLineAlpha": 0.2
            },
            "categoryField": "date",
            "categoryAxis": {
                "parseDates": true,
                "dashLength": 1,
                "minorGridEnabled": true,
                "color": "#5C6DF4"
            },
            "legend": {
                "useGraphSettings": true,
                "position": "top"
            },
            "balloon": {
                "borderThickness": 1,
                "shadowAlpha": 0
            },
            "export": {
                "enabled": false
            },
            "dataProvider": [{
                "date": "2013-01-16",
                "market1": 51,
                "market2": 55,
                "sales1": 5,
                "sales2": 8
            }, {
                "date": "2013-01-17",
                "market1": 64,
                "market2": 70,
                "sales1": 5,
                "sales2": 6
            }, {
                "date": "2013-01-18",
                "market1": 65,
                "market2": 45,
                "sales1": 8,
                "sales2": 12
            }, {
                "date": "2013-01-19",
                "market1": 73,
                "market2": 75,
                "sales1": 7,
                "sales2": 8
            }, {
                "date": "2013-01-20",
                "market1": 65,
                "market2": 70,
                "sales1": 7,
                "sales2": 10
            }, {
                "date": "2013-01-21",
                "market1": 65,
                "market2": 55,
                "sales1": 9,
                "sales2": 12
            }, {
                "date": "2013-01-22",
                "market1": 68,
                "market2": 62,
                "sales1": 5,
                "sales2": 7
            }, {
                "date": "2013-01-23",
                "market1": 75,
                "market2": 80,
                "sales1": 7,
                "sales2": 10
            }, {
                "date": "2013-01-24",
                "market1": 75,
                "market2": 65,
                "sales1": 7,
                "sales2": 9
            }, {
                "date": "2013-01-25",
                "market1": 75,
                "market2": 69,
                "sales1": 8,
                "sales2": 10
            }, {
                "date": "2013-01-26",
                "market1": 55,
                "market2": 68,
                "sales1": 6,
                "sales2": 7
            }, {
                "date": "2013-01-27",
                "market1": 67,
                "market2": 70,
                "sales1": 3,
                "sales2": 4
            }, {
                "date": "2013-01-28",
                "market1": 62,
                "market2": 59,
                "sales1": 5,
                "sales2": 7
            }, {
                "date": "2013-01-29",
                "market1": 62,
                "market2": 56,
                "sales1": 5,
                "sales2": 8
            }, {
                "date": "2013-01-30",
                "market1": 71,
                "market2": 69,
                "sales1": 4,
                "sales2": 7
            }]
        });
    }
    //------------echarts2

    /*-------------- 11 line chart amchart end ------------*/
    /*--------------  coin distrubution chart END ------------*/

    if ($('#coin_distribution').length) {

        zingchart.THEME = "classic";

        var myConfig = {
            "globals": {
                "font-family": "Roboto"
            },
            "graphset": [{
                "type": "pie",
                "background-color": "#fff",
                "legend": {
                    "background-color": "none",
                    "border-width": 0,
                    "shadow": false,
                    "layout": "float",
                    "margin": "auto auto 16% auto",
                    "marker": {
                        "border-radius": 3,
                        "border-width": 0
                    },
                    "item": {
                        "color": "%backgroundcolor"
                    }
                },
                "plotarea": {
                    "background-color": "#FFFFFF",
                    "border-color": "#DFE1E3",
                    "margin": "25% 8%"
                },
                "labels": [{
                    "x": "45%",
                    "y": "47%",
                    "width": "10%",
                    "text": "Value in USD",
                    "font-size": 17,
                    "font-weight": 700
                }],
                "plot": {
                    "size": 70,
                    "slice": 90,
                    "margin-right": 0,
                    "border-width": 0,
                    "shadow": 0,
                    "value-box": {
                        "visible": true
                    },
                    "tooltip": {
                        "text": "%v USD",
                        "shadow": false,
                        "border-radius": 2
                    }
                },
                "series": [{
                    "values": [confluxValueUSD],
                    "text": "Conflux",
                    "background-color": "#4cff63"
                },
                {
                    "values": [cortexValueUSD],
                    "text": "Cortex",
                    "background-color": "#fd9c21"
                },
                {
                    "values": [ethValueUSD],
                    "text": "Ethereum",
                    "background-color": "#2c13f8"
                }
                ]
            }

            ]
        };

        zingchart.render({
            id: 'coin_distribution',
            data: myConfig,
        });
    }
    /*--------------  coin distrubution chart END ------------*/
    /*-------------- 1 Pie chart amchart start ------------*/
    if ($('#ampiechart1').length) {
        var chart = AmCharts.makeChart("ampiechart1", {
            "type": "pie",
            "labelRadius": -35,
            "labelText": "[[percents]]%",
            "dataProvider": [{
                "country": "Lithuania",
                "litres": 501.9,
                "backgroundColor": "#815DF6"
            }, {
                "country": "Czech Republic",
                "litres": 301.9,
                "backgroundColor": "#67B7DC"
            }, {
                "country": "Ireland",
                "litres": 201.1,
                "backgroundColor": "#9c82f4"
            }, {
                "country": "The Netherlands",
                "litres": 150,
                "backgroundColor": "#FDD400"
            }],
            "color": "#fff",
            "colorField": "backgroundColor",
            "valueField": "litres",
            "titleField": "country"
        });
    }

    /*-------------- 1 Pie chart amchart end ------------*/

    /*-------------- 2 Pie chart amchart start ------------*/
    if ($('#ampiechart2').length) {
        var chart = AmCharts.makeChart("ampiechart2", {
            "type": "pie",
            "theme": "light",
            "labelRadius": -65,
            "labelText": "[[title]]%",
            "dataProvider": [{
                "title": "New",
                "value": 4852
            }, {
                "title": "Returning",
                "value": 9899
            }],
            "titleField": "title",
            "valueField": "value",
            "export": {
                "enabled": false
            },
            "color": "#fff"
        });
    }
    /*-------------- 2 Pie chart amchart end ------------*/

    /*-------------- 3 Pie chart amchart start ------------*/
    var chart;
    var legend;
    var selected;

    var types = [{
        type: "Fossil Energy",
        percent: 70,
        color: "#ff9e01",
        subs: [{
            type: "Oil",
            percent: 15
        }, {
            type: "Coal",
            percent: 35
        }, {
            type: "Nuclear",
            percent: 20
        }]
    }, {
        type: "Green Energy",
        percent: 30,
        color: "#6E4FD1",
        subs: [{
            type: "Hydro",
            percent: 15
        }, {
            type: "Wind",
            percent: 10
        }, {
            type: "Other",
            percent: 5
        }]
    }];

    function generateChartData() {
        var chartData = [];
        for (var i = 0; i < types.length; i++) {
            if (i == selected) {
                for (var x = 0; x < types[i].subs.length; x++) {
                    chartData.push({
                        type: types[i].subs[x].type,
                        percent: types[i].subs[x].percent,
                        color: types[i].color,
                        pulled: true
                    });
                }
            } else {
                chartData.push({
                    type: types[i].type,
                    percent: types[i].percent,
                    color: types[i].color,
                    id: i
                });
            }
        }
        return chartData;
    }

    if ($('#ampiechart3').length) {
        AmCharts.makeChart("ampiechart3", {
            "type": "pie",
            "theme": "light",
            "labelRadius": -35,
            "labelText": "[[percents]]%",
            "dataProvider": generateChartData(),
            "balloonText": "[[title]]: [[value]]",
            "titleField": "type",
            "valueField": "percent",
            "outlineColor": "#FFFFFF",
            "outlineAlpha": 0.8,
            "outlineThickness": 2,
            "colorField": "color",
            "color": "#fff",
            "pulledField": "pulled",
            "titles": [{
                "text": "Click a slice to see the details"
            }],
            "listeners": [{
                "event": "clickSlice",
                "method": function (event) {
                    var chart = event.chart;
                    if (event.dataItem.dataContext.id != undefined) {
                        selected = event.dataItem.dataContext.id;
                    } else {
                        selected = undefined;
                    }
                    chart.dataProvider = generateChartData();
                    chart.validateData();
                }
            }],
            "export": {
                "enabled": false
            }
        });
    }

    /*-------------- 3 Pie chart amchart end ------------*/

    /*-------------- 4 Pie chart highcharts start ------------*/
    if ($('#highpiechart4').length) {
        var pieColors = (function () {
            var colors = [],
                base = Highcharts.getOptions().colors[0],
                i;

            for (i = 0; i < 10; i += 1) {
                // Start out with a darkened base color (negative brighten), and end
                // up with a much brighter color
                colors.push(Highcharts.Color(base).brighten((i - 3) / 7).get());
            }
            return colors;
        }());

        // Build the chart
        Highcharts.chart('highpiechart4', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Dollar market Values, 2018'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    colors: pieColors,
                    dataLabels: {
                        style: { "color": "contrast", "fontSize": "11px", "fontWeight": "bold", "textOutline": "" },
                        enabled: true,
                        format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
                        distance: -50,
                        filter: {
                            property: 'percentage',
                            operator: '>',
                            value: 4
                        }
                    }
                }
            },
            series: [{
                name: 'Share',
                data: [
                    { name: 'USD', y: 61.41 },
                    { name: 'BTC', y: 11.84 },
                    { name: 'TCN', y: 10.85 }
                ]
            }]
        });
    }
    /*-------------- 4 Pie chart highcharts end ------------*/

    /*-------------- 5 Pie chart highcharts start ------------*/
    if ($('#highpiechart5').length) {
        Highcharts.chart('highpiechart5', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Dollar market Values, 2018'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || '#444',
                            "textOutline": ""
                        }
                    }
                }
            },
            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: [{
                    name: 'USB',
                    y: 61.41,
                    sliced: true,
                    selected: true
                }, {
                    name: 'BTC',
                    y: 11.84
                }, {
                    name: 'ETC',
                    y: 10.85
                }]
            }]
        });
    }

    /*-------------- 5 Pie chart highcharts end ------------*/

    /*-------------- 6 Pie chart highcharts start ------------*/
    if ($('#highpiechart6').length) {
        Highcharts.chart('highpiechart6', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: 0,
                plotShadow: false
            },
            title: {
                text: '<br>Values<br>',
                align: 'center',
                verticalAlign: 'middle',
                y: 40
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    dataLabels: {
                        enabled: true,
                        distance: -30,
                        style: {
                            fontWeight: 'bold',
                            color: 'white',
                            textOutline: 0
                        }
                    },
                    startAngle: -90,
                    endAngle: 90,
                    center: ['50%', '65%']
                }
            },
            series: [{
                type: 'pie',
                name: 'Browser share',
                innerSize: '55%',
                data: [
                    ['USD', 58.9],
                    ['BTC', 13.29],
                    ['TCN', 13],
                    {
                        name: 'Other',
                        y: 7.61,
                        dataLabels: {
                            enabled: false
                        }
                    }
                ]
            }]
        });
    }
    /*-------------- 6 Pie chart highcharts end ------------*/

    /*-------------- 7 Pie chart chartjs start ------------*/
    if ($('#seolinechart8').length) {
        var ctx = document.getElementById("seolinechart8").getContext('2d');
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'doughnut',
            // The data for our dataset
            data: {
                labels: ["FB", "TW", "G+", "INS"],
                datasets: [{
                    backgroundColor: [
                        "#8919FE",
                        "#12C498",
                        "#F8CB3F",
                        "#E36D68"
                    ],
                    borderColor: '#fff',
                    data: [810, 410, 260, 150],
                }]
            },
            // Configuration options go here
            options: {
                legend: {
                    display: true
                },
                animation: {
                    easing: "easeInOutBack"
                }
            }
        });
    }
    /*-------------- 7 Pie chart chartjs end ------------*/
}, 5000);