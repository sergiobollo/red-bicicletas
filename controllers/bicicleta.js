var Bicicleta = require('../models/bicicleta');

exports.bicicleta_list = function(req, res){
    Bicicleta.allBicis(function(err, bicicletas){
        res.render('bicicletas/index', {bicis: bicicletas});
    });
}

exports.bicicleta_create_get = function(req, res) {
    res.render('bicicletas/create');
}

exports.bicicleta_create_post = function(req, res) {
    var bici = new Bicicleta({code: req.body.id, color: req.body.color, modelo: req.body.modelo, ubicacion: [req.body.lat, req.body.lng]});
    Bicicleta.add(bici);

    res.redirect('/bicicletas/');
}

exports.bicicleta_update_get = function(req, res) {
    var bici = Bicicleta.findByCode(req.params.id);

    res.render('bicicletas/update', {bici});
}

exports.bicicleta_update_post = function(req, res) {
    var bici = Bicicleta.findByCode(req.params.id);
    bici.id = req.body.id;
    bici.color = req.body.color;
    bici.modelo = req.body.modelo;
    bici.ubicacion = [req.body.lat, req.body.lng];

    res.redirect('/bicicletas/');
}

exports.bicicleta_delete_post = function(req, res) {
    Bicicleta.removeByCode(req.body.id);

    res.redirect('/bicicletas/');
}


exports.bicicleta = function(req, res){
    var bici = Bicicleta.findByCode(req.params.id);
    console.log(bici.obj)
    res.render('bicicletas/bicicleta', {bici});
}