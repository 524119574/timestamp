var express = require('express');
var app = express();
// create a months object to be used
var months = {
  0: "January",
  1: "Februray",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December"
}


app.get('*', function (req, res) {
  var query = req.url.slice(1, req.url.length + 1);
  if (query === ""){
    // present static html
    res.send('Hello World!')
  }else {
    if (!isNaN(query)){
      var date = new Date(+query);
    }else {
      var date = new Date(decodeURIComponent(query));
    }
    console.log(date);
    if (months[date.getMonth()] === undefined){
      res.end(JSON.stringify({
        unix: null,
        natural: null
      }))
    }else {
      res.end(JSON.stringify({
        unix: date.getTime(),
        naturl: months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear(),
        input: query,
        t:"123"
      }));
    }

  }
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!')
})
