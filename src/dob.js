/**
 * Created by Hadi Yaghinloo on 4/29/2017.
 */

class DOB {
    constructor(params) {
        //load JSON from the end point
        this.JSONRsp = null;
        this.DOBconf = params
        this.container = document.querySelector(this.DOBconf.container);
        this.headerCollection = [];
        this.loadDOBJSON();
    }

// create Table
    createDOBTable() {

        let output = '';
        let tableMarkup = '<thead><tr>';
        let activeSegement = [];
        this.headerCollection.forEach((header) => {
            tableMarkup += `<th data-headername ="${ header || ''}"> ${header.replace('_s', '').split('_').join('&#160;') || ''} </th> `;
        });
        tableMarkup += '</tr></thead>';
        tableMarkup += '<tbody>';

        this.JSONRsp.slice(0,this.DOBconf.maxRows).forEach((row, idx) => {
            let rowMarkup = '<tr>';
            this.headerCollection.forEach((headerName) => {
                rowMarkup += `<td>${ row[headerName] || ''}`;
            });
            rowMarkup += '</tr>';
            tableMarkup += rowMarkup;

        })

        output += `<table id="dob_table"  class="display" cellspacing="0" width="97%"  > ${tableMarkup} </tbody></table>`;

        this.container.innerHTML = output;
    }


// callback on json load
    setInitialState(data) {
        this.JSONRsp = data;
        // read the table header to make it consistent
        this.headerCollection = Object.keys(this.JSONRsp[0]);
        this.collectionSize = this.headerCollection.length;
        // create the table
        this.createDOBTable();
        $('#dob_table').DataTable( {
            "scrollX": true
        } );
        console.log(data);
    }

//call the DOB endpoint and load the JSON data
    loadDOBJSON() {
        $.getJSON(this.DOBconf.DOBApiurl, (data) => {
            this.setInitialState(data)
        });
    }

}

// config object
const DOBConf = {
    container: '#dob_container',
    DOBApiurl: 'https://data.cityofnewyork.us/resource/rvhx-8trz.json',
    maxRows: 1000
}

// load the module
document.addEventListener("DOMContentLoaded", () => {

    new DOB(DOBConf);


})


