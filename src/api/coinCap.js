class CoinCap {
//     http:/api.coincap.io/v2/assets
//     https://api.spacexdata.com/v5/launches
    constructor(baseUrl = "https:/api.coincap.io/v2/assets") {
        this.baseUrl = baseUrl
    }

    getCryptoList() {
        return fetch(`${this.baseUrl}`)
            .then(response => response.json())
    }

}

export {CoinCap}