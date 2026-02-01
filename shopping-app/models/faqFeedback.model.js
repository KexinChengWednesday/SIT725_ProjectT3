const mongoose = require("mongoose");

const faqFeedbackSchema = new mongoose.Schema(
  {

    name: { type: String, trim: true, maxlength: 80 },
    email: { type: String, trim: true, maxlength: 120 },
    message: { type: String, required: true, trim: true, maxlength: 2000 },

  
    faq_id: { type: Number },

   status: { type: String, enum: ["new", "reviewed", "resolved"], default: "new" },

// soft delete flag
isDeleted: { type: Boolean, default: false },
  },
  { collection: "faq-feedback", timestamps: true }
);

module.exports = mongoose.model("FaqFeedback", faqFeedbackSchema);
