const path = require('path');
const { loadFilesSync, mergeResolvers }= require("graphql-tools");
const resolversArray = loadFilesSync(path.join(__dirname, './resolvers'));

module.exports = mergeResolvers(resolversArray);