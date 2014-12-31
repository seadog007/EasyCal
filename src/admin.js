
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
    var authorizeButton = document.getElementById('authorize-button');
    var new_event = document.getElementById('new_event')
    if (authResult && !authResult.error) {
        authorizeButton.style.visibility = 'hidden';
        new_event.style.visibility = ''
        $('#auth-dialog').modal('hide');
        makeApiCall();
    } else {
        authorizeButton.style.visibility = '';
        authorizeButton.onclick = handleAuthClick;
        new_event.style.visibility = 'hidden'
        $('#auth-dialog').modal('show');
    }
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
            console.log(resp)
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
                cal_out = cal_out + "<td>" + resp.items[i].id + "</td>"
                cal_out = cal_out + "<td>" + resp.items[i].htmlLink + "</td>"
                cal_out = cal_out + "<td>" + starttime + "</td>"
                cal_out = cal_out + "<td>" + endtime + "</td>"
                cal_out = cal_out + "<td>" + diffTime(st, et) + "</td>"
                cal_out = cal_out + "<td>" + diffTime(new Date(), st) + "</td>"
                cal_out = cal_out + "<td>" + resp.items[i].summary + "</td>"
                cal_out = cal_out + "<td>" + '<a onclick="edit_event(' + (resp.items.length - i) + ')"><span class="glyphicon glyphicon-pencil"></span></a>' + "　" + '<a onclick="del_event(' + (resp.items.length - i) + ')"><span class="glyphicon glyphicon-trash"></span></a>' + "</td>"
                cal_out = cal_out + "</tr>"

            }
            $('#caltable')
            .append(cal_out)
            $('#caltable tr td:nth-child(1)').css('display','none');
            $('#caltable tr td:nth-child(2)').css('display','none');
        });
    });
}
//=============執行 Api 呼叫=============

function add_new_event(){
    $('#ned-cancel')[0].disabled="disabled"
    $('#ned-submit')[0].disabled="disabled"
    var summary = $('#ned-summary').val()
    var allday = $("#ned-fullday")[0].checked
    var start_date = $('#ned-SD').val()
    var start_time = $('#ned-ST').val()
    var end_date = $('#ned-ED').val()
    var end_time = $('#ned-ET').val()
    var detail = $('#ned-detail').val()
    var needretrun = 0

    if (summary==""){
        needretrun = 1
    }
    if (start_date==""){
        needretrun = 1
    }
    if (end_date==""){
        needretrun = 1
    }
    if (!allday && start_time==""){
        needretrun = 1
    }
    if (!allday && end_time==""){
        needretrun = 1
    }

    if (needretrun){
        $('#ned-cancel')[0].disabled=""
        $('#ned-submit')[0].disabled=""
        return false
    }else{

    }

}

function edit_event(row){
    console.log(row)
}

function del_event(row){
    console.log(row)
}

$('#new_event-dialog').on('shown.bs.modal', function () {
    $('#new_event-form')[0].reset()
    $('#ned-summary').focus()
    $('#ned-ST')[0].style.visibility="";
    $('#ned-ET')[0].style.visibility="";
})

$('#ned-fullday').click(function() {
    if ($("#ned-fullday")[0].checked){
        $('#ned-ST')[0].style.visibility="hidden";
        $('#ned-ET')[0].style.visibility="hidden";
    }else{
        $('#ned-ST')[0].style.visibility="";
        $('#ned-ET')[0].style.visibility="";
    }
})
