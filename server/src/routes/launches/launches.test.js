const request = require('supertest');

const {
    connectMongoDB,
    disconnectMongoDB
} = require('../../service/mongo');

const app = require('../../app');

describe('Launches API', () => {

    const launchesURL = `/v1/launches`;

    beforeAll(async () => {
        await connectMongoDB();
    });

    afterAll(async () => {
        await disconnectMongoDB();
    }
    );

    describe('Test GET /launch', () => {
        test('It should respond with 200 success', async () => {
            const response = await request(app)
            .get(launchesURL)
            .expect('Content-Type', /json/)
            .expect(200);
        })
    });
    
    describe('Test POST /launch', () => {
        const completeLaunchData = {
            mission: 'Yoda - Kimak',
            rocket: 'Yoda\'s rocket',
            target :'Kepler-1652 b',
            launchDate: 'January 4, 2028'
        }
    
        const launchDataWithoutdate = {
            mission: 'Yoda - Kimak',
            rocket: 'Yoda\'s rocket',
            target :'Kepler-1652 b',
        }
    
        const LaunchDataWithInvalidDate = {
            mission: 'Yoda - Kimak',
            rocket: 'Yoda\'s rocket',
            target :'Kepler-1652 b',
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
            .post(launchesURL)
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
            .post(launchesURL)
            .send(launchDataWithoutdate)
            .expect('Content-Type', /json/)
            .expect(400);
    
            expect(response.body).toStrictEqual(errorObjectIsEmpty.error);
    
        });
    
        test('It should catch invalid dates', async () => {
            const response = await request(app)
            .post(launchesURL)
            .send(LaunchDataWithInvalidDate)
            .expect('Content-Type', /json/)
            .expect(400);
    
            expect(response.body).toStrictEqual(errorObjectDateInvalid.error);
    
        });
    });
})