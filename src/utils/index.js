const wait = async (n = 0) => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve("waited");
    }, n * 1000);
  });
};

module.exports = {
  wait,
};
