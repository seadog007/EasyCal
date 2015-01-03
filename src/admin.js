var cal_timezone = ""
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

            cal_timezone = resp.timeZone

            var cal_out = ""
            for (var i = resp.items.length - 1; i >= 0; i--) {

                var allday = "0"
                if (resp.items[i].start.date) {
                    allday = "1"

                    var sto = resp.items[i].start.date
                    var st = new Date(resp.items[i].start.date + "T00:00:00" + moment().tz(resp.timeZone).format('Z'));
                    var starttime = st.getFullYear() + "-" + (st.getMonth() + 1) + "-" + st.getDate() + " " + st.getHours() + ":" + st.getMinutes()
                    var eto = resp.items[i].end.date
                    var et = new Date(resp.items[i].end.date + "T00:00:00" + moment().tz(resp.timeZone).format('Z'));
                    var endtime = et.getFullYear() + "-" + (et.getMonth() + 1) + "-" + et.getDate() + " " + et.getHours() + ":" + et.getMinutes()


                } else {

                    var sto = resp.items[i].start.dateTime
                    var st = new Date(resp.items[i].start.dateTime);
                    var starttime = st.getFullYear() + "-" + (st.getMonth() + 1) + "-" + st.getDate() + " " + st.getHours() + ":" + st.getMinutes()
                    var eto = resp.items[i].end.dateTime
                    var et = new Date(resp.items[i].end.dateTime);
                    var endtime = et.getFullYear() + "-" + (et.getMonth() + 1) + "-" + et.getDate() + " " + et.getHours() + ":" + et.getMinutes()

                }
                cal_out = cal_out + "<tr>"
                cal_out = cal_out + "<td>" + resp.items[i].id + "</td>"
                cal_out = cal_out + "<td>" + resp.items[i].description + "</td>"
                cal_out = cal_out + "<td>" + allday + "</td>"
                cal_out = cal_out + "<td>" + starttime + "</td>"
                cal_out = cal_out + "<td>" + sto + "</td>"
                cal_out = cal_out + "<td>" + endtime + "</td>"
                cal_out = cal_out + "<td>" + eto + "</td>"
                cal_out = cal_out + "<td>" + diffTime(st, et) + "</td>"
                cal_out = cal_out + "<td>" + diffTime(new Date(), st) + "</td>"
                if (resp.items[i].description != undefined){
                    cal_out = cal_out + '<td><a onclick="detailshow(\'' + encodeURI(newline_en(resp.items[i].description)) + '\')">' + resp.items[i].summary + '</a></td>'
                }else{
                    cal_out = cal_out + '<td>' + resp.items[i].summary + '</td>'
                }
                cal_out = cal_out + "<td>" + '<a onclick="edit_event(' + (resp.items.length - i) + ')"><span class="glyphicon glyphicon-pencil"></span></a>' + "　" + '<a onclick="del_event(\'' + resp.items[i].id + '\')"><span class="glyphicon glyphicon-trash"></span></a>' + "</td>"
                cal_out = cal_out + "</tr>"

            }
            $('#caltable')
            .append(cal_out)
            $('#caltable tr td:nth-child(1)').css('display','none');
            $('#caltable tr td:nth-child(2)').css('display','none');
            $('#caltable tr td:nth-child(3)').css('display','none');
            $('#caltable tr td:nth-child(5)').css('display','none');
            $('#caltable tr td:nth-child(7)').css('display','none');
            switchLang(lang)
        });
    });
}
//=============執行 Api 呼叫=============

function add_new_event(){
    $('#ned-cancel')[0].disabled="disabled"
    $('#ned-submit')[0].disabled="disabled"
    var summary = $('#ned-summary').val()
    var allday = $("#ned-allday")[0].checked
    var start_date = $('#ned-SD').val()
    var start_time = $('#ned-ST').val()
    var end_date = $('#ned-ED').val()
    var end_time = $('#ned-ET').val()
    var detail = $('#ned-detail').val()
    var start_datetime = ""
    var end_datetime = ""
    var needretrun = 0
    if (!allday){
        start_datetime = start_date + "T" + start_time + ":00" + moment().tz(cal_timezone).format('Z')
        end_datetime = end_date + "T" + end_time + ":00" + moment().tz(cal_timezone).format('Z')
        if (diffTime(start_datetime,end_datetime)=="Over"){
            needretrun = 1
        }
    }
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
    if (diffTime(start_date,end_date)=="Over"){
        needretrun = 1
    }


    if (needretrun){

        $('#ned-cancel')[0].disabled=""
        $('#ned-submit')[0].disabled=""
        return false

    }else{

        if (allday){
            var req_body = {
                'start': {
                    'date': start_date
                },
                'end': {
                    'date': end_date
                },
                'summary': summary,
                'description': detail
            }
        }else{
            var req_body = {
                'start': {
                    'dateTime': start_datetime
                },
                'end': {
                    'dateTime': end_datetime
                },
                'summary': summary,
                'description': detail
            }
        }

        gapi.client.load('calendar', 'v3', function () {
            var request = gapi.client.calendar.events.insert({
                'calendarId': calendarId,
                'resource': req_body
            });
            request.execute(function (resp) {
                $('#new_event-dialog').modal('hide');
                update_table()
            });
        });
    }

}


