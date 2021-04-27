const activationEmail = (link, username) => {
    return (`
        <p>Welcome to Bookchef ${username}!</p>
        <p style="margin-bottom: 20px;">Before you get started, follow <a href='${link}'>this link</a> to activate your account.</p>
        <p>Happy cooking! 👩🏽‍🍳<br>
        <span style="color: #659A41"><strong>The Bookchef Team</strong><span><br>
        <a href="mailto:info.bookchef@gmail.com" >info.bookchef@gmail.com</a></p>
        
    `)
}

const alreadyRegistered = (username) => {
    return (`
        <p>Hi ${username},<p>
        <p>An account is already registered to this email address! Please visit <a href="${process.env.APP_URL}" >the website</a> to login.<p>
        <p>Happy cooking! 👩🏽‍🍳<br>
        <span style="color: #659A41"><strong>The Bookchef Team</strong><span><br>
        <a href="mailto:info.bookchef@gmail.com" >info.bookchef@gmail.com</a></p>
    `)
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