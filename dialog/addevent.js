var addevent = '\
<div class="modal fade" id="new_event-dialog" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\
<div class="modal-dialog">\
<div class="modal-content">\
<div class="modal-header">\
<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\
<h4 class="modal-title" id="myModalLabel" data-lang="new_event-dialog-title">新增事件</h4>\
</div>\
<div class="modal-body">\
<form id="new_event-form" class="form-horizontal" action="add_new_event()" data-toggle="validator">\
<div class="form-group">\
<label class="col-lg-2 control-label" for="ned-summary" data-lang="new_event-dialog-summary">摘要</label>\
<div class="col-lg-10">\
<input class="form-control" type="text" id="ned-summary" placeholder="請輸入摘要" required>\
</div>\
</div>\
<div class="form-group">\
<label class="col-lg-2 control-label" for="ned-SD" data-lang="new_event-dialog-start-time">開始時間</label>\
<div class="col-lg-5">\
<input type="date" class="form-control" id="ned-SD" placeholder="Start Date" required>\
</div>\
<div class="col-lg-5">\
<input type="time" class="form-control" id="ned-ST" placeholder="Start Time">\
</div>\
</div>\
<div class="form-group">\
<label class="col-lg-2 control-label" for="ned-ED" data-lang="new_event-dialog-end-time">結束時間</label>\
<div class="col-lg-5">\
<input type="date" class="form-control" id="ned-ED" placeholder="End Date" required>\
</div>\
<div class="col-lg-5">\
<input type="time" class="form-control" id="ned-ET" placeholder="End Time">\
</div>\
</div>\
<div class="form-group">\
<label class="col-lg-2 control-label" for="ned-detail" data-lang="new_event-dialog-detail">詳細內容</label>\
<div class="col-lg-10">\
<textarea class="form-control" id="ned-detail" placeholder="此事件詳細描述" rows="7"></textarea>\
</div>\
</div>\
</form>\
</div>\
<div class="modal-footer">\
<button class="btn btn-default class" data-dismiss="modal" data-lang="new_event-dialog-cancel">取消</button>\
<button class="btn btn-success" data-lang="new_event-dialog-add" type="submit">新增</button>\
</div>\
</div>\
</div>\
</div>\
'
$("body").prepend(addevent);
