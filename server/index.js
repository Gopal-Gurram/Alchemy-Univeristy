const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "040d4cdad130521f72054f01b43ef4b8c1feb7b14a1db19e6eb365409858b29940437cbad32dd55c2df51abbe6ace8482126e055d609656bf84e7da15a03248330": 100,
  "049547d73ae2c70fcdf139e043cb2e4d47aa94acc3817801975d8e72aab645e20735896f60fb9f9f9af6202307d72fbb81da4ba8ba46eb3f1130f1c2dd9741de74": 50,
  "04eb28656a87d5c9f75e4a44b593b1c9765077458757e4c088a7f5b7226e2177681ed5d5877a9a7f4d9d6212877ad9aa85159d128e29f02563dc3f924273f97184": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

