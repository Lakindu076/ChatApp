const verifyBody = (object,arr)=> {
    arr.map(e=>{
        if(!object[e])
            return false;
    })
    return true;
}

module.exports = {
    verifyBody
}