
var DomUtils = module.exports;
[
	require('./src/libs/manager'),
    require('./src/libs/rule'),
    require ('./src/libs/reader'),
    require ('./src/libs/writer')
].forEach(function(ext){
	Object.keys(ext).forEach(function(key){
		DomUtils[key] = ext[key].bind(DomUtils);
	});
});