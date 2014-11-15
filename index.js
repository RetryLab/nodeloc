var ipQuery = require('./lib/ipQuery'),
	indexer = require('./lib/indexer');

exports.getCityInfoByIp = ipQuery.getCityInfoByIp;
exports.getQQwryInfo = ipQuery.getQQwryInfo;
exports.getCityInfoByAddress = indexer.getCityInfoByAddress;

if(!module.parent){
//	var info = exports.getCityInfoByIp('118.244.254.200');
	var info = exports.getQQwryInfo('122.70.31.13');
	console.log(info);
}