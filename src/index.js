import $ from "jquery";
import "webpack-jquery-ui/draggable";
import "webpack-jquery-ui/resizable";
import "webpack-jquery-ui/css";

import "./style.scss";
import "98.css";
import "animate.css";
import api from "./api";
api.create("test");

$(".window")
    .draggable({ handle: ".title-bar" })
    .resizable({ minWidth: 300, minHeight: 100 });
function maximizeWindow(obj) {
    if (obj.parent().hasClass("maximized")) {
        obj.parent().removeClass("maximized");
    } else {
        obj.parent().addClass("maximized");
    }
}
$(".window .title-bar").on("dblclick", function () {
    maximizeWindow($(this));
});
$(".window .title-bar .max").on("click", function () {
    maximizeWindow($(this).parent().parent());
});

$(".window .title-bar .close").on("click", function () {
    $(this).parent().parent().parent().remove();
});
