function detailshow(detail){
   $('#detail-dialog-body').text(decodeURI(detail))
   $('#detail-dialog-body').html($('#detail-dialog-body').html().replace(/\\n/g,'<br>'));
   $('#detail-dialog').modal('show')
}

function newline_en(str){
    return str.replace(/\n/g,"\\n")
}

