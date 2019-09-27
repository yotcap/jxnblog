const express = require('express');
const Router = express.Router();
const Model = require('../db/index');
const Statistics = Model.getModel('statisticsSchema');

const _C = require('../lib/constants');
const _U = require('../lib/utils');

// access +1
Router.get('/access', (req, res) => {
  Statistics.findOne({ name: 'totleVisitor' }, (err, doc) => {
    if (!err) {
      if (doc) {
        let v = doc.val;
        const whereCondition = { name: 'totleVisitor' };
        const updateData = { $set: { val: ++v }};
        Statistics.updateOne(whereCondition, updateData, (err, doc) => {
          if (!err) {
            return res.json({ ..._C.CODE_SUCCESS });
          }
        });

      }
    }
  });
  
});

Router.get('/all', (req, res) => {
  let dict = {};
  let tv = 'totleVisitor';
  Statistics.findOne({ name: tv }, (err, doc) => {
    if (!err) {
      if (doc) {
        dict[tv] = doc.val;
        return res.json({
          ..._C.CODE_SUCCESS,
          ...dict
        });
      }
    }
  });
});

module.exports = Router;
