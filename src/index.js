class PlaceholderError extends Error {
	constructor(message, index, placeholder) {
		super(message);
		
		this.index = index;
		this.placeholder = placeholder;
	}
}
module.exports.PlaceholderError = PlaceholderError;

function format(...params) {
}
module.exports.format = format;
