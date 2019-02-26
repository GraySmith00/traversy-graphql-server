const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');

// hardcoded data
const customers = [
  { id: '1', name: 'John Doe', email: 'john@gmail.com', age: 34 },
  { id: '2', name: 'Sarah Silverman', email: 'sarah@gmail.com', age: 21 },
  { id: '3', name: 'Tom Watson', email: 'tom@gmail.com', age: 55 }
];

const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    customer: {
      type: CustomerType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return customers.find(customer => args.id === customer.id);
      }
    },
    customers: {
      type: new GraphQLList(CustomerType),
      resolve(parentValue, args) {
        return customers;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
