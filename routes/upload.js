var express = require('express');
var router = express.Router();


router.post('/upload', (req, res) => {
    console.log(req);
    let imageFile = req.files.file;

    imageFile.mv(`./public/documents__tableau__affichage/${req.body.filename}.pdf`, function (err) {
        if (err) {
            return res.status(500).send(err);
        }

        res.json({file: `./public/documents__tableau__affichage/${req.body.filename}.pdf`});
    });

});


module.exports = router;
