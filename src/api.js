import $ from "jquery";

export default new class window {
    create(name) {
        $("body").append("<p>" + name + "</p>");
    }
}
