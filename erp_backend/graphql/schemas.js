const path = require('path');
const { loadFilesSync, mergeTypeDefs }= require("graphql-tools");
const typesArray  = loadFilesSync(path.join(__dirname, './schemas'));

export default  mergeTypeDefs(typesArray);
