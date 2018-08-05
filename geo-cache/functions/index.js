const functions = require('firebase-functions');

const admin = require('firebase-admin')
admin.initializeApp()

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.checkAlias = functions.https.onCall((data, context) => {
    const ref = admin.firestore().collection('users').doc(data.slug);
    return ref.get().then(doc => {
        return { unique: !doc.exists }
    }).catch(err => {
        throw new functions.https.HttpsError('failed to connect')
    });
})