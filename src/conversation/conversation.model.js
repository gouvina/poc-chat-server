module.exports = mongoose => {
  const Conversation = mongoose.model(
    "conversations", // Collection name
    mongoose.Schema(
      {
        id: {
          type: String,
          required: true,
          unique: true,
          trim: true,
        },
        title: {
          type: String,
          required: true,
          trim: true,
        },
        messages: {
          type: [String],
          default: [],
        },
        _archived: {
          type: Boolean,
          default: false,
        },
      },
      { timestamps: true }
    )
  );

  return Conversation;
};
