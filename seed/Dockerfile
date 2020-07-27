FROM mongo

ADD . /files
WORKDIR /files
CMD mongoimport --port 27017 --db millamoolah --collection expense  --file ./seeddata_expense.json --jsonArray && mongoimport --port 27017 --db millamoolah --collection users  --file ./seeddata_users.json --jsonArray && mongoimport --port 27017 --db millamoolah --collection income  --file ./seeddata_income.json --jsonArray 