let followController = module.exports;
const assert = require("assert");
const Definer = require("../lib/mistake");
const Follow = require("../models/Follow");

followController.subscribe = async (req, res) => {
  try {
    assert.ok(req.member, Definer.auth_err5);

    const follow = new Follow();
    await follow.subscribeData(req.member, req.body);

    res.json({ state: "success", data: "subscribed" });
  } catch (err) {
    res.json({ state: "fail", message: err.message });
  }
};

followController.unsubscribe = async (req, res) => {
  try {
    assert.ok(req.member, Definer.auth_err5);

    const follow = new Follow();
    await follow.unsubscribeData(req.member, req.body);
    assert.ok(result, Definer.general_err1);

    res.json({ state: "success", data: "unsubscribed" });
  } catch (err) {
    res.json({ state: "fail", message: err.message });
  }
};

followController.getMemberFollowings = async (req, res) => {
  try {
    const follow = new Follow();
    const result = await follow.getMemberFollowingsData(req.query);

    res.json({ state: "success", data: result });
  } catch (err) {
    res.json({ state: "fail", message: err.message });
  }
};

followController.getMemberFollowers = async (req, res) => {
  try {
    const follow = new Follow();
    const result = await follow.getMemberFollowersData(req.member, req.query);

    res.json({ state: "success", data: result });
  } catch (err) {
    res.json({ state: "fail", message: err.message });
  }
};
