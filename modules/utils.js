export const shuffle = (array) => {
    let currentIndex = array.length;
    let randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      // eslint-disable-next-line no-plusplus
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
  
    return array;
  };
  

  export const  isEmpty = (obj) => {
    if(typeof obj !== 'object') return true;
    return Object.keys(obj).length === 0;
}