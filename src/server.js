const app = require("./index");
const connect = require("./config/db");



let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}


app.listen(port, async (req, res) => {
  try {
    await connect();
    console.log("listen to the port number 5901");
  } catch (error) {
    console.log({ message: error.message });
  }
});
