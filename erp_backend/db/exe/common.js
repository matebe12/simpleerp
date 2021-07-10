function arrayFromObject(obj) {
    var arr = [];
    for (var i in obj) {
        arr.push(obj[i]);
    }
    return arr;
}

module.exports = {
    arrangeForDataLoader: async function (inputData, results, fn) {
        var groups = {};
        for (var i = 0; i < results.length; i++) {
            var group = JSON.stringify(fn(results[i]));
            if (group in groups) {
                groups[group].push(results[i]);
            } else {
                groups[group] = [results[i]];
            }
        }
        const resultsGroups = arrayFromObject(groups);
        let outArray = [];
        for (let i = 0; i < inputData.length; i++) {
            let filterdObj = resultsGroups.find(function (item, index) {
                let keysItem = fn(item[0]);
                console.log(keysItem, inputData[i]);
                if (JSON.stringify(keysItem) === JSON.stringify(inputData[i])) {
                    outArray.push(item);
                    return true;
                }
            });
            if (filterdObj === undefined) outArray.push([]);
        }
        return outArray;
    },
};
