/**
 * Created by hyaghinloo on 5/2/17.
 */

    // Initialize Firebase
var config = {
        apiKey: "AIzaSyB1eL5npKgzO7oURsgXVBihaFmiPh8oces",
        authDomain: "dobdata-e1519.firebaseapp.com",
        databaseURL: "https://dobdata-e1519.firebaseio.com",
        projectId: "dobdata-e1519",
        storageBucket: "dobdata-e1519.appspot.com",
        messagingSenderId: "69463506076"
    };

firebase.initializeApp(config);
var database = firebase.database();

function submitToFireBase(data) {
    //convert array to object
    var dataObj = {};
    data.forEach(function (elm, idx) {
        // create index for each record
        dataObj['dobidx' + ('0000'.slice(0, 4 - idx.toString().length) + idx)] = elm;
    });

    // push dataobj to firebase server
    database.ref().set(dataObj);
    document.getElementById('msg').innerHTML = 'array is converted to an object and submitted to the firebase DB';
    console.log('array is converted to an object and submitted to the firebase DB');
}

$.getJSON('https://data.cityofnewyork.us/resource/rvhx-8trz.json', function (data) {
    submitToFireBase(data)
});

