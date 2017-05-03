(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else if (typeof exports !== "undefined") {
        factory();
    } else {
        var mod = {
            exports: {}
        };
        factory();
        global.dob = mod.exports;
    }
})(this, function () {
    'use strict';

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var DOB = function () {
        function DOB(params) {
            _classCallCheck(this, DOB);

            //load JSON from the end point
            this.JSONRsp = null;
            this.JSONRspOBJ = {};
            this.DOBconf = params;
            this.container = document.querySelector(this.DOBconf.container);
            this.headerCollection = [];
            this.loadDOBJSON();
        }

        // create Table


        _createClass(DOB, [{
            key: 'createDOBTable',
            value: function createDOBTable() {
                var _this = this;

                var output = '';
                var tableMarkup = '<thead><tr>';

                this.headerCollection.forEach(function (header) {
                    tableMarkup += '<th data-headername ="' + (header || '') + '"> ' + (header.replace('_s', '').split('_').join('&#160;') || '') + ' </th> ';
                });

                tableMarkup += '</tr></thead>';
                tableMarkup += '<tbody>';

                this.JSONRsp.forEach(function (row) {
                    var rowMarkup = '<tr>';
                    _this.headerCollection.forEach(function (headerName) {
                        rowMarkup += '<td>' + (row[headerName] || '') + ' </td>';
                    });
                    rowMarkup += '</tr>';
                    tableMarkup += rowMarkup;
                });

                output += '<table id="dob_table"  class="display" cellspacing="0" width="97%"  > ' + tableMarkup + ' </tbody></table>';

                this.container.innerHTML = output;
            }
        }, {
            key: 'setInitialState',
            value: function setInitialState(data) {
                var _this2 = this;

                this.JSONRspOBJ = data;

                // read the table header to make it consistent
                this.headerCollection = Object.keys(this.JSONRspOBJ.dobidx0000);
                //  this.headerCollection = Object.keys(this.JSONRsp[0]);
                this.JSONRsp = Object.keys(this.JSONRspOBJ).map(function (key) {
                    return _this2.JSONRspOBJ[key];
                });

                // create the table
                this.createDOBTable();

                // apply DataTAble plugin to tha table
                $('#dob_table').DataTable({
                    "scrollX": true
                });
            }
        }, {
            key: 'loadDOBJSON',
            value: function loadDOBJSON() {
                var _this3 = this;

                $.getJSON(this.DOBconf.firebaseDB, function (data) {
                    _this3.setInitialState(data);
                });
            }
        }]);

        return DOB;
    }();

    // config object
    var DOBConf = {
        container: '#dob_container',
        DOBApiurl: 'https://data.cityofnewyork.us/resource/rvhx-8trz.json',
        firebaseDB: 'https://dobquery.firebaseio.com/.json'

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

    var showLoader = function showLoader() {
        document.getElementById('dob_container').innerHTML = '<img src="img/gears.gif" height="100%"/><h3>Talking to server...</h3>';
    };

    var submitToFireBase = function submitToFireBase(data) {
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
        setTimeout(function () {
            new DOB(DOBConf);
        }, 1000);
    };

    var loadJsonfromDOBAPI = function loadJsonfromDOBAPI() {
        showLoader();
        $.getJSON('https://data.cityofnewyork.us/resource/rvhx-8trz.json', function (data) {
            submitToFireBase(data);
        });
    };

    // load the module
    $(document).ready(function () {
        $('.savetofirebase').click(function (e) {
            e.preventDefault();
            loadJsonfromDOBAPI();
        });
        // run the table
        new DOB(DOBConf);
    });
});