const result = { key: "value" };
const courier = {
  id: 2,
  max_capacity: 45,
  available_capacity: 45,
  $loki: 2
};

const requestNoData = {
  app: {
    locals: {
      db: {
        getCollection: jest.fn(),
      },
    },
  },
  body: {},
};

const reqWithData = {
  app: {
    locals: {
      db: {
        getCollection: jest.fn().mockReturnValue({
          chain: jest.fn().mockReturnValue({
            find: jest.fn().mockReturnValue({
              simplesort: jest.fn().mockReturnValue({
                data: jest.fn().mockReturnValue({
                  reverse: jest.fn().mockReturnValue(result),
                }),
              }),
              update: jest.fn()
            }),
          }),
          insert: jest.fn().mockReturnValue(courier),
          findAndRemove: jest.fn().mockReturnValue(courier),
          findOne: jest.fn().mockReturnValue(courier),
          find: jest.fn().mockReturnValue(courier),
          remove: jest.fn().mockReturnValue(courier),
          on: jest.fn(),
        }),
      },
    },
  },
  body: {
    id: 1,
    available_capacity: 45,
    capacity_required: 10,
    max_capacity: 45,
  },
};

module.exports = {result, requestNoData, reqWithData, courier}
