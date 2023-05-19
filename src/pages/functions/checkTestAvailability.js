function checkTestAvailability(sd,st,ed,et)
{
    var d = new Date();
    var month=0,date=0,min=0,hour=0;
    if(d.getMonth()<=9)
    {
        month=d.getMonth()+1;
        date=d.getFullYear()+"-0"+month+"-"+d.getDate();
    }
    else
    {
        month=d.getMonth()+1;
        date=d.getFullYear()+"-"+d.getMonth()+"-"+d.getDate();
    }
    if(d.getMinutes()<=9)
    {
        min="0"+d.getMinutes();

    }
    else
    {
        min=d.getMinutes();
    }
    if(d.getHours()<=9)
    {
        hour="0"+d.getHours();

    }
    else
    {
        hour=d.getHours();
    }
    var time=hour+":"+min;
    
    if((date==sd && time>=st) && (date<=ed && time<=et))
    {
        return true
    }
    else
    {
        return false
    }
}