const mongoose = require("mongoose");

export function connectDb(uri: string): Promise<void> {
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
