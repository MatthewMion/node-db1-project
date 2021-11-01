const router = require("express").Router();
const Accounts = require("./accounts-model");
const {
  checkAccountNameUnique,
  checkAccountId,
  checkAccountPayload,
} = require("./accounts-middleware");

router.get("/", (req, res, next) => {
  Accounts.getAll()
    .then((accounts) => {
      res.json(accounts);
    })
    .catch(next);
});

router.get("/:id", checkAccountId, (req, res, next) => {
  res.json(req.account);
});

router.post(
  "/",
  checkAccountPayload,
  checkAccountNameUnique,
  (req, res, next) => {
    Accounts.create(req.body)
      .then((newAccount) => {
        res
          .status(201)
          .json({ name: newAccount.name.trim(), budget: newAccount.budget });
      })
      .catch(next);
  }
);

router.put(
  "/:id",
  checkAccountPayload,
  checkAccountId,
  checkAccountNameUnique,
  (req, res, next) => {
    Accounts.updateById(req.params.id, req.body)
      .then((account) => {
        res.status(200).json(account);
      })
      .catch(next);
  }
);

router.delete("/:id", checkAccountId, (req, res, next) => {
  Accounts.deleteById(req.params.id)
    .then((account) => res.json(account))
    .catch(next);
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
  });
});

module.exports = router;
