var ipQuery = require('./lib/ipQuery'),
	indexer = require('./lib/indexer');

exports.getCityInfoByIp = ipQuery.getCityInfoByIp;
exports.getCityInfoByAddress = indexer.getCityInfoByAddress;