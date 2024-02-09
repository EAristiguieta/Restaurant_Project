const bcrypt = require("bcrypt");

const connection = require("../config/db");

class RestaurantControllers {
  //tods mis restaurantes

  showAllRestaurant = (req, res) => {
    let sql = "SELECT * FROM restaurant WHERE restaurant_isdeleted = 0";

    connection.query(sql, (err, result) => {
      if (err) throw err;

      res.render("allRestaurants", { result });
    });
  };

  //abre la vista de formulario register
  restaurantRegister = (req, res) => {
    res.render("registerForm");
  };

  // recoge los datos del formulario restaurant y crea uno en bd

  createRestaurant = (req, res) => {
    console.log(req.body);
    const { restaurant_name, style, email, password, password2 } = req.body;

    if (
      restaurant_name === "" ||
      style === "" ||
      email === "" ||
      password === ""
    ) {
      return res.render("registerForm", {
        message: "Rellene todos los datos",
      });
    }

    if (password !== password2) {
      return res.render("registerForm", {
        message: "Las contraseñas no coinciden",
      });
    }

    //encriptacion

    bcrypt.hash(password, 10, function (err, hash) {
      if (err) throw err;
      let sql = `INSERT INTO restaurant (restaurant_name, style,email,password,restaurant_img) VALUES ("${restaurant_name}", "${style}","${email}", "${hash}", "user.png")`;

      if (req.file != undefined) {
        let img = req.file.filename;
        sql = `INSERT INTO restaurant (restaurant_name,style,email,password, restaurant_img) VALUES ("${restaurant_name}", "${style}", "${email}", "${hash}","${img}")`;
      }

      connection.query(sql, (err, result) => {
        if (err) {
          if (err.errno == 1062) {
            return res.render("registerForm", {
              message: "El email ya existe en la aplicación",
            });
          } else {
            throw err;
          }
        }
        res.redirect("/restaurant");
      });
    });
  };
//facil pero rendimiento bajo


  viewOneRestaurant = (req, res) => {
    let id = req.params.id;
    let sql = `SELECT * FROM restaurant WHERE restaurant_id = ${id} AND restaurant_isdeleted = 0`;
    let sql_dish = `SELECT * FROM dish WHERE restaurant_id = ${id}`;


    connection.query(sql, (err, result) => {
      if (err) throw err;
      connection.query(sql_dish, (err_dish, result_dish)=>{
        if (err_dish) throw err_dish;
        console.log("restaurant",result);
        console.log("dish",result_dish);
        res.render("oneRestaurant", {result, result_dish});

      })
     
    });
  };

  showEditRestaurant = (req, res) => {
    let id = req.params.id;
    let sql = `SELECT * FROM restaurant WHERE restaurant_id = ${id} and restaurant_isdeleted = 0`;

    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.render("editFormRestaurant", { result });
    });
  };

  editRestaurant = (req, res) => {
    let id = req.params.id;
    const { restaurant_name, style,restaurant_description } = req.body;
    let sql = `UPDATE restaurant SET restaurant_name ="${restaurant_name}", style = "${style}", restaurant_description = "${restaurant_description}" WHERE restaurant_id = ${id}`;

    if (req.file != undefined) {
      let img = req.file.filename;
      sql = `UPDATE restaurant SET restaurant_name ="${restaurant_name}", style = "${style}", restaurant_description = "${restaurant_description}",  restaurant_img = "${img}" WHERE restaurant_id = ${id} `;
    }

    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.redirect(`/restaurant/oneRestaurant/${id}`);
    });
  };

  viewLogin = (req, res) => {
    res.render("formLogin");
  };

  login = (req, res) => {
    const { email, password } = req.body;

    let sql = `SELECT * FROM restaurant WHERE email = "${email}"`;

    connection.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);

      if (result.length == 1) {
        let hash = result[0].password;
        bcrypt.compare(password, hash, (err, resultCompare) => {
          if (err) throw err;
          // if(resultCompare == true){
          if (resultCompare) {
            res.redirect(`/restaurant/oneRestaurant/${result[0].restaurant_id}`);
          } else {
            res.render("formLogin", { message: "password incorrecta" });
          }
        });
      } else {
        return res.render("formLogin", { message: "Este email no existe" });
      }
    });

    ///verificar si el restaurante esta en bd
  };
}

module.exports = new RestaurantControllers();
