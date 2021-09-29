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

for(let i=0; i < pokemon.length; i++){
  pokemon[i].id = Number(pokemon[i].id)
  pokemon[i].stats.hp = Number(pokemon[i].stats.hp)
  pokemon[i].stats.attack = Number(pokemon[i].stats.attack)
  pokemon[i].stats.defense = Number(pokemon[i].stats.defense)
  pokemon[i].stats.spattack = Number(pokemon[i].stats.spattack)
  pokemon[i].stats.spdefense = Number(pokemon[i].stats.spdefense)
  pokemon[i].stats.speed = Number(pokemon[i].stats.speed)
  pokemon[i].damages.normal = Number(pokemon[i].damages.normal)
  pokemon[i].damages.fire = Number(pokemon[i].damages.fire)
  pokemon[i].damages.water = Number(pokemon[i].damages.water)
  pokemon[i].damages.electric = Number(pokemon[i].damages.electric)
  pokemon[i].damages.grass = Number(pokemon[i].damages.grass)
  pokemon[i].damages.ice = Number(pokemon[i].damages.ice)
  pokemon[i].damages.fight = Number(pokemon[i].damages.fight)
  pokemon[i].damages.poison = Number(pokemon[i].damages.poison)
  pokemon[i].damages.ground = Number(pokemon[i].damages.ground)
  pokemon[i].damages.flying = Number(pokemon[i].damages.flying)
  pokemon[i].damages.psychic = Number(pokemon[i].damages.psychic)
  pokemon[i].damages.bug = Number(pokemon[i].damages.bug)
  pokemon[i].damages.rock = Number(pokemon[i].damages.rock)
  pokemon[i].damages.ghost = Number(pokemon[i].damages.ghost)
  pokemon[i].damages.dragon = Number(pokemon[i].damages.dragon)
  pokemon[i].damages.dark = Number(pokemon[i].damages.dark)
  pokemon[i].damages.steel = Number(pokemon[i].damages.steel)
}

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

app.delete('/pokemon/:id', (req, res) => {
  console.log(`RIP. The Pokedex will miss you.`)
  pokemon.splice(req.params.id, 1);
  res.redirect('/pokemon'); 
  });

app.put("/pokemon/:id", (req, res) => {
    if(pokemon[req.params.id].img === ""){
      pokemon = "https://imgur.com/UFvoWQa.png"
    }
    else{
      pokemon[req.params.id].img = req.body.img}
      pokemon[req.params.id].name = req.body.name
      pokemon[req.params.id].id = req.body.id
      pokemon[req.params.id].misc.classification = req.body.classification
      pokemon[req.params.id].stats.hp = req.body.hp
      pokemon[req.params.id].stats.attack = req.body.attack
      pokemon[req.params.id].stats.defense = req.body.defense
      pokemon[req.params.id].stats.spattack = req.body.spattack
      pokemon[req.params.id].stats.spdefense = req.body.spdefense
      pokemon[req.params.id].stats.speed = req.body.speed
      pokemon[req.params.id].type = [req.body.type1, req.body.type2, req.body.type3]
      pokemon[req.params.id].damages.normal = Math.ceil(req.body.normal / 0.25) * 0.25
      pokemon[req.params.id].damages.fire = Math.ceil(req.body.fire / 0.25) * 0.25
      pokemon[req.params.id].damages.water = Math.ceil(req.body.water / 0.25) * 0.25
      pokemon[req.params.id].damages.electric = Math.ceil(req.body.electric / 0.25) * 0.25
      pokemon[req.params.id].damages.grass = Math.ceil(req.body.grass / 0.25) * 0.25
      pokemon[req.params.id].damages.ice = Math.ceil(req.body.ice / 0.25) * 0.25
      pokemon[req.params.id].damages.fight = Math.ceil(req.body.fight / 0.25) * 0.25
      pokemon[req.params.id].damages.poison = Math.ceil(req.body.poison / 0.25) * 0.25
      pokemon[req.params.id].damages.ground = Math.ceil(req.body.ground / 0.25) * 0.25
      pokemon[req.params.id].damages.flying = Math.ceil(req.body.flying / 0.25) * 0.25
      pokemon[req.params.id].damages.psychic = Math.ceil(req.body.psychic / 0.25) * 0.25
      pokemon[req.params.id].damages.bug = Math.ceil(req.body.bug / 0.25) * 0.25
      pokemon[req.params.id].damages.rock = Math.ceil(req.body.rock / 0.25) * 0.25
      pokemon[req.params.id].damages.ghost = Math.ceil(req.body.ghost / 0.25) * 0.25
      pokemon[req.params.id].damages.dragon = Math.ceil(req.body.dragon / 0.25) * 0.25
      pokemon[req.params.id].damages.dark = Math.ceil(req.body.dark / 0.25) * 0.25
      pokemon[req.params.id].damages.steel = Math.ceil(req.body.steel / 0.25) * 0.25
    res.redirect("/pokemon")
    console.log(`We put your update for ${pokemon[req.params.id].name} in the Pokedex!`)
    });

