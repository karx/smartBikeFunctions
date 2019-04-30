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
    newBike.bikeGPSCords = [27.01, 78.02];
    newBike.bikeBatteryPercentage = 100;
    newBike.bikeSpeed = 0;
    newBike.bikeLockStatus = 'Locked';
    newBike.bikeDockingStatus = 'Docked';
    newBike.currentStationId = '6o66aFjYo9HpyHhjUOIp';
    newBike.bikeNumber = 'BK002';
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


exports.bikeTelemetry = functions.https.onRequest((req, response) => {
    const bikesCollRef = firestore.collection(`/smartbikeRental/v0.1/bikes/${req.body.bikeid}`).doc('live');
    bikesCollRef.add(generateRandomBikeData())
        .then((res) => {
            console.log(`added new bike`);
            console.log(res);
        })
        .then(() => {
            response.send("Voila");
        })
})


exports.unlockABike = functions.https.onRequest((req, response) => {
    const bikeRef = firestore.doc(`/smartbikeRental/v0.1/bikes/${req.body.bikeId}`);
    bikeRef.update({
        bikeLockStatus: 'UnLocked'
    }).then((res) => {
        return response.status(200).send("hoola");
    });
});

exports.lockDetectedForBike = functions.https.onRequest((req, response) => {
    const bikeRef = firestore.doc(`/smartbikeRental/v0.1/bikes/${req.body.bikeId}`);
    bikeRef.update({
        bikeLockStatus: 'Locked'
    }).then((res) => {
        return response.status(200).send("hoola");
    });
});


// to cater to dock end
exports.dockDetectedForBike = functions.https.onRequest((req, response) => {
    const bikeRef = firestore.doc(`/smartbikeRental/v0.1/bikes/${req.body.bikeId}`);
    bikeRef.update({
        bikeDockStatus: 'Docked'
    }).then((res) => {
        return response.status(200).send("hoola");
    });
});

exports.undockDetectedForBike = functions.https.onRequest((req, response) => {
    const bikeRef = firestore.doc(`/smartbikeRental/v0.1/bikes/${req.body.bikeId}`);
    bikeRef.update({
        bikeDockStatus: 'UnDocked'
    }).then((res) => {
        return response.status(200).send("hoola");
    });
});



