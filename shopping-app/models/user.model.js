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
      minlength: [1, "Password must be at least 1 characters"],
    },
    dob: {
      type: Date,
      required: [true, "Date of birth is required"],
      validate: {
        validator: function (value) {
          const age = new Date().getFullYear() - value.getFullYear();
          return age >= 16;
        },
        message: "You must be at least 16 years old",
      },
    },
    phone: {
      type: String,
      trim: true,
      match: [/^\d{10}$/, "Phone number must be 10 digits"],
    },
    address: {
      addressLine: {
        type: String,
        trim: true,
        minlength: [5, "Address line must be at least 5 characters"],
        maxlength: [100, "Address line cannot exceed 100 characters"],
      },
      city: {
        type: String,
        trim: true,
        minlength: [2, "City must be at least 2 characters"],
        maxlength: [50, "City cannot exceed 50 characters"],
      },
      state: {
        type: String,
        trim: true,
        minlength: [2, "State must be at least 2 characters"],
        maxlength: [50, "State cannot exceed 50 characters"],
      },
      postcode: {
        type: String,
        trim: true,
        match: [/^\d{4,6}$/, "Postcode must be 4-6 digits"],
      },
      country: {
        type: String,
        trim: true,
        minlength: [2, "Country must be at least 2 characters"],
        maxlength: [50, "Country cannot exceed 50 characters"],
      },
    },
    cardInfo: {
      cardNumber: {
        type: String,
        trim: true,
        match: [/^\d{13,19}$/, "Card number must be 13-19 digits"],
      },
      cardName: {
        type: String,
        trim: true,
        minlength: [2, "Card name must be at least 2 characters"],
        maxlength: [50, "Card name cannot exceed 50 characters"],
      },
      expiryDate: {
        type: String,
        trim: true,
        match: [/^\d{2}\/\d{2}$/, "Expiry date must be in MM/YY format"],
      },
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    status: {
      type: String,
      enum: ["active", "inactive", "deleted"],
      default: "active",
    },
    cart_id: {
      type: String,
      ref: "Cart",
    },
  },
  {
    collection: "users",
    timestamps: true,
    strict: "throw",
  }
);

module.exports = mongoose.model("User", userSchema);