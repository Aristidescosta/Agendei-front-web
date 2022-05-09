const mongoose = require("mongoose");
const establishmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    nif: {
      type: Number,
      require: true,
    },
    category: {
      type: Object,
      require: true,
    },
    img: {
      type: String,
      require: true,
    },
    images: {
      type: Array,
      default: [],
    },
    phones_number: {
      type: Array,
    },
    description: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    open_to: {
      type: Array,
      default: [],
    },
    rates: {
      type: Object,
      default: {},
    },
    user: {
      type: Object,
      require: true,
    },
    services: {
      type: Array,
      default: [],
    },
    appointments: {
      type: Array,
      default: [],
    },

    rating: {
      type: Number,
      default: 0,
    },
    ratingmedia: {
      type: Number,
      default: 0,
    },
    open: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const establishment = mongoose.model("ests", establishmentSchema);
module.exports = establishment;
