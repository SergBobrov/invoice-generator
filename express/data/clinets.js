const Client = require("../../modeles/Client")

const addClient = new Client({
    email: "test1@test",
    firstName: "Margaret",
    lastName: "Brick",
    company: "Willow Design"
})

// addClient.save()

module.exports = addClient


