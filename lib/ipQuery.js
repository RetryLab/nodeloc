var qqwry = require('./qqwry'),
	maxmind = require('./maxmind'),
	indexer = require('./indexer');
qqwry.loadDataFile('../data/qqwry.dat');

exports.getCityInfoByIp = function (ipStr) {
	var arr = qqwry.lookup(ipStr);
	if (arr) {
		return indexer.getCityInfoByAddress(arr[0]);
	} else {
		//if cannot find in qqwry, try geolite
		return maxmind.getCityByIP(ipStr);
	}
}

if (!module.parent) {
	var cityInfo = exports.getCityInfoByIp('211.84.64.4');
	console.log(cityInfo);
}