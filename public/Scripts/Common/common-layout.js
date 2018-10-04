$(function () {
    $("#divHeader").load("header.html", function () {

        $('.navigation-bar-item[href^="/' + location.pathname.split("/")[1] + '"]').addClass('active');
        $('.main-page-heading').click(function () {
            $(".navigation-items").toggleClass("shown");
        });

    })

    $("#divFooter").load("footer.html")
});