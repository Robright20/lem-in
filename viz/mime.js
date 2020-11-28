const MIMETypes = {
	'html': 'text/html',
	'css': 'text/css',
	'js': 'text/javascript',
	'svg': 'image/svg+xml',
	getType: function (str) {
		for (let key in this) {
			if (key === str)
				return this[key];
		}
		return null;
	}
};

module.exports = MIMETypes;