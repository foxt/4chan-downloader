module.exports = async function(interval) {
    return new Promise(function(a,r) {
        setTimeout(a,interval)
    })
}