let commonResolvers = {
  User: {
    name: obj => obj.name,
    dob: obj => obj.dob,
  }
};

module.exports = commonResolvers;