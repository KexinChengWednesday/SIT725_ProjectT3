const User = require("../models/user.model");
const Counter = require("../models/counter.model");
const Cart = require("../models/cart.model");

async function findUserByEmail(email) {
  try {
    const user = await User.findOne({ email: email.toLowerCase() }).exec();
    return user; // returns null if not found
  } catch (err) {
    throw new Error("Database error: " + err.message);
  }
}

async function findUserById(id) {
  try {
    const user = await User.findById(id).exec();
    return user; // returns null if not found
  } catch (err) {
    throw new Error("Database error: " + err.message);
  }
}

async function addNewUser(userData) {
  try {
    // Fetch counter from DB - get all and extract seq
    const counter = await Counter.findOne().exec();

    if (!counter) {
      throw new Error("Counter not found in database");
    }

    // Extract seq number
    const seq = counter.seq;

    // Create user ID with 3-digit sequence number (e.g., user_008)
    const seqNumber = String(seq).padStart(3, "0");
    const userId = `user_${seqNumber}`;
    const cartId = `cart_${seqNumber}`;

    // Prepare user data with generated ID
    const preparedUserData = {
      user_id: userId,
      name: userData.name,
      email: userData.email.toLowerCase(),
      phone: userData.phone || null,
      dob: userData.dob,
      password: userData.password,
      address: {
        addressLine: userData.addressLine,
        city: userData.city,
        state: userData.state,
        postcode: userData.postcode,
        country: userData.country,
      },
      role: userData.role || "user",
      cart_id: cartId,
    };

    // Create and save new user
    const newUser = new User(preparedUserData);
    const savedUser = await newUser.save();

    // Update counter - increment seq by 1
    await Counter.updateOne({}, { seq: seq + 1 }).exec();

    // Create new cart with matching user ID
    const newCart = new Cart({
      cart_id: cartId,
      user_id: userId,
      items: [],
    });
    await newCart.save();

    return savedUser;
  } catch (err) {
    throw err;
  }
}

async function getUsersByRole(role) {
  try {
    // Validate role parameter
    if (!role || typeof role !== "string") {
      throw new Error("Role parameter is required and must be a string");
    }

    let users;

    // Check if role is 'all' to fetch all users
    if (role.toLowerCase() === "all") {
      users = await User.find({})
        .select("-password") // Exclude password from response
        .exec();
    } else {
      // Query users by specific role (case-insensitive)
      users = await User.find({ role: role.toLowerCase() })
        .select("-password") // Exclude password from response
        .exec();
    }

    // Return users array (empty if no users found)
    return users;
  } catch (err) {
    throw err;
  }
}

async function deleteUserByEmail(email) {
  try {
    // Validate email parameter
    if (!email || typeof email !== "string") {
      throw new Error("Email parameter is required and must be a string");
    }

    // Find user first to get user_id and cart_id
    const user = await User.findOne({ email: email.toLowerCase() }).exec();

    if (!user) {
      throw new Error(`User with email '${email}' not found`);
    }

    const userId = user.user_id;
    const cartId = user.cart_id;

    // Delete user from User collection
    const deletedUser = await User.deleteOne({
      email: email.toLowerCase(),
    }).exec();

    // Delete associated cart from Cart collection
    if (cartId) {
      await Cart.deleteOne({ cart_id: cartId }).exec();
    }

    return {
      success: true,
      message: `User '${email}' and associated cart deleted successfully`,
      deletedUser: {
        user_id: userId,
        email: email.toLowerCase(),
        cart_id: cartId,
      },
    };
  } catch (err) {
    throw err;
  }
}

module.exports = {
  findUserByEmail,
  findUserById,
  addNewUser,
  getUsersByRole,
  deleteUserByEmail,
};
