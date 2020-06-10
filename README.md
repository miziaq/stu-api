# stuart api technical test

For the purpose of this test I chose the following tools:
- `express-generator` gives a quick out-of-the-box (arguably most popular) node http server in no-time
- `lokijs` is a cheap, performant memory/file based storage solution perfect for device storage or (like in this case) app prototyping, but I'd go with any document storage as long as it's easy to query - I believe JS doesn't require mysql databases when it has JSON as its child. Since the app would live in AWS, DocumentDB would probably be a go-to choice, but it's always better to think twice when it comes to data storage: data migration is usually more difficult than replatforming the code. It's also important to take possible and changing relationships into account.
- `jest` is my test framework of choice since it's a popular all-in-one solution, but I have a soft spot for supertest and tap :) Uncovered lines are lokijs commands -> they depend on the package's internal logic, so shouldn't be considered app logic.

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
curl -X POST http://localhost:3000/couriers/add -H "Content-Type: application/json" --data '
{
  "max_capacity": 45
}'
```

to update courier's capacity:
```
curl -X PUT http://localhost:3000/couriers -H "Content-Type: application/json" --data '
{
  "id": 3,
  "req_capacity": 3
}'
```

to remove couriers with given id:
```
curl -X DELETE http://localhost:3000/couriers/remove -H "Content-Type: application/json" --data '
{
  "id": 1
}'
```

to find couriers with required capacity:
```
curl -X GET http://localhost:3000/couriers/lookup -H "Content-Type: application/json" --data '
{
  "capacity_required": 1
}'
```

## bonus

### updating
[updtaing implemeneted here](https://github.com/miziaq/stu-api/blob/master/src/routes/update-couriers.js)

### deployment
- I added a docker container with node 12, so the app can run easily in AWS/ECS
- Terraforming an ECS cluster along with a database, subnet load balancers etc would be the next (tedious) step 
- alternatively AWS Lambda application could be used with an API gateway in the front and DocumentDB as the data storage

### output schema
- for the purpose of choosing the right courier we probably should split the schema into sections like below
```
{
    id: number, // unique
    capacity: {
        maxCap: number, // in liters
        currentCap: number, // in liters
        maxWeight: number, // in kg
        currentWeight: number // in kg
    },
    personal: { // courier's personal info
        name: string, // courier's name
        tel: number // phone
    },
    orders: [ // list of orders in order :)
        {
            orderId: number // unique id of the order
            delivery: {// information on package's destination
                eta: timestamp // estimated time of arrival,
                address: string // delivery address
                lat: number // latitude of delivery address
                lon: number // longitude of delivery address
                deliverySlot
            },
            package: { // properties of the package that can have impact on delivery
                packageId: number // unique id of the package
                capacity: number, // in liters
                weight: number // in kgs
                fragile: boolean 
            }
        }
    ],
    vehicle: {
        id: string // plate number unique
        type: string, // (bike, scooter, car, van, none) movement capabilities useful in calculating time of delivery, considering traffic conditions etc
        description: string // human-readable description
    }
}
```
I think the above schema contains enough information for each couriers to operate and to be managed in the system.
Each schema object is unique and meaningful on its own, can be abstracted and copied to/from a different store without mutation.

### race conditions:
The common practice is reading the writes, so when the user tries to save their data, the system may read the selected record again to check if it stll fulfills desired condition. If the condition is not satisfied, search for next record that does satisfy it and write straight away. While writing, the record should be locked, then when the operation is finished, lock can be released.

## notes
- [x] documentation
- show off
  - [ ] TS: not employed since we have only one type of data and no contracts with other applications - in a small project like this, it would not be an improvement
  - [x] TDD: to an extent ;)
  - [x] unit tests
  - [x] patterns
    - factory 
    - read-write lock
    - front controller
    - command
    - modules
    - functional programming
    - single responsibility modules
  - [x] programming principles
    - KISS 
    - DRY
    - YAGNI
    - SOLID
- Space for improvements or "if I had more time..." or maybe: "if this was a real project...", 
  - I would use async/await in my routes to manage data reading and writing, but the choice of `lokijs` allowed me not to bother with this. 
  - I'd probably add some tools that would minify the code in the build process and tree-shake the modules like `webpack` or `rollup`. 
  - I'd add `Babel` to be able to use the modern JS capabilities, but I started with `express-generator` and `require` didn't bother me at all while writing the test ;)
  - ...OR if the scale of the project got larger and types were shared between corresponding apps, I'd probably go with TypeScript, but made sure types shared across the apps live in their own separate versioned package/repository 
  - versioning of the api
  - `tslint` / `eslint`, because coding is craft
  - `prettier`, because few things are more annoying than delays caused by bickering over spacing in code reviews
