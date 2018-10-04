const axios = require('axios');
const foods = [{id: 1, name: 'steak', cat: 'meat'}];
let id = 1;

const resolvers = {
  Query: {
    async people(_, args, ctx) {
      const response = await axios.get('https://www.swapi.co/api/people')
      return (response.data.results)
    },
    foodItems(){
      return foods;
    },
    foodItem(_, { id }, ctx){
      const item = foods.find(val => val.id === +id)
      if(!item){
        throw new Error(`No matching ID ${id}`)
      } else {
        return item;
      }
    }
  },
  Mutation: {
    addFood(_, { name, cat }){
      foods.push({id: (id+=1), name, cat});
      return foods;
    },
    deleteFood(_, { id }){
      let found = foods.find(val => val.id === +id);
      console.log(found);
      if(!found){
        throw new Error(`no item by ID ${id}`)
      }
      foods.splice(found, 1);
      id--;
      return id;
    }
  }
}

module.exports = resolvers;