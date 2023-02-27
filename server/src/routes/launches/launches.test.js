const request = require('supertest');
const app = require('../../app');


describe('Test GET /launch', () => {
    test('It should respond with 200 success', async () => {
        const response = await request(app)
        .get('/launches')
        .expect('Content-Type', /json/)
        .expect(200);
    })
});

describe('Test POST /launch', () => {

    const completeLaunchData = {
        mission: 'Yoda - Kimak',
        rocket: 'Yoda\'s rocket',
        target :'Keplet-186',
        launchDate: 'January 4, 2028'
    }

    const launchDataWithoutdate = {
        mission: 'Yoda - Kimak',
        rocket: 'Yoda\'s rocket',
        target :'Keplet-186',
    }

    const LaunchDataWithInvalidDate = {
        mission: 'Yoda - Kimak',
        rocket: 'Yoda\'s rocket',
        target :'Keplet-186',
        launchDate: 'Aguan'
    }

    const errorObjectIsEmpty = {
        error : "Missing required property"
    }

    const errorObjectDateInvalid = {
        error : "Invalid launch date"
    }

    test('It should respond with 201 created', async () => {
        const response = await request(app)
        .post('/launches')
        .send(completeLaunchData)
        .expect('Content-Type', /json/)
        .expect(201);

        const requestDate = new Date(completeLaunchData.launchDate).valueOf();
        const responseDate = new Date(response.body.launchDate).valueOf();

        expect(responseDate).toBe(requestDate);

        expect(response.body).toMatchObject(launchDataWithoutdate)
    });

    test('It should catch missing required properties', async () => {
        const response = await request(app)
        .post('/launches')
        .send(launchDataWithoutdate)
        .expect('Content-Type', /json/)
        .expect(400);

        expect(response.body).toStrictEqual(errorObjectIsEmpty.error);

    });

    test('It should catch invalid dates', async () => {
        const response = await request(app)
        .post('/launches')
        .send(LaunchDataWithInvalidDate)
        .expect('Content-Type', /json/)
        .expect(400);

        expect(response.body).toStrictEqual(errorObjectDateInvalid.error);

    });

});


// test('It should respond with 200 success', () => {

// })