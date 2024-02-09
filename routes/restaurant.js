var express = require('express');
var router = express.Router();
const restaurantControllers = require ("../controllers/restaurantControllers")
const uploadImage = require("../middlewares/multer")


//entrada localhost:3000/restaurant

// nos ensela todos los restaurantes registrados
//localhost:3000/
router.get('/',restaurantControllers.showAllRestaurant);



// abre la pag con el formulario de registro
//localhost:3000/restaurant/register

router.get('/register',restaurantControllers.restaurantRegister);



// recoge los datos del formulario
//localhost:3000/restaurant/register
router.post('/register', uploadImage("restaurant"),restaurantControllers.createRestaurant);




//abre la pagina de un restaurante determinado con sus platos

//localhost:3000/register/oneRestaurant/1

router.get("/oneRestaurant/:id", restaurantControllers.viewOneRestaurant)


//abre el formulario de edición de un restaurante

//localhost:3000/restaurant/editRestaurant/1

router.get("/editRestaurant/:id", restaurantControllers.showEditRestaurant)


//recoge los datos del formulario para guardar en db

router.post("/editRestaurant/:id",uploadImage("restaurant"), restaurantControllers.editRestaurant)


//abre el formulario de login de los restaurantes

router.get("/login", restaurantControllers.viewLogin)

//recoge la info el formulario de login de los restaurantes
router.post("/login", restaurantControllers.login)

module.exports = router;
