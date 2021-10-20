var body = document.body,
    html = document.documentElement;

var height = Math.max(body.scrollHeight, body.offsetHeight,
    html.clientHeight, html.scrollHeight, html.offsetHeight);

var pages = document.getElementsByTagName("section");

var page_num = 0;
var moving = false;
var scrollTimer = -1;

window.addEventListener("mousewheel", function () { // or window.addEventListener("scroll"....
    if (scrollTimer !== -1)
        clearTimeout(scrollTimer);
    scrollTimer = window.setTimeout("scrollFinished()", 500);

}, false);

function NavUp() {
    if (page_num > 0 && !moving) {
        if (scrollTimer === -1) {
            page_num--;
            pages[page_num].scrollIntoView({ behavior: "smooth", block: "start", inline: "center" });
            moving = true;
        }
    }
    else {
        scrollTimer = -1;
    }
}

function NavDown() {
    if (page_num < pages.length - 1) {
        if (scrollTimer === -1 && !moving) {
            page_num++;
            
            pages[page_num].scrollIntoView({ behavior: "smooth", block: "start", inline: "center" });
            moving = true;
        }

    }
    else {
        scrollTimer = -1;
    }
}

function scrollFinished() {
    scrollTimer = -1;
    moving = false;
}

function ScrollUp(duration) {
    if (page_num === 0) {
        return;
    }
    var toHeight = pages[page_num - 1].offsetTop;
    var fromHeight = pages[page_num].offsetTop;
    page_num--;

    // cancel if already on top
    if (document.scrollingElement.scrollTop === toHeight) return;

    const cosParameter = (fromHeight - toHeight) / 2;
    let scrollCount = 0, oldTimestamp = null;

    function step(newTimestamp) {
        if (oldTimestamp !== null) {
            // if duration is 0 scrollCount will be Infinity
            scrollCount += Math.PI * (newTimestamp - oldTimestamp) / duration;
            if (scrollCount >= Math.PI) return document.scrollingElement.scrollTop = toHeight;
            document.scrollingElement.scrollTop = cosParameter + cosParameter * Math.cos(scrollCount) + toHeight;
        }
        oldTimestamp = newTimestamp;
        window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
}

function ScrollDown(duration) {
    if (page_num === pages.length - 1) {
        return;
    }
    var toHeight = pages[page_num + 1].offsetTop;
    var fromHeight = pages[page_num].offsetTop;
    page_num++;

    // cancel if already on top
    if (document.scrollingElement.scrollTop === toHeight) return;

    const cosParameter = (fromHeight - toHeight) / 2;
    let scrollCount = 0, oldTimestamp = null;

    function step(newTimestamp) {
        if (oldTimestamp !== null) {
            // if duration is 0 scrollCount will be Infinity
            scrollCount += Math.PI * (newTimestamp - oldTimestamp) / duration;
            if (scrollCount >= Math.PI) return document.scrollingElement.scrollTop = toHeight;
            document.scrollingElement.scrollTop = cosParameter + cosParameter * Math.cos(scrollCount) + toHeight;
        }
        oldTimestamp = newTimestamp;
        window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
}