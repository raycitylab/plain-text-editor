const $BODY = $("body");
const $MODAL_TEXTAREA_CLASS = "pte-modal-textarea";

// Init
$(function () {
    $.fn.plainTextEditor.createModal();

    $(document).on("click", ".pte-edit-btn",function () {
        let pointerClass = $(this).attr("pte-pointer");
        $.fn.plainTextEditor.loadInnerHTML(pointerClass);        
    });
});

// Builder
$.fn.plainTextEditor = function (options) {    
    let pointerCount = 1;

    $(this).each(function () {        
        let editButton = $($.fn.plainTextEditor.editButtonHTML);
        $BODY.append(editButton);
        
        let rectElement = this.getBoundingClientRect();                        
        editButton.css({
            "top": rectElement.top - editButton.height(),
            "left": rectElement.left + rectElement.width - editButton.width()
        });
        
        let pointerClass = "pte-pointer-item-" + pointerCount++; 
        $(this).addClass(pointerClass);
        editButton.children().children().attr("pte-pointer", pointerClass);        
    });    
};

$.fn.plainTextEditor.defaults = {
};

$.fn.plainTextEditor.editButtonHTML = `
    <div class='pte-edit-btn-container'>
        <a href="#pte-modal" rel="modal:open">
            <button class='pte-edit-btn' pte-pointer=''>Editar Texto</button>
        </a>
    </div>
`;

$.fn.plainTextEditor.modalHTML = `
    <div id="pte-modal" class="modal pte-modal">
        <textarea class='`+$MODAL_TEXTAREA_CLASS+`'></textarea>
    </div>
`;

$.fn.plainTextEditor.createModal = () => $BODY.append($($.fn.plainTextEditor.modalHTML));

$.fn.plainTextEditor.loadInnerHTML = pointerClass => {
    let modalTextarea = $("."+$MODAL_TEXTAREA_CLASS);
    let pointerElement = $("."+pointerClass);

    modalTextarea.html(pointerElement.html());
};