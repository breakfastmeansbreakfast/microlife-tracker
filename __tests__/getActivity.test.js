const fs = require('fs');
const path = require('path');
const events = require('events');
const httpMocks = require('node-mocks-http');

const getActivity = require('../controllers/getActivity');

describe('getActivities', () => {
  const filePath = path.join(__dirname, '../controllers', 'user.json');
  it('gets the details of an activity', done => {
    expect.assertions(2);
    const user = {
      profile: {
        activities: [
          {
            activityId: 'short-walk',
            quantity: 1,
          }, {
            activityId: 'red-meat',
            quantity: 2,
          },
        ],
      },
    };
    fs.writeFile(filePath, JSON.stringify(user), () => {
      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/profile/activities',
      });
      const res = httpMocks.createResponse({
        eventEmitter: events.eventEmitter,
      });
      getActivity(req, res);
      res.on('end', () => {
        expect(res.statusCode).toEqual(200);
        expect(res._getData()).toEqual(user.profile.activities);
      });
      done();
    });
  });
  afterEach(() => {
    fs.writeFileSync(filePath, '{"profile":{"activities":[]}}');
  });
});
