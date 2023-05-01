const express = require('express');
const app = express();

/** Decode JSON data */
app.use(express.json());

/** Show page with a input field, button and javascript */
app.get('/', (req, res, next) => {
  res.send(`<script src="https://cdn.jsdelivr.net/npm/@codexteam/ajax"></script>

<script>
var send = function() {
  var username = document.getElementById('username').value;
  
  ajax.post({
    url: '/',
    data: {
      username: username
    },
  })
    .then(response => {
      console.log(response.body)
    })
    .catch(console.error);
}
</script>

<input type="text" name="username" placeholder="username" id="username">
<button onclick="send()">Send</button>`);
});

/** Process POST request */
app.post('/', function (req, res, next) {
  res.send(JSON.stringify(req.body));
});

/** Run the app */
app.listen(3000);