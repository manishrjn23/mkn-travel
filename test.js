a=[1,2,3,4,5,6,7,8]
a.some((value,index)=>{
    console.log(value)
    return index===2
})