const server = require("./src/app.js");
const { conn, Operation, Category } = require("./src/db.js");

async function precarga() {

  const category = [
    { name: "Salary"},
    { name: "Fees"},
    { name: "Credit Card"},
    { name: "Insurance"},
    { name: "Food"},
  ];
  await Category.bulkCreate(category).then(() =>
    console.log("Categories preloaded")
  );

  const operations = await Operation.bulkCreate([
    {
      date: "2022-01-01",
      type: "Income",
      concept: "Concept 1",
      amount: 100,
      category: 1,
    },
    {
      date: "2022-01-02",
      type: "Income",
      concept: "Concept 2",
      amount: 200,
      category: 1,
    },
    {
      date: "2022-01-03",
      type: "Expense",
      concept: "Concept 3",
      amount: 300,
      category: 1,
    },
    {
      date: "2022-01-04",
      type: "Income",
      concept: "Concept 4",
      amount: 400,
      category: 2,
    },
    {
      date: "2022-01-05",
      type: "Expense",
      concept: "Concept 5",
      amount: 500,
      category: 3,
    },
    {
      date: "2022-01-06",
      type: "Income",
      concept: "Concept 6",
      amount: 600,
      category: 4,
    },
    {
      date: "2022-01-07",
      type: "Income",
      concept: "Concept 7",
      amount: 700,
      category: 3,
    },
    {
      date: "2022-01-08",
      type: "Expense",
      concept: "Concept 8",
      amount: 800,
      category: 2,
    },
    {
      date: "2022-01-09",
      type: "Income",
      concept: "Concept 9",
      amount: 900,
      category: 5,
    },
    {
      date: "2022-01-10",
      type: "Expense",
      concept: "Concept 10",
      amount: 1000,
      category: 5,
    },
  ]);
  console.log("Operations preloaded")
  await operations[0].addCategory(1);
  await operations[1].addCategory(1);
  await operations[2].addCategory(1);
  await operations[3].addCategory(2);
  await operations[4].addCategory(3);
  await operations[5].addCategory(4);
  await operations[6].addCategory(3);
  await operations[7].addCategory(2);
  await operations[8].addCategory(5);
  await operations[9].addCategory(5);
}

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log("%s listening at 3001");
  });
}).then(() => {
  precarga();
});

