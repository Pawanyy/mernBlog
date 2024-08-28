import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    isActive: { type: Boolean, default: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
}, { timeseries: true })

userSchema.methods.isPasswordMatch = async function (password) {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
}


userSchema.pre("save", async function () {
    const passwordHash = await bcrypt.hash(this.password, 10);
    this.password = passwordHash;
})

export default mongoose.model("users", userSchema);