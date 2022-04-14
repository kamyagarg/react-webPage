const Utils = {
  capitalizeFirstLetter: (string) => {
    return string?.charAt(0).toUpperCase() + string?.slice(1);
  },

  camelToSpace: (key) => {
    var result = key.replace(/([A-Z])/g, " $1");
    return result[0].toUpperCase() + result.slice(1);
  },

  capitalizeFirstLetterOfEachWord: (string) => {
    // return string
    //   ?.split(" ")
    //   .map((word) => {
    //     return word[0].toUpperCase() + word.substring(1);
    //   })
    //   .join(" ");
    
    // OR RegRx for the same
    return string.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
  },


};

export default Utils;