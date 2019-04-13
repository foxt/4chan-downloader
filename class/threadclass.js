const fetch = require("node-fetch")
class thread {

    // Make HTTP request to 4chan API to load thread and its comments.
    async loadPage() {
        if (!this.jsonUrl) throw new Error("not constructed! this shouldn't happen")
        console.log(`[THREAD] Getting thread ${this.threadId} on /${this.board}/`)
        var http = await (await fetch(this.jsonUrl)).json()
        this.rawPage = http.posts
        return http
    }

    // Convert raw page to a simpler object that only contains the post title, and image url and filenames.
    async getImages() {
        if (!this.promise) throw new Error("not constructed! this shouldn't happen")
        if (!this.rawPage) await this.promise
        var images = []
        for (var com of this.rawPage) {
            if (com.tim) {
                images.push({
                    filename: com.filename + com.ext,
                    url: `https://i.4cdn.org/${this.board}/${com.tim}${com.ext}`,
                    id: com.tim
                })
            }
        }
        var t = this.rawPage[0]
        return {
            sub: t.sub || t.com,
            subSem: t.semantic_url,
            imgs: images
        }
    }

    // Constructor to initialize object and load page.
    constructor(board,threadId) {
        this.board = board
        this.threadId = threadId
        this.url = `https://boards.4chan.org/${board}/threads/${threadId}`
        this.jsonUrl = `https://a.4cdn.org/${board}/thread/${threadId}.json`
        this.promise = this.loadPage()
    }
}
module.exports = thread