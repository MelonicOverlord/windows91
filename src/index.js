import $ from "jquery";

import "./scss/index.scss";
import "./scss/programs.scss";
import {wnd, programs} from "./api";

$(function () {
  // manage start menu
  const menu = $(".menu");
  const startmenu = $(".start-menu");
  $(document).on("keyup", function (e) {
    if (e.key === "Escape") {
      menu.removeClass("active");
    }
  });
  $(document).on("mouseup", function (e) {
    if (!menu.is(e.target) && menu.has(e.target).length === 0) {
      menu.removeClass("active");
    } else if (startmenu.is(e.target) && startmenu.hasClass("active")) {
      startmenu.removeClass("active");
    }
  });
  $(".taskbar .start").on("click", function () {
    if (startmenu.hasClass("active")) {
      startmenu.removeClass("active");
    } else {
      startmenu.addClass("active");
    }
  });

  // fix for images in buttons drag
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

  // add trigger for desktop icons
  $(".configprg").on("dblclick", function () {
    programs.config();
  });
});
