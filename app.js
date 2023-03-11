import express from "express"
import axios from "axios"

// Crawl server
import animeHay from "./crawls/animeHay.js"
import animeVietSub from "./crawls/animeVietSub.js"
import vuiGhe from "./crawls/vuiGhe.js"
import hhPanda from "./crawls/hhPanda.js"

const app = express()

const getGoogleCacheWebsite = "https://webcache.googleusercontent.com/search?q=cache:"
const regex = /^((https:\/\/webcache\.googleusercontent\.com\/search\?q=cache)?(:)?http(s)?(:)?(\/\/)([a-zA-Z0-9]\.?[a-zA-Z0-9]+\.?[a-z]+))/

app.get("/get", async function (req, res) {
    const { url } = req.query
    getData(url).then(data => {
        res.json(data)
    }).catch(e => res.status(404).json(e))
})

async function getData(url) {
    return new Promise((resolve, reject) => {
        fetchData(url, function (res) {
            var domain = regex.exec(res.request.res.responseUrl)[7]
            var isEncoded = regex.exec(res.request.res.responseUrl)[2] !== undefined ? true : false

            const decoder = new TextDecoder('ISO-8859-1')
            let html = isEncoded ? decoder.decode(res.data) : res.data

            switch (domain) {
                case "animehay.pro":
                    resolve({
                        server: domain,
                        data: animeHay(html)
                    })
                    break

                case "animevietsub.pro":
                    resolve({
                        server: domain,
                        data: animeVietSub(html)
                    })
                    break

                case "vuighe.net":
                    resolve({
                        server: domain,
                        data: vuiGhe(html)
                    })
                    break
                case "hhpanda.tv":
                    resolve({
                        server: domain,
                        data: hhPanda(html)
                    })
                    break

                default:
                    reject({
                        server: 'Not found',
                        data: {}
                    })
            }
        })
    })
}

function fetchData(url, callback) {
    axios.get(url, {
        responseType: "arraybuffer",
        responseEncoding: "binary"
    }).then(res => {
        callback(res)
    }).catch(e => fetchData(getGoogleCacheWebsite + url))
}

app.listen(9999, function () {
    console.log('Open site with port = 9999')
})