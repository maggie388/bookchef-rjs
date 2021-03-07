const activationEmail = (link) => {
    return (
        `Please click on <a href='${link}'>this link</a> to activate your account.`
    )
}

const alreadyRegistered = (username) => {
    return (
        `<p>Hi ${username},<p>
        <p>You already have an active account. Please visit the home page to login.<p>`
    )
}

const shareRecipe = (username, recipe, notes) => {
    const renderNotes = () => {
        if (notes) {
            const notesHTML = notes.map(note => {
                return `<li>${note.attributes.text}</li>`;
            });
            return (
                `<h3>${username}'s Notes About this Recipe</h3>
                ${notesHTML.join('')}`
            )
        }

        return ``;
    }
    return (
        `<h1>Your friend ${username} has shared a recipe with you through Bookchef!</h1>
        <h2> ${recipe.attributes.title}</h2>
        <h3>Ingredients</h3>
        <ul>
        ${recipe.attributes.ingredients}
        </ul>
        <h3>Instructions</h3>
        <ul>
        ${recipe.attributes.instructions}
        </ul>
        ${renderNotes()}
        Enjoy!!
        `
    )
}

module.exports = {
    activationEmail,
    alreadyRegistered,
    shareRecipe
}