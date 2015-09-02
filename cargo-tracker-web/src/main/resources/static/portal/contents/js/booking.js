"use strict";

page.Booking = function () {
    comm.initPage();

    template.RenderOne({
        target: "#body",
        tagName: "div",
        className: "booking",
        id: "bodyBooking",
        position: "new",
        template: comm.getHtml("contents/booking.html"),
        data: undefined,
        events: {
            "click .booking": function () {
                alert("booking!");
            }
        }
    });
};