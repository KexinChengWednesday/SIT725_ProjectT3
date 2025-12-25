const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
    },
    dob: {
      type: Date,
      required: [true, "Date of birth is required"],
      validate: {
        validator: function (value) {
          const age = new Date().getFullYear() - value.getFullYear();
          return age >= 18;
        },
        message: "You must be at least 16 years old",
      },
    },
    phone: {
      type: String,
      trim: true,
      match: [/^\d{10}$/, "Phone number must be 10 digits"],
    },
    role: {
      type: String,
      validate: {
              validator: async function (value) {
                const Role = mongoose.model("Roles");
                const role = await Roles.findOne({ role_id: value });
                return role !== null;
              },
              message: "Invalid category ID",
            },
      default: "user",
    },
    status: {
      type: String,
      enum: ["active", "inactive", "deleted"],
      default: "active",
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);