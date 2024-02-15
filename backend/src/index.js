import app from "./app.js";

const PORT = process.env.PORT || 8000;

console.log("mode = " + process.env.NODE_ENV);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
