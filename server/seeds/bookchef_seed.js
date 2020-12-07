const usersData = require('../seed_data/users');
const recipesData = require('../seed_data/recipes');

exports.seed = function(knex) {
  return knex('users')
    .del()
    .then(() => {
      return knex('users').insert(usersData);
    })
    .then(() => {
      return knex('recipes')
        .del()
        .then(() => {
          return knex('users').pluck('id');
        })
        .then(userIds => {
          const recipeDataWithUserId = recipesData.map((recipe) => {
            const randomUserId = Math.floor(Math.random() * userIds.length);
            recipe.user_id = userIds[randomUserId];
            return recipe;
          });
          return knex('recipes').insert(recipeDataWithUserId);
        })
    });
};
