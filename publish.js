// Einbinden der IOTA Javascript Library
const IOTA = require('iota.lib.js')

// Kreiert eine IOTA instance direkt mit dem Provider.
const iota = new IOTA({
    'provider': 'http://node06.iotatoken.nl:14265' //Main Node von IOTA die attacheToTangle erlaubt.
 });

//Seed in form von Hash. Vergleichbar mit einer Geldbörse
const seed = 'YLDPKWNSD9RJIVEMEZOTMWQDITZFIQMVPFFRXFFABEWTMFMXOT9ZNDPTJOHUBBMRZ9QIEI9OTHDYDFUPG';
//Addresse in der die Transaktionen gelistet/angeknüpft werden.
const addr = 'KSWUADDADRYBWXLEYOCRQNORWJXUTGJLNTZYRUTKOHPITXPBCALFQJEWSSGBOXKOHKBHYT9ZAJGYHWINCRSAJT9ITW';

/**
 * Publish Funktion.
 * @param {string} trytes Die Verschlüsselte Message
 */
const doPublish = (trytes) => {
    /**
             * Methode die zum Bündeln von mehreren Promises dient bei Asynchronen aufrufen.
             * @rejekt Wenn eines der Promises abgelehnt wird, auch wenn welche erfüllt waren.
             * @resolve Gibt ein Array zurück wenn alle Promises erfolgreich erfüllt wurden.
             */
    return new Promise((resolve, reject) => {
            /**
             * Tranfser Objekt mit Informationen die in einer Transaktion beinhaltet sind.
             * @param {hash} address Die Addresse an der eine Transaktion angeknüpft wird
             * @param {int} value Bezahl Betrag 
             * @param {trytes} message Die Message einer Transaktion 
             * @param {trytes} tag Der Tag an dem die Transaktion angeknüpft wird
             */
            var transfer = [{
                address: addr,
                value: 0,
                message: trytes,
                tag: iota.utils.toTrytes('BCXDEMO')
            }]
            
            //Tiefe Angabe
            var depth = 4;
            //Minimale Gewichtsgröße Angabe. Auf dem Mainnet leigt die Angabe bei 18.
            var minWeightMagnitude = 14;
            // Ruf die sendTransfar API wrapper funktion.
            /**
             * Schickt die Transaktion in die Node.
             * Ist zuständig für prepareTransfers, attachToTangle, broadcast and storeTransactions
             * @param {hash} seed Geldbörse
             * @param {int} depth Tiefe Angabe
             * @param {int} minWeightMagnitude minimale Gewichtsgröße
             * @param {objekt} transfer Infroamtionen die in einer Transaktion sind
             * @return {objekt} Die Verschlüsselte Transaktion 
             */
            iota.api.sendTransfer(seed, depth, minWeightMagnitude, transfer, (error, attached) => {
                if (error) {
                    console.error(error);
                    reject(error);
                }
                console.log("Successfully attached your transaction to the Tangle with transaction", attached);
                resolve(attached);
            });
    });
};

/**
 * Reference zu einem Objekt mit Rückgabewerten. Vergleichbar mit einem Interface.
 * @param {string} payload Die Message
 * @return {objekt} Die Verschlüsselte Transaktion 
 */
module.exports = function (payload) {
    //Wandelt die Nachricht/Message in trytes um.
    var trytes = iota.utils.toTrytes(JSON.stringify(payload));
    const prom = doPublish(trytes);
    return prom;
}
