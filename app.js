import express from "express"
import axios from "axios"

// Crawl server
import animeHay from "./crawls/animeHay.js"
import animeVietSub from "./crawls/animeVietSub.js"
const app = express()

const getGoogleCacheWebsite = "https://webcache.googleusercontent.com/search?q=cache:"

app.get("/get", async function (req, res) {
    const { url } = req.query
    getData(url).then(data => {
        res.json(data)
    }).catch(e => res.status(404).json(e))
})

async function getData(url) {
    return new Promise((resolve, reject) => {
        axios.get(getGoogleCacheWebsite + url, {
            responseType: "arraybuffer",
            responseEncoding: "binary"
        }).then(res => {
            const regex = /^((https:\/\/webcache\.googleusercontent\.com\/search\?q=cache)?(:)?http(s)?(:)?(\/\/)([a-zA-Z0-9]\.?[a-zA-Z0-9]+\.?[a-z]+))/
            var domain = regex.exec(res.request.res.responseUrl)[7]

            const decoder = new TextDecoder('ISO-8859-1');
            let html = decoder.decode(res.data)
            console.log(res)
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

                default:
                    resolve({
                        server: 'Not found',
                        data: {}
                    })
            }
        }).catch(_ => {
            reject({
                server: "Error",
                data: {}
            })
        })
    })
}



app.listen(9999, function () {
    console.log('Open site with port = 9999')
})
// console.log(data)