import {CoinCap} from "./api/coinCap";

document.addEventListener("DOMContentLoaded", setupPage);

function setupPage() {
    const coinCap = new CoinCap();

    coinCap.getCryptoList().then(cryptoCurr => {
        const container = document.getElementById("cryptoCurrContainer");
        renderCryptoData(cryptoCurr.data, container);
    });
}

function renderCryptoData(cryptoCurrData, container) {
    const list = document.createElement("ul");
    const items = [];
    cryptoCurrData.forEach(cryptoData => {
        const listItem = document.createElement("li");

        listItem.innerHTML = `${cryptoData.name} (${cryptoData.symbol})`;
        items.push(listItem);
    })
    list.append(...items);
    container.replaceChildren(list);
}
