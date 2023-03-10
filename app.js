import express from "express"
import axios from "axios"

// Crawl server
import animeHay from "./crawls/animeHay.js"
const app = express()

app.get("/get", async function (req, res) {
    const { url } = req.query
    getData(url).then(data => {
        res.json(data)
    })
})

async function getData(url) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            responseType: "text"
        }).then(res => {
            switch (res.request.host) {
                case "animehay.pro": 
                    resolve({
                        server: res.request.host,
                        data: animeHay(res.data)
                    })
                break

                default:
                    resolve({
                        server: 'Not found',
                        data: {}
                    })
            }
        }).catch(_ => reject({
            server: "Error",
            data: {}
        }))
    }) 
}



app.listen(9999, function () {
    console.log('Open site with port = 9999')
})
// console.log(data)