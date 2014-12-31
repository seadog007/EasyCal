var edit = '\
<div class="modal fade" id="edit-dialog" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\
<div class="modal-dialog">\
<div class="modal-content">\
<div class="modal-header">\
<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\
<h4 class="modal-title" id="myModalLabel" data-lang="edit-dialog-title">新增事件</h4>\
</div>\
<div class="modal-body">\
<form id="edit-form" class="form-horizontal" action="" data-toggle="validator">\
<div class="well well-sm"><span data-lang="edit-dialog-time-msg">以下時間使用該日曆時區</span></div>\
<div class="form-group">\
<label class="col-lg-2 control-label" for="editd-summary" data-lang="edit-dialog-summary">摘要</label>\
<div class="col-lg-10">\
<input class="form-control" type="text" id="editd-summary" placeholder="請輸入摘要" required>\
</div>\
</div>\
<div class="form-group">\
<label class="col-lg-2 control-label" data-lang="edit-dialog-allday">整天</label>\
<div class="col-lg-10">\
<div class="checkbox">\
<label>\
<input type="checkbox" id="editd-allday"><span data-lang="edit-dialog-allday-checkbox">是</span></input>\
</label>\
</div>\
</div>\
</div>\
<div class="form-group">\
<label class="col-lg-2 control-label" for="editd-SD" data-lang="edit-dialog-start-time">開始時間</label>\
<div class="col-lg-5">\
<input type="date" class="form-control" id="editd-SD" max="9999-12-31" placeholder="Start Date" required>\
</div>\
<div class="col-lg-5">\
<input type="time" class="form-control" id="editd-ST" placeholder="Start Time"  required>\
</div>\
</div>\
<div class="form-group">\
<label class="col-lg-2 control-label" for="editd-ED" max="9999-12-31" data-lang="edit-dialog-end-time">結束時間</label>\
<div class="col-lg-5">\
<input type="date" class="form-control" id="editd-ED" placeholder="End Date" required>\
</div>\
<div class="col-lg-5">\
<input type="time" class="form-control" id="editd-ET" placeholder="End Time"  required>\
</div>\
</div>\
<div class="form-group">\
<label class="col-lg-2 control-label" for="editd-detail" data-lang="edit-dialog-detail">詳細內容</label>\
<div class="col-lg-10">\
<textarea class="form-control" id="editd-detail" placeholder="此事件詳細描述" rows="7"></textarea>\
</div>\
</div>\
</form>\
</div>\
<div class="modal-footer">\
<button id="editd-cancel" class="btn btn-default class" data-dismiss="modal" data-lang="edit-dialog-cancel">取消</button>\
<button id="editd-submit" class="btn btn-success" data-lang="edit-dialog-edit" onclick="">修改</button>\
</div>\
</div>\
</div>\
</div>\
'
$("body").prepend(edit);
