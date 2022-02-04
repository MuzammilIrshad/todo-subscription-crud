import mongoose from 'mongoose'
// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const dataSchema = new mongoose.Schema({
  name: {
    type: String,
  }
});

export const Data = mongoose.model('Data', dataSchema);

