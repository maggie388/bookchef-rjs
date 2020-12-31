const usersData = require('../seed_data/users');
const recipesData = require('../seed_data/recipes');
const notesData = require('../seed_data/notes');

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
          const recipeDataWithUserId = recipesData.map(recipe => {
            const randomUserId = Math.floor(Math.random() * userIds.length);
            recipe.user_id = userIds[randomUserId];
            return recipe;
          });
          return knex('recipes').insert(recipeDataWithUserId);
        })
        .then(() => {
          return knex('notes')
            .del()
            .then(() => {
              return knex('recipes').pluck('id');
            })
            .then(recipeIds => {
              const notesDataWithRecipeId = notesData.map(note => {
                const randomRecipeId = Math.floor(Math.random() * recipeIds.length);
                note.recipe_id = recipeIds[randomRecipeId];
                return note;
              });
              return knex('notes').insert(notesDataWithRecipeId);
            })
        });
    });
};
