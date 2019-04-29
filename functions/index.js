const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


const firestore = admin.firestore();

function generateRandomBikeData() {
    var newBike = {};
    newBike.bikeGPSCords = '';
    newBike.bikeBatteryPercentage = 10;
    newBike.bikeSpeed = 10;
    newBike.bikeLockStatus = 'Locked';
    newBike.bikeDockingStatus= 'Docked';
    return newBike;
}

exports.generateNewBike = functions.https.onRequest((request, response) => {
    const bikesCollRef = firestore.collection('/smartbikeRental/v0.1/bikes');
    bikesCollRef.add(generateRandomBikeData())
        .then( (res) => {
            console.log(`added new bike`);
            console.log(res);
        })
        .then( () => {
            response.send("Hello from Firebase!");
        })
});



exports.unlockABike = functions.https.onRequest((req, response) => {
    const bikeRef = firestore.doc(`/smartbikeRental/v0.1/bikes/${req.body.bikeId}`);
    bikeRef.update({
        bikeLockStatus: 'UnLocked'
    }).then( (res) => {
        return response.status(200).send("hoola");
    });
});

exports.lockDetectedForBike = functions.https.onRequest( (req, response) => {
    const bikeRef = firestore.doc(`/smartbikeRental/v0.1/bikes/${req.body.bikeId}`);
    bikeRef.update({
        bikeLockStatus: 'Locked'
    }).then( (res) => {
        return response.status(200).send("hoola");
    });
});


// to cater to dock end
exports.dockDetectedForBike = functions.https.onRequest( (req, response) => {
    const bikeRef = firestore.doc(`/smartbikeRental/v0.1/bikes/${req.body.bikeId}`);
    bikeRef.update({
        bikeDockStatus: 'Docked'
    }).then( (res) => {
        return response.status(200).send("hoola");
    });
});

exports.undockDetectedForBike = functions.https.onRequest( (req, response) => {
    const bikeRef = firestore.doc(`/smartbikeRental/v0.1/bikes/${req.body.bikeId}`);
    bikeRef.update({
        bikeDockStatus: 'UnDocked'
    }).then( (res) => {
        return response.status(200).send("hoola");
    });
});



