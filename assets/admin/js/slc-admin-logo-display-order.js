jQuery(document).ready(function () {
    const slcCarouselLogoDisplayOrder = jQuery('#slc-carousel-logo-display-order');

    // turn our logo display order into a json array
    function DataToJsonString() {
        let data = [];
        let order = 1;

        // for each row entry
        jQuery('#slc-logo-display-order-table > tbody.slc-main-tbody > tr').each(function (e) {
            jQuery(this).attr('data-order', order);
            jQuery(this).find('.order-number').text(order.toString());
            data.push({
                id: jQuery(this).attr('data-id'),
                order: jQuery(this).attr('data-order')
            });
            order++;
        });

        // set our text area to our json data
        slcCarouselLogoDisplayOrder.val(JSON.stringify(data));
    }

    // trim empty spacing from logo display order textarea
    slcCarouselLogoDisplayOrder.val(slcCarouselLogoDisplayOrder.val().trim());

    // sort our logos
    jQuery('#slc-logo-display-order-table .slc-main-tbody').find('.slc-draggable').sort(function (a, b) {
        return jQuery(a).attr('data-order') - jQuery(b).attr('data-order');
    }).appendTo('#slc-logo-display-order-table .slc-main-tbody').ready(function () {
        // initiate and disable sortable on load
        jQuery('#slc-logo-display-order-table > tbody.slc-main-tbody').sortable({
            items: 'tr.slc-draggable',
            update: function () {
                DataToJsonString();
            },
        });
        jQuery('#slc-logo-display-order-table > tbody.slc-main-tbody').sortable('disable');

        // on sort click and hold
        jQuery('#slc-logo-display-order-table > tbody.slc-main-tbody').on('mousedown touchstart', 'tr.slc-draggable  > td:first-child', function () {
            jQuery('#slc-logo-display-order-table > tbody.slc-main-tbody').sortable('enable');
        }).bind('mouseup mouseleave touchend', function () {
            jQuery('#slc-logo-display-order-table > tbody.slc-main-tbody').sortable('disable');
        });
    });
});