
$.fn.plainTextEditor = function (options) {
    let body = $("body");

    $(this).each(function () {        
        let editButton = $($.fn.plainTextEditor.editButtonHTML);
        body.append(editButton);
        
        let rectElement = this.getBoundingClientRect();                        
        editButton.css({
            "top": rectElement.top - editButton.height(),
            "left": rectElement.left + rectElement.width - editButton.width()
        });        
    });    
};

$.fn.plainTextEditor.defaults = {
};

$.fn.plainTextEditor.editButtonHTML = `
    <div class='pte-edit-btn-container'>
        <button class='pte-edit-btn'>Editar Texto</button>
    </div>
`;