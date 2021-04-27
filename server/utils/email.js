const activationEmail = (link, username) => {
    return (`
        <p>Welcome to Bookchef ${username}!</p>
        <p>Before you get started, follow <a href='${link}'>this link</a> to activate your account.</p>
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
            return (`
                <u>Here are a couple of notes from ${username} about this recipe:</u>
                <ul>
                ${notesHTML.join('')}
                </ul>
            `)
        }

        return ``;
    }
    return (`
        <p style="font-weight: bold">Hey there 👋🏽, </p>
        <p style="font-weight: bold">Your friend ${username} thought you might like this recipe from his <a href="${process.env.APP_URL}" style="color: #659A41">Bookchef</a> collection!</p>
        <hr style="border-color: #659A41;">
        <p style="white-space: nowrap; overflow: hidden">🥙 🥩 🥒 🌯 🥬 🍣 🧅 🥞 🧄 🍛 🥑 🌮 🍍 🍜 🍅 🥯 🥟 🧀 🍪 🍓 🥮 🫑 🥪 🌽 🍝 🥦 🍕 🥘 🍱 🧁 🍰 🫕 🥫 🫔 🧇 🍞 🌭 🍩 🥨 🫒 🍳 🍖 🫐 🥐 🍲</p>
        <h3>${recipe.attributes.title}</h3>
        <strong>Ingredients</strong>
        <ul>
        ${recipe.attributes.ingredients}
        </ul>
        <strong>Instructions</strong>
        <ol>
        ${recipe.attributes.instructions}
        </ol>
        ${renderNotes()}
        <p style="white-space: nowrap; overflow: hidden">🥙 🥩 🥒 🌯 🥬 🍣 🧅 🥞 🧄 🍛 🥑 🌮 🍍 🍜 🍅 🥟 🧀 🍪 🍓 🥮 🫑 🥪 🌽 🍝 🥦 🍕 🥘 🍱 🧁 🍰 🫕 🥫 🫔 🧇 🍞 🌭 🍩 🥨 🫒 🍳 🍖 🫐 🥐 🍲</p>
        <hr style="border-color: #659A41;">
        <p>Happy cooking! 👩🏽‍🍳<br>
        <span style="color: #659A41"><strong>The Bookchef Team</strong><span><br>
        <a href="mailto:info.bookchef@gmail.com" >info.bookchef@gmail.com</a></p>
    `)
}

module.exports = {
    activationEmail,
    alreadyRegistered,
    shareRecipe
}