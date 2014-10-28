var ipQuery = require('./lib/ipQuery'),
	indexer = require('./lib/indexer');

exports.getCityInfoByIp = ipQuery.getCityInfoByIp;
exports.getCityInfoByAddress = indexer.getCityInfoByAddress;

if(!module.parent){
	var info = exports.getCityInfoByIp('118.244.254.200');
	console.log(info);
}