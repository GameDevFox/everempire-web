import _ from 'lodash';

import { diff, apply } from './diff';

const base = {
  init: 'prep',
  a: 123,
  b: {
    sub: 'hello',
    another: {
      one: 'two',
      type: 'special'
    }
  },
  c: { color: 'red' },
  d: { product: 2000 }
};

const delta = {
  init: 'yours',
  b: { another: { type: 'non-special' } },
  d: { product: 2500 }
};

const deleteDelta = {
  init: 'yours',
  a: undefined,
  b: {
    another: {
      one: undefined,
      type: 'non-special'
    }
  },
  c: { color: undefined },
  d: { product: 2500 }
};

describe('diff(a, b)', () => {
  it('should return delta when using immutible objects', () => {
    const other = {
      ...base,
      init: 'yours',
      b: {
        ...base.b,
        another: {
          ...base.b.another,
          type: 'non-special'
        }
      },
      d: { product: 2500 }
    };

    const result = diff(base, other);

    result.should.deep.equal(delta);
  });

  it('should return empty delta when mutating object', () => {
    const baseClone = _.cloneDeep(base); // _.cloneDeep so mutating base doesn't affect other tests

    const other = baseClone;
    other.a = 456;
    other.b.another.one = 'three';

    const delta = diff(baseClone, other);

    delta.should.deep.equal({});
  });

  it('returns a delta with `undefined` where properties have been removed', () => {
    const baseClone = _.cloneDeep(base); // _.cloneDeep so mutating base doesn't affect other tests

    const other = {
      ...baseClone,
      init: 'yours',
      b: {
        ...baseClone.b,
        another: {
          ...baseClone.b.another,
          type: 'non-special'
        }
      },
      d: { product: 2500 }
    };

    delete other.a;
    delete other.b.another.one;
    delete other.c.color;

    const result = diff(base, other);

    result.should.deep.equal(deleteDelta);
  });
});

describe('apply(obj, delta)', () => {
  it('should alter `obj` by `delta`', () => {
    const after = apply(base, delta);

    after.should.deep.equal({
      init: 'yours',
      a: 123,
      b: {
        sub: 'hello',
        another: {
          one: 'two',
          type: 'non-special'
        }
      },
      c: { color: 'red' },
      d: { product: 2500 }
    });
  });

  it('should remove properties where delta is undefined', () => {
    const after = apply(base, {
      ...delta,
      a: undefined,
      b: {
        another: {
          ...delta.b.another,
          one: undefined
        }
      },
      c: { color: undefined }
    });

    after.should.deep.equal({
      init: 'yours',
      b: {
        sub: 'hello',
        another: {
          type: 'non-special'
        }
      },
      c: {},
      d: { product: 2500 }
    });

    const myDelta = diff(base, after);
    myDelta.should.deep.equal(deleteDelta);
  });
});
