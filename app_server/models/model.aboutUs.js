const mongoose = require("mongoose");

const schema = mongoose.Schema;

const AboutUsSchema = new schema({
  primaryEmail: { type: String, required: true, trim: true, lowercase: true },
  otherEmails: [{ type: String, trim: true, lowercase: true }],
  primaryContact: { type: String, required: true, trim: true },
  otherContacts: [{ type: String, trim: true }],
  primaryAddress: { type: String, required: true, trim: true },
  otherAddresses: [{ type: String, trim: true }],
  linkedIn: { type: String, trim: true },
  facebook: { type: String, trim: true },
  twitter: { type: String, trim: true },
  instagram: { type: String, trim: true },
  youtube: { type: String, trim: true },
  whatsapp: { type: String, trim: true },
  googleMapLink: { type: String, trim: true },
  googleMapImage: { type: String, trim: true },
  googleMapPin: { type: Object },
});

const AboutUs = (module.exports = mongoose.model("Testimonial", AboutUsSchema));
