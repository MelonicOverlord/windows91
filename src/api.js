import $ from "jquery";
import "webpack-jquery-ui/css";
import "webpack-jquery-ui/draggable";
import "webpack-jquery-ui/resizable";

import "98.css";
import "animate.css";
import "./style.scss";

class window {
    update(data={"maximizable": true}) {
        $(".window")
            .resizable({ minWidth: 300, minHeight: 100 })
            .draggable({ handle: ".title-bar" });
        let maximizeWindow = function (obj) {
            if (obj.parent().hasClass("maximized")) {
                obj.parent().removeClass("maximized");
            } else {
                obj.parent().addClass("maximized");
            }
        };
        $(".window .title-bar").on("dblclick", function () {
            if (data["maximizable"] == true) {
                maximizeWindow($(this));
            }
        });
        $(".window .title-bar .maximize-window").on("click", function () {
            maximizeWindow($(".window .title-bar"));
        });
        $(".window .close-window").on("click", function () {
            $(".window").removeClass("animate__rubberBand");
            $(".window").addClass("animate__bounceOut");
            $(".window").on("animationend", function () {
                $(".window").remove();
            });
        });
    }
    create(title, content, data = { "maximizable": true }) {
        $("body").append(`
        <div class="window animate__animated animate__rubberBand" style="width: 300px; height: 100px;">
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
