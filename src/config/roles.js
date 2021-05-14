const roles = ['user'];

const roleRights = new Map();
roleRights.set(roles[0], ['getRestaurants']);

module.exports = {
  roles,
  roleRights,
};
