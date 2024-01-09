const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { sequelize } = require('../models');
const { Op } = require('sequelize');
require('dotenv').config();

const { Products, Categories, Users, Orders, OrderItems } = require('../models')

const resolvers = {
  Query: {
    orders: async (_, __, contextValue) => {
      try {
        const { user } = contextValue
        const orders = await Orders.findAll({
          where: { user_id: user.id },
          include: [
            {
              model: OrderItems, 
              as: 'orderItems', 
              include: [
                {
                  model: Products,
                  as: 'products',
                },
              ],
            },
          ],
        })

        return orders
      }catch(err){
        throw new Error('Error retrieving orders', err);
      }
    },
    categories: async () => {
      const categories = Categories.findAll({ include: ['products'] });

      return categories
    },
    category: async (_, args) => {
      const categories = Categories.findOne({ where: {id: args.id }, include: ['products'] });

      return categories
    },
    product_search: async (_, args) => {
      try {
        const searchTerm = args.search
        const products = await Products.findAll({
          where: {
            [Op.or]: [
              {
                name: {
                  [Op.like]: `%${searchTerm}%`, // Matches products where the name contains the search term
                },
              },
              {
                description: {
                  [Op.like]: `%${searchTerm}%`, // Matches products where the description contains the search term
                },
              },
            ],
          },
          include: ['categories']
        })
  
        return products;
      }catch(err){
        throw new Error('Error searching product', JSON.stringify(err))
      }   
    },
    products: async () => {
      const products = await Products.findAll({
        where: {is_active: true},
        include: ['categories']
      })

      return products;
    },
    user_log_in: async (_, args) => {
      try{
        const { password, username } = {...args.user};
        const user = await Users.findOne({ where: { username } });

        if (!user) {
          throw new Error('User details do not exist. Kindly sign up');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          throw new Error('Invalid credentials');
        }
        
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.TOKEN_KEY, {
          expiresIn: '1h',
        });
    
        user.token = token
        return user

      }catch (err){
        console.error('Error logging user in:', err);
        throw new Error('Error logging user in');
      }
    }
  },
 
  // ... nested queries
  Product: {
    category: (parent) => parent.categories,
  },
  // ... nested queries

  Mutation: {
    confirmOrder: async (_, { id }) => {
      try {
        const [numberOfAffectedRows] = await Orders.update(
          { status: true}, 
          {
            where: { id },
            returning: true,
          }
        );

        return numberOfAffectedRows > 0;

      } catch (err) {
        throw new Error('Error updating order', err)
      }
    },
    addOrder: async (_, args, contextValue) => {
      try{
        const { user } = contextValue
        const transaction = await sequelize.transaction();
        
        const {quantity, amount, order_cart, other_info } = {...args.order};

        const order_info = await Orders.create({user_id: user.id , quantity, amount, other_info})

        const order_id = order_info.id

        order_cart.map(async (order_item) => {
          const { product_id, quantity, unit_amount } = order_item;
          
          await OrderItems.create({ order_id, product_id, quantity, unit_amount });
        });

        await transaction.commit();

        return order_info
      }catch (err){
        throw new Error('Error adding order', err)
      }
    },
    addUser: async (_, args) => {
      try{
        const {title, first_name, last_name, email, password, username, country} = {...args.client};

        const existingUser = await Users.findOne({ where: { username } });

        if (existingUser) {
          return res.status(200).json({ response_code: 203, error: {message: 'Username already exists' }});
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const user = await Users.create({title, first_name, last_name, email, password: hashedPassword, username, country})
        
        return user

      }catch (err){
        console.error('Error adding user:', err);
        throw new Error('Error adding user');
      }
    },
    addProduct(_, args){
      try{
        let {name, description, price, category_id, img_url, quantity} = {...args.product}
        const parsed_category_id = parseInt(category_id)
        const product_item = Products.create({name, description, price, quantity, category_id: parsed_category_id, img_url})
        return product_item
      }catch (err){
        console.error('Error adding product:', err);
        throw new Error('Error adding product');
      }
    },
    addCategory(_, args){
      try{
        const { name } = {...args.category}
        const category_item = Categories.create({ name })

        return category_item
      }catch (err){
        console.error('Error adding category:', err);
        throw new Error('Error adding category');
      }      
    },
  }
}

module.exports.resolvers = resolvers;
