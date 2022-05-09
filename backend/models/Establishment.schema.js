const mongoose = require("mongoose");
const establishmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },

    nif: {
      type: String,
      require: true,
    },

    category: {
      name: {
        type: String,
        require: true,
      },
    },

    img: {
      type: String,
      require: true,
    },

    imagens: [],

    phones_number: [{type: Number}],

    description: {
      type: String,
    },

    open_to: {
      dia: {
        type: String
      },
      open: {
        type: String
      },
      close: {
        type: String
      }
    },

    rating: {
      type: Number
    },

    user: {
      name: {
        type: String,
        require: true
      }
    },

    services: [{
      name: {
        type: String
      },
      est: {
        name: {
          type: String,
          require: true
        }
      },
      preco: {
        type: Number
      },
      horarios: [{
        type: String
      }]
    }],

    appointments: [{
      type: Number
    }],

    ratingMedia: {
      type: Number
    },

    open: {
      type: Boolean
    }
  },
  { timestamps: true }
);


const establishment = mongoose.model("ests", establishmentSchema);
module.exports = establishment;