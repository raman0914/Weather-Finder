const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({
  extended:true
}));


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req, res) {

  console.log("post request recieved.")

  const querry = req.body.city;
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + querry + "&appid=d1fc3b952c8bec0be9b7f726fa87846a&units=metric"

  https.get(url, function(response) {
    console.log(response.statusCode)

    response.on("data", function(data) {
      const weatherData = JSON.parse(data)
      const weather = weatherData.weather[0].main
      const temp = weatherData.main.temp
      res.write("<h1>FORECAST</h1>")
      res.write("The weather forcast in " + querry + " :<em> " + weather + "</em> with temp " + temp+" degree celcius")
      res.send();

    })
  })

})


app.listen(3000, function() {
  console.log("server is working");
});
