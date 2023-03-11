import * as cheerio from "cheerio"

const FIXED_SPACING = /^\s+|\s+$/g
export default function (body) {
    const $ = cheerio.load(body)

    // Title
    var title = $("h1.film-info-title").text()

    return {
        title: title.replace(FIXED_SPACING, "")
    }
}