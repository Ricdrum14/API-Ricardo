

module.exports = app => {
    const pollution = require("../controllers/pollution.controllers.js");
  
    var router = require("express").Router();
  

   
    router.get("/", pollution.getAll); // Retrieve all pollution entries
    router.get("/:id", pollution.getOne);// Retrieve a single pollution entry by id
  
    app.use('/api/pollution', router);// Prefix all routes with /api/pollution
  };
