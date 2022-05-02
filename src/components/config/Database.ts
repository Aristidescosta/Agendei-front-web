import mongoose from "mongoose";
const dbuser = "rubenAndre";
const dbpass = "l03p5D9gBLR2V4xk";

mongoose
  .connect(
    `mongodb+srv://${dbuser}:${dbpass}@cluster0.t5c1s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("conectou ao banco🔥🔥🔥");
  })
  .catch((err) => console.log(err));

  export default mongoose;