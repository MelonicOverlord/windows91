import $ from "jquery";
import "webpack-jquery-ui/draggable";
import "webpack-jquery-ui/resizable";

import "98.css";
import "animate.css";
import uniqid from "uniqid";

class window {
    update(id, btnfcw, data) {
        const window = $("#window-" + id);
        window.draggable({ handle: ".title-bar" });
        if (data["resizable"]) {
            window.resizable({ minWidth: 300, minHeight: 100 });
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
            window.removeClass("animate__rubberBand endAnimation");
            window.addClass("animate__bounceOut");
            window.on("animationend", function () {
                window.remove();
            });
            if (idcfw != "") {
                removeTask("#taskbar-" + idcfw);
            } else {
                removeTask(
                    "#taskbar-" + window.attr("id").replace("window-", "")
                );
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
    }
    addToTaskbar(title, id) {
        $(".taskbar .tasks").append(
            `<button id="taskbar-${id}" onclick="w91.wnd.showOrHideTask('#window-${id}')">${title}</button>`
        );
    }
    removeFromTaskbar(task) {
        $(task).remove();
    }
    showOrHideTask(window) {
        if ($(window).is(":visible")) {
            $(window).hide();
        } else {
            $(window).addClass("endAnimation");
            $(window).show();
        }
    }
    create(
        title,
        content,
        data = {
            iframe,
            btnFRW,
            minimizable,
            maximizable,
            maximized,
            closable,
            resizable,
        }
    ) {
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
        const id = uniqid();
        this.addToTaskbar(title, id);
        $("body").append(`
        <div class="window animate__animated animate__rubberBand" id="window-${id}" style="width: 300px; height: 100px;">
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
            <${
                data["iframe"] != "" ? `iframe src="${data["iframe"]}"` : "div"
            } class="window-body">${data["iframe"] != "" ? "" : content}</${
            data["iframe"] != "" ? "iframe" : "div"
        }>
            
        </div>
        `);
        this.update(id, data["btnFRW"], {
            maximized: data["maximized"],
            minimizable: data["minimizable"],
            maximizable: data["maximizable"],
            closable: data["closable"],
            resizable: data["resizable"],
        });
    }
}

export let wnd = new window();

class prgs {
    paint() {
        wnd.create("Paint", "", { iframe: "https://jspaint.app" });
    }
}

export let programs = new prgs();
