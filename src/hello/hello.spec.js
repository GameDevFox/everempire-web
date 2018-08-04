import { hello, goodbye } from './hello';

describe('Hello', () => {
  it('should work', () => {
    hello().should.equal('First');
    hello(true).should.equal('First');
    hello(false).should.equal('Second');
    goodbye().should.equal('See ya');
  });
});
