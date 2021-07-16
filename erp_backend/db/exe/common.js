function BatchingItem(batch, rows, item) {
    const obj = {};
    batch.map(id => (obj[id] = []));
    rows.map(row => obj[item(row)].push(row));
    return obj;
}
export { BatchingItem };
