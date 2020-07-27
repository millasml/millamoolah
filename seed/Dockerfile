FROM mongo

COPY . /files
WORKDIR /files
CMD mongoimport --host mongodb --db millamoolah --collection expense  --file ./seeddata_expense.json --jsonArray && mongoimport --host mongodb --db millamoolah --collection users  --file ./seeddata_users.json --jsonArray && mongoimport --host mongodb --db millamoolah --collection income  --file ./seeddata_income.json --jsonArray 