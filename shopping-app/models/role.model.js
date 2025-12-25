const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
    role_id: {
        type: String, 
        required: true,
        unique: true
    },
    name: {
        type: String
    }
})

module.exports = new mongoose.model("Roles", roleSchema);