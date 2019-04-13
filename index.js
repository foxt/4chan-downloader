const board = "y"
// example: y, b, lgbt, g, cm, hm, etc





const threadClass = require("./class/threadclass")
const download = require("./helper/download")
const getPage = require("./helper/getPage")
const sleep = require("./helper/sleep")

console.log(`[MAIN] Downloading /${board}/`)
async function test() {
    const testThread = new threadClass("y",2616770)
    await testThread.promise
    await download.downloadThread(testThread)
}
//test()
async function go() {
    var page = 1
    while (true) {
        global.gPage = page
        var thePage = await getPage(board,page)
        
        var t = 1
        for (var thread of thePage) {
            global.gT = t
            const testThread = new threadClass(board,thread)
            await testThread.promise
            await download.downloadThread(testThread)

            await sleep(1000)
            t += 1
        }

        await sleep(1000)
        page += 1
    }
    
}
go()