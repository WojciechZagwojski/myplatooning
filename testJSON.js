const json = require('./LKWJsonFile.js')






json.setLKW(5,'test', 'root')
// json.setLKW(35,'test', 'root', 1)

//json.deleteLKWList();

var read = json.getLKWList();

read.lkws.forEach(lkw =>{
    console.log(lkw.id)
})


//json.detachLKWFromNetwork(1,1)
//console.log(read.lkws)

//json.updateLKWPosition();

