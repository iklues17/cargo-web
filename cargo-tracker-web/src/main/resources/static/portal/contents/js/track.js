"use strict";

page.Track = function () {
    comm.initPage();

    template.RenderOne({
        target: "#body",
        tagName: "div",
        className: "track",
        id: "bodyTrack",
        position: "new",
        template: comm.getHtml("contents/track.html"),
        data: undefined,
        events: {
            "click .track": function () {
                alert("track!");
            }
        }
    });
};