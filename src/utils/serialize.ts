const serializeParam = (key: string, value: string) => {
  return encodeURIComponent(key) + "=" + encodeURIComponent(value);
};

const serialize = (params: Map<string, string | string[]>) => {
  const str = [];
  for (const [key, value] of params) {
    if (!Array.isArray(value)) {
      str.push(serializeParam(key, value));
    } else {
      value.forEach((val) => {
        str.push(serializeParam(key, val));
      });
    }
  }
  return str.join("&");
};


export default serialize