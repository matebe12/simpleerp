function isEmpty(value: any) {
    if (typeof value == 'undefined' || value == null || value == '')
        return true;
    else return false;
}

export { isEmpty };
