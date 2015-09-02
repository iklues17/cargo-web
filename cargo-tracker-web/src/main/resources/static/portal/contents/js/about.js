"use strict";

page.About = function () {
    comm.initPage();

    template.RenderOne({
        target: "#body",
        tagName: "div",
        className: "about",
        id: "bodyAbout",
        position: "new",
        template: comm.getHtml("contents/about.html"),
        data: undefined,
        events: {
            "click .about": function () {
                alert("about!");
            }
        }
    });
};