import * as cheerio from "cheerio"

const FIXED_SPACING = /^\s+|\s+$/g
export default function (body) {
    const $ = cheerio.load(body)

    // Title
    var title = $("h1.title").text()

    // Other title
    var other_title = $("h2.title2").text()

    // Poster
    var poster = $("img[itemprop='image']").attr('src')

    return {
        title: title.replace(FIXED_SPACING, ""),
        other_title: other_title.replace(FIXED_SPACING, ""),
        poster: poster
    }
}