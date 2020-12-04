var Bicicleta = require('../../models/bicicleta')

exports.bicicleta_list = function(req, res){
    Bicicleta.allBicis(function(err, bicicletas){
        res.status(200).json({
            bicicletas: bicicletas
        });
    });
}

exports.bicicleta_create = function(req, res){
    var bici = new Bicicleta({code: req.body.id, color: req.body.color, modelo: req.body.modelo, ubicacion: [req.body.lat, req.body.lng]});

    Bicicleta.add(bici);

    res.status(200).json({
        bicicleta: bici
    });
}

exports.bicicleta_delete = function(req, res){
    Bicicleta.removeByCode(req.body.id, function() {
        res.status(204).send();
    });
}

exports.bicicleta_update = function(req, res){
    var nuevaBici = {
        code: req.body.id,
        color: req.body.color,
        modelo: req.body.modelo,
        ubicacion: [req.body.lat, req.body.lng]
    };
    var bici = Bicicleta.findOneAndUpdate({code: req.body.id}, nuevaBici, function() {
        res.status(200).json({
            bicicleta: nuevaBici
        });
    });  
}

/*
exports.bicicleta_list = function(req, res) {
    res.status(200).json({
        bicicletas: Bicicleta.allBicis
    })
}

exports.bicicleta_create = function(req, res) {
    var bici = new Bicicleta(req.body.id, req.body.color, req.body.modelo);
    bici.ubicacion = [req.body.lat, req.body.lng];
    Bicicleta.add(bici);

    res.status(200).json({
        bicicleta: bici
    })
}

exports.bicicleta_update = function(req, res) {
    var bici = Bicicleta.findById(req.body.id);
    bici.id = req.body.id;
    bici.color = req.body.color;
    bici.modelo = req.body.modelo;
    bici.ubicacion = [req.body.lat, req.body.lng];

    res.status(200).json({
        bicicleta: bici
    })
}

exports.bicicleta_delete = function(req, res) {
    Bicicleta.removeById(req.body.id);

    res.status(204).send();
}
*/