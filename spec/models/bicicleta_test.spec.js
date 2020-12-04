var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');
var server = require('../../bin/www'); //Para Mongoose


describe('Testing Bicicletas', function() {

    afterEach(function(done) {
        Bicicleta.deleteMany({}, function(err, success){
            if (err) console.log(err);
            done();
        });
        
    });

    describe('Bicicleta.createInstance',() => {
        it('crea una instancia de Bicicleta', () => {
            var bici = Bicicleta.createInstance(1, "verde", "urbana", [-34.5, -54.1]);

            expect(bici.code).toBe(1);
            expect(bici.color).toBe("verde");
            expect(bici.modelo).toBe("urbana");
            expect(bici.ubicacion[0]).toBe(-34.5);
            expect(bici.ubicacion[1]).toBe(-54.1);
        });
    });

    describe('Bicicleta.allBicis', () => {
        it('comienza vacia', (done) => {
            Bicicleta.allBicis(function(err, bicis){
                expect(bicis.length).toBe(0);
                done();
            });
        });
    });

    describe('Bicicleta.add', () => {
        it('agrega solo una bici', (done) => {
            var aBici = new Bicicleta({code: 1, color: "verde", modelo: "urbana", ubicacion: [-34, -54]});
            Bicicleta.add(aBici, function(err, newBici){
                if (err) console.log(err);
                Bicicleta.allBicis(function(err, bicis){
                    expect(bicis.length).toEqual(1);
                    expect(bicis[0].code).toEqual(aBici.code);
                    expect(bicis[0].color).toEqual(aBici.color);
                    expect(bicis[0].modelo).toEqual(aBici.modelo);
                    expect(bicis[0].ubicacion[0]).toEqual(aBici.ubicacion[0]);
                    expect(bicis[0].ubicacion[1]).toEqual(aBici.ubicacion[1]);

                    done();
                });
            });
        });
    });

    describe('Bicicleta.findByCode', () => {
        it('debe devolver la bici con code 1', (done) => {
            Bicicleta.allBicis(function(err, bicis){
                expect(bicis.length).toBe(0);

                var aBici = new Bicicleta({code: 1, color: "verde", modelo: "urbana", ubicacion: [-34, -54]});
                var aBici2 = new Bicicleta({code: 1, color: "rojo", modelo: "montaña", ubicacion: [-35, -55]});

                Bicicleta.add(aBici, function(err, newBici){
                    if (err) console.log(err);

                    Bicicleta.add(aBici2, function(err, newBici){
                        if (err) console.log(err);
                        
                        Bicicleta.findByCode(1, function (error, targetBici){
                            expect(targetBici.code).toBe(aBici.code);
                            expect(targetBici.color).toEqual(aBici.color);
                            expect(targetBici.modelo).toEqual(aBici.modelo);
                            expect(targetBici.ubicacion[0]).toEqual(aBici.ubicacion[0]);
                            expect(targetBici.ubicacion[1]).toEqual(aBici.ubicacion[1]);

                            done();
                        });
                    });
                });
            });
        });
    });

    describe('Bicicleta.removeByCode', () => {
        it('debe borrar la bici con code 1', (done) => {
            Bicicleta.allBicis(function(err, bicis){
                expect(bicis.length).toBe(0);

                var aBici = new Bicicleta({code: 1, color: "verde", modelo: "urbana", ubicacion: [-34, -54]});
                Bicicleta.add(aBici, function(err, newBici){
                    if (err) console.log(err);

                    Bicicleta.add(aBici, function(err, newBici){
                        if (err) console.log(err);
                        Bicicleta.allBicis(function(err, bicis){
                            expect(bicis.length).toBe(1);
                            Bicicleta.removeByCode(1, function(error, response) {
                                Bicicleta.allBicis(function(err, bicis){
                                    expect(bicis.length).toBe(0);
                                    done();
                                });
                            });
                        });
                    });
                });
            });
        });
    });

});


/*
beforeEach(() => {Bicicleta.allBicis = []; });

describe("Bicicleta.allBicis", () => {
    it("comienza vacio", () => {
        expect(Bicicleta.allBicis.length).toBe(0);
    });
   });

describe('Bicicleta.add', () => {
    it('agregamos una', () => {
        expect(Bicicleta.allBicis.length).toBe(0);

        var a = new Bicicleta(1, 'rojo', 'urbana', [-34.595468652955745, -58.49412732998029]);
        Bicicleta.add(a);

        expect(Bicicleta.allBicis.length).toBe(1);
        expect(Bicicleta.allBicis[0]).toBe(a);
    });
});


describe('Bicicleta.FindById', ()=> {
    it('debe devolver la bici con id 1', () => {
        expect(Bicicleta.allBicis.length).toBe(0);
        var aBici = new Bicicleta(1, 'verde', 'urbana');
        var aBici2 = new Bicicleta(2, 'blanca', 'montaña');
        Bicicleta.add(aBici);
        Bicicleta.add(aBici2);

        var targetBici = Bicicleta.findById(1);

        expect(targetBici.id).toBe(1);
        expect(targetBici.color).toBe(aBici.color);
        expect(targetBici.modelo).toBe(aBici.modelo);
    });
});

describe('Bicicleta.removeById', () => {
    it('debe eliminar la bici con el id 1', () => {
        expect(Bicicleta.allBicis.length).toBe(0);
        var aBici = new Bicicleta(1, 'verde', 'urbana');
        var aBici2 = new Bicicleta(2, 'blanca', 'montaña');
        Bicicleta.add(aBici);
        Bicicleta.add(aBici2);

        Bicicleta.removeById(1);

        expect(Bicicleta.allBicis.length).toBe(1);
        expect(Bicicleta.allBicis[0]).toBe(aBici2);
    });
});
*/
