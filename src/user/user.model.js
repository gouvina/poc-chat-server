module.exports = mongoose => {
  const User = mongoose.model(
    "users", // Collection name
    mongoose.Schema(
      {
        email: {
          type: String,
          unique: true,
        },
        password: {
          type: String,
        },
        _archived: {
          type: Boolean,
          default: false,
        },
      },
      { timestamps: true }
    )
  );

  return User;
};