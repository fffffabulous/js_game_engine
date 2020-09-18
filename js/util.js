const log = console.log.bind(console)
const e = (selector) => document.querySelector(selector)
const es = (selector) => document.querySelectorAll(selector)
const bindEvent = (selector, name ,callback) => {
    if (selector === window) {
        window.addEventListener(name, callback)
    } else {
        e(selector).addEventListener(name, callback)
    }
}
const bindEvents = (selector, name ,callback) => {
    es(selector).forEach((item) => {
        item.addEventListener(name, callback)
    })
}
