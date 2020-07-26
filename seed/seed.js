const faker = require('faker');
const fs = require('fs');

const SPENDING_CATEGORIES = ["Dining", "Rent", "Travel", "Utilities", "Subscriptions", "Others"]
const INCOME_CATEGORIES = ["Liquid Investments", "Job", "Pension"]
const CURRENT_DATE = Date.now()

const ALL_INVESTING = []
const ALL_INCOME = []
const ALL_SPENDING = []

//we create 3 users who have been with us for 3 months, 6 months and 9 months respectively.
function seed() {
    const USER_PARAMS = [new Date("2020-4-26"), new Date("2020-1-26"), new Date("2019-10-26") ]

    const users = USER_PARAMS.map( startDate => createUser(startDate))

    return {
        users: users
    }


}

function createUser(startDate) {
    //create basic information
    const email = faker.internet.exampleEmail()
    const _id = email.split("@")[0]
    const name = faker.name.findName()
    const location = faker.address.country()
    const main_currency = faker.finance.currencyName()
    const goals = createGoals(_id)
    const recurringExpenses = createRecurringExpenses(startDate)


    return {
        _id : _id,
        email : email,
        name : name,
        location: location,
        main_currency: main_currency,
        goals : goals,
        recurringExpenses : recurringExpenses
    }


}

function createGoals(){
    const goals = []
    const numberOfGoals = faker.random.number({ min: 0, max : 10})
    for( let i = 0; i < numberOfGoals; i++){
        const newGoal = faker.company.catchPhrase()
        goals.push({item : newGoal, isComplete: faker.random.boolean()})
    }

    return goals
}

function createRecurringExpenses(startDate){
    const recurringExpenses = []
    const numberOfRecEx = faker.random.number({ min: 2, max : 5})

    for(let i = 0; i < numberOfRecEx; i++){
        const name = faker.company.bsAdjective()
        const monthlyAmount = faker.finance.amount()
        const category = SPENDING_CATEGORIES[faker.random.number({min: 0, max: SPENDING_CATEGORIES.length - 1})]
        const endDate = faker.date.future(2, startDate)
        const rec_startDate = faker.date.between(startDate, endDate)
        recurringExpenses.push({
            item: name,
            start_date : rec_startDate,
            end_date : endDate,
            category: category,
            monthly_amount : monthlyAmount
        })
    }

    return recurringExpenses
    
}

function createIncomeEntries(user_id, ){

}

function createSpendingEntries(user_id, numberOfEntries, startDate, endDate){

}

function createInvestingEntries(user_id, numberOfEntries, startDate, endDate){

}


function createMonthlyOverview(user_id) {


}

function calculateMonthlyIncome(user_id, month) {

}

function createCummOverview(monthyOverview) {


}


fs.writeFileSync("seed_data.json", JSON.stringify(seed()));