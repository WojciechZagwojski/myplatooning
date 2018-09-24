const IOTA = require('iota.lib.js');
const Mam = require('mam.client.js.old/lib/mam.node.js');
const fs = require('fs');
const utils = require('iota.crypto.js');


const iota = new IOTA({
    'provider': 'http://node06.iotatoken.nl:14265' //Main Node von IOTA die attacheToTangle erlaubt.
 });

//Seed in form von Hash. Vergleichbar mit einer Geldbörse
const seed = '999999999999999A99999BB99AAA9AA99999999ABB999AA999TTA99DD9999AGGRBAAAAAAAUCAAAA99';
const next_root1 = 'NVTMVTDZOYU9QGFZVZ9TTELQFVTZ9UNPBNXDMWRNMTSWUVCVWKVOFKEJUNT9GNILLUFLYTGUBZPKUOONR';

var mamState = Mam.init(iota,seed,2);
outputLogger("myLocalInit: ",mamState)


var mamRoot = Mam.getRoot(mamState);
//outputLogger("myRoot: ",mamRoot)

var mamSubscribe = Mam.subscribe(mamState,2)
//outputLogger("MySubscribe: ",mamSubscribe)

var mamCreate = Mam.create(mamState,'5464354534564')
//outputLogger("MyCreate: ", mamCreate)

//outputLogger("side_key: ", mamCreate.state.channel.next_root)

var mamDecode = Mam.decode(mamCreate.payload,mamCreate.state.channel.side_key, mamRoot)
outputLogger("MyDecode: ", mamDecode)

outputLogger("SOlvedMessage: ", mamDecode.payload)




function outputLogger(outputname, log){
    console.log(outputname + ": ", log);
    console.log();
}