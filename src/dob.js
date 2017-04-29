/**
 * Created by Hadi Yaghinloo on 4/29/2017.
 */

class DOB {
    constructor(container = '#dob_container') {
        //load JSON from the end point
        this.JSONRsp = null;
        this.container = document.querySelector(container);
        this.headerCollection = [];
        this.loadDOBJSON();
    }

// create Table
    createDOBTable() {
        this.container.innerHTML = "Project started";
    }
// callback on json load
    setInitialState(data) {
        this.JSONRsp = data;
       this.createDOBTable();
        console.log(data);
    }

//call the DOB endpoint and load the JSON data
    loadDOBJSON() {
        $.getJSON('https://data.cityofnewyork.us/resource/rvhx-8trz.json', (data)=>{
            this.setInitialState(data)
        });
    }

}
document.addEventListener("DOMContentLoaded",() => {
    new DOB();
})


