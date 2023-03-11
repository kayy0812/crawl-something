import * as cheerio from "cheerio"

const FIXED_SPACING = /^\s+|\s+$/g
export default function (body) {
    const $ = cheerio.load(body)

    // Title
    var title = $("h1.Title").text()

    // Other title
    var otherTitle = $("h2.SubTitle").text()

    // Description
    var description = $(".Description").text()

    // Views
    var views = $(".View.AAIco-remove_red_eye").text()
    
    // Release
    var release = $(".Date.AAIco-date_range").text()

    // Episode
    var episode = $(".Time.AAIco-access_time").text().replace(FIXED_SPACING, "").split('/')

    // Poster
    var poster = $(".Image img").attr('src')
    
    // Banner
    var banner = $("img.TPostBg").attr('src')


    return {
        title: title.replace(FIXED_SPACING, ""),
        other_title: otherTitle.replace(FIXED_SPACING, ""),
        description: description.replace(FIXED_SPACING, ""),
        views: views.split(" ")[0].replace(/,/g, "").replace(FIXED_SPACING, ""),
        release: release.replace(FIXED_SPACING, ""),
        episode: {
            current: episode[0],
            total: episode[1]
        },
        poster: poster,
        banner: banner
    }
}