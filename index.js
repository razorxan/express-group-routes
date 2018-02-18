const express = require('express');

express.application.group = express.Router.group = function() {
	let fn = arguments[0], path = "/", mw = []
	if (arguments.length === 2) {
		path = arguments[0]
		fn = arguments[1]
	} else if (arguments.length > 2) {
		path = arguments[0]
		mw = Array.prototype.slice.call(arguments, 1, arguments.length -1)
		fn = arguments[arguments.length - 1]
	}
    const router = express.Router()
	fn.call(router, router)
    this.use.apply(this, [].concat(path, mw, router))
    return router
}
