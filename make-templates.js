#!/usr/bin/env node

var fs = require('fs');
var hogan = require('hogan.js');

fs.readdir('assets/templates', function(e, files){
	if (e) throw e;

	var code = '(function(t){\n'
		+ '\tTEMPLATES={\n';

	files.forEach(function(file){
		if (/\.mustache$/i.test(file)){
			var mustache = fs.readFileSync('assets/templates/' + file, 'ascii');
			var key = file.match(/^([^.]+)\./i)[1];
			// Clean up some spaces
			mustache = mustache.replace(/[\r\n\t]+/g, '');
			code += "\t\t'" + key + "': new t(" + hogan.compile(mustache, {asString: true}) + "),\n";
		}
	});

	code += '\t}\n'
		+ '})(Hogan.Template);';

	fs.writeFile('assets/js/templates.js', code, function(){
		console.log('assets/js/templates.js created.');
	});
});