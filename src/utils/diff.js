import _ from 'lodash';

export const diff = (a, b) => {
  const result = {};

  Object.entries(a).forEach(([key, aVal]) => {
    const bVal = b[key];

    if(aVal === bVal)
      return;

    let delta;
    if(_.isPlainObject(bVal))
      delta = diff(aVal, bVal);
    else
      delta = bVal;

    result[key] = delta;
  });

  return result;
};

export const apply = (obj, delta) => {
  const result = {};

  Object.entries(obj).forEach(([key, value]) => {
    let newVal = value;

    if(key in delta) {
      const deltaVal = delta[key];

      if(deltaVal === undefined)
        return;

      newVal = _.isPlainObject(deltaVal) ? apply(newVal, deltaVal) : deltaVal;
    }

    result[key] = newVal;
  });

  return result;
};
