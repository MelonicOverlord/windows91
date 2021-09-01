import $ from "jquery";
import "webpack-jquery-ui/css";
import "webpack-jquery-ui/draggable";
import "webpack-jquery-ui/resizable";

import "98.css";
import "animate.css";
import uniqid from "uniqid";

function stylizeTask(ref, bold) {
    if (bold) {
        $(ref).css("font-weight", "600");
    } else {
        $(ref).css("font-weight", "initial");
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
        this.addToTaskbar(title, id);
        $("body").append(`
        <div class="window animate__animated animate__heartBeat" id="window-${id}" style="width: 300px; height: 100px;">
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
        this.update(id, data["btnFRW"], {
            maximized: data["maximized"],
            minimizable: data["minimizable"],
            maximizable: data["maximizable"],
            closable: data["closable"],
            resizable: data["resizable"],
            onClose: data["onClose"],
        });
    }
    update(id, btnfcw, data) {
        const window = $("#window-" + id);
        window.draggable({
            handle: ".title-bar",
        });
        // TODO: detect click in iframe
        // const beActive = function (e) {};
        $(document).on("mousedown", function (e) {
            $(".window").each(function () {
                window.removeClass("active");
            });
            $(".task").each(function () {
                stylizeTask(this, false);
            });
            const task = "#task-" + id;
            if (e.target === window[0] || window[0].contains(e.target)) {
                window.addClass("active");
                stylizeTask(task, true);
            } else {
                window.removeClass("active");
                stylizeTask(task, false);
            }
        });
        $(document).on("click");
        if (data["resizable"]) {
            window.resizable({
                minHeight: 500,
                minWidth: 850,
                handles: "all",
                start: function () {
                    if (!$(this).hasClass("ui-resized")) {
                        $(this).addClass("ui-resized");
                    }
                },
            });
        }
        let maximizeWindow = function (obj) {
            if (obj.parent().hasClass("maximized")) {
                obj.parent().removeClass("maximized");
            } else {
                obj.parent().addClass("maximized");
            }
        };
        window.children(".title-bar").on("dblclick", function () {
            if (data["maximizable"]) {
                maximizeWindow($(this));
            }
        });
        let showOrHideTask = this.showOrHideTask;
        $(".minimize-window").on("click", function () {
            showOrHideTask("#window-" + id);
        });
        $(".maximize-window").on("click", function () {
            maximizeWindow(window.children(".title-bar"));
        });
        let removeTask = this.removeFromTaskbar;
        let closeWindow = function (idcfw = "") {
            data["onClose"]();
            window.removeClass("animate__heartBeat endAnimation");
            window.addClass("animate__zoomOut");
            window.on("animationend", function () {
                window.remove();
            });
            if (idcfw != "") {
                removeTask("#task-" + idcfw);
            } else {
                removeTask("#task-" + id);
            }
        };
        $("#close-window-" + id).on("click", function () {
            closeWindow();
        });
        for (const b in btnfcw) {
            $(btnfcw[b]).on("click", function () {
                closeWindow(id);
            });
        }
        window.mousedown();
        stylizeTask("#task-" + id, true);
    }
    addToTaskbar(title, id) {
        $(".taskbar .tasks").append(
            `<button id="task-${id}" class="task" onclick="w91.wnd.showOrHideTask('#window-${id}')">${title}</button>`
        );
    }
    removeFromTaskbar(task) {
        $(task).remove();
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

class prgs {
    config() {
        wnd.create("Control Panel", "<p>Not supported on the moment</p>");
    }
}

export let wnd = new window();
export let programs = new prgs();
