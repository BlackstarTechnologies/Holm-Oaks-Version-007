const removeDuplicates = (list = []) => {
  const done = [];
  return list.filter((v) => {
    if (done.includes(v)) return false;
    done.push(v);
    return true;
  });
};

const splitUrl = (url_ = "/") => {
  const a = url_.split("/");
  const b = a.pop();
  const ext = b.split(".").pop();
  return {
    url_,
    split: a,
    last: b,
    ext,
  };
};

module.exports = {
  removeDuplicates,
  splitUrl,
};
