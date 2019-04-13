const fetch = require("node-fetch")

// function to grab a page
module.exports = async function(board,page) {
    console.log(`[PAGE] Getting page ${page} on /${board}/`)
    var http = await (await fetch(`https://a.4cdn.org/${board}/${page}.json`)).json()
    var threads = []
    for (var thread of http.threads) {
        threads.push(thread.posts[0].no)
    }
    return threads
}
