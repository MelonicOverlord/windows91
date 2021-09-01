import $ from "jquery";

import "./scss/index.scss";
import "./scss/programs.scss";
import { wnd, programs } from "./api";

$(function () {
    const startmenu = $(".start-menu");
    $(document).on("keyup mouseup", function (e) {
        const menu = $(".menu");
        if (e.key === "Escape") {
            menu.removeClass("active");
        } else if (!menu.is(e.target) && menu.has(e.target).length === 0) {
            menu.removeClass("active");
        }
    });

    $("button img").attr("draggable", false);

    if (!localStorage.getItem("wlcmConfirmed")) {
        wnd.create(
            "Welcome",
            `
        <p>Welcome to Windows 91, a open-source WebOS build for funny utility!</p>
        <button id="wlcmclose">OK</button>
    `,
            {
                btnFRW: ["#wlcmclose"],
                bodyClasses: "wlcmbody",
                maximizable: false,
                resizable: false,
                onClose: function () {
                    localStorage.setItem("wlcmConfirmed", true);
                },
            }
        );
    }

    $(".taskbar .start").on("click", function () {
        if (!startmenu.hasClass("active")) {
            startmenu.addClass("active");
        } else {
            startmenu.removeClass("active");
        }
    });

    $(".paintprg").on("dblclick", function () {
        programs.paint();
    });
    $(".configprg").on("dblclick", function () {
        programs.config();
    });
});
