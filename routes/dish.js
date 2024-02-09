var express = require('express');
const router = express.Router();
const multer = require ("../middlewares/multer")


const dishControllers = require ("../controllers/dishControllers")


//entrada localhost:3000/dish
router.get('/', dishControllers.showAllDishes);




//abre el formulario de la creacion del plato

router.get('/createDish/:id', dishControllers.viewCreateDish);


// recoge los datos del palto y recupera de params el id de restaurante

router.post('/createDish/:id',multer("dishes"), dishControllers.createDish);

//borrado total


router.get("/deleteDish/:id/:restaurant_id",dishControllers.totalDelete)


//formulario de edicion platos



//recoge los datos del formulario para guardar en db
router.post("/editDish/:id/:restaurant_id", multer("dishes"),dishControllers.editDish)



//abre el formulario de edición de un plato
//localhost:3000/dish/editDish/1
router.get("/editDish/:id/:restaurant_id", dishControllers.showEditDish)







module.exports = router;