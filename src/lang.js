var mtdict = {
  tw: { "cal_name": "日曆名稱", "cal_timezone": "此日曆時區", "msg_time": "以下已轉換為本地時間", "event_list": "事件列表", "table_start_time": "開始時間", "table_end_time": "結束時間", "table_duration": "持續", "table_left": "距離該活動剩下", "table_summary": "摘要", "table_action": "動作"},
  us: { "cal_name": "Calendar Name", "cal_timezone": "Timezone of Calendar", "msg_time": "不會翻", "event_list": "Event List", "table_start_time": "Start Time", "table_end_time": "End Time", "table_duration": "Duration", "table_left": "Left", "table_summary": "Summary", "table_action": "Action"}
};

var lang = 'tw';
var dict = mtdict[lang];

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

function switchPanel(name) {
  $(".panel" ).css( "display", "none" );
  $("#panel"+name).css("display", "block");
  $(".tab" ).removeClass("active");
  $("#tab"+name).addClass("active");
}

