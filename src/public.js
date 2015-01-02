
//=============OAtuh 2.0=============

function handleClientLoad() {
    gapi.client.setApiKey(apiKey);
    window.setTimeout(checkAuth, 1);
}

function checkAuth() {
    gapi.auth.authorize({
        client_id: clientId,
        scope: scopes,
        immediate: true
    }, handleAuthResult);
}

function handleAuthResult(authResult) {
    makeApiCall();
}

function handleAuthClick(event) {
    gapi.auth.authorize({
        client_id: clientId,
        scope: scopes,
        immediate: false
    }, handleAuthResult);
    return false;
}

//=============OAtuh 2.0=============

//=============執行 Api 呼叫=============

function makeApiCall() {
    gapi.client.load('calendar', 'v3', function () {
        var request = gapi.client.calendar.events.list({
            "calendarId": calendarId,
            "maxResults": maxResults,
            "orderBy": "startTime",
            "singleEvents": "true",
            "timeZone": "UTC"
        });

        request.execute(function (resp) {
            $("#name")
            .text(resp.summary);
            $("#title")
            .text(resp.summary);
            $("#timezone")
            .text(resp.timeZone);
            respDebug = resp;
            var cal_out = ""
            for (var i = resp.items.length - 1; i >= 0; i--) {
                if (resp.items[i].start.date) {

                    var st = new Date(resp.items[i].start.date + "T00:00:00" + moment().tz(resp.timeZone).format('Z'));
                    var starttime = st.getFullYear() + "-" + (st.getMonth() + 1) + "-" + st.getDate() + " " + st.getHours() + ":" + st.getMinutes()
                    var et = new Date(resp.items[i].end.date + "T00:00:00" + moment().tz(resp.timeZone).format('Z'));
                    var endtime = et.getFullYear() + "-" + (et.getMonth() + 1) + "-" + et.getDate() + " " + et.getHours() + ":" + et.getMinutes()


                } else {

                    var st = new Date(resp.items[i].start.dateTime);
                    var starttime = st.getFullYear() + "-" + (st.getMonth() + 1) + "-" + st.getDate() + " " + st.getHours() + ":" + st.getMinutes()
                    var et = new Date(resp.items[i].end.dateTime);
                    var endtime = et.getFullYear() + "-" + (et.getMonth() + 1) + "-" + et.getDate() + " " + et.getHours() + ":" + et.getMinutes()


                }
                cal_out = cal_out + "<tr>"
                cal_out = cal_out + "<td>" + starttime + "</td>"
                cal_out = cal_out + "<td>" + endtime + "</td>"
                cal_out = cal_out + "<td>" + diffTime(st, et) + "</td>"
                cal_out = cal_out + "<td>" + diffTime(new Date(), st) + "</td>"
                if (resp.items[i].description != undefined){
                    cal_out = cal_out + '<td><a onclick="detailshow(\'' + encodeURI(newline_en(resp.items[i].description)) + '\')">' + resp.items[i].summary + '</a></td>'
                }else{
                    cal_out = cal_out + '<td>' + resp.items[i].summary + '</td>'
                }
                cal_out = cal_out + "</tr>"
            }
            $('#caltable').append(cal_out)
            switchLang(lang)
        });
    });
}
//=============執行 Api 呼叫=============


