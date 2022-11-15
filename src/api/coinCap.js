class CoinCap {

    constructor(baseUrl = "https:/api.coincap.io/v2/assets") {
        this.baseUrl = baseUrl;
    }

    getCryptoList() {
        return fetch(`${this.baseUrl}`)
            .then(response => response.json());
    }

    getCryptoInfo(id) {
        return fetch(`${this.baseUrl}/${id}`)
            .then(response => response.json());
    }

    getCryptoHistory(id, interval="d1") {
        return fetch(`${this.baseUrl}/${id}/history?interval=${interval}`)
            .then(response => response.json());
    }

}

export {CoinCap}