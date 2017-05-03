/**
 * global $
 * Created by Hadi Yaghinloo on 4/29/2017.
 */

class DOB {
    constructor(params) {
        //load JSON from the end point
        this.JSONRsp = null;
        this.JSONRspOBJ = {} ;
        this.DOBconf = params;
        this.container = document.querySelector(this.DOBconf.container);
        this.headerCollection = [];
        this.loadDOBJSON();
    }

// create Table
    createDOBTable() {

        let output = '';
        let tableMarkup = '<thead><tr>';

        this.headerCollection.forEach((header) => {
            tableMarkup += `<th data-headername ="${ header || ''}"> ${header.replace('_s', '').split('_').join('&#160;') || ''} </th> `;
        });


        tableMarkup += '</tr></thead>';
        tableMarkup += '<tbody>';

        this.JSONRsp.forEach((row) => {
            let rowMarkup = '<tr>';
            this.headerCollection.forEach((headerName) => {
                rowMarkup += `<td>${ row[headerName] || ''} </td>` ;
            });
            rowMarkup += '</tr>';
            tableMarkup += rowMarkup;

        });

        output += `<table id="dob_table"  class="display" cellspacing="0" width="97%"  > ${tableMarkup} </tbody></table>`;

        this.container.innerHTML = output;
    }


// callback on json load
    setInitialState(data) {
        this.JSONRspOBJ = data;

        // read the table header to make it consistent
       this.headerCollection = Object.keys(this.JSONRspOBJ.dobidx0000);
      //  this.headerCollection = Object.keys(this.JSONRsp[0]);
       this.JSONRsp =  Object.keys(this.JSONRspOBJ).map(  (key)=> { return this.JSONRspOBJ[key]; });

        // create the table
        this.createDOBTable();

        // apply DataTAble plugin to tha table
        $('#dob_table').DataTable({
            "scrollX": true
        });

    }

//call the DOB endpoint and load the JSON data
    loadDOBJSON() {
        $.getJSON(this.DOBconf.firebaseDB, (data) => {
            this.setInitialState(data)
        });
    }

}

// config object
const DOBConf = {
    container: '#dob_container',
    DOBApiurl: 'https://data.cityofnewyork.us/resource/rvhx-8trz.json',
    firebaseDB :'https://dobquery.firebaseio.com/.json'

};

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAn8ZE273KBc6X9_1-MPLYmQ8gvIOWZ2k4",
    authDomain: "dobquery.firebaseapp.com",
    databaseURL: "https://dobquery.firebaseio.com",
    projectId: "dobquery",
    storageBucket: "dobquery.appspot.com",
    messagingSenderId: "917152653865"
};
firebase.initializeApp(config);
var database = firebase.database();

const showLoader = () => {
    document.getElementById('dob_container').innerHTML = `<img src="img/gears.gif" height="100%"/><h3>Talking to server...</h3>`;
}

const submitToFireBase = (data) => {
    //convert array to object
    var dataObj = {};
    data.forEach(function (elm, idx) {
        // create index for each record
        dataObj['dobidx' + ('0000'.slice(0, 4 - idx.toString().length) + idx)] = elm;
    });

    // push dataobj to firebase server
    database.ref().set(dataObj);
    document.querySelector('#dob_container h3').innerHTML = 'JSON data object is ready and submitted to the firebase DB';
    console.log('JSON data object is ready and submitted to the firebase DB');
    setTimeout(()=>{
        new DOB(DOBConf);
    } , 1000)
}

const loadJsonfromDOBAPI = () => {
    showLoader();
    $.getJSON('https://data.cityofnewyork.us/resource/rvhx-8trz.json', function (data) {
        submitToFireBase(data)
    });

}

// load the module
$(document).ready( () => {
   $('.savetofirebase').click( (e)=>{
        e.preventDefault();
        loadJsonfromDOBAPI();
    });
// run the table
    new DOB(DOBConf);
});


