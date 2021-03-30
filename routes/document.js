var express = require('express');
var router = express.Router();
var db = require('../models');


/* GET users listing. */
router.get('/', function (req, res, next) {
    const promotion = req.query.promotion;
    const typeDocument = req.query.document;
    db.document.findAll({
        where: {
            promotion: promotion,
            typeDocument: typeDocument
        }
    }).then(document => res.send(document));
});

module.exports = router;
