# 4chan-downloader
Downloads all current images from a 4chan board.

## Does this follow the API limit of 1/req/sec?

Yes. All API requests are performed after a 1 second wait.

## Does this redownload images or skip over partially downloaded or updated threads.

No. It checks all current threads for updates, and doesn't download images that already exist

## Why is it downloading ~~fag~~ homoerotic images?

/y/ is the default board. Change it in index.js

## How do I use it?

1. Install Node.

2. `npm i` in the folder

3. Edit the top of index.js to the board you want

4. `node index` every time you want to update.