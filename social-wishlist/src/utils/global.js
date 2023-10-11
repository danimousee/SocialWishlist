export const search = (list, input) => {
    let filteredList = [];

    list.forEach(item => {
        if(item && item.name && item.name.includes(input)) {
            filteredList.push(item);
        }
    });
    
    return filteredList;
}