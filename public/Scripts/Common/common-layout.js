$(function () {
    $("#divHeader").load("header.html", function () {
        $('.navigation-bar-item[href^="/' + location.pathname.split("/")[1] + '"]').addClass('active');
    })

    $("#divFooter").load("footer.html")
});