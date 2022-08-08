const doWorkCallback = (callback)=>{
    setTimeout(()=>{
        // callback(undefined, [1,2,3])
        callback('error', undefined)
    })
}
doWorkCallback((error,callback)=>{
    if(error){
        return console.log(error);
    }
    return console.log(callback);
})