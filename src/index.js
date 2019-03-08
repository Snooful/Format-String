class PlaceholderError extends Error {
	constructor(message, index, placeholder) {
		super(message);
		
		this.index = index;
		this.placeholder = placeholder;
	}
}
module.exports.PlaceholderError = PlaceholderError;

function trueFormat(opts = {}) {
	// WIP
	return false;
}

/**
 * Formats a string with optional transformers.
 */
function format(...params) {
	let opts = {
		transformers: {},
		template: "",
		placeholders: [],
	};
	
	// Standardize into an `opts` object
	if (params.length === 1 && typeof params[0] === "object") {
		// Singular `opts` parameter
		opts = Object.assign(opts, params[0]);
	} else if (typeof params[0] === "object" && typeof params[1] === "string") {
		// Transformers, template, and rest is placeholders
		opts.transformers = params[0];
		opts.template = params[1];
		opts.placeholders = params.splice(2);
	} else if (typeof params[0] === "string") {
		// Template and rest is placeholders
		opts.template = params[0];
		opts.placeholders = params.splice(1);
	} else {
		throw new TypeError("Invalid parameters");
	}
	
	// Now check individual types
	if (typeof opts.transformers !== "object") throw new TypeError("The transformers must be an object.");
	if (typeof opts.template !== "string") throw new TypeError("The template string must be a string.");
	if (!Array.isArray(opts.placeholders)) throw new TypeError("The placeholders must be an object.");
	
	return trueFormat(opts);
}
module.exports.format = format;
