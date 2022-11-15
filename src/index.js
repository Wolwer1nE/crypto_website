import {CoinCap} from "./api/coinCap";

document.addEventListener("DOMContentLoaded", setupPage);
const coinCap = new CoinCap();

function setupPage() {
    coinCap.getCryptoList().then(cryptoCurr => {
        const containerData = document.getElementById("cryptoCurrContainer");
        renderCryptoData(cryptoCurr.data, containerData);
    });
}

// Add list
function renderCryptoData(cryptoCurrData, container) {
    const list = document.createElement("ul");
    const items = [];
    cryptoCurrData.forEach(cryptoData => {
        const listItem = document.createElement("li");
        const innerListItem = document.createElement("a");
        innerListItem.setAttribute("class", "link");
        //innerListItem.setAttribute("href", `${cryptoData.explorer}`);
        innerListItem.setAttribute("target", "_blank");
        innerListItem.innerHTML = `${cryptoData.name} (${cryptoData.symbol})`;
        innerListItem.onclick = function () {
            renderCryptoInfo(cryptoData.id);
            renderCryptoHistory(cryptoData.id, "d1", cryptoData.name)
        }
        listItem.replaceChildren(innerListItem);
        items.push(listItem);
    })
    list.append(...items);
    container.replaceChildren(list);
}

// Add info
function renderCryptoInfo(id) {
    coinCap.getCryptoInfo(id).then(cryptoCurrElInfo => {
        renderInfo(cryptoCurrElInfo.data);
    })
}

function renderInfo(cryptoCurrElInfo) {
    const nameText = document.getElementById("name");
    const idText = document.getElementById("id");
    const symbolText = document.getElementById("symbol");
    const marketCapText = document.getElementById("marketCap");
    const supplyText = document.getElementById("supply");
    const priceText = document.getElementById("price");
    const dayChangeText = document.getElementById("dayChange");

    nameText.innerHTML = `Name: ${cryptoCurrElInfo.name} (${cryptoCurrElInfo.symbol})`;
    idText.innerHTML = `Id: ${cryptoCurrElInfo.id}`;
    symbolText.innerHTML = `Symbol: ${cryptoCurrElInfo.symbol}`;
    marketCapText.innerHTML = `Market cap: ${parseFloat(cryptoCurrElInfo.marketCapUsd).toFixed(3)}`;
    supplyText.innerHTML = `Supply: ${parseFloat(cryptoCurrElInfo.supply).toFixed(3)}`;
    priceText.innerHTML = `Price: ${parseFloat(cryptoCurrElInfo.priceUsd).toFixed(3)}`;
    if (cryptoCurrElInfo.changePercent24Hr[0] === "-") {
        dayChangeText.style.backgroundColor = "red";
        dayChangeText.innerHTML = `Day change: ${parseFloat(cryptoCurrElInfo.changePercent24Hr).toFixed(3)}%`;
    } else {
        dayChangeText.style.backgroundColor = "green";
        dayChangeText.innerHTML = `Day change: ${parseFloat(cryptoCurrElInfo.changePercent24Hr).toFixed(3)}%`;
    }
    createIntervalButtons(cryptoCurrElInfo.id, cryptoCurrElInfo.name);
}

// Add history
function renderCryptoHistory(id, interval, cryptoName) {
    coinCap.getCryptoHistory(id, interval).then(cryptoCurrElHistory => {
        renderHistory(cryptoCurrElHistory.data, cryptoName);
        console.log(cryptoCurrElHistory.data)
    })
}

function renderHistory(cryptoCurrElHistory, cryptoName) {
    const allHistoryData = [];
    let i = 0;

    cryptoCurrElHistory.forEach(historyData => {
        const dayHistoryData = [i, parseFloat(historyData.priceUsd)];
        allHistoryData.push(dayHistoryData);
        i++;
    })

    createGraphic(allHistoryData, cryptoName)
}

function createGraphic(allHistoryData, cryptoName) {
    Highcharts.chart("graphicContainer", {
        chart: {
            type: 'area',
            zoomType: 'x',
            panning: true,
            panKey: 'shift',
            scrollablePlotArea: {
                minWidth: 600
            }
        },

        title: {
            text: cryptoName
        },

        credits: {
            enabled: false
        },

        xAxis: {
            labels: {
                format: null
            },
            minRange: 5,
            title: {
                text: "Days"
            }
        },

        yAxis: {
            startOnTick: true,
            endOnTick: false,
            maxPadding: 0.35,
            title: {
                text: "Dollars"
            },
            labels: {
                format: "{value}"
            }
        },

        tooltip: {
            headerFormat: "{point.y:.3f} usd<br>",
            pointFormat: "{point.x} day",
            shared: true
        },

        legend: {
            enabled: false
        },

        series: [{
            data: allHistoryData,
            lineColor: Highcharts.getOptions().colors[1],
            color: Highcharts.getOptions().colors[2],
            fillOpacity: 0.5,
            name: 'Elevation',
            marker: {
                enabled: false
            },
            threshold: null
        }]

    });
}

function createIntervalButtons(id, name) {
    const intervalD1Button = document.getElementById("intervalD1Button");
    intervalD1Button.style.visibility = "visible"
    intervalD1Button.onclick = function () {
        renderCryptoHistory(id, "d1", name)
    }

    const intervalH12Button = document.getElementById("intervalH12Button");
    intervalH12Button.style.visibility = "visible"
    intervalH12Button.onclick = function () {
        renderCryptoHistory(id, "h12", name)
    }

    const intervalH6Button = document.getElementById("intervalH6Button");
    intervalH6Button.style.visibility = "visible"
    intervalH6Button.onclick = function () {
        renderCryptoHistory(id, "h6", name)
    }

    const intervalH2Button = document.getElementById("intervalH2Button");
    intervalH2Button.style.visibility = "visible"
    intervalH2Button.onclick = function () {
        renderCryptoHistory(id, "h2", name)
    }

    const intervalH1Button = document.getElementById("intervalH1Button");
    intervalH1Button.style.visibility = "visible"
    intervalH1Button.onclick = function () {
        renderCryptoHistory(id, "h1", name)
    }

    const intervalM30Button = document.getElementById("intervalM30Button");
    intervalM30Button.style.visibility = "visible"
    intervalM30Button.onclick = function () {
        renderCryptoHistory(id, "m30", name)
    }
}