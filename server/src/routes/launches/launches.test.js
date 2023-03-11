const {
	warningDeleteLaunch,
	getFlightNumberByTestFilterObject
} = require('../../models/launches.model');

// const { loadPlanetsData } = require("../../models/planets.model");

// const { loadLaunchData } = require("../../models/launches.model");

// const {saveSpaceXUserToDatabase} = require('../../models/users.model');

const request = require('supertest');

const ObjectId = require('mongoose').Types.ObjectId;

const {
	connectMongoDB,
	disconnectMongoDB
} = require('../../service/mongo');

const app = require('../../app');

let agent;

const userObjectIDForTest = '6406b10e5b84e6fc4c4c5852';

const completeLaunchData = {
	mission: 'Yoda - Testing @#$%',
	rocket: 'Yoda\'s rocket',
	target :'Kepler-1652 b',
	launchDate: 'January 4, 2028',
	userID: new ObjectId(userObjectIDForTest)
}

const launchDataWithoutdate = {
	mission: 'Yoda - Testing @#$%',
	rocket: 'Yoda\'s rocket',
	target :'Kepler-1652 b',
}

const LaunchDataWithInvalidDate = {
	mission: 'Yoda - Testing @#$%',
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

describe('Launches API', () => {
	jest.setTimeout(50000);
	const launchesURL = `/v1/launches`;

	beforeAll(async () => {
		await connectMongoDB();

		agent = request.agent(app);

		const result = await agent.post('/v1/auth/login')
			.send({ email: 'sheldon@gmail.com', password: '123' })
			.expect(302);
  });
	
	afterAll(async () => {

		await disconnectMongoDB();
	}
	);
	
	

	describe('Test GET /launches', () => {
		test('It should respond with 200 success', async () => {
			const response = await agent.get(launchesURL)
				.expect('Content-Type', /json/)
				.expect(200);
		})
	});

	describe('Test POST /launch', () => {
		
	
		test('It should respond with 201 created', async () => {
			const response = await agent.post(launchesURL)
				.send(completeLaunchData)
				.expect('Content-Type', /json/)
				.expect(201);
			
			const requestDate = new Date(completeLaunchData.launchDate).valueOf();
			const responseDate = new Date(response.body.launchDate).valueOf();
			
			expect(responseDate).toBe(requestDate);
			
			expect(response.body).toMatchObject(launchDataWithoutdate);

			
			// await warningDeleteLaunch(completeLaunchData);
		});

		test('It should catch missing required properties', async () => {
			const response = await agent.post(launchesURL)
				.send(launchDataWithoutdate)
				.expect('Content-Type', /json/)
				.expect(400);
			
			expect(response.body.error).toStrictEqual(errorObjectIsEmpty.error);
		});

	
		test('It should catch invalid dates', async () => {
			const response = await agent.post(launchesURL)
				.send(LaunchDataWithInvalidDate)
				.expect('Content-Type', /json/)
				.expect(400);
			
			expect(response.body.error).toStrictEqual(errorObjectDateInvalid.error);
		});


	});

	describe('Test DELETE /launches', () => {
		test('It should change the Upcoming and Success to false', async () => {
			const flightNumber = await getFlightNumberByTestFilterObject(launchDataWithoutdate);

			const response = await agent.delete(`${launchesURL}/${flightNumber.flightNumber}`)
				.expect('Content-Type', /json/)
				.expect(200);
			
			expect(response.body.upcoming).toStrictEqual(false);
			expect(response.body.success).toStrictEqual(false);

			await warningDeleteLaunch(completeLaunchData);
		});
	})



});
	
	