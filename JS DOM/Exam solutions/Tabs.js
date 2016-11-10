$.fn.tabs = function () {
    $('#tabs-container').addClass('tabs-container');
    var tabItems = $('.tab-item');
    tabItems.on('click', function () {
        tabItems.removeClass('current');
        $(this).addClass('current');
        $('.tab-item-content').css('display', 'none');
    $('.current').find('.tab-item-content').css('display', 'block');
    })
    $('.tab-item-content').css('display', 'none');
    tabItems.first().addClass('current');
    $('.current').find('.tab-item-content').css('display', 'block');
};