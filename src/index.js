class PlaceholderError extends Error {
	constructor(message, index, placeholder) {
		super(message);
		
		this.index = index;
		this.placeholder = placeholder;
	}
}
module.exports.PlaceholderError = PlaceholderError;

function trueFormat(transformers = {}, string = "", ...placeholders) {
	// WIP
	return false;
}

/**
 * Formats a string with optional transformers.
 */
function format(...params) {
	if (typeof params[0] === "string") {
		return trueFormat({}, ...params);
	} else {
		return trueFormat(...params);
	}
}
module.exports.format = format;
