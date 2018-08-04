export const hello = (flag = true) => {
  let result = '';

  if(flag)
    result = 'First';
  else
    result = 'Second';

  return result;
};

export const goodbye = () => {
  return 'See ya';
};
