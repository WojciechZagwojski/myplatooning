// Einbinden der IOTA Javascript Library
const IOTA = require('iota.lib.js'); 

// Kreiert eine IOTA instance direkt mit dem Provider.
const iota = new IOTA({
   'provider': 'http://node06.iotatoken.nl:14265' //Main Node von IOTA die attacheToTangle erlaubt.
});

//Reference zu einem Objekt mit Rückgabewerten. Vergleichbar mit einem Interface.
module.exports ={
    //Construktor.
    collection: function (cb){
        /**
         * Sucht nach Objekten in der Node an dem die Transaktionen gelistet/verknüpft sind.
         * @param {{'key': ['string']}} addresses Addressen in denen nach Transaktionen gesucht wird
         * @return Liste mit den Transaktions Objekten
         */
        iota.api.findTransactionObjects({ 
            hashes: ['LBMBGCNBOBWBYB9999999999999']}, ( error, objekts ) => {
            if (error) {
                console.error(error);
                return;
            }
            // Liste indem die Transaktionen, von einer Addresse, hinzugefügt werden.
            var promises =  [];
            //
            objekts.forEach((entry) =>{
                //Gibt einen neuen Promise zurück.
                promises.push( new Promise((resolve, reject) => {
                    /**
                     * Holt sich das Objekt einer Transaktion.
                     * @param {hash} hash Hash einer Transaktion
                     * @return Transaktions Objekt
                     */
                    iota.api.getTransactionsObjects([entry.hash],( error, post ) => {
                        if (error) {
                            console.error(error);
                            return;
                        }
                        console-log(post)
                        //Extrahiert die Verschlüsselte Message und Entschlüsselt diese.
                        resolve(JSON.parse(iota.utils.extractJson(post)));
                    });
                }))
            })
            /**
             * Methode die zum Bündeln von mehreren Promises dient bei Asynchronen aufrufen.
             * @rejekt Wenn eines der Promises abgelehnt wird, auch wenn welche erfüllt waren.
             * @resolve Gibt ein Array zurück wenn alle Promises erfolgreich erfüllt wurden.
             */
            Promise.all(promises).then(values => {
               // Liste indem die Promises hinzugefügt werden.
               var payload = [];
               //Für jedes Element aus Promises werden null Elemente und die nicht dem Construktor ensprechen heraus gefiltert.
               values.forEach((item) => {
                    if(item != null) {
                         if(item.constructor == {}.constructor) {
                             //Fügt die item einer Arrayliste hinzu.
                              payload.push(item)
                         }
                    }
               });
               //callback der Arrayliste.
               cb(payload)
           })
        });
    }
};
