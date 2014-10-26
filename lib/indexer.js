var fs = require('fs'),
	locParserList = [],
	cityIndexMap = {},
	locParserMap = {},
	cityMap = {};

console.info('Loading City DB...');
var data = fs.readFileSync(__dirname + '/../data/city.txt');
var lines = (data + '').split('\n');

function processData(line) {
	var cols = line.split('\t'),
		index = cols[0],
		province = cols[1],
		city = cols[2];
//		county = cols[3],
//		telArea = cols[4],
//		postCode = cols[5];

	cityMap[index] = {
		province: province,
		city: city
	};

	if (!cityIndexMap[province]) {
		cityIndexMap[province] = index;
	}
	if (!cityIndexMap[city + province]) {
		cityIndexMap[city + province] = index;
	}
	if (!cityIndexMap[city]) {
		cityIndexMap[city] = index;
	}
	if (!locParserMap[city]) {
		locParserMap[city] = 1;
	}
	if (!locParserMap[province]) {
		locParserMap[province] = 1;
	}
}
lines.forEach(function (line) {
	processData(line);
})

// deal with some illegal data
// processData(\\)

for (var locName in locParserMap) {
	locParserList.push(locName);
}
var REG_LOC = new RegExp(locParserList.join('|'), 'g');

console.info('Loading Finished');

exports.getCityInfoByAddress = function (address) {
	if (!address) {
		console.error('invalid address');
		return null;
	}

	var matchList = address.match(REG_LOC).reverse();
	var index = -1;
	for (var i = 0; i < matchList.length; i++) {
		if (cityIndexMap[matchList.join('')]) {
			index = cityIndexMap[matchList.join('')];
			break;
		}
		matchList.shift();
	}
	return cityMap[index];
}

if (!module.parent) {
	var a = exports.getCityInfoByAddress('东城');
	console.log(a);
//	cityIndexMap['朝阳']
}