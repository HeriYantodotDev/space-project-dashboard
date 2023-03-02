const {parse} = require('csv-parse');
const path = require('path');
const fs = require('fs');

const Planets = require('./planets.mongo')

class PlanetsModel {
	static dataPath = path.join(__dirname, '..', '..', 'data', 'kepler_data.csv');
	
	static async getHabitablePlanets() {
		return await Planets.find({}, {
			'_id': 0, '__v': 0
		})
	}
	
	static loadPlanetsData() {
		
		const parseOptions = {
			comment: '#',
			columns: true
		}
		
		async function filterHabitablePlanets(data) {
			if (PlanetsModel.isHabitablePlanet(data)) {
				await PlanetsModel.savePlanetToDatabase(data);
			}
		}
		
		function errorHandle(err) {
			console.log(err);
			reject(err);
		}
		
		return new Promise((resolve, reject) => {
			fs.createReadStream(PlanetsModel.dataPath)
			.pipe(parse(parseOptions))
			.on('data', (data) => filterHabitablePlanets(data))
			.on('error', (err) => errorHandle(err))
			.on('end', async () => {
				const countPlanetsFound = (await Planets.find({})).length;
				console.log(` ${countPlanetsFound} founds`);
				// console.log(Planets.find({}));
				// console.log(Planets.find({}));
				resolve();
			});
		}); 
		
	}
	
	static isHabitablePlanet(planet) {
		function isConfirmed(planet) {
			return planet['koi_disposition'] === 'CONFIRMED';
		}
		
		function isStellarFluxInRange(planet){
			return planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11;
		}
		
		function isRadiusInRange(planet){
			return planet['koi_prad'] < 1.6
			
			;
		}
		return isConfirmed(planet) && isStellarFluxInRange(planet) && isRadiusInRange(planet);
	}
	
	static async savePlanetToDatabase(data) {
		try {
			await Planets.updateOne({
				keplerName: data.kepler_name
			}, {
				keplerName: data.kepler_name
			}, {
				upsert: true
			});
		} catch(err) {
			console.err(`Could not save planet ${err}`);
		}
		
	}
	
}

module.exports = {
	loadPlanetsData : PlanetsModel.loadPlanetsData,
	gethabitablePlanets : PlanetsModel.getHabitablePlanets
}