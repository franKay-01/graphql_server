const typeDefs = `#graphql
  scalar Date

  type Product {
    id: ID!
    name: String!
    description: String!
    category_id: String!
    price: Float!
    quantity: Int!
    category: Category!
  }

  type Category {
    id: ID!
    name: String!
    products: [Product!]
  }

  type User {
    id: ID!
    title: String!
    first_name: String!
    last_name: String!
    email: String!
    password: String!
    username: String!
    country: String!
    token: String
  }

  type OrderItems {
    id: ID!
    quantity: Int!
    unit_amount: String!
    order: Order!
    products: Product!
  }

  type Order {
    id: ID!
    user_id: Int!
    quantity: Int!
    amount: Float!
    status: Boolean!
    other_info: OtherInfo!
    user: User!
    orderItems: [OrderItems!]!
    createdAt: Date!
  }

  type Query {
    orders: [Order]
    order(id: ID!): Order
    products: [Product]
    product_search(search: String!): [Product]
    categories: [Category]
    category(id: ID!): Category
    user_log_in(user: UserLoginInput!): User
  }

  type OtherInfo {
    name: String!
    address: String!
    phone: String!
    network: String!
  }

  type Mutation {
    addProduct(product: AddProductInput!): Product
    addCategory(category: AddCategoryInput!): Category
    addUser(client: AddUserInput!): User
    addOrder(order: AddOrderInput!): Order
    confirmOrder(id: Int!): Boolean
  }

  input OrderCartItemInput {
    product_id: Int!
    quantity: Int!
    unit_amount: Float!
  }

  input AddOrderInput {
    quantity: Int!
    amount: Float!
    order_cart: [OrderCartItemInput!]!
    other_info: OtherInfoInput!
  }

  input OtherInfoInput {
    name: String!
    address: String!
    phone: String!
    network: String!
  }

  input UserLoginInput {
    username: String!
    password: String!
  }

  input AddUserInput {
    title: String!
    first_name: String!
    last_name: String!
    email: String!
    password: String!
    username: String!
    country: String!
  }

  input AddProductInput {
    name: String!
    description: String!
    category_id: String!
    price: Float!
    quantity: Int!
  }

  input AddCategoryInput {
    name: String!
  }
`

module.exports.typeDefs = typeDefs;
