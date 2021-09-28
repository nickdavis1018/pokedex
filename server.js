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
