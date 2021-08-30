import { wnd } from "./api";

wnd.create("Welcome", `
    <p>Welcome to Windows 91, the only one really open-source WebOS of the world!</p>
    <button class="close-window">OK</button>
`, {"maximizable": false});