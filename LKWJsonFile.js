const fs = require('fs');

var obj = {
    lkws: []
 };

var detachLKWFromNetwork = function(id){
    var content = fs.readFileSync("LKWPlatoonList.json");
    obj = JSON.parse(content); //now it an object
    var lkw = obj.lkws;
    obj.lkws = lkw.filter((lkw) => {return lkw.id !== id})
    var json = JSON.stringify(obj);
    console.log(json)

    fs.writeFile('LKWPlatoonList.json', json, 'utf8', function(err) {
        if (err) throw err;
        console.log('detach from Network');
        updateLKWPosition();
        }
    ); // write it back 
}

var getLKWList = function(){
    var content = fs.readFileSync("LKWPlatoonList.json");
    obj = JSON.parse(content); //now it an object
    json = JSON.stringify(obj); //convert it back to json
    return(obj)
}

var deleteLKWList = function(){
    fs.unlinkSync("LKWPlatoonList.json");
}

var idPot;

var setLKW =  function(id, address, chatRoot){
    idPot = id;
    fs.exists('LKWPlatoonList.json', function(exists){
        if(exists){
            
            console.log("There is an existing file");
            fs.readFile('LKWPlatoonList.json', function readFileCallback(err, data){
            if (err){
                console.log('err');
            } else {
                    var obj = JSON.parse(data);
                    //JSON.parse(data)
                    //promisedParseJSON(data);
                    //Promise.resolve(data).then(JSON.parse).then(); //now it an object
                    obj.lkws.push({id: idPot, address:address, chatRoot:chatRoot}); //add some data
                    obj.lkws.sort((a, b) => parseFloat(a.id) - parseFloat(b.id));
                    json = JSON.stringify(obj); //convert it back to json
                    console.log(json)
                    fs.writeFile('LKWPlatoonList.json', json, 'utf8', function(err) {
                        if (err) throw err;
                        updateLKWPosition();
                        console.log('complete');
                        }
                    ); // write it back 
            }});
        } else {
            console.log("Create new File")
            //updateLKWPosition();
            obj.lkws.push({id: id, address:address, chatRoot:chatRoot}); //add some data
            var json = JSON.stringify(obj);
            fs.writeFile('LKWPlatoonList.json', json, 'utf8', function(err) {
                if (err) throw err;
                updateLKWPosition();
                console.log('complete');
                }
            ); // write it back
            }
        });
}

var updateLKWPosition = function(){
    var content = fs.readFileSync("LKWPlatoonList.json");
    obj = JSON.parse(content); //now it an object
    var size = Object.keys(obj.lkws).length;

    if(parseInt(obj.lkws[0].id) != 1){
        obj.lkws[0].id = 1;
    }

    for(x=0;x<size-1;x++){
        var difficult = parseInt(obj.lkws[x].id)-parseInt(obj.lkws[x+1].id);
        if(difficult < 1){
            obj.lkws[x+1].id = parseInt(obj.lkws[x].id)+1;
        }
    }

    obj.lkws.forEach(newPosition => {
        if(newPosition.id >= idPot){
            newPosition.id = newPosition.id+1;
        }
    });

    if(idPot > obj.lkws[size-1].id){
        idPot = obj.lkws[size-1].id+1;
    }

    var json = JSON.stringify(obj);
    fs.writeFile('LKWPlatoonList.json', json, 'utf8', function(err) {
        if (err) throw err;
        console.log('Update Positions');
        }
    ); // write it back 
    
    //console.log(obj)
}

module.exports = {
    setLKW:setLKW,
    getLKWList:getLKWList,
    detachLKWFromNetwork:detachLKWFromNetwork,
    deleteLKWList:deleteLKWList
}




    







