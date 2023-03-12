import * as cheerio from "cheerio"

const FIXED_SPACING = /^\s+|\s+$/g
export default function (body) {
    const $ = cheerio.load(body)

    // Title
    var title = $("h1.film-info-title").text()

    var description = $(".film-info-description").text()

    // Genre
    var listGenre = []
    var genreData = $('.film-info-genre a')
    genreData.each((i,v) => {
        listGenre[i] = $(v).text().replace(FIXED_SPACING, "")
    })

    // Tags
    var listTag = []
    var tagData = $('.film-info-tag span')
    tagData.each((i,v) => {
        listTag[i] = $(v).text().replace(FIXED_SPACING, "")
    })

    // Translate
    var translate = $(".film-info-subteam>a").text()

    // Views
    var views = ($(".film-info-views>span").text()).split(' ')[0].replace(/,/g, '')

    console.log($('html').html())

    return {
        title: title.replace(FIXED_SPACING, ""),
        description: description.replace(FIXED_SPACING, ""),
        genre: listGenre,
        tag: listTag,
        translate: translate.replace(FIXED_SPACING, ""),
        views: views.replace(FIXED_SPACING, "")
    }
}