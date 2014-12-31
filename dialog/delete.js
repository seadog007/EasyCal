var delete_ = '\
<div class="modal fade" id="delete-dialog" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\
<div class="modal-dialog">\
<div class="modal-content">\
<div class="modal-header">\
<h4 class="modal-title" data-lang="delete-diglog-title">刪除事件</h4>\
</div>\
<div class="modal-body" data-lang="delete-diglog-body">\
你確定要刪除這個事件嗎?\
</div>\
<div class="modal-footer">\
<button class="btn btn-default" data-dismiss="modal" data-lang="delete-diglog-cancel">取消</button>\
<button id="delete-dialog-delete" class="btn btn-danger"><span class="glyphicon glyphicon-trash"></span>　<span data-lang="delete-diglog-delete">刪除</span></button>\
</div>\
</div>\
</div>\
</div>\
'
$("body").prepend(delete_);
