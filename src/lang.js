var mtdict = {
  "zh-TW":
    {
      "auth-diglog-button": "驗證",
      "auth-diglog-body": "你必須要先驗證Google帳戶才能編輯這個行事曆",
      "auth-diglog-title": "驗證你的Google帳戶",
      "new_event": "新增事件",
      "table_action": "動作",
      "table_summary": "摘要",
      "cal_name": "日曆名稱",
      "cal_timezone": "此日曆時區",
      "msg_time": "以下已轉換為本地時間",
      "event_list": "事件列表",
      "table_start_time": "開始時間",
      "table_end_time": "結束時間",
      "table_duration": "持續",
      "table_left": "距離該活動剩下"
    },
  "en-US":
    {
      "auth-diglog-button": "Authorize",
      "auth-diglog-body": "You need to sign in to edit the calendar",
      "auth-diglog-title": "Authorize",
      "new_event": "Add a new event",
      "table_action": "Action",
      "table_summary": "Summary",
      "cal_name": "Calendar Name",
      "cal_timezone": "Timezone of Calendar",
      "msg_time": "The following date time has been converted to your local timezone.",
      "event_list": "Event List",
      "table_start_time": "Start Time",
      "table_end_time": "End Time",
      "table_duration": "Duration",
      "table_left": "Left",

    }
};

var lang = window.navigator.language;
if (mtdict[lang] == undefined){
    lang = 'en-US';
}
switchLang(lang)

function mt(e) {
  var v = dict[e];
  return (v===undefined)?e:v;
}

function switchLang(pLang) {
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


