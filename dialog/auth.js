var auth = '\
<div class="modal fade" id="auth-dialog" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\
<div class="modal-dialog">\
<div class="modal-content">\
<div class="modal-header">\
<h4 class="modal-title" data-lang="auth-diglog-title" id="myModalLabel">驗證你的Google帳戶</h4>\
</div>\
<div class="modal-body" data-lang="auth-diglog-body">\
你必須要先驗證Google帳戶才能編輯這個行事曆\
</div>\
<div class="modal-footer">\
<button id="authorize-button" class="btn btn-success" style="visibility: hidden"><span class="glyphicon glyphicon-lock"></span>　<span data-lang="auth-diglog-button">驗證</span></button>\
</div>\
</div>\
</div>\
</div>\
'
$("body").prepend(auth);
