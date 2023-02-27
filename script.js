var nestImgNms = {
  "200603160007": "S8107RF140708101_200603160007_00.jpg",
  "200602160007": "S8107RF140708101_200602160007_00.jpg",
  "200518160007": "S8107RF140708101_200518160007_00.jpg",
  "200530160007": "S8107RF140708101_200530160007_00.jpg",
  "200520160007": "S8107RF140708101_200520160007_00.jpg",
  "200516160007": "S8107RF140708101_200516160007_00.jpg",
  "200531160007": "S8107RF140708101_200531160007_00.jpg",
  "200517160007": "S8107RF140708101_200517160007_00.jpg",
  "200525160007": "S8107RF140708101_200525160007_00.jpg",
  "200605160007": "S8107RF140708101_200605160007_00.jpg",
  "200524160007": "S8107RF140708101_200524160007_00.jpg",
  "200521160007": "S8107RF140708101_200521160007_00.jpg",
  "200523160007": "S8107RF140708101_200523160007_00.jpg",
  "200519160007": "S8107RF140708101_200519160007_00.jpg",
  "200519210007": "S8107RF140708101_200519210007_00.jpg",
  "200522160007": "S8107RF140708101_200522160007_00.jpg",
  "200529160007": "S8107RF140708101_200529160007_00.jpg",
  "200526160007": "S8107RF140708101_200526160007_00.jpg",
  "200527160007": "S8107RF140708101_200527160007_00.jpg",
  "200606160007": "S8107RF140708101_200606160007_00.jpg",
  "200601160007": "S8107RF140708101_200601160007_00.jpg",
  "200528160007": "S8107RF140708101_200528160007_00.jpg",
  "200604160007": "S8107RF140708101_200604160007_00.jpg"
};
var nestImgKeys = ["200603160007", "200602160007", "200518160007", "200530160007", "200520160007", "200516160007", "200531160007", "200517160007", "200525160007", "200605160007", "200524160007", "200521160007", "200523160007", "200519160007", "200519210007", "200522160007", "200529160007", "200526160007", "200527160007", "200606160007", "200601160007", "200528160007", "200604160007"];

function convertDateFormat(dateStr) {
  dateStr = dateStr.toString(); // convert input to string
  var date = new Date(dateStr);
  var year = date.getFullYear().toString().slice(-2);
  var month = ('0' + (date.getMonth() + 1)).slice(-2);
  var day = ('0' + date.getDate()).slice(-2);
  var hours = ('0' + date.getHours()).slice(-2);
  var minutes = ('0' + date.getMinutes()).slice(-2);
  var seconds = ('0' + date.getSeconds()).slice(-2);
  return year + month + day + hours + minutes + seconds;
}


