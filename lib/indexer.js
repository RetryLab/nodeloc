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

	if (province && !cityIndexMap[province]) {
		cityIndexMap[province] = index;
	}
	if (province && city && !cityIndexMap[city + province]) {
		cityIndexMap[city + province] = index;
	}
	if (city && !cityIndexMap[city]) {
		cityIndexMap[city] = index;
	}
	if (city && !locParserMap[city]) {
		locParserMap[city] = 1;
	}
	if (province && !locParserMap[province]) {
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

// console.log(REG_LOC);
console.info('Loading Finished');

exports.getCityInfoByAddress = function (address) {
	if (!address) {
		console.error('invalid address');
		return null;
	}
	var matchResult = address.match(REG_LOC);
	var matchList = Array.isArray(matchResult) ? matchResult.reverse() : [];
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
	var a = exports.getCityInfoByAddress('黑龙江');
	console.log(a);
//	cityIndexMap['朝阳']
}