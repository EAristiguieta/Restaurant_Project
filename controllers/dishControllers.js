const connection = require("../config/db");

class DishControllers {
  showAllDishes = (req, res) => {
    let sql = `SELECT * FROM dish WHERE dish_isdeleted = 0`;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.render("AllDishes", { result });
    });
  };

  //abre el formulario de creacion de platos al qu ele manadmos el id de restaurante

  viewCreateDish = (req, res) => {
    let id = req.params.id;
    res.render("formDish", { restaurant_id: id });
  };

  //recoge los datos y guarda en bd

  createDish = (req, res) => {
    let id = req.params.id;
    const { dish_name, dish_description } = req.body;
    console.log(req.body);
    console.log(id);
    console.log(req.file);

    let sql = `INSERT INTO dish (dish_name,dish_description, restaurant_id) VALUES ("${dish_name}", "${dish_description}", "${id}") `;

    if (req.file != undefined) {
      let img = req.file.filename;
      sql = `INSERT INTO dish (dish_name,dish_description, restaurant_id, dish_img) VALUES ("${dish_name}", "${dish_description}", "${id}", "${img}") `;
    }

    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.redirect(`/restaurant/oneRestaurant/${id}`);
    });
  };

  totalDelete = (req, res) => {
    let { id, restaurant_id } = req.params;
    let sql = `DELETE FROM dish WHERE dish_id = ${id} `;

    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.redirect(`/restaurant/oneRestaurant/${restaurant_id}`);
    });
  };

  showEditDish = (req, res) => {
    let id = req.params.id;
    let sql = `SELECT * FROM dish WHERE dish_id = ${id} and dish_isdeleted = 0`;

    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.render("editFormDish", {result});
    });
  };

  editDish = (req, res) => {
    let { id, restaurant_id } = req.params;
    const { dish_name, dish_description } = req.body;
    let sql = `UPDATE dish SET dish_name ="${dish_name}", dish_description = "${dish_description}" WHERE dish_id = ${id}`;

    if (req.file != undefined) {
      let img = req.file.filename;
      sql = `UPDATE dish SET dish_name ="${dish_name}", dish_description = "${dish_description}",  dish_img = "${img}" WHERE dish_id = ${id} `;
    }

    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.redirect(`/restaurant/oneRestaurant/${restaurant_id}`);
    });
  };
}

module.exports = new DishControllers();
