import mongoose from "mongoose";

export default class Database {
    constructor(connectionUri) {
        this.connectionUri = connectionUri;
        const error = this.validateConnectionUri(connectionUri);
        if (error) {
            throw new Error(error);
        }
    }

    validateConnectionUri(connectionUri) {
        if (typeof connectionUri !== "string") {
            return `Invalid URI type: ${typeof connectionUri}. Expected a string.`;
        }
        if (!connectionUri.trim()) {
            return "Connection URI cannot be empty.";
        }
        return null;
    }

    async connect() {
        try {
            await mongoose.connect(this.connectionUri, {
                // useNewUrlParser: true, //deprecated
                // useUnifiedTopology: true, //deprecated
                serverSelectionTimeoutMS: 5000
            });
            mongoose.set("debug", true);
        } catch (error) {
            throw new Error(`Database connection failed: ${error.message}`);
        }
    }

    getConnection() {
        return mongoose.connection;
    }
}
