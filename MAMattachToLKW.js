var json = require('./LKWJsonFile');

sendDataPulse = function(){
    var lwkRoots = json.getLKWList().lkws.forEach(lkw => {
        console.log('attach data to  = ', lkw.chatRoot);
    })

}

sendDataPulse()