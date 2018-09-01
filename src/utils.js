export const bindValue = (comp, name) => {
  return {
    value: comp.state[name],
    onChange: e => comp.setState({ [name]: e.currentTarget.value })
  };
};
