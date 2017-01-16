global.DATABASE_URL = 'mongodb://localhost/b-ballapi';

var chai = require('chai');
var chaiHttp = require('chai-http');

var server = require('../server.js');
var Team = require('../models/team');

var should = chai.should();
var app = server.app;

chai.use(chaiHttp);

describe('b-ballapi', function() {
    
    before(function(done) {
        server.runServer(function() {
            Team.create({name: 'Warriors'},
                        {name: 'Hawks'},
                        {name: 'Knicks'}, function() {
                done();
            });
        });
    });
 it('should list teams on GET', function(done) {
        chai.request(app)
            .get('/team')
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.length(3);
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('name');
                res.body[0]._id.should.be.a('string');
                res.body[0].name.should.be.a('string');
                res.body[0].name.should.equal('Warriors');
                res.body[1].name.should.equal('Hawks');
                res.body[2].name.should.equal('Knicks');
                done();
            });
 });
    after(function(done) {
        Team.remove(function() {
            done();
        });
    });
});
