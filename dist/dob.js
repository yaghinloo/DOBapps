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
                var activeSegement = [];
                this.headerCollection.forEach(function (header) {
                    tableMarkup += '<th data-headername ="' + (header || '') + '"> ' + (header.replace('_s', '').split('_').join('&#160;') || '') + ' </th> ';
                });
                tableMarkup += '</tr></thead>';
                tableMarkup += '<tbody>';

                this.JSONRsp.slice(0, this.DOBconf.maxRows).forEach(function (row, idx) {
                    var rowMarkup = '<tr>';
                    _this.headerCollection.forEach(function (headerName) {
                        rowMarkup += '<td>' + (row[headerName] || '');
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
                this.JSONRsp = data;
                // read the table header to make it consistent
                this.headerCollection = Object.keys(this.JSONRsp[0]);
                this.collectionSize = this.headerCollection.length;
                // create the table
                this.createDOBTable();
                $('#dob_table').DataTable({
                    "scrollX": true
                });
                console.log(data);
            }
        }, {
            key: 'loadDOBJSON',
            value: function loadDOBJSON() {
                var _this2 = this;

                $.getJSON(this.DOBconf.DOBApiurl, function (data) {
                    _this2.setInitialState(data);
                });
            }
        }]);

        return DOB;
    }();

    // config object
    var DOBConf = {
        container: '#dob_container',
        DOBApiurl: 'https://data.cityofnewyork.us/resource/rvhx-8trz.json',
        maxRows: 1000
    };

    // load the module
    document.addEventListener("DOMContentLoaded", function () {

        new DOB(DOBConf);
    });
});