app.post("/pokemon", (req, res) => {
  console.log(`Posted ${req.body.name} to the Pokedex with an ID of ${pokemon.length + 1}!`)
    if(req.body.img === ""){
      req.body.img = "https://imgur.com/UFvoWQa.png"
    }
    else{
      req.body.img = req.body.img + ".png"}
      req.body.id = pokemon.length + 1
      req.body.misc = {}
      req.body.misc.classification = req.body.classification
      delete req.body.classification
      req.body.stats = {}
      req.body.stats.hp = req.body.hp
      delete req.body.hp
      req.body.stats.attack = req.body.attack
      delete req.body.attack
      req.body.stats.defense = req.body.defense
      delete req.body.defense
      req.body.stats.spattack = req.body.spattack
      delete req.body.spattack
      req.body.stats.spdefense = req.body.spdefense
      delete req.body.spdefense
      req.body.stats.speed = req.body.speed
      delete req.body.speed
      req.body.type = [req.body.type1, req.body.type2, req.body.type3]
      delete req.body.type1 
      delete req.body.type2 
      delete req.body.type3
      req.body.damages = {}
      req.body.damages.normal = Math.ceil(req.body.normal / 0.25) * 0.25
      delete req.body.normal
      req.body.damages.fire = Math.ceil(req.body.fire / 0.25) * 0.25
      delete req.body.fire
      req.body.damages.water = Math.ceil(req.body.water / 0.25) * 0.25
      delete req.body.water
      req.body.damages.electric = Math.ceil(req.body.electric / 0.25) * 0.25
      delete req.body.electric
      req.body.damages.grass = Math.ceil(req.body.grass / 0.25) * 0.25
      delete req.body.grass
      req.body.damages.ice = Math.ceil(req.body.ice / 0.25) * 0.25
      delete req.body.ice
      req.body.damages.fight = Math.ceil(req.body.fight / 0.25) * 0.25
      delete req.body.fight
      req.body.damages.poison = Math.ceil(req.body.poison / 0.25) * 0.25
      delete req.body.poison
      req.body.damages.ground = Math.ceil(req.body.ground / 0.25) * 0.25
      delete req.body.ground
      req.body.damages.flying = Math.ceil(req.body.flying / 0.25) * 0.25
      delete req.body.flying
      req.body.damages.psychic = Math.ceil(req.body.psychic / 0.25) * 0.25
      delete req.body.psychic
      req.body.damages.bug = Math.ceil(req.body.bug / 0.25) * 0.25
      delete req.body.bug
      req.body.damages.rock = Math.ceil(req.body.rock / 0.25) * 0.25
      delete req.body.rock
      req.body.damages.ghost = Math.ceil(req.body.ghost / 0.25) * 0.25
      delete req.body.ghost
      req.body.damages.dragon = Math.ceil(req.body.dragon / 0.25) * 0.25
      delete req.body.dragon
      req.body.damages.dark = Math.ceil(req.body.dark / 0.25) * 0.25
      delete req.body.dark
      req.body.damages.steel = Math.ceil(req.body.steel / 0.25) * 0.25
      delete req.body.steel
      pokemon.push(req.body)
      res.redirect("/pokemon")
      });

app.get('/pokemon/:id/edit', (req, res) => {
    res.render("edit.ejs", {pokemonEdit: pokemon[req.params.id], editKey: req.params.id})
    console.log(`Edit info and attributes for ${pokemon[req.params.id].name}. Changes will be saved to the Pokedex.`)
  });

app.get('/pokemon/:id', (req, res) => {
    res.render("show.ejs", {pokemonShow: pokemon[req.params.id]})
    console.log(`Welcome to the Pokedex's ${pokemon[req.params.id].name} Info Page.`)
  });

app.listen(Port, () => {
    console.log("Gotta catch 'em all...or at least some of them...");
});