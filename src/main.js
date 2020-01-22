$(function () {
    // Cargar PLain Text Editor en elementos con clase "pte"
    $(".pte").plainTextEditor({
        updateActionUrl: "index2.hrml",
        updateActionType: "post"
    });
});