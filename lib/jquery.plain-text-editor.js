const $BODY = $("body");
const $MODAL_TEXTAREA_CLASS = "pte-modal-textarea";
const $FROALA_CONTENT_CLASS = ".fr-element.fr-view";
const $HIDDEN_ITEM_ID_INPUT_CLASS = "pte-hidden-id";

// Init
$(function () {
    $(document).on("click", ".pte-edit-btn",function () {
        let pointerClass = $(this).attr("pte-pointer");
        $.fn.plainTextEditor.loadInnerHTML(pointerClass);        
    });
});

// Builder
$.fn.plainTextEditor = function (options) {
    
    $.fn.plainTextEditor.settings = $.extend({}, $.fn.plainTextEditor.defaults, options);
    $.fn.plainTextEditor.createModal();

    let editor = new FroalaEditor("."+$MODAL_TEXTAREA_CLASS, {
        placeholderText: ''
    });    
    
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
    updateActionUrl: "index.html",
    updateActionType: "GET"
};

$.fn.plainTextEditor.settings = {};

$.fn.plainTextEditor.editButtonHTML = `
    <div class='pte-edit-btn-container'>
        <a href="#pte-modal" rel="modal:open">
            <button class='pte-edit-btn' pte-pointer=''>Editar Texto</button>
        </a>
    </div>
`;

$.fn.plainTextEditor.modalHTML = `
    <div id="pte-modal" class="modal pte-modal">
        <form type="" action="">
            <textarea class='`+$MODAL_TEXTAREA_CLASS+`' name='pte-new-content'></textarea>
            <input type='hidden' class='`+$HIDDEN_ITEM_ID_INPUT_CLASS+`' name='pte-item-id' value='' />
            <button type="submit">Actualizar</button>
        </form>
    </div>
`;

$.fn.plainTextEditor.createModal = () => {
    let modal = $($.fn.plainTextEditor.modalHTML);
    modal.children().attr("type", $.fn.plainTextEditor.settings.updateActionType);
    modal.children().attr("action", $.fn.plainTextEditor.settings.updateActionUrl);
    $BODY.append(modal);
};

$.fn.plainTextEditor.loadInnerHTML = pointerClass => {
    let froalaContent = $($FROALA_CONTENT_CLASS);
    let pointerElement = $("."+pointerClass);

    $("."+$HIDDEN_ITEM_ID_INPUT_CLASS).val(pointerElement.attr("pte-item-id"));
    
    froalaContent.html(pointerElement.html());
};