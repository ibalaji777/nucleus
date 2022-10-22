export function validation(action,value){

    if(action=='time'){
    var reg=/\d{2}:\d{2}\s(?:AM|PM|am|pm)/
    return reg.test(value)
    }

    if(action=='string'){
        if(value!='') return true;
    }
    
    return false;
}