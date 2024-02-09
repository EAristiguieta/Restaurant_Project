class IndexControllers {

 viewHome = (req, res, next) =>{
    res.render('index', { title: 'Express' });
  }
  viewAbout = (req, res, next) =>{
    res.send( "estoy en About");
  }


}

module.exports = new IndexControllers;