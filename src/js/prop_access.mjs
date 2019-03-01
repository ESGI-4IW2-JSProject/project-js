function prop_access(path) {
    let self = this || {};
    if(!path) return self;
    const pathArray = path.split(".");

    for (let i = 0; i< pathArray.length; i++) {
        self = self[pathArray[i]];
        if(self === undefined) {
            console.log(pathArray.slice(0, i+1).join('.') + " not exist");
            return null;
        }
    }
    
    return self;
}

export { prop_access };
