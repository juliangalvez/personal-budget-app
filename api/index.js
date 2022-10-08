const server = require("./src/app.js");
const { conn, Operation } = require("./src/db.js");

async function precarga() {
  const operations = [
    {
      date: "01/01/2022",
      type: "Income",
      description: "Description 1",
      amount: 100,
    },
    {
      date: "02/01/2022",
      type: "Income",
      description: "Description 2",
      amount: 200,
    },
    {
      date: "03/01/2022",
      type: "Expense",
      description: "Description 3",
      amount: 300,
    },
    {
      date: "04/01/2022",
      type: "Income",
      description: "Description 4",
      amount: 400,
    },
    {
      date: "05/01/2022",
      type: "Expense",
      description: "Description 5",
      amount: 500,
    },
    {
      date: "06/01/2022",
      type: "Income",
      description: "Description 6",
      amount: 600,
    },
    {
      date: "07/01/2022",
      type: "Income",
      description: "Description 7",
      amount: 700,
    },
    {
      date: "08/01/2022",
      type: "Expense",
      description: "Description 8",
      amount: 800,
    },
    {
      date: "09/01/2022",
      type: "Income",
      description: "Description 9",
      amount: 900,
    },
    {
      date: "10/01/2022",
      type: "Expense",
      description: "Description 10",
      amount: 1000,
    },
  ];
  await Operation.bulkCreate(operations).then(() =>
    console.log("Operations preloaded")
  );
}

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log("%s listening at 3001");
  });
}).then(() => {
  precarga();
});

