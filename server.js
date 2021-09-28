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

app.get('/pokemon/new', (req, res) => {
    res.render("new.ejs")
    console.log("You're a Poke-God! Create at will - the world is your Cloyster.")
  });

app.put("/pokemon/:id", (req, res) => {
    pokemon[req.params.id] = req.body
    res.redirect("/pokemon")
    console.log(`Put your update for ${pokemon[req.params.id].name} in the Pokedex!`)
    });

app.post("/pokemon", (req, res) => {
    req.body.img = req.body.img + ".png"
    let idVerify = pokemon.slice(-1)
    req.body.id = idVerify.id + 1
    pokemon.push(req.body)
    res.redirect("/pokemon")
    console.log(`Posted ${req.body.name} to the Pokedex with an ID of ${req.body.id}!`)
    });

app.get('/pokemon/:id/edit', (req, res) => {
    res.render("edit.ejs", {pokemonEdit: pokemon[req.params.id]})
    let editKey = req.params.id
    console.log(`Edit info and attributes for ${pokemon[req.params.id].name}. Changes will be saved to the Pokedex.`)
  });

app.get('/pokemon/:id', (req, res) => {
    res.render("show.ejs", {pokemonShow: pokemon[req.params.id]})
    console.log(`Welcome to the Pokedex's ${pokemon[req.params.id].name} Info Page.`)
  });

app.listen(Port, () => {
    console.log("Gotta catch 'em all...or at least some of them...");
});