Promise.all([
  loadData(
    "data.json"
  ),
  loadData(
    "schema.json"
  )
]).then((res) => {
  const data = res[0];
  const schema = res[1];
console.log(data);
console.log(schema);
  const dataStore = new FusionCharts.DataStore(data, schema);

  new FusionCharts({
    type: "timeseries",
    renderAt: "container",
    width: "150%",
    height: "780",
    dataSource: {
      caption: {
        text: "Black-Capped Chickadee"
      },

      yAxis: [
        {
          plot: {
            value: "Barometer",
            type: "line"
          },

        },
        {
          plot: {
            value: "Humidity (%)",
            type: "line"
          }
        },
        {
          plot: {
            value: "Temperature (degC)",
            type: "line"
          }
        },
        {
          plot: {
            value: "Light",
            type: "line"
          }
        },
        {
          plot: {
            value: "Motion (secs per min of motion)",
            type: "column"
          }
        }
      ],

      data: dataStore.getDataTable()
    },
    events: {
      dataPlotRollOut: function (eventObj, dataObj) {
        //console.log("event object is", eventObj);
        //console.log("data object is", dataObj);
        var dataPlotvalue = dataObj.binValue;

        var x = document.getElementById("divdataPlotRollOut");
        document.getElementById("divdataPlotRollOut").style.display = "block";
        var y = document.getElementById("thumb");
        //console.log(dataObj.startText);
        /////////////////////////
        var pthPrefix = 'NestImgs/';
        var sDate = convertDateFormat(dataObj.startText);
        var eDate = convertDateFormat(dataObj.endText);
        //console.log(sDate);
        //console.log(eDate);
        let imgKeys = nestImgKeys.filter(val => (val >= sDate && val < eDate));
        if (imgKeys.length > 0) {
          console.log("common date found at "+sDate);
          var mainImg = (pthPrefix + nestImgNms[imgKeys[0]]);
          var nestImg = document.getElementById('nestImg');
          nestImg.addEventListener('load', function () {
            nestImg.style.display = 'block';
          });
          nestImg.src = mainImg;
        }
        /*var mainImg = (pthPrefix + nestImgNms[imgKeys[0]]);
        var nestImg = document.getElementById('nestImg');
            nestImg.addEventListener('load', function() {
              nestImg.style.display = 'block';
            });
            nestImg.src = mainImg;
      
            
          }*/
        ////////////////////////





        if (dataObj.startText)
          if (x.innerHTML) {
            x.innerHTML =
              "The average value from " +
              dataObj.startText +
              " to " +
              dataObj.endText +
              " is " +
              dataPlotvalue.toFixed(2);
            x.style.color = random_color();
          }
        //let sDate = 
        //let eDate = 
        //let imgKeys = nestImgKeys.filter(val => (val >= sDate && val < eDate) ); 
        //console.log(dataObj.startText);
        //console.log(dataObj.endText);
        //console.log(imgKeys);
        /*setTimeout(function (eventObj, dataObj) {
          document.getElementById("divdataPlotRollOut").style.display = "none";
        }, 4000);*/
      }
    }
  }).render();

  function random_color() {
    var colors = document.getElementById("divdataPlotRollOut");
    var backColor = colors.style.color;
    colors.style.color = backColor === "black" ? "purple" : "black";
  }
});




//We need an array that points to the name of the image file from the timestamps of the corresponding images 'nestImgNms'
//We need an array that points to the timestamp of each image 'nestImgKeys'

//let imgKeys = nestImgKeys.filter(val => (val >= sdtm && val < edtm) ); 

//if imgKeys is non empty:
  //'mainImg' points to the name of the entire path of the first file in 'imgKeys' array

//update the src of div id="nestImg" and display the image when the page is loaded

//~hardcode nestImgKeys~
//~hardcode nestImgNms~
//var pthPrefix = 'NestImgs/';
//let imgKeys = nestImgKeys.filter(val => (val >= sdtm && val < edtm) ); 
//if(imgKeys.length > 0) {	
/*var mainImg = (pthPrefix + nestImgNms[imgKeys[0]]);
var nestImg = document.getElementById('nestImg');
    nestImg.addEventListener('load', function() {
      nestImg.style.display = 'block';
    });
    nestImg.src = mainImg;

  	
  }*/



//const { Pool } = require('pg');
/*const express = require('express');
const app = express();

// create a PostgreSQL connection pool
const pool = new Pool({
  user: 'mydatabaseuser',
  host: 'localhost',
  database: 'mydatabase',
  password: 'mypassword',
  port: 5432,
});

// define an API endpoint that retrieves data from the database
app.get('/api/mydata', (req, res) => {
  pool.query('SELECT myfield, mydatefield FROM mytable', (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    } else {
      // transform the data as needed
      const transformedData = result.rows.map(row => {
        return {
          field1: row.myfield,
          field2: transformDate(row.mydatefield)
        };
      });

      // send the transformed data as a JSON response
      res.json(transformedData);
    }
  });
});

// start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});*/

// helper function to transform the date field
function transformDate(dateString) {
  const date = new Date(dateString);
  return `${date.getUTCFullYear()}${padZero(date.getUTCMonth() + 1)}${padZero(date.getUTCDate())}${padZero(date.getUTCHours())}${padZero(date.getUTCMinutes())}${padZero(date.getUTCSeconds())}`;
}

// helper function to pad a number with leading zeros
function padZero(num) {
  return String(num).padStart(2, '0');
}

//install dependencies

//create a PostgreSQL connection pool
//The Pool object is created from the pg library, which manages the connections to the database.Once the pool is set up, it can be used to query the database using the query() method. 

//define an API endpoint that retrieves data from the database
  //transform the data and send it forward

  //'get' method on the front end with an HTTP client such as 'axios' to make a request to the API endpoint.Once the data is received, it can be stored in GeoJSON

  