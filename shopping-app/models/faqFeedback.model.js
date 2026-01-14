const mongoose = require("mongoose");

const faqFeedbackSchema = new mongoose.Schema(
  {

    name: { type: String, trim: true, maxlength: 80 },
    email: { type: String, trim: true, maxlength: 120 },
    message: { type: String, required: true, trim: true, maxlength: 2000 },

  
    faq_id: { type: Number },

   
    status: { type: String, enum: ["new", "reviewed"], default: "new" },
  },
  { collection: "faq-feedback", timestamps: true }
);

module.exports = mongoose.model("FaqFeedback", faqFeedbackSchema);
