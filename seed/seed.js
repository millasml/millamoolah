const faker = require("faker");
const fs = require("fs");
const moment = require("moment");

const EXPENSE_CATEGORIES = [
  "Dining",
  "Rent",
  "Travel",
  "Utilities",
  "Subscriptions",
  "Others",
];
const INCOME_CATEGORIES = ["Liquid Investments", "Job", "Pension"];
const CURRENT_DATE = new Date(Date.now());

const ALL_INCOME = [];
const ALL_EXPENSE = [];
let ALL_USERS = [];

//we create 3 users who have been with us for 3 months, 6 months and 9 months respectively.
function seed() {
  const USER_PARAMS = [
    new Date("2020-4-26"),
    new Date("2020-1-26"),
    new Date("2019-10-26"),
  ];

  const users = USER_PARAMS.map((startDate) => createUser(startDate));

  ALL_USERS = ALL_USERS.concat(users)

//   return {
//     users: users,
//     income: ALL_INCOME,
//     expense: ALL_EXPENSE,
//   };
}

function createUser(startDate) {
  //create basic information
  const email = faker.internet.exampleEmail();
  const _id = email.split("@")[0];
  const name = faker.name.findName();
  const location = faker.address.country();
  const main_currency = faker.finance.currencyName();
  const goals = createGoals(_id);
  const recurringExpenses = createRecurringExpenses(startDate);
  const recurringIncomes = createRecurringIncomes(startDate);
  createRecurringExpensesEntries(recurringExpenses, _id);
  createRecurringIncomeEntries(recurringIncomes, _id);
  createIncomeEntries(_id, startDate);
  createExpenseEntries(_id, startDate);
  const monthlyOverview = getMonthlyOverview(_id);
//   const cummOverview = getCummOverview(monthyOverview);
  return {
    _id: _id,
    email: email,
    name: name,
    location: location,
    main_currency: main_currency,
    goals: goals,
    recurring_expenses: recurringExpenses,
    recurring_incomes: recurringIncomes,
    monthly_overview: monthlyOverview,
  };
}

function createGoals() {
  const goals = [];
  const numberOfGoals = faker.random.number({ min: 0, max: 10 });
  for (let i = 0; i < numberOfGoals; i++) {
    const newGoal = faker.company.catchPhrase();
    goals.push({ item: newGoal, isComplete: faker.random.boolean() });
  }

  return goals;
}

function createRecurringExpenses(startDate) {
  const recurringExpenses = [];
  const numberOfRecEx = faker.random.number({ min: 2, max: 5 });

  for (let i = 0; i < numberOfRecEx; i++) {
    const name = faker.company.bsAdjective();
    const monthlyAmount = faker.finance.amount();
    const category =
      EXPENSE_CATEGORIES[
        faker.random.number({ min: 0, max: EXPENSE_CATEGORIES.length - 1 })
      ];
    const endDate = faker.date.future(2, startDate);
    const rec_startDate = faker.date.between(startDate, endDate);
    recurringExpenses.push({
      item: name,
      start_date: rec_startDate,
      end_date: endDate,
      category: category,
      monthly_amount: monthlyAmount,
    });
  }

  return recurringExpenses;
}

function createRecurringIncomes(startDate) {
  const recurringIncomes = [];
  const numberOfRecIn = faker.random.number({ min: 2, max: 5 });

  for (let i = 0; i < numberOfRecIn; i++) {
    const name = faker.company.bsNoun();
    const monthlyAmount = faker.finance.amount();
    const category =
      INCOME_CATEGORIES[
        faker.random.number({ min: 0, max: INCOME_CATEGORIES.length - 1 })
      ];
    const endDate = faker.date.future(2, startDate);
    const rec_startDate = faker.date.between(startDate, endDate);
    recurringIncomes.push({
      item: name,
      start_date: rec_startDate,
      end_date: endDate,
      category: category,
      monthly_amount: monthlyAmount,
    });
  }

  return recurringIncomes;
}

function getMonthsBetween(startDate, endDate) {
  const result = [];
  const startDate_m = moment(startDate);
  let endDate_m = moment(endDate);
  if (moment(CURRENT_DATE).isBefore(endDate_m)) {
    endDate_m = moment(CURRENT_DATE);
  }

  while (startDate_m.isBefore(endDate_m)) {
    result.push(startDate_m.toDate());
    startDate_m.add(1, "month");
  }
  return result;
}

