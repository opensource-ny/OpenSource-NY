/* Test to be run by Jest */

const response = require('../../server/src/response.js');

test(
    'should call res.() with "Hello World!" and "{ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT!" }"',
    () => {
        const send = jest.fn();
        const res = {
          send,  
        };
        response.hello({},res);
        expect(send.mock.calls).toHaveLength(1);
        expect(send.mock.calls[0][0]).toBe('Hello World!');
        
        response.express_backend({},res);
        expect(send.mock.calls).toHaveLength(2);
        expect(send.mock.calls[1][0]).toEqual({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT!' });
    }
);