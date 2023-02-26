const {parse} = require('csv-parse');
const path = require('path');
const fs = require('fs');

class PlanetsModel {
    static dataPath = path.join(__dirname, '..', '..', 'data', 'kepler_data.csv');
    static habitablePlanets = [];


    static getHabitablePlanets() {
        this.loadPlanetsData();
        return this.habitablePlanets;
    }

    static loadPlanetsData() {

        const parseOptions = {
            comment: '#',
            columns: true
        }

        function filterHabitablePlanets(data) {
            if (PlanetsModel.isHabitablePlanet(data)) {
                PlanetsModel.habitablePlanets.push(data)
            }
        }

        function errorHandle(err) {
            console.log(err);
            reject(err);
        }

        return new Promise((resolve, reject) => {
            fs.createReadStream(this.dataPath)
                .pipe(parse(parseOptions))
                .on('data', (data) => filterHabitablePlanets(data))
                .on('error', (err) => errorHandle(err))
                .on('end', () => resolve());
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

}



module.exports = {
    habitablePlanets : PlanetsModel.getHabitablePlanets()
}