import {CoinCap} from "./api/coinCap";

document.addEventListener("DOMContentLoaded", setupPage);
const coinCap = new CoinCap();

function setupPage() {
    coinCap.getCryptoList().then(cryptoCurr => {
        const containerData = document.getElementById("cryptoCurrContainer");
        renderCryptoData(cryptoCurr.data, containerData);
    });
}

function renderCryptoData(cryptoCurrData, container) {
    const list = document.createElement("ul");
    const items = [];
    cryptoCurrData.forEach(cryptoData => {
        const listItem = document.createElement("li");
        const innerListItem = document.createElement("a");
        innerListItem.setAttribute("class", "link");
        innerListItem.setAttribute("href", `${cryptoData.explorer}`);
        innerListItem.setAttribute("target", "_blank");
        innerListItem.innerHTML = `${cryptoData.name} (${cryptoData.symbol})`;
        innerListItem.onclick = function () {
            renderCryptoInfo(cryptoData.id);
            renderCryptoHistory(cryptoData.id, "d1")
        }
        listItem.replaceChildren(innerListItem);
        items.push(listItem);
    })
    list.append(...items);
    container.replaceChildren(list);
}

function renderCryptoInfo(id) {
    coinCap.getCryptoInfo(id).then(cryptoCurrElInfo => {
        renderInfo(cryptoCurrElInfo.data);
    })
}

function renderCryptoHistory(id, interval) {
    coinCap.getCryptoHistory(id, interval).then(cryptoCurrElHistory => {
        renderHistory(cryptoCurrElHistory.data);
        console.log(cryptoCurrElHistory.data)
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

    nameText.innerHTML = `Crypto name: ${cryptoCurrElInfo.name} (${cryptoCurrElInfo.symbol})`;
    idText.innerHTML = `Id: ${cryptoCurrElInfo.id}`;
    symbolText.innerHTML = `Symbol: ${cryptoCurrElInfo.symbol}`;
    marketCapText.innerHTML = `Market cap: ${cryptoCurrElInfo.marketCapUsd}`;
    supplyText.innerHTML = `Supply: ${cryptoCurrElInfo.supply}`;
    priceText.innerHTML = `Price: ${cryptoCurrElInfo.priceUsd}`;
    dayChangeText.innerHTML = `Day change: ${cryptoCurrElInfo.changePercent24Hr}`;
}

function renderHistory(cryptoCurrElHistory) {
    const container = document.getElementById("graphicContainer");
    const list = document.createElement("ul");
    const items = [];
    cryptoCurrElHistory.forEach(cryptoData => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `${cryptoData.priceUsd}`;
        items.push(listItem);
    })
    list.append(...items);
    container.replaceChildren(list);
}