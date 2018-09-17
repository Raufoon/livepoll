const fakeUser = {
  id: 'AFSASD23132',
  name: 'Minhaz Raufoon'
};

const fakeUsers = [fakeUser];

const resolveFunctions = {
  Query: {
    users() {
      return fakeUsers;
    },
    user(_, {id}){
      return fakeUsers.find(user => user.id === id)
    }
  },
  Mutation: {
    createUser(_, {name}) {
      return fakeUser;
    }
  },
  User: {

  }
};

module.exports = resolveFunctions;