export const search = (list, input) => {
    let filteredList = [];

    list.forEach(item => {
        if(item && item.name && item.name.toLowerCase().includes(input.toLowerCase())) {
            filteredList.push(item);
        }
    });
    
    return filteredList;
}