var mtdict = {
    "zh-TW":
        {
        "edit-dialog-edit": "確定編輯",
        "edit-dialog-cancel": "取消",
        "edit-dialog-detail-self": "此事件詳細描述",
        "edit-dialog-detail": "詳細內容",
        "edit-dialog-end-time": "結束時間",
        "edit-dialog-start-time": "開始時間",
        "edit-dialog-allday-checkbox": "是",
        "edit-dialog-allday": "整天",
        "edit-dialog-summary-self": "請輸入摘要",
        "edit-dialog-summary": "摘要",
        "new_event-dialog-time-msg": "以下時間使用該日曆時區",
        "new_event-dialog-title": "新增事件",
        "table_left": "距離該活動剩下",
        "table_duration": "持續",
        "table_end_time": "結束時間",
        "table_start_time": "開始時間",
        "event_list": "事件列表",
        "msg_time": "以下已轉換為本地時間",
        "auth-diglog-button": "驗證",
        "auth-diglog-body": "你必須要先驗證Google帳戶才能編輯這個行事曆",
        "auth-diglog-title": "驗證你的Google帳戶",
        "new_event": "新增事件",
        "table_action": "動作",
        "table_summary": "摘要",
        "cal_name": "日曆名稱",
        "cal_timezone": "此日曆時區",
        "new_event-dialog-summary": "摘要",
        "new_event-dialog-summary-self": "請輸入摘要",
        "new_event-dialog-allday": "整天",
        "new_event-dialog-allday-checkbox": "是",
        "new_event-dialog-start-time": "開始時間",
        "new_event-dialog-end-time": "結束時間",
        "new_event-dialog-detail": "詳細內容",
        "new_event-dialog-detail-self": "此事件詳細描述",
        "new_event-dialog-cancel": "取消",
        "new_event-dialog-add": "新增事件",
        "delete-diglog-title": "刪除事件",
        "delete-diglog-body": "你確定要刪除這個事件嗎?",
        "delete-diglog-cancel": "取消",
        "delete-diglog-delete": "刪除",
        "edit-dialog-title": "編輯事件",
        "edit-dialog-time-msg": "以下時間使用該日曆時區",
        "days": "天",
        "day": "天",
        "hours": "小時",
        "hour": "小時",
        "mins": "分",
        "min": "分"
    },
    "en-US":
        {
        "edit-dialog-edit": "Edit",
        "edit-dialog-cancel": "Cancel",
        "edit-dialog-detail-self": "Some details about this event.",
        "edit-dialog-detail": "Details",
        "edit-dialog-end-time": "End Time",
        "edit-dialog-start-time": "Start Time",
        "edit-dialog-allday-checkbox": "Yes",
        "edit-dialog-allday": "All day",
        "edit-dialog-summary-self": "Summary of the event.",
        "edit-dialog-summary": "Summary",
        "new_event-dialog-time-msg": "The timezone of the calender is used with the time below.",
        "new_event-dialog-title": "Add event",
        "table_left": "Left",
        "table_duration": "Duration",
        "table_end_time": "End Time",
        "table_start_time": "Start Time",
        "event_list": "Event List",
        "msg_time": "The following date time has been converted to your local timezone.",
        "auth-diglog-button": "Authorize",
        "auth-diglog-body": "You need to sign in to edit the calendar",
        "auth-diglog-title": "Authorize",
        "new_event": "Add a new event",
        "table_action": "Action",
        "table_summary": "Summary",
        "cal_name": "Calendar Name",
        "cal_timezone": "Timezone of Calendar",
        "new_event-dialog-summary": "Summary",
        "new_event-dialog-summary-self": "Summary of the event",
        "new_event-dialog-allday": "All day event?",
        "new_event-dialog-allday-checkbox": "Yes",
        "new_event-dialog-start-time": "Start Time",
        "new_event-dialog-end-time": "End Time",
        "new_event-dialog-detail": "Detail",
        "new_event-dialog-detail-self": "Some details about this event.",
        "new_event-dialog-cancel": "Cancel",
        "new_event-dialog-add": "Add",
        "delete-diglog-title": "Confirm delete",
        "delete-diglog-body": "Are you sure to delete this event?",
        "delete-diglog-cancel": "Cancel",
        "delete-diglog-delete": "Confirm",
        "edit-dialog-title": "Edit this event",
        "edit-dialog-time-msg": "The timezone of the calender is used with the time below.",
        "day": "day",
        "days": "days",
        "hour": "hour",
        "hours": "hours",
        "min": "min",
        "mins": "mins"

    }
};

var lang
if (getCookie('lang')==""){
    lang = window.navigator.language
}else{
    lang = getCookie('lang')
}
if (mtdict[lang] == undefined){
    lang = 'en-US';
}
switchLang(lang)

function mt(e) {
    var v = dict[e];
    return (v===undefined)?e:v;
}

function switchLang(pLang) {
    document.cookie="lang=" + pLang;
    lang = pLang;
    dict = mtdict[lang];
    $( "[data-lang]" ).each(function() {
        var e = $(this).data("lang");
        if ($(this).attr("placeholder") === undefined) {
            $(this).text(mt(e));
        } else {
            $(this).attr("placeholder", mt(e));
        }
    });
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}
