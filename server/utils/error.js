const error = (res,err)=> {
    console.log(err);
    return res.status(400).json({msg: 'error'})
}

module.exports = {
    error
}