import $ from "jquery";

import "./scss/index.scss";
import "./scss/programs.scss";
import { wnd } from "./api";

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
    }
);

$(".paintprg").on("dblclick", function () {
    w91.programs.paint();
});
