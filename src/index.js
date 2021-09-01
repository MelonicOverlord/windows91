import $ from "jquery";

import "./scss/index.scss";
import "./scss/programs.scss";
import { wnd } from "./api";

$(function () {
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

    $(".paintprg").on("dblclick", function () {
        w91.programs.paint();
    });
});