const express = require('express');
const router  = express.Router();
const Movie = require('../models/Movie');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/add-movie', (req, res, next) => {
  res.render('add-movie')
})

router.post('/add-movie', (req, res, next) => {
  let title = req.body.title;
  let director = req.body.director;
  let image = req.body.image;
  let description = req.body.description;

  Movie.create({
    title: title,
    director: director,
    image: image,
    description: description
  })
  .then((response)=>{
    res.redirect('/')
  })
  .catch((err)=>{
    next(err)
  })
})

router.get('/movies', (req, res, next) => {
  Movie.find()
  .then((movies)=>{
    res.render('movies', {movies: movies});
  })
  .catch((err)=>{
    next(err);
  })
})

router.get('/movies/:movieId', (req, res, next) => {
  let id = req.params.movieId;
  Movie.findById(id)
  .then((theMovie)=>{
    res.render('movie', {movie: theMovie})
  })
  .catch((err)=>{
    next(err);
  })
})

module.exports = router;