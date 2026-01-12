require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./db");

const faqData = require("./faqData");
const { FAQ_CATEGORIES } = require("./mockData");


require("../models/category.model");
const Faq = require("../models/faq.model");

async function seedFaqOnly() {
  try {
    await connectDB();



    const ids = faqData.map((x) => x.faq_id);
    const existing = await Faq.find({ faq_id: { $in: ids } }, { faq_id: 1 }).lean();
    const existingSet = new Set(existing.map((x) => x.faq_id));

    const toInsert = faqData.filter((x) => !existingSet.has(x.faq_id));
    if (toInsert.length === 0) {
      console.log("KC: No new FAQs to insert.");
      return;
    }


    await Faq.insertMany(toInsert, { ordered: false });
    console.log(`KC: Inserted ${toInsert.length} FAQs ✅`);
  } catch (e) {
    console.error("KC: seedFaqOnly error:", e);
  } finally {
    await mongoose.connection.close();
  }
}

seedFaqOnly();
