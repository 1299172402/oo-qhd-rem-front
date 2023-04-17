function arrayFind(){

}


export function arrayFindAll(arr, value, propName, childrenName=undefined){
    let array = [];
    if(arr && Array.isArray(arr)){
        arr.forEach((item) => {
            if(childrenName){
                item[childrenName] = arrayFindAll(item[childrenName], propName, childrenName)
            }
            if(item[propName] === value){
                array.push(item)
            }
        })
    }
    return array;
}