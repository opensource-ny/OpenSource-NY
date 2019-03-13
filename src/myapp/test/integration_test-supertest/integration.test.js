/* Imitates the front end to test Express API that we have coded */
/* NOTE: This doesn't test the actual code in REACT App.js */

const request = require('supertest');
const app = require('./app');

/* do an example of all the API and test for their returns */

test(
    'should pass integration tests',
    (done) => {
        request(app)
          .get('/')
          .expect(200, 'Hello World!')
          .end(
              (err) => {
                if(err) throw done(err);
                done();
              }
          );

        request(app)
              .get('/express_backend')
              .expect(200, { express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT!' } )
              .end(
                (err) => {
                  if(err) throw done(err);
                  done();
                }
            );
    }
);