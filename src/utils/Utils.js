const Utils = {
  capitalizeFirstLetter: (string) => {
    return string?.charAt(0).toUpperCase() + string?.slice(1);
  },

  camelToSpace: (key) => {
    var result = key.replace(/([A-Z])/g, " $1");
    return result[0].toUpperCase() + result.slice(1);
  },

  capitalizeFirstLetterOfEachWord: (string) => {
    return string.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
  },


};

export default Utils;