function createRecurringExpensesEntries(recurringExpenses, _id) {
  recurringExpenses.forEach((entry) => {
    getMonthsBetween(entry.start_date, entry.end_date).forEach((date) => {
      ALL_EXPENSE.push({
        date: date,
        item: entry.item,
        amount: parseFloat(entry.monthly_amount),
        category: entry.category,
        user_id: _id,
      });
    });
  });
}

function createRecurringIncomeEntries(recurringIncomes, _id) {
  recurringIncomes.forEach((entry) => {
    getMonthsBetween(entry.start_date, entry.end_date).forEach((date) => {
      ALL_INCOME.push({
        date: date,
        item: entry.item,
        amount: entry.monthly_amount,
        category: entry.category,
        user_id: _id,
      });
    });
  });
}

function createIncomeEntries(user_id, startDate) {
  INCOME_CATEGORIES.forEach((category) => {
    const numberOfEntries = faker.random.number({ min: 0, max: 15 });
    for (let i = 0; i < numberOfEntries; i++) {
      ALL_INCOME.push({
        date: faker.date.between(startDate, CURRENT_DATE),
        item: faker.company.companyName(),
        amount: faker.finance.amount(),
        category: category,
        user_id: user_id,
      });
    }
  });
}

function createExpenseEntries(user_id, startDate) {
  EXPENSE_CATEGORIES.forEach((category) => {
    const numberOfEntries = faker.random.number({ min: 0, max: 15 });
    for (let i = 0; i < numberOfEntries; i++) {
      ALL_EXPENSE.push({
        date: faker.date.between(startDate, CURRENT_DATE),
        item: faker.company.companyName(),
        amount: parseFloat(faker.finance.amount()),
        category: category,
        user_id: user_id,
      });
    }
  });
}

function getMonthlyOverview(user_id) {
  const overviewDict = {};
  ALL_EXPENSE.forEach((entry) => {
    if (entry.user_id === user_id) {
      const date =
        (parseInt(entry.date.getMonth()) + 1).toString() +
        "-" +
        entry.date.getFullYear().toString();
      if (date in overviewDict) {
        const currentSpending = overviewDict[date].month_expense;
        overviewDict[date] = {
          month_expense: currentSpending + parseFloat(entry.amount),
          month_income: overviewDict[date].month_income,
        };
      } else {
        overviewDict[date] = {
          month_expense: parseFloat(entry.amount),
          month_income: 0,
        };
      }
    }
  });
  ALL_INCOME.forEach((entry) => {
    if (entry.user_id === user_id) {
      const date =
        (parseInt(entry.date.getMonth()) + 1).toString() +
        "-" +
        entry.date.getFullYear().toString();
      if (date in overviewDict) {
        const currentIncome = overviewDict[date].month_income;
        overviewDict[date] = {
          month_expense: overviewDict[date].month_expense,
          month_income: currentIncome + parseFloat(entry.amount),
        };
      } else {
        overviewDict[date] = {
          month_expense: 0,
          month_income: parseFloat(entry.amount),
        };
      }
    }
  });

  return Object.entries(overviewDict).map(([k, v]) => {
    v["date"] = k;
    return v;
  });
}

// function createCummOverview(monthyOverview) {
//     function compare(date1, date2){
//         const [month1, year1] = date1.split("-")
//         const [month2, year2] = date2.split("-")
//         if (year1 > year2){
//             return 1
//         } else if (year2 > year1){
//             return -1
//         } else {
//             if(month1 > month2){
//                 return 1
//             } else if (month2 > month1){
//                 return -1
//             } else {
//                 return 0
//             }
//         }
//     }

//     monthlyOverview.sort(compare)

//     cummOverview = []

//     monthlyOverview.forEach( (entry) => {
        
//     })

//     })

// }


seed();
fs.writeFileSync("seeddata_users.json", JSON.stringify(ALL_USERS));
fs.writeFileSync("seeddata_expense.json", JSON.stringify(ALL_EXPENSE));
fs.writeFileSync("seeddata_income.json", JSON.stringify(ALL_INCOME));


