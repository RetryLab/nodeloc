var qqwry = require('./qqwry'),
	maxmind = require('./maxmind'),
	monip = require('./monip'),
	indexer = require('./indexer');
qqwry.loadDataFile(__dirname + '/../data/qqwry.dat');

exports.getCityInfoByIp = function (ipStr) {
	var cityInfo;
	//qqwry
	var arr = qqwry.lookup(ipStr);
	arr && (cityInfo = indexer.getCityInfoByAddress(arr[0]));
	if (cityInfo) {
		return cityInfo;
	}

	arr = monip.findSync(ipStr);
	arr && (cityInfo = indexer.getCityInfoByAddress(arr.join('')));
	if (cityInfo) {
		return cityInfo;
	}

	//if cannot find in qqwry, try geolite
	return indexer.getCityInfoByAddress(maxmind.getCityByIP(ipStr)||'unknown');
}

exports.getQQwryInfo = function(ip){
	return qqwry.lookup(ip);
}

if (!module.parent) {
//	var cityInfo = exports.getCityInfoByIp('211.84.64.4');
//	var cityInfo = exports.getCityInfoByIp('211.154.172.172');
	var cityInfo = exports.getCityInfoByIp('61.128.115.23');
	console.log(cityInfo);
}
