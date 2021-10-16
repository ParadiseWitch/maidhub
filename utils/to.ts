export default function to(promise) {
  if (!promise || !Promise.prototype.isPrototypeOf(promise)) {
    return new Promise((resolve, reject) => {
      reject(new Error("requires promises as the param"));
    }).catch((err) => {
      return [err, null];
    });
  }
  // TODO 约束返回类型
  return promise.then(function () {
    return [null, ...arguments];
  }).catch(err => {
    return [err, null];
  });
};

export const toRet = async (promise) => {
  const [err, ret] = await to(promise);
  if (err) {
    console.error(err);
  }
  return ret;
}