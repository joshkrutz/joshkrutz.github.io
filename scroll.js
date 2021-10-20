var lastLoc = -1;
var scrollTimer = -1;

// element should be replaced with the actual target element on which you have applied scroll, use window in case of no target element.
window.addEventListener("mousewheel", function () { // or window.addEventListener("scroll"....
    if (scrollTimer != -1)
        clearTimeout(scrollTimer);
    else {
        if (lastLoc == -1) {
            lastLoc = window.pageYOffset || window.scrollTop;
            if (lastLoc == null) {
                lastLoc = 0;
            }
        }
    }
    scrollTimer = window.setTimeout("scrollFinished()", 500);
    
}, false);

function scrollFinished() {

}

window.addEventListener("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function () {
    // Get the current page scroll position
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,

        // if any scroll is attempted, set this to the previous value
        window.onscroll = function () {
            window.scrollTo(scrollLeft, scrollTop);
        };
});

var menu = document.getElementById("menu");

document.addEventListener('click', function (e) {
    var target = e.target || e.srcElement;
    var text = target.id;
    if (text === "menu-li" || text === "contact-btn") {
        var id = target.textContent.toLowerCase() || target.innerText.toLowerCase();
        document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    }
})