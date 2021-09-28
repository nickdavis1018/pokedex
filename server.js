const express = require('express');
const app = express();
const methodOverride = require('method-override')
const pokemon = require('./models/pokemon.js')
const Port = 3000

// START MIDDLEWARE //
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static("public"))
app.use(methodOverride('_method'))
// END MIDDLEWARE //

app.get('/', (req, res) => {
    res.send("<html>Welcome to the Pokedex Server. You are being re-directed...<script>window.location.href = 'http://localhost:3000/pokemon'</script></html>")
    console.log("Redirecting to http://localhost:3000/pokemon")
  });

app.get('/pokemon', (req, res) => {
    res.render("index.ejs", {pokemonIndex: pokemon})
    console.log("Welcome to the Master Pokedex.")
  });

app.listen(Port, () => {
    console.log("Gotta catch 'em all...or at least some of them...");
});