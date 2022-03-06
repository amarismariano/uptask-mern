import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    token: {
      type: String,
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  //Revisa que el password no haya sido cambiado
  if (!this.isModified("password")) {
    next(); //Pasa al siguiente middleware
  }
  // Ocultamos las contraseñas a la hora del registro
  const salt = await bcrypt.genSalt(10); // Rondas que hará antes de hashear, entre más rondas mas consumos a la base de datos
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);
export default User;
