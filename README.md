# stuart api technical test

## run intructions:

Make sure you have node 12 installed and running

to install dependencies:
`npm i`

to run without docker:
`npm start`

to run tests:
`npm test`

to run in docker (please note download of node12 takes a while):
- build image: `docker build -t bm/stu .`
- run image: `docker run -p 3000:3000 -d bm/stu`

## to query the API, run from the console:

to add new courier:
```
curl -X POST http://localhost:9000/couriers/add -H "Content-Type: application/json" --data '
{
  "max_capacity": 45
}'
```

to update courier's capacity:
```
curl -X PUT http://localhost:9000/couriers -H "Content-Type: application/json" --data '
{
  "id": 3,
  "req_capacity": 3
}'
```

to remove couriers with given id:
```
curl -X DELETE http://localhost:9000/couriers/remove -H "Content-Type: application/json" --data '
{
  "id": 1
}'
```

to find couriers with required capacity:
```
curl -X GET http://localhost:9000/couriers/lookup -H "Content-Type: application/json" --data '
{
  "capacity_required": 1
}'
```