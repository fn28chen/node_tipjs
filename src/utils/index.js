"use strict";

const _ = require("lodash");

const getInfoData = ({ fields = [], object = {} }) => {
  return _.pick(object, fields);
};

const getSelectData = (select = []) => {
  return Object.fromEntries(select.map((field) => [field, 1]));
};

const unGetSelectData = (select = []) => {
  return Object.fromEntries(select.map((field) => [field, 0]));
};

const removeUndefinedCheck = (obj) => {
  Object.keys(obj).forEach((k) => {
    if (obj[k] === undefined || obj[k] === null) {
      delete obj[k];
    }
  });
  return obj;
};

/**
 * const a = {
 *    c: {
 *      d: 1,
 *      e: 2,
 *    }
 * }
 *
 * db.collection.updateOne({ _id: 1 }, { $set: { "c.d": 1, "c.e": 2 } })
 * When you update but not all the fields are updated, you can use this function to parse the object
 */
const updateNestedObjectParser = obj => {
  console.log(`Object: `, obj);
  const final = {};

  Object.keys(obj).forEach(k => {
    console.log(`Key: `, k);

    if (typeof obj[k] === 'object' && !Array.isArray(obj[k])) {
      Object.keys(obj[k]).forEach(nk => {

        console.log(`Nested Key: `, nk);
        final[`${k}.${nk}`] = obj[k][nk];
      });
    } else {
      final[k] = obj[k];
    }
  })
  console.log(`Final: `, final);
  return final;
};

module.exports = {
  getInfoData,
  getSelectData,
  unGetSelectData,
  removeUndefinedCheck,
  updateNestedObjectParser,
};
