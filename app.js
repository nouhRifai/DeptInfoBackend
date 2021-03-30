const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const db = require('./models');
const document = require('./models/document');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var documentRouter = require('./routes/document');
var uploadRouter = require('./routes/upload');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(fileUpload());
app.use('/public', express.static(__dirname + '/public'));

db.sequelize.sync().then(() => {
    app.listen(8081);
});

app.use(express.static('public'));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/document', documentRouter);
// app.use('/upload', uploadRouter);

app.post('/upload', (req, res, next) => {
    console.log(req);
    let imageFile = req.files.file;

    imageFile.mv(`public/documents__tableau__affichage/${req.body.titre}.pdf`, function (err) {
        if (err) {
            return res.status(500).send(err);
        }
        const promotions = JSON.parse(req.body.promotions).filter((promotion) => promotion.isChecked === true);
        promotions.forEach((promotion) => {
            db.document.create({
                typeDocument: req.body.typeDocument,
                titre: req.body.titre,
                url: `public/documents__tableau__affichage/${req.body.titre}.pdf`,
                promotion: promotion.value,
            }).then(submittedDocument => console.log(submittedDocument));
        });

        res.json({file: `public/documents__tableau__affichage/${req.body.titre}.pdf`});
    });

});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

