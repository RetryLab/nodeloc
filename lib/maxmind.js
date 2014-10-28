// require the db reader
var mmdbreader = require('maxmind-db-reader');
//  open database
var countries = mmdbreader.openSync(__dirname + '/../data/GeoLite2-City.mmdb');

exports.getCityByIP = function (ipStr) {
	if (!ipStr) {
		console.log('invalid ip');
		return null;
	}
	var geodata = countries.getGeoDataSync(ipStr);

//	console.log(JSON.stringify(geodata));

	if (geodata && geodata.city && geodata.city.names && geodata.city.names['zh-CN']) {
		return geodata.city.names['zh-CN'];
	} else {
		return null;
	}
}

if (!module.parent) {
	exports.getCityByIP('')
}