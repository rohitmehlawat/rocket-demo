const httpMocks = require('node-mocks-http');
const checkAPIParameter = require('../steppers/ApiParameter').checkAPIParameter;

describe('Stepper -> ApiParameter Test', function () {
    context('If TxnTypeIDRef or PaymentModeIDRef present in parameters ->', function () {
        beforeEach(function (done) {
            request = httpMocks.createRequest({
                method: 'POST',

            });
            response = httpMocks.createResponse();
            //response.locals.parameters = 

            done();
        });

        it('validates for correct API parameters is being set by previous Middleware ', function (done) {
            checkAPIParameter(request, response, function next(error) {
                
            });
            console.log(JSON.stringify(response));
        })
    })
})