function edit_event(row){

    var eventid = $('#caltable tr td:nth-child(1)')[(row - 1)].innerText
    var detail = $('#caltable tr td:nth-child(2)')[(row - 1)].innerText
    if (detail == "undefined"){
        detail = ""
    }
    var allday = Number($('#caltable tr td:nth-child(3)')[(row - 1)].innerText)
    var start_datetime = $('#caltable tr td:nth-child(5)')[(row - 1)].innerText
    var end_datetime = $('#caltable tr td:nth-child(7)')[(row - 1)].innerText
    var summary = $('#caltable tr td:nth-child(10)')[(row - 1)].innerText
    start_datetime_as_date = new Date(start_datetime)
    end_datetime_as_date = new Date(end_datetime)
    $('#editd-summary')[0].value = summary
    $('#editd-allday')[0].checked = allday
    $('#editd-SD')[0].value = moment(start_datetime_as_date).format('YYYY-MM-DD');
    $('#editd-ED')[0].value = moment(end_datetime_as_date).format('YYYY-MM-DD');
    if (allday){
        $('#editd-ST')[0].style.visibility = "hidden";
        $('#editd-ET')[0].style.visibility = "hidden";
    }else{
        $('#editd-ST')[0].value = moment(start_datetime_as_date).format('hh:mm:ss');
        $('#editd-ET')[0].value = moment(end_datetime_as_date).format('hh:mm:ss');
        $('#editd-ST')[0].style.visibility = "";
        $('#editd-ET')[0].style.visibility = "";
    }
    $('#editd-detail')[0].value = detail
    $('#editd-submit').attr("onclick", 'real_edit_event("' + eventid + '")')
    $('#editd-cancel')[0].disabled=""
    $('#editd-submit')[0].disabled=""
    $('#edit-dialog').modal('show')
}

function real_edit_event(id){

    $('#editd-cancel')[0].disabled="disabled"
    $('#editd-submit')[0].disabled="disabled"
    var summary = $('#editd-summary').val()
    var allday = $("#editd-allday")[0].checked
    var start_date = $('#editd-SD').val()
    var start_time = $('#editd-ST').val()
    var end_date = $('#editd-ED').val()
    var end_time = $('#editd-ET').val()
    var detail = $('#editd-detail').val()
    var start_datetime = ""
    var end_datetime = ""
    var needretrun = 0
    if (!allday){
        start_datetime = start_date + "T" + (start_time.split(':').length == 2 ? start_time + ":00" : start_time) + moment().tz(cal_timezone).format('Z')
        end_datetime = end_date + "T" + (end_time.split(':').length == 2 ? end_time + ":00" : end_time) + moment().tz(cal_timezone).format('Z')
        if (diffTime(start_datetime,end_datetime)=="Over"){
            needretrun = 1
        }
    }
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
    if (diffTime(start_date,end_date)=="Over"){
        needretrun = 1
    }


    if (needretrun){

        $('#editd-cancel')[0].disabled=""
        $('#editd-submit')[0].disabled=""
        return false

    }else{

        if (allday){
            var req_body = {
                'start': {
                    'date': start_date
                },
                'end': {
                    'date': end_date
                },
                'summary': summary,
                'description': detail
            }
        }else{
            var req_body = {
                'start': {
                    'dateTime': start_datetime
                },
                'end': {
                    'dateTime': end_datetime
                },
                'summary': summary,
                'description': detail
            }
        }

        gapi.client.load('calendar', 'v3', function () {
            var request = gapi.client.calendar.events.update({
                'calendarId': calendarId,
                'eventId': id,
                'resource': req_body
            });
            request.execute(function (resp) {
                $('#edit-dialog').modal('hide');
                update_table()
            });
        });
    }

}

function del_event(id){
    $('#delete-dialog-delete').attr("onclick", 'real_del_event("' + id + '")')
    $('#delete-dialog').modal('show')
}

function real_del_event(id){
    gapi.client.load('calendar', 'v3', function () {
        var request = gapi.client.calendar.events.delete({
            'calendarId': calendarId,
            'eventId': id
        });
        request.execute(function (resp) {
            $('#delete-dialog').modal('hide')
            update_table()
        });
    });
}

function update_table(){
    $("#caltable tr").remove();
    makeApiCall()
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

$('#editd-allday').click(function() {
    if ($("#editd-allday")[0].checked){
        $('#editd-ST')[0].style.visibility="hidden";
        $('#editd-ET')[0].style.visibility="hidden";
    }else{
        $('#editd-ST')[0].style.visibility="";
        $('#editd-ET')[0].style.visibility="";
    }
})

