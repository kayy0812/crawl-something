import express from "express"
import axios from "axios"
// import cloudflare from "cloudflare-scraper"
import * as cheerio from "cheerio"

const app = express()

const FIXED_SPACING = /^\s+|\s+$/g

// Validate regex
const validAnimeHay = /^http(s)?(:)?(\/\/)((www\.)?animehay\.([a-z]+))/g

app.get("/get", function (req, res) {
    const { url } = req.query
    getData(url).then(response => {
            res.json(response)
        })
})

async function getData(url) {
    const resData = await axios.get(url, {
        responseType: "text"
    })

    console.log(resData)
    if (validAnimeHay.test(url)) {
        return  {
            server: resData.request.host,
            data: crawlInfoFromAnimeHay(resData.data)
        }
    } else {
        return {
            server: 'Not found',
            data: {}
        }
    }
}

function crawlInfoFromAnimeHay(body) {
    const $ = cheerio.load(body)

    // Fetch score elment
    var score = $(".score div:last-child").text()
    var star = score.split('||')[0].replace(FIXED_SPACING, '')
    var rating = score.split('||')[1].replace(FIXED_SPACING, '').split(' ')[0]

    // Fetch category elm to array
    var listCate = []
    $(".list_cate div:last-child a").each((i, v) => {
        listCate[i] = $(v).text().replace(FIXED_SPACING, '')
    })

    // Status elem
    var status = $(".status div:last-child").text().replace(FIXED_SPACING, '')

    // Film total episodes 
    var episodes = $(".duration div:last-child").text().replace(FIXED_SPACING, '')
    var episodes = episodes.split(' ')[0]

    // Fetch image of film
    var image = $(".head .first img").attr("src")
    return {
        title: $("h1.heading_movie").text().replace(FIXED_SPACING, ''),
        other_title: $(".name_other div:last-child").text().replace(FIXED_SPACING, ''),
        release: $(".update_time div:last-child").text().replace(FIXED_SPACING, ''),
        star: star,
        rating: rating,
        category: listCate,
        status: status,
        episodes: episodes,
        description: $(".desc p").text().replace(FIXED_SPACING, ''),
        image: image
    }
}

app.listen(9999, function () {
    console.log('Open site with port = 9999')
})
// console.log(data)