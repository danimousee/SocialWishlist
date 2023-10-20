export const search = (list, input) => {
    let filteredList = [];

    if(input !== undefined) {
        list.forEach(item => {
            const name = item && (item.name || item.displayName);
            if(name && name.toLowerCase().includes(input.toLowerCase())) {
                filteredList.push(item);
            }
        });
    }
    
    return filteredList;
}