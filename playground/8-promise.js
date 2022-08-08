const doWorkPromise = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        resolve([1,2,3])
    },2000)

})

doWorkPromise.then((a)=>{
    console.log(a);
}).catch((e)=>{
    console.log(e);
})
