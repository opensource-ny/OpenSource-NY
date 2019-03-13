/* Test to be run by Jest */

const handleListen = require('../../handleListen.js');

test(
    'should call log with Example app...',
    () => {
        const port = 5000;
        const log = jest.fn();
        handleListen(log, port);
        expect(log.mock.calls).toHaveLength(1);
        expect(log.mock.calls[0][0]).toBe(`Example app listening on port ${port}!`);
    }
); 