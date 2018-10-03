$.put = function (url, data, callback, type) {

    if ($.isFunction(data)) {
        type = type || callback,
        callback = data,
        data = {}
    }

    return $.ajax({
        url: url,
        type: 'PUT',
        success: callback,
        data: data,
        contentType: type
    });
};
$.delete = function (url, data, callback, type) {

    if ($.isFunction(data)) {
        type = type || callback,
            callback = data,
            data = {}
    }

    return $.ajax({
        url: url,
        type: 'DELETE',
        success: callback,
        data: data,
        contentType: type
    });
};

String.prototype.asHTML = function () {
    return this.replace(/(\r\n|\n|\r)/gm, '<br/>');

}
function scrollDiv(container, amount) {
    var leftPos = $(container).scrollLeft();
    $(container).animate({ scrollLeft: (leftPos + amount) + "px" }, 250);
}
