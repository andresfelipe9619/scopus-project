const fs = require("fs");
var slugify = require("slugify");
let rawdata = fs.readFileSync("./scopus.json");
let scopus = JSON.parse(rawdata);
let documents = scopus.map(document => {
  let newDocument = {};
  let authors = [];
  let authorsId = [];
  let affiliations = [];
  let authorKeywords = [];
  Object.keys(document).forEach(key => {
    let newKey = slugify(key.toLowerCase());
    if (newKey === "author(s)-id") {
      let ids = document[key].split(";");
      ids.pop();
      authorsId = ids;
    } else if (newKey === "authors") {
      authors = document[key].split(", ");
      newDocument[newKey] = authors;
    } else if (newKey === "affiliations") {
      affiliations = document[key].split("; ");
      newDocument[newKey] = affiliations;
    } else if (newKey === "authors-with-affiliations") return;
    else if (newKey === "author-keywords") {
      authorKeywords = document[key].split("; ");
      newDocument[newKey] = !authorKeywords[0] ? [] : authorKeywords;
    } else {
      newDocument[newKey] = document[key];
    }
  });
  let newAuthors = authors.map((author, index) => ({
    id: authorsId[index],
    name: author,
    affiliation: affiliations[index]
  }));
  newDocument["authors"] = newAuthors;
  return newDocument;
});
try {
  let fileData = JSON.stringify(documents[0]);
  fs.writeFileSync("./output/after.json", fileData);
  console.log("File parsed successfully!");
} catch (e) {
  console.error("Error trying to parse json", e);
} finally {
  console.log("Script ends");
}
