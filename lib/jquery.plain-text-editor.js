
$.fn.plainTextEditor = function (options) {
    let body = $("body");

    $(this).each(function () {
        let rect = this.getBoundingClientRect();
        let editButton = $($.fn.plainTextEditor.editButtonHTML);
        editButton.css({
            "top": rect.top,
            "left": rect.left
        });

        body.append(editButton);        
    });    
};

$.fn.plainTextEditor.defaults = {
};

$.fn.plainTextEditor.editButtonHTML = `
    <div class='pte-edit-btn-container'>
        <button class='pte-edit-btn'>Editar Texto</button>
    </div>
`;