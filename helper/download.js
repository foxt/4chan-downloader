const fetch = require("node-fetch")
const fs = require("fs")
const chalk = require("chalk")

// Function to download a file to disk.
module.exports.downloadFileRaw = downloadFileRaw =  async function(url,filename) {
    return new Promise(async function(a,r) {
        fetch(url).then(res => {
            const dest = fs.createWriteStream(filename);
            res.body.pipe(dest);
            res.body.on("end", function() {
                console.log(`[DL] downloaded ${url} to ${filename}`)
                a()
            })
        }).catch(console.error)
    })
}

// Function to download a file if it doesn't exist.
module.exports.downloadFile = downloadFile = async function(url,filename) {
    return new Promise(async function(a,r) {
        if (!fs.existsSync(filename)) {
            try {
                a(await this.downloadFileRaw(url,filename))
            } catch(e) {
                console.error("[DL]",e)
            }
        } else {
            console.log(`[DL] ${filename} already exists, not downloading ${url} there`)
            a()
        }
    })
}

// Function to make a folder if it doesn't exist already.
module.exports.createFolder = createFolder = async function(folder) {
    return new Promise(async function(a,r) {
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder)
            a()
        } else {
            a()
        }
    })
}

// Function to download images from a thread's 'getImages' method
module.exports.downloadThreadImages = downloadThreadImages = async function(images,prefix) {
    return new Promise(async function(a,r) {
        console.log(`[DL] Downloading thread ${images.sub}`)
        await createFolder("output")
        var folder = `output/${prefix} - ${images.subSem}/`
        await createFolder(folder)
        var i = 0
        for (var img of images.imgs) {
            i = i + 1
            var size = process.stdout.columns || 80;
            var pcnt = Math.round((i / images.imgs.length) * size)
            var totalPercent = Math.round(((((global.gPage - 1) * 15) + global.gT) / 165) * size)
            try {
                await downloadFile(img.url, `${folder}${img.id} - ${img.filename}`)
            } catch(e) {
                console.error(e)
            }
            console.log(`${"\033[2J"}\n${chalk.green(images.sub)} - ${chalk.gray(img.filename)}
${chalk.red(`Page: ${global.gPage}/10`)} ${chalk.green(`Thread: ${global.gT}/15`)} ${chalk.blue(`Image:${i}/${images.imgs.length}`)}
${chalk.blue("█".repeat(pcnt))}${chalk.grey("░".repeat(size - pcnt))}
${chalk.red("█".repeat(totalPercent))}${chalk.grey("░".repeat(size - totalPercent))}`)
        }
        console.log("[DL] Done!")
        a()
    })
}

// Function to download a thread
module.exports.downloadThread = downloadThread = async function(thread) {
    return new Promise(async function(a,r) {
        a(await downloadThreadImages(await thread.getImages(), thread.board))
    })
}