const fs = require("fs");
const path = require("path");
const mockData = require("./mockData");

const { courses, authors } = mockData;
const data = JSON.stringify({ courses, authors });
const filepath = path.join(__dirname, "db.json");

fs.writeFile(filepath, data, function(err) {
  // eslint-disable-next-line no-console
  err ? console.log(err) : console.log("Mock DB created.");
});
