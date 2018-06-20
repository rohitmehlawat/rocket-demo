const config = require('../config/conf');
const expect = require('chai').expect;

describe("Configuration Loader", function(){
    describe("Load dev configuration", function(){
        it("env must configured to dev for dev enviornment", function() {
            var env = config.get('env');
            expect("dev").to.equal(env);
        });
        it("app.port must configured to 3011 for dev enviornment", function() {
            var port = config.get('app.port');
            expect(3011).to.equal(port);
        });
    })
})