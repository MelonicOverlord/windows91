import $ from "jquery";
import "webpack-jquery-ui/draggable";
import "webpack-jquery-ui/resizable";

import "98.css";
import "animate.css";
import uniqid from "uniqid";

class window {
    update(data = { maximizable: true, resizable: true }) {
        $(".window").draggable({ handle: ".title-bar" });
        if (data["resizable"]) {
            $(".window").resizable({ minWidth: 300, minHeight: 100 });
        }
        let maximizeWindow = function (obj) {
            if (obj.parent().hasClass("maximized")) {
                obj.parent().removeClass("maximized");
            } else {
                obj.parent().addClass("maximized");
            }
        };
        $(".window .title-bar").on("dblclick", function () {
            if (data["maximizable"]) {
                maximizeWindow($(this));
            }
        });
        $(".window .title-bar .maximize-window").on("click", function () {
            maximizeWindow($(".window .title-bar"));
        });
        let removeTask = this.removeFromTaskbar;
        $(".window .close-window").on("click", function () {
            removeTask("#taskbar-" + $(".window").attr("id").replace("window-", ""));
            $(".window").removeClass("animate__rubberBand endAnimation");
            $(".window").addClass("animate__bounceOut");
            $(".window").on("animationend", function () {
                $(".window").remove();
            });
        });
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
    create(title, content, data = { maximizable: true }) {
        const id = uniqid();
        this.addToTaskbar(title, id);
        $("body").append(`
        <div class="window animate__animated animate__rubberBand" id="window-${id}" style="width: 300px; height: 100px;">
            <div class="title-bar">
                <div class="title-bar-text">${title}</div>
                <div class="title-bar-controls">
                    <button aria-label="Minimize"></button>
                    ${
                        data["maximizable"]
                            ? '<button class="maximize-window" aria-label="Maximize"></button>'
                            : ""
                    }
                    <button class="close-window" aria-label="Close"></button>
                </div>
            </div>
            <div class="window-body">
                ${content}
            </div>
        </div>
        `);
        this.update({ maximized: data["maximizable"] });
    }
}

export let wnd = new window();
