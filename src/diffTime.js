function diffTime(startTime_s,endTime_s) {
    var startTime = (new Date(startTime_s)).getTime();
    var endTime =  (new Date(endTime_s)).getTime()
    var totalSecs = (endTime - startTime) / 1000;
    var days = Math.floor(totalSecs / 3600 / 24);
    var hours = Math.floor((totalSecs - days * 24 * 3600) / 3600);
    var mins = Math.floor((totalSecs - days * 24 * 3600 - hours * 3600) / 60);
    var secs = Math.floor((totalSecs - days * 24 * 3600 - hours * 3600 - mins * 60));
    if (totalSecs < 0){
        return 'Over'
    }
    var ret = ''
    if (days != 0 && days > 1){
        ret = ret + days + '<span data-lang="days">days</span>  '
    }
    if (days != 0 && days == 1){
        ret = ret + days + '<span data-lang="day">day</span>  '
    }

    if (hours != 0 && hours > 1){
        ret = ret + hours + '<span data-lang="hours">hours</span>  '
    }
    if (hours != 0 && hours == 1){
        ret = ret + hours + '<span data-lang="hour">hour</span>  '
    }

    if (mins != 0 && mins > 1){
        ret = ret + mins + '<span data-lang="mins">mins</span>  '
    }
    if (mins != 0 && mins == 1){
        ret = ret + mins + '<span data-lang="min">min</span>  '
    }

    return ret
}


