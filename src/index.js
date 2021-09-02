import $ from "jquery";

import "./scss/index.scss";
import "./scss/programs.scss";
import {wnd, programs} from "./api";

$(function () {
  // manage all menus
  const menu = $(".menu");
  $(document).on("keyup", function (e) {
    if (e.key === "Escape") {
      menu.removeClass("active");
      $(".start").removeClass("active");
    }
  });
  $(document).on("mouseup", function (e) {
    if (
      !menu.is(e.target) &&
      (!$(".start").is(e.target) &&
      $(".start").has(e.target).length === 0) &&
      menu.has(e.target).length === 0
    ) {
      menu.removeClass("active");
      $(".start").removeClass("active");
    }
  });
  const startmenu = $(".start-menu");
  $(".start").on("click", function () {
    if (startmenu.hasClass("active")) {
      startmenu.removeClass("active");
      $(".start").removeClass("active");
    } else {
      startmenu.addClass("active");
      $(".start").addClass("active");
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
  $(".configprg").on("dblclick keyup", function (e) {
    if (e.type === "keyup" && e.keyCode === 13) {
        programs.config();
    } else if (e.type === "dblclick") {
      programs.config();
    }
  });
});
