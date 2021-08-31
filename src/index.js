import "./style.scss";
import { wnd } from "./api";

wnd.create(
    "Welcome",
    `
    <p>Welcome to Windows 91, a open-source WebOS build for funny utility!</p>
    <button id="wlcmclose">OK</button>
`,
    { iframe: "", btnFRW: ["#wlcmclose"], maximizable: false, resizable: false }
);
