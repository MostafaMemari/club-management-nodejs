module.exports.deleteInvalidPropertyInObject = (data = {}, blackListFields = []) => {
  let nullishData = ["", " ", "0", 0, null, undefined];
  Object.keys(data).forEach((key) => {
    if (blackListFields.includes(key)) delete data[key];
    if (typeof data[key] == "string") data[key] = data[key].trim();
    if (Array.isArray(data[key]) && data[key].length > 0) data[key] = data[key].map((item) => item.trim());
    if (Array.isArray(data[key]) && data[key].length == 0) delete data[key];
    if (nullishData.includes(data[key])) delete data[key];
  });
};

module.exports.copyObject = (object) => {
  return JSON.parse(JSON.stringify(object));
};
