# DOBapps
DOB applications

In this code i have implemented the following logic

1- read the latest data from the NYC DOB API server and store it to DB

2- read the Data from DB

3- clean up the table header names from extra character like '_'

4- create a table with the content

5- apply pagination package on the table

6- fix and update the styles


JS code :
code is written in ES6 and transpiled using babel.
I have used UMD standard to bring the AMD and CJS standards as well as normal script tag.

Libraries :
 jQuery for loading the ajax requests
 datatable jQuery package for pagination of the printed table.

Database :
  the Firebase is serving as Web database here. We also have the option to
  store the latest updates on DOB API on fire base database.
  Then the code  sends http request to firebase and gets the data

  About the libraries and frameworks:
  If we want to use this as component on existing site which does not
  use any MVC framework like Angular or a V frame work like React,
  That additional code will increase the load and does not provide any
  reusable component.


  Also, this code does not require two-way data binding.
  If I have the chance to recreate a website and use this as part of view, my choice would be React.
  Simpler API, easier debugging and and it only gives V.

  picking a frame work is not a personal preference.The whole project and team members should get to that point.