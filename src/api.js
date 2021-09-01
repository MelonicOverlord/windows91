import $ from "jquery";
import "webpack-jquery-ui/css";
import "webpack-jquery-ui/draggable";
import "webpack-jquery-ui/resizable";

import "animate.css";
import uniqid from "uniqid";

function stylizeTask(ref, bold) {
  if (bold) {
    $(ref).css("font-weight", "600");
  } else {
    $(ref).css("font-weight", "");
  }
}

class window {
  create(
    title,
    content,
    data = {
      bodyClasses: "",
      iframe: "",
      btnFRW: [],
      minimizable: true,
      maximizable: true,
      maximized: false,
      closable: true,
      resizable: true,
      onClose: function () {},
    }
  ) {
    // double check for data propreties
    if (data["bodyClasses"] === undefined) {
      data["bodyClasses"] = "";
    }
    if (data["iframe"] === undefined) {
      data["iframe"] = "";
    }
    if (data["btnFRW"] === undefined) {
      data["btnFRW"] = [];
    }
    if (data["minimizable"] === undefined) {
      data["minimizable"] = true;
    }
    if (data["maximizable"] === undefined) {
      data["maximizable"] = true;
    }
    if (data["maximized"] === undefined) {
      data["maximized"] = false;
    }
    if (data["closable"] === undefined) {
      data["closable"] = true;
    }
    if (data["resizable"] === undefined) {
      data["resizable"] = true;
    }
    if (data["onClose"] === undefined) {
      data["onClose"] = function () {};
    }
    const id = uniqid();
    const animation = "animate__bounceIn";
    $(".taskbar .tasks").append(
      `<button id="task-${id}" class="task" onclick="w91.wnd.showOrHideTask('#window-${id}')">${title}</button>`
    );
    $("body").append(`
        <div class="window animate__animated ${animation}" id="window-${id}" style="width: 300px; height: 100px;">
            <div class="title-bar">
                <div class="title-bar-text">${title}</div>
                <div class="title-bar-controls">
                ${
                  data["minimizable"]
                    ? '<button class="minimize-window" aria-label="Minimize"></button>'
                    : ""
                }
                    ${
                      data["maximizable"]
                        ? '<button class="maximize-window" aria-label="Maximize"></button>'
                        : ""
                    }
                    ${
                      data["closable"]
                        ? `<button id="close-window-${id}" aria-label="Close"></button>`
                        : ""
                    }
                </div>
            </div>
            ${
              data["iframe"] != ""
                ? `<iframe src="${data["iframe"]}" allow="clipboard-read; clipboard-write"`
                : "<div"
            } class="window-body${" " + data["bodyClasses"]}">${
      data["iframe"] != "" ? "" : content
    }</${data["iframe"] != "" ? "</iframe>" : "div>"}
        </div>
        `);

    const window = $("#window-" + id);
    const width = 849;
    const height = 499;
    window.draggable({
      handle: ".title-bar",
    });
    if (data["resizable"]) {
      window.resizable({
        minHeight: height,
        minWidth: width,
        handles: "all",
        start: function () {
          if (!$(this).hasClass("ui-resized")) {
            $(this).addClass("ui-resized");
          }
        },
      });
    }
    window.css("width", width + 1 + "px").css("height", height + 1 + "px");
    // add window maximize
    let maximizeWindow = function (window) {
      if (window.parent().hasClass("maximized")) {
        window.parent().removeClass("maximized");
      } else {
        window.parent().addClass("maximized");
      }
    };
    window.children(".title-bar").on("dblclick", function () {
      if (data["maximizable"]) {
        maximizeWindow($(this));
      }
    });
    $(".maximize-window").on("click", function () {
      maximizeWindow(window.children(".title-bar"));
    });
    // minimization support
    let showOrHideTask = this.showOrHideTask;
    $(".minimize-window").on("click", function () {
      showOrHideTask("#window-" + id);
    });
    // support window closing
    let closeWindow = function (idcfw = "") {
      data["onClose"]();
      window.removeClass(animation + " endAnimation");
      window.addClass("animate__zoomOut");
      window.on("animationend", function () {
        window.remove();
      });
      if (idcfw != "") {
        $("#task-" + idcfw).remove();
      } else {
        $("#task-" + id).remove();
      }
    };
    $("#close-window-" + id).on("click", function () {
      closeWindow();
    });
    // eslint-disable-next-line no-unused-vars
    for (const b in data["btnFRW"]) {
      $(data["btnFRW"][b]).on("click", function () {
        closeWindow(id);
      });
    }
    // TODO: detect click in iframe
    // const beActive = function (e) {};
    // stylize window title bar and task
    $(document).on("mousedown", function (e) {
      $(".window").each(function () {
        window.removeClass("active");
      });
      $(".task").each(function () {
        stylizeTask(this, false);
      });
      const task = "#task-" + id;
      if (window.is(e.target) || window[0].contains(e.target)) {
        window.addClass("active");
        stylizeTask(task, true);
      } else {
        window.removeClass("active");
        stylizeTask(task, false);
      }
    });
    window.mousedown();
    stylizeTask("#task-" + id, true);
  }
  showOrHideTask(window) {
    $(".task").each(function () {
      stylizeTask(this, false);
    });
    const task = window.replace("window-", "task-");
    if ($(window).is(":visible")) {
      stylizeTask(task, false);
      $(window).addClass("endAnimation");
      $(window).hide();
    } else {
      stylizeTask(task, true);
      $(window).show();
    }
  }
}

// manage system programs
class prgs {
  config() {
    wnd.create("Control Panel", "<p>Not supported on the moment</p>");
  }
}

export let wnd = new window();
export let programs = new prgs();
