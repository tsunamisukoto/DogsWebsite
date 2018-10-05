$(function () {
    $("#divHeader").load("header.html", function () {
        var url = location.pathname.split("/")[1];
        $('.navigation-bar-item[href^="/' + (url || "index.html") + '"]').addClass('active');
        $('.navigation-bar-item.active').click(function () {
            $(".navigation-items").toggleClass("shown");
            return false;
        });

    })

    $("#divFooter").load("footer.html");
});