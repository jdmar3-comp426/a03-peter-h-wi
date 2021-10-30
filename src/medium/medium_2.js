import mpg_data from "./data/mpg_data.js";
import {getStatistics} from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */

export const allCarStats = {
    avgMpg: {
        city: mpg_data.reduce( function ( acc, obj ) {
            return acc + obj.city_mpg;
        }, 0) / mpg_data.length,
        highway: mpg_data.reduce( function ( acc, obj ) {
            return acc + obj.highway_mpg;
        }, 0) / mpg_data.length
    },
    allYearStats: getStatistics(mpg_data.reduce(function ( acc, obj ) {
        acc.push(obj.year);
        return acc;
    }, [])),
    ratioHybrids: (mpg_data.filter(car => car["hybrid"] == true).length)/(mpg_data.length),
};
console.log(allCarStats)

/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */
export const moreStats = {
    makerHybrids: mpg_data.reduce( function ( acc, obj ) {
        let maker = obj.make
        if (acc.indexOf(maker)>=0) {
            return acc;
        }
        let ids = mpg_data.reduce( function ( acc2, obj2 ) {
            let isHybrid = obj2.hybrid;
            if (isHybrid && maker == obj2.make) {
                acc2.push(obj2.id);
            }
            return acc2;
        }, [])
        let newObj = {"make": maker, "hybrids": ids};
        acc.push(newObj);
        return acc;
    }, []),
    avgMpgByYearAndHybrid: mpg_data.reduce( function ( acc, obj ) {
        let year = obj.year;

        if (acc[year.toString()] != undefined) {
            return acc;
        }

        let hybrids = mpg_data.filter(car => car.year == year && car.hybrid == true);
        let noHybrids = mpg_data.filter(car => car.year == year && car.hybrid == false);

        let hybridsCityMpg = hybrids.reduce( function ( acc2, obj2 ) {
            return acc2 + obj2.city_mpg;
        }, 0) / hybrids.length;
        let hybridsHighwayMpg = hybrids.reduce( function ( acc2, obj2 ) {
            return acc2 + obj2.highway_mpg;
        }, 0) / hybrids.length;

        let noHybridsCityMpg = noHybrids.reduce( function ( acc2, obj2 ) {
            return acc2 + obj2.city_mpg;
        }, 0) / noHybrids.length;
        let noHybridsHighwayMpg = noHybrids.reduce( function ( acc2, obj2 ) {
            return acc2 + obj2.highway_mpg;
        }, 0) / noHybrids.length;

        let mpgs = {"hybrid": {"city": hybridsCityMpg, "highway": hybridsHighwayMpg}, "notHybrid": {"city": noHybridsCityMpg, "highway": noHybridsHighwayMpg}};
        
        acc[year.toString()] = mpgs;
        return acc;
    }, {}),
};
