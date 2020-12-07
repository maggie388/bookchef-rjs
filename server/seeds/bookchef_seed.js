const usersData = require('../seed_data/users');
const recipesData = require('../seed_data/recipes');

exports.seed = function(knex) {
  return knex('users')
    .del()
    .then(function() {
      return knex('users').insert(usersData);
    })
    .then(function() {
      return knex('recipes')
        .del()
        .then(function() {
          return knex('users').pluck('id');
        })
        .then(userIds => {
          const recipeDataWithUserId = userIds.map((recipe) => {
            const randomUserId = Math.floor(Math.random * userIds.length);
            recipe.user_id = userIds[randomUserId];
            return recipe;
          });
          return knex('recipies').insert(recipeDataWithUserId)
        })
    });
};
