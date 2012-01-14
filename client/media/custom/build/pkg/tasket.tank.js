/*!
* Tasket
*   github.com/dharmafly/tasket
*
*//*
    An open-source, HTML5, data visualised, micro-volunteering app.
*//*

    by Dharmafly
        dharmafly.com

    license
        opensource.org/licenses/mit-license.php

    **

    v0.0.1

*/

(function (window, document) {
"use strict";

/*!
 * jQuery JavaScript Library v1.7
 * http://jquery.com/
 *
 * Copyright 2011, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2011, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Thu Nov 3 16:18:21 2011 -0400
 */
(function( window, undefined ) {

// Use the correct document accordingly with window argument (sandbox)
var document = window.document,
	navigator = window.navigator,
	location = window.location;
var jQuery = (function() {

// Define a local copy of jQuery
var jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		return new jQuery.fn.init( selector, context, rootjQuery );
	},

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$,

	// A central reference to the root jQuery(document)
	rootjQuery,

	// A simple way to check for HTML strings or ID strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	quickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,

	// Check if a string has a non-whitespace character in it
	rnotwhite = /\S/,

	// Used for trimming whitespace
	trimLeft = /^\s+/,
	trimRight = /\s+$/,

	// Check for digits
	rdigit = /\d/,

	// Match a standalone tag
	rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,

	// JSON RegExp
	rvalidchars = /^[\],:{}\s]*$/,
	rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
	rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
	rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,

	// Useragent RegExp
	rwebkit = /(webkit)[ \/]([\w.]+)/,
	ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/,
	rmsie = /(msie) ([\w.]+)/,
	rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/,

	// Matches dashed string for camelizing
	rdashAlpha = /-([a-z]|[0-9])/ig,
	rmsPrefix = /^-ms-/,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return ( letter + "" ).toUpperCase();
	},

	// Keep a UserAgent string for use with jQuery.browser
	userAgent = navigator.userAgent,

	// For matching the engine and version of the browser
	browserMatch,

	// The deferred used on DOM ready
	readyList,

	// The ready event handler
	DOMContentLoaded,

	// Save a reference to some core methods
	toString = Object.prototype.toString,
	hasOwn = Object.prototype.hasOwnProperty,
	push = Array.prototype.push,
	slice = Array.prototype.slice,
	trim = String.prototype.trim,
	indexOf = Array.prototype.indexOf,

	// [[Class]] -> type pairs
	class2type = {};

jQuery.fn = jQuery.prototype = {
	constructor: jQuery,
	init: function( selector, context, rootjQuery ) {
		var match, elem, ret, doc;

		// Handle $(""), $(null), or $(undefined)
		if ( !selector ) {
			return this;
		}

		// Handle $(DOMElement)
		if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;
		}

		// The body element only exists once, optimize finding it
		if ( selector === "body" && !context && document.body ) {
			this.context = document;
			this[0] = document.body;
			this.selector = selector;
			this.length = 1;
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			// Are we dealing with HTML string or an ID?
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = quickExpr.exec( selector );
			}

			// Verify a match, and that no context was specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;
					doc = ( context ? context.ownerDocument || context : document );

					// If a single string is passed in and it's a single tag
					// just do a createElement and skip the rest
					ret = rsingleTag.exec( selector );

					if ( ret ) {
						if ( jQuery.isPlainObject( context ) ) {
							selector = [ document.createElement( ret[1] ) ];
							jQuery.fn.attr.call( selector, context, true );

						} else {
							selector = [ doc.createElement( ret[1] ) ];
						}

					} else {
						ret = jQuery.buildFragment( [ match[1] ], [ doc ] );
						selector = ( ret.cacheable ? jQuery.clone(ret.fragment) : ret.fragment ).childNodes;
					}

					return jQuery.merge( this, selector );

				// HANDLE: $("#id")
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return rootjQuery.ready( selector );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	},

	// Start with an empty selector
	selector: "",

	// The current version of jQuery being used
	jquery: "1.7",

	// The default length of a jQuery object is 0
	length: 0,

	// The number of elements contained in the matched element set
	size: function() {
		return this.length;
	},

	toArray: function() {
		return slice.call( this, 0 );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num == null ?

			// Return a 'clean' array
			this.toArray() :

			// Return just the object
			( num < 0 ? this[ this.length + num ] : this[ num ] );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems, name, selector ) {
		// Build a new jQuery matched element set
		var ret = this.constructor();

		if ( jQuery.isArray( elems ) ) {
			push.apply( ret, elems );

		} else {
			jQuery.merge( ret, elems );
		}

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		ret.context = this.context;

		if ( name === "find" ) {
			ret.selector = this.selector + ( this.selector ? " " : "" ) + selector;
		} else if ( name ) {
			ret.selector = this.selector + "." + name + "(" + selector + ")";
		}

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	ready: function( fn ) {
		// Attach the listeners
		jQuery.bindReady();

		// Add the callback
		readyList.add( fn );

		return this;
	},

	eq: function( i ) {
		return i === -1 ?
			this.slice( i ) :
			this.slice( i, +i + 1 );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ),
			"slice", slice.call(arguments).join(",") );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: [].sort,
	splice: [].splice
};

// Give the init function the jQuery prototype for later instantiation
jQuery.fn.init.prototype = jQuery.fn;

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( length === i ) {
		target = this;
		--i;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	noConflict: function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	},

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {
		// Either a released hold or an DOMready/load event and not yet ready
		if ( (wait === true && !--jQuery.readyWait) || (wait !== true && !jQuery.isReady) ) {
			// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
			if ( !document.body ) {
				return setTimeout( jQuery.ready, 1 );
			}

			// Remember that the DOM is ready
			jQuery.isReady = true;

			// If a normal DOM Ready event fired, decrement, and wait if need be
			if ( wait !== true && --jQuery.readyWait > 0 ) {
				return;
			}

			// If there are functions bound, to execute
			readyList.fireWith( document, [ jQuery ] );

			// Trigger any bound ready events
			if ( jQuery.fn.trigger ) {
				jQuery( document ).trigger( "ready" ).unbind( "ready" );
			}
		}
	},

	bindReady: function() {
		if ( readyList ) {
			return;
		}

		readyList = jQuery.Callbacks( "once memory" );

		// Catch cases where $(document).ready() is called after the
		// browser event has already occurred.
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			return setTimeout( jQuery.ready, 1 );
		}

		// Mozilla, Opera and webkit nightlies currently support this event
		if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", jQuery.ready, false );

		// If IE event model is used
		} else if ( document.attachEvent ) {
			// ensure firing before onload,
			// maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", DOMContentLoaded );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", jQuery.ready );

			// If IE and not a frame
			// continually check to see if the document is ready
			var toplevel = false;

			try {
				toplevel = window.frameElement == null;
			} catch(e) {}

			if ( document.documentElement.doScroll && toplevel ) {
				doScrollCheck();
			}
		}
	},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	// A crude way of determining if an object is a window
	isWindow: function( obj ) {
		return obj && typeof obj === "object" && "setInterval" in obj;
	},

	isNumeric: function( obj ) {
		return obj != null && rdigit.test( obj ) && !isNaN( obj );
	},

	type: function( obj ) {
		return obj == null ?
			String( obj ) :
			class2type[ toString.call(obj) ] || "object";
	},

	isPlainObject: function( obj ) {
		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.

		var key;
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	isEmptyObject: function( obj ) {
		for ( var name in obj ) {
			return false;
		}
		return true;
	},

	error: function( msg ) {
		throw msg;
	},

	parseJSON: function( data ) {
		if ( typeof data !== "string" || !data ) {
			return null;
		}

		// Make sure leading/trailing whitespace is removed (IE can't handle it)
		data = jQuery.trim( data );

		// Attempt to parse using the native JSON parser first
		if ( window.JSON && window.JSON.parse ) {
			return window.JSON.parse( data );
		}

		// Make sure the incoming data is actual JSON
		// Logic borrowed from http://json.org/json2.js
		if ( rvalidchars.test( data.replace( rvalidescape, "@" )
			.replace( rvalidtokens, "]" )
			.replace( rvalidbraces, "")) ) {

			return ( new Function( "return " + data ) )();

		}
		jQuery.error( "Invalid JSON: " + data );
	},

	// Cross-browser xml parsing
	parseXML: function( data ) {
		var xml, tmp;
		try {
			if ( window.DOMParser ) { // Standard
				tmp = new DOMParser();
				xml = tmp.parseFromString( data , "text/xml" );
			} else { // IE
				xml = new ActiveXObject( "Microsoft.XMLDOM" );
				xml.async = "false";
				xml.loadXML( data );
			}
		} catch( e ) {
			xml = undefined;
		}
		if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	},

	noop: function() {},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && rnotwhite.test( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toUpperCase() === name.toUpperCase();
	},

	// args is for internal usage only
	each: function( object, callback, args ) {
		var name, i = 0,
			length = object.length,
			isObj = length === undefined || jQuery.isFunction( object );

		if ( args ) {
			if ( isObj ) {
				for ( name in object ) {
					if ( callback.apply( object[ name ], args ) === false ) {
						break;
					}
				}
			} else {
				for ( ; i < length; ) {
					if ( callback.apply( object[ i++ ], args ) === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isObj ) {
				for ( name in object ) {
					if ( callback.call( object[ name ], name, object[ name ] ) === false ) {
						break;
					}
				}
			} else {
				for ( ; i < length; ) {
					if ( callback.call( object[ i ], i, object[ i++ ] ) === false ) {
						break;
					}
				}
			}
		}

		return object;
	},

	// Use native String.trim function wherever possible
	trim: trim ?
		function( text ) {
			return text == null ?
				"" :
				trim.call( text );
		} :

		// Otherwise use our own trimming functionality
		function( text ) {
			return text == null ?
				"" :
				text.toString().replace( trimLeft, "" ).replace( trimRight, "" );
		},

	// results is for internal usage only
	makeArray: function( array, results ) {
		var ret = results || [];

		if ( array != null ) {
			// The window, strings (and functions) also have 'length'
			// The extra typeof function check is to prevent crashes
			// in Safari 2 (See: #3039)
			// Tweaked logic slightly to handle Blackberry 4.7 RegExp issues #6930
			var type = jQuery.type( array );

			if ( array.length == null || type === "string" || type === "function" || type === "regexp" || jQuery.isWindow( array ) ) {
				push.call( ret, array );
			} else {
				jQuery.merge( ret, array );
			}
		}

		return ret;
	},

	inArray: function( elem, array, i ) {
		var len;

		if ( array ) {
			if ( indexOf ) {
				return indexOf.call( array, elem, i );
			}

			len = array.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in array && array[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var i = first.length,
			j = 0;

		if ( typeof second.length === "number" ) {
			for ( var l = second.length; j < l; j++ ) {
				first[ i++ ] = second[ j ];
			}

		} else {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, inv ) {
		var ret = [], retVal;
		inv = !!inv;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( var i = 0, length = elems.length; i < length; i++ ) {
			retVal = !!callback( elems[ i ], i );
			if ( inv !== retVal ) {
				ret.push( elems[ i ] );
			}
		}

		return ret;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value, key, ret = [],
			i = 0,
			length = elems.length,
			// jquery objects are treated as arrays
			isArray = elems instanceof jQuery || length !== undefined && typeof length === "number" && ( ( length > 0 && elems[ 0 ] && elems[ length -1 ] ) || length === 0 || jQuery.isArray( elems ) ) ;

		// Go through the array, translating each of the items to their
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}

		// Go through every key on the object,
		} else {
			for ( key in elems ) {
				value = callback( elems[ key ], key, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}
		}

		// Flatten any nested arrays
		return ret.concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		if ( typeof context === "string" ) {
			var tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		var args = slice.call( arguments, 2 ),
			proxy = function() {
				return fn.apply( context, args.concat( slice.call( arguments ) ) );
			};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || proxy.guid || jQuery.guid++;

		return proxy;
	},

	// Mutifunctional method to get and set values to a collection
	// The value/s can optionally be executed if it's a function
	access: function( elems, key, value, exec, fn, pass ) {
		var length = elems.length;

		// Setting many attributes
		if ( typeof key === "object" ) {
			for ( var k in key ) {
				jQuery.access( elems, k, key[k], exec, fn, value );
			}
			return elems;
		}

		// Setting one attribute
		if ( value !== undefined ) {
			// Optionally, function values get executed if exec is true
			exec = !pass && exec && jQuery.isFunction(value);

			for ( var i = 0; i < length; i++ ) {
				fn( elems[i], key, exec ? value.call( elems[i], i, fn( elems[i], key ) ) : value, pass );
			}

			return elems;
		}

		// Getting an attribute
		return length ? fn( elems[0], key ) : undefined;
	},

	now: function() {
		return ( new Date() ).getTime();
	},

	// Use of jQuery.browser is frowned upon.
	// More details: http://docs.jquery.com/Utilities/jQuery.browser
	uaMatch: function( ua ) {
		ua = ua.toLowerCase();

		var match = rwebkit.exec( ua ) ||
			ropera.exec( ua ) ||
			rmsie.exec( ua ) ||
			ua.indexOf("compatible") < 0 && rmozilla.exec( ua ) ||
			[];

		return { browser: match[1] || "", version: match[2] || "0" };
	},

	sub: function() {
		function jQuerySub( selector, context ) {
			return new jQuerySub.fn.init( selector, context );
		}
		jQuery.extend( true, jQuerySub, this );
		jQuerySub.superclass = this;
		jQuerySub.fn = jQuerySub.prototype = this();
		jQuerySub.fn.constructor = jQuerySub;
		jQuerySub.sub = this.sub;
		jQuerySub.fn.init = function init( selector, context ) {
			if ( context && context instanceof jQuery && !(context instanceof jQuerySub) ) {
				context = jQuerySub( context );
			}

			return jQuery.fn.init.call( this, selector, context, rootjQuerySub );
		};
		jQuerySub.fn.init.prototype = jQuerySub.fn;
		var rootjQuerySub = jQuerySub(document);
		return jQuerySub;
	},

	browser: {}
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

browserMatch = jQuery.uaMatch( userAgent );
if ( browserMatch.browser ) {
	jQuery.browser[ browserMatch.browser ] = true;
	jQuery.browser.version = browserMatch.version;
}

// Deprecated, use jQuery.browser.webkit instead
if ( jQuery.browser.webkit ) {
	jQuery.browser.safari = true;
}

// IE doesn't match non-breaking spaces with \s
if ( rnotwhite.test( "\xA0" ) ) {
	trimLeft = /^[\s\xA0]+/;
	trimRight = /[\s\xA0]+$/;
}

// All jQuery objects should point back to these
rootjQuery = jQuery(document);

// Cleanup functions for the document ready method
if ( document.addEventListener ) {
	DOMContentLoaded = function() {
		document.removeEventListener( "DOMContentLoaded", DOMContentLoaded, false );
		jQuery.ready();
	};

} else if ( document.attachEvent ) {
	DOMContentLoaded = function() {
		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( document.readyState === "complete" ) {
			document.detachEvent( "onreadystatechange", DOMContentLoaded );
			jQuery.ready();
		}
	};
}

// The DOM ready check for Internet Explorer
function doScrollCheck() {
	if ( jQuery.isReady ) {
		return;
	}

	try {
		// If IE is used, use the trick by Diego Perini
		// http://javascript.nwbox.com/IEContentLoaded/
		document.documentElement.doScroll("left");
	} catch(e) {
		setTimeout( doScrollCheck, 1 );
		return;
	}

	// and execute any waiting functions
	jQuery.ready();
}

// Expose jQuery as an AMD module, but only for AMD loaders that
// understand the issues with loading multiple versions of jQuery
// in a page that all might call define(). The loader will indicate
// they have special allowances for multiple jQuery versions by
// specifying define.amd.jQuery = true. Register as a named module,
// since jQuery can be concatenated with other files that may use define,
// but not use a proper concatenation script that understands anonymous
// AMD modules. A named AMD is safest and most robust way to register.
// Lowercase jquery is used because AMD module names are derived from
// file names, and jQuery is normally delivered in a lowercase file name.
if ( typeof define === "function" && define.amd && define.amd.jQuery ) {
	define( "jquery", [], function () { return jQuery; } );
}

return jQuery;

})();


// String to Object flags format cache
var flagsCache = {};

// Convert String-formatted flags into Object-formatted ones and store in cache
function createFlags( flags ) {
	var object = flagsCache[ flags ] = {},
		i, length;
	flags = flags.split( /\s+/ );
	for ( i = 0, length = flags.length; i < length; i++ ) {
		object[ flags[i] ] = true;
	}
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	flags:	an optional list of space-separated flags that will change how
 *			the callback list behaves
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible flags:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( flags ) {

	// Convert flags from String-formatted to Object-formatted
	// (we check in cache first)
	flags = flags ? ( flagsCache[ flags ] || createFlags( flags ) ) : {};

	var // Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = [],
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Add one or several callbacks to the list
		add = function( args ) {
			var i,
				length,
				elem,
				type,
				actual;
			for ( i = 0, length = args.length; i < length; i++ ) {
				elem = args[ i ];
				type = jQuery.type( elem );
				if ( type === "array" ) {
					// Inspect recursively
					add( elem );
				} else if ( type === "function" ) {
					// Add if not in unique mode and callback is not in
					if ( !flags.unique || !self.has( elem ) ) {
						list.push( elem );
					}
				}
			}
		},
		// Fire callbacks
		fire = function( context, args ) {
			args = args || [];
			memory = !flags.memory || [ context, args ];
			firing = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( context, args ) === false && flags.stopOnFalse ) {
					memory = true; // Mark as halted
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( !flags.once ) {
					if ( stack && stack.length ) {
						memory = stack.shift();
						self.fireWith( memory[ 0 ], memory[ 1 ] );
					}
				} else if ( memory === true ) {
					self.disable();
				} else {
					list = [];
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					var length = list.length;
					add( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away, unless previous
					// firing was halted (stopOnFalse)
					} else if ( memory && memory !== true ) {
						firingStart = length;
						fire( memory[ 0 ], memory[ 1 ] );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					var args = arguments,
						argIndex = 0,
						argLength = args.length;
					for ( ; argIndex < argLength ; argIndex++ ) {
						for ( var i = 0; i < list.length; i++ ) {
							if ( args[ argIndex ] === list[ i ] ) {
								// Handle firingIndex and firingLength
								if ( firing ) {
									if ( i <= firingLength ) {
										firingLength--;
										if ( i <= firingIndex ) {
											firingIndex--;
										}
									}
								}
								// Remove the element
								list.splice( i--, 1 );
								// If we have some unicity property then
								// we only need to do this once
								if ( flags.unique ) {
									break;
								}
							}
						}
					}
				}
				return this;
			},
			// Control if a given callback is in the list
			has: function( fn ) {
				if ( list ) {
					var i = 0,
						length = list.length;
					for ( ; i < length; i++ ) {
						if ( fn === list[ i ] ) {
							return true;
						}
					}
				}
				return false;
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory || memory === true ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( stack ) {
					if ( firing ) {
						if ( !flags.once ) {
							stack.push( [ context, args ] );
						}
					} else if ( !( flags.once && memory ) ) {
						fire( context, args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!memory;
			}
		};

	return self;
};




var // Static reference to slice
	sliceDeferred = [].slice;

jQuery.extend({

	Deferred: function( func ) {
		var doneList = jQuery.Callbacks( "once memory" ),
			failList = jQuery.Callbacks( "once memory" ),
			progressList = jQuery.Callbacks( "memory" ),
			state = "pending",
			lists = {
				resolve: doneList,
				reject: failList,
				notify: progressList
			},
			promise = {
				done: doneList.add,
				fail: failList.add,
				progress: progressList.add,

				state: function() {
					return state;
				},

				// Deprecated
				isResolved: doneList.fired,
				isRejected: failList.fired,

				then: function( doneCallbacks, failCallbacks, progressCallbacks ) {
					deferred.done( doneCallbacks ).fail( failCallbacks ).progress( progressCallbacks );
					return this;
				},
				always: function() {
					return deferred.done.apply( deferred, arguments ).fail.apply( deferred, arguments );
				},
				pipe: function( fnDone, fnFail, fnProgress ) {
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( {
							done: [ fnDone, "resolve" ],
							fail: [ fnFail, "reject" ],
							progress: [ fnProgress, "notify" ]
						}, function( handler, data ) {
							var fn = data[ 0 ],
								action = data[ 1 ],
								returned;
							if ( jQuery.isFunction( fn ) ) {
								deferred[ handler ](function() {
									returned = fn.apply( this, arguments );
									if ( returned && jQuery.isFunction( returned.promise ) ) {
										returned.promise().then( newDefer.resolve, newDefer.reject, newDefer.notify );
									} else {
										newDefer[ action + "With" ]( this === deferred ? newDefer : this, [ returned ] );
									}
								});
							} else {
								deferred[ handler ]( newDefer[ action ] );
							}
						});
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					if ( obj == null ) {
						obj = promise;
					} else {
						for ( var key in promise ) {
							obj[ key ] = promise[ key ];
						}
					}
					return obj;
				}
			},
			deferred = promise.promise({}),
			key;

		for ( key in lists ) {
			deferred[ key ] = lists[ key ].fire;
			deferred[ key + "With" ] = lists[ key ].fireWith;
		}

		// Handle state
		deferred.done( function() {
			state = "resolved";
		}, failList.disable, progressList.lock ).fail( function() {
			state = "rejected";
		}, doneList.disable, progressList.lock );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( firstParam ) {
		var args = sliceDeferred.call( arguments, 0 ),
			i = 0,
			length = args.length,
			pValues = new Array( length ),
			count = length,
			pCount = length,
			deferred = length <= 1 && firstParam && jQuery.isFunction( firstParam.promise ) ?
				firstParam :
				jQuery.Deferred(),
			promise = deferred.promise();
		function resolveFunc( i ) {
			return function( value ) {
				args[ i ] = arguments.length > 1 ? sliceDeferred.call( arguments, 0 ) : value;
				if ( !( --count ) ) {
					deferred.resolveWith( deferred, args );
				}
			};
		}
		function progressFunc( i ) {
			return function( value ) {
				pValues[ i ] = arguments.length > 1 ? sliceDeferred.call( arguments, 0 ) : value;
				deferred.notifyWith( promise, pValues );
			};
		}
		if ( length > 1 ) {
			for ( ; i < length; i++ ) {
				if ( args[ i ] && args[ i ].promise && jQuery.isFunction( args[ i ].promise ) ) {
					args[ i ].promise().then( resolveFunc(i), deferred.reject, progressFunc(i) );
				} else {
					--count;
				}
			}
			if ( !count ) {
				deferred.resolveWith( deferred, args );
			}
		} else if ( deferred !== firstParam ) {
			deferred.resolveWith( deferred, length ? [ firstParam ] : [] );
		}
		return promise;
	}
});




jQuery.support = (function() {

	var div = document.createElement( "div" ),
		documentElement = document.documentElement,
		all,
		a,
		select,
		opt,
		input,
		marginDiv,
		support,
		fragment,
		body,
		testElementParent,
		testElement,
		testElementStyle,
		tds,
		events,
		eventName,
		i,
		isSupported;

	// Preliminary tests
	div.setAttribute("className", "t");
	div.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/><nav></nav>";


	all = div.getElementsByTagName( "*" );
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Can't get basic test support
	if ( !all || !all.length || !a ) {
		return {};
	}

	// First batch of supports tests
	select = document.createElement( "select" );
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName( "input" )[ 0 ];

	support = {
		// IE strips leading whitespace when .innerHTML is used
		leadingWhitespace: ( div.firstChild.nodeType === 3 ),

		// Make sure that tbody elements aren't automatically inserted
		// IE will insert them into empty tables
		tbody: !div.getElementsByTagName( "tbody" ).length,

		// Make sure that link elements get serialized correctly by innerHTML
		// This requires a wrapper element in IE
		htmlSerialize: !!div.getElementsByTagName( "link" ).length,

		// Get the style information from getAttribute
		// (IE uses .cssText instead)
		style: /top/.test( a.getAttribute("style") ),

		// Make sure that URLs aren't manipulated
		// (IE normalizes it by default)
		hrefNormalized: ( a.getAttribute( "href" ) === "/a" ),

		// Make sure that element opacity exists
		// (IE uses filter instead)
		// Use a regex to work around a WebKit issue. See #5145
		opacity: /^0.55/.test( a.style.opacity ),

		// Verify style float existence
		// (IE uses styleFloat instead of cssFloat)
		cssFloat: !!a.style.cssFloat,

		// Make sure unknown elements (like HTML5 elems) are handled appropriately
		unknownElems: !!div.getElementsByTagName( "nav" ).length,

		// Make sure that if no value is specified for a checkbox
		// that it defaults to "on".
		// (WebKit defaults to "" instead)
		checkOn: ( input.value === "on" ),

		// Make sure that a selected-by-default option has a working selected property.
		// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
		optSelected: opt.selected,

		// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
		getSetAttribute: div.className !== "t",

		// Tests for enctype support on a form(#6743)
		enctype: !!document.createElement("form").enctype,

		// Will be defined later
		submitBubbles: true,
		changeBubbles: true,
		focusinBubbles: false,
		deleteExpando: true,
		noCloneEvent: true,
		inlineBlockNeedsLayout: false,
		shrinkWrapBlocks: false,
		reliableMarginRight: true
	};

	// Make sure checked status is properly cloned
	input.checked = true;
	support.noCloneChecked = input.cloneNode( true ).checked;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Test to see if it's possible to delete an expando from an element
	// Fails in Internet Explorer
	try {
		delete div.test;
	} catch( e ) {
		support.deleteExpando = false;
	}

	if ( !div.addEventListener && div.attachEvent && div.fireEvent ) {
		div.attachEvent( "onclick", function() {
			// Cloning a node shouldn't copy over any
			// bound event handlers (IE does this)
			support.noCloneEvent = false;
		});
		div.cloneNode( true ).fireEvent( "onclick" );
	}

	// Check if a radio maintains its value
	// after being appended to the DOM
	input = document.createElement("input");
	input.value = "t";
	input.setAttribute("type", "radio");
	support.radioValue = input.value === "t";

	input.setAttribute("checked", "checked");
	div.appendChild( input );
	fragment = document.createDocumentFragment();
	fragment.appendChild( div.lastChild );

	// WebKit doesn't clone checked state correctly in fragments
	support.checkClone = fragment.cloneNode( true ).cloneNode( true ).lastChild.checked;

	div.innerHTML = "";

	// Figure out if the W3C box model works as expected
	div.style.width = div.style.paddingLeft = "1px";

	// We don't want to do body-related feature tests on frameset
	// documents, which lack a body. So we use
	// document.getElementsByTagName("body")[0], which is undefined in
	// frameset documents, while document.body isn’t. (7398)
	body = document.getElementsByTagName("body")[ 0 ];
	// We use our own, invisible, body unless the body is already present
	// in which case we use a div (#9239)
	testElement = document.createElement( body ? "div" : "body" );
	testElementStyle = {
		visibility: "hidden",
		width: 0,
		height: 0,
		border: 0,
		margin: 0,
		background: "none"
	};
	if ( body ) {
		jQuery.extend( testElementStyle, {
			position: "absolute",
			left: "-999px",
			top: "-999px"
		});
	}
	for ( i in testElementStyle ) {
		testElement.style[ i ] = testElementStyle[ i ];
	}
	testElement.appendChild( div );
	testElementParent = body || documentElement;
	testElementParent.insertBefore( testElement, testElementParent.firstChild );

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	support.appendChecked = input.checked;

	support.boxModel = div.offsetWidth === 2;

	if ( "zoom" in div.style ) {
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		// (IE < 8 does this)
		div.style.display = "inline";
		div.style.zoom = 1;
		support.inlineBlockNeedsLayout = ( div.offsetWidth === 2 );

		// Check if elements with layout shrink-wrap their children
		// (IE 6 does this)
		div.style.display = "";
		div.innerHTML = "<div style='width:4px;'></div>";
		support.shrinkWrapBlocks = ( div.offsetWidth !== 2 );
	}

	div.innerHTML = "<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>";
	tds = div.getElementsByTagName( "td" );

	// Check if table cells still have offsetWidth/Height when they are set
	// to display:none and there are still other visible table cells in a
	// table row; if so, offsetWidth/Height are not reliable for use when
	// determining if an element has been hidden directly using
	// display:none (it is still safe to use offsets if a parent element is
	// hidden; don safety goggles and see bug #4512 for more information).
	// (only IE 8 fails this test)
	isSupported = ( tds[ 0 ].offsetHeight === 0 );

	tds[ 0 ].style.display = "";
	tds[ 1 ].style.display = "none";

	// Check if empty table cells still have offsetWidth/Height
	// (IE < 8 fail this test)
	support.reliableHiddenOffsets = isSupported && ( tds[ 0 ].offsetHeight === 0 );
	div.innerHTML = "";

	// Check if div with explicit width and no margin-right incorrectly
	// gets computed margin-right based on width of container. For more
	// info see bug #3333
	// Fails in WebKit before Feb 2011 nightlies
	// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
	if ( document.defaultView && document.defaultView.getComputedStyle ) {
		marginDiv = document.createElement( "div" );
		marginDiv.style.width = "0";
		marginDiv.style.marginRight = "0";
		div.appendChild( marginDiv );
		support.reliableMarginRight =
			( parseInt( ( document.defaultView.getComputedStyle( marginDiv, null ) || { marginRight: 0 } ).marginRight, 10 ) || 0 ) === 0;
	}

	// Technique from Juriy Zaytsev
	// http://perfectionkills.com/detecting-event-support-without-browser-sniffing/
	// We only care about the case where non-standard event systems
	// are used, namely in IE. Short-circuiting here helps us to
	// avoid an eval call (in setAttribute) which can cause CSP
	// to go haywire. See: https://developer.mozilla.org/en/Security/CSP
	if ( div.attachEvent ) {
		for( i in {
			submit: 1,
			change: 1,
			focusin: 1
		} ) {
			eventName = "on" + i;
			isSupported = ( eventName in div );
			if ( !isSupported ) {
				div.setAttribute( eventName, "return;" );
				isSupported = ( typeof div[ eventName ] === "function" );
			}
			support[ i + "Bubbles" ] = isSupported;
		}
	}

	// Run fixed position tests at doc ready to avoid a crash
	// related to the invisible body in IE8
	jQuery(function() {
		var container, outer, inner, table, td, offsetSupport,
			conMarginTop = 1,
			ptlm = "position:absolute;top:0;left:0;width:1px;height:1px;margin:0;",
			vb = "visibility:hidden;border:0;",
			style = "style='" + ptlm + "border:5px solid #000;padding:0;'",
			html = "<div " + style + "><div></div></div>" +
							"<table " + style + " cellpadding='0' cellspacing='0'>" +
							"<tr><td></td></tr></table>";

		// Reconstruct a container
		body = document.getElementsByTagName("body")[0];
		if ( !body ) {
			// Return for frameset docs that don't have a body
			// These tests cannot be done
			return;
		}

		container = document.createElement("div");
		container.style.cssText = vb + "width:0;height:0;position:static;top:0;margin-top:" + conMarginTop + "px";
		body.insertBefore( container, body.firstChild );

		// Construct a test element
		testElement = document.createElement("div");
		testElement.style.cssText = ptlm + vb;

		testElement.innerHTML = html;
		container.appendChild( testElement );
		outer = testElement.firstChild;
		inner = outer.firstChild;
		td = outer.nextSibling.firstChild.firstChild;

		offsetSupport = {
			doesNotAddBorder: ( inner.offsetTop !== 5 ),
			doesAddBorderForTableAndCells: ( td.offsetTop === 5 )
		};

		inner.style.position = "fixed";
		inner.style.top = "20px";

		// safari subtracts parent border width here which is 5px
		offsetSupport.fixedPosition = ( inner.offsetTop === 20 || inner.offsetTop === 15 );
		inner.style.position = inner.style.top = "";

		outer.style.overflow = "hidden";
		outer.style.position = "relative";

		offsetSupport.subtractsBorderForOverflowNotVisible = ( inner.offsetTop === -5 );
		offsetSupport.doesNotIncludeMarginInBodyOffset = ( body.offsetTop !== conMarginTop );

		body.removeChild( container );
		testElement = container = null;

		jQuery.extend( support, offsetSupport );
	});

	testElement.innerHTML = "";
	testElementParent.removeChild( testElement );

	// Null connected elements to avoid leaks in IE
	testElement = fragment = select = opt = body = marginDiv = div = input = null;

	return support;
})();

// Keep track of boxModel
jQuery.boxModel = jQuery.support.boxModel;




var rbrace = /^(?:\{.*\}|\[.*\])$/,
	rmultiDash = /([A-Z])/g;

jQuery.extend({
	cache: {},

	// Please use with caution
	uuid: 0,

	// Unique for each copy of jQuery on the page
	// Non-digits removed to match rinlinejQuery
	expando: "jQuery" + ( jQuery.fn.jquery + Math.random() ).replace( /\D/g, "" ),

	// The following elements throw uncatchable exceptions if you
	// attempt to add expando properties to them.
	noData: {
		"embed": true,
		// Ban all objects except for Flash (which handle expandos)
		"object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
		"applet": true
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data, pvt /* Internal Use Only */ ) {
		if ( !jQuery.acceptData( elem ) ) {
			return;
		}

		var privateCache, thisCache, ret,
			internalKey = jQuery.expando,
			getByName = typeof name === "string",

			// We have to handle DOM nodes and JS objects differently because IE6-7
			// can't GC object references properly across the DOM-JS boundary
			isNode = elem.nodeType,

			// Only DOM nodes need the global jQuery cache; JS object data is
			// attached directly to the object so GC can occur automatically
			cache = isNode ? jQuery.cache : elem,

			// Only defining an ID for JS objects if its cache already exists allows
			// the code to shortcut on the same path as a DOM node with no cache
			id = isNode ? elem[ jQuery.expando ] : elem[ jQuery.expando ] && jQuery.expando,
			isEvents = name === "events";

		// Avoid doing any more work than we need to when trying to get data on an
		// object that has no data at all
		if ( (!id || !cache[id] || (!isEvents && !pvt && !cache[id].data)) && getByName && data === undefined ) {
			return;
		}

		if ( !id ) {
			// Only DOM nodes need a new unique ID for each element since their data
			// ends up in the global cache
			if ( isNode ) {
				elem[ jQuery.expando ] = id = ++jQuery.uuid;
			} else {
				id = jQuery.expando;
			}
		}

		if ( !cache[ id ] ) {
			cache[ id ] = {};

			// Avoids exposing jQuery metadata on plain JS objects when the object
			// is serialized using JSON.stringify
			if ( !isNode ) {
				cache[ id ].toJSON = jQuery.noop;
			}
		}

		// An object can be passed to jQuery.data instead of a key/value pair; this gets
		// shallow copied over onto the existing cache
		if ( typeof name === "object" || typeof name === "function" ) {
			if ( pvt ) {
				cache[ id ] = jQuery.extend( cache[ id ], name );
			} else {
				cache[ id ].data = jQuery.extend( cache[ id ].data, name );
			}
		}

		privateCache = thisCache = cache[ id ];

		// jQuery data() is stored in a separate object inside the object's internal data
		// cache in order to avoid key collisions between internal data and user-defined
		// data.
		if ( !pvt ) {
			if ( !thisCache.data ) {
				thisCache.data = {};
			}

			thisCache = thisCache.data;
		}

		if ( data !== undefined ) {
			thisCache[ jQuery.camelCase( name ) ] = data;
		}

		// Users should not attempt to inspect the internal events object using jQuery.data,
		// it is undocumented and subject to change. But does anyone listen? No.
		if ( isEvents && !thisCache[ name ] ) {
			return privateCache.events;
		}

		// Check for both converted-to-camel and non-converted data property names
		// If a data property was specified
		if ( getByName ) {

			// First Try to find as-is property data
			ret = thisCache[ name ];

			// Test for null|undefined property data
			if ( ret == null ) {

				// Try to find the camelCased property
				ret = thisCache[ jQuery.camelCase( name ) ];
			}
		} else {
			ret = thisCache;
		}

		return ret;
	},

	removeData: function( elem, name, pvt /* Internal Use Only */ ) {
		if ( !jQuery.acceptData( elem ) ) {
			return;
		}

		var thisCache, i, l,

			// Reference to internal data cache key
			internalKey = jQuery.expando,

			isNode = elem.nodeType,

			// See jQuery.data for more information
			cache = isNode ? jQuery.cache : elem,

			// See jQuery.data for more information
			id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

		// If there is already no cache entry for this object, there is no
		// purpose in continuing
		if ( !cache[ id ] ) {
			return;
		}

		if ( name ) {

			thisCache = pvt ? cache[ id ] : cache[ id ].data;

			if ( thisCache ) {

				// Support space separated names
				if ( jQuery.isArray( name ) ) {
					name = name;
				} else if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}

				for ( i = 0, l = name.length; i < l; i++ ) {
					delete thisCache[ name[i] ];
				}

				// If there is no data left in the cache, we want to continue
				// and let the cache object itself get destroyed
				if ( !( pvt ? isEmptyDataObject : jQuery.isEmptyObject )( thisCache ) ) {
					return;
				}
			}
		}

		// See jQuery.data for more information
		if ( !pvt ) {
			delete cache[ id ].data;

			// Don't destroy the parent cache unless the internal data object
			// had been the only thing left in it
			if ( !isEmptyDataObject(cache[ id ]) ) {
				return;
			}
		}

		// Browsers that fail expando deletion also refuse to delete expandos on
		// the window, but it will allow it on all other JS objects; other browsers
		// don't care
		// Ensure that `cache` is not a window object #10080
		if ( jQuery.support.deleteExpando || !cache.setInterval ) {
			delete cache[ id ];
		} else {
			cache[ id ] = null;
		}

		// We destroyed the cache and need to eliminate the expando on the node to avoid
		// false lookups in the cache for entries that no longer exist
		if ( isNode ) {
			// IE does not allow us to delete expando properties from nodes,
			// nor does it have a removeAttribute function on Document nodes;
			// we must handle all of these cases
			if ( jQuery.support.deleteExpando ) {
				delete elem[ jQuery.expando ];
			} else if ( elem.removeAttribute ) {
				elem.removeAttribute( jQuery.expando );
			} else {
				elem[ jQuery.expando ] = null;
			}
		}
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return jQuery.data( elem, name, data, true );
	},

	// A method for determining if a DOM node can handle the data expando
	acceptData: function( elem ) {
		if ( elem.nodeName ) {
			var match = jQuery.noData[ elem.nodeName.toLowerCase() ];

			if ( match ) {
				return !(match === true || elem.getAttribute("classid") !== match);
			}
		}

		return true;
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var parts, attr, name,
			data = null;

		if ( typeof key === "undefined" ) {
			if ( this.length ) {
				data = jQuery.data( this[0] );

				if ( this[0].nodeType === 1 && !jQuery._data( this[0], "parsedAttrs" ) ) {
					attr = this[0].attributes;
					for ( var i = 0, l = attr.length; i < l; i++ ) {
						name = attr[i].name;

						if ( name.indexOf( "data-" ) === 0 ) {
							name = jQuery.camelCase( name.substring(5) );

							dataAttr( this[0], name, data[ name ] );
						}
					}
					jQuery._data( this[0], "parsedAttrs", true );
				}
			}

			return data;

		} else if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		parts = key.split(".");
		parts[1] = parts[1] ? "." + parts[1] : "";

		if ( value === undefined ) {
			data = this.triggerHandler("getData" + parts[1] + "!", [parts[0]]);

			// Try to fetch any internally stored data first
			if ( data === undefined && this.length ) {
				data = jQuery.data( this[0], key );
				data = dataAttr( this[0], key, data );
			}

			return data === undefined && parts[1] ?
				this.data( parts[0] ) :
				data;

		} else {
			return this.each(function() {
				var $this = jQuery( this ),
					args = [ parts[0], value ];

				$this.triggerHandler( "setData" + parts[1] + "!", args );
				jQuery.data( this, key, value );
				$this.triggerHandler( "changeData" + parts[1] + "!", args );
			});
		}
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
				data === "false" ? false :
				data === "null" ? null :
				jQuery.isNumeric( data ) ? parseFloat( data ) :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	for ( var name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}




function handleQueueMarkDefer( elem, type, src ) {
	var deferDataKey = type + "defer",
		queueDataKey = type + "queue",
		markDataKey = type + "mark",
		defer = jQuery._data( elem, deferDataKey );
	if ( defer &&
		( src === "queue" || !jQuery._data(elem, queueDataKey) ) &&
		( src === "mark" || !jQuery._data(elem, markDataKey) ) ) {
		// Give room for hard-coded callbacks to fire first
		// and eventually mark/queue something else on the element
		setTimeout( function() {
			if ( !jQuery._data( elem, queueDataKey ) &&
				!jQuery._data( elem, markDataKey ) ) {
				jQuery.removeData( elem, deferDataKey, true );
				defer.fire();
			}
		}, 0 );
	}
}

jQuery.extend({

	_mark: function( elem, type ) {
		if ( elem ) {
			type = ( type || "fx" ) + "mark";
			jQuery._data( elem, type, (jQuery._data( elem, type ) || 0) + 1 );
		}
	},

	_unmark: function( force, elem, type ) {
		if ( force !== true ) {
			type = elem;
			elem = force;
			force = false;
		}
		if ( elem ) {
			type = type || "fx";
			var key = type + "mark",
				count = force ? 0 : ( (jQuery._data( elem, key ) || 1) - 1 );
			if ( count ) {
				jQuery._data( elem, key, count );
			} else {
				jQuery.removeData( elem, key, true );
				handleQueueMarkDefer( elem, type, "mark" );
			}
		}
	},

	queue: function( elem, type, data ) {
		var q;
		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			q = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !q || jQuery.isArray(data) ) {
					q = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					q.push( data );
				}
			}
			return q || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			fn = queue.shift(),
			hooks = {};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
		}

		if ( fn ) {
			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			jQuery._data( elem, type + ".run", hooks );
			fn.call( elem, function() {
				jQuery.dequeue( elem, type );
			}, hooks );
		}

		if ( !queue.length ) {
			jQuery.removeData( elem, type + "queue " + type + ".run", true );
			handleQueueMarkDefer( elem, type, "queue" );
		}
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
		}

		if ( data === undefined ) {
			return jQuery.queue( this[0], type );
		}
		return this.each(function() {
			var queue = jQuery.queue( this, type, data );

			if ( type === "fx" && queue[0] !== "inprogress" ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	// Based off of the plugin by Clint Helfers, with permission.
	// http://blindsignals.com/index.php/2009/07/jquery-delay/
	delay: function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = setTimeout( next, time );
			hooks.stop = function() {
				clearTimeout( timeout );
			};
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, object ) {
		if ( typeof type !== "string" ) {
			object = type;
			type = undefined;
		}
		type = type || "fx";
		var defer = jQuery.Deferred(),
			elements = this,
			i = elements.length,
			count = 1,
			deferDataKey = type + "defer",
			queueDataKey = type + "queue",
			markDataKey = type + "mark",
			tmp;
		function resolve() {
			if ( !( --count ) ) {
				defer.resolveWith( elements, [ elements ] );
			}
		}
		while( i-- ) {
			if (( tmp = jQuery.data( elements[ i ], deferDataKey, undefined, true ) ||
					( jQuery.data( elements[ i ], queueDataKey, undefined, true ) ||
						jQuery.data( elements[ i ], markDataKey, undefined, true ) ) &&
					jQuery.data( elements[ i ], deferDataKey, jQuery.Callbacks( "once memory" ), true ) )) {
				count++;
				tmp.add( resolve );
			}
		}
		resolve();
		return defer.promise();
	}
});




var rclass = /[\n\t\r]/g,
	rspace = /\s+/,
	rreturn = /\r/g,
	rtype = /^(?:button|input)$/i,
	rfocusable = /^(?:button|input|object|select|textarea)$/i,
	rclickable = /^a(?:rea)?$/i,
	rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
	getSetAttribute = jQuery.support.getSetAttribute,
	nodeHook, boolHook, fixSpecified;

jQuery.fn.extend({
	attr: function( name, value ) {
		return jQuery.access( this, name, value, true, jQuery.attr );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	},

	prop: function( name, value ) {
		return jQuery.access( this, name, value, true, jQuery.prop );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	},

	addClass: function( value ) {
		var classNames, i, l, elem,
			setClass, c, cl;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call(this, j, this.className) );
			});
		}

		if ( value && typeof value === "string" ) {
			classNames = value.split( rspace );

			for ( i = 0, l = this.length; i < l; i++ ) {
				elem = this[ i ];

				if ( elem.nodeType === 1 ) {
					if ( !elem.className && classNames.length === 1 ) {
						elem.className = value;

					} else {
						setClass = " " + elem.className + " ";

						for ( c = 0, cl = classNames.length; c < cl; c++ ) {
							if ( !~setClass.indexOf( " " + classNames[ c ] + " " ) ) {
								setClass += classNames[ c ] + " ";
							}
						}
						elem.className = jQuery.trim( setClass );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classNames, i, l, elem, className, c, cl;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call(this, j, this.className) );
			});
		}

		if ( (value && typeof value === "string") || value === undefined ) {
			classNames = ( value || "" ).split( rspace );

			for ( i = 0, l = this.length; i < l; i++ ) {
				elem = this[ i ];

				if ( elem.nodeType === 1 && elem.className ) {
					if ( value ) {
						className = (" " + elem.className + " ").replace( rclass, " " );
						for ( c = 0, cl = classNames.length; c < cl; c++ ) {
							className = className.replace(" " + classNames[ c ] + " ", " ");
						}
						elem.className = jQuery.trim( className );

					} else {
						elem.className = "";
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isBool = typeof stateVal === "boolean";

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					state = stateVal,
					classNames = value.split( rspace );

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space seperated list
					state = isBool ? state : !self.hasClass( className );
					self[ state ? "addClass" : "removeClass" ]( className );
				}

			} else if ( type === "undefined" || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// toggle whole className
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) > -1 ) {
				return true;
			}
		}

		return false;
	},

	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.nodeName.toLowerCase() ] || jQuery.valHooks[ elem.type ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return undefined;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var self = jQuery(this), val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, self.val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map(val, function ( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.nodeName.toLowerCase() ] || jQuery.valHooks[ this.type ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				// attributes.value is undefined in Blackberry 4.7 but
				// uses .value. See #6932
				var val = elem.attributes.value;
				return !val || val.specified ? elem.value : elem.text;
			}
		},
		select: {
			get: function( elem ) {
				var value, i, max, option,
					index = elem.selectedIndex,
					values = [],
					options = elem.options,
					one = elem.type === "select-one";

				// Nothing was selected
				if ( index < 0 ) {
					return null;
				}

				// Loop through all the selected options
				i = one ? index : 0;
				max = one ? index + 1 : options.length;
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Don't return options that are disabled or in a disabled optgroup
					if ( option.selected && (jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) &&
							(!option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" )) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				// Fixes Bug #2551 -- select.val() broken in IE after form.reset()
				if ( one && !values.length && options.length ) {
					return jQuery( options[ index ] ).val();
				}

				return values;
			},

			set: function( elem, value ) {
				var values = jQuery.makeArray( value );

				jQuery(elem).find("option").each(function() {
					this.selected = jQuery.inArray( jQuery(this).val(), values ) >= 0;
				});

				if ( !values.length ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	},

	attrFn: {
		val: true,
		css: true,
		html: true,
		text: true,
		data: true,
		width: true,
		height: true,
		offset: true
	},

	attr: function( elem, name, value, pass ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return undefined;
		}

		if ( pass && name in jQuery.attrFn ) {
			return jQuery( elem )[ name ]( value );
		}

		// Fallback to prop when attributes are not supported
		if ( !("getAttribute" in elem) ) {
			return jQuery.prop( elem, name, value );
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( notxml ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] || ( rboolean.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return undefined;

			} else if ( hooks && "set" in hooks && notxml && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, "" + value );
				return value;
			}

		} else if ( hooks && "get" in hooks && notxml && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {

			ret = elem.getAttribute( name );

			// Non-existent attributes return null, we normalize to undefined
			return ret === null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var propName, attrNames, name, l,
			i = 0;

		if ( elem.nodeType === 1 ) {
			attrNames = ( value || "" ).split( rspace );
			l = attrNames.length;

			for ( ; i < l; i++ ) {
				name = attrNames[ i ].toLowerCase();
				propName = jQuery.propFix[ name ] || name;

				// See #9699 for explanation of this approach (setting first, then removal)
				jQuery.attr( elem, name, "" );
				elem.removeAttribute( getSetAttribute ? name : propName );

				// Set corresponding property to false for boolean attributes
				if ( rboolean.test( name ) && propName in elem ) {
					elem[ propName ] = false;
				}
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				// We can't allow the type property to be changed (since it causes problems in IE)
				if ( rtype.test( elem.nodeName ) && elem.parentNode ) {
					jQuery.error( "type property can't be changed" );
				} else if ( !jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to it's default in case type is set after value
					// This is for element creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		},
		// Use the value property for back compat
		// Use the nodeHook for button elements in IE6/7 (#1954)
		value: {
			get: function( elem, name ) {
				if ( nodeHook && jQuery.nodeName( elem, "button" ) ) {
					return nodeHook.get( elem, name );
				}
				return name in elem ?
					elem.value :
					null;
			},
			set: function( elem, value, name ) {
				if ( nodeHook && jQuery.nodeName( elem, "button" ) ) {
					return nodeHook.set( elem, value, name );
				}
				// Does not return so that setAttribute is also used
				elem.value = value;
			}
		}
	},

	propFix: {
		tabindex: "tabIndex",
		readonly: "readOnly",
		"for": "htmlFor",
		"class": "className",
		maxlength: "maxLength",
		cellspacing: "cellSpacing",
		cellpadding: "cellPadding",
		rowspan: "rowSpan",
		colspan: "colSpan",
		usemap: "useMap",
		frameborder: "frameBorder",
		contenteditable: "contentEditable"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return undefined;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				return ( elem[ name ] = value );
			}

		} else {
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
				return ret;

			} else {
				return elem[ name ];
			}
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				var attributeNode = elem.getAttributeNode("tabindex");

				return attributeNode && attributeNode.specified ?
					parseInt( attributeNode.value, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						undefined;
			}
		}
	}
});

// Add the tabIndex propHook to attrHooks for back-compat (different case is intentional)
jQuery.attrHooks.tabindex = jQuery.propHooks.tabIndex;

// Hook for boolean attributes
boolHook = {
	get: function( elem, name ) {
		// Align boolean attributes with corresponding properties
		// Fall back to attribute presence where some booleans are not supported
		var attrNode,
			property = jQuery.prop( elem, name );
		return property === true || typeof property !== "boolean" && ( attrNode = elem.getAttributeNode(name) ) && attrNode.nodeValue !== false ?
			name.toLowerCase() :
			undefined;
	},
	set: function( elem, value, name ) {
		var propName;
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			// value is true since we know at this point it's type boolean and not false
			// Set boolean attributes to the same name and set the DOM property
			propName = jQuery.propFix[ name ] || name;
			if ( propName in elem ) {
				// Only set the IDL specifically if it already exists on the element
				elem[ propName ] = true;
			}

			elem.setAttribute( name, name.toLowerCase() );
		}
		return name;
	}
};

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	fixSpecified = {
		name: true,
		id: true
	};

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret;
			ret = elem.getAttributeNode( name );
			return ret && ( fixSpecified[ name ] ? ret.nodeValue !== "" : ret.specified ) ?
				ret.nodeValue :
				undefined;
		},
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				ret = document.createAttribute( name );
				elem.setAttributeNode( ret );
			}
			return ( ret.nodeValue = value + "" );
		}
	};

	// Apply the nodeHook to tabindex
	jQuery.attrHooks.tabindex.set = nodeHook.set;

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		});
	});

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		get: nodeHook.get,
		set: function( elem, value, name ) {
			if ( value === "" ) {
				value = "false";
			}
			nodeHook.set( elem, value, name );
		}
	};
}


// Some attributes require a special call on IE
if ( !jQuery.support.hrefNormalized ) {
	jQuery.each([ "href", "src", "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
			get: function( elem ) {
				var ret = elem.getAttribute( name, 2 );
				return ret === null ? undefined : ret;
			}
		});
	});
}

if ( !jQuery.support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Normalize to lowercase since IE uppercases css property names
			return elem.style.cssText.toLowerCase() || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = "" + value );
		}
	};
}

// Safari mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !jQuery.support.optSelected ) {
	jQuery.propHooks.selected = jQuery.extend( jQuery.propHooks.selected, {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	});
}

// IE6/7 call enctype encoding
if ( !jQuery.support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}

// Radios and checkboxes getter/setter
if ( !jQuery.support.checkOn ) {
	jQuery.each([ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			get: function( elem ) {
				// Handle the case where in Webkit "" is returned instead of "on" if a value isn't specified
				return elem.getAttribute("value") === null ? "on" : elem.value;
			}
		};
	});
}
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = jQuery.extend( jQuery.valHooks[ this ], {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	});
});




var rnamespaces = /\.(.*)$/,
	rformElems = /^(?:textarea|input|select)$/i,
	rperiod = /\./g,
	rspaces = / /g,
	rescape = /[^\w\s.|`]/g,
	rtypenamespace = /^([^\.]*)?(?:\.(.+))?$/,
	rhoverHack = /\bhover(\.\S+)?/,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|contextmenu)|click/,
	rquickIs = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,
	quickParse = function( selector ) {
		var quick = rquickIs.exec( selector );
		if ( quick ) {
			//   0  1    2   3
			// [ _, tag, id, class ]
			quick[1] = ( quick[1] || "" ).toLowerCase();
			quick[3] = quick[3] && new RegExp( "(?:^|\\s)" + quick[3] + "(?:\\s|$)" );
		}
		return quick;
	},
	quickIs = function( elem, m ) {
		return (
			(!m[1] || elem.nodeName.toLowerCase() === m[1]) &&
			(!m[2] || elem.id === m[2]) &&
			(!m[3] || m[3].test( elem.className ))
		);
	},
	hoverHack = function( events ) {
		return jQuery.event.special.hover ? events : events.replace( rhoverHack, "mouseenter$1 mouseleave$1" );
	};

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	add: function( elem, types, handler, data, selector ) {

		var elemData, eventHandle, events,
			t, tns, type, namespaces, handleObj,
			handleObjIn, quick, handlers, special;

		// Don't attach events to noData or text/comment nodes (allow plain objects tho)
		if ( elem.nodeType === 3 || elem.nodeType === 8 || !types || !handler || !(elemData = jQuery._data( elem )) ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		events = elemData.events;
		if ( !events ) {
			elemData.events = events = {};
		}
		eventHandle = elemData.handle;
		if ( !eventHandle ) {
			elemData.handle = eventHandle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		// jQuery(...).bind("mouseover mouseout", fn);
		types = hoverHack(types).split( " " );
		for ( t = 0; t < types.length; t++ ) {

			tns = rtypenamespace.exec( types[t] ) || [];
			type = tns[1];
			namespaces = ( tns[2] || "" ).split( "." ).sort();

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: tns[1],
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Delegated event; pre-analyze selector so it's processed quickly on event dispatch
			if ( selector ) {
				handleObj.quick = quickParse( selector );
				if ( !handleObj.quick && jQuery.expr.match.POS.test( selector ) ) {
					handleObj.isPositional = true;
				}
			}

			// Init the event handler queue if we're the first
			handlers = events[ type ];
			if ( !handlers ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	global: {},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector ) {

		var elemData = jQuery.hasData( elem ) && jQuery._data( elem ),
			t, tns, type, namespaces, origCount,
			j, events, special, handle, eventType, handleObj;

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = hoverHack( types || "" ).split(" ");
		for ( t = 0; t < types.length; t++ ) {
			tns = rtypenamespace.exec( types[t] ) || [];
			type = tns[1];
			namespaces = tns[2];

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				namespaces = namespaces? "." + namespaces : "";
				for ( j in events ) {
					jQuery.event.remove( elem, j + namespaces, handler, selector );
				}
				return;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector? special.delegateType : special.bindType ) || type;
			eventType = events[ type ] || [];
			origCount = eventType.length;
			namespaces = namespaces ? new RegExp("(^|\\.)" + namespaces.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null;

			// Only need to loop for special events or selective removal
			if ( handler || namespaces || selector || special.remove ) {
				for ( j = 0; j < eventType.length; j++ ) {
					handleObj = eventType[ j ];

					if ( !handler || handler.guid === handleObj.guid ) {
						if ( !namespaces || namespaces.test( handleObj.namespace ) ) {
							if ( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) {
								eventType.splice( j--, 1 );

								if ( handleObj.selector ) {
									eventType.delegateCount--;
								}
								if ( special.remove ) {
									special.remove.call( elem, handleObj );
								}
							}
						}
					}
				}
			} else {
				// Removing all events
				eventType.length = 0;
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( eventType.length === 0 && origCount !== eventType.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			handle = elemData.handle;
			if ( handle ) {
				handle.elem = null;
			}

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery.removeData( elem, [ "events", "handle" ], true );
		}
	},

	// Events that are safe to short-circuit if no handlers are attached.
	// Native DOM events should not be added, they may have inline handlers.
	customEvent: {
		"getData": true,
		"setData": true,
		"changeData": true
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		// Don't do events on text and comment nodes
		if ( elem && (elem.nodeType === 3 || elem.nodeType === 8) ) {
			return;
		}

		// Event object or event type
		var type = event.type || event,
			namespaces = [],
			cache, exclusive, i, cur, old, ontype, special, handle, eventPath, bubbleType;

		if ( type.indexOf( "!" ) >= 0 ) {
			// Exclusive events trigger only for the exact event (no namespaces)
			type = type.slice(0, -1);
			exclusive = true;
		}

		if ( type.indexOf( "." ) >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}

		if ( (!elem || jQuery.event.customEvent[ type ]) && !jQuery.event.global[ type ] ) {
			// No jQuery handlers for this event type, and it can't have inline handlers
			return;
		}

		// Caller can pass in an Event, Object, or just an event type string
		event = typeof event === "object" ?
			// jQuery.Event object
			event[ jQuery.expando ] ? event :
			// Object literal
			new jQuery.Event( type, event ) :
			// Just the event type (string)
			new jQuery.Event( type );

		event.type = type;
		event.isTrigger = true;
		event.exclusive = exclusive;
		event.namespace = namespaces.join( "." );
		event.namespace_re = event.namespace? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
		ontype = type.indexOf( ":" ) < 0 ? "on" + type : "";

		// triggerHandler() and global events don't bubble or run the default action
		if ( onlyHandlers || !elem ) {
			event.preventDefault();
		}

		// Handle a global trigger
		if ( !elem ) {

			// TODO: Stop taunting the data cache; remove global events and always attach to document
			cache = jQuery.cache;
			for ( i in cache ) {
				if ( cache[ i ].events && cache[ i ].events[ type ] ) {
					jQuery.event.trigger( event, data, cache[ i ].handle.elem, true );
				}
			}
			return;
		}

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data != null ? jQuery.makeArray( data ) : [];
		data.unshift( event );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		eventPath = [[ elem, special.bindType || type ]];
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			old = null;
			for ( cur = elem.parentNode; cur; cur = cur.parentNode ) {
				eventPath.push([ cur, bubbleType ]);
				old = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( old && old === elem.ownerDocument ) {
				eventPath.push([ old.defaultView || old.parentWindow || window, bubbleType ]);
			}
		}

		// Fire handlers on the event path
		for ( i = 0; i < eventPath.length; i++ ) {

			cur = eventPath[i][0];
			event.type = eventPath[i][1];

			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}
			handle = ontype && cur[ ontype ];
			if ( handle && jQuery.acceptData( cur ) ) {
				handle.apply( cur, data );
			}

			if ( event.isPropagationStopped() ) {
				break;
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( elem.ownerDocument, data ) === false) &&
				!(type === "click" && jQuery.nodeName( elem, "a" )) && jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				// IE<9 dies on focus/blur to hidden element (#1486)
				if ( ontype && elem[ type ] && ((type !== "focus" && type !== "blur") || event.target.offsetWidth !== 0) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					old = elem[ ontype ];

					if ( old ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( old ) {
						elem[ ontype ] = old;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event || window.event );

		var handlers = ( (jQuery._data( this, "events" ) || {} )[ event.type ] || []),
			delegateCount = handlers.delegateCount,
			args = [].slice.call( arguments, 0 ),
			run_all = !event.exclusive && !event.namespace,
			specialHandle = ( jQuery.event.special[ event.type ] || {} ).handle,
			handlerQueue = [],
			i, j, cur, ret, selMatch, matched, matches, handleObj, sel, hit, related;

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Determine handlers that should run if there are delegated events
		// Avoid disabled elements in IE (#6911) and non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && !event.target.disabled && !(event.button && event.type === "click") ) {

			for ( cur = event.target; cur != this; cur = cur.parentNode || this ) {
				selMatch = {};
				matches = [];
				for ( i = 0; i < delegateCount; i++ ) {
					handleObj = handlers[ i ];
					sel = handleObj.selector;
					hit = selMatch[ sel ];

					if ( handleObj.isPositional ) {
						// Since .is() does not work for positionals; see http://jsfiddle.net/eJ4yd/3/
						hit = ( hit || (selMatch[ sel ] = jQuery( sel )) ).index( cur ) >= 0;
					} else if ( hit === undefined ) {
						hit = selMatch[ sel ] = ( handleObj.quick ? quickIs( cur, handleObj.quick ) : jQuery( cur ).is( sel ) );
					}
					if ( hit ) {
						matches.push( handleObj );
					}
				}
				if ( matches.length ) {
					handlerQueue.push({ elem: cur, matches: matches });
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( handlers.length > delegateCount ) {
			handlerQueue.push({ elem: this, matches: handlers.slice( delegateCount ) });
		}

		// Run delegates first; they may want to stop propagation beneath us
		for ( i = 0; i < handlerQueue.length && !event.isPropagationStopped(); i++ ) {
			matched = handlerQueue[ i ];
			event.currentTarget = matched.elem;

			for ( j = 0; j < matched.matches.length && !event.isImmediatePropagationStopped(); j++ ) {
				handleObj = matched.matches[ j ];

				// Triggered event must either 1) be non-exclusive and have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( run_all || (!event.namespace && !handleObj.namespace) || event.namespace_re && event.namespace_re.test( handleObj.namespace ) ) {

					event.data = handleObj.data;
					event.handleObj = handleObj;

					ret = ( specialHandle || handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						event.result = ret;
						if ( ret === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		return event.result;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	// *** attrChange attrName relatedNode srcElement  are not normalized, non-W3C, deprecated, will be removed in 1.8 ***
	props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement wheelDelta".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop,
			originalEvent = event,
			fixHook = jQuery.event.fixHooks[ event.type ] || {},
			copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = jQuery.Event( originalEvent );

		for ( i = copy.length; i; ) {
			prop = copy[ --i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Fix target property, if necessary (#1925, IE 6/7/8 & Safari2)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Target should not be a text node (#504, Safari)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// For mouse/key events; add metaKey if it's not there (#3368, IE6/7/8)
		if ( event.metaKey === undefined ) {
			event.metaKey = event.ctrlKey;
		}

		return fixHook.filter? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		ready: {
			// Make sure the ready event is setup
			setup: jQuery.bindReady
		},

		focus: {
			delegateType: "focusin",
			noBubble: true
		},
		blur: {
			delegateType: "focusout",
			noBubble: true
		},

		beforeunload: {
			setup: function( data, namespaces, eventHandle ) {
				// We only want to do this special case on windows
				if ( jQuery.isWindow( this ) ) {
					this.onbeforeunload = eventHandle;
				}
			},

			teardown: function( namespaces, eventHandle ) {
				if ( this.onbeforeunload === eventHandle ) {
					this.onbeforeunload = null;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{ type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

// Some plugins are using, but it's undocumented/deprecated and will be removed.
// The 1.7 special event interface should provide all the hooks needed now.
jQuery.event.handle = jQuery.event.dispatch;

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		if ( elem.detachEvent ) {
			elem.detachEvent( "on" + type, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = ( src.defaultPrevented || src.returnValue === false ||
			src.getPreventDefault && src.getPreventDefault() ) ? returnTrue : returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

function returnFalse() {
	return false;
}
function returnTrue() {
	return true;
}

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	preventDefault: function() {
		this.isDefaultPrevented = returnTrue;

		var e = this.originalEvent;
		if ( !e ) {
			return;
		}

		// if preventDefault exists run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// otherwise set the returnValue property of the original event to false (IE)
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		this.isPropagationStopped = returnTrue;

		var e = this.originalEvent;
		if ( !e ) {
			return;
		}
		// if stopPropagation exists run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}
		// otherwise set the cancelBubble property of the original event to true (IE)
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	},
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = jQuery.event.special[ fix ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj,
				selector = handleObj.selector,
				oldType, ret;

			// For a real mouseover/out, always call the handler; for
			// mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || handleObj.origType === event.type || (related !== target && !jQuery.contains( target, related )) ) {
				oldType = event.type;
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = oldType;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !jQuery.support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !form._submit_attached ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						// Form was submitted, bubble the event up the tree
						if ( this.parentNode ) {
							jQuery.event.simulate( "submit", this.parentNode, event, true );
						}
					});
					form._submit_attached = true;
				}
			});
			// return undefined since we don't need an event listener
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !jQuery.support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed ) {
							this._just_changed = false;
							jQuery.event.simulate( "change", this, event, true );
						}
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !elem._change_attached ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					elem._change_attached = true;
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !jQuery.support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler while someone wants focusin/focusout
		var attaches = 0,
			handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				if ( attaches++ === 0 ) {
					document.addEventListener( orig, handler, true );
				}
			},
			teardown: function() {
				if ( --attaches === 0 ) {
					document.removeEventListener( orig, handler, true );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on.call( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			var handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace? handleObj.type + "." + handleObj.namespace : handleObj.type,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( var type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	live: function( types, data, fn ) {
		jQuery( this.context ).on( types, this.selector, data, fn );
		return this;
	},
	die: function( types, fn ) {
		jQuery( this.context ).off( types, this.selector || "**", fn );
		return this;
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length == 1? this.off( selector, "**" ) : this.off( types, selector, fn );
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		if ( this[0] ) {
			return jQuery.event.trigger( type, data, this[0], true );
		}
	},

	toggle: function( fn ) {
		// Save reference to arguments for access in closure
		var args = arguments,
			guid = fn.guid || jQuery.guid++,
			i = 0,
			toggler = function( event ) {
				// Figure out which function to execute
				var lastToggle = ( jQuery._data( this, "lastToggle" + fn.guid ) || 0 ) % i;
				jQuery._data( this, "lastToggle" + fn.guid, lastToggle + 1 );

				// Make sure that clicks stop
				event.preventDefault();

				// and execute the function
				return args[ lastToggle ].apply( this, arguments ) || false;
			};

		// link all the functions, so any of them can unbind this click handler
		toggler.guid = guid;
		while ( i < args.length ) {
			args[ i++ ].guid = guid;
		}

		return this.click( toggler );
	},

	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
});

jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		if ( fn == null ) {
			fn = data;
			data = null;
		}

		return arguments.length > 0 ?
			this.bind( name, data, fn ) :
			this.trigger( name );
	};

	if ( jQuery.attrFn ) {
		jQuery.attrFn[ name ] = true;
	}

	if ( rkeyEvent.test( name ) ) {
		jQuery.event.fixHooks[ name ] = jQuery.event.keyHooks;
	}

	if ( rmouseEvent.test( name ) ) {
		jQuery.event.fixHooks[ name ] = jQuery.event.mouseHooks;
	}
});



/*!
 * Sizzle CSS Selector Engine
 *  Copyright 2011, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function(){

var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
	expando = "sizcache" + (Math.random() + '').replace('.', ''),
	done = 0,
	toString = Object.prototype.toString,
	hasDuplicate = false,
	baseHasDuplicate = true,
	rBackslash = /\\/g,
	rReturn = /\r\n/g,
	rNonWord = /\W/;

// Here we check if the JavaScript engine is using some sort of
// optimization where it does not always call our comparision
// function. If that is the case, discard the hasDuplicate value.
//   Thus far that includes Google Chrome.
[0, 0].sort(function() {
	baseHasDuplicate = false;
	return 0;
});

var Sizzle = function( selector, context, results, seed ) {
	results = results || [];
	context = context || document;

	var origContext = context;

	if ( context.nodeType !== 1 && context.nodeType !== 9 ) {
		return [];
	}
	
	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	var m, set, checkSet, extra, ret, cur, pop, i,
		prune = true,
		contextXML = Sizzle.isXML( context ),
		parts = [],
		soFar = selector;
	
	// Reset the position of the chunker regexp (start from head)
	do {
		chunker.exec( "" );
		m = chunker.exec( soFar );

		if ( m ) {
			soFar = m[3];
		
			parts.push( m[1] );
		
			if ( m[2] ) {
				extra = m[3];
				break;
			}
		}
	} while ( m );

	if ( parts.length > 1 && origPOS.exec( selector ) ) {

		if ( parts.length === 2 && Expr.relative[ parts[0] ] ) {
			set = posProcess( parts[0] + parts[1], context, seed );

		} else {
			set = Expr.relative[ parts[0] ] ?
				[ context ] :
				Sizzle( parts.shift(), context );

			while ( parts.length ) {
				selector = parts.shift();

				if ( Expr.relative[ selector ] ) {
					selector += parts.shift();
				}
				
				set = posProcess( selector, set, seed );
			}
		}

	} else {
		// Take a shortcut and set the context if the root selector is an ID
		// (but not if it'll be faster if the inner selector is an ID)
		if ( !seed && parts.length > 1 && context.nodeType === 9 && !contextXML &&
				Expr.match.ID.test(parts[0]) && !Expr.match.ID.test(parts[parts.length - 1]) ) {

			ret = Sizzle.find( parts.shift(), context, contextXML );
			context = ret.expr ?
				Sizzle.filter( ret.expr, ret.set )[0] :
				ret.set[0];
		}

		if ( context ) {
			ret = seed ?
				{ expr: parts.pop(), set: makeArray(seed) } :
				Sizzle.find( parts.pop(), parts.length === 1 && (parts[0] === "~" || parts[0] === "+") && context.parentNode ? context.parentNode : context, contextXML );

			set = ret.expr ?
				Sizzle.filter( ret.expr, ret.set ) :
				ret.set;

			if ( parts.length > 0 ) {
				checkSet = makeArray( set );

			} else {
				prune = false;
			}

			while ( parts.length ) {
				cur = parts.pop();
				pop = cur;

				if ( !Expr.relative[ cur ] ) {
					cur = "";
				} else {
					pop = parts.pop();
				}

				if ( pop == null ) {
					pop = context;
				}

				Expr.relative[ cur ]( checkSet, pop, contextXML );
			}

		} else {
			checkSet = parts = [];
		}
	}

	if ( !checkSet ) {
		checkSet = set;
	}

	if ( !checkSet ) {
		Sizzle.error( cur || selector );
	}

	if ( toString.call(checkSet) === "[object Array]" ) {
		if ( !prune ) {
			results.push.apply( results, checkSet );

		} else if ( context && context.nodeType === 1 ) {
			for ( i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && Sizzle.contains(context, checkSet[i])) ) {
					results.push( set[i] );
				}
			}

		} else {
			for ( i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && checkSet[i].nodeType === 1 ) {
					results.push( set[i] );
				}
			}
		}

	} else {
		makeArray( checkSet, results );
	}

	if ( extra ) {
		Sizzle( extra, origContext, results, seed );
		Sizzle.uniqueSort( results );
	}

	return results;
};

Sizzle.uniqueSort = function( results ) {
	if ( sortOrder ) {
		hasDuplicate = baseHasDuplicate;
		results.sort( sortOrder );

		if ( hasDuplicate ) {
			for ( var i = 1; i < results.length; i++ ) {
				if ( results[i] === results[ i - 1 ] ) {
					results.splice( i--, 1 );
				}
			}
		}
	}

	return results;
};

Sizzle.matches = function( expr, set ) {
	return Sizzle( expr, null, null, set );
};

Sizzle.matchesSelector = function( node, expr ) {
	return Sizzle( expr, null, null, [node] ).length > 0;
};

Sizzle.find = function( expr, context, isXML ) {
	var set, i, len, match, type, left;

	if ( !expr ) {
		return [];
	}

	for ( i = 0, len = Expr.order.length; i < len; i++ ) {
		type = Expr.order[i];
		
		if ( (match = Expr.leftMatch[ type ].exec( expr )) ) {
			left = match[1];
			match.splice( 1, 1 );

			if ( left.substr( left.length - 1 ) !== "\\" ) {
				match[1] = (match[1] || "").replace( rBackslash, "" );
				set = Expr.find[ type ]( match, context, isXML );

				if ( set != null ) {
					expr = expr.replace( Expr.match[ type ], "" );
					break;
				}
			}
		}
	}

	if ( !set ) {
		set = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( "*" ) :
			[];
	}

	return { set: set, expr: expr };
};

Sizzle.filter = function( expr, set, inplace, not ) {
	var match, anyFound,
		type, found, item, filter, left,
		i, pass,
		old = expr,
		result = [],
		curLoop = set,
		isXMLFilter = set && set[0] && Sizzle.isXML( set[0] );

	while ( expr && set.length ) {
		for ( type in Expr.filter ) {
			if ( (match = Expr.leftMatch[ type ].exec( expr )) != null && match[2] ) {
				filter = Expr.filter[ type ];
				left = match[1];

				anyFound = false;

				match.splice(1,1);

				if ( left.substr( left.length - 1 ) === "\\" ) {
					continue;
				}

				if ( curLoop === result ) {
					result = [];
				}

				if ( Expr.preFilter[ type ] ) {
					match = Expr.preFilter[ type ]( match, curLoop, inplace, result, not, isXMLFilter );

					if ( !match ) {
						anyFound = found = true;

					} else if ( match === true ) {
						continue;
					}
				}

				if ( match ) {
					for ( i = 0; (item = curLoop[i]) != null; i++ ) {
						if ( item ) {
							found = filter( item, match, i, curLoop );
							pass = not ^ found;

							if ( inplace && found != null ) {
								if ( pass ) {
									anyFound = true;

								} else {
									curLoop[i] = false;
								}

							} else if ( pass ) {
								result.push( item );
								anyFound = true;
							}
						}
					}
				}

				if ( found !== undefined ) {
					if ( !inplace ) {
						curLoop = result;
					}

					expr = expr.replace( Expr.match[ type ], "" );

					if ( !anyFound ) {
						return [];
					}

					break;
				}
			}
		}

		// Improper expression
		if ( expr === old ) {
			if ( anyFound == null ) {
				Sizzle.error( expr );

			} else {
				break;
			}
		}

		old = expr;
	}

	return curLoop;
};

Sizzle.error = function( msg ) {
	throw "Syntax error, unrecognized expression: " + msg;
};

/**
 * Utility function for retreiving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
var getText = Sizzle.getText = function( elem ) {
    var i, node,
		nodeType = elem.nodeType,
		ret = "";

	if ( nodeType ) {
		if ( nodeType === 1 ) {
			// Use textContent || innerText for elements
			if ( typeof elem.textContent === 'string' ) {
				return elem.textContent;
			} else if ( typeof elem.innerText === 'string' ) {
				// Replace IE's carriage returns
				return elem.innerText.replace( rReturn, '' );
			} else {
				// Traverse it's children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling) {
					ret += getText( elem );
				}
			}
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}
	} else {

		// If no nodeType, this is expected to be an array
		for ( i = 0; (node = elem[i]); i++ ) {
			// Do not traverse comment nodes
			if ( node.nodeType !== 8 ) {
				ret += getText( node );
			}
		}
	}
	return ret;
};

var Expr = Sizzle.selectors = {
	order: [ "ID", "NAME", "TAG" ],

	match: {
		ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
		CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
		NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
		ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
		TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
		CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
		POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
		PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
	},

	leftMatch: {},

	attrMap: {
		"class": "className",
		"for": "htmlFor"
	},

	attrHandle: {
		href: function( elem ) {
			return elem.getAttribute( "href" );
		},
		type: function( elem ) {
			return elem.getAttribute( "type" );
		}
	},

	relative: {
		"+": function(checkSet, part){
			var isPartStr = typeof part === "string",
				isTag = isPartStr && !rNonWord.test( part ),
				isPartStrNotTag = isPartStr && !isTag;

			if ( isTag ) {
				part = part.toLowerCase();
			}

			for ( var i = 0, l = checkSet.length, elem; i < l; i++ ) {
				if ( (elem = checkSet[i]) ) {
					while ( (elem = elem.previousSibling) && elem.nodeType !== 1 ) {}

					checkSet[i] = isPartStrNotTag || elem && elem.nodeName.toLowerCase() === part ?
						elem || false :
						elem === part;
				}
			}

			if ( isPartStrNotTag ) {
				Sizzle.filter( part, checkSet, true );
			}
		},

		">": function( checkSet, part ) {
			var elem,
				isPartStr = typeof part === "string",
				i = 0,
				l = checkSet.length;

			if ( isPartStr && !rNonWord.test( part ) ) {
				part = part.toLowerCase();

				for ( ; i < l; i++ ) {
					elem = checkSet[i];

					if ( elem ) {
						var parent = elem.parentNode;
						checkSet[i] = parent.nodeName.toLowerCase() === part ? parent : false;
					}
				}

			} else {
				for ( ; i < l; i++ ) {
					elem = checkSet[i];

					if ( elem ) {
						checkSet[i] = isPartStr ?
							elem.parentNode :
							elem.parentNode === part;
					}
				}

				if ( isPartStr ) {
					Sizzle.filter( part, checkSet, true );
				}
			}
		},

		"": function(checkSet, part, isXML){
			var nodeCheck,
				doneName = done++,
				checkFn = dirCheck;

			if ( typeof part === "string" && !rNonWord.test( part ) ) {
				part = part.toLowerCase();
				nodeCheck = part;
				checkFn = dirNodeCheck;
			}

			checkFn( "parentNode", part, doneName, checkSet, nodeCheck, isXML );
		},

		"~": function( checkSet, part, isXML ) {
			var nodeCheck,
				doneName = done++,
				checkFn = dirCheck;

			if ( typeof part === "string" && !rNonWord.test( part ) ) {
				part = part.toLowerCase();
				nodeCheck = part;
				checkFn = dirNodeCheck;
			}

			checkFn( "previousSibling", part, doneName, checkSet, nodeCheck, isXML );
		}
	},

	find: {
		ID: function( match, context, isXML ) {
			if ( typeof context.getElementById !== "undefined" && !isXML ) {
				var m = context.getElementById(match[1]);
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [m] : [];
			}
		},

		NAME: function( match, context ) {
			if ( typeof context.getElementsByName !== "undefined" ) {
				var ret = [],
					results = context.getElementsByName( match[1] );

				for ( var i = 0, l = results.length; i < l; i++ ) {
					if ( results[i].getAttribute("name") === match[1] ) {
						ret.push( results[i] );
					}
				}

				return ret.length === 0 ? null : ret;
			}
		},

		TAG: function( match, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( match[1] );
			}
		}
	},
	preFilter: {
		CLASS: function( match, curLoop, inplace, result, not, isXML ) {
			match = " " + match[1].replace( rBackslash, "" ) + " ";

			if ( isXML ) {
				return match;
			}

			for ( var i = 0, elem; (elem = curLoop[i]) != null; i++ ) {
				if ( elem ) {
					if ( not ^ (elem.className && (" " + elem.className + " ").replace(/[\t\n\r]/g, " ").indexOf(match) >= 0) ) {
						if ( !inplace ) {
							result.push( elem );
						}

					} else if ( inplace ) {
						curLoop[i] = false;
					}
				}
			}

			return false;
		},

		ID: function( match ) {
			return match[1].replace( rBackslash, "" );
		},

		TAG: function( match, curLoop ) {
			return match[1].replace( rBackslash, "" ).toLowerCase();
		},

		CHILD: function( match ) {
			if ( match[1] === "nth" ) {
				if ( !match[2] ) {
					Sizzle.error( match[0] );
				}

				match[2] = match[2].replace(/^\+|\s*/g, '');

				// parse equations like 'even', 'odd', '5', '2n', '3n+2', '4n-1', '-n+6'
				var test = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(
					match[2] === "even" && "2n" || match[2] === "odd" && "2n+1" ||
					!/\D/.test( match[2] ) && "0n+" + match[2] || match[2]);

				// calculate the numbers (first)n+(last) including if they are negative
				match[2] = (test[1] + (test[2] || 1)) - 0;
				match[3] = test[3] - 0;
			}
			else if ( match[2] ) {
				Sizzle.error( match[0] );
			}

			// TODO: Move to normal caching system
			match[0] = done++;

			return match;
		},

		ATTR: function( match, curLoop, inplace, result, not, isXML ) {
			var name = match[1] = match[1].replace( rBackslash, "" );
			
			if ( !isXML && Expr.attrMap[name] ) {
				match[1] = Expr.attrMap[name];
			}

			// Handle if an un-quoted value was used
			match[4] = ( match[4] || match[5] || "" ).replace( rBackslash, "" );

			if ( match[2] === "~=" ) {
				match[4] = " " + match[4] + " ";
			}

			return match;
		},

		PSEUDO: function( match, curLoop, inplace, result, not ) {
			if ( match[1] === "not" ) {
				// If we're dealing with a complex expression, or a simple one
				if ( ( chunker.exec(match[3]) || "" ).length > 1 || /^\w/.test(match[3]) ) {
					match[3] = Sizzle(match[3], null, null, curLoop);

				} else {
					var ret = Sizzle.filter(match[3], curLoop, inplace, true ^ not);

					if ( !inplace ) {
						result.push.apply( result, ret );
					}

					return false;
				}

			} else if ( Expr.match.POS.test( match[0] ) || Expr.match.CHILD.test( match[0] ) ) {
				return true;
			}
			
			return match;
		},

		POS: function( match ) {
			match.unshift( true );

			return match;
		}
	},
	
	filters: {
		enabled: function( elem ) {
			return elem.disabled === false && elem.type !== "hidden";
		},

		disabled: function( elem ) {
			return elem.disabled === true;
		},

		checked: function( elem ) {
			return elem.checked === true;
		},
		
		selected: function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}
			
			return elem.selected === true;
		},

		parent: function( elem ) {
			return !!elem.firstChild;
		},

		empty: function( elem ) {
			return !elem.firstChild;
		},

		has: function( elem, i, match ) {
			return !!Sizzle( match[3], elem ).length;
		},

		header: function( elem ) {
			return (/h\d/i).test( elem.nodeName );
		},

		text: function( elem ) {
			var attr = elem.getAttribute( "type" ), type = elem.type;
			// IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc) 
			// use getAttribute instead to test this case
			return elem.nodeName.toLowerCase() === "input" && "text" === type && ( attr === type || attr === null );
		},

		radio: function( elem ) {
			return elem.nodeName.toLowerCase() === "input" && "radio" === elem.type;
		},

		checkbox: function( elem ) {
			return elem.nodeName.toLowerCase() === "input" && "checkbox" === elem.type;
		},

		file: function( elem ) {
			return elem.nodeName.toLowerCase() === "input" && "file" === elem.type;
		},

		password: function( elem ) {
			return elem.nodeName.toLowerCase() === "input" && "password" === elem.type;
		},

		submit: function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return (name === "input" || name === "button") && "submit" === elem.type;
		},

		image: function( elem ) {
			return elem.nodeName.toLowerCase() === "input" && "image" === elem.type;
		},

		reset: function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return (name === "input" || name === "button") && "reset" === elem.type;
		},

		button: function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && "button" === elem.type || name === "button";
		},

		input: function( elem ) {
			return (/input|select|textarea|button/i).test( elem.nodeName );
		},

		focus: function( elem ) {
			return elem === elem.ownerDocument.activeElement;
		}
	},
	setFilters: {
		first: function( elem, i ) {
			return i === 0;
		},

		last: function( elem, i, match, array ) {
			return i === array.length - 1;
		},

		even: function( elem, i ) {
			return i % 2 === 0;
		},

		odd: function( elem, i ) {
			return i % 2 === 1;
		},

		lt: function( elem, i, match ) {
			return i < match[3] - 0;
		},

		gt: function( elem, i, match ) {
			return i > match[3] - 0;
		},

		nth: function( elem, i, match ) {
			return match[3] - 0 === i;
		},

		eq: function( elem, i, match ) {
			return match[3] - 0 === i;
		}
	},
	filter: {
		PSEUDO: function( elem, match, i, array ) {
			var name = match[1],
				filter = Expr.filters[ name ];

			if ( filter ) {
				return filter( elem, i, match, array );

			} else if ( name === "contains" ) {
				return (elem.textContent || elem.innerText || getText([ elem ]) || "").indexOf(match[3]) >= 0;

			} else if ( name === "not" ) {
				var not = match[3];

				for ( var j = 0, l = not.length; j < l; j++ ) {
					if ( not[j] === elem ) {
						return false;
					}
				}

				return true;

			} else {
				Sizzle.error( name );
			}
		},

		CHILD: function( elem, match ) {
			var first, last,
				doneName, parent, cache,
				count, diff,
				type = match[1],
				node = elem;

			switch ( type ) {
				case "only":
				case "first":
					while ( (node = node.previousSibling) )	 {
						if ( node.nodeType === 1 ) { 
							return false; 
						}
					}

					if ( type === "first" ) { 
						return true; 
					}

					node = elem;

				case "last":
					while ( (node = node.nextSibling) )	 {
						if ( node.nodeType === 1 ) { 
							return false; 
						}
					}

					return true;

				case "nth":
					first = match[2];
					last = match[3];

					if ( first === 1 && last === 0 ) {
						return true;
					}
					
					doneName = match[0];
					parent = elem.parentNode;
	
					if ( parent && (parent[ expando ] !== doneName || !elem.nodeIndex) ) {
						count = 0;
						
						for ( node = parent.firstChild; node; node = node.nextSibling ) {
							if ( node.nodeType === 1 ) {
								node.nodeIndex = ++count;
							}
						} 

						parent[ expando ] = doneName;
					}
					
					diff = elem.nodeIndex - last;

					if ( first === 0 ) {
						return diff === 0;

					} else {
						return ( diff % first === 0 && diff / first >= 0 );
					}
			}
		},

		ID: function( elem, match ) {
			return elem.nodeType === 1 && elem.getAttribute("id") === match;
		},

		TAG: function( elem, match ) {
			return (match === "*" && elem.nodeType === 1) || !!elem.nodeName && elem.nodeName.toLowerCase() === match;
		},
		
		CLASS: function( elem, match ) {
			return (" " + (elem.className || elem.getAttribute("class")) + " ")
				.indexOf( match ) > -1;
		},

		ATTR: function( elem, match ) {
			var name = match[1],
				result = Sizzle.attr ?
					Sizzle.attr( elem, name ) :
					Expr.attrHandle[ name ] ?
					Expr.attrHandle[ name ]( elem ) :
					elem[ name ] != null ?
						elem[ name ] :
						elem.getAttribute( name ),
				value = result + "",
				type = match[2],
				check = match[4];

			return result == null ?
				type === "!=" :
				!type && Sizzle.attr ?
				result != null :
				type === "=" ?
				value === check :
				type === "*=" ?
				value.indexOf(check) >= 0 :
				type === "~=" ?
				(" " + value + " ").indexOf(check) >= 0 :
				!check ?
				value && result !== false :
				type === "!=" ?
				value !== check :
				type === "^=" ?
				value.indexOf(check) === 0 :
				type === "$=" ?
				value.substr(value.length - check.length) === check :
				type === "|=" ?
				value === check || value.substr(0, check.length + 1) === check + "-" :
				false;
		},

		POS: function( elem, match, i, array ) {
			var name = match[2],
				filter = Expr.setFilters[ name ];

			if ( filter ) {
				return filter( elem, i, match, array );
			}
		}
	}
};

var origPOS = Expr.match.POS,
	fescape = function(all, num){
		return "\\" + (num - 0 + 1);
	};

for ( var type in Expr.match ) {
	Expr.match[ type ] = new RegExp( Expr.match[ type ].source + (/(?![^\[]*\])(?![^\(]*\))/.source) );
	Expr.leftMatch[ type ] = new RegExp( /(^(?:.|\r|\n)*?)/.source + Expr.match[ type ].source.replace(/\\(\d+)/g, fescape) );
}

var makeArray = function( array, results ) {
	array = Array.prototype.slice.call( array, 0 );

	if ( results ) {
		results.push.apply( results, array );
		return results;
	}
	
	return array;
};

// Perform a simple check to determine if the browser is capable of
// converting a NodeList to an array using builtin methods.
// Also verifies that the returned array holds DOM nodes
// (which is not the case in the Blackberry browser)
try {
	Array.prototype.slice.call( document.documentElement.childNodes, 0 )[0].nodeType;

// Provide a fallback method if it does not work
} catch( e ) {
	makeArray = function( array, results ) {
		var i = 0,
			ret = results || [];

		if ( toString.call(array) === "[object Array]" ) {
			Array.prototype.push.apply( ret, array );

		} else {
			if ( typeof array.length === "number" ) {
				for ( var l = array.length; i < l; i++ ) {
					ret.push( array[i] );
				}

			} else {
				for ( ; array[i]; i++ ) {
					ret.push( array[i] );
				}
			}
		}

		return ret;
	};
}

var sortOrder, siblingCheck;

if ( document.documentElement.compareDocumentPosition ) {
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		if ( !a.compareDocumentPosition || !b.compareDocumentPosition ) {
			return a.compareDocumentPosition ? -1 : 1;
		}

		return a.compareDocumentPosition(b) & 4 ? -1 : 1;
	};

} else {
	sortOrder = function( a, b ) {
		// The nodes are identical, we can exit early
		if ( a === b ) {
			hasDuplicate = true;
			return 0;

		// Fallback to using sourceIndex (in IE) if it's available on both nodes
		} else if ( a.sourceIndex && b.sourceIndex ) {
			return a.sourceIndex - b.sourceIndex;
		}

		var al, bl,
			ap = [],
			bp = [],
			aup = a.parentNode,
			bup = b.parentNode,
			cur = aup;

		// If the nodes are siblings (or identical) we can do a quick check
		if ( aup === bup ) {
			return siblingCheck( a, b );

		// If no parents were found then the nodes are disconnected
		} else if ( !aup ) {
			return -1;

		} else if ( !bup ) {
			return 1;
		}

		// Otherwise they're somewhere else in the tree so we need
		// to build up a full list of the parentNodes for comparison
		while ( cur ) {
			ap.unshift( cur );
			cur = cur.parentNode;
		}

		cur = bup;

		while ( cur ) {
			bp.unshift( cur );
			cur = cur.parentNode;
		}

		al = ap.length;
		bl = bp.length;

		// Start walking down the tree looking for a discrepancy
		for ( var i = 0; i < al && i < bl; i++ ) {
			if ( ap[i] !== bp[i] ) {
				return siblingCheck( ap[i], bp[i] );
			}
		}

		// We ended someplace up the tree so do a sibling check
		return i === al ?
			siblingCheck( a, bp[i], -1 ) :
			siblingCheck( ap[i], b, 1 );
	};

	siblingCheck = function( a, b, ret ) {
		if ( a === b ) {
			return ret;
		}

		var cur = a.nextSibling;

		while ( cur ) {
			if ( cur === b ) {
				return -1;
			}

			cur = cur.nextSibling;
		}

		return 1;
	};
}

// Check to see if the browser returns elements by name when
// querying by getElementById (and provide a workaround)
(function(){
	// We're going to inject a fake input element with a specified name
	var form = document.createElement("div"),
		id = "script" + (new Date()).getTime(),
		root = document.documentElement;

	form.innerHTML = "<a name='" + id + "'/>";

	// Inject it into the root element, check its status, and remove it quickly
	root.insertBefore( form, root.firstChild );

	// The workaround has to do additional checks after a getElementById
	// Which slows things down for other browsers (hence the branching)
	if ( document.getElementById( id ) ) {
		Expr.find.ID = function( match, context, isXML ) {
			if ( typeof context.getElementById !== "undefined" && !isXML ) {
				var m = context.getElementById(match[1]);

				return m ?
					m.id === match[1] || typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id").nodeValue === match[1] ?
						[m] :
						undefined :
					[];
			}
		};

		Expr.filter.ID = function( elem, match ) {
			var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");

			return elem.nodeType === 1 && node && node.nodeValue === match;
		};
	}

	root.removeChild( form );

	// release memory in IE
	root = form = null;
})();

(function(){
	// Check to see if the browser returns only elements
	// when doing getElementsByTagName("*")

	// Create a fake element
	var div = document.createElement("div");
	div.appendChild( document.createComment("") );

	// Make sure no comments are found
	if ( div.getElementsByTagName("*").length > 0 ) {
		Expr.find.TAG = function( match, context ) {
			var results = context.getElementsByTagName( match[1] );

			// Filter out possible comments
			if ( match[1] === "*" ) {
				var tmp = [];

				for ( var i = 0; results[i]; i++ ) {
					if ( results[i].nodeType === 1 ) {
						tmp.push( results[i] );
					}
				}

				results = tmp;
			}

			return results;
		};
	}

	// Check to see if an attribute returns normalized href attributes
	div.innerHTML = "<a href='#'></a>";

	if ( div.firstChild && typeof div.firstChild.getAttribute !== "undefined" &&
			div.firstChild.getAttribute("href") !== "#" ) {

		Expr.attrHandle.href = function( elem ) {
			return elem.getAttribute( "href", 2 );
		};
	}

	// release memory in IE
	div = null;
})();

if ( document.querySelectorAll ) {
	(function(){
		var oldSizzle = Sizzle,
			div = document.createElement("div"),
			id = "__sizzle__";

		div.innerHTML = "<p class='TEST'></p>";

		// Safari can't handle uppercase or unicode characters when
		// in quirks mode.
		if ( div.querySelectorAll && div.querySelectorAll(".TEST").length === 0 ) {
			return;
		}
	
		Sizzle = function( query, context, extra, seed ) {
			context = context || document;

			// Only use querySelectorAll on non-XML documents
			// (ID selectors don't work in non-HTML documents)
			if ( !seed && !Sizzle.isXML(context) ) {
				// See if we find a selector to speed up
				var match = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec( query );
				
				if ( match && (context.nodeType === 1 || context.nodeType === 9) ) {
					// Speed-up: Sizzle("TAG")
					if ( match[1] ) {
						return makeArray( context.getElementsByTagName( query ), extra );
					
					// Speed-up: Sizzle(".CLASS")
					} else if ( match[2] && Expr.find.CLASS && context.getElementsByClassName ) {
						return makeArray( context.getElementsByClassName( match[2] ), extra );
					}
				}
				
				if ( context.nodeType === 9 ) {
					// Speed-up: Sizzle("body")
					// The body element only exists once, optimize finding it
					if ( query === "body" && context.body ) {
						return makeArray( [ context.body ], extra );
						
					// Speed-up: Sizzle("#ID")
					} else if ( match && match[3] ) {
						var elem = context.getElementById( match[3] );

						// Check parentNode to catch when Blackberry 4.6 returns
						// nodes that are no longer in the document #6963
						if ( elem && elem.parentNode ) {
							// Handle the case where IE and Opera return items
							// by name instead of ID
							if ( elem.id === match[3] ) {
								return makeArray( [ elem ], extra );
							}
							
						} else {
							return makeArray( [], extra );
						}
					}
					
					try {
						return makeArray( context.querySelectorAll(query), extra );
					} catch(qsaError) {}

				// qSA works strangely on Element-rooted queries
				// We can work around this by specifying an extra ID on the root
				// and working up from there (Thanks to Andrew Dupont for the technique)
				// IE 8 doesn't work on object elements
				} else if ( context.nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
					var oldContext = context,
						old = context.getAttribute( "id" ),
						nid = old || id,
						hasParent = context.parentNode,
						relativeHierarchySelector = /^\s*[+~]/.test( query );

					if ( !old ) {
						context.setAttribute( "id", nid );
					} else {
						nid = nid.replace( /'/g, "\\$&" );
					}
					if ( relativeHierarchySelector && hasParent ) {
						context = context.parentNode;
					}

					try {
						if ( !relativeHierarchySelector || hasParent ) {
							return makeArray( context.querySelectorAll( "[id='" + nid + "'] " + query ), extra );
						}

					} catch(pseudoError) {
					} finally {
						if ( !old ) {
							oldContext.removeAttribute( "id" );
						}
					}
				}
			}
		
			return oldSizzle(query, context, extra, seed);
		};

		for ( var prop in oldSizzle ) {
			Sizzle[ prop ] = oldSizzle[ prop ];
		}

		// release memory in IE
		div = null;
	})();
}

(function(){
	var html = document.documentElement,
		matches = html.matchesSelector || html.mozMatchesSelector || html.webkitMatchesSelector || html.msMatchesSelector;

	if ( matches ) {
		// Check to see if it's possible to do matchesSelector
		// on a disconnected node (IE 9 fails this)
		var disconnectedMatch = !matches.call( document.createElement( "div" ), "div" ),
			pseudoWorks = false;

		try {
			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( document.documentElement, "[test!='']:sizzle" );
	
		} catch( pseudoError ) {
			pseudoWorks = true;
		}

		Sizzle.matchesSelector = function( node, expr ) {
			// Make sure that attribute selectors are quoted
			expr = expr.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");

			if ( !Sizzle.isXML( node ) ) {
				try { 
					if ( pseudoWorks || !Expr.match.PSEUDO.test( expr ) && !/!=/.test( expr ) ) {
						var ret = matches.call( node, expr );

						// IE 9's matchesSelector returns false on disconnected nodes
						if ( ret || !disconnectedMatch ||
								// As well, disconnected nodes are said to be in a document
								// fragment in IE 9, so check for that
								node.document && node.document.nodeType !== 11 ) {
							return ret;
						}
					}
				} catch(e) {}
			}

			return Sizzle(expr, null, null, [node]).length > 0;
		};
	}
})();

(function(){
	var div = document.createElement("div");

	div.innerHTML = "<div class='test e'></div><div class='test'></div>";

	// Opera can't find a second classname (in 9.6)
	// Also, make sure that getElementsByClassName actually exists
	if ( !div.getElementsByClassName || div.getElementsByClassName("e").length === 0 ) {
		return;
	}

	// Safari caches class attributes, doesn't catch changes (in 3.2)
	div.lastChild.className = "e";

	if ( div.getElementsByClassName("e").length === 1 ) {
		return;
	}
	
	Expr.order.splice(1, 0, "CLASS");
	Expr.find.CLASS = function( match, context, isXML ) {
		if ( typeof context.getElementsByClassName !== "undefined" && !isXML ) {
			return context.getElementsByClassName(match[1]);
		}
	};

	// release memory in IE
	div = null;
})();

function dirNodeCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
		var elem = checkSet[i];

		if ( elem ) {
			var match = false;

			elem = elem[dir];

			while ( elem ) {
				if ( elem[ expando ] === doneName ) {
					match = checkSet[elem.sizset];
					break;
				}

				if ( elem.nodeType === 1 && !isXML ){
					elem[ expando ] = doneName;
					elem.sizset = i;
				}

				if ( elem.nodeName.toLowerCase() === cur ) {
					match = elem;
					break;
				}

				elem = elem[dir];
			}

			checkSet[i] = match;
		}
	}
}

function dirCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
		var elem = checkSet[i];

		if ( elem ) {
			var match = false;
			
			elem = elem[dir];

			while ( elem ) {
				if ( elem[ expando ] === doneName ) {
					match = checkSet[elem.sizset];
					break;
				}

				if ( elem.nodeType === 1 ) {
					if ( !isXML ) {
						elem[ expando ] = doneName;
						elem.sizset = i;
					}

					if ( typeof cur !== "string" ) {
						if ( elem === cur ) {
							match = true;
							break;
						}

					} else if ( Sizzle.filter( cur, [elem] ).length > 0 ) {
						match = elem;
						break;
					}
				}

				elem = elem[dir];
			}

			checkSet[i] = match;
		}
	}
}

if ( document.documentElement.contains ) {
	Sizzle.contains = function( a, b ) {
		return a !== b && (a.contains ? a.contains(b) : true);
	};

} else if ( document.documentElement.compareDocumentPosition ) {
	Sizzle.contains = function( a, b ) {
		return !!(a.compareDocumentPosition(b) & 16);
	};

} else {
	Sizzle.contains = function() {
		return false;
	};
}

Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833) 
	var documentElement = (elem ? elem.ownerDocument || elem : 0).documentElement;

	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

var posProcess = function( selector, context, seed ) {
	var match,
		tmpSet = [],
		later = "",
		root = context.nodeType ? [context] : context;

	// Position selectors must be done after the filter
	// And so must :not(positional) so we move all PSEUDOs to the end
	while ( (match = Expr.match.PSEUDO.exec( selector )) ) {
		later += match[0];
		selector = selector.replace( Expr.match.PSEUDO, "" );
	}

	selector = Expr.relative[selector] ? selector + "*" : selector;

	for ( var i = 0, l = root.length; i < l; i++ ) {
		Sizzle( selector, root[i], tmpSet, seed );
	}

	return Sizzle.filter( later, tmpSet );
};

// EXPOSE
// Override sizzle attribute retrieval
Sizzle.attr = jQuery.attr;
Sizzle.selectors.attrMap = {};
jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.filters;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;


})();


var runtil = /Until$/,
	rparentsprev = /^(?:parents|prevUntil|prevAll)/,
	// Note: This RegExp should be improved, or likely pulled from Sizzle
	rmultiselector = /,/,
	isSimple = /^.[^:#\[\.,]*$/,
	slice = Array.prototype.slice,
	POS = jQuery.expr.match.POS,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend({
	find: function( selector ) {
		var self = this,
			i, l;

		if ( typeof selector !== "string" ) {
			return jQuery( selector ).filter(function() {
				for ( i = 0, l = self.length; i < l; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			});
		}

		var ret = this.pushStack( "", "find", selector ),
			length, n, r;

		for ( i = 0, l = this.length; i < l; i++ ) {
			length = ret.length;
			jQuery.find( selector, this[i], ret );

			if ( i > 0 ) {
				// Make sure that the results are unique
				for ( n = length; n < ret.length; n++ ) {
					for ( r = 0; r < length; r++ ) {
						if ( ret[r] === ret[n] ) {
							ret.splice(n--, 1);
							break;
						}
					}
				}
			}
		}

		return ret;
	},

	has: function( target ) {
		var targets = jQuery( target );
		return this.filter(function() {
			for ( var i = 0, l = targets.length; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	not: function( selector ) {
		return this.pushStack( winnow(this, selector, false), "not", selector);
	},

	filter: function( selector ) {
		return this.pushStack( winnow(this, selector, true), "filter", selector );
	},

	is: function( selector ) {
		return !!selector && ( 
			typeof selector === "string" ?
				// If this is a positional selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				POS.test( selector ) ? 
					jQuery( selector, this.context ).index( this[0] ) >= 0 :
					jQuery.filter( selector, this ).length > 0 :
				this.filter( selector ).length > 0 );
	},

	closest: function( selectors, context ) {
		var ret = [], i, l, cur = this[0];
		
		// Array (deprecated as of jQuery 1.7)
		if ( jQuery.isArray( selectors ) ) {
			var level = 1;

			while ( cur && cur.ownerDocument && cur !== context ) {
				for ( i = 0; i < selectors.length; i++ ) {

					if ( jQuery( cur ).is( selectors[ i ] ) ) {
						ret.push({ selector: selectors[ i ], elem: cur, level: level });
					}
				}

				cur = cur.parentNode;
				level++;
			}

			return ret;
		}

		// String
		var pos = POS.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( i = 0, l = this.length; i < l; i++ ) {
			cur = this[i];

			while ( cur ) {
				if ( pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors) ) {
					ret.push( cur );
					break;

				} else {
					cur = cur.parentNode;
					if ( !cur || !cur.ownerDocument || cur === context || cur.nodeType === 11 ) {
						break;
					}
				}
			}
		}

		ret = ret.length > 1 ? jQuery.unique( ret ) : ret;

		return this.pushStack( ret, "closest", selectors );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		var set = typeof selector === "string" ?
				jQuery( selector, context ) :
				jQuery.makeArray( selector && selector.nodeType ? [ selector ] : selector ),
			all = jQuery.merge( this.get(), set );

		return this.pushStack( isDisconnected( set[0] ) || isDisconnected( all[0] ) ?
			all :
			jQuery.unique( all ) );
	},

	andSelf: function() {
		return this.add( this.prevObject );
	}
});

// A painfully simple check to see if an element is disconnected
// from a document (should be improved, where feasible).
function isDisconnected( node ) {
	return !node || !node.parentNode || node.parentNode.nodeType === 11;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return jQuery.nth( elem, 2, "nextSibling" );
	},
	prev: function( elem ) {
		return jQuery.nth( elem, 2, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( elem.parentNode.firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.makeArray( elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until ),
			// The variable 'args' was introduced in
			// https://github.com/jquery/jquery/commit/52a0238
			// to work around a bug in Chrome 10 (Dev) and should be removed when the bug is fixed.
			// http://code.google.com/p/v8/issues/detail?id=1050
			args = slice.call(arguments);

		if ( !runtil.test( name ) ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		ret = this.length > 1 && !guaranteedUnique[ name ] ? jQuery.unique( ret ) : ret;

		if ( (this.length > 1 || rmultiselector.test( selector )) && rparentsprev.test( name ) ) {
			ret = ret.reverse();
		}

		return this.pushStack( ret, name, args.join(",") );
	};
});

jQuery.extend({
	filter: function( expr, elems, not ) {
		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 ?
			jQuery.find.matchesSelector(elems[0], expr) ? [ elems[0] ] : [] :
			jQuery.find.matches(expr, elems);
	},

	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	nth: function( cur, result, dir, elem ) {
		result = result || 1;
		var num = 0;

		for ( ; cur; cur = cur[dir] ) {
			if ( cur.nodeType === 1 && ++num === result ) {
				break;
			}
		}

		return cur;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, keep ) {

	// Can't pass null or undefined to indexOf in Firefox 4
	// Set to 0 to skip string check
	qualifier = qualifier || 0;

	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep(elements, function( elem, i ) {
			var retVal = !!qualifier.call( elem, i, elem );
			return retVal === keep;
		});

	} else if ( qualifier.nodeType ) {
		return jQuery.grep(elements, function( elem, i ) {
			return ( elem === qualifier ) === keep;
		});

	} else if ( typeof qualifier === "string" ) {
		var filtered = jQuery.grep(elements, function( elem ) {
			return elem.nodeType === 1;
		});

		if ( isSimple.test( qualifier ) ) {
			return jQuery.filter(qualifier, filtered, !keep);
		} else {
			qualifier = jQuery.filter( qualifier, filtered );
		}
	}

	return jQuery.grep(elements, function( elem, i ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) === keep;
	});
}




function createSafeFragment( document ) {
	var list = nodeNames.split( " " ),
	safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr article aside audio canvas datalist details figcaption figure footer " +
		"header hgroup mark meter nav output progress section summary time video",
	rinlinejQuery = / jQuery\d+="(?:\d+|null)"/g,
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style)/i,
	rnocache = /<(?:script|object|embed|option|style)/i,
	rnoshimcache = new RegExp("<(?:" + nodeNames.replace(" ", "|") + ")", "i"),
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /\/(java|ecma)script/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|\-\-)/,
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		area: [ 1, "<map>", "</map>" ],
		_default: [ 0, "", "" ]
	},
	safeFragment = createSafeFragment( document );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// IE can't serialize <link> and <script> tags normally
if ( !jQuery.support.htmlSerialize ) {
	wrapMap._default = [ 1, "div<div>", "</div>" ];
}

jQuery.fn.extend({
	text: function( text ) {
		if ( jQuery.isFunction(text) ) {
			return this.each(function(i) {
				var self = jQuery( this );

				self.text( text.call(this, i, self.text()) );
			});
		}

		if ( typeof text !== "object" && text !== undefined ) {
			return this.empty().append( (this[0] && this[0].ownerDocument || document).createTextNode( text ) );
		}

		return jQuery.text( this );
	},

	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		return this.each(function() {
			jQuery( this ).wrapAll( html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	},

	append: function() {
		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 ) {
				this.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 ) {
				this.insertBefore( elem, this.firstChild );
			}
		});
	},

	before: function() {
		if ( this[0] && this[0].parentNode ) {
			return this.domManip(arguments, false, function( elem ) {
				this.parentNode.insertBefore( elem, this );
			});
		} else if ( arguments.length ) {
			var set = jQuery(arguments[0]);
			set.push.apply( set, this.toArray() );
			return this.pushStack( set, "before", arguments );
		}
	},

	after: function() {
		if ( this[0] && this[0].parentNode ) {
			return this.domManip(arguments, false, function( elem ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			});
		} else if ( arguments.length ) {
			var set = this.pushStack( this, "after", arguments );
			set.push.apply( set, jQuery(arguments[0]).toArray() );
			return set;
		}
	},

	// keepData is for internal use only--do not document
	remove: function( selector, keepData ) {
		for ( var i = 0, elem; (elem = this[i]) != null; i++ ) {
			if ( !selector || jQuery.filter( selector, [ elem ] ).length ) {
				if ( !keepData && elem.nodeType === 1 ) {
					jQuery.cleanData( elem.getElementsByTagName("*") );
					jQuery.cleanData( [ elem ] );
				}

				if ( elem.parentNode ) {
					elem.parentNode.removeChild( elem );
				}
			}
		}

		return this;
	},

	empty: function() {
		for ( var i = 0, elem; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( elem.getElementsByTagName("*") );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function () {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		if ( value === undefined ) {
			return this[0] && this[0].nodeType === 1 ?
				this[0].innerHTML.replace(rinlinejQuery, "") :
				null;

		// See if we can take a shortcut and just use innerHTML
		} else if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
			(jQuery.support.leadingWhitespace || !rleadingWhitespace.test( value )) &&
			!wrapMap[ (rtagName.exec( value ) || ["", ""])[1].toLowerCase() ] ) {

			value = value.replace(rxhtmlTag, "<$1></$2>");

			try {
				for ( var i = 0, l = this.length; i < l; i++ ) {
					// Remove element nodes and prevent memory leaks
					if ( this[i].nodeType === 1 ) {
						jQuery.cleanData( this[i].getElementsByTagName("*") );
						this[i].innerHTML = value;
					}
				}

			// If using innerHTML throws an exception, use the fallback method
			} catch(e) {
				this.empty().append( value );
			}

		} else if ( jQuery.isFunction( value ) ) {
			this.each(function(i){
				var self = jQuery( this );

				self.html( value.call(this, i, self.html()) );
			});

		} else {
			this.empty().append( value );
		}

		return this;
	},

	replaceWith: function( value ) {
		if ( this[0] && this[0].parentNode ) {
			// Make sure that the elements are removed from the DOM before they are inserted
			// this can help fix replacing a parent with child elements
			if ( jQuery.isFunction( value ) ) {
				return this.each(function(i) {
					var self = jQuery(this), old = self.html();
					self.replaceWith( value.call( this, i, old ) );
				});
			}

			if ( typeof value !== "string" ) {
				value = jQuery( value ).detach();
			}

			return this.each(function() {
				var next = this.nextSibling,
					parent = this.parentNode;

				jQuery( this ).remove();

				if ( next ) {
					jQuery(next).before( value );
				} else {
					jQuery(parent).append( value );
				}
			});
		} else {
			return this.length ?
				this.pushStack( jQuery(jQuery.isFunction(value) ? value() : value), "replaceWith", value ) :
				this;
		}
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, table, callback ) {
		var results, first, fragment, parent,
			value = args[0],
			scripts = [];

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( !jQuery.support.checkClone && arguments.length === 3 && typeof value === "string" && rchecked.test( value ) ) {
			return this.each(function() {
				jQuery(this).domManip( args, table, callback, true );
			});
		}

		if ( jQuery.isFunction(value) ) {
			return this.each(function(i) {
				var self = jQuery(this);
				args[0] = value.call(this, i, table ? self.html() : undefined);
				self.domManip( args, table, callback );
			});
		}

		if ( this[0] ) {
			parent = value && value.parentNode;

			// If we're in a fragment, just use that instead of building a new one
			if ( jQuery.support.parentNode && parent && parent.nodeType === 11 && parent.childNodes.length === this.length ) {
				results = { fragment: parent };

			} else {
				results = jQuery.buildFragment( args, this, scripts );
			}

			fragment = results.fragment;

			if ( fragment.childNodes.length === 1 ) {
				first = fragment = fragment.firstChild;
			} else {
				first = fragment.firstChild;
			}

			if ( first ) {
				table = table && jQuery.nodeName( first, "tr" );

				for ( var i = 0, l = this.length, lastIndex = l - 1; i < l; i++ ) {
					callback.call(
						table ?
							root(this[i], first) :
							this[i],
						// Make sure that we do not leak memory by inadvertently discarding
						// the original fragment (which might have attached data) instead of
						// using it; in addition, use the original fragment object for the last
						// item instead of first because it can end up being emptied incorrectly
						// in certain situations (Bug #8070).
						// Fragments from the fragment cache must always be cloned and never used
						// in place.
						results.cacheable || ( l > 1 && i < lastIndex ) ?
							jQuery.clone( fragment, true, true ) :
							fragment
					);
				}
			}

			if ( scripts.length ) {
				jQuery.each( scripts, evalScript );
			}
		}

		return this;
	}
});

function root( elem, cur ) {
	return jQuery.nodeName(elem, "table") ?
		(elem.getElementsByTagName("tbody")[0] ||
		elem.appendChild(elem.ownerDocument.createElement("tbody"))) :
		elem;
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type + ( events[ type ][ i ].namespace ? "." : "" ) + events[ type ][ i ].namespace, events[ type ][ i ], events[ type ][ i ].data );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function cloneFixAttributes( src, dest ) {
	var nodeName;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	// clearAttributes removes the attributes, which we don't want,
	// but also removes the attachEvent events, which we *do* want
	if ( dest.clearAttributes ) {
		dest.clearAttributes();
	}

	// mergeAttributes, in contrast, only merges back on the
	// original attributes, not the events
	if ( dest.mergeAttributes ) {
		dest.mergeAttributes( src );
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 fail to clone children inside object elements that use
	// the proprietary classid attribute value (rather than the type
	// attribute) to identify the type of content to display
	if ( nodeName === "object" ) {
		dest.outerHTML = src.outerHTML;

	} else if ( nodeName === "input" && (src.type === "checkbox" || src.type === "radio") ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set
		if ( src.checked ) {
			dest.defaultChecked = dest.checked = src.checked;
		}

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}

	// Event data gets referenced instead of copied if the expando
	// gets copied too
	dest.removeAttribute( jQuery.expando );
}

jQuery.buildFragment = function( args, nodes, scripts ) {
	var fragment, cacheable, cacheresults, doc,
	first = args[ 0 ];

	// nodes may contain either an explicit document object,
	// a jQuery collection or context object.
	// If nodes[0] contains a valid object to assign to doc
	if ( nodes && nodes[0] ) {
		doc = nodes[0].ownerDocument || nodes[0];
	}

  // Ensure that an attr object doesn't incorrectly stand in as a document object
	// Chrome and Firefox seem to allow this to occur and will throw exception
	// Fixes #8950
	if ( !doc.createDocumentFragment ) {
		doc = document;
	}

	// Only cache "small" (1/2 KB) HTML strings that are associated with the main document
	// Cloning options loses the selected state, so don't cache them
	// IE 6 doesn't like it when you put <object> or <embed> elements in a fragment
	// Also, WebKit does not clone 'checked' attributes on cloneNode, so don't cache
	// Lastly, IE6,7,8 will not correctly reuse cached fragments that were created from unknown elems #10501
	if ( args.length === 1 && typeof first === "string" && first.length < 512 && doc === document &&
		first.charAt(0) === "<" && !rnocache.test( first ) &&
		(jQuery.support.checkClone || !rchecked.test( first )) &&
		(!jQuery.support.unknownElems && rnoshimcache.test( first )) ) {

		cacheable = true;

		cacheresults = jQuery.fragments[ first ];
		if ( cacheresults && cacheresults !== 1 ) {
			fragment = cacheresults;
		}
	}

	if ( !fragment ) {
		fragment = doc.createDocumentFragment();
		jQuery.clean( args, doc, fragment, scripts );
	}

	if ( cacheable ) {
		jQuery.fragments[ first ] = cacheresults ? fragment : 1;
	}

	return { fragment: fragment, cacheable: cacheable };
};

jQuery.fragments = {};

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var ret = [],
			insert = jQuery( selector ),
			parent = this.length === 1 && this[0].parentNode;

		if ( parent && parent.nodeType === 11 && parent.childNodes.length === 1 && insert.length === 1 ) {
			insert[ original ]( this[0] );
			return this;

		} else {
			for ( var i = 0, l = insert.length; i < l; i++ ) {
				var elems = ( i > 0 ? this.clone(true) : this ).get();
				jQuery( insert[i] )[ original ]( elems );
				ret = ret.concat( elems );
			}

			return this.pushStack( ret, name, insert.selector );
		}
	};
});

function getAll( elem ) {
	if ( typeof elem.getElementsByTagName !== "undefined" ) {
		return elem.getElementsByTagName( "*" );

	} else if ( typeof elem.querySelectorAll !== "undefined" ) {
		return elem.querySelectorAll( "*" );

	} else {
		return [];
	}
}

// Used in clean, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( elem.type === "checkbox" || elem.type === "radio" ) {
		elem.defaultChecked = elem.checked;
	}
}
// Finds all inputs and passes them to fixDefaultChecked
function findInputs( elem ) {
	var nodeName = ( elem.nodeName || "" ).toLowerCase();
	if ( nodeName === "input" ) {
		fixDefaultChecked( elem );
	// Skip scripts, get other children
	} else if ( nodeName !== "script" && typeof elem.getElementsByTagName !== "undefined" ) {
		jQuery.grep( elem.getElementsByTagName("input"), fixDefaultChecked );
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var clone = elem.cloneNode(true),
				srcElements,
				destElements,
				i;

		if ( (!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {
			// IE copies events bound via attachEvent when using cloneNode.
			// Calling detachEvent on the clone will also remove the events
			// from the original. In order to get around this, we use some
			// proprietary methods to clear the events. Thanks to MooTools
			// guys for this hotness.

			cloneFixAttributes( elem, clone );

			// Using Sizzle here is crazy slow, so we use getElementsByTagName
			// instead
			srcElements = getAll( elem );
			destElements = getAll( clone );

			// Weird iteration because IE will replace the length property
			// with an element if you are cloning the body and one of the
			// elements on the page has a name or id of "length"
			for ( i = 0; srcElements[i]; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					cloneFixAttributes( srcElements[i], destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			cloneCopyEvent( elem, clone );

			if ( deepDataAndEvents ) {
				srcElements = getAll( elem );
				destElements = getAll( clone );

				for ( i = 0; srcElements[i]; ++i ) {
					cloneCopyEvent( srcElements[i], destElements[i] );
				}
			}
		}

		srcElements = destElements = null;

		// Return the cloned set
		return clone;
	},

	clean: function( elems, context, fragment, scripts ) {
		var checkScriptType;

		context = context || document;

		// !context.createElement fails in IE with an error but returns typeof 'object'
		if ( typeof context.createElement === "undefined" ) {
			context = context.ownerDocument || context[0] && context[0].ownerDocument || document;
		}

		var ret = [], j;

		for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
			if ( typeof elem === "number" ) {
				elem += "";
			}

			if ( !elem ) {
				continue;
			}

			// Convert html string into DOM nodes
			if ( typeof elem === "string" ) {
				if ( !rhtml.test( elem ) ) {
					elem = context.createTextNode( elem );
				} else {
					// Fix "XHTML"-style tags in all browsers
					elem = elem.replace(rxhtmlTag, "<$1></$2>");

					// Trim whitespace, otherwise indexOf won't work as expected
					var tag = ( rtagName.exec( elem ) || ["", ""] )[1].toLowerCase(),
						wrap = wrapMap[ tag ] || wrapMap._default,
						depth = wrap[0],
						div = context.createElement("div");

					// Append wrapper element to unknown element safe doc fragment
					if ( context === document ) {
						// Use the fragment we've already created for this document
						safeFragment.appendChild( div );
					} else {
						// Use a fragment created with the owner document
						createSafeFragment( context ).appendChild( div );
					}

					// Go to html and back, then peel off extra wrappers
					div.innerHTML = wrap[1] + elem + wrap[2];

					// Move to the right depth
					while ( depth-- ) {
						div = div.lastChild;
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !jQuery.support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						var hasBody = rtbody.test(elem),
							tbody = tag === "table" && !hasBody ?
								div.firstChild && div.firstChild.childNodes :

								// String was a bare <thead> or <tfoot>
								wrap[1] === "<table>" && !hasBody ?
									div.childNodes :
									[];

						for ( j = tbody.length - 1; j >= 0 ; --j ) {
							if ( jQuery.nodeName( tbody[ j ], "tbody" ) && !tbody[ j ].childNodes.length ) {
								tbody[ j ].parentNode.removeChild( tbody[ j ] );
							}
						}
					}

					// IE completely kills leading whitespace when innerHTML is used
					if ( !jQuery.support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						div.insertBefore( context.createTextNode( rleadingWhitespace.exec(elem)[0] ), div.firstChild );
					}

					elem = div.childNodes;
				}
			}

			// Resets defaultChecked for any radios and checkboxes
			// about to be appended to the DOM in IE 6/7 (#8060)
			var len;
			if ( !jQuery.support.appendChecked ) {
				if ( elem[0] && typeof (len = elem.length) === "number" ) {
					for ( j = 0; j < len; j++ ) {
						findInputs( elem[j] );
					}
				} else {
					findInputs( elem );
				}
			}

			if ( elem.nodeType ) {
				ret.push( elem );
			} else {
				ret = jQuery.merge( ret, elem );
			}
		}

		if ( fragment ) {
			checkScriptType = function( elem ) {
				return !elem.type || rscriptType.test( elem.type );
			};
			for ( i = 0; ret[i]; i++ ) {
				if ( scripts && jQuery.nodeName( ret[i], "script" ) && (!ret[i].type || ret[i].type.toLowerCase() === "text/javascript") ) {
					scripts.push( ret[i].parentNode ? ret[i].parentNode.removeChild( ret[i] ) : ret[i] );

				} else {
					if ( ret[i].nodeType === 1 ) {
						var jsTags = jQuery.grep( ret[i].getElementsByTagName( "script" ), checkScriptType );

						ret.splice.apply( ret, [i + 1, 0].concat( jsTags ) );
					}
					fragment.appendChild( ret[i] );
				}
			}
		}

		return ret;
	},

	cleanData: function( elems ) {
		var data, id,
			cache = jQuery.cache,
			special = jQuery.event.special,
			deleteExpando = jQuery.support.deleteExpando;

		for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
			if ( elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()] ) {
				continue;
			}

			id = elem[ jQuery.expando ];

			if ( id ) {
				data = cache[ id ];

				if ( data && data.events ) {
					for ( var type in data.events ) {
						if ( special[ type ] ) {
							jQuery.event.remove( elem, type );

						// This is a shortcut to avoid jQuery.event.remove's overhead
						} else {
							jQuery.removeEvent( elem, type, data.handle );
						}
					}

					// Null the DOM reference to avoid IE6/7/8 leak (#7054)
					if ( data.handle ) {
						data.handle.elem = null;
					}
				}

				if ( deleteExpando ) {
					delete elem[ jQuery.expando ];

				} else if ( elem.removeAttribute ) {
					elem.removeAttribute( jQuery.expando );
				}

				delete cache[ id ];
			}
		}
	}
});

function evalScript( i, elem ) {
	if ( elem.src ) {
		jQuery.ajax({
			url: elem.src,
			async: false,
			dataType: "script"
		});
	} else {
		jQuery.globalEval( ( elem.text || elem.textContent || elem.innerHTML || "" ).replace( rcleanScript, "/*$0*/" ) );
	}

	if ( elem.parentNode ) {
		elem.parentNode.removeChild( elem );
	}
}




var ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity=([^)]*)/,
	// fixed for IE9, see #8346
	rupper = /([A-Z]|^ms)/g,
	rnumpx = /^-?\d+(?:px)?$/i,
	rnum = /^-?\d/,
	rrelNum = /^([\-+])=([\-+.\de]+)/,

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssWidth = [ "Left", "Right" ],
	cssHeight = [ "Top", "Bottom" ],
	curCSS,

	getComputedStyle,
	currentStyle;

jQuery.fn.css = function( name, value ) {
	// Setting 'undefined' is a no-op
	if ( arguments.length === 2 && value === undefined ) {
		return this;
	}

	return jQuery.access( this, name, value, true, function( elem, name, value ) {
		return value !== undefined ?
			jQuery.style( elem, name, value ) :
			jQuery.css( elem, name );
	});
};

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity", "opacity" );
					return ret === "" ? "1" : ret;

				} else {
					return elem.style.opacity;
				}
			}
		}
	},

	// Exclude the following css properties to add px
	cssNumber: {
		"fillOpacity": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, origName = jQuery.camelCase( name ),
			style = elem.style, hooks = jQuery.cssHooks[ origName ];

		name = jQuery.cssProps[ origName ] || origName;

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( +( ret[1] + 1) * +ret[2] ) + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that NaN and null values aren't set. See: #7116
			if ( value == null || type === "number" && isNaN( value ) ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value )) !== undefined ) {
				// Wrapped to prevent IE from throwing errors when 'invalid' values are provided
				// Fixes bug #5509
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra ) {
		var ret, hooks;

		// Make sure that we're working with the right name
		name = jQuery.camelCase( name );
		hooks = jQuery.cssHooks[ name ];
		name = jQuery.cssProps[ name ] || name;

		// cssFloat needs a special treatment
		if ( name === "cssFloat" ) {
			name = "float";
		}

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks && (ret = hooks.get( elem, true, extra )) !== undefined ) {
			return ret;

		// Otherwise, if a way to get the computed value exists, use that
		} else if ( curCSS ) {
			return curCSS( elem, name );
		}
	},

	// A method for quickly swapping in/out CSS properties to get correct calculations
	swap: function( elem, options, callback ) {
		var old = {};

		// Remember the old values, and insert the new ones
		for ( var name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		callback.call( elem );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}
	}
});

// DEPRECATED, Use jQuery.css() instead
jQuery.curCSS = jQuery.css;

jQuery.each(["height", "width"], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			var val;

			if ( computed ) {
				if ( elem.offsetWidth !== 0 ) {
					return getWH( elem, name, extra );
				} else {
					jQuery.swap( elem, cssShow, function() {
						val = getWH( elem, name, extra );
					});
				}

				return val;
			}
		},

		set: function( elem, value ) {
			if ( rnumpx.test( value ) ) {
				// ignore negative width and height values #1599
				value = parseFloat( value );

				if ( value >= 0 ) {
					return value + "px";
				}

			} else {
				return value;
			}
		}
	};
});

if ( !jQuery.support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( parseFloat( RegExp.$1 ) / 100 ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			if ( value >= 1 && jQuery.trim( filter.replace( ralpha, "" ) ) === "" ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there there is no filter style applied in a css rule, we are done
				if ( currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery(function() {
	// This hook cannot be added until DOM ready because the support test
	// for it is not run until after DOM ready
	if ( !jQuery.support.reliableMarginRight ) {
		jQuery.cssHooks.marginRight = {
			get: function( elem, computed ) {
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// Work around by temporarily setting element display to inline-block
				var ret;
				jQuery.swap( elem, { "display": "inline-block" }, function() {
					if ( computed ) {
						ret = curCSS( elem, "margin-right", "marginRight" );
					} else {
						ret = elem.style.marginRight;
					}
				});
				return ret;
			}
		};
	}
});

if ( document.defaultView && document.defaultView.getComputedStyle ) {
	getComputedStyle = function( elem, name ) {
		var ret, defaultView, computedStyle;

		name = name.replace( rupper, "-$1" ).toLowerCase();

		if ( !(defaultView = elem.ownerDocument.defaultView) ) {
			return undefined;
		}

		if ( (computedStyle = defaultView.getComputedStyle( elem, null )) ) {
			ret = computedStyle.getPropertyValue( name );
			if ( ret === "" && !jQuery.contains( elem.ownerDocument.documentElement, elem ) ) {
				ret = jQuery.style( elem, name );
			}
		}

		return ret;
	};
}

if ( document.documentElement.currentStyle ) {
	currentStyle = function( elem, name ) {
		var left, rsLeft, uncomputed,
			ret = elem.currentStyle && elem.currentStyle[ name ],
			style = elem.style;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret === null && style && (uncomputed = style[ name ]) ) {
			ret = uncomputed;
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		if ( !rnumpx.test( ret ) && rnum.test( ret ) ) {

			// Remember the original values
			left = style.left;
			rsLeft = elem.runtimeStyle && elem.runtimeStyle.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				elem.runtimeStyle.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ( ret || 0 );
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				elem.runtimeStyle.left = rsLeft;
			}
		}

		return ret === "" ? "auto" : ret;
	};
}

curCSS = getComputedStyle || currentStyle;

function getWH( elem, name, extra ) {

	// Start with offset property
	var val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		which = name === "width" ? cssWidth : cssHeight;

	if ( val > 0 ) {
		if ( extra !== "border" ) {
			jQuery.each( which, function() {
				if ( !extra ) {
					val -= parseFloat( jQuery.css( elem, "padding" + this ) ) || 0;
				}
				if ( extra === "margin" ) {
					val += parseFloat( jQuery.css( elem, extra + this ) ) || 0;
				} else {
					val -= parseFloat( jQuery.css( elem, "border" + this + "Width" ) ) || 0;
				}
			});
		}

		return val + "px";
	}

	// Fall back to computed then uncomputed css if necessary
	val = curCSS( elem, name, name );
	if ( val < 0 || val == null ) {
		val = elem.style[ name ] || 0;
	}
	// Normalize "", auto, and prepare for extra
	val = parseFloat( val ) || 0;

	// Add padding, border, margin
	if ( extra ) {
		jQuery.each( which, function() {
			val += parseFloat( jQuery.css( elem, "padding" + this ) ) || 0;
			if ( extra !== "padding" ) {
				val += parseFloat( jQuery.css( elem, "border" + this + "Width" ) ) || 0;
			}
			if ( extra === "margin" ) {
				val += parseFloat( jQuery.css( elem, extra + this ) ) || 0;
			}
		});
	}

	return val + "px";
}

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.hidden = function( elem ) {
		var width = elem.offsetWidth,
			height = elem.offsetHeight;

		return ( width === 0 && height === 0 ) || (!jQuery.support.reliableHiddenOffsets && ((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
	};

	jQuery.expr.filters.visible = function( elem ) {
		return !jQuery.expr.filters.hidden( elem );
	};
}




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rhash = /#.*$/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	rinput = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rquery = /\?/,
	rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
	rselectTextarea = /^(?:select|textarea)/i,
	rspacesAjax = /\s+/,
	rts = /([?&])_=[^&]*/,
	rurl = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,

	// Keep a copy of the old load method
	_load = jQuery.fn.load,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Document location
	ajaxLocation,

	// Document location segments
	ajaxLocParts,

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = ["*/"] + ["*"];

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		if ( jQuery.isFunction( func ) ) {
			var dataTypes = dataTypeExpression.toLowerCase().split( rspacesAjax ),
				i = 0,
				length = dataTypes.length,
				dataType,
				list,
				placeBefore;

			// For each dataType in the dataTypeExpression
			for ( ; i < length; i++ ) {
				dataType = dataTypes[ i ];
				// We control if we're asked to add before
				// any existing element
				placeBefore = /^\+/.test( dataType );
				if ( placeBefore ) {
					dataType = dataType.substr( 1 ) || "*";
				}
				list = structure[ dataType ] = structure[ dataType ] || [];
				// then we add to the structure accordingly
				list[ placeBefore ? "unshift" : "push" ]( func );
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR,
		dataType /* internal */, inspected /* internal */ ) {

	dataType = dataType || options.dataTypes[ 0 ];
	inspected = inspected || {};

	inspected[ dataType ] = true;

	var list = structure[ dataType ],
		i = 0,
		length = list ? list.length : 0,
		executeOnly = ( structure === prefilters ),
		selection;

	for ( ; i < length && ( executeOnly || !selection ); i++ ) {
		selection = list[ i ]( options, originalOptions, jqXHR );
		// If we got redirected to another dataType
		// we try there if executing only and not done already
		if ( typeof selection === "string" ) {
			if ( !executeOnly || inspected[ selection ] ) {
				selection = undefined;
			} else {
				options.dataTypes.unshift( selection );
				selection = inspectPrefiltersOrTransports(
						structure, options, originalOptions, jqXHR, selection, inspected );
			}
		}
	}
	// If we're only executing or nothing was selected
	// we try the catchall dataType if not done already
	if ( ( executeOnly || !selection ) && !inspected[ "*" ] ) {
		selection = inspectPrefiltersOrTransports(
				structure, options, originalOptions, jqXHR, "*", inspected );
	}
	// unnecessary when only executing (prefilters)
	// but it'll be ignored by the caller in that case
	return selection;
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};
	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}
}

jQuery.fn.extend({
	load: function( url, params, callback ) {
		if ( typeof url !== "string" && _load ) {
			return _load.apply( this, arguments );

		// Don't do a request if no elements are being requested
		} else if ( !this.length ) {
			return this;
		}

		var off = url.indexOf( " " );
		if ( off >= 0 ) {
			var selector = url.slice( off, url.length );
			url = url.slice( 0, off );
		}

		// Default to a GET request
		var type = "GET";

		// If the second parameter was provided
		if ( params ) {
			// If it's a function
			if ( jQuery.isFunction( params ) ) {
				// We assume that it's the callback
				callback = params;
				params = undefined;

			// Otherwise, build a param string
			} else if ( typeof params === "object" ) {
				params = jQuery.param( params, jQuery.ajaxSettings.traditional );
				type = "POST";
			}
		}

		var self = this;

		// Request the remote document
		jQuery.ajax({
			url: url,
			type: type,
			dataType: "html",
			data: params,
			// Complete callback (responseText is used internally)
			complete: function( jqXHR, status, responseText ) {
				// Store the response as specified by the jqXHR object
				responseText = jqXHR.responseText;
				// If successful, inject the HTML into all the matched elements
				if ( jqXHR.isResolved() ) {
					// #4825: Get the actual response in case
					// a dataFilter is present in ajaxSettings
					jqXHR.done(function( r ) {
						responseText = r;
					});
					// See if a selector was specified
					self.html( selector ?
						// Create a dummy div to hold the results
						jQuery("<div>")
							// inject the contents of the document in, removing the scripts
							// to avoid any 'Permission Denied' errors in IE
							.append(responseText.replace(rscript, ""))

							// Locate the specified elements
							.find(selector) :

						// If not, just inject the full result
						responseText );
				}

				if ( callback ) {
					self.each( callback, [ responseText, status, jqXHR ] );
				}
			}
		});

		return this;
	},

	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},

	serializeArray: function() {
		return this.map(function(){
			return this.elements ? jQuery.makeArray( this.elements ) : this;
		})
		.filter(function(){
			return this.name && !this.disabled &&
				( this.checked || rselectTextarea.test( this.nodeName ) ||
					rinput.test( this.type ) );
		})
		.map(function( i, elem ){
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val, i ){
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( "ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split( " " ), function( i, o ){
	jQuery.fn[ o ] = function( f ){
		return this.bind( o, f );
	};
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			type: method,
			url: url,
			data: data,
			success: callback,
			dataType: type
		});
	};
});

jQuery.extend({

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		if ( settings ) {
			// Building a settings object
			ajaxExtend( target, jQuery.ajaxSettings );
		} else {
			// Extending ajaxSettings
			settings = target;
			target = jQuery.ajaxSettings;
		}
		ajaxExtend( target, settings );
		return target;
	},

	ajaxSettings: {
		url: ajaxLocation,
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		type: "GET",
		contentType: "application/x-www-form-urlencoded",
		processData: true,
		async: true,
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		traditional: false,
		headers: {},
		*/

		accepts: {
			xml: "application/xml, text/xml",
			html: "text/html",
			text: "text/plain",
			json: "application/json, text/javascript",
			"*": allTypes
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText"
		},

		// List of data converters
		// 1) key format is "source_type destination_type" (a single space in-between)
		// 2) the catchall symbol "*" can be used for source_type
		converters: {

			// Convert anything to text
			"* text": window.String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			context: true,
			url: true
		}
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events
			// It's the callbackContext if one was provided in the options
			// and if it's a DOM node or a jQuery collection
			globalEventContext = callbackContext !== s &&
				( callbackContext.nodeType || callbackContext instanceof jQuery ) ?
						jQuery( callbackContext ) : jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// ifModified key
			ifModifiedKey,
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// Response headers
			responseHeadersString,
			responseHeaders,
			// transport
			transport,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// The jqXHR state
			state = 0,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Fake xhr
			jqXHR = {

				readyState: 0,

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( !state ) {
						var lname = name.toLowerCase();
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match === undefined ? null : match;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					statusText = statusText || "abort";
					if ( transport ) {
						transport.abort( statusText );
					}
					done( 0, statusText );
					return this;
				}
			};

		// Callback for when everything is done
		// It is defined here because jslint complains if it is declared
		// at the end of the function (which would be more logical and readable)
		function done( status, nativeStatusText, responses, headers ) {

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			var isSuccess,
				success,
				error,
				statusText = nativeStatusText,
				response = responses ? ajaxHandleResponses( s, jqXHR, responses ) : undefined,
				lastModified,
				etag;

			// If successful, handle type chaining
			if ( status >= 200 && status < 300 || status === 304 ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {

					if ( ( lastModified = jqXHR.getResponseHeader( "Last-Modified" ) ) ) {
						jQuery.lastModified[ ifModifiedKey ] = lastModified;
					}
					if ( ( etag = jqXHR.getResponseHeader( "Etag" ) ) ) {
						jQuery.etag[ ifModifiedKey ] = etag;
					}
				}

				// If not modified
				if ( status === 304 ) {

					statusText = "notmodified";
					isSuccess = true;

				// If we have data
				} else {

					try {
						success = ajaxConvert( s, response );
						statusText = "success";
						isSuccess = true;
					} catch(e) {
						// We have a parsererror
						statusText = "parsererror";
						error = e;
					}
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( !statusText || status ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = "" + ( nativeStatusText || statusText );

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajax" + ( isSuccess ? "Success" : "Error" ),
						[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		// Attach deferreds
		deferred.promise( jqXHR );
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;
		jqXHR.complete = completeDeferred.add;

		// Status-dependent callbacks
		jqXHR.statusCode = function( map ) {
			if ( map ) {
				var tmp;
				if ( state < 2 ) {
					for ( tmp in map ) {
						statusCode[ tmp ] = [ statusCode[tmp], map[tmp] ];
					}
				} else {
					tmp = map[ jqXHR.status ];
					jqXHR.then( tmp, tmp );
				}
			}
			return this;
		};

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// We also use the url parameter if available
		s.url = ( ( url || s.url ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().split( rspacesAjax );

		// Determine if a cross-domain request is in order
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] != ajaxLocParts[ 1 ] || parts[ 2 ] != ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? 80 : 443 ) ) !=
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? 80 : 443 ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefiler, stop there
		if ( state === 2 ) {
			return false;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.data;
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Get ifModifiedKey before adding the anti-cache parameter
			ifModifiedKey = s.url;

			// Add anti-cache in url if needed
			if ( s.cache === false ) {

				var ts = jQuery.now(),
					// try replacing _= if it is there
					ret = s.url.replace( rts, "$1_=" + ts );

				// if nothing was replaced, add timestamp to the end
				s.url = ret + ( ( ret === s.url ) ? ( rquery.test( s.url ) ? "&" : "?" ) + "_=" + ts : "" );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			ifModifiedKey = ifModifiedKey || s.url;
			if ( jQuery.lastModified[ ifModifiedKey ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ ifModifiedKey ] );
			}
			if ( jQuery.etag[ ifModifiedKey ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ ifModifiedKey ] );
			}
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
				// Abort if not done already
				jqXHR.abort();
				return false;

		}

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;
			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout( function(){
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch (e) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					jQuery.error( e );
				}
			}
		}

		return jqXHR;
	},

	// Serialize an array of form elements or a set of
	// key/values into a query string
	param: function( a, traditional ) {
		var s = [],
			add = function( key, value ) {
				// If value is a function, invoke it and return its value
				value = jQuery.isFunction( value ) ? value() : value;
				s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
			};

		// Set traditional to true for jQuery <= 1.3.2 behavior.
		if ( traditional === undefined ) {
			traditional = jQuery.ajaxSettings.traditional;
		}

		// If an array was passed in, assume that it is an array of form elements.
		if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
			// Serialize the form elements
			jQuery.each( a, function() {
				add( this.name, this.value );
			});

		} else {
			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for ( var prefix in a ) {
				buildParams( prefix, a[ prefix ], traditional, add );
			}
		}

		// Return the resulting serialization
		return s.join( "&" ).replace( r20, "+" );
	}
});

function buildParams( prefix, obj, traditional, add ) {
	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// If array item is non-scalar (array or object), encode its
				// numeric index to resolve deserialization ambiguity issues.
				// Note that rack (as of 1.0.0) can't currently deserialize
				// nested arrays properly, and attempting to do so may cause
				// a server error. Possible fixes are to modify rack's
				// deserialization algorithm or to provide an option or flag
				// to force array serialization to be shallow.
				buildParams( prefix + "[" + ( typeof v === "object" || jQuery.isArray(v) ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && obj != null && typeof obj === "object" ) {
		// Serialize object item.
		for ( var name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// This is still on the jQuery object... for now
// Want to move this to jQuery.ajax some day
jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {}

});

/* Handles responses to an ajax request:
 * - sets all responseXXX fields accordingly
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var contents = s.contents,
		dataTypes = s.dataTypes,
		responseFields = s.responseFields,
		ct,
		type,
		finalDataType,
		firstDataType;

	// Fill responseXXX fields
	for ( type in responseFields ) {
		if ( type in responses ) {
			jqXHR[ responseFields[type] ] = responses[ type ];
		}
	}

	// Remove auto dataType and get content-type in the process
	while( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "content-type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

// Chain conversions given the request and the original response
function ajaxConvert( s, response ) {

	// Apply the dataFilter if provided
	if ( s.dataFilter ) {
		response = s.dataFilter( response, s.dataType );
	}

	var dataTypes = s.dataTypes,
		converters = {},
		i,
		key,
		length = dataTypes.length,
		tmp,
		// Current and previous dataTypes
		current = dataTypes[ 0 ],
		prev,
		// Conversion expression
		conversion,
		// Conversion function
		conv,
		// Conversion functions (transitive conversion)
		conv1,
		conv2;

	// For each dataType in the chain
	for ( i = 1; i < length; i++ ) {

		// Create converters map
		// with lowercased keys
		if ( i === 1 ) {
			for ( key in s.converters ) {
				if ( typeof key === "string" ) {
					converters[ key.toLowerCase() ] = s.converters[ key ];
				}
			}
		}

		// Get the dataTypes
		prev = current;
		current = dataTypes[ i ];

		// If current is auto dataType, update it to prev
		if ( current === "*" ) {
			current = prev;
		// If no auto and dataTypes are actually different
		} else if ( prev !== "*" && prev !== current ) {

			// Get the converter
			conversion = prev + " " + current;
			conv = converters[ conversion ] || converters[ "* " + current ];

			// If there is no direct converter, search transitively
			if ( !conv ) {
				conv2 = undefined;
				for ( conv1 in converters ) {
					tmp = conv1.split( " " );
					if ( tmp[ 0 ] === prev || tmp[ 0 ] === "*" ) {
						conv2 = converters[ tmp[1] + " " + current ];
						if ( conv2 ) {
							conv1 = converters[ conv1 ];
							if ( conv1 === true ) {
								conv = conv2;
							} else if ( conv2 === true ) {
								conv = conv1;
							}
							break;
						}
					}
				}
			}
			// If we found no converter, dispatch an error
			if ( !( conv || conv2 ) ) {
				jQuery.error( "No conversion from " + conversion.replace(" "," to ") );
			}
			// If found converter is not an equivalence
			if ( conv !== true ) {
				// Convert with 1 or 2 converters accordingly
				response = conv ? conv( response ) : conv2( conv1(response) );
			}
		}
	}
	return response;
}




var jsc = jQuery.now(),
	jsre = /(\=)\?(&|$)|\?\?/i;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		return jQuery.expando + "_" + ( jsc++ );
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var inspectData = s.contentType === "application/x-www-form-urlencoded" &&
		( typeof s.data === "string" );

	if ( s.dataTypes[ 0 ] === "jsonp" ||
		s.jsonp !== false && ( jsre.test( s.url ) ||
				inspectData && jsre.test( s.data ) ) ) {

		var responseContainer,
			jsonpCallback = s.jsonpCallback =
				jQuery.isFunction( s.jsonpCallback ) ? s.jsonpCallback() : s.jsonpCallback,
			previous = window[ jsonpCallback ],
			url = s.url,
			data = s.data,
			replace = "$1" + jsonpCallback + "$2";

		if ( s.jsonp !== false ) {
			url = url.replace( jsre, replace );
			if ( s.url === url ) {
				if ( inspectData ) {
					data = data.replace( jsre, replace );
				}
				if ( s.data === data ) {
					// Add callback manually
					url += (/\?/.test( url ) ? "&" : "?") + s.jsonp + "=" + jsonpCallback;
				}
			}
		}

		s.url = url;
		s.data = data;

		// Install callback
		window[ jsonpCallback ] = function( response ) {
			responseContainer = [ response ];
		};

		// Clean-up function
		jqXHR.always(function() {
			// Set callback back to previous value
			window[ jsonpCallback ] = previous;
			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( previous ) ) {
				window[ jsonpCallback ]( responseContainer[ 0 ] );
			}
		});

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( jsonpCallback + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Delegate to script
		return "script";
	}
});




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /javascript|ecmascript/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || document.getElementsByTagName( "head" )[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = "async";

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( head && script.parentNode ) {
							head.removeChild( script );
						}

						// Dereference the script
						script = undefined;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};
				// Use insertBefore instead of appendChild  to circumvent an IE6 bug.
				// This arises when a base node is used (#2709 and #4378).
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( 0, 1 );
				}
			}
		};
	}
});




var // #5280: Internet Explorer will keep connections alive if we don't abort on unload
	xhrOnUnloadAbort = window.ActiveXObject ? function() {
		// Abort all pending requests
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( 0, 1 );
		}
	} : false,
	xhrId = 0,
	xhrCallbacks;

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}

// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject ?
	/* Microsoft failed to properly
	 * implement the XMLHttpRequest in IE7 (can't request local files),
	 * so we use the ActiveXObject when it is available
	 * Additionally XMLHttpRequest can be disabled in IE7/IE8 so
	 * we need a fallback.
	 */
	function() {
		return !this.isLocal && createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

// Determine support properties
(function( xhr ) {
	jQuery.extend( jQuery.support, {
		ajax: !!xhr,
		cors: !!xhr && ( "withCredentials" in xhr )
	});
})( jQuery.ajaxSettings.xhr() );

// Create transport if the browser can provide an xhr
if ( jQuery.support.ajax ) {

	jQuery.ajaxTransport(function( s ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !s.crossDomain || jQuery.support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {

					// Get a new xhr
					var xhr = s.xhr(),
						handle,
						i;

					// Open the socket
					// Passing null username, generates a login popup on Opera (#2865)
					if ( s.username ) {
						xhr.open( s.type, s.url, s.async, s.username, s.password );
					} else {
						xhr.open( s.type, s.url, s.async );
					}

					// Apply custom fields if provided
					if ( s.xhrFields ) {
						for ( i in s.xhrFields ) {
							xhr[ i ] = s.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( s.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( s.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !s.crossDomain && !headers["X-Requested-With"] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Need an extra try/catch for cross domain requests in Firefox 3
					try {
						for ( i in headers ) {
							xhr.setRequestHeader( i, headers[ i ] );
						}
					} catch( _ ) {}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( s.hasContent && s.data ) || null );

					// Listener
					callback = function( _, isAbort ) {

						var status,
							statusText,
							responseHeaders,
							responses,
							xml;

						// Firefox throws exceptions when accessing properties
						// of an xhr when a network error occured
						// http://helpful.knobs-dials.com/index.php/Component_returned_failure_code:_0x80040111_(NS_ERROR_NOT_AVAILABLE)
						try {

							// Was never called and is aborted or complete
							if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

								// Only called once
								callback = undefined;

								// Do not keep as active anymore
								if ( handle ) {
									xhr.onreadystatechange = jQuery.noop;
									if ( xhrOnUnloadAbort ) {
										delete xhrCallbacks[ handle ];
									}
								}

								// If it's an abort
								if ( isAbort ) {
									// Abort it manually if needed
									if ( xhr.readyState !== 4 ) {
										xhr.abort();
									}
								} else {
									status = xhr.status;
									responseHeaders = xhr.getAllResponseHeaders();
									responses = {};
									xml = xhr.responseXML;

									// Construct response list
									if ( xml && xml.documentElement /* #4958 */ ) {
										responses.xml = xml;
									}
									responses.text = xhr.responseText;

									// Firefox throws an exception when accessing
									// statusText for faulty cross-domain requests
									try {
										statusText = xhr.statusText;
									} catch( e ) {
										// We normalize with Webkit giving an empty statusText
										statusText = "";
									}

									// Filter status for non standard behaviors

									// If the request is local and we have data: assume a success
									// (success with no data won't get notified, that's the best we
									// can do given current implementations)
									if ( !status && s.isLocal && !s.crossDomain ) {
										status = responses.text ? 200 : 404;
									// IE - #1450: sometimes returns 1223 when it should be 204
									} else if ( status === 1223 ) {
										status = 204;
									}
								}
							}
						} catch( firefoxAccessException ) {
							if ( !isAbort ) {
								complete( -1, firefoxAccessException );
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, responseHeaders );
						}
					};

					// if we're in sync mode or it's in cache
					// and has been retrieved directly (IE6 & IE7)
					// we need to manually fire the callback
					if ( !s.async || xhr.readyState === 4 ) {
						callback();
					} else {
						handle = ++xhrId;
						if ( xhrOnUnloadAbort ) {
							// Create the active xhrs callbacks list if needed
							// and attach the unload handler
							if ( !xhrCallbacks ) {
								xhrCallbacks = {};
								jQuery( window ).unload( xhrOnUnloadAbort );
							}
							// Add to list of active xhrs callbacks
							xhrCallbacks[ handle ] = callback;
						}
						xhr.onreadystatechange = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback(0,1);
					}
				}
			};
		}
	});
}




var elemdisplay = {},
	iframe, iframeDoc,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,
	timerId,
	fxAttrs = [
		// height animations
		[ "height", "marginTop", "marginBottom", "paddingTop", "paddingBottom" ],
		// width animations
		[ "width", "marginLeft", "marginRight", "paddingLeft", "paddingRight" ],
		// opacity animations
		[ "opacity" ]
	],
	fxNow;

jQuery.fn.extend({
	show: function( speed, easing, callback ) {
		var elem, display;

		if ( speed || speed === 0 ) {
			return this.animate( genFx("show", 3), speed, easing, callback );

		} else {
			for ( var i = 0, j = this.length; i < j; i++ ) {
				elem = this[ i ];

				if ( elem.style ) {
					display = elem.style.display;

					// Reset the inline display of this element to learn if it is
					// being hidden by cascaded rules or not
					if ( !jQuery._data(elem, "olddisplay") && display === "none" ) {
						display = elem.style.display = "";
					}

					// Set elements which have been overridden with display: none
					// in a stylesheet to whatever the default browser style is
					// for such an element
					if ( display === "" && jQuery.css(elem, "display") === "none" ) {
						jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
					}
				}
			}

			// Set the display of most of the elements in a second loop
			// to avoid the constant reflow
			for ( i = 0; i < j; i++ ) {
				elem = this[ i ];

				if ( elem.style ) {
					display = elem.style.display;

					if ( display === "" || display === "none" ) {
						elem.style.display = jQuery._data( elem, "olddisplay" ) || "";
					}
				}
			}

			return this;
		}
	},

	hide: function( speed, easing, callback ) {
		if ( speed || speed === 0 ) {
			return this.animate( genFx("hide", 3), speed, easing, callback);

		} else {
			var elem, display,
				i = 0,
				j = this.length;

			for ( ; i < j; i++ ) {
				elem = this[i];
				if ( elem.style ) {
					display = jQuery.css( elem, "display" );

					if ( display !== "none" && !jQuery._data( elem, "olddisplay" ) ) {
						jQuery._data( elem, "olddisplay", display );
					}
				}
			}

			// Set the display of the elements in a second loop
			// to avoid the constant reflow
			for ( i = 0; i < j; i++ ) {
				if ( this[i].style ) {
					this[i].style.display = "none";
				}
			}

			return this;
		}
	},

	// Save the old toggle function
	_toggle: jQuery.fn.toggle,

	toggle: function( fn, fn2, callback ) {
		var bool = typeof fn === "boolean";

		if ( jQuery.isFunction(fn) && jQuery.isFunction(fn2) ) {
			this._toggle.apply( this, arguments );

		} else if ( fn == null || bool ) {
			this.each(function() {
				var state = bool ? fn : jQuery(this).is(":hidden");
				jQuery(this)[ state ? "show" : "hide" ]();
			});

		} else {
			this.animate(genFx("toggle", 3), fn, fn2, callback);
		}

		return this;
	},

	fadeTo: function( speed, to, easing, callback ) {
		return this.filter(":hidden").css("opacity", 0).show().end()
					.animate({opacity: to}, speed, easing, callback);
	},

	animate: function( prop, speed, easing, callback ) {
		var optall = jQuery.speed( speed, easing, callback );

		if ( jQuery.isEmptyObject( prop ) ) {
			return this.each( optall.complete, [ false ] );
		}

		// Do not change referenced properties as per-property easing will be lost
		prop = jQuery.extend( {}, prop );

		function doAnimation() {
			// XXX 'this' does not always have a nodeName when running the
			// test suite

			if ( optall.queue === false ) {
				jQuery._mark( this );
			}

			var opt = jQuery.extend( {}, optall ),
				isElement = this.nodeType === 1,
				hidden = isElement && jQuery(this).is(":hidden"),
				name, val, p, e,
				parts, start, end, unit,
				method;

			// will store per property easing and be used to determine when an animation is complete
			opt.animatedProperties = {};

			for ( p in prop ) {

				// property name normalization
				name = jQuery.camelCase( p );
				if ( p !== name ) {
					prop[ name ] = prop[ p ];
					delete prop[ p ];
				}

				val = prop[ name ];

				// easing resolution: per property > opt.specialEasing > opt.easing > 'swing' (default)
				if ( jQuery.isArray( val ) ) {
					opt.animatedProperties[ name ] = val[ 1 ];
					val = prop[ name ] = val[ 0 ];
				} else {
					opt.animatedProperties[ name ] = opt.specialEasing && opt.specialEasing[ name ] || opt.easing || 'swing';
				}

				if ( val === "hide" && hidden || val === "show" && !hidden ) {
					return opt.complete.call( this );
				}

				if ( isElement && ( name === "height" || name === "width" ) ) {
					// Make sure that nothing sneaks out
					// Record all 3 overflow attributes because IE does not
					// change the overflow attribute when overflowX and
					// overflowY are set to the same value
					opt.overflow = [ this.style.overflow, this.style.overflowX, this.style.overflowY ];

					// Set display property to inline-block for height/width
					// animations on inline elements that are having width/height animated
					if ( jQuery.css( this, "display" ) === "inline" &&
							jQuery.css( this, "float" ) === "none" ) {

						// inline-level elements accept inline-block;
						// block-level elements need to be inline with layout
						if ( !jQuery.support.inlineBlockNeedsLayout || defaultDisplay( this.nodeName ) === "inline" ) {
							this.style.display = "inline-block";

						} else {
							this.style.zoom = 1;
						}
					}
				}
			}

			if ( opt.overflow != null ) {
				this.style.overflow = "hidden";
			}

			for ( p in prop ) {
				e = new jQuery.fx( this, opt, p );
				val = prop[ p ];

				if ( rfxtypes.test( val ) ) {

					// Tracks whether to show or hide based on private
					// data attached to the element
					method = jQuery._data( this, "toggle" + p ) || ( val === "toggle" ? hidden ? "show" : "hide" : 0 );
					if ( method ) {
						jQuery._data( this, "toggle" + p, method === "show" ? "hide" : "show" );
						e[ method ]();
					} else {
						e[ val ]();
					}

				} else {
					parts = rfxnum.exec( val );
					start = e.cur();

					if ( parts ) {
						end = parseFloat( parts[2] );
						unit = parts[3] || ( jQuery.cssNumber[ p ] ? "" : "px" );

						// We need to compute starting value
						if ( unit !== "px" ) {
							jQuery.style( this, p, (end || 1) + unit);
							start = ( (end || 1) / e.cur() ) * start;
							jQuery.style( this, p, start + unit);
						}

						// If a +=/-= token was provided, we're doing a relative animation
						if ( parts[1] ) {
							end = ( (parts[ 1 ] === "-=" ? -1 : 1) * end ) + start;
						}

						e.custom( start, end, unit );

					} else {
						e.custom( start, val, "" );
					}
				}
			}

			// For JS strict compliance
			return true;
		}

		return optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},

	stop: function( type, clearQueue, gotoEnd ) {
		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var i,
				hadTimers = false,
				timers = jQuery.timers,
				data = jQuery._data( this );

			// clear marker counters if we know they won't be
			if ( !gotoEnd ) {
				jQuery._unmark( true, this );
			}

			function stopQueue( elem, data, i ) {
				var hooks = data[ i ];
				jQuery.removeData( elem, i, true );
				hooks.stop( gotoEnd );
			}

			if ( type == null ) {
				for ( i in data ) {
					if ( data[ i ].stop && i.indexOf(".run") === i.length - 4 ) {
						stopQueue( this, data, i );
					}
				}
			} else if ( data[ i = type + ".run" ] && data[ i ].stop ){
				stopQueue( this, data, i );
			}

			for ( i = timers.length; i--; ) {
				if ( timers[ i ].elem === this && (type == null || timers[ i ].queue === type) ) {
					if ( gotoEnd ) {

						// force the next step to be the last
						timers[ i ]( true );
					} else {
						timers[ i ].saveState();
					}
					hadTimers = true;
					timers.splice( i, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( !( gotoEnd && hadTimers ) ) {
				jQuery.dequeue( this, type );
			}
		});
	}

});

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout( clearFxNow, 0 );
	return ( fxNow = jQuery.now() );
}

function clearFxNow() {
	fxNow = undefined;
}

// Generate parameters to create a standard animation
function genFx( type, num ) {
	var obj = {};

	jQuery.each( fxAttrs.concat.apply([], fxAttrs.slice( 0, num )), function() {
		obj[ this ] = type;
	});

	return obj;
}

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx( "show", 1 ),
	slideUp: genFx( "hide", 1 ),
	slideToggle: genFx( "toggle", 1 ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.extend({
	speed: function( speed, easing, fn ) {
		var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
			complete: fn || !fn && easing ||
				jQuery.isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
		};

		opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
			opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

		// normalize opt.queue - true/undefined/null -> "fx"
		if ( opt.queue == null || opt.queue === true ) {
			opt.queue = "fx";
		}

		// Queueing
		opt.old = opt.complete;

		opt.complete = function( noUnmark ) {
			if ( jQuery.isFunction( opt.old ) ) {
				opt.old.call( this );
			}

			if ( opt.queue ) {
				jQuery.dequeue( this, opt.queue );
			} else if ( noUnmark !== false ) {
				jQuery._unmark( this );
			}
		};

		return opt;
	},

	easing: {
		linear: function( p, n, firstNum, diff ) {
			return firstNum + diff * p;
		},
		swing: function( p, n, firstNum, diff ) {
			return ( ( -Math.cos( p*Math.PI ) / 2 ) + 0.5 ) * diff + firstNum;
		}
	},

	timers: [],

	fx: function( elem, options, prop ) {
		this.options = options;
		this.elem = elem;
		this.prop = prop;

		options.orig = options.orig || {};
	}

});

jQuery.fx.prototype = {
	// Simple function for setting a style value
	update: function() {
		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		( jQuery.fx.step[ this.prop ] || jQuery.fx.step._default )( this );
	},

	// Get the current size
	cur: function() {
		if ( this.elem[ this.prop ] != null && (!this.elem.style || this.elem.style[ this.prop ] == null) ) {
			return this.elem[ this.prop ];
		}

		var parsed,
			r = jQuery.css( this.elem, this.prop );
		// Empty strings, null, undefined and "auto" are converted to 0,
		// complex values such as "rotate(1rad)" are returned as is,
		// simple values such as "10px" are parsed to Float.
		return isNaN( parsed = parseFloat( r ) ) ? !r || r === "auto" ? 0 : r : parsed;
	},

	// Start an animation from one number to another
	custom: function( from, to, unit ) {
		var self = this,
			fx = jQuery.fx;

		this.startTime = fxNow || createFxNow();
		this.end = to;
		this.now = this.start = from;
		this.pos = this.state = 0;
		this.unit = unit || this.unit || ( jQuery.cssNumber[ this.prop ] ? "" : "px" );

		function t( gotoEnd ) {
			return self.step( gotoEnd );
		}

		t.queue = this.options.queue;
		t.elem = this.elem;
		t.saveState = function() {
			if ( self.options.hide && jQuery._data( self.elem, "fxshow" + self.prop ) === undefined ) {
				jQuery._data( self.elem, "fxshow" + self.prop, self.start );
			}
		};

		if ( t() && jQuery.timers.push(t) && !timerId ) {
			timerId = setInterval( fx.tick, fx.interval );
		}
	},

	// Simple 'show' function
	show: function() {
		var dataShow = jQuery._data( this.elem, "fxshow" + this.prop );

		// Remember where we started, so that we can go back to it later
		this.options.orig[ this.prop ] = dataShow || jQuery.style( this.elem, this.prop );
		this.options.show = true;

		// Begin the animation
		// Make sure that we start at a small width/height to avoid any flash of content
		if ( dataShow !== undefined ) {
			// This show is picking up where a previous hide or show left off
			this.custom( this.cur(), dataShow );
		} else {
			this.custom( this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur() );
		}

		// Start by showing the element
		jQuery( this.elem ).show();
	},

	// Simple 'hide' function
	hide: function() {
		// Remember where we started, so that we can go back to it later
		this.options.orig[ this.prop ] = jQuery._data( this.elem, "fxshow" + this.prop ) || jQuery.style( this.elem, this.prop );
		this.options.hide = true;

		// Begin the animation
		this.custom( this.cur(), 0 );
	},

	// Each step of an animation
	step: function( gotoEnd ) {
		var p, n, complete,
			t = fxNow || createFxNow(),
			done = true,
			elem = this.elem,
			options = this.options;

		if ( gotoEnd || t >= options.duration + this.startTime ) {
			this.now = this.end;
			this.pos = this.state = 1;
			this.update();

			options.animatedProperties[ this.prop ] = true;

			for ( p in options.animatedProperties ) {
				if ( options.animatedProperties[ p ] !== true ) {
					done = false;
				}
			}

			if ( done ) {
				// Reset the overflow
				if ( options.overflow != null && !jQuery.support.shrinkWrapBlocks ) {

					jQuery.each( [ "", "X", "Y" ], function( index, value ) {
						elem.style[ "overflow" + value ] = options.overflow[ index ];
					});
				}

				// Hide the element if the "hide" operation was done
				if ( options.hide ) {
					jQuery( elem ).hide();
				}

				// Reset the properties, if the item has been hidden or shown
				if ( options.hide || options.show ) {
					for ( p in options.animatedProperties ) {
						jQuery.style( elem, p, options.orig[ p ] );
						jQuery.removeData( elem, "fxshow" + p, true );
						// Toggle data is no longer needed
						jQuery.removeData( elem, "toggle" + p, true );
					}
				}

				// Execute the complete function
				// in the event that the complete function throws an exception
				// we must ensure it won't be called twice. #5684

				complete = options.complete;
				if ( complete ) {

					options.complete = false;
					complete.call( elem );
				}
			}

			return false;

		} else {
			// classical easing cannot be used with an Infinity duration
			if ( options.duration == Infinity ) {
				this.now = t;
			} else {
				n = t - this.startTime;
				this.state = n / options.duration;

				// Perform the easing function, defaults to swing
				this.pos = jQuery.easing[ options.animatedProperties[this.prop] ]( this.state, n, 0, 1, options.duration );
				this.now = this.start + ( (this.end - this.start) * this.pos );
			}
			// Perform the next step of the animation
			this.update();
		}

		return true;
	}
};

jQuery.extend( jQuery.fx, {
	tick: function() {
		var timer,
			timers = jQuery.timers,
			i = 0;

		for ( ; i < timers.length; i++ ) {
			timer = timers[ i ];
			// Checks the timer has not already been removed
			if ( !timer() && timers[ i ] === timer ) {
				timers.splice( i--, 1 );
			}
		}

		if ( !timers.length ) {
			jQuery.fx.stop();
		}
	},

	interval: 13,

	stop: function() {
		clearInterval( timerId );
		timerId = null;
	},

	speeds: {
		slow: 600,
		fast: 200,
		// Default speed
		_default: 400
	},

	step: {
		opacity: function( fx ) {
			jQuery.style( fx.elem, "opacity", fx.now );
		},

		_default: function( fx ) {
			if ( fx.elem.style && fx.elem.style[ fx.prop ] != null ) {
				fx.elem.style[ fx.prop ] = fx.now + fx.unit;
			} else {
				fx.elem[ fx.prop ] = fx.now;
			}
		}
	}
});

// Adds width/height step functions
// Do not set anything below 0
jQuery.each([ "width", "height" ], function( i, prop ) {
	jQuery.fx.step[ prop ] = function( fx ) {
		jQuery.style( fx.elem, prop, Math.max(0, fx.now) );
	};
});

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep(jQuery.timers, function( fn ) {
			return elem === fn.elem;
		}).length;
	};
}

// Try to restore the default display value of an element
function defaultDisplay( nodeName ) {

	if ( !elemdisplay[ nodeName ] ) {

		var body = document.body,
			elem = jQuery( "<" + nodeName + ">" ).appendTo( body ),
			display = elem.css( "display" );
		elem.remove();

		// If the simple way fails,
		// get element's real default display by attaching it to a temp iframe
		if ( display === "none" || display === "" ) {
			// No iframe to use yet, so create it
			if ( !iframe ) {
				iframe = document.createElement( "iframe" );
				iframe.frameBorder = iframe.width = iframe.height = 0;
			}

			body.appendChild( iframe );

			// Create a cacheable copy of the iframe document on first call.
			// IE and Opera will allow us to reuse the iframeDoc without re-writing the fake HTML
			// document to it; WebKit & Firefox won't allow reusing the iframe document.
			if ( !iframeDoc || !iframe.createElement ) {
				iframeDoc = ( iframe.contentWindow || iframe.contentDocument ).document;
				iframeDoc.write( ( document.compatMode === "CSS1Compat" ? "<!doctype html>" : "" ) + "<html><body>" );
				iframeDoc.close();
			}

			elem = iframeDoc.createElement( nodeName );

			iframeDoc.body.appendChild( elem );

			display = jQuery.css( elem, "display" );
			body.removeChild( iframe );
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return elemdisplay[ nodeName ];
}




var rtable = /^t(?:able|d|h)$/i,
	rroot = /^(?:body|html)$/i;

if ( "getBoundingClientRect" in document.documentElement ) {
	jQuery.fn.offset = function( options ) {
		var elem = this[0], box;

		if ( options ) {
			return this.each(function( i ) {
				jQuery.offset.setOffset( this, options, i );
			});
		}

		if ( !elem || !elem.ownerDocument ) {
			return null;
		}

		if ( elem === elem.ownerDocument.body ) {
			return jQuery.offset.bodyOffset( elem );
		}

		try {
			box = elem.getBoundingClientRect();
		} catch(e) {}

		var doc = elem.ownerDocument,
			docElem = doc.documentElement;

		// Make sure we're not dealing with a disconnected DOM node
		if ( !box || !jQuery.contains( docElem, elem ) ) {
			return box ? { top: box.top, left: box.left } : { top: 0, left: 0 };
		}

		var body = doc.body,
			win = getWindow(doc),
			clientTop  = docElem.clientTop  || body.clientTop  || 0,
			clientLeft = docElem.clientLeft || body.clientLeft || 0,
			scrollTop  = win.pageYOffset || jQuery.support.boxModel && docElem.scrollTop  || body.scrollTop,
			scrollLeft = win.pageXOffset || jQuery.support.boxModel && docElem.scrollLeft || body.scrollLeft,
			top  = box.top  + scrollTop  - clientTop,
			left = box.left + scrollLeft - clientLeft;

		return { top: top, left: left };
	};

} else {
	jQuery.fn.offset = function( options ) {
		var elem = this[0];

		if ( options ) {
			return this.each(function( i ) {
				jQuery.offset.setOffset( this, options, i );
			});
		}

		if ( !elem || !elem.ownerDocument ) {
			return null;
		}

		if ( elem === elem.ownerDocument.body ) {
			return jQuery.offset.bodyOffset( elem );
		}

		var computedStyle,
			offsetParent = elem.offsetParent,
			prevOffsetParent = elem,
			doc = elem.ownerDocument,
			docElem = doc.documentElement,
			body = doc.body,
			defaultView = doc.defaultView,
			prevComputedStyle = defaultView ? defaultView.getComputedStyle( elem, null ) : elem.currentStyle,
			top = elem.offsetTop,
			left = elem.offsetLeft;

		while ( (elem = elem.parentNode) && elem !== body && elem !== docElem ) {
			if ( jQuery.support.fixedPosition && prevComputedStyle.position === "fixed" ) {
				break;
			}

			computedStyle = defaultView ? defaultView.getComputedStyle(elem, null) : elem.currentStyle;
			top  -= elem.scrollTop;
			left -= elem.scrollLeft;

			if ( elem === offsetParent ) {
				top  += elem.offsetTop;
				left += elem.offsetLeft;

				if ( jQuery.support.doesNotAddBorder && !(jQuery.support.doesAddBorderForTableAndCells && rtable.test(elem.nodeName)) ) {
					top  += parseFloat( computedStyle.borderTopWidth  ) || 0;
					left += parseFloat( computedStyle.borderLeftWidth ) || 0;
				}

				prevOffsetParent = offsetParent;
				offsetParent = elem.offsetParent;
			}

			if ( jQuery.support.subtractsBorderForOverflowNotVisible && computedStyle.overflow !== "visible" ) {
				top  += parseFloat( computedStyle.borderTopWidth  ) || 0;
				left += parseFloat( computedStyle.borderLeftWidth ) || 0;
			}

			prevComputedStyle = computedStyle;
		}

		if ( prevComputedStyle.position === "relative" || prevComputedStyle.position === "static" ) {
			top  += body.offsetTop;
			left += body.offsetLeft;
		}

		if ( jQuery.support.fixedPosition && prevComputedStyle.position === "fixed" ) {
			top  += Math.max( docElem.scrollTop, body.scrollTop );
			left += Math.max( docElem.scrollLeft, body.scrollLeft );
		}

		return { top: top, left: left };
	};
}

jQuery.offset = {

	bodyOffset: function( body ) {
		var top = body.offsetTop,
			left = body.offsetLeft;

		if ( jQuery.support.doesNotIncludeMarginInBodyOffset ) {
			top  += parseFloat( jQuery.css(body, "marginTop") ) || 0;
			left += parseFloat( jQuery.css(body, "marginLeft") ) || 0;
		}

		return { top: top, left: left };
	},

	setOffset: function( elem, options, i ) {
		var position = jQuery.css( elem, "position" );

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		var curElem = jQuery( elem ),
			curOffset = curElem.offset(),
			curCSSTop = jQuery.css( elem, "top" ),
			curCSSLeft = jQuery.css( elem, "left" ),
			calculatePosition = ( position === "absolute" || position === "fixed" ) && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1,
			props = {}, curPosition = {}, curTop, curLeft;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};


jQuery.fn.extend({

	position: function() {
		if ( !this[0] ) {
			return null;
		}

		var elem = this[0],

		// Get *real* offsetParent
		offsetParent = this.offsetParent(),

		// Get correct offsets
		offset       = this.offset(),
		parentOffset = rroot.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset();

		// Subtract element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		offset.top  -= parseFloat( jQuery.css(elem, "marginTop") ) || 0;
		offset.left -= parseFloat( jQuery.css(elem, "marginLeft") ) || 0;

		// Add offsetParent borders
		parentOffset.top  += parseFloat( jQuery.css(offsetParent[0], "borderTopWidth") ) || 0;
		parentOffset.left += parseFloat( jQuery.css(offsetParent[0], "borderLeftWidth") ) || 0;

		// Subtract the two offsets
		return {
			top:  offset.top  - parentOffset.top,
			left: offset.left - parentOffset.left
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || document.body;
			while ( offsetParent && (!rroot.test(offsetParent.nodeName) && jQuery.css(offsetParent, "position") === "static") ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent;
		});
	}
});


// Create scrollLeft and scrollTop methods
jQuery.each( ["Left", "Top"], function( i, name ) {
	var method = "scroll" + name;

	jQuery.fn[ method ] = function( val ) {
		var elem, win;

		if ( val === undefined ) {
			elem = this[ 0 ];

			if ( !elem ) {
				return null;
			}

			win = getWindow( elem );

			// Return the scroll offset
			return win ? ("pageXOffset" in win) ? win[ i ? "pageYOffset" : "pageXOffset" ] :
				jQuery.support.boxModel && win.document.documentElement[ method ] ||
					win.document.body[ method ] :
				elem[ method ];
		}

		// Set the scroll offset
		return this.each(function() {
			win = getWindow( this );

			if ( win ) {
				win.scrollTo(
					!i ? val : jQuery( win ).scrollLeft(),
					 i ? val : jQuery( win ).scrollTop()
				);

			} else {
				this[ method ] = val;
			}
		});
	};
});

function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}




// Create width, height, innerHeight, innerWidth, outerHeight and outerWidth methods
jQuery.each([ "Height", "Width" ], function( i, name ) {

	var type = name.toLowerCase();

	// innerHeight and innerWidth
	jQuery.fn[ "inner" + name ] = function() {
		var elem = this[0];
		return elem ?
			elem.style ?
			parseFloat( jQuery.css( elem, type, "padding" ) ) :
			this[ type ]() :
			null;
	};

	// outerHeight and outerWidth
	jQuery.fn[ "outer" + name ] = function( margin ) {
		var elem = this[0];
		return elem ?
			elem.style ?
			parseFloat( jQuery.css( elem, type, margin ? "margin" : "border" ) ) :
			this[ type ]() :
			null;
	};

	jQuery.fn[ type ] = function( size ) {
		// Get window width or height
		var elem = this[0];
		if ( !elem ) {
			return size == null ? null : this;
		}

		if ( jQuery.isFunction( size ) ) {
			return this.each(function( i ) {
				var self = jQuery( this );
				self[ type ]( size.call( this, i, self[ type ]() ) );
			});
		}

		if ( jQuery.isWindow( elem ) ) {
			// Everyone else use document.documentElement or document.body depending on Quirks vs Standards mode
			// 3rd condition allows Nokia support, as it supports the docElem prop but not CSS1Compat
			var docElemProp = elem.document.documentElement[ "client" + name ],
				body = elem.document.body;
			return elem.document.compatMode === "CSS1Compat" && docElemProp ||
				body && body[ "client" + name ] || docElemProp;

		// Get document width or height
		} else if ( elem.nodeType === 9 ) {
			// Either scroll[Width/Height] or offset[Width/Height], whichever is greater
			return Math.max(
				elem.documentElement["client" + name],
				elem.body["scroll" + name], elem.documentElement["scroll" + name],
				elem.body["offset" + name], elem.documentElement["offset" + name]
			);

		// Get or set width or height on the element
		} else if ( size === undefined ) {
			var orig = jQuery.css( elem, type ),
				ret = parseFloat( orig );

			return jQuery.isNumeric( ret ) ? ret : orig;

		// Set the width or height on the element (default to pixels if value is unitless)
		} else {
			return this.css( type, typeof size === "string" ? size : size + "px" );
		}
	};

});


// Expose jQuery to the global object
window.jQuery = window.$ = jQuery;
})( window );

/*
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($,e,b){var c="hashchange",h=document,f,g=$.event.special,i=h.documentMode,d="on"+c in e&&(i===b||i>7);function a(j){j=j||location.href;return"#"+j.replace(/^[^#]*#?(.*)$/,"$1")}$.fn[c]=function(j){return j?this.bind(c,j):this.trigger(c)};$.fn[c].delay=50;g[c]=$.extend(g[c],{setup:function(){if(d){return false}$(f.start)},teardown:function(){if(d){return false}$(f.stop)}});f=(function(){var j={},p,m=a(),k=function(q){return q},l=k,o=k;j.start=function(){p||n()};j.stop=function(){p&&clearTimeout(p);p=b};function n(){var r=a(),q=o(m);if(r!==m){l(m=r,q);$(e).trigger(c)}else{if(q!==m){location.href=location.href.replace(/#.*/,"")+q}}p=setTimeout(n,$.fn[c].delay)}$.browser.msie&&!d&&(function(){var q,r;j.start=function(){if(!q){r=$.fn[c].src;r=r&&r+a();q=$('<iframe tabindex="-1" title="empty"/>').hide().one("load",function(){r||l(a());n()}).attr("src",r||"javascript:0").insertAfter("body")[0].contentWindow;h.onpropertychange=function(){try{if(event.propertyName==="title"){q.document.title=h.title}}catch(s){}}}};j.stop=k;o=function(){return a(q.location.href)};l=function(v,s){var u=q.document,t=$.fn[c].domain;if(v!==s){u.title=h.title;u.open();t&&u.write('<script>document.domain="'+t+'"<\/script>');u.close();q.location.hash=v}}})();return j})()})(jQuery,this);

//     Underscore.js 1.2.1
//     (c) 2011 Jeremy Ashkenas, DocumentCloud Inc.
//     Underscore is freely distributable under the MIT license.
//     Portions of Underscore are inspired or borrowed from Prototype,
//     Oliver Steele's Functional, and John Resig's Micro-Templating.
//     For all details and documentation:
//     http://documentcloud.github.com/underscore

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `global` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var slice            = ArrayProto.slice,
      unshift          = ArrayProto.unshift,
      toString         = ObjProto.toString,
      hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) { return new wrapper(obj); };

  // Export the Underscore object for **Node.js** and **"CommonJS"**, with
  // backwards-compatibility for the old `require()` API. If we're not in
  // CommonJS, add `_` to the global object.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else if (typeof define === 'function' && define.amd) {
    // Register as a named module with AMD.
    define('underscore', function() {
      return _;
    });
  } else {
    // Exported as a string, for Closure Compiler "advanced" mode.
    root['_'] = _;
  }

  // Current version.
  _.VERSION = '1.2.1';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, l = obj.length; i < l; i++) {
        if (i in obj && iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) {
          if (iterator.call(context, obj[key], key, obj) === breaker) return;
        }
      }
    }
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results[results.length] = iterator.call(context, value, index, list);
    });
    return results;
  };

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = memo !== void 0;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError("Reduce of empty array with no initial value");
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return memo !== void 0 ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var reversed = (_.isArray(obj) ? obj.slice() : _.toArray(obj)).reverse();
    return _.reduce(reversed, iterator, memo, context);
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, iterator, context) {
    var result;
    any(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
    each(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    each(obj, function(value, index, list) {
      if (!iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, iterator, context) {
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
    each(obj, function(value, index, list) {
      if (!(result = result && iterator.call(context, value, index, list))) return breaker;
    });
    return result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, iterator, context) {
    iterator = iterator || _.identity;
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
    each(obj, function(value, index, list) {
      if (result |= iterator.call(context, value, index, list)) return breaker;
    });
    return !!result;
  };

  // Determine if a given value is included in the array or object using `===`.
  // Aliased as `contains`.
  _.include = _.contains = function(obj, target) {
    var found = false;
    if (obj == null) return found;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    found = any(obj, function(value) {
      if (value === target) return true;
    });
    return found;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    return _.map(obj, function(value) {
      return (method.call ? method || value : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, function(value){ return value[key]; });
  };

  // Return the maximum element or (element-based computation).
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj)) return Math.max.apply(Math, obj);
    if (!iterator && _.isEmpty(obj)) return -Infinity;
    var result = {computed : -Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed >= result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj)) return Math.min.apply(Math, obj);
    if (!iterator && _.isEmpty(obj)) return Infinity;
    var result = {computed : Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed < result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Shuffle an array.
  _.shuffle = function(obj) {
    var shuffled = [], rand;
    each(obj, function(value, index, list) {
      if (index == 0) {
        shuffled[0] = value;
      } else {
        rand = Math.floor(Math.random() * (index + 1));
        shuffled[index] = shuffled[rand];
        shuffled[rand] = value;
      }
    });
    return shuffled;
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, iterator, context) {
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value : value,
        criteria : iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria, b = right.criteria;
      return a < b ? -1 : a > b ? 1 : 0;
    }), 'value');
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = function(obj, val) {
    var result = {};
    var iterator = _.isFunction(val) ? val : function(obj) { return obj[val]; };
    each(obj, function(value, index) {
      var key = iterator(value, index);
      (result[key] || (result[key] = [])).push(value);
    });
    return result;
  };

  // Use a comparator function to figure out at what index an object should
  // be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator) {
    iterator || (iterator = _.identity);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >> 1;
      iterator(array[mid]) < iterator(obj) ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely convert anything iterable into a real, live array.
  _.toArray = function(iterable) {
    if (!iterable)                return [];
    if (iterable.toArray)         return iterable.toArray();
    if (_.isArray(iterable))      return slice.call(iterable);
    if (_.isArguments(iterable))  return slice.call(iterable);
    return _.values(iterable);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    return _.toArray(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head`. The **guard** check allows it to work
  // with `_.map`.
  _.first = _.head = function(array, n, guard) {
    return (n != null) && !guard ? slice.call(array, 0, n) : array[0];
  };

  // Returns everything but the last entry of the array. Especcialy useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    return (n != null) && !guard ? slice.call(array, array.length - n) : array[array.length - 1];
  };

  // Returns everything but the first entry of the array. Aliased as `tail`.
  // Especially useful on the arguments object. Passing an **index** will return
  // the rest of the values in the array from that index onward. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = function(array, index, guard) {
    return slice.call(array, (index == null) || guard ? 1 : index);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, function(value){ return !!value; });
  };

  // Return a completely flattened version of an array.
  _.flatten = function(array, shallow) {
    return _.reduce(array, function(memo, value) {
      if (_.isArray(value)) return memo.concat(shallow ? value : _.flatten(value));
      memo[memo.length] = value;
      return memo;
    }, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator) {
    var initial = iterator ? _.map(array, iterator) : array;
    var result = [];
    _.reduce(initial, function(memo, el, i) {
      if (0 == i || (isSorted === true ? _.last(memo) != el : !_.include(memo, el))) {
        memo[memo.length] = el;
        result[result.length] = array[i];
      }
      return memo;
    }, []);
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(_.flatten(arguments, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays. (Aliased as "intersect" for back-compat.)
  _.intersection = _.intersect = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.indexOf(other, item) >= 0;
      });
    });
  };

  // Take the difference between one array and another.
  // Only the elements present in just the first array will remain.
  _.difference = function(array, other) {
    return _.filter(array, function(value){ return !_.include(other, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var args = slice.call(arguments);
    var length = _.max(_.pluck(args, 'length'));
    var results = new Array(length);
    for (var i = 0; i < length; i++) results[i] = _.pluck(args, "" + i);
    return results;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i, l;
    if (isSorted) {
      i = _.sortedIndex(array, item);
      return array[i] === item ? i : -1;
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item);
    for (i = 0, l = array.length; i < l; i++) if (array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item) {
    if (array == null) return -1;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) return array.lastIndexOf(item);
    var i = array.length;
    while (i--) if (array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var len = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(len);

    while(idx < len) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Binding with arguments is also known as `curry`.
  // Delegates to **ECMAScript 5**'s native `Function.bind` if available.
  // We check for `func.bind` first, to fail fast when `func` is undefined.
  _.bind = function bind(func, context) {
    var bound, args;
    if (func.bind === nativeBind && nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError;
    args = slice.call(arguments, 2);
    return bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      ctor.prototype = func.prototype;
      var self = new ctor;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (Object(result) === result) return result;
      return self;
    };
  };

  // Bind all of an object's methods to that object. Useful for ensuring that
  // all callbacks defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length == 0) funcs = _.functions(obj);
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return hasOwnProperty.call(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(func, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  _.throttle = function(func, wait) {
    var timeout, context, args, throttling, finishThrottle;
    finishThrottle = _.debounce(function(){ throttling = false; }, wait);
    return function() {
      context = this; args = arguments;
      var throttler = function() {
        timeout = null;
        func.apply(context, args);
        finishThrottle();
      };
      if (!timeout) timeout = setTimeout(throttler, wait);
      if (!throttling) func.apply(context, args);
      if (finishThrottle) finishThrottle();
      throttling = true;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds.
  _.debounce = function(func, wait) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var throttler = function() {
        timeout = null;
        func.apply(context, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(throttler, wait);
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      return memo = func.apply(this, arguments);
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return function() {
      var args = [func].concat(slice.call(arguments));
      return wrapper.apply(this, args);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = slice.call(arguments);
    return function() {
      var args = slice.call(arguments);
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) { return func.apply(this, arguments); }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = nativeKeys || function(obj) {
    if (obj !== Object(obj)) throw new TypeError('Invalid object');
    var keys = [];
    for (var key in obj) if (hasOwnProperty.call(obj, key)) keys[keys.length] = key;
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    return _.map(obj, _.identity);
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      for (var prop in source) {
        if (source[prop] !== void 0) obj[prop] = source[prop];
      }
    });
    return obj;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      for (var prop in source) {
        if (obj[prop] == null) obj[prop] = source[prop];
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function.
  function eq(a, b, stack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the Harmony `egal` proposal: http://wiki.ecmascript.org/doku.php?id=harmony:egal.
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if ((a == null) || (b == null)) return a === b;
    // Unwrap any wrapped objects.
    if (a._chain) a = a._wrapped;
    if (b._chain) b = b._wrapped;
    // Invoke a custom `isEqual` method if one is provided.
    if (_.isFunction(a.isEqual)) return a.isEqual(b);
    if (_.isFunction(b.isEqual)) return b.isEqual(a);
    // Compare object types.
    var typeA = typeof a;
    if (typeA != typeof b) return false;
    // Optimization; ensure that both values are truthy or falsy.
    if (!a != !b) return false;
    // `NaN` values are equal.
    if (_.isNaN(a)) return _.isNaN(b);
    // Compare string objects by value.
    var isStringA = _.isString(a), isStringB = _.isString(b);
    if (isStringA || isStringB) return isStringA && isStringB && String(a) == String(b);
    // Compare number objects by value.
    var isNumberA = _.isNumber(a), isNumberB = _.isNumber(b);
    if (isNumberA || isNumberB) return isNumberA && isNumberB && +a == +b;
    // Compare boolean objects by value. The value of `true` is 1; the value of `false` is 0.
    var isBooleanA = _.isBoolean(a), isBooleanB = _.isBoolean(b);
    if (isBooleanA || isBooleanB) return isBooleanA && isBooleanB && +a == +b;
    // Compare dates by their millisecond values.
    var isDateA = _.isDate(a), isDateB = _.isDate(b);
    if (isDateA || isDateB) return isDateA && isDateB && a.getTime() == b.getTime();
    // Compare RegExps by their source patterns and flags.
    var isRegExpA = _.isRegExp(a), isRegExpB = _.isRegExp(b);
    if (isRegExpA || isRegExpB) {
      // Ensure commutative equality for RegExps.
      return isRegExpA && isRegExpB &&
             a.source == b.source &&
             a.global == b.global &&
             a.multiline == b.multiline &&
             a.ignoreCase == b.ignoreCase;
    }
    // Ensure that both values are objects.
    if (typeA != 'object') return false;
    // Arrays or Arraylikes with different lengths are not equal.
    if (a.length !== b.length) return false;
    // Objects with different constructors are not equal.
    if (a.constructor !== b.constructor) return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = stack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (stack[length] == a) return true;
    }
    // Add the first object to the stack of traversed objects.
    stack.push(a);
    var size = 0, result = true;
    // Deep compare objects.
    for (var key in a) {
      if (hasOwnProperty.call(a, key)) {
        // Count the expected number of properties.
        size++;
        // Deep compare each member.
        if (!(result = hasOwnProperty.call(b, key) && eq(a[key], b[key], stack))) break;
      }
    }
    // Ensure that both objects contain the same number of properties.
    if (result) {
      for (key in b) {
        if (hasOwnProperty.call(b, key) && !size--) break;
      }
      result = !size;
    }
    // Remove the first object from the stack of traversed objects.
    stack.pop();
    return result;
  }

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (hasOwnProperty.call(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType == 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Is a given variable an arguments object?
  if (toString.call(arguments) == '[object Arguments]') {
    _.isArguments = function(obj) {
      return toString.call(obj) == '[object Arguments]';
    };
  } else {
    _.isArguments = function(obj) {
      return !!(obj && hasOwnProperty.call(obj, 'callee'));
    };
  }

  // Is a given value a function?
  _.isFunction = function(obj) {
    return toString.call(obj) == '[object Function]';
  };

  // Is a given value a string?
  _.isString = function(obj) {
    return toString.call(obj) == '[object String]';
  };

  // Is a given value a number?
  _.isNumber = function(obj) {
    return toString.call(obj) == '[object Number]';
  };

  // Is the given value `NaN`?
  _.isNaN = function(obj) {
    // `NaN` is the only value for which `===` is not reflexive.
    return obj !== obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value a date?
  _.isDate = function(obj) {
    return toString.call(obj) == '[object Date]';
  };

  // Is the given value a regular expression?
  _.isRegExp = function(obj) {
    return toString.call(obj) == '[object RegExp]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  // Run a function **n** times.
  _.times = function (n, iterator, context) {
    for (var i = 0; i < n; i++) iterator.call(context, i);
  };

  // Escape a string for HTML interpolation.
  _.escape = function(string) {
    return (''+string).replace(/&(?!\w+;|#\d+;|#x[\da-f]+;)/gi, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/\//g,'&#x2F;');
  };

  // Add your own custom functions to the Underscore object, ensuring that
  // they're correctly added to the OOP wrapper as well.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name){
      addToWrapper(name, _[name] = obj[name]);
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = idCounter++;
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(str, data) {
    var c  = _.templateSettings;
    var tmpl = 'var __p=[],print=function(){__p.push.apply(__p,arguments);};' +
      'with(obj||{}){__p.push(\'' +
      str.replace(/\\/g, '\\\\')
         .replace(/'/g, "\\'")
         .replace(c.escape, function(match, code) {
           return "',_.escape(" + code.replace(/\\'/g, "'") + "),'";
         })
         .replace(c.interpolate, function(match, code) {
           return "'," + code.replace(/\\'/g, "'") + ",'";
         })
         .replace(c.evaluate || null, function(match, code) {
           return "');" + code.replace(/\\'/g, "'")
                              .replace(/[\r\n\t]/g, ' ') + "__p.push('";
         })
         .replace(/\r/g, '\\r')
         .replace(/\n/g, '\\n')
         .replace(/\t/g, '\\t')
         + "');}return __p.join('');";
    var func = new Function('obj', tmpl);
    return data ? func(data) : func;
  };

  // The OOP Wrapper
  // ---------------

  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.
  var wrapper = function(obj) { this._wrapped = obj; };

  // Expose `wrapper.prototype` as `_.prototype`
  _.prototype = wrapper.prototype;

  // Helper function to continue chaining intermediate results.
  var result = function(obj, chain) {
    return chain ? _(obj).chain() : obj;
  };

  // A method to easily add functions to the OOP wrapper.
  var addToWrapper = function(name, func) {
    wrapper.prototype[name] = function() {
      var args = slice.call(arguments);
      unshift.call(args, this._wrapped);
      return result(func.apply(_, args), this._chain);
    };
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    wrapper.prototype[name] = function() {
      method.apply(this._wrapped, arguments);
      return result(this._wrapped, this._chain);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    wrapper.prototype[name] = function() {
      return result(method.apply(this._wrapped, arguments), this._chain);
    };
  });

  // Start chaining a wrapped Underscore object.
  wrapper.prototype.chain = function() {
    this._chain = true;
    return this;
  };

  // Extracts the result from a wrapped and chained object.
  wrapper.prototype.value = function() {
    return this._wrapped;
  };

})();

//     Backbone.js 0.5.3
//     (c) 2010 Jeremy Ashkenas, DocumentCloud Inc.
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://documentcloud.github.com/backbone

(function(){

  // Initial Setup
  // -------------

  // Save a reference to the global object.
  var root = this;

  // Save the previous value of the `Backbone` variable.
  var previousBackbone = root.Backbone;

  // The top-level namespace. All public Backbone classes and modules will
  // be attached to this. Exported for both CommonJS and the browser.
  var Backbone;
  if (typeof exports !== 'undefined') {
    Backbone = exports;
  } else {
    Backbone = root.Backbone = {};
  }

  // Current version of the library. Keep in sync with `package.json`.
  Backbone.VERSION = '0.5.3';

  // Require Underscore, if we're on the server, and it's not already present.
  var _ = root._;
  if (!_ && (typeof require !== 'undefined')) _ = require('underscore')._;

  // For Backbone's purposes, jQuery or Zepto owns the `$` variable.
  var $ = root.jQuery || root.Zepto;

  // Runs Backbone.js in *noConflict* mode, returning the `Backbone` variable
  // to its previous owner. Returns a reference to this Backbone object.
  Backbone.noConflict = function() {
    root.Backbone = previousBackbone;
    return this;
  };

  // Turn on `emulateHTTP` to support legacy HTTP servers. Setting this option will
  // fake `"PUT"` and `"DELETE"` requests via the `_method` parameter and set a
  // `X-Http-Method-Override` header.
  Backbone.emulateHTTP = false;

  // Turn on `emulateJSON` to support legacy servers that can't deal with direct
  // `application/json` requests ... will encode the body as
  // `application/x-www-form-urlencoded` instead and will send the model in a
  // form param named `model`.
  Backbone.emulateJSON = false;

  // Backbone.Events
  // -----------------

  // A module that can be mixed in to *any object* in order to provide it with
  // custom events. You may `bind` or `unbind` a callback function to an event;
  // `trigger`-ing an event fires all callbacks in succession.
  //
  //     var object = {};
  //     _.extend(object, Backbone.Events);
  //     object.bind('expand', function(){ alert('expanded'); });
  //     object.trigger('expand');
  //
  Backbone.Events = {

    // Bind an event, specified by a string name, `ev`, to a `callback` function.
    // Passing `"all"` will bind the callback to all events fired.
    bind : function(ev, callback, context) {
      var calls = this._callbacks || (this._callbacks = {});
      var list  = calls[ev] || (calls[ev] = []);
      list.push([callback, context]);
      return this;
    },

    // Remove one or many callbacks. If `callback` is null, removes all
    // callbacks for the event. If `ev` is null, removes all bound callbacks
    // for all events.
    unbind : function(ev, callback) {
      var calls;
      if (!ev) {
        this._callbacks = {};
      } else if (calls = this._callbacks) {
        if (!callback) {
          calls[ev] = [];
        } else {
          var list = calls[ev];
          if (!list) return this;
          for (var i = 0, l = list.length; i < l; i++) {
            if (list[i] && callback === list[i][0]) {
              list[i] = null;
              break;
            }
          }
        }
      }
      return this;
    },

    // Trigger an event, firing all bound callbacks. Callbacks are passed the
    // same arguments as `trigger` is, apart from the event name.
    // Listening for `"all"` passes the true event name as the first argument.
    trigger : function(eventName) {
      var list, calls, ev, callback, args;
      var both = 2;
      if (!(calls = this._callbacks)) return this;
      while (both--) {
        ev = both ? eventName : 'all';
        if (list = calls[ev]) {
          for (var i = 0, l = list.length; i < l; i++) {
            if (!(callback = list[i])) {
              list.splice(i, 1); i--; l--;
            } else {
              args = both ? Array.prototype.slice.call(arguments, 1) : arguments;
              callback[0].apply(callback[1] || this, args);
            }
          }
        }
      }
      return this;
    }

  };

  // Backbone.Model
  // --------------

  // Create a new model, with defined attributes. A client id (`cid`)
  // is automatically generated and assigned for you.
  Backbone.Model = function(attributes, options) {
    var defaults;
    attributes || (attributes = {});
    if (defaults = this.defaults) {
      if (_.isFunction(defaults)) defaults = defaults.call(this);
      attributes = _.extend({}, defaults, attributes);
    }
    this.attributes = {};
    this._escapedAttributes = {};
    this.cid = _.uniqueId('c');
    this.set(attributes, {silent : true});
    this._changed = false;
    this._previousAttributes = _.clone(this.attributes);
    if (options && options.collection) this.collection = options.collection;
    this.initialize(attributes, options);
  };

  // Attach all inheritable methods to the Model prototype.
  _.extend(Backbone.Model.prototype, Backbone.Events, {

    // A snapshot of the model's previous attributes, taken immediately
    // after the last `"change"` event was fired.
    _previousAttributes : null,

    // Has the item been changed since the last `"change"` event?
    _changed : false,

    // The default name for the JSON `id` attribute is `"id"`. MongoDB and
    // CouchDB users may want to set this to `"_id"`.
    idAttribute : 'id',

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize : function(){},

    // Return a copy of the model's `attributes` object.
    toJSON : function() {
      return _.clone(this.attributes);
    },

    // Get the value of an attribute.
    get : function(attr) {
      return this.attributes[attr];
    },

    // Get the HTML-escaped value of an attribute.
    escape : function(attr) {
      var html;
      if (html = this._escapedAttributes[attr]) return html;
      var val = this.attributes[attr];
      return this._escapedAttributes[attr] = escapeHTML(val == null ? '' : '' + val);
    },

    // Returns `true` if the attribute contains a value that is not null
    // or undefined.
    has : function(attr) {
      return this.attributes[attr] != null;
    },

    // Set a hash of model attributes on the object, firing `"change"` unless you
    // choose to silence it.
    set : function(attrs, options) {

      // Extract attributes and options.
      options || (options = {});
      if (!attrs) return this;
      if (attrs.attributes) attrs = attrs.attributes;
      var now = this.attributes, escaped = this._escapedAttributes;

      // Run validation.
      if (!options.silent && this.validate && !this._performValidation(attrs, options)) return false;

      // Check for changes of `id`.
      if (this.idAttribute in attrs) this.id = attrs[this.idAttribute];

      // We're about to start triggering change events.
      var alreadyChanging = this._changing;
      this._changing = true;

      // Update attributes.
      for (var attr in attrs) {
        var val = attrs[attr];
        if (!_.isEqual(now[attr], val)) {
          now[attr] = val;
          delete escaped[attr];
          this._changed = true;
          if (!options.silent) this.trigger('change:' + attr, this, val, options);
        }
      }

      // Fire the `"change"` event, if the model has been changed.
      if (!alreadyChanging && !options.silent && this._changed) this.change(options);
      this._changing = false;
      return this;
    },

    // Remove an attribute from the model, firing `"change"` unless you choose
    // to silence it. `unset` is a noop if the attribute doesn't exist.
    unset : function(attr, options) {
      if (!(attr in this.attributes)) return this;
      options || (options = {});
      var value = this.attributes[attr];

      // Run validation.
      var validObj = {};
      validObj[attr] = void 0;
      if (!options.silent && this.validate && !this._performValidation(validObj, options)) return false;

      // Remove the attribute.
      delete this.attributes[attr];
      delete this._escapedAttributes[attr];
      if (attr == this.idAttribute) delete this.id;
      this._changed = true;
      if (!options.silent) {
        this.trigger('change:' + attr, this, void 0, options);
        this.change(options);
      }
      return this;
    },

    // Clear all attributes on the model, firing `"change"` unless you choose
    // to silence it.
    clear : function(options) {
      options || (options = {});
      var attr;
      var old = this.attributes;

      // Run validation.
      var validObj = {};
      for (attr in old) validObj[attr] = void 0;
      if (!options.silent && this.validate && !this._performValidation(validObj, options)) return false;

      this.attributes = {};
      this._escapedAttributes = {};
      this._changed = true;
      if (!options.silent) {
        for (attr in old) {
          this.trigger('change:' + attr, this, void 0, options);
        }
        this.change(options);
      }
      return this;
    },

    // Fetch the model from the server. If the server's representation of the
    // model differs from its current attributes, they will be overriden,
    // triggering a `"change"` event.
    fetch : function(options) {
      options || (options = {});
      var model = this;
      var success = options.success;
      options.success = function(resp, status, xhr) {
        if (!model.set(model.parse(resp, xhr), options)) return false;
        if (success) success(model, resp);
      };
      options.error = wrapError(options.error, model, options);
      return (this.sync || Backbone.sync).call(this, 'read', this, options);
    },

    // Set a hash of model attributes, and sync the model to the server.
    // If the server returns an attributes hash that differs, the model's
    // state will be `set` again.
    save : function(attrs, options) {
      options || (options = {});
      if (attrs && !this.set(attrs, options)) return false;
      var model = this;
      var success = options.success;
      options.success = function(resp, status, xhr) {
        if (!model.set(model.parse(resp, xhr), options)) return false;
        if (success) success(model, resp, xhr);
      };
      options.error = wrapError(options.error, model, options);
      var method = this.isNew() ? 'create' : 'update';
      return (this.sync || Backbone.sync).call(this, method, this, options);
    },

    // Destroy this model on the server if it was already persisted. Upon success, the model is removed
    // from its collection, if it has one.
    destroy : function(options) {
      options || (options = {});
      if (this.isNew()) return this.trigger('destroy', this, this.collection, options);
      var model = this;
      var success = options.success;
      options.success = function(resp) {
        model.trigger('destroy', model, model.collection, options);
        if (success) success(model, resp);
      };
      options.error = wrapError(options.error, model, options);
      return (this.sync || Backbone.sync).call(this, 'delete', this, options);
    },

    // Default URL for the model's representation on the server -- if you're
    // using Backbone's restful methods, override this to change the endpoint
    // that will be called.
    url : function() {
      var base = getUrl(this.collection) || this.urlRoot || urlError();
      if (this.isNew()) return base;
      return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + encodeURIComponent(this.id);
    },

    // **parse** converts a response into the hash of attributes to be `set` on
    // the model. The default implementation is just to pass the response along.
    parse : function(resp, xhr) {
      return resp;
    },

    // Create a new model with identical attributes to this one.
    clone : function() {
      return new this.constructor(this);
    },

    // A model is new if it has never been saved to the server, and lacks an id.
    isNew : function() {
      return this.id == null;
    },

    // Call this method to manually fire a `change` event for this model.
    // Calling this will cause all objects observing the model to update.
    change : function(options) {
      this.trigger('change', this, options);
      this._previousAttributes = _.clone(this.attributes);
      this._changed = false;
    },

    // Determine if the model has changed since the last `"change"` event.
    // If you specify an attribute name, determine if that attribute has changed.
    hasChanged : function(attr) {
      if (attr) return this._previousAttributes[attr] != this.attributes[attr];
      return this._changed;
    },

    // Return an object containing all the attributes that have changed, or false
    // if there are no changed attributes. Useful for determining what parts of a
    // view need to be updated and/or what attributes need to be persisted to
    // the server.
    changedAttributes : function(now) {
      now || (now = this.attributes);
      var old = this._previousAttributes;
      var changed = false;
      for (var attr in now) {
        if (!_.isEqual(old[attr], now[attr])) {
          changed = changed || {};
          changed[attr] = now[attr];
        }
      }
      return changed;
    },

    // Get the previous value of an attribute, recorded at the time the last
    // `"change"` event was fired.
    previous : function(attr) {
      if (!attr || !this._previousAttributes) return null;
      return this._previousAttributes[attr];
    },

    // Get all of the attributes of the model at the time of the previous
    // `"change"` event.
    previousAttributes : function() {
      return _.clone(this._previousAttributes);
    },

    // Run validation against a set of incoming attributes, returning `true`
    // if all is well. If a specific `error` callback has been passed,
    // call that instead of firing the general `"error"` event.
    _performValidation : function(attrs, options) {
      var error = this.validate(attrs);
      if (error) {
        if (options.error) {
          options.error(this, error, options);
        } else {
          this.trigger('error', this, error, options);
        }
        return false;
      }
      return true;
    }

  });

  // Backbone.Collection
  // -------------------

  // Provides a standard collection class for our sets of models, ordered
  // or unordered. If a `comparator` is specified, the Collection will maintain
  // its models in sort order, as they're added and removed.
  Backbone.Collection = function(models, options) {
    options || (options = {});
    if (options.comparator) this.comparator = options.comparator;
    _.bindAll(this, '_onModelEvent', '_removeReference');
    this._reset();
    if (models) this.reset(models, {silent: true});
    this.initialize.apply(this, arguments);
  };

  // Define the Collection's inheritable methods.
  _.extend(Backbone.Collection.prototype, Backbone.Events, {

    // The default model for a collection is just a **Backbone.Model**.
    // This should be overridden in most cases.
    model : Backbone.Model,

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize : function(){},

    // The JSON representation of a Collection is an array of the
    // models' attributes.
    toJSON : function() {
      return this.map(function(model){ return model.toJSON(); });
    },

    // Add a model, or list of models to the set. Pass **silent** to avoid
    // firing the `added` event for every new model.
    add : function(models, options) {
      if (_.isArray(models)) {
        for (var i = 0, l = models.length; i < l; i++) {
          this._add(models[i], options);
        }
      } else {
        this._add(models, options);
      }
      return this;
    },

    // Remove a model, or a list of models from the set. Pass silent to avoid
    // firing the `removed` event for every model removed.
    remove : function(models, options) {
      if (_.isArray(models)) {
        for (var i = 0, l = models.length; i < l; i++) {
          this._remove(models[i], options);
        }
      } else {
        this._remove(models, options);
      }
      return this;
    },

    // Get a model from the set by id.
    get : function(id) {
      if (id == null) return null;
      return this._byId[id.id != null ? id.id : id];
    },

    // Get a model from the set by client id.
    getByCid : function(cid) {
      return cid && this._byCid[cid.cid || cid];
    },

    // Get the model at the given index.
    at: function(index) {
      return this.models[index];
    },

    // Force the collection to re-sort itself. You don't need to call this under normal
    // circumstances, as the set will maintain sort order as each item is added.
    sort : function(options) {
      options || (options = {});
      if (!this.comparator) throw new Error('Cannot sort a set without a comparator');
      this.models = this.sortBy(this.comparator);
      if (!options.silent) this.trigger('reset', this, options);
      return this;
    },

    // Pluck an attribute from each model in the collection.
    pluck : function(attr) {
      return _.map(this.models, function(model){ return model.get(attr); });
    },

    // When you have more items than you want to add or remove individually,
    // you can reset the entire set with a new list of models, without firing
    // any `added` or `removed` events. Fires `reset` when finished.
    reset : function(models, options) {
      models  || (models = []);
      options || (options = {});
      this.each(this._removeReference);
      this._reset();
      this.add(models, {silent: true});
      if (!options.silent) this.trigger('reset', this, options);
      return this;
    },

    // Fetch the default set of models for this collection, resetting the
    // collection when they arrive. If `add: true` is passed, appends the
    // models to the collection instead of resetting.
    fetch : function(options) {
      options || (options = {});
      var collection = this;
      var success = options.success;
      options.success = function(resp, status, xhr) {
        collection[options.add ? 'add' : 'reset'](collection.parse(resp, xhr), options);
        if (success) success(collection, resp);
      };
      options.error = wrapError(options.error, collection, options);
      return (this.sync || Backbone.sync).call(this, 'read', this, options);
    },

    // Create a new instance of a model in this collection. After the model
    // has been created on the server, it will be added to the collection.
    // Returns the model, or 'false' if validation on a new model fails.
    create : function(model, options) {
      var coll = this;
      options || (options = {});
      model = this._prepareModel(model, options);
      if (!model) return false;
      var success = options.success;
      options.success = function(nextModel, resp, xhr) {
        coll.add(nextModel, options);
        if (success) success(nextModel, resp, xhr);
      };
      model.save(null, options);
      return model;
    },

    // **parse** converts a response into a list of models to be added to the
    // collection. The default implementation is just to pass it through.
    parse : function(resp, xhr) {
      return resp;
    },

    // Proxy to _'s chain. Can't be proxied the same way the rest of the
    // underscore methods are proxied because it relies on the underscore
    // constructor.
    chain: function () {
      return _(this.models).chain();
    },

    // Reset all internal state. Called when the collection is reset.
    _reset : function(options) {
      this.length = 0;
      this.models = [];
      this._byId  = {};
      this._byCid = {};
    },

    // Prepare a model to be added to this collection
    _prepareModel: function(model, options) {
      if (!(model instanceof Backbone.Model)) {
        var attrs = model;
        model = new this.model(attrs, {collection: this});
        if (model.validate && !model._performValidation(attrs, options)) model = false;
      } else if (!model.collection) {
        model.collection = this;
      }
      return model;
    },

    // Internal implementation of adding a single model to the set, updating
    // hash indexes for `id` and `cid` lookups.
    // Returns the model, or 'false' if validation on a new model fails.
    _add : function(model, options) {
      options || (options = {});
      model = this._prepareModel(model, options);
      if (!model) return false;
      var already = this.getByCid(model);
      if (already) throw new Error(["Can't add the same model to a set twice", already.id]);
      this._byId[model.id] = model;
      this._byCid[model.cid] = model;
      var index = options.at != null ? options.at :
                  this.comparator ? this.sortedIndex(model, this.comparator) :
                  this.length;
      this.models.splice(index, 0, model);
      model.bind('all', this._onModelEvent);
      this.length++;
      if (!options.silent) model.trigger('add', model, this, options);
      return model;
    },

    // Internal implementation of removing a single model from the set, updating
    // hash indexes for `id` and `cid` lookups.
    _remove : function(model, options) {
      options || (options = {});
      model = this.getByCid(model) || this.get(model);
      if (!model) return null;
      delete this._byId[model.id];
      delete this._byCid[model.cid];
      this.models.splice(this.indexOf(model), 1);
      this.length--;
      if (!options.silent) model.trigger('remove', model, this, options);
      this._removeReference(model);
      return model;
    },

    // Internal method to remove a model's ties to a collection.
    _removeReference : function(model) {
      if (this == model.collection) {
        delete model.collection;
      }
      model.unbind('all', this._onModelEvent);
    },

    // Internal method called every time a model in the set fires an event.
    // Sets need to update their indexes when models change ids. All other
    // events simply proxy through. "add" and "remove" events that originate
    // in other collections are ignored.
    _onModelEvent : function(ev, model, collection, options) {
      if ((ev == 'add' || ev == 'remove') && collection != this) return;
      if (ev == 'destroy') {
        this._remove(model, options);
      }
      if (model && ev === 'change:' + model.idAttribute) {
        delete this._byId[model.previous(model.idAttribute)];
        this._byId[model.id] = model;
      }
      this.trigger.apply(this, arguments);
    }

  });

  // Underscore methods that we want to implement on the Collection.
  var methods = ['forEach', 'each', 'map', 'reduce', 'reduceRight', 'find', 'detect',
    'filter', 'select', 'reject', 'every', 'all', 'some', 'any', 'include',
    'contains', 'invoke', 'max', 'min', 'sortBy', 'sortedIndex', 'toArray', 'size',
    'first', 'rest', 'last', 'without', 'indexOf', 'lastIndexOf', 'isEmpty', 'groupBy'];

  // Mix in each Underscore method as a proxy to `Collection#models`.
  _.each(methods, function(method) {
    Backbone.Collection.prototype[method] = function() {
      return _[method].apply(_, [this.models].concat(_.toArray(arguments)));
    };
  });

  // Backbone.Router
  // -------------------

  // Routers map faux-URLs to actions, and fire events when routes are
  // matched. Creating a new one sets its `routes` hash, if not set statically.
  Backbone.Router = function(options) {
    options || (options = {});
    if (options.routes) this.routes = options.routes;
    this._bindRoutes();
    this.initialize.apply(this, arguments);
  };

  // Cached regular expressions for matching named param parts and splatted
  // parts of route strings.
  var namedParam    = /:([\w\d]+)/g;
  var splatParam    = /\*([\w\d]+)/g;
  var escapeRegExp  = /[-[\]{}()+?.,\\^$|#\s]/g;

  // Set up all inheritable **Backbone.Router** properties and methods.
  _.extend(Backbone.Router.prototype, Backbone.Events, {

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize : function(){},

    // Manually bind a single named route to a callback. For example:
    //
    //     this.route('search/:query/p:num', 'search', function(query, num) {
    //       ...
    //     });
    //
    route : function(route, name, callback) {
      Backbone.history || (Backbone.history = new Backbone.History);
      if (!_.isRegExp(route)) route = this._routeToRegExp(route);
      Backbone.history.route(route, _.bind(function(fragment) {
        var args = this._extractParameters(route, fragment);
        callback.apply(this, args);
        this.trigger.apply(this, ['route:' + name].concat(args));
      }, this));
    },

    // Simple proxy to `Backbone.history` to save a fragment into the history.
    navigate : function(fragment, triggerRoute) {
      Backbone.history.navigate(fragment, triggerRoute);
    },

    // Bind all defined routes to `Backbone.history`. We have to reverse the
    // order of the routes here to support behavior where the most general
    // routes can be defined at the bottom of the route map.
    _bindRoutes : function() {
      if (!this.routes) return;
      var routes = [];
      for (var route in this.routes) {
        routes.unshift([route, this.routes[route]]);
      }
      for (var i = 0, l = routes.length; i < l; i++) {
        this.route(routes[i][0], routes[i][1], this[routes[i][1]]);
      }
    },

    // Convert a route string into a regular expression, suitable for matching
    // against the current location hash.
    _routeToRegExp : function(route) {
      route = route.replace(escapeRegExp, "\\$&")
                   .replace(namedParam, "([^\/]*)")
                   .replace(splatParam, "(.*?)");
      return new RegExp('^' + route + '$');
    },

    // Given a route, and a URL fragment that it matches, return the array of
    // extracted parameters.
    _extractParameters : function(route, fragment) {
      return route.exec(fragment).slice(1);
    }

  });

  // Backbone.History
  // ----------------

  // Handles cross-browser history management, based on URL fragments. If the
  // browser does not support `onhashchange`, falls back to polling.
  Backbone.History = function() {
    this.handlers = [];
    _.bindAll(this, 'checkUrl');
  };

  // Cached regex for cleaning hashes.
  var hashStrip = /^#*/;

  // Cached regex for detecting MSIE.
  var isExplorer = /msie [\w.]+/;

  // Has the history handling already been started?
  var historyStarted = false;

  // Set up all inheritable **Backbone.History** properties and methods.
  _.extend(Backbone.History.prototype, {

    // The default interval to poll for hash changes, if necessary, is
    // twenty times a second.
    interval: 50,

    // Get the cross-browser normalized URL fragment, either from the URL,
    // the hash, or the override.
    getFragment : function(fragment, forcePushState) {
      if (fragment == null) {
        if (this._hasPushState || forcePushState) {
          fragment = window.location.pathname;
          var search = window.location.search;
          if (search) fragment += search;
          if (fragment.indexOf(this.options.root) == 0) fragment = fragment.substr(this.options.root.length);
        } else {
          fragment = window.location.hash;
        }
      }
      return decodeURIComponent(fragment.replace(hashStrip, ''));
    },

    // Start the hash change handling, returning `true` if the current URL matches
    // an existing route, and `false` otherwise.
    start : function(options) {

      // Figure out the initial configuration. Do we need an iframe?
      // Is pushState desired ... is it available?
      if (historyStarted) throw new Error("Backbone.history has already been started");
      this.options          = _.extend({}, {root: '/'}, this.options, options);
      this._wantsPushState  = !!this.options.pushState;
      this._hasPushState    = !!(this.options.pushState && window.history && window.history.pushState);
      var fragment          = this.getFragment();
      var docMode           = document.documentMode;
      var oldIE             = (isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || docMode <= 7));
      if (oldIE) {
        this.iframe = $('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo('body')[0].contentWindow;
        this.navigate(fragment);
      }

      // Depending on whether we're using pushState or hashes, and whether
      // 'onhashchange' is supported, determine how we check the URL state.
      if (this._hasPushState) {
        $(window).bind('popstate', this.checkUrl);
      } else if ('onhashchange' in window && !oldIE) {
        $(window).bind('hashchange', this.checkUrl);
      } else {
        setInterval(this.checkUrl, this.interval);
      }

      // Determine if we need to change the base url, for a pushState link
      // opened by a non-pushState browser.
      this.fragment = fragment;
      historyStarted = true;
      var loc = window.location;
      var atRoot  = loc.pathname == this.options.root;
      if (this._wantsPushState && !this._hasPushState && !atRoot) {
        this.fragment = this.getFragment(null, true);
        window.location.replace(this.options.root + '#' + this.fragment);
        // Return immediately as browser will do redirect to new url
        return true;
      } else if (this._wantsPushState && this._hasPushState && atRoot && loc.hash) {
        this.fragment = loc.hash.replace(hashStrip, '');
        window.history.replaceState({}, document.title, loc.protocol + '//' + loc.host + this.options.root + this.fragment);
      }

      if (!this.options.silent) {
        return this.loadUrl();
      }
    },

    // Add a route to be tested when the fragment changes. Routes added later may
    // override previous routes.
    route : function(route, callback) {
      this.handlers.unshift({route : route, callback : callback});
    },

    // Checks the current URL to see if it has changed, and if it has,
    // calls `loadUrl`, normalizing across the hidden iframe.
    checkUrl : function(e) {
      var current = this.getFragment();
      if (current == this.fragment && this.iframe) current = this.getFragment(this.iframe.location.hash);
      if (current == this.fragment || current == decodeURIComponent(this.fragment)) return false;
      if (this.iframe) this.navigate(current);
      this.loadUrl() || this.loadUrl(window.location.hash);
    },

    // Attempt to load the current URL fragment. If a route succeeds with a
    // match, returns `true`. If no defined routes matches the fragment,
    // returns `false`.
    loadUrl : function(fragmentOverride) {
      var fragment = this.fragment = this.getFragment(fragmentOverride);
      var matched = _.any(this.handlers, function(handler) {
        if (handler.route.test(fragment)) {
          handler.callback(fragment);
          return true;
        }
      });
      return matched;
    },

    // Save a fragment into the hash history. You are responsible for properly
    // URL-encoding the fragment in advance. This does not trigger
    // a `hashchange` event.
    navigate : function(fragment, triggerRoute) {
      var frag = (fragment || '').replace(hashStrip, '');
      if (this.fragment == frag || this.fragment == decodeURIComponent(frag)) return;
      if (this._hasPushState) {
        var loc = window.location;
        if (frag.indexOf(this.options.root) != 0) frag = this.options.root + frag;
        this.fragment = frag;
        window.history.pushState({}, document.title, loc.protocol + '//' + loc.host + frag);
      } else {
        window.location.hash = this.fragment = frag;
        if (this.iframe && (frag != this.getFragment(this.iframe.location.hash))) {
          this.iframe.document.open().close();
          this.iframe.location.hash = frag;
        }
      }
      if (triggerRoute) this.loadUrl(fragment);
    }

  });

  // Backbone.View
  // -------------

  // Creating a Backbone.View creates its initial element outside of the DOM,
  // if an existing element is not provided...
  Backbone.View = function(options) {
    this.cid = _.uniqueId('view');
    this._configure(options || {});
    this._ensureElement();
    this.delegateEvents();
    this.initialize.apply(this, arguments);
  };

  // Element lookup, scoped to DOM elements within the current view.
  // This should be prefered to global lookups, if you're dealing with
  // a specific view.
  var selectorDelegate = function(selector) {
    return $(selector, this.el);
  };

  // Cached regex to split keys for `delegate`.
  var eventSplitter = /^(\S+)\s*(.*)$/;

  // List of view options to be merged as properties.
  var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName'];

  // Set up all inheritable **Backbone.View** properties and methods.
  _.extend(Backbone.View.prototype, Backbone.Events, {

    // The default `tagName` of a View's element is `"div"`.
    tagName : 'div',

    // Attach the `selectorDelegate` function as the `$` property.
    $       : selectorDelegate,

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize : function(){},

    // **render** is the core function that your view should override, in order
    // to populate its element (`this.el`), with the appropriate HTML. The
    // convention is for **render** to always return `this`.
    render : function() {
      return this;
    },

    // Remove this view from the DOM. Note that the view isn't present in the
    // DOM by default, so calling this method may be a no-op.
    remove : function() {
      $(this.el).remove();
      return this;
    },

    // For small amounts of DOM Elements, where a full-blown template isn't
    // needed, use **make** to manufacture elements, one at a time.
    //
    //     var el = this.make('li', {'class': 'row'}, this.model.escape('title'));
    //
    make : function(tagName, attributes, content) {
      var el = document.createElement(tagName);
      if (attributes) $(el).attr(attributes);
      if (content) $(el).html(content);
      return el;
    },

    // Set callbacks, where `this.callbacks` is a hash of
    //
    // *{"event selector": "callback"}*
    //
    //     {
    //       'mousedown .title':  'edit',
    //       'click .button':     'save'
    //     }
    //
    // pairs. Callbacks will be bound to the view, with `this` set properly.
    // Uses event delegation for efficiency.
    // Omitting the selector binds the event to `this.el`.
    // This only works for delegate-able events: not `focus`, `blur`, and
    // not `change`, `submit`, and `reset` in Internet Explorer.
    delegateEvents : function(events) {
      if (!(events || (events = this.events))) return;
      if (_.isFunction(events)) events = events.call(this);
      $(this.el).unbind('.delegateEvents' + this.cid);
      for (var key in events) {
        var method = this[events[key]];
        if (!method) throw new Error('Event "' + events[key] + '" does not exist');
        var match = key.match(eventSplitter);
        var eventName = match[1], selector = match[2];
        method = _.bind(method, this);
        eventName += '.delegateEvents' + this.cid;
        if (selector === '') {
          $(this.el).bind(eventName, method);
        } else {
          $(this.el).delegate(selector, eventName, method);
        }
      }
    },

    // Performs the initial configuration of a View with a set of options.
    // Keys with special meaning *(model, collection, id, className)*, are
    // attached directly to the view.
    _configure : function(options) {
      if (this.options) options = _.extend({}, this.options, options);
      for (var i = 0, l = viewOptions.length; i < l; i++) {
        var attr = viewOptions[i];
        if (options[attr]) this[attr] = options[attr];
      }
      this.options = options;
    },

    // Ensure that the View has a DOM element to render into.
    // If `this.el` is a string, pass it through `$()`, take the first
    // matching element, and re-assign it to `el`. Otherwise, create
    // an element from the `id`, `className` and `tagName` proeprties.
    _ensureElement : function() {
      if (!this.el) {
        var attrs = this.attributes || {};
        if (this.id) attrs.id = this.id;
        if (this.className) attrs['class'] = this.className;
        this.el = this.make(this.tagName, attrs);
      } else if (_.isString(this.el)) {
        this.el = $(this.el).get(0);
      }
    }

  });

  // The self-propagating extend function that Backbone classes use.
  var extend = function (protoProps, classProps) {
    var child = inherits(this, protoProps, classProps);
    child.extend = this.extend;
    return child;
  };

  // Set up inheritance for the model, collection, and view.
  Backbone.Model.extend = Backbone.Collection.extend =
    Backbone.Router.extend = Backbone.View.extend = extend;

  // Map from CRUD to HTTP for our default `Backbone.sync` implementation.
  var methodMap = {
    'create': 'POST',
    'update': 'PUT',
    'delete': 'DELETE',
    'read'  : 'GET'
  };

  // Backbone.sync
  // -------------

  // Override this function to change the manner in which Backbone persists
  // models to the server. You will be passed the type of request, and the
  // model in question. By default, uses makes a RESTful Ajax request
  // to the model's `url()`. Some possible customizations could be:
  //
  // * Use `setTimeout` to batch rapid-fire updates into a single request.
  // * Send up the models as XML instead of JSON.
  // * Persist models via WebSockets instead of Ajax.
  //
  // Turn on `Backbone.emulateHTTP` in order to send `PUT` and `DELETE` requests
  // as `POST`, with a `_method` parameter containing the true HTTP method,
  // as well as all requests with the body as `application/x-www-form-urlencoded` instead of
  // `application/json` with the model in a param named `model`.
  // Useful when interfacing with server-side languages like **PHP** that make
  // it difficult to read the body of `PUT` requests.
  Backbone.sync = function(method, model, options) {
    var type = methodMap[method];

    // Default JSON-request options.
    var params = _.extend({
      type:         type,
      dataType:     'json'
    }, options);

    // Ensure that we have a URL.
    if (!params.url) {
      params.url = getUrl(model) || urlError();
    }

    // Ensure that we have the appropriate request data.
    if (!params.data && model && (method == 'create' || method == 'update')) {
      params.contentType = 'application/json';
      params.data = JSON.stringify(model.toJSON());
    }

    // For older servers, emulate JSON by encoding the request into an HTML-form.
    if (Backbone.emulateJSON) {
      params.contentType = 'application/x-www-form-urlencoded';
      params.data        = params.data ? {model : params.data} : {};
    }

    // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
    // And an `X-HTTP-Method-Override` header.
    if (Backbone.emulateHTTP) {
      if (type === 'PUT' || type === 'DELETE') {
        if (Backbone.emulateJSON) params.data._method = type;
        params.type = 'POST';
        params.beforeSend = function(xhr) {
          xhr.setRequestHeader('X-HTTP-Method-Override', type);
        };
      }
    }

    // Don't process data on a non-GET request.
    if (params.type !== 'GET' && !Backbone.emulateJSON) {
      params.processData = false;
    }

    // Make the request.
    return $.ajax(params);
  };

  // Helpers
  // -------

  // Shared empty constructor function to aid in prototype-chain creation.
  var ctor = function(){};

  // Helper function to correctly set up the prototype chain, for subclasses.
  // Similar to `goog.inherits`, but uses a hash of prototype properties and
  // class properties to be extended.
  var inherits = function(parent, protoProps, staticProps) {
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call `super()`.
    if (protoProps && protoProps.hasOwnProperty('constructor')) {
      child = protoProps.constructor;
    } else {
      child = function(){ return parent.apply(this, arguments); };
    }

    // Inherit class (static) properties from parent.
    _.extend(child, parent);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();

    // Add prototype properties (instance properties) to the subclass,
    // if supplied.
    if (protoProps) _.extend(child.prototype, protoProps);

    // Add static properties to the constructor function, if supplied.
    if (staticProps) _.extend(child, staticProps);

    // Correctly set child's `prototype.constructor`.
    child.prototype.constructor = child;

    // Set a convenience property in case the parent's prototype is needed later.
    child.__super__ = parent.prototype;

    return child;
  };

  // Helper function to get a URL from a Model or Collection as a property
  // or as a function.
  var getUrl = function(object) {
    if (!(object && object.url)) return null;
    return _.isFunction(object.url) ? object.url() : object.url;
  };

  // Throw an error when a URL is needed, and none is supplied.
  var urlError = function() {
    throw new Error('A "url" property or function must be specified');
  };

  // Wrap an optional error callback with a fallback error event.
  var wrapError = function(onError, model, options) {
    return function(resp) {
      if (onError) {
        onError(model, resp, options);
      } else {
        model.trigger('error', model, resp, options);
      }
    };
  };

  // Helper function to escape a string for HTML rendering.
  var escapeHTML = function(string) {
    return string.replace(/&(?!\w+;|#\d+;|#x[\da-f]+;)/gi, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/\//g,'&#x2F;');
  };

}).call(this);

/*!
* Tim
*   github.com/premasagar/tim
*
*//*
    A tiny, secure JavaScript micro-templating script.
*//*

    by Premasagar Rose
        dharmafly.com

    license
        opensource.org/licenses/mit-license.php

    **

    creates global object
        tim

    **

    v0.3.0

*//*global window */

/*
    TODO:
    * a way to prevent a delimiter (e.g. ", ") appearing last in a loop template
    * Sorted constructor for auto-sorting arrays - used for parsers -> two parsers are added, one for identifying and parsing single-tokens and one for open/close tokens - the parsers then create two new Sorted instance, one for single-token plugins and one for open/close token plugins
*/

var tim = (function createTim(initSettings){
    "use strict";
    
    var settings = {
            start: "{{",
            end  : "}}",
            path : "[a-z0-9_][\\.a-z0-9_]*" // e.g. config.person.name
        },
        templates = {},
        filters = {},
        stopThisFilter, pattern, initialized, undef;
        
        
    /////
    

    // Update cached regex pattern
    function patternCache(){
        pattern = new RegExp(settings.start + "\\s*("+ settings.path +")\\s*" + settings.end, "gi");
    }
    
    // settingsCache: Get and set settings
    /*
        Example usage:
        settingsCache(); // get settings object
        settingsCache({start:"<%", end:"%>", attr:"id"}); // set new settings
    */
    function settingsCache(newSettings){
        var s;
    
        if (newSettings){
            for (s in newSettings){
                if (newSettings.hasOwnProperty(s)){
                    settings[s] = newSettings[s];
                }
            }
            patternCache();
        }
        return settings;
    }
        
    // Apply custom settings
    if (initSettings){
        settingsCache(initSettings);
    }
    else {
        patternCache();
    }
    
    
    /////
    
    
    // templatesCache: Get and set the templates cache object
    /*
        Example usage:
        templatesCache("foo"); // get template named "foo"
        templatesCache("foo", "bar"); // set template named "foo" to "bar"
        templatesCache("foo", false); // delete template named "foo"
        templatesCache({foo:"bar", blah:false}); // set multiple templates
        templatesCache(false); // delete all templates
    */
    function templatesCache(key, value){
        var t;
    
        switch (typeof key){
            case "string":
                if (value === undef){
                    return templates[key] || "";
                }
                else if (value === false){
                    delete templates[key];
                }
                else {
                    templates[key] = value;
                }
            break;
            
            case "object":
                for (t in key){
                    if (key.hasOwnProperty(t)){
                        templatesCache(t, key[t]);
                    }
                }
            break;
            
            case "boolean":
            if (!key){
                templates = {};
            }
            break;
        }
        return templates;
    }
    
    function extend(obj1, obj2){
        var key;
        for (key in obj2){
            if (obj2.hasOwnProperty(key)){
                obj1[key] = obj2[key];
            }
        }
        return obj1;
    }
    
    function escapeHTML(string) {
        return string.replace(/&(?!\w+;)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }
    
    /////
    
    
    // FILTERS    
    function sortByPriority(a, b){
        return a[1] - b[1];
    }
    
    // Add filter to the stack
    function addFilter(filterName, fn, priority){
        var fns = filters[filterName];
        if (!fns){
            fns = filters[filterName] = [];
        }
        fns.push([fn, priority || 0]);
        fns.sort(sortByPriority);
        return fn;
    }
    
    function applyFilter(filterName, payload){
        var fns = filters[filterName],
            args, i, len, substituted;
            
        if (fns){
            args = [payload];
            i = 2;
            len = arguments.length;            
            for (; i < len; i++){
                args.push(arguments[i]);
            }
            
            i = 0;
            len = fns.length;
            for (; i < len; i++){
                args[0] = payload;
                substituted = fns[i][0].apply(null, args);
                if (payload !== undef && substituted !== undef){
                    payload = substituted;
                }
                if (stopThisFilter){
                    stopThisFilter = false;
                    break;
                }
            }
        }
        return payload;
    }
    
    // Router for adding and applying filters, for Tim API
    function filter(filterName, payload){
        return (typeof payload === "function" ? addFilter : applyFilter)
            .apply(null, arguments);
    }
    filter.stop = function(){
        stopThisFilter = true;
    };
    
    
    /////
    
    
    // Merge data into template
    /*  
        // simpler alternative, without support for iteration:
        template = template.replace(pattern, function(tag, token){
            return applyFilter("token", token, data, template);
        });
    */
    // TODO: all an array to be passed to tim(), so that the template is called for each element in it
    function substitute(template, data){
        var match, tag, token, substituted, startPos, endPos, templateStart, templateEnd, subTemplate, closeToken, closePos, key, loopData, loop;
    
        while((match = pattern.exec(template)) !== null) {
            token = match[1];
            substituted = applyFilter("token", token, data, template);
            startPos = match.index;
            endPos = pattern.lastIndex;
            templateStart = template.slice(0, startPos);
            templateEnd = template.slice(endPos);
            
            // If the final value is a function call it and use the returned
            // value in its place.
            if (typeof substituted === "function") {
                substituted = substituted.call(data);
            }
            
            if (typeof substituted !== "boolean" && typeof substituted !== "object"){
                template = templateStart + substituted + templateEnd;
            } else {
                subTemplate = "";
                closeToken = settings.start + "/" + token + settings.end;
                closePos = templateEnd.indexOf(closeToken);
                
                if (closePos >= 0){
                    templateEnd = templateEnd.slice(0, closePos);
                    if (typeof substituted === "boolean") {
                        subTemplate = substituted ? templateEnd : '';
                    } else {
                        for (key in substituted){
                            if (substituted.hasOwnProperty(key)){
                                pattern.lastIndex = 0;
                            
                                // Allow {{_key}} and {{_content}} in templates
                                loopData = extend({_key:key, _content:substituted[key]}, substituted[key]);
                                loopData = applyFilter("loopData", loopData, loop, token);
                                loop = tim(templateEnd, loopData);
                                subTemplate += applyFilter("loop", loop, token, loopData);
                            }
                        }
                        subTemplate = applyFilter("loopEnd", subTemplate, token, loopData);
                    }
                    template = templateStart + subTemplate + template.slice(endPos + templateEnd.length + closeToken.length);
                }
                else {
                    throw "tim: '" + token + "' not closed";
                }
            }
            
            pattern.lastIndex = 0;
        }
        return template;
    }
    
    
    // TIM - MAIN FUNCTION
    function tim(template, data){
        var templateLookup;
    
        // On first run, call init plugins
        if (!initialized){
            initialized = 1;        
            applyFilter("init");
        }
        template = applyFilter("templateBefore", template);
    
        // No template tags found in template
        if (template.indexOf(settings.start) < 0){
            // Is this a key for a cached template?
            templateLookup = templatesCache(template);
            if (templateLookup){
                template = templateLookup;
            }
        }
        template = applyFilter("template", template);
        
        // Substitute tokens in template
        if (template && data !== undef){
            template = substitute(template, data);
        }
        
        template = applyFilter("templateAfter", template);
        return template;
    }
    
    // Get and set settings, e.g. tim({attr:"id"});
    tim.settings = settingsCache;
    
    // Get and set cached templates
    tim.templates = templatesCache;
    
    // Create new Tim function, based on supplied settings, if any
    tim.parser = createTim;
    
    // Add new filters and trigger existing ones. Use tim.filter.stop() during processing, if required.
    tim.filter = filter;
    
    
    /////
    
    
    // dotSyntax default plugin: uses dot syntax to parse a data object for substitutions
    addFilter("token", function(token, data, tag){
        var path = token.split("."),
            len = path.length,
            dataLookup = data,
            i = 0;

        for (; i < len; i++){
            dataLookup = dataLookup[path[i]];
            
            // Property not found
            if (dataLookup === undef){
                throw "tim: '" + path[i] + "' not found" + (i ? " in " + tag : "");
            }
            
            // Return the required value
            if (i === len - 1){
                // Escape any HTML special characters in strings and return.
                return typeof dataLookup === "string" ? escapeHTML(dataLookup) : dataLookup;
            }
        }
    });
    
    
    /////
    
    
    // Dom plugin: finds micro-templates in <script>'s in the DOM
    // This block of code can be removed if unneeded - e.g. with server-side JS
    // Default: <script type="text/tim" class="foo">{{TEMPLATE}}</script>
    if (window && window.document){
        tim.dom = function(domSettings){
            domSettings = domSettings || {};
            
            var type = domSettings.type || settings.type || "text/tim",
                attr = domSettings.attr || settings.attr || "class",
                document = window.document,
                hasQuery = !!document.querySelectorAll,
                elements = hasQuery ?
                    document.querySelectorAll(
                        "script[type='" + type + "']"
                    ) :
                    document.getElementsByTagName("script"),
                i = 0,
                len = elements.length,
                elem, key,
                templatesInDom = {};
                
            for (; i < len; i++){
                elem = elements[i];
                key = attr === "class" ? elem.className : elem.getAttribute(attr);
                if (key && hasQuery || elem.type === type){
                    templatesInDom[key] = elem.innerHTML;
                }
            }
            
            templatesCache(templatesInDom);
            return templatesInDom;
        };
        
        addFilter("init", function(){
            tim.dom();
        });
    }
    
    return tim;
}());

/*jslint browser: true, onevar: true, undef: true, eqeqeq: true, bitwise: true, regexp: true, newcap: true, immed: true, strict: true */

/*!
* Cache
*   github.com/premasagar/mishmash/tree/master/cache/
*
*//*
    localStorage caching
*//*

    by Premasagar Rose
        dharmafly.com

    license
        opensource.org/licenses/mit-license.php

    **

    creates global object
        Cache

    **

    v0.1.1

*//*global window */

var Cache = (function(window){
    "use strict";

    var JSON = window.JSON,
        localStorage;
            
    /////
    
    
    // Is localStorage available? If always known to exist, then this block may be removed, and the line above changed to: localStorage = window.localStorage;
    try {
        localStorage = window.localStorage;
    }
    catch(e){}
    
    if (!localStorage){
        return (function(){
            var Mock = function(){},
                p = Mock.prototype;
                
            p.set = p.remove = function(){ return this; };
            p.get = p.wrapper = p.time = function(){};
            p.localStorage = false;
            return Mock;
        }());
    }
    
    
    /////
    
        
    function Cache(namespace){
        this.prefix = namespace ? namespace + "." : "";
    }
    Cache.prototype = {
        localStorage: true,
        
        set: function(key, value, returnWrapper){
            var wrapper = {
                v: value,
                t: (new Date()).getTime()
            };
            localStorage[this.prefix + key] = JSON.stringify(wrapper);
            return returnWrapper !== true ? this : wrapper;
        },
        
        wrapper: function(key){
            var cached = localStorage[this.prefix + key];
            return cached ? JSON.parse(cached) : cached;
        },
        
        get: function(key){
            var wrapper = this.wrapper(key);
            return wrapper ? wrapper.v : wrapper;
        },
        
        time: function(key){
            var wrapper = this.wrapper(key);
            return wrapper ? JSON.parse(wrapper).t : wrapper;
        },
        
        remove: function(key){
            localStorage.removeItem(this.prefix + key);
            return this;
        }
    };
    
    return Cache;
}(window));

var vec2 = (function(window){
    "use strict";
    
    var GLMatrixArrayType,
        vec2;

    if (typeof window.Float32Array !== "undefined") {
        GLMatrixArrayType = window.Float32Array;
    } else if(typeof window.WebGLFloatArray !== "undefined") {
        GLMatrixArrayType = window.WebGLFloatArray;
    } else {
        GLMatrixArrayType = Array;
    }

    vec2 = {
        create: function(vec) {
            var dest = new GLMatrixArrayType(2);
    
            if(vec) {
                dest[0] = vec[0];
                dest[1] = vec[1];
            }
    
            return dest;
        },

        set: function(vec, dest) {
            dest[0] = vec[0];
            dest[1] = vec[1];
            //dest[2] = vec[2];
    
            return dest;
        },
        
        add2: function(vec, vec2, dest) {
    
            dest[0] = vec[0] + vec2[0];
            dest[1] = vec[1] + vec2[1];
            //dest[2] = vec[2] + vec2[2];
            return dest;
        },
        
        add: function(vec, vec2) {
            vec[0] += vec2[0];
            vec[1] += vec2[1];
        },
        
        subtract2: function(vec, vec2, dest) {
            //if(!dest || vec == dest) {
                //vec[0] -= vec2[0];
                //vec[1] -= vec2[1];
                ////vec[2] -= vec2[2];
                //return vec;
            //}
    
            dest[0] = vec[0] - vec2[0];
            dest[1] = vec[1] - vec2[1];
            //dest[2] = vec[2] - vec2[2];
            return dest;
        },
        
        subtract: function(vec, vec2){
            vec[0] -= vec2[0];
            vec[1] -= vec2[1];
        },
        
        scale: function(vec, val) {
                vec[0] *= val;
                vec[1] *= val;
                return vec;
        },
        
        scale2: function(vec, val, dest) {
    
            dest[0] = vec[0]*val;
            dest[1] = vec[1]*val;
            //dest[2] = vec[2]*val;
            return dest;
        },
        
        normalize: function(vec, dest) {
            if(!dest) { dest = vec; }
    
            var x = vec[0], y = vec[1], len;//, z = vec[2];
            len = Math.sqrt(x*x + y*y);
    
            if (!len) {
                dest[0] = 0;
                dest[1] = 0;
                //dest[2] = 0;
                return dest;
            } else if (len === 1) {
                dest[0] = x;
                dest[1] = y;
                //dest[2] = z;
                return dest;
            }
    
            len = 1 / len;
            dest[0] = x*len;
            dest[1] = y*len;
            //dest[2] = z*len;
            return dest;
        },
        
        length: function(vec){
            var x = vec[0], y = vec[1];//, z = vec[2];
            return Math.sqrt(x*x + y*y);
        },
        
        dist: function(vec, vec2){
            var dx, dy;
            dx = vec[0] - vec2[0];
            dy = vec[1] - vec2[1];
            return Math.sqrt(dx*dx + dy*dy);
        },
        
        dot: function(vec, vec2){
            return vec[0]*vec2[0] + vec[1]*vec2[1];// + vec[2]*vec2[2];
        }
    };

    return vec2;
}(window));

// examples of use:
// tk = ForceDirector();
// tk.addProject({key:'pA', title:'some project', width:200, height:150});
// task = tk.addTaskToProject({key:'tA', title='some task', width:100, height:50});
// /* to tether task by elastic to point in environment */
// task.addTether(200, 200);
// task.removeTether();
// /* to (un)fix in place */
// task.fix();
// /* to remove/replace use the 'active' boolean */
// task.active = true/false;
// /* For walls, use top, bottom, left and right to specify position and wallsFlag to turn on/off detection /*
// tk.right = 300;
// tk.top = 300;
// tk.wallsFlag = true;
// /* to set/animate task/project height and width: */
// task.setHeight(200);
// task.setWidth(200);

/*global vec2*/


var ForceDirector = (function(){
    "use strict";

    var BIG_NUMBER = 999999;
        
    function extend(dest, source){
        var prop;
        for (prop in source){
            if (source.hasOwnProperty(prop)){
                dest[prop] = source[prop];
            }
        }
        return dest;
    }

    function TaskNode(world, params) {
        // Check for arguments, if present initialise the instance. Otherwise
        // do nothing, this allows the constructor to generate a dummy object
        // to be used in inheritance.
        if (arguments.length) {
            this.world = world;
            this.context = world.context;
            this.p = vec2.create([params.x, params.y]);
            this.dp = vec2.create([params.dx, params.dy]);
            this.f = vec2.create([0, 0]);
            this.key = params.key;
            this.title = params.title;
            this.width = params.width;
            this.height = params.height;
            if (params.fixed){
                this.fixed = params.fixed;
            }
            this.offw = this.width / 2;
            this.offh = this.height / 2;
            this.links_to = [];
            this.links_from = [];
            // add node key to world's dictionary
            world.nodesByKey[this.key] = this;
        }
    }

    TaskNode.prototype = {        
        MIN_DRAW_SIZE: 14,
        m: 1,
        tether: null,
        active: true,
        fixed: false,
        
        setPos: function (x, y) {
            this.p[0] = x;
            this.p[1] = y;
        },
        
        getPos: function () {
            return {
                x: this.p[0],
                y: this.p[1]
            };
        },

        setHeight: function (h) {
            this.height = h;
            this.offh = h / 2;
        },

        setWidth: function (w) {
            this.width = w;
            this.offw = w/2;
        },

        addTether: function(x, y){
            this.tether = vec2.create([x, y]);
        },

        removeTether: function(){
            this.tether = null;
        },

        placeRandomly: function(){
            this.dp[0] = 0;
            this.dp[1] = 0;
            this.p[0] = 2*(Math.random()-0.5)*this.world.dim[0];
            this.p[1] = 2*(Math.random()-0.5)*this.world.dim[1];
        }, 

        fix: function(){
            this.fixed = true;
        },

        unFix: function(){
            this.fixed = false;
        },

        makeCentralNode: function(){
            this.world.selectedObject = this;
            this.world.randomizeNodes();
            this.world.deactivateNodes();
            this.activateConnectedNodes();
            this.active = true;
            this.fixed = true;
            this.p[0] = 0;
            this.p[1] = 0;
        },

        activateConnectedNodes: function(){
            var l, i;
            for(i=0; i<this.links_from.length; i++){
                l = this.links_from[i];
                l.node.active = true;
            }

            for(i=0; i<this.links_to.length; i++){
                l = this.links_to[i];
                l.node.active = true;
            }
        },

        // Drawing methods redundant in headless tasket ---

        draw: function(){
            if(!this.active){return;}
            var ctx = this.context;
            ctx.strokeStyle = '#f00';
            ctx.strokeRect(this.p[0] - this.offw, this.p[1] - this.offh, this.width, this.height);
            ctx.font         = 'bold 12px sans-serif';
            ctx.fillStyle    = '#fff';
            ctx.fillText(this.title, this.p[0], this.p[1]);
            if(this.tether){
                ctx.moveTo(this.p[0], this.p[1]);
                ctx.lineTo(this.tether[0], this.tether[1]);
                ctx.stroke();
            }
        },

        drawLinks: function(){
            if(!this.active){return;}
            var i, n, l, ctx = this.context;
            ctx.beginPath();
            for(i=0; i<this.links_to.length; i++){
                l = this.links_to[i];

                n = l.node;
                if(n.active){
                    ctx.moveTo(n.p[0], n.p[1]);
                    ctx.lineTo(this.p[0], this.p[1]);
                }
            }
            ctx.stroke();
        }

    };

    function ProjectNode(){
        TaskNode.apply(this, arguments);
    }

    // Extend TaskNode by setting new instance to ProjectNode prototype.
    ProjectNode.prototype = new TaskNode();

    // Extend Project Node with new methods and redefine our constructor.
    extend(ProjectNode.prototype, {

        constructor: ProjectNode,

        draw: function(){
            if(!this.active){return;}
            var ctx = this.context;
            ctx.strokeStyle = '#00f';
            ctx.strokeRect(this.p[0] - this.offw, this.p[1] - this.offh, this.width, this.height);
            ctx.font         = 'bold 12px sans-serif';
            ctx.fillStyle    = '#fff';
            ctx.fillText(this.title, this.p[0], this.p[1]);
        }
    });

    function Link(node, value){
        this.node = node;
        this.value = value;
    }

    function ForceDirector(){
        //World.call(this);
        // dim gives bounds for random node placement
        this.dim = vec2.create([100,100]);
        this.v2null = vec2.create([0,0]);
        this.nodes = [];
        this.objects = this.nodes;
        this.nodeIJs = [];
        this.nodesByKey = {};
    }

    ForceDirector.prototype = {
        // Default box sizes
        PROJECT_WIDTH: 150,
        PROJECT_HEIGHT: 75,
        TASK_WIDTH: 100,
        TASK_HEIGHT: 50,
    
        physics_dt: 0.5,
        MASS_DRAW_COEFF: 4,
        inScaleFac: 0.75,
        inCoulombK: 100,
        inBBRepulsion: 60,
        inWallRepulsion: 120,
        inHookeK: 0.25,
        inHookeEquilib: 60,
        inVelDampK: 0.1,
        runningTime: 0,
        context: null,
        top: BIG_NUMBER,
        bottom: -BIG_NUMBER,
        left: -BIG_NUMBER,
        right: BIG_NUMBER,
        wallsFlag: true,
    
        init: function(){
            //this.context.lineWidth = 1;

            this.parseData(this.projData);
            this.randomizeNodes();
            // ProjectNode 0 is fixed and central
            this.nodes[0].makeCentralNode();
        },

        //mergeParams: function(base, add){
            //var params = {};
            //for(p in base){params[p] = base[p];}
            //for(p in add){params[p] = add[p];}
            //return params;
        //},
        reset: function(){
            this.nodes.length = 0;
            this.nodeIJs.length = 0;
        },

        addProject: function(params){
            this.nodes.length = 0;
            this.nodeIJs.length = 0;
        
            // add a project node - fixed by default (index will be 0)
            this.nodes.push(new ProjectNode(this, extend({x:0, y:0, dx:0, dy:0, width:ForceDirector.PROJECT_WIDTH, height:ForceDirector.PROJECT_HEIGHT},params)));
            this.nodeIJs.push({});
            this.nodes[0].fixed = true;
            return this.nodes[0];
        },


        addTask: function(params){
            var task = new TaskNode(this, extend({x:0, y:0, dx:0, dy:0, width:ForceDirector.TASK_WIDTH, height:ForceDirector.TASK_HEIGHT}, params));
            this.nodes.push(task);
            this.nodeIJs.push({});
            return task;
        },

        addTaskToProject: function(params, pKey){
            var pNode, node;
            if(typeof pKey === 'undefined'){
                pNode = this.nodes[0];
            }
            else{
                pNode = this.nodesByKey[pKey];
            }
            
            if (!pNode){
                throw "Attempting to add satellite to undefined";
            }

            node = this.addTask(params);
            
            this.addLink({target:node.key, source:pNode.key, value:1});
            return node;
        },

        getTask: function(key){
            return this.nodesByKey[key];
        },

        hideTask: function(key){
            this.nodesByKey[key].active = false;
        },

        parseData: function(data){
            var i, l;
            this.addProject(data);

            // add task nodes - indexed from 1 to t+1
            for(i=0; i<data.tasks.length; i++){
                this.nodes.push(new TaskNode(this, extend({x:0, y:(i+1)*50, dx:0, dy:0}, data.tasks[i])));
                this.nodeIJs.push({});
            }

            // by default link all tasks to project - can be overridden in data-file
            if(typeof data.links === 'undefined'){
                data.links = [];
                for(i=0; i<data.tasks.length; i++){
                    data.links.push({'source':data.key, 'target':data.tasks[i].key, 'value':1});
                }
            }

            for(i=0; i<data.links.length; i++){
                l = data.links[i];
                this.addLink(l);
            }
        },

        // links specified by key
        addLink:  function(l){    
            var target_i, source_i, h, nij;
            target_i = this.nodes.indexOf(this.nodesByKey[l.target]);
            source_i = this.nodes.indexOf(this.nodesByKey[l.source]);
            this.nodes[target_i].links_to.push(new Link(this.nodes[source_i], l.value));
            this.nodes[source_i].links_from.push(new Link(this.nodes[target_i], l.value));
            if(target_i > source_i){
                h = target_i;
                l = source_i;
            }
            else{
                h = source_i;
                l = target_i;
            }
            nij = this.nodeIJs[l][h];
            if(nij){
                this.nodeIJs[l][h] +=1;
            }
            else{
                this.nodeIJs[l][h] = 1;
            }

        },

        randomizeNodes: function(){
            var i, n;
            for(i=0; i<this.nodes.length; i++){
                n = this.nodes[i];
                n.placeRandomly();
            }
        },

        deactivateNodes: function(){
            var i, n;
            for(i=0; i<this.nodes.length; i++){
                n = this.nodes[i];
                n.active = false;
                n.fixed = false;
            }
        },
            
        getProjBBox: function(){
            var bot_left = vec2.create([9999999,9999999]),
                top_right = vec2.create([-9999999, -9999999]),
                i, n_i;

            for(i=0; i<this.objects.length; i++){
                n_i = this.nodes[i];
                bot_left[0] = Math.min(bot_left[0], n_i.p[0] - n_i.offw);
                bot_left[1] = Math.min(bot_left[1], n_i.p[1] - n_i.offh);
                top_right[0] = Math.max(top_right[0], n_i.p[0] + n_i.offw);
                top_right[1] = Math.max(top_right[1], n_i.p[1] + n_i.offh);
            }

            return [bot_left, top_right];
        },

        benchmark: function(t, dt){
            var i, t0 = new Date().getTime();
            for(i=0; i<t; i+=dt){
                this.updateCycle(dt);
            }

            console.debug(new Date().getTime() - t0 + 'ms');

            return;
        },

        updateCycle: function(dt){
            var i, j, p_i, p_j, nij, hf, cf, f, r, d,
                tr, td, thf, tf,
                px, py, w, h, dpdt, fdt;
            this.runningTime += dt;
            for(i=0; i<this.nodes.length; i++){
                //this.nodes[i].f.setElements([0,0]);
                vec2.set(this.v2null, this.nodes[i].f);
            }

            for(i=0; i<this.nodes.length; i++){
                p_i = this.nodes[i];
                if(p_i.active){
                    for(j=i+1; j<this.nodes.length; j++){
                        p_j = this.nodes[j];
                        if(p_j.active){
                            r = vec2.subtract2(p_j.p, p_i.p, vec2.create([0,0]));
                            // we add a small ammount to d to prevent division by 0
                            d = vec2.length(r) + 0.01;
                            // First calculate Coulomb repulsion
                            // var cf = p_j.m*p_i.m / Math.pow(d, 2);
                            cf = -this.inCoulombK/d;
                            // repulsion based on nodes' bounding boxes
                            if(this.nodeBBIntersect(p_i, p_j)){
                                cf -= this.inBBRepulsion;
                            }
                            // calculate Hooke using nodeIJ links
                            nij = this.nodeIJs[i][j];
                            hf = 0;
                            if(nij){
                                hf = nij * (d - this.inHookeEquilib)*this.inHookeK;
                            }
                            f = vec2.normalize(r);
                            vec2.scale(f, cf+hf);

                            vec2.add(p_i.f, f);
                            vec2.subtract(p_j.f, f);
                        }
                    }
                    // some nodes are tethered to a point in the environment
                    if(p_i.tether){
                        // apply elastic attraction from tether point
                        tr = vec2.subtract2(p_i.tether, p_i.p, vec2.create([0,0]));
                        // we add a small ammount to d to prevent division by 0
                        td = vec2.length(tr) + 0.01;
                        thf = td * this.inHookeK;
                        tf = vec2.normalize(tr);
                        vec2.scale(tf, thf);
                        vec2.add(p_i.f, tf);
                    }

                    // bounding walls' repulsion
                    if(this.wallsFlag){
                        px = p_i.p[0];
                        py = p_i.p[1];
                        w = p_i.offw;
                        h = p_i.offh;
                        // t, b, l, r
                        if(py + h > this.top){p_i.f[1] -= this.inWallRepulsion;}
                        else if(py - h < this.bottom){p_i.f[1] += this.inWallRepulsion;}
                        if(px + w > this.right){p_i.f[0] -= this.inWallRepulsion;}
                        else if(px - w < this.left){p_i.f[0] += this.inWallRepulsion;}
                    }

                    if(!p_i.fixed){
                        dpdt = vec2.scale(p_i.dp, dt, vec2.create([0, 0]));
                        vec2.add(p_i.p, dpdt);
                        fdt = vec2.scale(p_i.f, dt/p_i.m, vec2.create([0, 0]));
                        vec2.add(p_i.dp, fdt);
                        // Damp velocities
                        vec2.scale(p_i.dp, this.inVelDampK);
                    }

                }
            }
        },

        nodeBBIntersect: function(n1, n2){
            //bool DoBoxesIntersect(Box a, Box b) {
            return (Math.abs(n1.p[0] - n2.p[0]) < (n1.offw + n2.offw)) &&
                    (Math.abs(n1.p[1] - n2.p[1]) < (n1.offh + n2.offh));
        }
    };
    
    return ForceDirector;
}());
    
//core.extenWrapd(ForceDirector, World);

(function (exports, undefined) {
  var _flatten = exports.flatten,
      _expand  = exports.expand,
      isArray;

  /* Checks an object to see if it is an array.
   *
   * object - An Object to test.
   *
   * Returns true if object is an Array.
   */
  isArray = Array.isArray ? Array.isArray : function (object) {
    return Object.prototype.toString.call(object) === '[object Array]';
  };

  /* Iterates over objects and arrays calling a callback on
   * each iteration and passing in the value, key and object.
   *
   * object   - An Object or Array to iterate over.
   * callback - A callback Function to be fired on each iteration.
   * context  - The scope (this) of the callback fucntion.
   *
   * Returns nothing.
   */
  function forEach(object, callback, context) {
    var index, length;
    if (object.length) {
      if (Array.prototype.forEach) {
        Array.prototype.forEach.call(object, callback, context);
      } else {
        for (index = 0, length = object.length; index < length; index += 1) {
          callback.call(context || this, object[index], index, object);
        }
      }
    } else {
      for (index in object) {
        if (object.hasOwnProperty(index)) {
          callback.call(context || this, object[index], index, object);
        }
      }
    }
  }

  /* Prefixes all keys in an object with a prefix and delimiter.
   *
   * object    - An Object with keys to prefix.
   * prefix    - A String to add as a prefix.
   * delimiter - A delimiter to seperate the prefix and key (default: "").
   *
   * Examples
   *
   *   var obj = {a: 1, b: 2, c: 3}
   *   prefixKeys(obj, 'prefix', '.');
   *   // => {'prefix.a': 1, 'prefix.b': 2 ...}
   *
   * Returns new Object with prefixed keys.
   */
  function prefixKeys(object, prefix, delimiter) {
    var prefixed = {};

    forEach(object, function (value, key) {
      key = [prefix, key].join(delimiter || '');
      prefixed[key] = value;
    });

    return prefixed;
  }

  /* Finds all the values at the end of an object tree and returns them
   * in an Array of object literals with a "key" and "value" properties.
   * The key consists of all parent keys delimited by a special
   * character.
   *
   * object     - An Object literal to traverse.
   * deilimiter - A String used to seperate keys (default: '').
   *
   * Examples
   *
   *   var obj = {a: {b: 'leaf 1', c: 'leaf 2'}};
   *   getLeaves(obj);
   *   // => [{key: 'a.b', value: 'leaf 1'}, {key: 'a.c', value: 'leaf 2'}]
   *
   * Returns Array of leaves.
   */
  function getLeaves(object, delimiter) {
    var leaves = [];

    forEach(object, function (value, key) {
      if (value && typeof value === 'object' && !isArray(value)) {
        value = prefixKeys(value, key, delimiter || '.');
        leaves = leaves.concat(getLeaves(value, delimiter));
      } else {
        leaves.push({
          key:   key,
          value: value
        });
      }
    });

    return leaves;
  }

  /* Public: Flattens an object into a single level. All previously nested
   * objects now have keypaths for keys. The delimiter can also be
   * specified as a second parameter.
   *
   * object    - A deeply nested Object to flatten.
   * delimiter - A delimiter to use in the keypaths (default: ".").
   *
   * Examples
   *
   *   var obj = {a: {b: 'leaf 1', c: 'leaf 2'}};
   *   flatten(obj);
   *   // => {'a.b': 'leaf 1', 'ac': 'leaf 2'}
   *
   * Returns flattened Object.
   */
  function flatten(object, delimiter) {
    var flattened = {};

    forEach(getLeaves(object, delimiter), function (leaf) {
      flattened[leaf.key] = leaf.value;
    });

    return flattened;
  }

  /* Public: Restores the previous "flatten" property on the current
   * scope and returns the function. Use this to redefine the
   * function.
   *
   * Examples
   *
   *   _.flattenObject = flatten.noConflict();
   *
   * Returns flatten Function.
   */
  flatten.noConflict = function () {
    exports.flatten = _flatten;
    return flatten;
  };

  /* Public: Rebuilds a flattened object into a deeply nested
   * object. An optional delimiter can be provided.
   *
   * object    - Object to rebuild.
   * delimiter - String to use as a delimiter (default: ".").
   *
   * Examples
   *
   *   var obj = {'a.b': 'leaf 1', 'ac': 'leaf 2'}
   *   expand(obj);
   *   // => {a: {b: 'leaf 1', c: 'leaf 2'}}
   *
   * Returns expanded Object.
   */
  function expand(object, delimiter) {
    var expanded = {};

    delimiter = delimiter || '.';

    forEach(object, function (value, key) {
      var keys    = key.split(delimiter),
          current = expanded;

      while (keys.length) {
        key = keys.shift();

        if (!current.hasOwnProperty(key)) {
          if (keys.length === 0) {
            current[key] = value;
          } else {
            current[key] = {};
          }
        }

        current = current[key];
      }
    });

    return expanded;
  }

  /* Public: Restores the previous "expand" property on the current
   * scope and returns the function. Use this to redefine the
   * function.
   *
   * Examples
   *
   *   _.expandObject = expand.noConflict();
   *
   * Returns expand Function.
   */
  expand.noConflict = function () {
    exports.expand = _expand;
    return expand;
  };

  exports.flatten = flatten;
  exports.expand  = expand;

}(this.jQuery || this));

/* Public: Monkey patch Backbone to provide support for fragment
 * history. This allows us to track the changes in the fragment
 * an implement a "back" button.
 *
 * New methods include History#stack() that returns an array of all
 * previous fragments and History#getPrevious() which returns the
 * last hash before the current one.
 */
(function (Backbone, undefined) {

    // Store a reference to the original prototype methods.
    var _navigate = Backbone.History.prototype.navigate,
        _loadUrl  = Backbone.History.prototype.loadUrl;

    /* Public: Override Backbone.history.start to use Ben Allmans $.hashchange()
     * plugin to fix hashchange events in IE.
     *
     * See: http://stackoverflow.com/questions/4973936/backbone-js-cause-bug-only-in-ie7
     *
     * Returns nothing.
     */
    Backbone.History.prototype.start = function () {
        jQuery(window).hashchange(_.bind(this.checkUrl, this)).hashchange();
    };

    /* Public: Returns the previous hash before the current one (or more).
     * If this does not exist, returns undefined.
     *
     * Examples
     *
     *   Backbone.history.getPrevious();
     *   // => '/hubs/'
     *
     *   Backbone.history.getPrevious(2);
     *   // => '/help/'
     *
     * Returns a hash String.
     */
    Backbone.History.prototype.getPrevious = function (historyCount) {
        if (!_.isNumber(historyCount)){
            historyCount = 1;
        }
        return this.stack()[this.stack().length - 1 - historyCount];
    };

    /* Public: Returns the full stack of hashes since the application
     * launched. This includes those triggering the hashchange and those
     * set manually using History#setLocation().
     *
     * Examples
     *
     *   Backbone.history.stack();
     *   // => ["/about/", "/projects/", "/projects/new/"]
     *
     * Returns nothing.
     */
    Backbone.History.prototype.stack = function () {
        this._stack = this._stack || [];
        return this._stack;
    };

    /* Public: Save a fragment into the hash history. You are responsible
     * for properly URL-encoding the fragment in advance. This does not trigger
     * a `hashchange` event.
     *
     * This method is an original History method but has been monkey patched
     * to save the fragment in the stack.
     *
     * fragment - A hash String to update the location to.
     *
     * Returns nothing.
     */
    Backbone.History.prototype.navigate = function(fragment, triggerRoute) {
        fragment = (fragment || '').replace(/^#*/, '');
        if (this.getFragment() === fragment) {
            return;
        }
        this.stack().push(fragment);
        _navigate.call(this, fragment, triggerRoute);
    };

    /* Public: Attempt to load the current URL fragment. If a route succeeds
     * with a match, returns `true`. If no defined routes matches the fragment,
     * returns false.
     * This method is an original History method but has been monkey patched
     * to save the fragment in the stack.
     *
     * Returns true if the fragment has been matched.
     */
    Backbone.History.prototype.loadUrl = function () {
        var loaded = _loadUrl.call(this);
        if (loaded) {
            this.stack().push(this.getFragment());
        }
        return loaded;
    };

}(Backbone));


var Tasket = {};


// **
function now(){
    return (new Date()).getTime();
}

// Checks to see if any attributes in an array have changed when a Model fires
// a change event. If they have it calls the callback.
//
// Example
//
//  this.model.bind("change", hasChanged([
//    "tasks.new", "tasks.claimed", "tasks.done", "tasks.verified"
//  ], this.refreshTasks));
//
// Returns a Function to be passed into the Model#bind() method.
function hasChanged(attributes, callback) {
  attributes = _.isArray(attributes) ? attributes : [attributes];
  return function onChange(model) {
    var watch = _.clone(attributes);
    do {
        if (model.hasChanged(watch.pop())) {
            callback();
            break;
        }
    } while (watch.length);
  };
}

// Takes all methods prefixed with "_on" and binds them to the current scope.
//
// Example
//
//   var obj = {
//     doSomething: function () {},
//     _onClick: function () {},
//     _onHover: function () {}
//   }
//   bindHandlers(obj); // _onClick and _onHover will be bound to current scope.
//
function bindHandlers(object) {
    var key, value;
    for (key in object) {
        value = object[key];
        if (key.indexOf("_on") === 0 && typeof value === "function" && !value.bound) {
            object[key] = _.bind(value, object);

            // Prevent an item being bound multiple times. This could happen
            // if multiple constructors call bindHandlers(this);
            object[key].bound = true;
        }
    }
}

// Helper function to escape a string for HTML rendering.
function escapeHTML(string) {
  return string.replace(/&(?!\w+;)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Returns seconds in human readbale format. in days, hours & minutes.
function humanTimespan (remainder, units) {
    var times = [];

    units = units || {day: 86400, hour: 3600, min: 60};

    _.each(units, function (seconds, unit) {
        var timespan = Math.floor(remainder / seconds);
        remainder = remainder % seconds;

        if (timespan !== 0) {
            if (timespan !== 1) {
                unit += 's';
            }
            times.push(timespan + ' ' + unit);
        }
    });

    return times.join(', ');
}

function randomInt(length){
    return Math.ceil((length || 2) * Math.random()) - 1;
}

// Converts newlines into HTML <br> tags.
function nl2br(value) {
    return value.replace(/\n/g, '<br />');
}

// converts a timestamp to a presentable date string
function timestampToDate(timestamp) {
    // ensure all values have two s.f.
    function twosf(val) { return (val < 10) ? "0"+val : val; }

    var jsDate = new Date([timestamp] * 1000), // convert seconds to milliseconds
        months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        year = jsDate.getFullYear(),
        month = months[jsDate.getMonth()],
        date = twosf(jsDate.getDate()),
        hour = twosf(jsDate.getHours()),
        min = twosf(jsDate.getMinutes()),
        sec = twosf(jsDate.getSeconds());
        
    return date+' '+month+' '+year;
}

// converts a timestamp to a presentable relative date
function timestampToRelativeDate(timestamp) {
    
    // condition : if a project has just been archived, 
    // it won't have a timestamp, so don't return a date
    if (!timestamp) { return false; }
    
    var now = new Date(),
        difference = now - (timestamp*1000),
        seconds = difference / 1000,
        minutes = seconds / 60,
        hours = minutes / 60,
        days = hours / 24,
        years = days / 365,
        relativeDate;
        
    relativeDate = seconds < 2 && "1 second ago" ||
		seconds < 60 && Math.round(seconds) + " seconds ago" ||
        seconds < 90 && "1 minute ago" ||
        minutes < 60 && Math.round(minutes) + " minutes ago" ||
        minutes < 90 && "1 hour ago" ||
        hours < 24 && Math.round(hours) + " hours ago" ||
        hours < 48 && "1 day ago" ||
        days < 30 && Math.floor(days) + " days ago" ||
        days < 60 && "1 month ago" ||
        days < 365 && Math.floor(days / 30) + " months ago" ||
        years < 2 && "1 year ago" ||
        "on " + timestampToDate(timestamp);    
        
    return relativeDate;
}

// Capitalize all words in the passed string.
function capitalize(string) {
    return jQuery.map(string.split(' '), function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
}

function camelize(string) {
    return string.replace(/-([a-z])/gi, function (match, letter) {
        return letter.toUpperCase();
    });
}

// Checks to see if browser supports style property. Returns the property
// string or null if not supported.
function getCSSProperty(property) {
    var prefixes = ['Moz', 'Webkit', 'Khtml', 'O', 'ms'],
        index  = 0,
        length = prefixes.length,
        cache  = getCSSProperty.cache,
        styles, prefixed, capialized;

    if (!cache) {
        cache = getCSSProperty.cache = {};
    }

    property = camelize(property);
    if (cache[property]) {
        return cache[property];
    }

    if (window.getComputedStyle) {
        styles = getComputedStyle(document.documentElement, null);
        if (property in styles) {
            cache[property] = property;
            return property;
        }
        capialized = capitalize(property);
        for (; index < length; index += 1) {
            prefixed = prefixes[index] + capialized;
            if (prefixed in styles) {
                cache[property] = prefixed;
                return prefixed;
            }
        }
    }
    return null;
}

// Lifted from Modernizr. http://www.modernizr.com/license/.
// https://raw.github.com/Modernizr/Modernizr/master/feature-detects/css-pointerevents.js
function supportsPointerEvents() {
    if (supportsPointerEvents.hasOwnProperty('cache')) {
        return supportsPointerEvents.cache;
    }

    var element = document.createElement('x'),
        documentElement = document.documentElement,
        getComputedStyle = window.getComputedStyle,
        supports;

    if (!('pointerEvents' in element.style) || !getComputedStyle) {
        supportsPointerEvents.cache = false;
    } else {
        element.style.pointerEvents = 'auto';
        element.style.pointerEvents = 'x';
        documentElement.appendChild(element);
        supports = getComputedStyle(element, '').pointerEvents === 'auto';
        documentElement.removeChild(element);
        supportsPointerEvents.cache = !!supports;
    }

    return supportsPointerEvents.cache;
}

/* Mixins is an object literal of objects that group common functionality.
 * They can be combined with Views, Models and Controllers using a deep
 * extend function such as jQuery.extend(), the deep extend allows extension
 * of nested objects, this allows events and routes to be added without
 * destroying the original.
 *
 * Examples
 *
 *   var MyView = Backbone.View();
 *
 *   // Deep extend the MyView with .show() and .hide() methods.
 *   jQuery.extend(true, MyView.prototype, mixins.toggle);
 *
 *   // Create and use the new view.
 *   var view = new MyView();
 *   view.show();
 *   view.hide();
 */
var mixins = {

    /* Methods for adding show/hide functionality to views. Requires the
     * "hide" class to be added to the stylesheet to actually hide the
     * element.
     *
     * Examples
     *
     *   var MyView = Backbone.View();
     *
     *   // Deep extend the MyView with .show() and .hide() methods.
     *   jQuery.extend(true, MyView.prototype, mixins.toggle);
     *
     *   // Create and use the new view.
     *   var view = new MyView();
     *   view.show();
     *   view.hide();
     */
    toggle: {
        /* Class names used by the mixin. */
        classes: {
            hide: "hide"
        },

        /* Public: Checks to see if the element is currently visible.
         *
         * Examples
         *
         *   if (view.isHidden()) {
         *     view.show();
         *   } else {
         *     view.hide();
         *   }
         *
         * Returns true if the element is hidden.
         */
        isHidden: function () {
            return this.elem.hasClass(this.classes.hide);
        },

        /* Public: Show the current element by removing the #classes.hide
         * class name. Triggers the "show" event passing in the view
         * to registered listeners.
         *
         * options - An options object.
         *           silent: If true will not trigger the "show" event.
         *
         * Examples
         *
         *   myView.show();
         *
         * Returns itself.
         */
        show: function (options) {
            return this._toggle("show", options);
        },

        /* Public: Hide the current element by adding the #classes.hide
         * class name. Triggers the "hide" event passing in the view
         * to registered listeners.
         *
         * options - An options object.
         *           silent: If true will not trigger the "hide" event.
         *
         * Examples
         *
         *   myView.hide();
         *   myView.hide({silent: true});
         *
         * Returns itself.
         */
        hide: function (options) {
            return this._toggle("hide", options);
        },

        /* Hide/Show the current element by toggling the #classes.hide
         * class name. Triggers an event for the method, passing in the view
         * to registered listeners.
         *
         * method  - Calling method name, "show" or "hide".
         * options - An options object.
         *           silent: If true will not trigger the "hide" event.
         *
         * Examples
         *
         *   myView._toggle("show");
         *
         * Returns itself.
         */
        _toggle: function (method, options) {
            this.elem.toggleClass(this.classes.hide, method === "hide");
            if (!options || !options.silent) {
                this.trigger(method, this);
            }
            return this;
        }
    },

    /* Methods for proxying the events of a target object via another.
     *
     * Examples
     *
     *   var HubController = Controller.extend({
     *       initialize: function () {
     *           this.hubView = new HubView();
     *
     *           // All events triggered by this.hubView will now also
     *           // be triggered by HubController instances.
     *           this._proxyEvents(this.hubView);
     *       }
     *   });
     *
     *   // Deep extend the HubController with ._proxyEvents() method.
     *   jQuery.extend(true, HubController.prototype, mixins.proxy);
     *
     *   // Or use as a one off by using call.
     *   mixins.proxy._proxyEvents.call(myListView, myChildView);
     */
    proxy: {

        /* Proxies events from the target object through the current object.
         * Useful for bubbling events up the application stack. Backbone
         * uses this technique to trigger model events on a Collection.
         *
         * target - A target object that has the Backbone.Events methods.
         *
         * Examples
         *
         *   var HubController = Controller.extend({
         *       initialize: function () {
         *           this.hubView = new HubView();
         *
         *           // All events triggered by this.hubView will now also
         *           // be triggered by HubController instances.
         *           this._proxyEvents(this.hubView);
         *       }
         *   });
         *
         * Returns itself.
         */
        _proxyEvents: function (target) {
            target.bind("all", function onProxy(name) {
                var args = Array.prototype.slice.call(arguments, 0);
                this.trigger.apply(this, args.concat([this]));
            }, this);
            return this;
        }
    }
};
// ABSTRACT MODEL
var Model = Backbone.Model.extend({
    url: function(relative) {
        var url = (relative ? "" : Tasket.endpoint) + this.type + "s/";
        return this.isNew() ? url : url + this.id;
    },
    
    initialize: function(){
        if (!this.get("createdTime")){
            this.set({createdTime: now()});
        }
    },
    
    report: function(msg){
        return "Tasket" + (this.type ? " " + this.type : "") + ": " + msg + " : " + (this.id || this.cid);
    },

    // Sets attributes on a model.
    set: function (attributes, options) {
        // Flatten the attributes into a object with only one level of properties.
        attributes = jQuery.flatten(attributes);
        return Backbone.Model.prototype.set.call(this, attributes, options);
    },

    // Coerce ids to strings to ensure sane comparisons.
    parse: function (response) {
        if (response && response.id) {
            response.id = "" + response.id;
        }
        return response;
    },

    // Returns the Model as a plain JavaScript object.
    toJSON: function () {
        // Expand the flattened attributes before returning.
        var attributes = Backbone.Model.prototype.toJSON.apply(this, arguments);
        return jQuery.expand(attributes);
    },

    /* Checks to see if all required attributes are present in the model.
     *
     * Examples
     *
     *   model.isComplete();
     *
     * Returns true if all required attributes are present.
     */
    isComplete: function () {
        if (this.required) {
            // If any required attributes are undefined then .any() will return
            // true and method returns false.
            return !_.any(this.required, function(property){
                return _.isUndefined(this.get(property));
            }, this);
        }
        return true;
    },

    validate: function(attrs) {
        var missing, report;
    
        // Validate if this is not a stub of a model with just an id - i.e. only on creating from scratch
        if (this.required && this.isNew()){
            missing = _.select(this.required, function(property){
                return _.isUndefined(this.get(property));
            }, this);
            
            if (missing.length){
                report = this.report(missing + " required");
                throw report;
                //return report;
            }
        }
    }
});

var CollectionModel = Backbone.Collection.extend({
    initialize: function(){
        this.type = this.model.prototype.type;
    },

    url: function(relative){
        var url = (relative ? "" : Tasket.endpoint) + this.type + "s/",
            bootstrapping = this.seed && !this.length,
            ids;
        // If the page has just loaded, and nothing is yet loaded, then seed this with default objects
        
        if (!bootstrapping){
            ids = this.pluck("id").sort();
            url += "?ids=" + ids;
        }
        return url;
    },

    filterByIds: function(ids){
        return new this.constructor(this.filter(function (model) {
            return _.indexOf(ids, model.id) > -1;
        }));
    },

    /* Check to see if all models in the collection are complete, ie. have
     * allrequired properties.
     *
     * Returns true if all models are complete.
     */
    isComplete: function () {
        return !this.any(function (model) {
            return !model.isComplete();
        });
    }
});

// HUB
var Hub = Model.extend({
    type: "hub",

    required: ["owner", "title"],

    defaults: {
        title: "",
        description: "",
        image: "",
        tasks: {
            "new": [],
            "claimed": [],
            "verified": [],
            "done": []
        },
        estimates: {
            "new": 0,
            "claimed": 0,
            "verified": 0,
            "done": 0
        }
    },

    // TODO: cache a flag for this value, and update each time a task is opened or closed
    isOpen: function(){
        var openTask = _.detect(this.get("tasks"), function(taskId){
            var task = Tasket.tasks.get(taskId);
            return task && task.isOpen();
        });
        return !_.isUndefined(openTask);
    },

    // Adds "Hub" for an instance in WebKit developer tools
    constructor: function Hub(){
        Model.prototype.constructor.apply(this, arguments);
    },

    initialize: function(){
        Model.prototype.initialize.apply(this, arguments);
        _.bindAll(this, "updateTasks", "updateEstimates");
        Tasket.bind("task:change:state", this.updateTasks);
        Tasket.bind("task:change:estimate", this.updateEstimates);
    },

    // Checks to see if this hub has room for any more non-verified tasks.
    canAddTask: function () {
        var tasks = 0;
        _.each(["new", "claimed", "done"], function (state) {
            tasks += this.get("tasks." + state).length;
        }, this);
        return tasks < Tasket.settings.TASK_LIMIT;
    },

    // Returns tasks of different states (default: all states)
    getTasks: function (states) {
        states = states || ["new", "claimed", "done", "verified"];
        return _(states).chain().map(function (state) {
            return this.get("tasks." + state);
        }, this).flatten().value();
    },
    
    // Count tasks of different states (default: all states)
    countTasks: function (states){
        return this.getTasks(states).length;
    },

    countNewTasks: function(){
        return this.countTasks([Task.states.NEW]);
    },
    
    // Count "done" and "verified" tasks
    countCompletedTasks: function(){
        return this.countTasks(["done", "verified"]);
    },
    
    // Check whether hub can be deleted
    canDelete: function () {
        var claimed = this.get("tasks.claimed"),
            done = this.get("tasks.done"),
            verified = this.get("tasks.verified");
        return claimed && claimed.length < 1 && done && done.length < 1 && verified && verified.length < 1;
    },

    addTask: function (task) {
        var currentTasks = this.get("tasks.new"),
            currentEstimates = this.get("estimates.new");

        if (_.indexOf(currentTasks, task.id) === -1) {
            this.set({
                "tasks.new": currentTasks.concat(task.id),
                "estimates.new": currentEstimates + task.get("estimate")
            });
        }
        
        return this;
    },
    
    forEachTask: function (iterator){ // iterator is passed the taskId
        var hub = this;
        _.each(Task.states, function(state){
            var tasks = hub.get("tasks." + state);
            if (tasks) {
                _.each(tasks, iterator);
            }
        });
        return this;
    },

    removeTask: function (task, options) {
        var data        = {},
            state       = task.get('state'),
            tasksKey    = 'tasks.' + state,
            estimateKey = 'estimates.' + state;

        data[tasksKey]    = _.without(this.get(tasksKey), task.id);
        data[estimateKey] = this.get(estimateKey) - task.get('estimate');
        
        return this.set(data, options);
    },

    // Updates the hubs tasks and estimates when the state of a task changes.
    updateTasks: function (task) {
        var id = task.id,
            data = {},
            current  = task.get("state"),
            previous = task.previous("state"),
            estimate = task.get("estimate"),
            previousKey = "tasks." + previous,
            previousIds = this.get(previousKey),
            currentKey  = "tasks." + current,
            currentIds;

        // If this hub owns this task.
        if (_.indexOf(previousIds, id) >= 0) {
            // Remove from the previous array of ids.
            data[previousKey] = _.without(previousIds, id);

            // Add to new array of ids.
            currentIds = _.clone(this.get(currentKey));
            currentIds.push(id);
            data[currentKey] = currentIds;

            // Update the estimates.
            data["estimates." + previous] = this.get("estimates." + previous) - estimate;
            data["estimates." + current]  = this.get("estimates." + current)  + estimate;
        }

        return this.set(data);
    },

    estimate: function () {
        var estimate = 0;
        _.each(["new", "claimed", "done"], function (key) {
            estimate += this.get("estimates." + key);
        }, this);
        
        return estimate;
    },

    humanEstimate: function () {
        return humanTimespan(this.estimate());
    },
    
    isArchived: function(){
        // Check presence of boolean property
        // NOTE: this will be correct, even if the server has not yet responded with a timestamp after a request to archive() or unarchive()
        var isArchived = this.get("archived");

        // If temporary flag does not exist, then check if details of the property are present on the model
        if (!_.isBoolean(isArchived)){
            isArchived = !!this.get("archived.timestamp");
        }
        return isArchived;
    },
    
    archive: function() {
        return this.save({archived: true});
    },
    
    unarchive: function() {
        var hub = this;
        
        _.each(this.attributes, function(val, key){
            if (key.indexOf("archived.") === 0){
                hub.unset(key);
            }
        });
        
        return this.save({archived:false});
    },

    // Updates the estimates on a task when changed.
    updateEstimates: function (task) {
        var current  = task.get("estimate"),
            previous = task.previous("estimate"),
            state = task.get("state"),
            key  = "estimates." + state,
            data = {};

        // Check the task belongs to this hub and that it' estimate is not 0. If
        // estimate is 0 then this is a new Task being loaded and the hub
        // should already have accounted for it either getting the value from
        // the server or in #addHub().
        if (_.indexOf(this.get("tasks." + state), task.id) > -1 && previous !== 0) {
            data[key] = this.get(key) - previous + current;
        }
        return this.set(data);
    }
});

// HUBS COLLECTION
var HubList = CollectionModel.extend({
    model: Hub,
    constructor: function HubList(){
        CollectionModel.prototype.constructor.apply(this, arguments);
    }
});

// TASK STATES

var TaskStates = {
    NEW     : "new",
    CLAIMED : "claimed",
    DONE    : "done",
    VERIFIED: "verified"
};

// TODO: we are currently manually setting these, but they should be derived from Tasket.TASK_ESTIMATE_MAX (in core/tasket.js), which itself should be derived from the API call: GET /settings/
var TaskEstimates = [
    {text: "Fifteen minutes", value: 60*15},
    {text: "Half an hour",    value: 60*30},
    {text: "One hour",        value: 60*60},
    {text: "Two hours",       value: 60*60*2},
    {text: "Three hours",     value: 60*60*3},
    {text: "Four hours",      value: 60*60*4}
];

// TASK
var Task = Model.extend({
    // required: owner

    type: "task",

    required: ["owner", "hub", "estimate"],

    defaults: {
        state: TaskStates.NEW,
        description: "",
        image: "",
        // Setting the `estimate` to 0 indicated that it is a new task. This shouldn't be changed, as it used in models/hub.js and app.js to determine if a task has later been updated from the default.
        estimate: 0
    },

    constructor: function Task() {
        Model.prototype.constructor.apply(this, arguments);
    },

    initialize: function(){
        Model.prototype.initialize.apply(this, arguments);
        
        _.bindAll(this, "_changeStateError");
    },
    
    _changeStateError: function(currentState, newState, userid){
        throw this.report(
            "Can't change state from '" + currentState + "' to '" + newState + "'" +
            (userid ?
                "" :
                " (no userid)"
            )
        );
    },

    state: function(newState, userid, force){
        // TODO: change server implementation to allow jumping between states, as long as the required associated properties are also present - e.g. from "claimed" to "verified", as long as claimedBy, doneBy and verifiedBy are all present (should server use passed timestamp?)
        // {"error": ["New and claimed tasks can't be verified"]}
    
        var task = this,
            currentState = this.get("state"),
            timestamp, error, attr, toSet, doneBy, owner;
            
        if (!newState){
            return currentState;
        }
        
        timestamp = Math.round(now() / 1000);
        error = this._changeStateError;
        
        if (!userid){
            error(currentState, newState, userid);
        }
        
        // Use single object of attribute, instead of requesting "get" every time
        attr = this.attributes;
        toSet = {};
        
        // In force mode, use the userid to fill in any *missing* associated users on the Task object (it won't overwrite existing user properties - to that: task.set({claimedBy:"231"});
        // Force mode is useful, for example, to allow auto-verifying of a "done" task when the user did it is an admin or the owner of the hub
        if (force === true){
            // Fill in owner
            if (!attr.owner){
                toSet.owner = userid;
                toSet.createdTime = timestamp;
            }
            // Fill in claimedBy, if task is that advanced
            if (newState !== TaskStates.NEW && !attr.claimedBy){
                toSet.claimedBy = userid;
                toSet.claimedTime = timestamp;
            }
            // Fill in doneBy, if task is that advanced
            if (newState !== TaskStates.NEW && newState !== TaskStates.CLAIMED && !attr.doneBy){
                toSet.doneBy = userid;
                toSet.doneTime = timestamp;
            }
            // Fill in verifiedBy, if task is that advanced
            if (newState === TaskStates.VERIFIED && !attr.verifiedBy){
                toSet.verifiedBy = userid;
                toSet.verifiedTime = timestamp;
            }
        }
        
        // In normal mode, require task states to change only in an ordered manner
        else {
            switch (newState){
                case TaskStates.NEW:
                    // If we're not moving directly from "done" -> "verified", then error
                    if (!attr.owner){
                        toSet.owner = userid;
                    }
                break;
                
                case TaskStates.CLAIMED:
                    if (currentState === TaskStates.NEW){
                        toSet.claimedBy = userid;
                        toSet.claimedTime = timestamp;
                    }
                    else if (!attr.claimedBy){
                        error(currentState, newState, userid);
                    }
                break;
                
                case TaskStates.DONE:
                    if (currentState === TaskStates.CLAIMED){
                        toSet.doneBy = userid;
                        toSet.doneTime = timestamp;
                    }
                    else if (!attr.doneBy){
                        error(currentState, newState, userid);
                    }
                break;
                
                case TaskStates.VERIFIED:
                    // If we're not moving directly from "done" -> "verified", then error
                    if (currentState === TaskStates.DONE){
                        // Set the new user properties on the task
                        toSet.verifiedBy = userid;
                        toSet.verifiedTime = timestamp;
                    }
                    
                    else {
                        error(currentState, newState, userid);
                    }
                break;

                default:
                error(currentState, newState, userid);
            }
        }
        
        // If this task was "done" by its owner, then automatically verify it
        if (Tasket.settings.AUTOVERIFY_TASKS_DONE_BY_OWNER){
            if (newState === TaskStates.DONE){
                doneBy = toSet.doneBy || attr.doneBy;
                owner  = toSet.owner  || attr.owner;
                
                if (doneBy && doneBy === owner){
                    // Force a task state change from "done" => "verfied"
                    return this.state("verified", doneBy, true);
                }
            }
        }

        // Remove unused properties
        switch (newState){
            case TaskStates.NEW:
                this.unset("claimedBy")
                    .unset("claimedTime")
                    .unset("doneBy")
                    .unset("doneTime")
                    .unset("verifiedBy")
                    .unset("verifiedTime");
            break;

            case TaskStates.CLAIMED:
                this.unset("doneBy")
                    .unset("doneTime")
                    .unset("verifiedBy")
                    .unset("verifiedTime");
            break;

            case TaskStates.DONE:
                this.unset("verifiedBy")
                    .unset("verifiedTime");
            break;
        }

        this.previousState = currentState;
        toSet.state = newState;

        return this.set(toSet);
    },

    isOpen: function(){
        return this.state() !== TaskStates.VERIFIED;
    },

    humanEstimate: function () {
        return humanTimespan(this.get("estimate"));
    },
    
    // check whether the task can be deleted
    canDelete: function() {
        return this.get("state") === "new";
    },
    
    star: function() {
        return this.save({starred: true});
    },
    
    unstar: function() {
        var task = this;
        
        _.each(this.attributes, function(val, key){
            if (key.indexOf("starred.") === 0){
                task.unset(key);
            }
        });
        
        return this.save({starred:false});
    },
    
    isStarred: function(){
        // Check presence of boolean property (see also hub.js:isArchived)
        // NOTE: this will be correct, even if the server has not yet responded with a timestamp after a request to star() or unstar()
        var isStarred = this.get("starred");

        // If temporary flag does not exist, then check if details of the property are present on the model
        if (!_.isBoolean(isStarred)){
            isStarred = !!this.get("starred.timestamp");
        }
        return isStarred;
    }
}, {
    ESTIMATES: TaskEstimates
});
Task.states = TaskStates;

// TASKS COLLECTION
var TaskList = CollectionModel.extend({
    model: Task,
    constructor: function TaskList(){
        CollectionModel.prototype.constructor.apply(this, arguments);
    },
    filterByState: function (state) {
        return new TaskList(this.filter(function (task) {
            return task.get("state") === state;
        }));
    },
    toHubTasks: function () {
        var tasks = {};
        _.each(Task.states, function (state) {
           tasks[state] = this.filterByState(state).pluck('id');
        }, this);
        return tasks;
    }
});

// USER
var User = Model.extend({
    type: "user",

    required: ["name"],

    defaults: {
        name: "",
        email: "",
        image: "",
        description: "",
        location: "",
        hubs: {
            owned: []
        },
        tasks: {
            owned: {
                "new": [],
                "claimed": [],
                "done": [],
                "verified": []
            },
            claimed: {
                "claimed": [],
                "done": [],
                "verified": []
            }
        }
    },

    constructor: function User() {
        Model.prototype.constructor.apply(this, arguments);
    },

    initialize: function(){
        Model.prototype.initialize.call(this, arguments);
        _.bindAll(this, "updateTasks");
        Tasket.bind("task:change:state", this.updateTasks);
    },

    // Returns true if user has claimed less tasks than the limit allows.
    canClaimTasks: function () {
        var limit = Tasket.settings.CLAIMED_LIMIT;
        return limit === -1 || this.get("tasks.claimed.claimed").length < limit;
    },
    
    isAdmin: function(){
        return this.get("admin");
    },
    
    fullname: function(){
        return this.get("name") || this.get("username") || "";
    },

    // Updates the users tasks when the state of a task changes
    updateTasks: function (task) {
        var id = task.id,
            data = {},
            current  = task.get("state"),
            previous = task.previous("state"),
            newlyClaimed = (previous === Task.states.NEW) && (task.get("claimedBy") === this.id);

        _.each(["owned", "claimed"], function (group) {
            var previousKey = "tasks." + group + "." + previous,
                previousIds = this.get(previousKey),
                currentKey  = "tasks." + group + "." + current,
                currentIds;

            // If the task is in the array of previous ids or we're iterating
            // through the claimed tasks and this is a new one (in which case
            // it won't be in an array) then update the data.
            if (_.indexOf(previousIds, id) >= 0 || (group === "claimed" && newlyClaimed)) {
                data[previousKey] = _.without(previousIds, id);

                // When a task is rejected, it moves back to a "new" state. There is no "claimed.new" collection, so skip
                if (currentKey !== "tasks.claimed." + Task.states.NEW) {
                    currentIds = _.clone(this.get(currentKey));
                    if (_.indexOf(currentIds, id) < 0) {
                        currentIds.push(id);
                    }
                    data[currentKey] = currentIds;
                }
            }
        }, this);
        
        return this.set(data);
    },

    // Removes the task from the current users tasks.
    removeTask: function (task, options) {
        var data = {};

        _.each(["owned", "claimed"], function (group) {
            var key = "tasks." + group + "." + task.get("state"),
                ids = this.get(key);

            if (_.indexOf(ids, task.id) > -1) {
                data[key] = _.without(ids, task.id);
            }
        }, this);

        return this.set(data, options);
    },
    
    getNonArchivedHubs: function(){
        return _.difference(this.get("hubs.owned"), this.get("hubs.archived"));
    }
});

// USERS COLLECTION
var UserList = CollectionModel.extend({
    model: User,
    constructor: function UserList(){
        CollectionModel.prototype.constructor.apply(this, arguments);
    }
});


// Intended as v2 of /dependencies.forcedirector.js - to be merged into that file once an appropriate API is settled on. The ForceDirector GUI app will need updating at that time

(function(){
    var noop = function(){};

    
    ForceDirector.prototype.v = 2;
    
    ForceDirector.prototype.setWalls = function(dimensions){
        if (!dimensions){
            this.wallsFlag = false;
        }
        else {
            _.extend(this, {
                wallsFlag: true,
                top:    ~~(dimensions.top), // NOTE: ~~(n) === Math.floor(n) but faster
                bottom: ~~(dimensions.bottom),
                left:   ~~(dimensions.left),
                right:  ~~(dimensions.right)
            });
        }
        return this;
    };
    
    ForceDirector.prototype.getWalls = function(){
        return {
            top: this.top,
            bottom: this.bottom,
            left: this.left,
            right: this.right
        };
    };
    
    ForceDirector.prototype.triggerLoopStart = ForceDirector.prototype.triggerLoopEnd = ForceDirector.prototype.triggerLoop = noop;
    
    
    // Rename existing methods
    ForceDirector.prototype.createNode = ForceDirector.prototype.addTask;
    ForceDirector.prototype.createSun = ForceDirector.prototype.addProject;
    ForceDirector.prototype.createSatellite = ForceDirector.prototype.addTaskToProject;
    
    ForceDirector.prototype.looping = false;
    
    ForceDirector.create = function(options){
        var f = new ForceDirector(),
            defaultSettings = {
                fps: 60,
                numCycles: 200,
                updateStepMin: 0.3,
                updateStepMax: 1,
                updateStepDamping: 0.00001,
                animate: false
                
                // engine settings
                /*
                inCoulombK: 50,
                inWallRepulsion: 600,
                inVelDampK: 0.01
                */
            },
            easing, intervalRef, i;

        // Combine options with default settings
        options = _.defaults(options || {}, defaultSettings);
        
        f.options = options;

        function stopLoop(){
            f.looping = false;
            
            if (intervalRef){
                window.clearInterval(intervalRef);
                intervalRef = null;
            }
            
            // This method can be overriden, to provide a trigger callback
            f.triggerLoopEnd();
        }

        function loop(){
            i++;
            
            f.updateCycle(options.updateStepMin + easing);
            easing = easing - (easing * options.updateStepDamping);
            
            if (i < options.numCycles){
                if (options.animate){
                    f.triggerLoop();
                }
                else {
                    loop();
                }
            }
            else {
                stopLoop();
            }
        }
        
        function startLoop(newOptions){
            f.looping = true;
            
            if (newOptions){
                options = _.extend(options, newOptions);
                this.setWalls(options.walls);
            }
            
            i = 0;
            easing = options.updateStepMax - options.updateStepMin;
            
            if (options.inVelDampK){
                f.inVelDampK = options.inVelDampK;
            }
            if (options.inHookeK){
                f.inHookeK = options.inHookeK;
            }
            if (options.inWallRepulsion){
                f.inWallRepulsion = options.inWallRepulsion;
            }
            if (options.inBBRepulsion){
                f.inBBRepulsion = options.inBBRepulsion;
            }
            
            // This method can be overriden, to provide a trigger callback
            f.triggerLoopStart();
            
            if (options.animate){
                intervalRef = window.setInterval(loop, 1000 / options.fps);
            }
            
            loop();
        }
        
        f.go = startLoop;
        return f;
    };
}());

// FORCE-DIRECTOR extension for Backbone.js
    
// Extend ForceDirector with event bindings
_.extend(ForceDirector.prototype, Backbone.Events);

// Override noop methods in ForceDirector prototype to allow triggering of events on loop start and end
ForceDirector.prototype.triggerLoopStart = function(){
    return this.trigger("start", this);
};

ForceDirector.prototype.triggerLoopEnd = function(){
    return this.trigger("end", this);
};

ForceDirector.prototype.triggerLoop = function(){
    return this.trigger("loop", this);
};

// ABSTRACT VIEW
var View = Backbone.View.extend({
    // GET/SET
    
    defaults: {},
    
    getset: function(property, value){
        return _.isUndefined(value) ? this.get(property) : this.set(property, value);
    },
    
    get: function(property){
        var value = this.options[property];
        return _.isUndefined(value) ? this.defaults[property] : value;
    },
    
    set: function(property, value){
        this.options[property] = value;
        this.trigger("change", property, value);
        return this;
    },
    
    render: function () {
        return this.el;
    },
    
    /////
    
    // Set hash location
    updateLocation: function(){
        app.trigger("request:change:location", this);
        return this;
    },
    
    /////
    
    // OFFSET
    
    offsetValues: function(offset){
        return this.getset("offset", offset);
    },
    
    offsetApply: function(){
        var offset = this.get("offset");
        if (offset){ // only apply offset if it is not the default
            this.elem.css({
                top:  offset.top + "px",
                left: offset.left + "px"
            });
        }
        return this;
    },
    
    offset: function(offset){ // TODO: ensure HubElem or tasksCollection has position:relative
        if (offset){
            return this
                .offsetValues(offset)
                .offsetApply();
        }
        return this.get("offset") || {
            top:  this.defaults.offsetTop || 0,
            left: this.defaults.offsetLeft || 0
        };
    },
    
    
    /////
    
    initialize: function(options){
        this.elem = jQuery(this.el);
        if (this.model && this.model.type && this.model.id){
            this.elem.attr("data-model", this.model.type + "-" + this.model.id);
        }
    }
});

/* Public: A tank view to handle the display of the Tank. Currently only
 * handles panning of the view but over time many of the TankController
 * methods could be moved into here.
 *
 * options - An options object to be passed into the constructor.
 *           el: An Element to use in the view. Usually "body".
 *
 * Examples
 *
 *   var tank = new Tank({el: $("body")});
 *
 * Returns a new instance of the Tank view.
 */
var Tank = View.extend({

    /* View event listeners. */
    events: {
        "mousedown": "_onMouseDown"
    },

    /* Classes for setting view state. */
    classes: {
        panning: 'panning'
    },

    /* Initialises the Tank view object.
     *
     * options - An options element for the view.
     *
     * Returns nothing.
     */
    constructor: function TankView() {
        View.apply(this, arguments);

        _.bindAll(this, "_onMouseMove", "_onMouseUp");

        this._viewport = jQuery(window);
        this._document = jQuery(document);
    },

    /* Public: Triggers the "pan" event providing an offset object so the
     * application can update the view accordingly.
     *
     * offset - An offset object with "top" and "left" properties.
     *
     * Examples
     *
     *   tank.pan({top: -30, left: -5});
     *
     * Returns itself.
     */
    pan: function (offset) {
        return this.trigger('pan', {
            top:  -offset.top,
            left: -offset.left
        });
    },

    /* Mouse event listener; waits for a mousedown event and binds further
     * listeners to handle the panning of the tank view.
     *
     * event - A mouse jQuery.Event object.
     *
     * Returns nothing.
     */
    _onMouseDown: function (event) {
        var isTarget = event.target === this.el,
            hasPointerEvents = supportsPointerEvents(),
            offset;

        if ((hasPointerEvents && !isTarget) || (!hasPointerEvents && !this._isTarget(event.target))) {
            return;
        }

        offset = this._getEventOffset(event);
        this._mouseOffset = offset;
        this._viewport.bind({
            'mouseup.pan': this._onMouseUp,
            'mousemove.pan': this._onMouseMove
        });
        this.elem.addClass(this.classes.panning);
        event.preventDefault();
    },

    /* Mouse event listener; calculates the new mouse position compared to the
     * previous one and calls #pan() to update the viewport.
     *
     * event - A mouse jQuery.Event object.
     *
     * Returns nothing.
     */
    _onMouseMove: function (event) {
        var _this = this, offset;
        if (this._throttled || !this._mouseOffset) {
            return;
        }

        offset = this._getEventOffset(event);

        this.pan(this._getOffsetDiff(this._mouseOffset, offset));

        this._mouseOffset = offset;
        this._throttled = setTimeout(function () {
            delete _this._throttled;
        }, 1000 / 60);
    },

    /* Mouse event listener; handles the unbinding and removal of classes
     * when the user raises the mouse.
     *
     * event - A mouse jQuery.Event object.
     *
     * Returns nothing.
     */
    _onMouseUp: function (event) {
        delete this._mouseOffset;
        this._document.unbind('.pan');
        this.elem.removeClass(this.classes.panning);
    },

    /* Returns an offset object with top and left properties similar
     * to jQuery.fn.offset().
     *
     * event - A mouse event object.
     *
     * Returns an offset Object.
     */
    _getEventOffset: function (event) {
        // User clientX/clientY to prevent juddering as the scroll position
        // is constantly varying.
        return {
            top:  event.clientY,
            left: event.clientX
        };
    },

    /* Calculates the difference between two offset objects and returns the
     * difference as a new offset.
     *
     * offsetA - An offset object with "top" and "left" properties.
     * offsetB - The second offset to compare against offsetA
     *
     * Returns an offset object.
     */
    _getOffsetDiff: function (offsetA, offsetB) {
        return {
            top:  offsetA.top  - offsetB.top,
            left: offsetA.left - offsetB.left
        };
    },

    /* Fallback method if the browser does not support the pointer-events
     * CSS property we must manually calculate whether or not the mousedown
     * event was on the tank and not another UI element.
     *
     * target - The clicked Element.
     *
     * Returns true if the target is a background element.
     */
    _isTarget: function (target) {
        var element = jQuery(target);
        return (
            target === this.el ||
            element.parents('#vector').length ||
            element.is('.hub-marker-container')
        );
    }
});

var HubView = View.extend({
    tagName: "article",
    className: "hub",

    defaults: {
        selected: false
    },

    events: {
        "click a.nucleus-wrapper": "onclick",
        "click hgroup": "updateLocation"
    },

    constructor: function HubView() {
        View.prototype.constructor.apply(this, arguments);
    },

    initialize: function () {
        View.prototype.initialize.apply(this, arguments);

        _.bindAll(this, "updateWalls", "repositionTasks", "refreshTasks", "updateImage", "updateTitle", "updateDescription", "updateEstimate", "updateName", "updateAdminActions", "_onTaskRemoved", "setTaskViewOffsetFromForcedNode");
        
        // **
        
        // Force director for tasks around a hub
        this.forceDirector = ForceDirector.create({
            animate: app.animateTasks,
            numCycles: 400,
            inCoulombK: 750,
            updateStepMin: 0.2,
            updateStepMax: 2,
            updateStepDamping: 0.01,
            inVelDampK: 0.1,
            inHookeK: 0.1,
            inWallRepulsion: 500,
            inBBRepulsion:500
        });
        
        // Add hub node
        this.forcedNode = this.forceDirector.createSun({
            key: "hub-" + this.model.id
        });
        
        this.forceDirector
            .bind("loop", this.repositionTasks)
            .bind("end", this.repositionTasks);
            
        app.tank
            .bind("resize", this.updateWalls)
            .bind("change:walls", this.updateWalls);
            
        this.bind("change:walls", this.repositionTasks);
        
        this.updateWalls(app.tank, app.tank.forceDirector.getWalls());
        
        
        // **
        

        this.model
            .bind("change:title", this.updateTitle)
            .bind("change:description", this.updateDescription)
            .bind("change:image", this.updateImage)
            .bind("delete:task", this._onTaskRemoved)
        
            // hasChanged() function is in core/core.js
            .bind("change", hasChanged(["estimates.new", "estimates.claimed", "estimates.done", "estimates.verified"], this.updateEstimate))
            .bind("change", hasChanged(["tasks.new", "tasks.claimed", "tasks.done", "tasks.verified"], this.refreshTasks));

        app.bind("change:currentUser", this.updateAdminActions);
    },
    
    updateWalls: function(tank, dimensions){
        var currentWalls = this.forceDirector.getWalls();
        
        if (!_.isEqual(currentWalls, dimensions)){
            this.forceDirector.setWalls(dimensions);
            this.trigger("change:walls");
        }
        
        return this;
    },

    updateTitle: function () {
        this.$("h1").html(this.model.escape("title"));
        return this._updateMargin();
    },

    updateDescription: function () {
      var description = this.$("hgroup h2"),
          text = app.truncate(this.model.get("description"), app.hubDescriptionTruncate);

      description.html(escapeHTML(text));
      return this._updateMargin();
    },

    updateImage: function () {
        this.$("img.nucleus").attr("src", this.imageSrc());
        return this;
    },

    updateEstimate: function () {
        var estimate = this.model.humanEstimate();
        this.$(".estimate").text(estimate ? (app.lang.ESTIMATED_TIME + estimate) : app.lang.HUB_NO_TASKS);
        return this;
    },
    
    updateName: function (user) {
        var name;
        if (app.isCurrentUserOrAdmin(user.id)) {
            name = "you";
        } else {
            name = user.fullname();
        }
        this.$(".name").text("Created by " + name);
        return this;
    },

    updateAdminActions: function () {
        var currentUser = app.currentUser,
            controls = this.$("hgroup"),
            actions  = controls.find(".admin-actions"),
            canEdit  = app.isCurrentUserOrAdmin(this.model.get("owner"));

        if (canEdit && !actions.length) {
            controls.prepend(tim("hub-admin-actions", {id: this.model.id}));
        }
        else if (!canEdit && actions.length) {
            actions.remove();
        }

        return this._updateMargin();
    },

    imageSrc: function(src){
        if (src){
            return this.set({
                image:src
            });
        }
        src = this.model.get("image");

        // Return cropped thumbnail or placeholder if no image.
        return src ?
            Tasket.thumbnail(src, app.hubImageWidth, app.hubImageHeight, true) :
            Tasket.media(app.hubPlaceholderImage);
    },

    isSelected: function(){
        return this.get("selected");
    },

    tasksVisible: function(){
        return !!this.get("tasksVisible");
    },

    onclick: function (event) {
        if (this.isSelected()){
            this.sendToFront().toggleTasks();
        }
        else {
            this.updateLocation();
            // this changes the location hash, which causes the controller to trigger the route "displayHub"
        }
        event.preventDefault();
    },

    showTasks: function (options) {
        this.select();
        
        if (this.tasksVisible()) {
            return this;
        }

        if (!options || !options.silent){
            this.set("tasksVisible", true);
        }

        if (!this.tasks || !this.taskViews) {
            this.refreshTasks();
        }

        if (this.tasks.isComplete()) {
            if (this.tasks.length){
                this.renderTasks();
            }
            return this;
        }

        return this.loading();
    },

    toggleTasks: function(){
        if (this.tasksVisible()){
            return this.clearTasks();
        }
        return this.showTasks();
    },

    toggleSelected: function(){
        if (this.isSelected()){
            return this.deselect();
        }
        return this.select();
    },

    loading: function (active) {
        var method = (active === false) ? "removeClass" : "addClass";
        this.elem[method]("loading");
        return this;
    },

    select: function(){
        if (!this.isSelected()){
            this.set("selected", true);
            this.elem.addClass("select");
            this.trigger("select", this);
        }
        return this;
    },

    deselect: function(){
        if (this.isSelected()){
            this.set("selected", false);
            this.elem.removeClass("select");
            this.clearTasks();
            this.trigger("deselect", this);
        }
        return this;
    },
    
    // TODO: tidy this up, and merge with refreshTasks
    redrawTasks: function(){
        this.cacheTaskViewCenterBounds()
            .clearTasks({silent:true})
            .renderTasks(true);
    },

    refreshTasks: function () {
        var hubView = this,
            tasks;

        function display(){
            if (hubView.tasksVisible()) {
                hubView
                    .removeForceDirectedTaskNodes()
                    .generateTaskViews()
                    .cacheTaskViewCenterBounds()
                    .clearTasks({silent:true})
                    .renderTasks();
            }
        }

        tasks = this.tasks = Tasket.getTasks(this.getDisplayTasks());

        if (tasks.isComplete()){
            display();
        }

        tasks.bind("reset", display);

        return this;
    },

    // Gets an array of task ids to display from the model object.
    getDisplayTasks: function () {
        return _(["new", "claimed", "done"])
          .chain().map(function (key) {
              return this.get("tasks." + key);
          }, this.model)
          .flatten()
          .value();
    },

    generateTaskViews: function(){
        this.taskViews = _( // NOTE: this.taskViews is an Underscore collection
            this.tasks.select(function (task) {
                return task.isOpen();
            })
            .map(function(task){
                return new TaskView({
                    model: task
                });
            })
        );
        return this;
    },

    clearTasks: function(options){
        this.clearLines();
        this.taskListElem.empty();

        if (!options || !options.silent){
            this.set("tasksVisible", false);
        }
        return this;
    },
    
    line: function(x, y){
        var offset = this.offset();
        app.tank.addSVGLine(offset.left, x, offset.top, y);
        return this;
    },
    
    clearLines: function(){
        app.tank.clearSVG();
        return this;
    },
    
    // TODO: instead of recreating line elements each time, instead change their positions
    // TODO: profile calls to this function and reduce as much as possible.
    drawLines: function(){
        var hubView = this,
            hubOffset = this.offset(),
            hubOffsetLeft = hubOffset.left,
            hubOffsetTop = hubOffset.top;
    
        this.clearLines();
        this.taskViews.each(function(taskView){
            var taskOffset = taskView.offset();
            hubView.line(hubOffsetLeft + taskOffset.left + taskView.width / 2, hubOffsetTop + taskOffset.top + taskView.height / 2);
        });
        return this;
    },

    // Vertically centres the hub title/description.
    _updateMargin: function () {
        this.labelElem.css("margin-top", this.labelElem.outerHeight() / 2 * -1);
        return this;
    },

    sendToFront: function () {
        // Increase the z-index to always ensure the latest one is on top.
        HubView.zIndex += 1;
        this.elem.css("z-index", HubView.zIndex);
        return this;
    },

    // A listener triggered by the model's removeTask function    
    _onTaskRemoved: function(hub, task){
        this.taskViews = this.taskViews.chain().reject(function(taskView){
            if (taskView.model.id === task.id){
                taskView.remove();
                return true;
            }
        });
        return this.removeForceDirectorNode("task-" + task.id).forcedirectTasks();
    },

    cacheDimensions: function(){
        // NOTE: these calculations require this.elem to be present in the document's DOM, for CSS styling
        this.nucleusWidth = this.nucleusElem.outerWidth(); // TODO: cache on app, as this is the same for all hubs - deliberately not outerWidth(true), due to negative margin oddities
        this.descriptionWidth = this.labelElem.outerWidth(); // dimensions of collapsed label
        this.descriptionHeight = this.labelElem.outerHeight(); // dimensions of collapsed label
        this.descriptionOffset = this.labelElem.offset(); // dimensions of collapsed label
        this.width = (this.nucleusWidth / 2) + this.descriptionWidth;
        this.height = this.nucleusWidth; // NOTE height currently does not take description into account
    },

    // Get the bounding box of the centre points of each of the taskViews
    cacheTaskViewCenterBounds: function(){
        var taskViewCenterBounds = this.taskViewCenterBounds = {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        };

        this.taskViews.each(function(taskView){
            var centerX = taskView.offset().left + taskView.width / 2,
                centerY = taskView.offset().top + taskView.height / 2;

            if (centerY < taskViewCenterBounds.top){
                taskViewCenterBounds.top = centerY;
            }
            if (centerY > taskViewCenterBounds.bottom){
                taskViewCenterBounds.bottom = centerY;
            }
            if (centerX < taskViewCenterBounds.left){
                taskViewCenterBounds.left = centerX;
            }
            if (centerX > taskViewCenterBounds.right){
                taskViewCenterBounds.right = centerX;
            }
        });

        return this;
    },

    renderTasks: function(doForceDirection){
        var hubView = this,
            taskViews = this.taskViews,
            forceDirectionNeeded, lineWidth, taskViewCenterBounds;

        this.loading(false);
        
        // Detect if any of the tasks has not been force-directed yet
        forceDirectionNeeded = doForceDirection === true || this.taskViews.any(function(taskView){
            return !taskView.forcedNode;
        });
        
        taskViews.each(function(taskView){
            hubView.appendTaskView(taskView);
        });

        if (forceDirectionNeeded){
            this.forcedirectTasks();
        }
        else {
            this.setAllTaskViewsOffset();
            this.drawLines();
        }
        
        return this;
    },

    render: function(){
        var data = this.model.toJSON(),
            estimate = this.model.humanEstimate(),
            userModel, updateName, model;

        data.estimate = estimate ? (app.lang.ESTIMATED_TIME + estimate) : app.lang.HUB_NO_TASKS;
        data.isSelected = this.isSelected();
        data.readmore = data.description.length > app.hubDescriptionTruncate;
        data.description = app.truncate(data.description, app.hubDescriptionTruncate);
        data.image = this.imageSrc();
        data.hubId = this.model.id;
        
        data.hasName = app.showCreatedByOnHubs;
        if (!!data.hasName) {
            if (app.isCurrentUserOrAdmin(data.owner)) {
                data.name = "you";
            } else {
                userModel = Tasket.getUsers(data.owner); 
                data.name = userModel.fullname();
                if (!data.name) {
                    updateName = this.updateName;
                    model = this;
                    userModel.bind("change", function(user){
                        updateName.call(model, user);
                    });
                }
            }
        }

        this.elem.html(tim("hub", data));
        this.nucleusElem = this.elem.children("a.nucleus-wrapper");
        this.tasksElem = this.$("div.tasks");
        this.taskListElem = this.tasksElem.children("ul");
        this.labelElem = this.$("hgroup");

        this.offsetApply();
        this.cacheDimensions();
        this.updateAdminActions();
        this._updateMargin();

        if (data.isSelected){
            this.renderTasks();
        }
        return this;
    },

    hubDetailsHTML: function(){
        var data = this.model.toJSON(),
            estimate = this.model.humanEstimate(),
            userModel;

        data.description = "{description}";
        data.estimate = (estimate) ? app.lang.ESTIMATED_TIME + estimate : app.lang.HUB_NO_TASKS;
        data.hubId = this.model.id;
        
        data.hasName = app.showCreatedByOnHubs;
        if (!!data.hasName) {
            if (app.isCurrentUserOrAdmin(data.owner)) {
                data.name = "you";
            } else {
                userModel = Tasket.getUsers(data.owner); 
                data.name = userModel.fullname();
            }
        }

        return tim("hub-detail", data)
          .replace("{description}", nl2br(this.model.escape("description")));
    },
    
    displayDetails: function(){
        app.lightbox
            .content(this.hubDetailsHTML())
            .show();
            
        return this;
    },

    /* Public: Returns a bounds object for the hub. With top, left, width and
     * height as properties.
     *
     * Examples
     *
     *   hubView.getBounds();
     *
     * Returns an object.
     */
    getBounds: function () {
        var bounds = this._bounds, nucleus, offset;
        if (!bounds) {
            this._bounds = bounds = {};

            offset = this.elem.offset();
            nucleus = this.$(".nucleus-wrapper");

            bounds.top    = offset.top  + parseFloat(nucleus.css("margin-top"));
            bounds.left   = offset.left + parseFloat(nucleus.css("margin-left"));
            bounds.width  = this.width;
            bounds.height = this.height;
        }
        return bounds;
    },

    /* Public: Returns an offset for the center of the hub relative to the
     * tank (document body).
     *
     * Examples
     *
     *   hubView.getCenter(); //=> {top: 20, left: 200}
     *
     * Returns an offset object with top and left properties.
     */
    getCenter: function () {
        var icon = this.$('.nucleus-wrapper'),
            offset = icon.offset();

        offset.top  = offset.top  + (icon.outerHeight(true));
        offset.left = offset.left + (icon.outerWidth(true));
        return offset;
    },

    /////
    
    // FORCE-DIRECTION PHYSICS
    // TODO: totally refactor these, and related methods in controllers.js
    
    removeForceDirectorNode: function(key){
        if (this.forceDirector){
            this.forceDirector.nodes = _.reject(this.forceDirector.nodes, function(node){
                return node.key === key;
            });
        }
        return this;
    },
    
    removeForceDirectedTaskNodes: function(){
        if (this.forceDirector){
            this.forceDirector.nodes = _.reject(this.forceDirector.nodes, function(node){
                return node.key.indexOf("task-") === 0;
            });
        }
        return this;
    },
    
    repositionTasks: function(){
        if (this.taskViews && this.tasksVisible()){
            this.setAllTaskViewsOffset();
            this.drawLines();
        }
        
        return this;
    },

    updateForceDirectedDimensions: function(){
        var hubNodeForTasks = this.forcedNode,
            hubNodeForOtherHubs, taskBuffer, pos;
    
        if (hubNodeForTasks){
            this.cacheDimensions();
            
            hubNodeForOtherHubs = this.forcedNodeHubToHub;
            taskBuffer = app.taskBuffer;
            /*
            hubBuffer = app.hubBuffer;
            bufferDiff = taskBuffer * 2 - hubBuffer * 2;
            */
            pos = hubNodeForOtherHubs.getPos();
            hubNodeForTasks.setWidth(hubNodeForOtherHubs.width + taskBuffer * 2);
            hubNodeForTasks.setHeight(hubNodeForOtherHubs.height + taskBuffer * 2);
            hubNodeForTasks.setPos(pos.x, pos.y);
        }

        return this;
    },

    // TODO: addTask needed
    // appendTaskView to the DOM. It will be later removed when the hubView is de-selected
    appendTaskView: function(taskView){
        var taskBuffer = app.taskBuffer,
            model = taskView.model,
            taskElem = taskView.elem,
            hubNode = this.forcedNode,
            hubViewOffset, oppositeCorner;
            
        taskView.render();
        taskElem.appendTo(this.taskListElem);

        // Set up force-direction on this taskView, if not yet done
        if (!taskView.forcedNode){
            hubViewOffset = this.offset();
            taskView.cacheDimensions();
            // Set far away from the hub, to distribute tasks better
            // TODO: radiate around the hub, to achieve better spread
            oppositeCorner = {
                left: (hubViewOffset.left < app.tank.width / 2 ? app.tank.wallRight : app.tank.wallLeft),
                top:  (hubViewOffset.top < app.tank.height / 2 ? app.tank.wallTop   : app.tank.wallBottom)
            };
            
            taskView.forcedNode = this.forceDirector.createSatellite({
                key: "task-" + model.id,
                width: taskView.width + taskBuffer * 2,
                height: taskView.height + taskBuffer * 2,
                x: oppositeCorner.left + Math.random(), // random seed for dispersing tasks in forceDirector
                y: app.invertY(oppositeCorner.top + Math.random())
            }, "hub-" + this.model.id);
        }
        return this;
    },
    
    setAllTaskViewsOffset: function(){
        if (this.taskViews){
            this.taskViews.each(this.setTaskViewOffsetFromForcedNode);
        }
        return this;
    },
    
    setTaskViewOffsetFromForcedNode: function(taskView){
        var node = taskView.forcedNode,
            pos = node.getPos(),
            hubViewOffset = this.offset();
            
        taskView.cacheDimensions().offset({
            left: ~~(pos.x - hubViewOffset.left - node.width / 2), // NOTE: ~~n === Math.floor(n)
            top: app.invertY(~~pos.y + hubViewOffset.top + this.nucleusWidth / 2)
        });
        
        return this;
    },

    forcedirectTasks: function(){
        if (this.taskViews){
            this.updateForceDirectedDimensions();
            this.forceDirector.go();
            this.cacheTaskViewCenterBounds();
        }
        return this;
    }
    
}, {
    /* Global keeping check of the current z-index */
    zIndex: 0,
    hubIdInUrlRegex: /\/(\d+)\/$/
});

var TaskView = View.extend({
    tagName: "li",
    className: "task",

    defaults: {},

    events: {
        "click": "updateLocation"
    },

    constructor: function TaskView() {
        View.prototype.constructor.apply(this, arguments);
    },

    initialize: function () {
        View.prototype.initialize.apply(this, arguments);

        _.bindAll(this, "render", "updateClaimedBy", "updateCreatedBy", "updateEstimate", "updateControls");

        // Bind change events to a user model so that the task controls will
        // update disabled state when the users claimed tasks change.
        function applyUserBindings(user) {
            if (user) {
                user.bind("change:tasks.claimed.claimed", this.updateControls);
            }
        }

        this.model.bind("change", this.render);
        app.bind("change:currentUser", _.bind(function (user) {
            applyUserBindings.call(this, user);
            this.render();
        }, this));
        applyUserBindings.call(this, app.currentUser);
    },

    // Redirect to hub view URL - may go to a Task specific URL in future
    updateLocation: function(){
        app.tank.getHubView(this.model.get("hub")).updateLocation();
        return this;
    },

    cacheDimensions: function(){
        this.width = this.elem.outerWidth();
        this.height = this.elem.outerHeight();
        return this;
    },

    render: function(){
        var data = this.model.toJSON();

        data.isNew = this.model.isNew();
        data.isNotNew = !this.model.isNew();

        data.hubId = data.hub;
        data.canEdit = app.isCurrentUserOrAdmin(data.owner);
        data.isClaimed = !!data.claimedBy;
        data.estimate = this.model.humanEstimate();
        data.readmore = data.description.length > app.taskDescriptionTruncate;
        data.description = app.truncate(data.description, app.taskDescriptionTruncate);
        data.showCreatedBy = app.showCreatedByOnTasks;

        this.elem.html(tim("task", data));

        this.updateClaimedBy();
        this.updateCreatedBy();
        this.updateControls();
        return this.offsetApply();
    },

    taskDetailsHTML: function(){
        var data = this.model.toJSON(),
            hub, userModel;

        data.isNew = this.model.isNew();
        data.isNotNew = !this.model.isNew();

        data.hubId = data.hub;
        
        // Add title of the hub
        hub = Tasket.hubs.get(data.hub);
        data.hubTitle = hub ? hub.get("title") : "";
        data.hasHubTitle = !!data.hubTitle;
        
        data.canEdit = app.isCurrentUserOrAdmin(data.owner);
        data.isClaimed = !!data.claimedBy;
        data.description = "{description}";
        data.estimate = this.model.humanEstimate();
        
        data.hasName = app.showCreatedByOnTasks;
        if (!!data.hasName) {
            if (app.isCurrentUserOrAdmin(data.owner)) {
                data.name = "you";
            } else {
                userModel = Tasket.getUsers(data.owner); 
                data.name = userModel.fullname();
            }
        }
        
        return tim("task-detail", data)
          .replace("{description}", nl2br(this.model.escape("description")));
    },
    
    displayDetails: function(){
        app.lightbox
            .content(this.taskDetailsHTML())
            .show();
            
        return this;
    },

    updateEstimate: function () {
        this.$(".estimate").text(this.model.humanEstimate());
    },
    
    updateControls: function () {
        var currentUser = app.currentUser,
            controls    = this.$(".controls"),
            template    = tim("task-control"),
            states      = Task.states,
            state       = this.model.get("state"),
            owner       = this.model.get("owner"),
            claimedById = this.model.get("claimedBy"),
            isLoggedIn  = !!currentUser,
            isDisabled  = false,
            data;

        if (state === states.NEW) {
            isDisabled = !(currentUser && currentUser.canClaimTasks());
            data = {
                id: this.model.id,
                type: "claimed",
                text: "I'll do it",
                state: Task.states.CLAIMED,
                title: (function () {
                    if (!currentUser) {
                        return "Please log in to start claiming tasks.";
                    }
                    else if (!currentUser.canClaimTasks()) {
                        return "You cannot claim this task just now. Please complete one of the " + Tasket.settings.CLAIMED_LIMIT + " tasks that you've claimed first.";
                    }
                    return "";
                }())
            };
        }
        else if (state === states.CLAIMED && app.isCurrentUser(claimedById)) {
            data = {
                id: this.model.id,
                cancelTask: app.lang.CANCEL_TASK
            };
            controls.html(tim("task-control-claimed-by-you", data));
            return this;
        }
        else if (state === states.DONE && app.isCurrentUserOrAdmin(owner)) {
            data = {
                id: this.model.id
            };
            controls.html(tim("task-control-verified", data));
            return this;
        }

        if (data) {
            data.isDisabled = isDisabled;
            controls.html(tim("task-control", data));
        } else {
            controls.empty();
        }

        return this;
    },

    userImageSrc: function(user){
        var src = user.get("image");
        return src ?
            Tasket.thumbnail(src, app.userInTaskImageWidth, app.userInTaskImageHeight, true) :
            Tasket.media(app.userPlaceholderImage);
    },

    updateClaimedBy: function () {
        var templateName = "task-claimed-by-user",
            claimedById = this.model.get("claimedBy"),
            isDone = !!this.model.get("doneTime"),
            image,
            status,
            additional = "",
            model;

        if (!claimedById) {
            return this;
        }

        if (app.isCurrentUser(claimedById)) {
            model = app.currentUser;
            templateName = "task-claimed-by-you";

            if (isDone){
                status = "have done";
                additional = "It needs to be verified by an admin.";
            }
            else {
                status = "are doing";
            }
        } else {
            model = Tasket.getUsers(claimedById);
            model.bind("change", this.updateClaimedBy);
            status = isDone ? "has done" : "is doing";
        }

        
        this.$(".claimedBy").html(tim(templateName, {
            id: model.id,
            name: model.fullname(),
            image: this.userImageSrc(model),
            status: status,
            additional: additional,
            url: model.url()
        }));

        return this;
    },
    
    updateCreatedBy: function () {
        var templateName = "task-created-by-user",
            createdById = this.model.get("owner"),
            image,
            status = "created",
            additional = "",
            model;
            
        if (!app.showCreatedByOnTasks) {
            return this;
        }
            
        if (app.isCurrentUser(createdById)) {
            model = app.currentUser;
            templateName = "task-created-by-you";
        } else {
            model = Tasket.getUsers(createdById);
            model.bind("change", this.updateCreatedBy);
        }

        this.$(".createdBy").html(tim(templateName, {
            id: model.id,
            name: model.fullname(),
            image: this.userImageSrc(model),
            status: status,
            additional: additional,
            url: model.url()
        }));

        return this;
    }
    
});


var Notification = Backbone.View.extend({
    tagName: "div",
    className: "notification",

    events: {
        'click .close': 'hide'
    },

    initialize: function () {
        this.elem = jQuery(this.el);
        this.render();
        this.contentElem = this.elem.find(".notification-content");
        app.bodyElem.prepend(this.elem);
        _.bindAll(this, "_onKeyPress");
    },

    render: function () {
        this.elem.html('<div class="notification-content"></div><button class="close">Close</button>');
        return this;
    },

    message: function (message) {
        this.contentElem.html(message);
        return this;
    },

    status: function (status) {
        var elem = this.elem,
            statuses = Notification.status;
        
        status = status || statuses.SUCCESS;
        
        if (!elem.hasClass(status)) {
            _(statuses).each(function (value) {
                elem.removeClass(value);
            });
            elem.addClass(status);
        }
        return this;
    },

    show: function (message, status) {
        if (!_.isUndefined(message)){
            this.message(message);
        }
        if (!_.isUndefined(status)){
            this.status(status);
        }
        
        jQuery(window).bind('keyup', this._onKeyPress);
        app.bodyElem.addClass('show-notification');
        return this;
    },

    hide: function () {
        jQuery(window).unbind('keyup', this._onKeyPress);
        app.bodyElem.removeClass('show-notification');
        return this;
    },
    
    success: function (message) {
        var hideDelay = app.successNotificationHideDelay,
            notification = this;
            
        this.show(message, Notification.status.SUCCESS);
        if (hideDelay){
            window.setTimeout(function(){
                notification.hide();
            }, hideDelay);
        }
        return this;
    },
    
    warning: function (message) {
        return this.show(message, Notification.status.WARNING);
    },
    
    error: function (message) {
        return this.show(message, Notification.status.ERROR);
    },

    _onKeyPress: function (event) {
        if (event.keyCode === 27) {
            this.hide();
        }
    }
});

Notification.status = {
    ERROR:   "error",
    WARNING: "warning",
    SUCCESS: "success"
};

var Lightbox = View.extend({
    events: {
        "click": "_onHide"
    },

    tagName: "div",

    className: "lightbox",

    classes: {
        display: "show",
        animate: "fade-in"
    },
    
    // The default step back in history to revert to when the lightbox closes
    historyCount: 1,

    constructor: function Lightbox() {
        View.prototype.constructor.apply(this, arguments);
        _.bindAll(this, '_onKeypress');
    },
    
    show: function (options) {
        this.elem.addClass(this.classes.display);

        // Need to use a timer for the animation to trigger.
        setTimeout(_.bind(function () {
            this.elem.addClass(this.classes.animate);
        }, this), 0);

        this._updateMargin();
        
        // If contents is a form, then focus its first control
        this.$(":input:first").focus();

        // Listen for escape key to close.
        jQuery(document).one('keydown', this._onKeypress);

        return this.trigger("show", options, this);
    },
    
    hide: function (options) {
        var duration = this.elem.css("transition-duration") ||
            this.elem.css("-moz-transition-duration") ||
            this.elem.css("-webkit-transition-duration") ||
            this.elem.css("-o-transition-duration") ||
            this.elem.css("-ms-transition-duration") ||
            0;
        
        // Put control in the main body, and away from the lightbox's contents (amongst other things, this will close the keyboard on an iPhone/iPad when the lightbox previously contained a form that the user submitted)
        app.bodyElem.focus();
            
        this.elem.removeClass(this.classes.animate);
        if (duration) {
            setTimeout(_.bind(function () {
                this.elem.removeClass(this.classes.display);
            }, this), parseFloat(duration) * 1000);
        }
        else {
            this.elem.removeClass(this.classes.display);
        }
        
        jQuery(document).unbind('keydown', this._onKeypress);
        
        this._trigger(options, "hide", this);
        this.historyCount = 1;
        return this;
    },
    
    isHidden: function () {
        return !this.elem.hasClass(this.classes.display);
    },
    
    // Custom lightbox types - a type can be passed to the content() method below
    _lightboxTypes: {},
    
    // Insert content into lightbox
    content: function (content, lightboxType) { // content = html, text or element; lightboxType = className to add to lightbox elem
        var elem = this.elem,
            contentElem = this.$(".content");
        
        _.each(this._lightboxTypes, function(value, lightboxType){
            elem.removeClass(lightboxType);
        });
        
        if (lightboxType) {
            this._lightboxTypes[lightboxType] = true;
            elem.addClass(lightboxType);
        }
        
        // Plain text or HTML
        if (typeof content === "string") {
            contentElem.html(content);
        }
        // Element or jQuery wrapped element
        else {
            contentElem.empty().append(content);
        }
        return this._updateMargin();
    },
    
    render: function () {
        var template = tim("lightbox");
        this.elem.html(template);
        return this;
    },
    
    _updateMargin: function () {
        var inner = this.$(".lightbox-inner");
        inner.css({
            top: "50%",
            "margin-top": inner.outerHeight() / 2 * -1
        });
        return this;
    },
    
    _trigger: function () {
      var options = arguments[0] || {},
          args = Array.prototype.slice.call(arguments, 1);

      if (!options.silent) {
        this.trigger.apply(this, args);
      }
      return this;
    },
    
    _onHide: function (event) {
        var target = jQuery(event.target),
            hash   = (target.prop("hash") || '').slice(1);

        // A normal close lightbox click
        if (event.target === this.el || target.hasClass("close") || hash === "close") {
            event.preventDefault();
            this.hide();
        }
        // Links from the lightbox contents shouldn't trigger an auto rewind of history when clicked on
        else if (event.target.nodeName === "A"){
            // A link to a new lightbox, from within a lightbox. Use the HTML attribute `data-lightbox="open` to prevent history rewind
            if (event.target.getAttribute("data-lightbox") === "open"){
                app.lightbox.historyCount ++;
            }
            // A link to content outside of the lightbox
            else {
                this.hide({silent:true});
            }
        }
    },

    _onKeypress: function (event) {
        if (event.which === 27 /* escape key*/) {
            this.hide();
        }
    }
});


var Dashboard = View.extend({
    tagName: "section",

    className: "dashboard",

    classes: {
        detailShown: "detail-active",
        disableAnimation: "no-animate"
    },

    events: {
        "click .dashboard-toggle": "_onToggleClick",
        "click ul.notifications a": "_onNotificationClick",
        "click section.quicklinks.my-projects ul.listing li a.hub-link": "toggleHub",
        "mouseenter a.info": "_toggleHelp",
        "mouseleave a.info": "_toggleHelp"
    },

    constructor: function Dashboard() {
        View.prototype.constructor.apply(this, arguments);
    },

    initialize: function () {
        View.prototype.initialize.apply(this, arguments);

        _.bindAll(this,
            "updateNotifications",
            "updateUserTasks",
            "updateUserHubs",
            "updateManagedTasks",
            "updateStatistics",
            "setUser",
            "_onWindowResize",
            "_onWindowResizeEnd"
        );

        // Setup the user bindings.
        this.setUser(this.model);

        // Set up the detail instance.
        this.detail = new DashboardDetail();

        this._animating = false;

        // BIND EVENTS
        app.bind("change:currentUser", this.setUser)
           // Listen for changes to the app.allDoneTasks collection, and redraw the dashboard tasks accordingly
           .bind("change:allDoneTasks", this.updateManagedTasks)
           .bind("change:allDoneTasks", this.updateNotifications)
           .bind("change:statistics", this.updateStatistics);
           
        // On changing the contextual detail section
        this.detail.bind("all", _.bind(function (eventName) {
            if (eventName === "show") {
                this.elem.addClass(this.classes.detailShown);
            }
            else if (eventName === "hide") {
                this.elem.removeClass(this.classes.detailShown);
                app.back();
            }
        }, this));

        this.bind("all", function (eventName) {
            if (eventName === "show" || eventName === "hide") {
                this._onToggle(eventName);
            }
        }, this);

        jQuery(window).resize(_.throttle(this._onWindowResize, 1000 / 60))
                      .resize(_.debounce(this._onWindowResizeEnd, 500));
    },

    // Sets up bindings to update the dashbaord when the user changes.
    setUser: function (user, options) {
        var dashboard = this,
            myProjectsElem = this.$("section.quicklinks.my-projects"),
            methodMap;
            
        methodMap = {
            "UserHubs":      ["hubs.owned", "hubs.archived"],
            "UserTasks":     ["tasks.claimed.claimed"],
            "ManagedTasks":  ["tasks.owned.done"],
            "Notifications": ["tasks.owned.claimed", "tasks.owned.done", "tasks.claimed.verified"]
        };

        // Update the user object if nessecary.
        this.model = arguments.length ? user : this.model;

        if (this.model) {
            this.model.bind("change", function (user) {
                _.each(methodMap, function (attributes, method) {
                    // For each of the attributes in the methodMap see if it has
                    // changed if so call the associated method.
                    _.each(attributes, function (attribute) {
                        if (user.hasChanged(attribute)) {
                            dashboard["update" + method]();
                        }
                    });
                });
            });

            if (!options || options.silent !== true) {
                this.render();
            }
        }

        return this;
    },

    /* Public: Checks to see if the dashboard is currently animating.
     *
     * Examples
     *
     *   if (dashboard.isAnimating()) {
     *      dashboard.bind("animated", onAnimated);
     *   }
     *
     * Returns true if the dashboard is currently animating.
     */
    isAnimating: function () {
        return this._animating;
    },

    render: function () {
        // place the footer within the dashboard
        var stat = jQuery(".static"),
            footer = stat.find("footer.meta"),
            about = stat.find("section.about");

        this.elem.html(tim("dashboard", {
            verified: app.statistics.tasks.verified,
            toggleText: this.isHidden() ? "Show" : "Hide"
        }));

        this.$("footer.meta").html(footer.html());
        this.$("section.about").html(about.html());

        // Update each of the task lists.
        _.each(["Notifications", "UserTasks", "UserHubs", "ManagedTasks"], function (method) {
            this["update" + method]();
        }, this);

        this.elem.append(this.detail.render().el);

        this.toggle = this.$(".dashboard-toggle");

        this._onToggle(this.isHidden() ? "hide" : "show", {animate: false, silent: true});

        return this;
    },

    toggleHub: function(event){
        var hubId = app.dashboard.getHubIdFromAnchor(event.target);
        if (hubId === app.selectedHub){
            app.tank.getHubView(hubId).toggleTasks();
        }
    },
    
    getHubIdFromAnchor: function(hubAnchor){
        var match = hubAnchor.href.match(HubView.hubIdInUrlRegex);
        return match && match[1];
    },

    getHubAnchorById: function(hubId){
        var dashboard = this,
            hubAnchor;

        this.$("section.quicklinks.my-projects ul.listing li a").each(function(){
            if (hubId === dashboard.getHubIdFromAnchor(this)){
                hubAnchor = this;
                return true;
            }
        });

        return hubAnchor;
    },

    hubAnchorsDeselect: function(){
        this.$("section.quicklinks.my-projects ul.listing li").removeClass("select");
        return this;
    },

    hubAnchorSelect: function(){
        var hubAnchor = this.getHubAnchorById(app.selectedHub);

        this.hubAnchorsDeselect();
        if (hubAnchor){
            jQuery(hubAnchor).parent().addClass("select");
        }
        return this;
    },

    userStatistics: function(){
        var user = this.model;
        
        return {
            ownedClaimed:    user.get("tasks.owned.claimed").length,
            adminedDone:     user.isAdmin() ? // if an admin, this includes all done tasks
                app.statistics.tasks.done : user.get("tasks.owned.done").length,
            claimedVerified: user.get("tasks.claimed.verified").length, // TODO: should this be recent verified tasks?
            atClaimedLimit:  user.canClaimTasks() ? 0 : Tasket.settings.CLAIMED_LIMIT
        };
    },

    updateStatistics: function () {
        this.$(".statistics em").text(app.statistics.tasks.verified);
    },

    // Updates the user status box.
    updateNotifications: function () {
        var stats = this.model && this.userStatistics(),
            notifications = this.$(".notifications"),
            items = notifications.children("li"),
            visible;

        if (stats) {
            notifications.show();
            notifications.find("li > *").each(function () {
                var anchor = jQuery(this),
                    listItem = anchor.parent(),
                    type = this.getAttribute("data-type"),
                    elem = anchor.find("span");

                if (stats[type]) {
                    elem.text(stats[type]);
                    listItem.show();
                }
                else {
                    listItem.hide();
                }
            });

            // Remove margin from the last item.
            items.removeClass("last");
            visible = items.filter(":visible");
        }

        if (visible && visible.length) {
            visible.last().addClass("last");
        }
        else {
            notifications.hide();
        }
    },

    // Updates the "Tasks I Manage" box.
    updateManagedTasks: function () {
        var tasks = null;
        if (this.model) {
            if (app.currentUserIsAdmin() && app.allDoneTasks){
                tasks = app.allDoneTasks;
            }
            else {
                tasks = this._getCollection("getTasks", "tasks.owned.done", this.updateManagedTasks);
            }
        }
        return this.updateList(".managed-tasks", tasks);
    },

    // Updates the "My Tasks" box.
    updateUserTasks: function () {
        var tasks = null;
        if (this.model) {
            tasks = this._getCollection("getTasks", "tasks.claimed.claimed", this.updateUserTasks);
        }
        return this.updateList(".my-tasks", tasks);
    },

    // Updates the "My Projects" box.
    updateUserHubs: function () {
        var hubs = null,
            nonArchivedHubs;
        
        if (this.model && (this.model.isAdmin() || Tasket.settings.USERS_CAN_CREATE_HUBS)) {
            nonArchivedHubs = _.difference(this.model.get("hubs.owned"), this.model.get("hubs.archived"));
            hubs = this._processCollection(Tasket.getHubs(nonArchivedHubs), this.updateUserHubs);
        }
        this.updateArchivedProjectsLink();
        return this.updateList(".my-projects", hubs).hubAnchorSelect();
    },

    // Updates a list of tasks/hubs based on the selector & collection.
    updateList: function(selector, models){
        var mapped;
        
        if (models && (models.length || models.type === "hub")) {
            mapped = models.map(function (model) {
                var title = model.get("title") || model.get("description"),
                    href = app.tank.clientUrl(model, true);
                    
                return {
                    id:          model.id,
                    title:       app.truncate(title, 24),
                    isHub:       model.type === "hub",
                    isTask:      model.type === "task",
                    showDone:    app.isCurrentUserOrAdmin(model.get("claimedBy")) && model.get("state") === Task.states.CLAIMED,
                    showVerify:  app.isCurrentUserOrAdmin(model.get("owner")) && model.get("state") === Task.states.DONE,
                    href:        href
                };
            });
            
            this.$(selector).show().find("ul").html(tim("dashboard-link", {
                links: mapped
            }));
        }
        else {
            this.$(selector).hide();
        }

        return this;
    },
    
    // show/hide the archived projects link depending on whether there are any
    updateArchivedProjectsLink: function(forceShow) {
        if (forceShow || (app.statistics.hubs && parseInt(app.statistics.hubs.archived, 10) > 0)) {
            this.$(".archived-projects").html(tim("archived-projects-link"));
        }
        else {
            this.$(".archived-projects").empty();
        }
        return this;
    },

    // Retrieves a collection of models from a Tasket cache.
    // method   - the Tasket getter for the models eg. "getTasks"
    // key      - the Model attribute containing the ids to fetch
    // callback - a function to call when the collection or models change
    _getCollection: function (method, key, callback) {
        var collection = Tasket[method](this.model.get(key));
        return this._processCollection(collection, callback);
    },        

    _processCollection: function (collection, callback){
        collection.bind("reset", callback);

        // Currently only display the title/description so only re-render
        // if this changes.
        collection.bind("change", function(model) {
            var watch = ["owner", "title", "description", "archived.timestamp"];
            do {
                if (model.hasChanged(watch.pop())) {
                    callback();
                    break;
                }
            } while (watch.length);
        });
        return collection;
    },

    _toggleHelp: function (event) {
        jQuery(event.target).siblings('.help').toggleClass('active');
    },

    _applyTransform: function (method) {
        if (!this.toggle) {
            return;
        }

        var value = 0, transform = getCSSProperty('transform');

        if (method === "hide") {
            value = this.toggle.outerHeight() - this.elem.height();
        }

        if (transform) {
            this.elem.css(transform, 'translate(0, ' + value + 'px)');
        }
    },

    // Scroll down to the appropriate listing and highlight the activity links.
    _onNotificationClick: function (event) {
        var hash = event && event.target && event.target.hash,
            className = hash && hash.replace && hash.replace("#", "."),
            element = className && this.$(className).addClass("highlight");
            
        if (element){
            // Scroll the dashboard root element to the position of the inner section, and highlight the inner section
            this.elem
                .animate(
                    {
                        "scrollTop": element.position().top
                    },
                    function () {
                        element.removeClass("highlight");
                    }
                );
                
            event.preventDefault();
        }
    },

    /* Updates the toggle text when the view is toggled.
     *
     * method  - Method name either "show" or "hide".
     * options - Object of options for the method.
     *           animate: If false does not transition the hide.
     *
     * Returns nothing.
     */
    _onToggle: function (method, options) {
        var disableAnimation = !!options && options.animate === false,
            dashboard = this;

        this._animating = !disableAnimation;
        this.elem.toggleClass(this.classes.disableAnimation, disableAnimation);

        this._applyTransform(method);

        if (this._animating) {
            setTimeout(function () {
                dashboard.trigger("animated", dashboard);
                dashboard.elem.addClass(dashboard.classes.disableAnimation);
            }, 300 /* This needs to be updated when CSS changes */);
        }

        this.$(".toggle-text").text(method === "hide" ? "Show" : "Hide");
    },

    /* Handles clicks on the dashboard toggle button. */
    _onToggleClick: function (event) {
        event.preventDefault();
        this[this.isHidden() ? "show" : "hide"]();
    },

    _onWindowResize: function (event) {
        // Disable animations for smoother resizing.
        if (!this._isResizing) {
            this.elem.addClass(this.classes.disableAnimation);
            this._isResizing = true;
        }

        // Only need to reposition if dashboard is hidden.
        if (this.isHidden()) {
          this._applyTransform("hide");
        }
    },

    _onWindowResizeEnd: function () {
        // Enable animations for smoother resizing.
        this.elem.removeClass(this.classes.disableAnimation);
        this._isResizing = false;
    }
});

jQuery.extend(true, Dashboard.prototype, mixins.toggle);

var Form = View.extend({
    tagName: "form",
    
    events: {
        "submit": "submit",
        "keydown textarea": "_onKeydown"
    },
    
    constructor: function Form() {
        View.prototype.constructor.apply(this, arguments);
    },
    
    abort: false,
    
    submit: function (event) {
        var data = {};
            
        if (event) { 
            event.preventDefault();
        }

        this.reset();

        this.$(":input[name]:not([type=file])").each(function () {
            data[this.name] = jQuery(this).val();
        });

        this.trigger("beforeSave", data, this.model, this);
        
        // listeners to beforeSave may set the `abort` flag
        if (this.abort){
            this.trigger("error", this.model, this);
        }
        else {
            this.model.save(data, {
                success: _.bind(this._onSuccess, this),
                error:   _.bind(this._onError, this)
            });

            this.trigger("submit", this.model, this);
        }
        return this;
    },
    
    errors: function (errors) {
        var list = this.$(":input");

        list.each(function () {
            var input    = jQuery(this),
                messages = errors[this.name];

            if (messages) {
                input.parent().addClass("error");
                input.prev("label").html(function () {
                    var label  = jQuery(this),
                        text   = label.data("original");

                    if (!text) {
                        text = label.text();
                        label.data("original", text);
                    }

                    return text + ": <strong>" + messages.join(", ") + "</strong>";
                });
            }
        });

        return this;
    },
    
    reset: function () {
        this.abort = false;
    
        this.$(".error")
            .removeClass("error")
            .find("strong").remove();
            
        return this;
    },
    
    _onSuccess: function () {
        this.trigger("success", this.model, this);
    },
    
    _onError: function (model, xhr) {
        var errors = jQuery.parseJSON(xhr.responseText);
        this.errors(errors).trigger("error", this.model, this, xhr.status);
    },
    
    _onKeydown: function (event) {
        var hasMeta = event.metaKey || event.ctrlKey;
        if (event.which === 13 /* return key */ && hasMeta) {
            event.preventDefault();
            this.submit();
        }
    }
});


/* View for handling multipart/form-data uploads. This should be replaced
 * eventually with a nice ajax uploaded. Currently the server only supports
 * uploads using multipart/form-data. As binary data cannot easily be uploaded
 * using XMLHttpRequest we use a form within an iframe to do the heavy lifting
 * for us.
 */
var FormUpload = Form.extend({

    /* Pretty output in Webkit Inspector */
    constructor: function FormUpload() {
        Form.prototype.constructor.apply(this, arguments);
    },

    /* Should be overidded by the extending view to provide the url for
     * for the form within the iFrame. Will throw an error if not implemented.
     *
     * Returns nothing.
     */
    url: function () {
        throw "Must be implemented by extending object";
    },

    /* Toggles the loading element in the view. This should be displayed when
     * the iFrame is submitted and removed once loaded.
     *
     * Returns itself.
     */
    toggleLoading: function() {
        var loading = this.$(".loading");
        if (loading.is(":visible")) {
            loading.hide();
            jQuery(this.iframe).show();
        } else {
             loading.show();
             jQuery(this.iframe).hide();
        }
        return this;
    },

    /* Updates the contents of the iframe with the form html. This needs to be
     * called by the implementor once the view has been rendered and appended
     * to the DOM.
     *
     * NOTE: The input name is taken from the form field that is replaced by
     * the iFrame.
     *
     * Examples
     *
     *   jQuery("#content").append(view.render().el);
     *   view.updateFrame();
     *
     * Returns itself.
     */
    updateFrame: function () {
        if (!this.iframe) {
            this._createFrame();
        }

        this.iframe.contentWindow.document.open();
        this.iframe.contentWindow.document.write(tim("iframe-upload", {
            name: this.name,
            stylesheet: jQuery('link[rel=stylesheet]')[0].href
        }));
        this.iframe.contentWindow.document.close();

        return this;
    },

    /* Creates a new iframe element and replaces the current file input in the
     * view. Also grabs the input name in order to append it to the iframe
     * element.
     *
     * Returns iframe element.
     */
    _createFrame: function () {
        var input = this.$("input[type=file]");

        this.name = input.attr("name");
        this.iframe = jQuery("<iframe>", {
            id: "field-image",
            scrolling: "no",
            frameBorder: 0,
            allowTransparency: true,
            css: {
                width: "100%",
                height: input.outerHeight(),
                margin: 0,
                padding: 0,
                overflow: "hidden",
                borderWidth: 0,
                borderStyle: "none",
                backgroundColor: "transparent"
            }
        })[0];

        input.replaceWith(this.iframe);
        return this.iframe;
    },

    /* Overrides the default Form _onSuccess method to also submit the form
     * within the iframe. Updates the view model with json data returned by
     * the server on upload.
     *
     * Triggers the "success" event once the iFrame has reloaded.
     *
     * Returns nothing.
     */
    _onSuccess: function () {
        var view = this,
            form = jQuery("form", this.iframe.contentWindow.document.body);

        // Bail early if no file is present.
        if (!form.find('input').val()) {
            view.trigger("success", view.model, view);
            return;
        }

        // Hide the iframe and show loading text.
        this.toggleLoading();

        // Set the onload handler for when the iframe reloads.
        this.iframe.onload = function onload() {
            var response = this.contentWindow.document.body.innerHTML,
                data;

            try {
                data = jQuery.parseJSON(response);
                view.model.set(data);
                view.updateFrame().toggleLoading();
                view.trigger("success", view.model, view);
                this.onload = null;
            } catch (error) {}
        };

        // Grab the element from the jQuery wrapper.
        form = form[0];

        // Update the form action.
        form.action = this.url();

        // Submit the form.
        form.submit();
    }
});

var Login = Form.extend({
    constructor: function LoginForm() {
        Form.prototype.constructor.apply(this, arguments);
    },

    submit: function (event) {
        var form = this,
            credentials;

        if (event) {
            event.preventDefault();
        }

        credentials = _.map(this.elem.serializeArray(), function (input) {
            return input.value;
        });

        // Login and add callbacks to the returned obejct.
        Tasket.login(credentials[0], credentials[1])
            .success(_.bind(this._onSuccess, this))
            .error(function (xhr) {
                form.errors({
                    username: ["Invalid username and password"]
                });
                form.trigger("error", xhr, form);
            });

        return this.trigger("submit", this);
    },

    render: function () {
        var html = tim("login");
        this.elem.html(html);
        return this;
    },

    _onSuccess: function (data) {
        var user = new User(data.user);
        this.trigger("success", user, this);
    }
});

var SignUp = FormUpload.extend({
    constructor: function SignUpForm() {
        Form.prototype.constructor.apply(this, arguments);

        // Verify that the passwords match
        this.bind("beforeSave", function(data, user, form){
            var pass1 = data.password,
                pass2 = data.password_confirm;
                
            if (form.passwordRequired && !pass1 && !pass2){
                form.errors({
                    password: ["Password required"],
                    password_confirm: ["Password required"]
                });
                form.abort = true; // prevent the user model from saving. see Form.submit()
            }
        
            else if (pass1 !== pass2){
                form.errors({
                    password: ["Passwords do not match"]
                });
                form.abort = true; // prevent the user model from saving. see Form.submit()
            }
        });

        // Remove the password fields from the User model.
        this.bind("submit", function (user) {
            _.each(["password", "password_confirm"], function (attribute) {
                user.unset(attribute, {silent: true});
            });
        });
    },
    
    passwordRequired: true,

    url: function () {
        return this.model.url() + "/image/";
    },

    render: function () {
        var html = tim("signup");
        this.elem.html(html).find(".loading").hide();
        return this;
    }
});

var ArchiveForm = Form.extend({
    events: _.extend({}, Form.prototype.events, {
        "click .restore": "_onRestore"
    }),

    constructor: function ArchiveForm() {
        Form.prototype.constructor.apply(this, arguments);
    },
    
    renderLoading: function(){
        var template = tim("archive-form-loading");
        this.elem.html(template);
        
        return this;
    },
    
    render: function (archivedHubData) {
        var template = tim("archive-form", { 
            noArchivedProjects: !archivedHubData.length, 
            archivedProjects: archivedHubData
        });
        
        this.elem.html(template);
        return this;
    },

    // overwrite default form method
    submit: function(event) {
        if (event) {
            event.preventDefault();
        }
        return this;
    },

    /* DOM Event callback. Restores the current hub on the server and broadcasts
     * the "restore" event passing in the model and view to all listeners. 
     *
     * event - A click browser Event object.
     *
     * Returns nothing.
     */
    _onRestore: function (event) {
        var hubId;
        if (window.confirm(app.lang.RESTORE_HUB_CONFIRM)) {
            hubId = event.target.getAttribute('data-hub-id');
            // hide hub in archive form
            this.$(".archived-project-"+hubId).slideUp();
            // restore hub
            this.trigger("restoreHub", hubId);
        }
        event.preventDefault();        
    }
});


var TaskForm = Form.extend({
    events: _.extend({}, Form.prototype.events, {
        "click .delete": "_onDelete"
    }),

    constructor: function TaskForm() {
        Form.prototype.constructor.apply(this, arguments);
        
        this.bind("beforeSave", function(data){
            if (data.estimate){
                data.estimate = parseInt(data.estimate, 10);
            }
        });
    },
    
    render: function () {
        var canDelete = this.model.canDelete(),
            template = tim("edit-task", {
            description:  this.model.get("description") || "",
            estimates:    this._estimates(),
            isNew:        this.model.isNew(),
            isNotNew:    !this.model.isNew(),
            canDelete: canDelete 
        });
        
        this.elem.html(template);

        return this;
    },
    
    _estimates: function () {
        var current = this.model.get("estimate");
        
        return _.map(Task.ESTIMATES, function (estimate) {
            return _.extend(
                estimate,
                {selected: current === estimate.value}
            );
        });
    },

    /* DOM Event callback. Deletes the current task on the server and broadcasts
     * the "delete" event passing in the model and view to all listeners. 
     *
     * event - A click browser Event object.
     *
     * Returns nothing.
     */
    _onDelete: function (event) {
        if (window.confirm(app.lang.DELETE_TASK_CONFIRM)) {
            this.model.destroy();
            this.trigger("delete", this.model, this);
        }
        event.preventDefault();
    }
});


var HubForm = FormUpload.extend({

    events: _.extend({}, FormUpload.prototype.events, {
        "click .delete": "_onDelete",
        "click .archive": "_onArchive"
    }),

    /* Pretty output in Webkit Inspector */
    constructor: function HubForm() {
        FormUpload.prototype.constructor.apply(this, arguments);
    },

    /* Get the url for the form upload. Method is required by FormUpload.
     * 
     * Returns a url string.
     */
    url: function () {
        return this.model.url() + "/image/";
    },

    /* Renders the contents of the view.
     *
     * Returns itself.
     */
    render: function () {
        var canDelete = this.model.canDelete(),
            template = tim("hub-form", {
            title:       this.model.get("title") || "",
            description: this.model.get("description") || "",
            isNew:       this.model.isNew(),
            isNotNew:   !this.model.isNew(),
            canDelete:  canDelete
        });
        
        this.elem.html(template).find(".loading").hide();
        return this;
    },

    /* DOM Event callback. Deletes the current hub on the server and broadcasts
     * the "delete" event passing in the model and view to all listeners. 
     *
     * event - A click browser Event object.
     *
     * Returns nothing.
     */
    _onDelete: function (event) {
        if (window.confirm(app.lang.DELETE_HUB_CONFIRM)) {
            this.model.destroy();
            this.trigger("delete", this.model, this);
        }
        event.preventDefault();
    },
    
    /* DOM Event callback. Archives the current hub on the server and broadcasts
     * the "archive" event passing in the model and view to all listeners. 
     *
     * event - A click browser Event object.
     *
     * Returns nothing.
     */
    _onArchive: function (event) {
        if (window.confirm(app.lang.ARCHIVE_HUB_CONFIRM)) {
            this.model.archive();
            this.trigger("archive", this.model, this);
            
            // show "View archived projects" link on dashboard
            app.dashboard.updateArchivedProjectsLink(true);
        }
        event.preventDefault();
    }
});

var DashboardDetail = Lightbox.extend({
    events: {
        "click .back, .close": "hide"
    },

    tagName: "section",

    className: "detail",

    constructor: function DashboardDetail() {
        Lightbox.prototype.constructor.apply(this, arguments);
    },

    title: function (title) {
        this.$("h1").text(title);
        return this;
    },

    render: function () {
        var template = tim("dashboard-detail");
        this.elem.html(template);
        return this;
    }
});


var DashboardDetailHub = View.extend({

});


var Account = SignUp.extend({
    constructor: function AccountForm() {
        SignUp.prototype.constructor.apply(this, arguments);
    },
    
    passwordRequired: false,
    
    render: function () {
        var data = this.model.toJSON();

        this.elem.html(tim("account", data)).find(".loading").hide();
        return this;
    }
});

var ChangePassword = Form.extend({
    constructor: function ChangePassword() {
        SignUp.prototype.constructor.apply(this, arguments);
        
        // Ensure that user model has loaded from the server before submitting
        this.bind("beforeSave", function(data, user, form){
            if (!user.get("username")){
                form.abort = true;
                user.bind("change:username", _.bind(form.submit, form));
                // NOTE: if the user doesn't actually exist, then the form will not do anything. That's probably OK. It should never happen.
            }
        });

        // Verify that the passwords match
        this.bind("beforeSave", function(data, user, form){
            var pass1 = data.password,
                pass2 = data.password_confirm;
                
            if (!pass1 && !pass2){
                form.errors({
                    password: ["Password required"],
                    password_confirm: ["Password required"]
                });
                form.abort = true; // prevent the user model from saving. see Form.submit()
            }
        
            else if (pass1 !== pass2){
                form.errors({
                    password: ["Passwords do not match"]
                });
                form.abort = true; // prevent the user model from saving. see Form.submit()
            }
        });

        // Remove the password fields from the User model.
        this.bind("submit", function (user) {
            _.each(["password", "password_confirm"], function (attribute) {
                user.unset(attribute, {silent: true});
            });
        });
    },

    render: function () {
        var html = tim("change-password");
        this.elem.html(html);
        return this;
    }
});

var ForgotDetails = Form.extend({
    constructor: function ForgotDetailsForm() {
        Form.prototype.constructor.apply(this, arguments);
    },

    submit: function (event) {
        var form = this,
            data = {};

        if (event) {
            event.preventDefault();
        }

        this.$(":input[name]:not([type=file])").each(function () {
            data[this.name] = jQuery(this).val();
        });
        
        if (!data.username && !data.email){
            form.errors({
                username: ["Username or email required"]
            });
            
            this.trigger("error", this);
        }
        else {
            // Login and add callbacks to the returned obejct.
            Tasket.forgotDetails(data)
                .success(_.bind(this._onSuccess, this));
                
            this.trigger("submit", this);
        }

        return this;
    },

    render: function () {
        var html = tim("forgot-details");
        this.elem.html(html);
        return this;
    },

    _onSuccess: function () {
        this.$("h1").text("Thank you!");
        this.$(":not(h1)").remove();
        this.elem.append("<p>We've emailed you a link to reset your password.</p>");
        this.trigger("success", null, this);
    }
});

// Setup the toolbar.
var Toolbar = View.extend({
    constructor: function Toolbar() {
        View.prototype.constructor.apply(this, arguments);
    },

    initialize: function () {
        View.prototype.initialize.apply(this, arguments);
        
        var view = this,
            methods = ["toggleLogin", "updateUser", "updateTasks", "updateSignup"];

        this.toolbar  = jQuery(this.el);
        this.login    = this.toolbar.find(".login");
        this.userbar  = this.toolbar.find("h2");
        this.tasks    = this.toolbar.find(".tasks");

        this.addCSRFToken();

        // Watch for changes to the current user and update the toolbar accordingly.
        app.bind("change:currentUser", function (user) {
            _.each(methods, function (method) {
                view[method](user);
            });

            // Watch the user model for changes. When they occur update
            // the appropriate areas.
            if (user) {
                user.bind("change", function () {
                    var taskKeys = ["tasks.claimed.claimed", "tasks.claimed.verified", "tasks.claimed.done"],
                        userKeys = ["name", "image"],
                        changedAttr = user.changedAttributes(),
                        changedKeys;
                        
                    if (changedAttr !== false){ // verify that the change was a valid change to an attribute
                        changedKeys = _.keys(changedAttr);

                        if (_.intersect(changedKeys, taskKeys).length) {
                            view.updateTasks(user);
                        }

                        if (_.intersect(changedKeys, userKeys).length) {
                            view.updateUser(user);
                        }
                    }
                });
            }
        });
    },

    addCSRFToken: function () {
        var token = app.getCookie("csrftoken");

        if (token) {
            this.$("form").append(jQuery("<input />", {
                type:  "hidden",
                name:  "csrftoken",
                token: token
            }));
        }

        return this;
    },

    // Toggle the display of the login/logout buttons.
    toggleLogin: function (user) {
        var loginState  = user ? "hide" : "show",
            logoutState = user ? "show" : "hide";

        // Toggle the forms.
        this.login.find("a")[loginState]();
        this.login.find("form")[logoutState]();
    },

    // Update the current user box or hide it.
    updateUser: function (user) {
        if (user) {
            this.userbar.show();
            if (user.get("image")) {
                this.userbar.find("img").attr(
                    "src", Tasket.thumbnail(user.get("image"), 16, 16, true)
                );
            }
            this.userbar.find("a").text(user.get("username"));
        } else {
            this.userbar.hide();
        }
    },

    // Update the tasks status bar in the toolbar or hide it if there
    // is no current user.
    updateTasks: function (user) {
        var taskLists;
        if (user) {
            taskLists = user.get("tasks");
            this.tasks.show();
            this.tasks.find(".pending").text(
                user.get("tasks.claimed.claimed").length
            );
            this.tasks.find(".done").text(
                user.get("tasks.claimed.done").length + user.get("tasks.claimed.verified").length
            );
        } else {
            this.tasks.hide();
        }
    },

    // Toggles the sign up button.
    updateSignup: function (user) {
        var state = user ? "hide" : "show";
        this.toolbar.find("[href*=sign-up]")[state]();
    }
});

/* Public: A tank view to handle the display of the Tank. Currently only
 * handles panning of the view but over time many of the TankController
 * methods could be moved into here.
 *
 * options - An options object to be passed into the constructor.
 *           el: An Element to use in the view. Usually "body".
 *
 * Examples
 *
 *   var marker = new HubMarkerView({model: hub});
 *
 * Returns a new instance of the Tank view.
 */
var HubMarker = View.extend({

    /* Class name for the root element. */
    className: "hub-marker",

    /* View event listeners. */
    events: {},

    /* Classes to manipulate the view state */
    classes: {
        showTooltip: "show"
    },

    /* Initialises the HubMarkerView object.
     *
     * options - An options element for the view.
     *
     * Returns nothing.
     */
    constructor: function HubMarkerView() {
        View.apply(this, arguments);
    },

    /* Public: Positions the view at the provided offset. Also orientates
     * the marker at the provided angle if provided.
     *
     * offset - An offset object with top and left properties.
     * angle  - An angle in degrees (optional).
     *
     * Examples
     *
     *   view.position({top: 30, left: 20}, 45);
     *
     * Returns itself.
     */
    position: function (offset, angle) {
        this.elem.css(offset);
        return this.angle(angle);
    },

    /* Public: Points the marker at the angle provided. The angle should be
     * in radians where 0 is the positive x-axis and the rotation is counter
     * clockwise.
     *
     * angle - An angle in radians (0 is positive x-axis).
     *
     * Examples
     *
     *   marker.angle(0); // East
     *   marker.angle(Math.PI / 2); // 90 degrees (North).
     *
     * Returns itself.
     */
    angle: function (angle) {
        var transform = getCSSProperty('transform');

        // CSS expects angle to rotate clockwise so we accomodate for this
        // by subtracting it from 2π. Also starts 135 degrees from 0 (x-axis)
        // also accomodate for that.
        angle = (2 * Math.PI - angle) + (Math.PI * 0.75);

        this._angle = angle;

        if (transform) {
            this.$('.hub-marker-pointer').css(transform, 'rotate(' + angle + 'rad)');
        }

        return this;
    },

    /* Public: Scales the marker to a percentage of it's normal size.
     *
     * percentage - A percentage between 0 and 1.
     *
     * Examples
     *
     *   markerView.scale(0.5); // Marker is now half the size.
     *
     * Returns itself.
     */
    scale: function (percentage) {
        var transform = getCSSProperty('transform');

        this._scale = percentage;
        if (transform) {
            this.elem.css(transform, 'scale(' + percentage + ')');
        }
        this.elem.css('opacity', percentage);

        return this;
    },

    /* Public: Show the tooltip for the current marker.
     *
     * Examples
     *
     *   view.showTooltip();
     *
     * Returns itself.
     */
    showTooltip: function () {
        this.tooltip.addClass(this.classes.showTooltip);
        this._positionTooltip();
        this._bumpIndex();
        this._cacheScale = this._scale;
        return this.scale(1);
    },

    /* Public: Hide the tooltip for the current marker.
     *
     * Examples
     *
     *   view.hideTooltip();
     *
     * Returns itself.
     */
    hideTooltip: function () {
        this.tooltip.removeClass(this.classes.showTooltip);
        return this.scale(this._cacheScale || this._scale);
    },

    /* Public: Renders the current view.
     *
     * Examples
     *
     *   $("body").append(marker.render());
     *
     * Returns the root view element.
     */
    render: function () {
        var image = this.model.get("image"), html;
        image = image ? Tasket.thumbnail(image, 15, 15, true) : Tasket.media(app.hubPlaceholderImage);

        html = tim('hub-marker', {
            id:    this.model.id,
            title: this.model.get("title"),
            image: image
        });

        this.elem.html(html);
        this.tooltip = this.$('.tooltip');
        this.hide({silent: true});

        return this._positionTooltip()._bumpIndex().el;
    },

    /* Positions the tooltip above the marker. Currently just sits above the
     * marker but could in future ajust depending on the current angle.
     *
     * Examples
     *
     *   view._positionTooltip();
     *
     * Returns itself.
     */
    _positionTooltip: function () {
        this.tooltip.css({
            'margin-top':  -this.tooltip.outerHeight(),
            'margin-left': -this.tooltip.outerWidth() / 2
        });
        return this;
    },

    /* Bumps the z-index on the view to ensure that it always sits above
     * others.
     *
     * Returns itself.
     */
    _bumpIndex: function () {
        this.elem.css('z-index', HubMarker.zindex += 1);
        return this;
    }
}, {
    /* Base z-index for all views. Gets incremented by #_bumpIndex() */
    zindex: 999999
});

// Add show/hide methods to the view.
jQuery.extend(true, HubMarker.prototype, mixins.toggle);
// Handles display of hub markers.
var HubMarkers = View.extend({

    className: "hub-marker-container",

    /* Classes to change state. */
    classes: {
        fullscreen: "fullscreen"
    },

    /* Public: Initializes the HubMarkers view.
     *
     * options - An object literal containing config options.
     *
     * Returns nothing.
     */
    constructor: function HubMarkersView(options) {
        View.apply(this, arguments);

        bindHandlers(this);

        this.markers = {};

        // Manually delegate events on Hub markers for performance. This can't
        // be done in the events property as we need the className.
        this.elem.on({
            click:      this._onClickMarker,
            mouseenter: this._onMouseEnterMarker,
            mouseleave: this._onMouseLeaveMarker
        }, '.' + HubMarker.prototype.className);
    },

    /* Public: Checks to see if the view is currently fullscreened.
     *
     * Examples
     *
     *   if (view.isFullscreen()) {
     *     // Do something.
     *   }
     *
     * Returns true if the view is fullscreen.
     */
    isFullscreen: function () {
        return this.elem.hasClass(this.classes.fullscreen);
    },

    /* Public: Makes the marker view take up the full viewport. Usually
     * called when the sidebar dashboard is hidden.
     *
     * If no fullscreen is provided it will toggle the fullscreen state.
     *
     * fullscreen - If true makes the view fullscreen (optional).
     *
     * Examples
     *
     *   if (dashboard.isHidden()) {
     *     view.toggleFullscreen(true);
     *   } else {
     *     view.toggleFullscreen(false);
     *   }
     *
     * Returns itself.
     */
    toggleFullscreen: function (fullscreen) {
        if (!arguments.length) {
            fullscreen = !this.isFullscreen();
        }
        this.elem.toggleClass(this.classes.fullscreen, fullscreen);
        return this;
    },

    /* Public: Adds a marker to the view for the Hub model provided. All
     * events fired by the MarkerHub are proxied.
     *
     * hub - A hub model to add.
     *
     * Examples
     *
     *   view.addMarker(hub);
     *
     * Returns itself.
     */
    addMarker: function (hub) {
        var marker = this.markers[hub.id] = new HubMarker({model: hub});
        this.elem.append(marker.render());
        return this._proxyEvents(marker);
    },

    /* Public: Show hide the marker for the provided hub.
     *
     * hub  - A hub model.
     * show - If true will show the marker, otherwise hides it (optional).
     *
     * Examples
     *
     *   view.toggleMarker(hub, true); // Show the marker for hub.
     *
     * Returns itself.
     */
    toggleMarker: function (hub, show) {
        var marker = this.markers[hub && hub.id],
            method = show === true ? 'show' : 'hide';

        if (marker) {
            marker[method]();
        }

        return this;
    },

    /* Public: Updates the position of a marker for the provided hub.
     * 
     * The angle argument should be an angle where 0 sits on the positive
     * x-axis. Rotation is counter clockwise.
     *
     * hub   - A hub model.
     * angle - The angle the marker is at from the center of the view.
     *
     * Examples
     *
     *   view.updateMarker(hub, Math.PI / 2);
     *
     * Returns itself.
     */
    updateMarker: function (hub, angle, scale) {
        var marker = this.markers[hub && hub.id];
        if (marker) {
            marker.position(this._calculatePosition(angle), angle).scale(scale);
        }
        return this;
    },

    /* Public: Gets a bounding object for the view. The object has properties
     * for width, height, top and left offsets.
     *
     * Examples
     *
     *   $("<div>").css(marker.getBounds());
     *
     * Returns a object reprresenting the views bounds.
     */
    getBounds: function () {
        return _.extend({
            width:  this.elem.width(),
            height: this.elem.height()
        }, this.elem.offset());
    },

    /* Calculates the top/left position of an element in a container based
     * upon the angle (in radians) from the center of the container. The
     * results are returned in percentages and can be passed directly into
     * jQuery#css().
     *
     * The radians argument should be an angle where 0 sits on the positive
     * x-axis. Rotation is counter clockwise.
     *
     * radians - The angle the marker is at relative to the viewport.
     *
     * Examples
     *
     *   // Assuming a square viewport:
     *
     *   var offset = view._calculatePosition(Math.PI / 4); // 45 degrees
     *   //=> {top: "0%", left: "100%"}
     *
     *   var offset = view._calculatePosition(Math.PI * 1.75); // 275 degrees
     *   //=> {top: "50%", left: "0%"}
     * 
     *   var offset = view._calculatePosition(Math.PI); // 180 degrees
     *   //=> {top: "100%", left: "50%"}
     *
     * Returns an object with top & left as percentages.
     */
    _calculatePosition: function (radians) {
        var width    = this.elem.width(),
            height   = this.elem.height(),
            x = width / 2, y = height / 2,
            scalarY, scalarX,
            PI = Math.PI,
            top = 0, left = 0;

        if (radians < PI / 2) { // First quadrant.
            scalarY = Math.tan(radians) * x;
            if (scalarY <= y) {
                top  = y - scalarY;
                left = width;
            } else {
                scalarX = Math.tan((PI / 2) - radians) * y;
                top  = 0;
                left = x + scalarX;
            }
        }
        else if (radians < PI) { // Second quadrant.
            radians = PI - radians;
            scalarY = Math.tan(radians) * x;
            if (scalarY <= y) {
                top  = y - scalarY;
                left = 0;
            } else {
                scalarX = Math.tan((PI / 2) - radians) * y;
                top  = 0;
                left = x - scalarX;
            }
        }
        else if (radians < (PI * 1.5)) { // Third quadrant.
            radians = radians - PI;
            scalarY = Math.tan(radians) * x;
            if (scalarY <= y) {
                top  = y + scalarY;
                left = 0;
            } else {
                scalarX = Math.tan((PI / 2) - radians) * y;
                top  = height;
                left = x - scalarX;
            }
        }
        else if (radians < (PI * 2)) { // Forth quadrant.
            radians = (2 * PI) - radians;
            scalarY = Math.tan(radians) * x;
            if (scalarY <= y) {
                top  = y + scalarY;
                left = width;
            } else {
                scalarX = Math.tan((PI / 2) - radians) * y;
                top  = height;
                left = x + scalarX;
            }
        }

        // Return widths in percentages to allow window to be resized.
        return {
            top:  ((top / height) * 100) + '%',
            left: ((left  / width)  * 100) + '%'
        };
    },

    /* Gets the view from the #markers objects for the element provided.
     *
     * element - A HubMarker DOM Element.
     *
     * Examples
     *
     *   var markerView = view._getViewByModelAttr(element);
     *   if (markerView) {
     *      // Do something.
     *   }
     *
     * Returns a HubMarker or undefined if not found.
     */
    _getViewByModelAttr: function (element) {
        var model = element.getAttribute('data-model') || "";
        return this.markers[model.split("-").pop()];
    },

    /* Click handler that handles clicks on child elements and triggers the
     * "selected" event passing in the selected view and itself to all
     * event handlers.
     *
     * event - A jQuery.Event click event.
     *
     * Examples
     *
     *   view.elem.on("click", markerClass, view._onClick);
     *
     * Returns nothing.
     */
    _onClickMarker: function (event) {
        var view = this._getViewByModelAttr(event.currentTarget);

        if (view) {
            // Trigger event on the child view. This will be proxied by the
            // current view and allows the click handler to be moved to the
            // child later if necessary.
            view.trigger("selected", view);
            event.preventDefault();
        }
    },

    /* Event handler that displays the tooltip for the marker on mouseover.
     *
     * Triggers the "mouseenter" event passing in the view to all handlers.
     *
     * event - A jQuery.Event mouse event.
     *
     * Returns nothing.
     */
    _onMouseEnterMarker: function (event) {
        var view = this._getViewByModelAttr(event.currentTarget);
        if (view) {
            view.trigger("mouseenter", view, this);
            view.showTooltip();
        }
    },

    /* Event handler that displays the tooltip for the marker on mouseout.
     *
     * Triggers the "mouseleave" event passing in the view to all handlers.
     *
     * event - A jQuery.Event mouse event.
     *
     * Returns nothing.
     */
    _onMouseLeaveMarker: function (event) {
        var view = this._getViewByModelAttr(event.currentTarget);
        if (view) {
            view.trigger("mouseleave", view, this);
            view.hideTooltip();
        }
    }
});

// Add show/hide methods to the view.
jQuery.extend(true, HubMarkers.prototype, mixins.proxy, mixins.toggle);

/* Public: Controller class for managing the application state. This is
 * intended to be extended and can define routes that the controller intends
 * to handle and an initialize method for setup without having to call the
 * constructor.
 *
 * If a Router is provided it will register its own routes and provides
 * a proxy to the Router#navigate() method.
 *
 * This object exists as well as the Backbone.Router because there should
 * only be one "router" instance per application which will manage all
 * registered routes and as such allows the binding to "route:*" to listen
 * for app changes across the entire application. These controllers allow
 * logic to be split up into smaller modules while retaining a single route
 * registry.
 *
 * options - An options object.
 *           router: An instance of Backbone.Router (optional).
 *
 * Examples
 *
 *   // Create a new controller.
 *   var HubController = Controller.extend({
 *       routes: {
 *           "/projects/new/": "newHub",
 *           "/projects/:id/": "showHub"
 *       },
 *       newHub: function () {},
 *       showHub: function (id) {},
 *   });
 *
 *   // Then in your bootstrap.
 *   var router = new Backbone.Router();
 *   var hubController = new HubController({router: router});
 *
 *   location.hash = "/projects/new/"; // Calls hubController.newHub().
 *
 * Returns an instance of Controller.
 */
function Controller(options) {
    var routes;

    this.router = options && options.router;

    if (this.router) {
        routes = this.routes;

        // Call the routes object if it's a function.
        if (typeof routes === "function") {
            routes = routes.apply(this);
        }

        // Format the routes into arguments for the Router#route() method.
        routes = _(routes).chain().map(function (name, route) {
            var fn = this[name];
            return _.isFunction(fn) ? [route, name, _.bind(fn, this)] : null;
        }, this);

        // Reverse them to ensure they retain precedence and add each
        // route to the router. See documentation for Backbone router for
        // details on why they must be reversed.
        // http://documentcloud.github.com/backbone/docs/backbone.html#section-86
        routes.compact().reverse().each(function (args) {
            this.route.apply(this, args);
        }, this.router);
    }

    this.initialize.apply(this, arguments);
}

// Create the controller prototype. All a Controller has is a routes object
// and an initialize method. Otherwise it can be used in any fashion the
// required.
_.extend(Controller.prototype, Backbone.Events, {
    /* An array of route/method pairs or a function returning one. */
    routes: {},

    /* Public: An initilaization method for setting up the instance
     * properties and other calls.
     *
     * options - An options object.
     *           router: An instance of Backbone.Router.
     *
     * Returns nothing.
     */
    initialize : function () {},

    /* Public: An alias to Backbone.History#navigate().
     *
     * url     - The route to update.
     * trigger - If true calls any associated callbacks.
     *
     * Examples
     *
     *   controller.navigate("/projects/1/");
     *
     * Returns itself.
     */
    navigate: function () {
        if (this.router) {
            this.router.navigate.apply(this.router, arguments);
        }
        return this;
    }
});

// Assign the extend function. This is the shared between all Backbone
// classes and can be applied to any constructor function.
Controller.extend = Backbone.Model.extend;

var TankController = Controller.extend({
    routes: function(){
        // Controller initialised on app.ready - see controllers/controllers.js
        var hubs = app.slugs.hubs,
            tasks = app.slugs.tasks,
            routes = {};
        
        routes["/"] = "resetHubs";
        routes["/"+hubs+"/new/"] = "newHub";
        routes["/"+hubs+"/archived/"] = "listArchivedHubs";
        routes["/"+hubs+"/:id/"] = "displayHub";
        routes["/"+hubs+"/:id/edit/"] = "editHub";
        routes["/"+hubs+"/:id/"+tasks+"/new/"] = "newTask";
        routes["/"+hubs+"/:id/"+tasks+"/:taskId/edit/"] = "editTask";
        routes["/"+hubs+"/:id/"+tasks+"/:taskId/"] = "displayTaskDetails";
        routes["/"+hubs+"/:id/detail/"] = "displayHubDetails";
        
        return routes;
    },
    
    clientUrl: function(model, includeHash){
        var slugs = app.slugs,
            path;
        
        if (!model || model.isNew()){
            return null;
        }
        
        switch (model.type){
            case "hub":
            path = slugs.hubs;
            break;
            
            case "task":
            path = slugs.hubs + "/" + model.get("hub") + "/" + slugs.tasks;
            break;
            
            case "user":
            path = slugs.users;
            break;
            
            default:
            return null;
        }
        
        return (includeHash ? "#" : "") +
            "/" + path + "/" + model.id + "/";
    },

    constructor: function TankController() {
        Controller.apply(this, arguments);
    },

    initialize: function(options){
        var tank = this;

        this.hubViews = {};
        this.window = jQuery(window);

        _.bindAll(this, "_onSelectHubs", "_onDeselectHubs", "repositionHubs");

        // Hack to check if we're loading a hub when this class is intialised
        // as we don't want to scroll to a hub on load in #displayHub().
        this._isHubUrlOnLoad = window.location.hash.slice(2, 6) === "hubs";

        this.scrollbarWidth = this.getScrollbarWidth();
        this.svg = this.createSVGRoot(jQuery("#vector")[0]);

        // Force director
        this.forceDirector = ForceDirector.create({
            animate: app.animateHubs
        });

        this.forceDirector
            .bind("loop", this.repositionHubs)
            .bind("end", this.repositionHubs)
            // TODO: tasks views don't position correctly on re-paint
            .bind("end", function(){
                // Redraw taskviews
                if (app.selectedHubView && app.selectedHubView.taskViews){
                    app.selectedHubView.redrawTasks();
                }
            });

        _.bindAll(this, "updateMarkers");
        this.tankView = new Tank({el: jQuery("body")[0]});

        this.bind("change:walls", function(tank, dimensions){
            var currentWalls = this.forceDirector.getWalls();

            if (!_.isEqual(currentWalls, dimensions)){
                this.updateSVGDimensions();
                this.forceDirector.setWalls(dimensions);
                this.calculateHubWeights();
            }
        });

        this.bind("resize", function(){
            this.updateWalls().repositionHubViews();
        });

        jQuery(window).bind("resize", _.debounce(function(){
            tank.trigger("resize", tank);
        }, app.tankResizeThrottle));

        app.dashboard.bind("all", function (eventName, dashboard) {
            if (eventName === "show" || eventName === "hide") {
                if (dashboard.isAnimating() && eventName === "show") {
                    dashboard.bind("animated", function onAnimated() {
                        dashboard.unbind("animated", onAnimated);
                        this.markersView.toggleFullscreen(eventName === "hide");
                    }, this);
                } else {
                    this.markersView.toggleFullscreen(eventName === "hide");
                }
            }
        }, this);

        Tasket.hubs
            // Watch for new hubs and add them to the tank.
            .bind("add", _.bind(function(hub){
                // If the hub isn't yet shown in the tank, and it still has unverified tasks
                if (!this.getHubView(hub.id) && hub.isOpen()){
                    this.addHub(hub);
                }
            }, this))
            // Remove tasks from global collection when hubs are removed
            .bind("remove", _.bind(function(hub){
                hub.forEachTask(function(taskId){
                    Tasket.tasks.remove(taskId);
                });
            }, this));

/*
        Tasket.tasks
            // When a task is removed from the global collection, clean up by removing task from its hub model, and the associated users.
            // TODO: this should be distributed into the user/hub models
            .bind("remove", _.bind(function(task){
                var users = Tasket.users,
                    hub = Tasket.hubs.get(task.get("hub")),
                    owner = users.get(task.get("owner")),
                    claimedBy = users.get(task.get("claimedBy")),
                    doneBy = users.get(task.get("doneBy")),
                    verifiedBy = users.get(task.get("verifiedBy"));

                if (hub){
                    hub.removeTask(task); // NOTE: currently this causes the hub total estimate to be adjusted twice when removing a task
                }

                if (owner){
                    owner.removeTask(task);
                }

                if (claimedBy){
                    claimedBy.removeTask(task);
                }

                if (doneBy){
                    doneBy.removeTask(task);
                }

                if (verifiedBy){
                    verifiedBy.removeTask(task);
                }
            }, this));
   */

        this.updateWalls();
        this.centerTank();

        // Create controller to handle hub navigation markers.
        this.markersView = new HubMarkers();
        this.markersView.toggleFullscreen(app.dashboard.isHidden());

        this.markersView.bind("selected", function (markerView) {
            var hubView = this.hubViews[markerView.model.cid];

            if (hubView && hubView.isSelected()) {
                this.centerViewportOnHub(hubView);
            } else {
                // Just update the hash fragment to jump to the selected hub.
                this.navigate("/" + app.slugs.hubs + "/:id/".replace(":id", markerView.model.id), true);
            }
        }, this);
        this._setupPanAndScrollEvents();

        // Hide markers when showing lightbox.
        app.lightbox.bind("show", this.markersView.hide, this.markersView);

        this.bind("add:hub", function (controller, hub, hubView) {
            this.addMarker(hub);
        }, this.markersView);

        jQuery("body").append(this.markersView.render());

        // Add hubs
        if (options && options.hubs){
            this.addHubs(options.hubs);
        }
    },

    _setupPanAndScrollEvents: function () {
        var throttledUpdateMarkers = _.throttle(this.updateMarkers, 1000 / 60),
            toggleDisplayMarkers, isPanning;

        // Move viewport and update markers when panned.
        this.tankView.bind("pan", this.shiftViewport, this);
        this.tankView.bind("pan", throttledUpdateMarkers);
        jQuery(window).scroll(throttledUpdateMarkers);

        // Handler to show the markers when the view is scrolled/panned and
        // will hide the markers when idle. If a marker is moused over the
        // timer will be cancelled until mouseleave.
        toggleDisplayMarkers = (function (markersView) {
            var timer;

            function startTimer() {
                timer = setTimeout(function () {
                    isPanning = false;
                    markersView.hide();
                }, 2000);
            }

            function stopTimer() {
                clearTimeout(timer);
            }

            markersView.bind("mouseenter", stopTimer);
            markersView.bind("mouseleave", startTimer);

            return function () {
                if (!app.lightbox.isHidden()) {
                    return;
                }

                if (!isPanning) {
                    markersView.show();
                    isPanning = true;
                }

                stopTimer();
                startTimer();
            };
        })(this.markersView);

        // Bind this handler to scroll and pan.
        this.tankView.bind("pan", toggleDisplayMarkers);
        jQuery(window).scroll(toggleDisplayMarkers);

        // Watch the viewport bounds. If the user mouses into these bounds
        // and is not panning display the markers. This allows the user to
        // interact with the markers when not panning.
        jQuery("body").mousemove(_.throttle(_.bind(function (event) {
            if (!app.lightbox.isHidden()) {
                return;
            }

            var bound       = 30,
                width       = this.viewportWidth - this.getDashboardWidth(),
                mouseTop    = event.clientY,
                mouseleft   = event.clientX,
                boundTop    = bound + app.toolbar.elem.outerHeight(true),
                boundLeft   = bound,
                boundRight  = width - bound,
                boundBottom = this.viewportHeight - bound;

            if (mouseTop < boundTop || mouseTop > boundBottom ||
                mouseleft < boundLeft || (mouseleft > boundRight && mouseleft < width)) {
                if (!isPanning) {
                    this.markersView.show();
                }
            } else {
                if (!isPanning) {
                    this.markersView.hide();
                }
            }
        }, this), 200));
    },

    error: function (message) {
        app.notification.error(
            message || "You do not have permission to access this."
        );
        app.back();

        return this;
    },

    getHubView: function(id){
        id = String(id); // allow argument to be a String or a Number

        return _(this.hubViews).detect(function(hubView){
            return id === hubView.model.id;
        });
    },

    /*
    getTaskView: function(id){
        id = String(id); // allow argument to be a String or a Number

        var task = Tasket.getTasks(id),
            hubId = task && task.get("hub"),
            hubView = hubId && this.getHubView(hubId);

        return hubView && hubView.taskViews && hubView.taskViews.detect(function(taskView){
            return taskView.model.id === id;
        });
    },
    */

    centerViewportOnHub: function (hubView) {
        this.centerViewport(hubView.getCenter(), {
            animate: Backbone.history.stack().length > 0 || !this._isHubUrlOnLoad
        });
    },

    // When a hubView is selected, then deselect all the other hubviews
    _onSelectHubs: function(selectedHubView){
        _(this.hubViews)
            .chain()
            .reject(function(hubView){
                return hubView.model.id === selectedHubView.model.id;
            })
            .invoke("deselect");

        this.centerViewportOnHub(selectedHubView);

        return this.trigger("hub:select", selectedHubView, this);
    },

    _onDeselectHubs: function(hubView){
        return this.trigger("hub:deselect", hubView, this);
    },

    renderHubView: function (hubView) {
        app.bodyElem.append(hubView.elem);
        hubView.render();
        return this;
    },

    drawHubView: function(hubView, options){
        var offset;

        options = options || {};

        if (_.isNumber(options.left) && _.isNumber(options.top)){
            offset = {
                left: options.left,
                top: options.top
            };
        }
        else {
            offset = this.hubViewOffset(hubView);
        }

        hubView.offsetValues(offset);

        // Add the hub to the forcedirector engine (not a task, even though the method is `addTask`)
        hubView.forcedNodeHubToHub = this.forceDirector.createNode({
            key: "hub-" + hubView.model.id,
            x: offset.left - hubView.nucleusWidth * 1.5,
            y: app.invertY(offset.top),
            width: hubView.width + app.hubBuffer * 2,
            height: hubView.height + app.hubBuffer * 2,
            title: hubView.model.get("title")
        });

        return this;
    },

    addHubs: function(hubs, options){
        var tank = this,
            hubViewOptions;

        _(hubs).each(function(hub){
            if (!hub.get("archived.timestamp")) { //TODO: remove when archived projects aren't passed through default API /hubs/ call
                this.addHub(hub, {dontDraw:true});
            }
        }, this);

        if (!options || !options.dontDraw){
            this.calculateHubWeights();

            _.each(this.hubViews, this.renderHubView, this);

            this.updateWalls();

            _.each(this.hubViews, this.drawHubView, this);
            
            // Tank size is based on hubs.
            this.forcedirectHubs();
        }

        return this;
    },

    addHub: function(hub, options){
        var hubView = this.getHubView(hub.id),
            offset;

        if (hubView) {
            return hubView;
        }

        options = options || {};

        hubView = this.hubViews[hub.cid] = new HubView({
            model: hub
        });

        hubView
            .bind("select", this._onSelectHubs)
            .bind("deselect", this._onDeselectHubs)
            .bind("change:position:tasks", _.bind(function(hubView){
                this.trigger("change:position:tasks", this, hubView);
            }, this));

        if (!options.dontDraw){
            this.calculateHubWeights()
                .renderHubView(hubView)
                .drawHubView(hubView)
                .forcedirectHubs();
        }
        this.trigger("add:hub", this, hub, hubView);

        return hubView;
    },

    // Remove a hub from the tank.
    removeHubView: function (hub) {
        var hubView = this.getHubView(hub.id);

        if (hubView) {
            delete this.hubViews[hub.cid];
            hubView.deselect().remove();

            this.removeForceDirectorNode("hub-" + hub.id)
                .calculateHubWeights()
                .forcedirectHubs();
        }

        return this;
    },

    resetHubs: function () {
        _.invoke(this.hubViews, "deselect");
        this.centerTank({
            animate: !!Backbone.history.stack().length
        });
    },

    displayHub: function(hubId){
        var controller = this,
            hubView = this.getHubView(hubId),
            position;

        if (hubView){
            hubView.sendToFront().showTasks();
        }

        return this;
    },

    newHub: function(){
        var hub;

        if (!this._isLoggedIn("You must be logged in to create a " + app.lang.HUB)) {
            return;
        }

        hub = new Hub({
            owner: app.currentUser.id
        });

        this._createHubForm(hub)
            .bind("success", _.bind(function (hub) {
                // Add hubs to global cache.
                Tasket.hubs.add(hub);

                // Add hub and select it for viewing
                this.addHub(hub).select();
            }, this));

        return this;
    },

    listArchivedHubs: function() {
        var form = new ArchiveForm();

        // open view in lightbox
        function renderArchivedHubs(hubs){
            var archivedHubData = [],
                hubsLength = hubs.models.length;

            _.each(hubs.models, function(hub){
                var taskCount = hub.countTasks(),
                    completedTaskCount = hub.countCompletedTasks(),
                    date = timestampToRelativeDate(hub.get("archived.timestamp")),
                    hasDate = !!date;

                archivedHubData.push({
                    id: hub.id,
                    title: hub.get("title"),
                    hasDate: hasDate,
                    date: date,
                    taskCount: taskCount +
                        " task" + ((taskCount !== 1) ? "s" : "") +
                        " (" + completedTaskCount + " completed)"
                });
            });

            app.lightbox.content(form.render(archivedHubData).el, "archived-hubs").show();

            // When user clicks on "Restore" to un-archive a hub
            form.bind("restoreHub", _.bind(function (hubId) {
                var hub = Tasket.getHubs(hubId);

                if (!hub){
                    this.error("Sorry. There was a problem editing the " + app.lang.HUB + ". Please refresh the page and try again. (error: hub-" + hubId + " not found)");
                    return;
                }
                hub.unarchive();
                this.addHub(hub).select();
                // TODO: re-render dashboard list of projects

                hubsLength -= 1;

                if (!hubsLength){
                    app.lightbox.hide();
                }
            }, this));
        }

        Tasket.getArchivedHubs(_.bind(renderArchivedHubs, this));
        return form;
    },

    editHub: function (hubId) {
        var hub = Tasket.getHubs(hubId),
            hubView;

        if (!hub){
            this.error("Sorry. There was a problem editing the " + app.lang.HUB + ". Please refresh the page and try again. (error: hub-" + hubId + " not found)");
            return;
        }

        if (!this._isLoggedIn("You must be logged in to edit this.")) {
            return;
        }
        if (!this._hasAdminRights(hub.get("owner"), "You cannot edit this, because you do not own it and you are not an admin.")) {
            return;
        }

        this._createHubForm(hub)
            .bind("success", _.bind(function (hub) {
                hubView = this.getHubView(hubId);
                if (hubView){
                    hubView.render();
                }
            }, this));

        return this.displayHub(hubId);
    },

    _isLoggedIn: function (message) {
        if (!app.currentUser) {
            this.error(message || "You must be logged in");
        }
        return !!app.currentUser;
    },

    _hasAdminRights: function (id, message) {
        var hasRights = app.isCurrentUser(id) || app.currentUserIsAdmin();
        if (!hasRights) {
            this.error(message || "Sorry, you do not have permission to do that.");
        }
        return hasRights;
    },

    _createHubForm: function (hub) {
        var form = new HubForm({
            model: hub
        });

        app.lightbox.content(form.render().el, "create-hub-form").show();

        // Append our iFrame element for upload.
        form.updateFrame();

        form.bind("success", function (hub) {
                app.lightbox.hide();
                HubView.prototype.updateLocation.call({model:hub});
            })
            .bind("archive", _.bind(function (hub) {
                this.removeHubView(hub);
                app.lightbox.hide();
                this.navigate("/", true);
            }, this))
            .bind("delete", _.bind(function (hub) {
                this.removeHubView(hub);
                Tasket.hubs.remove(hub);
                app.lightbox.hide();
                this.navigate("/", true);
            }, this))
            .bind("error", _.bind(function(hub, form, status){
                this.error("Sorry, there was an error creating the " + app.lang.HUB + ". Please try logging out and in again. (error: hub-" + hub.id + ", status " + status + ")");
            }, this));

        return form;
    },

    // TODO: this should work even when the task view isn't yet available - i.e. via an async request to API
    // TODO: lightbox should close if a link from within the task description is clicked
    displayHubDetails: function(hubId){
        var hubView = this.getHubView(hubId);

        if (hubView){
            hubView.select().displayDetails();
        }

        return this;
    },

    // TODO: this should work even when the task view isn't yet available - i.e. via an async request to API
    // TODO: lightbox should close if a link from within the task description is clicked
    displayTaskDetails: function(hubId, taskId){
        taskId = String(taskId); // allow argument to be a String or a Number

        var hubView = this.getHubView(hubId),
            taskView = hubView && hubView.taskViews && hubView.taskViews.detect(function(taskView){
                return taskView.model.id === taskId;
            });

        if (taskView){
            this.displayHub(hubId);
            taskView.displayDetails();
        }
        else if (hubView){
            hubView.updateLocation();
        }

        return this;
    },

    newTask: function(hubId){
        var hub = Tasket.getHubs(hubId),
            form;

        if (!hub){
            this.error("Sorry. There was a problem creating the task. Please refresh the page and try again. (error: hub-" + hubId + " not found)");
            return;
        }

        if (!this._isLoggedIn("You must be logged in to create a task.")) {
            return;
        }

        if (!this._hasAdminRights(hub.get("owner"), "You cannot create a task here on this " + app.lang.HUB + ", because you do not own it and you are not an admin.")) {
            return;
        }

        if (!hub.canAddTask()) {
            this.error("A " + app.lang.HUB + " can only have a maximum of " + Tasket.settings.TASK_LIMIT + " incomplete tasks");
            return;
        }

        return this.displayHub(hubId)
            ._createTaskForm(hub, new Task({
                hub: hubId, // NOTE: Verify this when refactoring hubs.
                owner: app.currentUser.id,
                estimate: Task.ESTIMATES[0].value
            }));
    },

    editTask: function (hubId, taskId) {
        var hub  = Tasket.getHubs(hubId),
            task = Tasket.getTasks(taskId);

        if (_.indexOf(hub.getTasks(), taskId) < 0) {
            this.error("That task does not exist on this " + app.lang.HUB + ".");
            app.lightbox.hide();
            return;
        }

        if (!this._isLoggedIn("You must be logged in to create a task.")) {
            app.lightbox.hide();
            return;
        }

        if (!this._hasAdminRights(hub.get("owner"), "You do not own this " + app.lang.HUB + ".")) {
            app.lightbox.hide();
            return;
        }

        return this._createTaskForm(hub, task);
    },

    _createTaskForm: function (hub, task) {
        var form = new TaskForm({model: task}),
            tank = this;

        app.lightbox.content(form.render().el, "create-task-form").show();
        form.bind("success", _.bind(function (event) {
                var hubView = tank.getHubView(hub.id),
                    userTasks;

                app.lightbox.hide({silent: true});

                // Add task to Tasket.tasks collection if not already in there.
                if (!Tasket.tasks.get(task.id)) {
                    Tasket.tasks.add(task);
                    hub.addTask(task);
                }

                // Add to current users tasks if not already in there.
                if (
                  task.get("state") === Task.states.NEW &&
                  task.get("owner") === app.currentUser.id
                ) {
                    userTasks = _.clone(app.currentUser.get("tasks.owned.new"));
                    userTasks.push(task.id);
                    app.currentUser.set({
                      "tasks.owned.new": userTasks
                    });
                }

                tank.repositionHubViews();

                // Go to the hub's URL
                hubView.updateLocation();
            }, this))
            .bind("delete", _.bind(function (model) { // TODO create removeTask method
                var hubView = this.getHubView(hub.id);
                if (hubView) {
                    hubView.model.removeTask(task);
                }
                app.currentUser.removeTask(model);
                Tasket.tasks.remove(model);
                app.lightbox.hide();
            }, this))
            .bind("error", _.bind(function(task, form, status){
                this.error("Sorry, there was an error creating the task. Please try logging out and in again. (error: task-" + task.id + ", status " + status + ")");
            }));

        return this;
    },


    /////

    // FORCE-DIRECTION PHYSICS
    // TODO: totally refactor these, and related methods in hub-view.js

    removeForceDirectorNode: function(key){
        if (this.forceDirector){
            this.forceDirector.nodes = _.reject(this.forceDirector.nodes, function(node){
                return node.key === key;
            });
        }
        return this;
    },
    
    totalHubEstimate: function(){
        var hubEstimates = Tasket.hubs.invoke("estimate");
        return _.reduce(hubEstimates, function(memo, value){return memo + value;}, 0);
    },
    
    getWeightForHub: function(hub){
        var settings = Tasket.settings,
            // (max minutes per task * max new, claimed or done tasks on a hub) / 3 = max minutes per task type - i.e. new, claimed or done tasks
            //maxMinutesPerUnverifiedTaskType = (settings.TASK_ESTIMATE_MAX * settings.TASK_LIMIT) / 3,
            
            maxMinutesPerUnverifiedTaskType = this.totalHubEstimate() / 3,
            
            unverifiedTaskWeight = hub.get("estimates.new") +
                (hub.get("estimates.claimed") / 2) +
                (hub.get("estimates.done") / 4),
                
            maxUnverifiedTaskWeight = maxMinutesPerUnverifiedTaskType +
                (maxMinutesPerUnverifiedTaskType / 2) +
                (maxMinutesPerUnverifiedTaskType / 4),
            
            numVerifiedTasks = hub.get("estimates.verified"),
            verifiedTaskAdjustment = numVerifiedTasks ? (0.5 / numVerifiedTasks) : 1,
            maxVerifiedTaskAdjustment = 1,
            
            minutesThisHub = unverifiedTaskWeight + verifiedTaskAdjustment,
            maxMinutes = maxUnverifiedTaskWeight + maxVerifiedTaskAdjustment;
            
        return minutesThisHub ?
            minutesThisHub / maxMinutes : 0;
    },

    getHubWeights: function(){
        return _.map(this.hubViews, function(hubView){
            return this.getWeightForHub(hubView.model);
        }, this);
    },

    calculateHubWeights: function(){
        var hubWeights = this.hubWeights = this.getHubWeights(),
            totalHubViews;

        this.hubWeightMin = Math.min.apply(Math, hubWeights);
        this.hubWeightMax = Math.max.apply(Math, hubWeights);
        this.hubWeightRange = this.hubWeightMax - this.hubWeightMin;
        this.hubViewOrderX = this.hubsAlphabetical();
        this.hubViewOrderXSlice = this.width / this.hubViewOrderX.length;

        return this;
    },

    hubViewOffsetTop: function(hubView){
        if (_.isUndefined(this.hubWeights)){
            throw "tank.hubViewOffsetTop: Must call tank.calculateHubWeights() first";
        }

        var weight = this.getWeightForHub(hubView.model),
            weightRatioOfFullRange = (weight - this.hubWeightMin) / (this.hubWeightRange || 0.5); // 0.5 is to supply a number for when there is no difference at all

        return weightRatioOfFullRange * (this.height - this.marginTop - 90) + this.marginTop + 90; // 90 is expected hubView height
    },

    hubViewOffsetLeft: function(hubView){
        return this.hubViewOrderX.length < 2 ?
            this.wallLeft + this.width / 2 :
            this.wallLeft + this.hubViewOrderXSlice / 2 + (this.hubViewOrderXSlice * _.indexOf(this.hubViewOrderX, hubView.model.id)) + Math.random(); // random seed
    },

    hubsAlphabetical: function(){
        return _(this.hubViews).chain()
            .sortBy(function(hubView){
                var title = hubView.model.get("title") || hubView.model.get("description");
                return title.toLowerCase();
            })
            .map(function(hubView){
                return hubView.model.id;
            })
            .value();
    },

    hubViewOffset: function(hubView){
        return {
            left: this.hubViewOffsetLeft(hubView),
            top:  this.hubViewOffsetTop(hubView)
        };
    },

    setHubViewOffsetFromForcedNode: function(hubView){
        var node = hubView.forcedNodeHubToHub,
            pos = node.getPos();

        hubView.offset({
            left: ~~(pos.x - node.width / 2 + hubView.nucleusWidth / 2), // NOTE: ~~n === Math.floor(n)
            top: app.invertY(~~pos.y)
        });
    },

    repositionHubViews: function(){
        var tank = this;

        _(this.hubViews).each(function(hubView){
            var offsetTop = tank.hubViewOffsetTop(hubView),
                forcedNode = hubView.forcedNodeHubToHub;

            // Set position of force-directed representation, with respect to other hubs
            forcedNode.setPos(
                forcedNode.getPos().x,
                app.invertY(offsetTop)
            );

            // Set position of DOM element
            tank.setHubViewOffsetFromForcedNode(hubView);

            // Set position of force-directed representation, with respect to tasks - TODO: combine these
            hubView.updateForceDirectedDimensions();
        });

        return this.forcedirectHubs();
            //.forcedirectTasks(); // TODO: not currently working (canvas lines move out of sync)
    },

    repositionHubs: function(){
        _.each(this.hubViews, this.setHubViewOffsetFromForcedNode);
        return this.trigger("change:position:hubs");
    },

    forcedirectHubs: function(){
        this.forceDirector.go();
        return this;
    },

    forcedirectTasks: function(){
        _.each(this.hubViews, function(hubView){
            if (hubView.taskViews){
                hubView.refreshTasks();
            }
        });
        return this;
    },

    forcedirectAll: function(){
        return this
            .forcedirectHubs()
            .forcedirectTasks();
    },

    updateViewport: function () {
        var $window = jQuery(window);

        this.viewportWidth  = $window.width()  - this.scrollbarWidth;
        this.viewportHeight = $window.height() - this.scrollbarWidth;

        if (this.viewportWidth < 0){
            this.viewportWidth = 0;
        }

        if (this.viewportHeight < 0){
            this.viewportHeight = 0;
        }
    },

    /* Public: Determine the tank dimensions by splitting the hubs into
     * into groups based on thier weight. The width is determined by the
     * group with the most hubs multiplied by the hub width. The height is
     * determined by the number of groups that contains hubs multiplied
     * by the height.
     *
     * Returns nothing.
     */
    updateTank: function () {
        // Work out how big we want the tank and set the dimensions.
        var groups = [],
            groupCount = 5,
            groupWeight, weights,
            viewportRatio = this.viewportWidth / this.viewportHeight,
            hubWidth, hubHeight, tankWidth, tankHeight, tankArea;

        // If we have no hubs yet just use the viewport dimensions.
        if (_.size(this.hubViews)) {
            // Split the range of hub weights into groups.
            groupWeight = this.hubWeightRange / groupCount;

            // Assign the hubs to groups.
            _.each(this.hubViews, function (view) {
                var weight = this.getWeightForHub(view.model),
                    group  = Math.floor(weight / groupWeight),
                    array  = groups[group];

                if (!array) {
                    array =  groups[group] = [];
                }

                array.push(view);

                if (!hubWidth) {
                    // Grab the hub width/height for use when resizing.
                    hubWidth  = view.width;
                    hubHeight = view.height;
                }
            }, this);

            // If we have hubs in the DOM with dimensions.
            if (hubWidth && hubHeight) {
                // Remove empty groups.
                groups = _.compact(groups);

                // width == max number of hubs in group * hub width
                tankWidth  = Math.max.apply(Math, _.pluck(groups, "length")) * hubWidth * 1.25;

                // height == number of groups containing hubs * hub height
                // this is multiplied by 2 to give a little more height between the
                // hubs. The 2 is arbitrary and assigned through trial and error.
                tankHeight = groups.length * (hubHeight * 2);
                
                tankArea = tankWidth * tankHeight;
                tankWidth = Math.sqrt(tankArea / viewportRatio);
                tankHeight = tankArea / tankWidth;
                
                // Spread to viewport ratio
                this.tankWidth = tankWidth;
                this.tankHeight = tankHeight;
            }
        }

        // Default to the viewport width/height.
        if (!this.tankHeight || this.tankHeight < this.viewportHeight) {
            this.tankHeight = this.viewportHeight;
        }

        if (!this.tankWidth || this.tankWidth < this.viewportWidth) {
            this.tankWidth  = this.viewportWidth;
        }

        jQuery("body").width(this.tankWidth).height(this.tankHeight);
    },

    getViewportCenter: function () {
        var visibleArea = this.markersView.getBounds();
        return {
            left: visibleArea.left + (visibleArea.width  / 2),
            top:  visibleArea.top  + (visibleArea.height / 2)
        };
    },

    // Centers the viewport in the middle of the tank.
    centerTank: function (options) {
        this.centerViewport({
            top:  this.tankHeight / 2,
            left: this.tankWidth  / 2
        }, options);
    },

    // Centres the viewport around the x, y position.
    centerViewport: function (offset, options) {
        // Take into account the dashboard sidebar
        var centerX = (this.viewportWidth - this.getDashboardWidth()) / 2,
            centerY = this.viewportHeight / 2;

        this.positionViewport({
            top:  offset.top  - centerY,
            left: offset.left - centerX
        }, options);
    },

    // Shifts viewport by increments provided.
    shiftViewport: function (offset, options) {
        var currentY = this.window.scrollTop(),
            currentX = this.window.scrollLeft();

        this.positionViewport({
            top:  currentY - offset.top,
            left: currentX - offset.left
        }, options);
    },

    // Positions the viewport top/left from the document.
    positionViewport: function (offset, options) {
        var offsetX = offset.left > 0 ? offset.left : 0,
            offsetY = offset.top  > 0 ? offset.top  : 0;

        if (options && options.animate) {
            // Webkit requires "body", Firefox "html".
            jQuery("html, body").animate({
                scrollTop:  offsetY,
                scrollLeft: offsetX
            });
        } else {
            window.scrollTo(offsetX, offsetY);
        }
    },

    // Get the dimensions of the tank
    updateWalls: function(){
        var toolbarHeight = app.toolbar.elem.outerHeight(true),
            wallBuffer = app.wallBuffer,
            dimensions;

        this.updateViewport();
        this.updateTank();

        this.wallBuffer = wallBuffer;

        // NOTE: this is zero-bottom y
        this.wallTop    = this.tankHeight - wallBuffer - toolbarHeight;
        this.wallLeft   = wallBuffer;
        this.wallRight  = this.tankWidth - this.getDashboardWidth() - wallBuffer;
        this.wallBottom = wallBuffer;

        this.width     = this.wallRight  - this.wallLeft;
        this.height    = this.wallTop    - this.wallBottom;
        this.marginTop = this.tankHeight - this.wallTop;

        dimensions = {
            top: this.wallTop,
            left: this.wallLeft,
            right: this.wallRight,
            bottom: this.wallBottom
        };

        return this.trigger("change:walls", this, dimensions);
    },

    // Gets the width of the dashboard including the right offset.
    getDashboardWidth: function () {
        if (app.dashboard.isHidden()) {
            return 0;
        }
        return app.dashboard.elem.outerWidth() + parseFloat(app.dashboard.elem.css("right"));
    },

    // Modified from http://fleegix.org/articles/2006-05-30-getting-the-scrollbar-width-in-pixels
    getScrollbarWidth: function(){
        var // Outer scrolling div
            outer = jQuery("<div/>").css({
                position: "absolute",
                top: "-1000px",
                left: "-1000px",
                width: "100px",
                height: "50px",
                overflow: "hidden"
            }).appendTo("body"),

            // Inner content div
            inner = jQuery("<div/>").css({
                width: "100%",
                height: "200px"
            }).appendTo(outer),

            // Width of the inner div without scrollbar
            width1 = inner[0].offsetWidth,
            width2;

        // Width of the inner div with scrollbar
        outer.css({overflow: "auto"});
        width2 = inner[0].offsetWidth;

        // Remove the scrolling div from the doc
        outer.remove();

        // Pixel width of the scroller
        return width1 - width2;
    },

    /* Public: Updates each of the markers surrounding the hub, this should
     * be called each time the tank is panned or window scrolled.
     *
     * Examples
     *
     *   $(window).scroll(tank.updateMarkers);
     *
     * Returns nothing.
     */
    updateMarkers: function () {
        _.each(this.hubViews, function (view) {
            var isVisible = this._isHubViewVisible(view),
                hub = view.model, position, scale;

            this.markersView.toggleMarker(hub, !isVisible);
            if (!isVisible) {
                position = this._hubViewPosition(view);
                scale = this._hubViewDistanceFromViewportCenter(position);
                scale = 1 - (0.7 * scale); /* Don't let scale go below 0.3 */
                this.markersView.updateMarker(hub, position.angles.y, scale);
            }
        }, this);
    },

    /* Determines if a HubView is currently visible in the viewport. This
     * does not include the sidebar.
     *
     * hubView - A HubView object.
     *
     * Returns true if the hub is visible.
     */
    _isHubViewVisible: function (hubView) {
        var hubBounds = hubView.getBounds(),
            visibleArea = this.markersView.getBounds();

        hubBounds.right  = hubBounds.left + hubBounds.width;
        hubBounds.bottom = hubBounds.top  + hubBounds.height;

        visibleArea.right  = visibleArea.left + visibleArea.width;
        visibleArea.bottom = visibleArea.top + visibleArea.height;

        return (
            hubBounds.left   < visibleArea.right  &&
            hubBounds.right  > visibleArea.left   &&
            hubBounds.top    < visibleArea.bottom &&
            hubBounds.bottom > visibleArea.top
        );
    },

    /* Returns the angle of the hub view relative to the center of the
     * viewport (in radians where 0 sits on the positive x-axis and rotation
     * is counter clockwise).
     *
     * hubView - A HubView object.
     *
     * Returns an angle in degrees.
     */
    _hubViewPosition: function (hubView) {
        var hubPosition = hubView.getCenter(),
            viewportCenter = this.getViewportCenter(),
            x = hubPosition.left   - viewportCenter.left,
            y = viewportCenter.top - hubPosition.top,
            PI = Math.PI, angle;

        // Calculate angle for first quadrant.
        angle = Math.atan(Math.abs(y) / Math.abs(x));

        if (x < 0 && y >= 0) {        // Second quadrant.
            angle = PI - angle;
        } else if (x < 0 && y < 0) {  // Third quadrant.
            angle = PI + angle;
        } else if (x >= 0 && y < 0) { // Fourth quadrant.
            angle = 2 * PI - angle;
        }

        return {
            sides:  {y: y, x: x},
            angles: {y: angle, x: 0.5 * PI - angle}
        };
    },

    _hubViewDistanceFromViewportCenter: function (position) {
        var viewportCenter = this.getViewportCenter(),
            positionX = position.sides.x,
            positionY = position.sides.y,
            maxDistance, currentDistance;

        currentDistance = (positionX * positionX) + (positionY * positionY);
        maxDistance = (this.tankWidth * this.tankWidth) + 
                      (this.tankHeight * this.tankHeight);

        return (currentDistance / maxDistance);
    },

    clearSVG: function(){
        return this.emptyElement(this.svg);
    },

    createSVGElement: function(nodeName){
        return document.createElementNS("http://www.w3.org/2000/svg", nodeName);
    },

    // NOTE: Creating the <svg> element this way allows it to render on iPad et al, whereas including the <svg> element directly in the HTML document does not. Inspired by http://keith-wood.name/svg.html
    createSVGRoot: function(container){
        var svg = this.createSVGElement("svg");
        svg.setAttribute("version", "1.1");

        container.appendChild(svg);
        return svg;
    },

    updateSVGDimensions: function(){
        this.svg.setAttribute("width", this.tankWidth);
        this.svg.setAttribute("height", this.tankHeight);
        return this;
    },

    addSVGLine: function(x1, x2, y1, y2){
        var line = this.svg && this.createSVGElement("line");

        if (line){
            line.setAttribute("x1", x1);
            line.setAttribute("x2", x2);
            line.setAttribute("y1", y1);
            line.setAttribute("y2", y2);
            this.svg.appendChild(line);
        }
        return this;
    },

    emptyElement: function(elem){
        if (elem){
            while (elem.firstChild) {
                elem.removeChild(elem.firstChild);
            }
        }
        return this;
    }
});

// Handles signup/about/login etc.
var AccountController = Controller.extend({
    routes: {
        "/login/":          "login",
        "/forgot-details/": "forgotDetails",
        "/sign-up/":        "signup",
        "/account/":        "account",
        "/users/:id/change-password/": "changePassword"
    },

    constructor: function AccountController() {
        Controller.apply(this, arguments);
    },
    
    showContents: function(contents){
        app.lightbox.content(contents, "account").show();
    },

    login: function () {
        var form = new Login();
        this.showContents(form.render().el);
        form.bind("success", function (user) {
            app.updateCurrentUser(user);
            app.lightbox.hide();
            if (app.notification){
                app.notification.success("You are now logged in.");
            }
        });
    },
    
    forgotDetails: function () {
        var form = new ForgotDetails();
        this.showContents(form.render().el);
    },

    signup: function () {
        var form = new SignUp({
            model: new User()
        });

        this.showContents(form.render().el);

        // Append iframe for avatar upload.
        form.updateFrame();

        form.bind("success", function (user) {
            app.updateCurrentUser(user);
            app.lightbox.hide();
            if (app.notification){
                app.notification.success("Your account has been created.");
            }
        });
    },

    account: function () {
        var form = new Account({
            model: app.currentUser
        });

        if (!app.currentUser) {
            window.location.hash = "#/login";
        }

        this.showContents(form.render().el);

        // Append iframe for avatar upload.
        form.updateFrame();

        form.bind("success", function (user) {
            app.updateCurrentUser(user);
            app.lightbox.hide();
            if (app.notification){
                app.notification.success("Your account has been updated!");
            }
        });
    },

    changePassword: function (id) {
        var form = new ChangePassword({
            model: Tasket.getUsers(id)
        });

        form.bind("success", function (user) {
            app.updateCurrentUser(user);
            app.lightbox.hide();
        });

        this.showContents(form.render().el);
    }
});

var DashboardController = Controller.extend({
    routes: {
        "/dashboard/user/:id": "showUser",
        "/dashboard/tasks/":   "showCurrentUserTasks",
        "/dashboard/hubs/":    "showCurrentUserHubs"
    },

    constructor: function DashboardController() {
        Controller.apply(this, arguments);
    },

    showCurrentUserTasks: function () {
        var user = app.currentUser;
    },

    showCurrentUserHubs: function () {
        var user = app.currentUser;
        app.dashboard.detail.title(app.lang.MY_HUBS).show();
    }
});

// PUBLIC API
_.extend(Tasket, Backbone.Events, {
    namespace: "tasket", // used for settings such as localStorage namespacing
    version: "0.1.0",
    endpoint: "/",
    
    defaultSettings: {
        CLAIMED_TIME_LIMIT: 72,
        USERS_CAN_CREATE_HUBS: true,
        TASK_ESTIMATE_MAX: 14400, // seconds that a task can take
        TASK_LIMIT: 10, // max number of un-verified tasks on a hub
        DONE_TIME_LIMIT: 72,
        CLAIMED_LIMIT: 5, // max number of tasks that a user can claim at one time
        AUTOVERIFY_TASKS_DONE_BY_OWNER: true // If this task was "done" by its owner, then automatically verify it - see /models/task.js
    },

    lang: {},

    hubs:  new HubList(),
    tasks: new TaskList(),
    users: new UserList(),

    failed: {
        hub:  [],
        task: [],
        user: []
    },

    now: now,

    /* Fetch users by id from the global cache. Returns a UserList of promise
     * models which may not all be loaded. If not all loaded the caller
     * can then listen to the "reset" event on the collection to be notified
     * when it changes.
     *
     * ids - An array of ids to fetch. (or single id of a model to fetch)
     *
     * Examples
     *
     *   var users = Tasket.getUsers([1, 2, 3, 4]);
     *   users.bind("reset", updateUserDisplay);
     *
     * Returns a UserList object.
     */
    getUsers: function (ids) {
        return Tasket.getModels(Tasket.users, ids);
    },

    /* Fetch tasks by id from the global cache. Returns a TaskList of promise
     * models which may not all be loaded. If not all loaded the caller
     * can then listen to the "reset" event on the collection to be notified
     * when it changes.
     *
     * ids - An array of ids to fetch. (or single id of a model to fetch)
     *
     * Examples
     *
     *   var tasks = Tasket.getTasks([1, 2, 3, 4]);
     *   tasks.bind("reset", updateTaskDisplay);
     *
     * Returns a TaskList object.
     */
    getTasks: function (ids) {
        return Tasket.getModels(Tasket.tasks, ids);
    },

    /* Fetch hubs by id from the global cache. Returns a HubList of promise
     * models which may not all be loaded. If not all loaded the caller
     * can then listen to the "reset" event on the collection to be notified
     * when it changes.
     *
     * ids - An array of ids to fetch. (or single id of a model to fetch)
     *
     * Examples
     *
     *   var hubs = Tasket.getHubs([1, 2, 3, 4]);
     *   hubs.bind("reset", updateHubDisplay);
     *
     * Returns a HubList object.
     */
    getHubs: function (ids) {
        return Tasket.getModels(Tasket.hubs, ids);
    },

    /* Fetch models from the global cache provided. If the model is not cached
     * an empty promise is created with just an id. Once the collection has
     * refreshed any ids that do not exist on the server will be removed from
     * the collection. So in order to display the correct data it"s best to
     * listen to the "reset" event to be notified when the fetch completes.
     *
     * collection - One of the Tasket Collection caches.
     * ids        - An array of ids to fetch. (or single id of a model to fetch)
     *
     * Examples
     *
     *   var hubs = Tasket.getModels(Tasket.hubs, [1, 2, 3, 4]);
     *   hubs.bind("reset", updateHubDisplay);
     *   Returns a Collection object.
     *
     *   var hub = Tasket.getModels(Tasket.hubs, 5);
     *   Returns a Model.
     *
     */
    getModels: function (collection, ids) {
        var wrappedModel, model,
            wrapped, type, Ctor, subset, toLoad, toLoadCopy, silent;
    
        // SINGLE MODEL
        if (!_.isArray(ids)){
            wrappedModel = this.getModels(collection, [ids]);
            model = wrappedModel.at(0);
            
            if (!model.isComplete()){
                wrappedModel.bind("reset", function onRefresh(){
                    wrappedModel.unbind("reset", onRefresh);
                    model.change();
                });
            }
            
            return model;
        }
        
        // COLLECTION OF MODELS
        wrapped    = _(ids);
        type       = collection.model.prototype.type;
        Ctor       = collection.constructor;
        subset     = new Ctor();
        toLoad     = new Ctor();
        toLoadCopy = new Ctor();
        silent     = {silent:true};

        // Removed previously failed ids.
        ids = wrapped.without.apply(wrapped, Tasket.failed[type]);

        _.each(ids, function (id) {
            var model = collection.get(id);

            if (id){
                if (!model) {
                    model = new collection.model({id: id});
                    toLoad.add(model, silent);
                    toLoadCopy.add(model, silent);
                    collection.add(model, silent);
                }
                subset.add(model, silent);
            }
        }, this);

        if (toLoad.length) {
            toLoad.bind("reset", function () {
                toLoad.each(function (model) {
                    // Update the model in the subset with the new data.
                    subset.get(model.id).set(model.toJSON());
                });

                // Remove all models from subset that appear in toLoadCopy
                // but not in toLoad. As they do not exist on the server.
                toLoadCopy.each(function (model) {
                    if (!toLoad.get(model.id)) {
                        subset.remove(model, silent);
                        collection.remove(model, silent);

                        // Cache the failed model id.
                        Tasket.failed[model.type].push(model.id);
                    }
                });

                subset.trigger("reset", subset, {});
            });
            
            toLoad.fetch();
        }
        else if (!subset.isComplete()) {
            // It's possible that a subset could contain models that are
            // currently being loaded in another request. In this case the
            // "reset" event will not fire. So we must watch each unloaded
            // model in the collection until they are all completed then manually
            // fire the "reset" event.
            subset.bind("change", function onChange() {
                if (subset.isComplete()) {
                    subset.unbind("change", onChange);
                    subset.trigger("reset", subset, {});
                }
            });
        }
        // Else, there is nothing to load at all

        return subset;
    },
    
    /* Fetch all archived hubs from the server
     * On complete, call the callback function, 
     * passing through a HubList of archived hub models
     */
    getArchivedHubs: function (callback) {
        jQuery.ajax({
            url: Tasket.endpoint + "hubs/?archived=true",
            contentType: "application/json",
            dataType: "json",
            success: function(response){
                var ids = [];
            
                _(response).each(function(hubData){
                    ids.push(hubData.id);
                    
                    if (!Tasket.hubs.get(hubData.id)){
                        Tasket.hubs.add(hubData);
                    }
                });
                callback(Tasket.getHubs(ids));
            },
            error: function(){
                callback(null);
            }
        });
    },
    
    getTasksByState: function (state, callback) {
        return jQuery.ajax({
            url: Tasket.endpoint + "tasks/?state=" + state,
            contentType: "application/json",
            dataType: "json",
            success: function(response){
                var ids = [];
            
                _(response).each(function(model){
                    ids.push(model.id);
                    
                    if (!Tasket.tasks.get(model.id)){
                        Tasket.tasks.add(model);
                    }
                });
                
                callback(Tasket.getTasks(ids));
            },
            error: function(){
                callback(null);
            }
        });
    },

    login: function(username, password, callback) {
        return jQuery.ajax({
            url: Tasket.endpoint + "login/",
            type: "POST",
            contentType: "application/json",
            // TODO: this should use JSON.stringify in case password contains double-quotes
            data: '{"username":"' + username + '","password":"' + password + '"}',
            dataType: "json",
            success: callback
        });
    },

    forgotDetails: function(data, callback) {
        return jQuery.ajax({
            url: Tasket.endpoint + "forgot-password/",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(data),
            dataType: "json",
            success: callback
        });
    },
    
    getData: function(methodName, success){
        return jQuery.ajax({
            url: Tasket.endpoint + methodName + "/",
            dataType: "json",
            success: success
        });
    },
    
    statistics: function(callback){
        return this.getData("statistics", callback);
    },
    
    settings: function(callback){
        return this.getData("settings", callback);
    },

    media: function (image) {
        return image ? "/media/" + image : "";
    },

    thumbnail: function (image, width, height, crop) {
        var url = "/thumb/" + width + "x" + height + "/" + image;
        return crop ? url + "?crop" : url;
    },

    // Republishes all events for models in the Tasket caches namespaced with
    // the model type. eg.
    //
    // Tasket.bind("hub:change:owner", updateHubOwner);
    _republishModelEvent: function () {
        var args = _.toArray(arguments);
        args[0] = this.type + ":" + args[0];
        Tasket.trigger.apply(Tasket, args);
    },
    
    // e.g. Tasket._addRemoveFromModelCollection(user, "16", "hubs.owned", {silent:true});
    _addRemoveFromModelCollection: function(model, childId, shouldBeAdded, collectionName, setOptions){
        // NOTE: we must clone the array so that Backbone successfully triggers a "change" event when it detects a difference in the previous and the changed attribute
        var ids, toSet;
        
        // Handle array of collections
        if (_.isArray(collectionName)){
            _.each(collectionName, function(collectionName){
                Tasket._addRemoveFromModelCollection(model, childId, shouldBeAdded, collectionName, setOptions);
            });
            return this;
        }
        
        ids = _.clone(model.get(collectionName));
        toSet = {};
        
        if (!_.isUndefined(ids.length)){
            // Add
            if (shouldBeAdded){
                if (!_.include(ids, childId)){
                    ids.push(childId);
                }
            }
            // Remove
            else {
                ids = _.without(ids, childId);
            }
            toSet[collectionName] = ids;
            model.set(toSet, setOptions);
        }
        
        return this;
    },
    
    _addRemoveHubOnUser: function(hub, isArchived, collectionsToUpdate){
        var hubId = hub.id,
            owner;

        if (!hubId){
            hub.bind("change:id", function(){
                Tasket._addRemoveHubOnUser(hub, isArchived, collectionsToUpdate);
            });
            return;
        }
    
        owner = Tasket.users.get(hub.get("owner"));
        
        if (owner){
            if (!collectionsToUpdate){
                collectionsToUpdate = hub.isArchived() ? ["hubs.owned", "hubs.archived"] : "hubs.owned";
            }
        
            Tasket._addRemoveFromModelCollection(owner, hubId, isArchived, collectionsToUpdate);
        }
    },
    
    _onHubAdded: function(hub){
        return Tasket._addRemoveHubOnUser(hub, true);
    },
    
    _onHubRemoved: function(hub){
        return Tasket._addRemoveHubOnUser(hub, false);
    },
    
    _onHubChangeArchived: function(hub){
        var isArchived = hub.isArchived(),
            taskIds = hub.getTasks(),
            tasks = _.each(taskIds, function(taskId){
                var task = Tasket.tasks.get(taskId),
                    toSet, owner, claimedBy;
                    
                if (task){
                    task.set({archived:isArchived});
                    
                    owner = Tasket.users.get(task.get("owner"));
                    
                    if (owner){
                        Tasket._addRemoveFromModelCollection(owner, taskId, isArchived, "tasks.owned.archived");
                    }
                    
                    claimedBy = Tasket.users.get(task.get("claimedBy"));
                    if (claimedBy){
                        Tasket._addRemoveFromModelCollection(claimedBy, taskId, isArchived, "tasks.claimed.archived");
                    }
                }
            });
        
        // TODO: change statistics.hubs and statistics.tasks (probably should cache statistics at Tasket.statistics)
        
        return Tasket._addRemoveHubOnUser(hub, isArchived, ["hubs.archived"]);
    },
    
    initialize: function(){
        // Extend Tasket.settings with defaultSettings
        _.defaults(this.settings, this.defaultSettings);

        // Re-publish events from models on to Tasket object
        this.hubs.bind("all", this._republishModelEvent);
        this.tasks.bind("all", this._republishModelEvent);
        this.users.bind("all", this._republishModelEvent);

        // Update user's owned hubs on hub add
        this.bind("hub:add", this._onHubAdded)
            .bind("hub:remove", this._onHubRemoved)
            .bind("hub:change:archived", this._onHubChangeArchived);
            
        // TODO: move user.task states here
    }
});

/////

Tasket.initialize();

// UI SETTINGS

var cache = new Cache(Tasket.namespace),
    app = _.extend({
        // Sets up the app. Called by init()
        setup: function () {
            // Cache the body element
            this.bodyElem = jQuery("body");

            // app properties
            _.extend(this, {
                slugs: {
                    hubs: "projects",
                    tasks: "tasks",
                    users: "users"
                },
                wallBuffer: 50, // Pixels margin that project nodes should keep away from the walls of the tank
                hubBuffer: 10,
                taskBuffer: 10,
                tankResizeThrottle: 1000,
                successNotificationHideDelay: 3500, // milliseconds before success notification is hidden; use `0` to not hide at all
                hubDescriptionTruncate: 45, // No. of chars to truncate hub description to
                taskDescriptionTruncate: 140, // No. of chars to truncate task description to
                hubImageWidth: 30,
                hubImageHeight: 30,
                hubPlaceholderImage: "tank/images/placeholder-hub.png",
                userInTaskImageWidth: 14,
                userInTaskImageHeight: 14,
                userPlaceholderImage: "tank/images/placeholder-user.png",
                animateHubs: false,
                animateTasks: false,
                loaded: false,
                useCsrfToken: true,
                useSessionId: true,
                authtoken: null,
                csrftoken: null,
                currentUser: null,
                selectedHub: null,
                allDoneTasks: null,
                cache: cache,
                statistics:     {tasks: this.blankTaskStatistics()},
                toolbar:        new Toolbar({el: jQuery(".header-container")[0]}),
                notification:   new Notification(),
                lightbox:       new Lightbox(),
                dashboard:      new Dashboard(),
                showCreatedByOnHubs: false,
                showCreatedByOnTasks: false
            });


            // BIND EVENTS
            Tasket.bind("task:change:state", this.updateTaskStatistics);

            // Listen for changes to the app.allDoneTasks collection, and redraw the dashboard tasks accordingly
            app.bind("change:currentUser", this._onChangeUser)
               .bind("change:currentUser", this._cacheChangesToCurrentUser);

            // Manage and restore the dashboard state.
            if (this.cache.get("dashboard-hidden") === true) {
                this.dashboard.hide();
            }

            this.dashboard.bind("all", function (eventName) {
                if (eventName === "show" || eventName === "hide") {
                    this.cache.set("dashboard-hidden", eventName === "hide");
                }
            }, this);

            this.setupCSSSupport();

            return this.trigger("setup", this);
        },

        // Add a class to the html element for all css properties that are
        // not supported. eg. class="no-transform no-transition".
        setupCSSSupport: function () {
            var root = document.documentElement;
            _.each(["transform"], function (prop) {
                var supported = getCSSProperty(prop);
                if (!supported) {
                    root.className += " no-" + prop;
                }
            });
        },

        // Create routes for all templates prefixed with "static-". When this
        // route is triggered the contents of the template will be loaded into
        // the lightbox.
        setupStaticTemplates: function () {
            var staticPrefix = "static-",
                prefixLength = staticPrefix.length;

            _.each(tim.templates(), function(template, name) {
                var route;

                if (name.indexOf(staticPrefix) === 0){
                    route = name.slice(prefixLength);
                    app.router.route("/" + route + "/", route, function () {
                        app.lightbox.content(template).show();
                    });
                }
            });

            return this;
        },
        
        // Override the value of Tasket.settings with the
        // values returned from the server
        _cacheServerSettings: function(){
            return Tasket.settings(function (data) {
                _.extend(Tasket.settings, data);
                app.trigger("change:settings", Tasket.settings);
            });
        },
        
        _cacheStatistics: function(){
            return Tasket.statistics(function (data) {
                _.each(data.tasks, function (value, key) {
                    data.tasks[key] = parseInt(value, 10);
                });
                app.statistics = data;
                app.trigger("change:statistics", app.statistics, app);
            });
        },

        _cacheChangesToCurrentUser: function(user){
            user.bind("change", function cacheOnChange(user){
                // Cache currentUser to localStorage
                if (app.currentUser && app.currentUser.id === user.id){
                    app.cacheCurrentUser(user);
                }
                else {
                    user.unbind("change", cacheOnChange);
                }
            });
        },

        _onChangeUser: function(user){
            // Update all done tasks in system if currentUser is an admin and needs to see that information
            if (app.currentUserIsAdmin()){
                if (!app.allDoneTasks){
                    Tasket.bind("task:change:state", app.updateAllDoneTasks)
                          .bind("task:remove", app.updateAllDoneTasks);
                          
                    app.fetchAllDoneTasks();
                }
            }
            else {
                app.allDoneTasks = null;
                Tasket.unbind("task:change:state", app.updateAllDoneTasks);
            }
        },

        // Sets up the app. Called by init() on app "ready".
        ready: function () {
            var options;
            
            this.router = new Backbone.Router();
            options = {router: this.router};
            
            _.extend(this, {
                // The controllers will make Ajax calls on their init, so are created after app init
                tank: new TankController(options),
                accountController: new AccountController(options),
                dashController: new DashboardController(options)
            });

            // Set up routes for static templates
            this.setupStaticTemplates();
            
            /////

            // THE TANK

            this.tank
                .bind("hub:select", function(hubView){
                    app.selectedHubView = hubView;
                    app.selectedHub = hubView.model.id; // TODO: this should be changed to cache the whole model object, not just the id
                    app.bodyElem.addClass("hubSelected");
                    app.dashboard.hubAnchorSelect();
                })
                .bind("hub:deselect", function(hubView){
                    if (hubView.model.id === app.selectedHub){
                        app.selectedHubView = app.selectedHub = null;
                        app.bodyElem.removeClass("hubSelected");
                    }
                });
                
            // Route views' requests for window.location changes to the tank controller
            app.bind("request:change:location", function(view){
                var url = app.tank.clientUrl(view.model);
                if (url){
                    app.tank.navigate(url, true);
                }
            });

            /////

            return this.trigger("ready", this);
        },

        // init() accepts jQuery deferred objects as returned by jQuery.ajax() or
        // created manually using new jQuery.Deferred(). These objects are
        // are queued up. When the method is called with no arguments it waits
        // until all deferreds are resolved and triggers the "success" event.
        //
        // All init functions should be passed to this method then it should
        // be called with no arguments to kickstart the app. Any dependancies can
        // listen for the "success" and "error" events.
        init: (function () {
            var callbacks = [];

            return function (deferred) {
                if (callbacks && deferred) {
                    // Push the callbacks into our queue.
                    callbacks.push(deferred);
                }
                else if (callbacks === null) {
                    throw "Cannot add more callbacks. init() has already been run";
                }
                else if (app.loaded !== true) {
                    // Setup app properties that are not dependant on anything.
                    app.setup();

                    // Kick off init(). Trigger "success" if all deferreds return
                    // successfully. Else trigger an "error" event.
                    jQuery.when.apply(null, callbacks).then(
                        function () {
                            app.ready();
                            app.loaded = true;
                        },
                        function () {
                            app.trigger("error", app);
                        }
                    );
                    callbacks = null;
                }
                return app;
            };
        }()),

        truncate: function(str, charLimit, continuationStr){
            if (str && str.length > charLimit){
                continuationStr = continuationStr || "…";
                return str
                    .slice(0, charLimit + continuationStr.length)
                    .replace(/\W*(\w*|\W*)$/, "") +
                    continuationStr;
            }
            return str;
        },

        // Convert between bottom-zeroed and top-zeroed coordinate systems
        invertY: function(y, maxValue){
            maxValue = maxValue || app.tank.tankHeight;

            return maxValue - y;
        },

        isCurrentUser: function (id) {
            return !!(app.currentUser && id === app.currentUser.id);
        },

        currentUserIsAdmin: function(){
            return !!(app.currentUser && app.currentUser.isAdmin());
        },

        isCurrentUserOrAdmin: function(id){
            return app.isCurrentUser(id) || app.currentUserIsAdmin();
        },

        restoreCache: function(){
            var currentUserData = app.cache.get("currentUser"),
                currentUser, username;

            // If we don't have a session cookie, destroy the cache. Django will
            // continually set this cookie so this will only really work if the
            // cookie itself expires.
            if (!this.getCookie("sessionid")) {
                if (currentUserData) {
                    username = currentUserData.username;

                    // Redirect to login form
                    window.location.hash = "/login/";

                    // Pre-populate the username field
                    setTimeout(function () {
                        jQuery('#field-username').val(username);
                    }, 200);
                }

                // Destroy the cache.
                this.destroyCache();
            }

            else if (currentUserData){
                currentUser = app.updateCurrentUser(new User(currentUserData), false);
                currentUser.fetch({
                    success: app.updateCurrentUser
                }); // Store to cache again
            }

            app.authtoken = app.cache.get("authtoken");
            app.csrftoken = app.cache.get("csrftoken");
            
            return app;
        },

        destroyCache: function () {
            app.cache
                .remove("currentUser")
                .remove("authtoken")
                .remove("csrftoken");
        },

        cacheCurrentUser: function(user){
            app.cache.set("currentUser", user.toJSON());
            return app;
        },

        updateCurrentUser: function (user, saveToCache) {
            if (user){
                if (!Tasket.users.get(user.id)){
                    Tasket.users.add(user);
                }
                app.currentUser = user;

                if (saveToCache !== false){
                    app.cacheCurrentUser(user);
                }
                app.trigger("change:currentUser", app.currentUser); // see dashboard.js > Dashboard.setUser()
            }
            return app.currentUser;
        },

        _triggerAllDoneTasksChange: function(){
            app.trigger("change:allDoneTasks", app.allDoneTasks);
            return app;
        },

        fetchAllDoneTasks: function(){
            Tasket.getTasksByState("done", function(allDoneTasks){
                if (allDoneTasks){
                    app.allDoneTasks = allDoneTasks;
                }
                // There was a server/connectivity error, and we haven't yet fetched the list of done tasks. Use an empty tasks collection.
                else if (!app.allDoneTasks){
                    app.allDoneTasks = new TaskList();
                }
                else {
                    return;
                }

                // Trigger on app whenever the allDoneTasks collection changes
                allDoneTasks
                    .bind("change", app._triggerAllDoneTasksChange)
                    .bind("remove", app._triggerAllDoneTasksChange);

                // Trigger now
                app._triggerAllDoneTasksChange();
            });

            return app;
        },

        updateAllDoneTasks: function(task){ // based on user.updateTask(); called when task changes state
            var allDoneTasks = app.allDoneTasks,
                id, isDone, wasDone, wasDeleted, storedTask;

            if (allDoneTasks){
                isDone  = task.get("state") === Task.states.DONE;
                wasDone = task.previous("state") === Task.states.DONE;

                // Remove this task from the allDoneTasks collection
                if (isDone || wasDone){
                    id = task.id;
                    wasDeleted = !Tasket.tasks.get(id);
                    storedTask = allDoneTasks.detect(function(doneTask){
                        return id === doneTask.id;
                    });

                    // Add the task, if it is in the DONE state
                    if (!storedTask && isDone){
                        allDoneTasks.add(task, {silent: true});
                    }

                    // Remove the task, if it is no longer in the DONE state
                    else if (storedTask && !isDone || storedTask && wasDeleted){
                        allDoneTasks.remove(storedTask, {silent: true});
                    }
                }
            }

            return app;
        },

        setAuthtoken: function(authtoken){
            app.authtoken = authtoken;
            app.cache.set("authtoken", app.authtoken);
            return app.trigger("change:authtoken", authtoken); // see dashboard.js > Dashboard.setUser()
        },

        // Update the location bar with a previous hash.
        back: function(historyCount){
            var prev = Backbone.history.getPrevious(historyCount);
            if (!prev) {
                prev = "/";
            }
            Backbone.history.navigate(prev);
            return app;
        },

        getCookie: function(name){
            var docCookie = window.document.cookie,
                cookieValue, cookies, cookie, i;

            if (docCookie && docCookie !== "") {
                cookies = docCookie.split(";");

                for (i = 0; i < cookies.length; i+=1) {
                    cookie = jQuery.trim(cookies[i]);
                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) === (name + "=")) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        },

        sendCsrfToken: function(xhr){
            var csrftoken = app.csrftoken;
            if (!csrftoken){
                csrftoken = app.csrftoken = this.getCookie("csrftoken");
            }
            if (csrftoken){
                xhr.setRequestHeader("X-CSRFToken", this.getCookie("csrftoken"));
            }
            return xhr;
        },

        sendSessionId: function(xhr){
            if (app.authtoken){
                xhr.setRequestHeader("Authorization", app.authtoken);
            }
            return xhr;
        },

        sendAuthorization: function(xhr, url){
            // Only send authorisation for requests sent to the Tasket API
            if (url.indexOf(Tasket.endpoint) === 0){
                xhr.withCredentials = true;

                if (app.useCsrfToken){
                    app.sendCsrfToken(xhr);
                }
                if (app.useSessionId){
                    app.sendSessionId(xhr);
                }
            }
            return xhr;
        },

        setupAuthentication: function(){
            jQuery.ajaxSetup({
                beforeSend: function(xhr, settings){
                    app.sendAuthorization(xhr, settings.url);
                }
            });
            return app;
        },

        // Returns true if the browser supports Tasket's tech
        isSupported: (function () {
            var supportsSVG, supportsLocalStorage;

            // SVG SUPPORT
            // from http://diveintohtml5.org/everything.html#svg
            supportsSVG = !!(document.createElementNS && document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect);

            // LOCAL STORAGE SUPPORT
            // This has already been determined by cache.js, so we'll use that
            supportsLocalStorage = !!cache.localStorage;

            return function () {
                return supportsSVG && supportsLocalStorage;
            };
        }()),

        blankTaskStatistics: function(){
            return {
                "new": 0,
                "claimed": 0,
                "done": 0,
                "verified": 0
            };
        },

        // Update the global statistics object when a task state changes. This
        // is a callback fruntion for the Tasket "task:change:state" event.
        updateTaskStatistics: function (model) {
            var current, previous,
                wasAlreadyAccountedFor = !model.previous("estimate"); // NOTE: this is a check to see if this task was an empty scaffold, created in Tasket.getModels and the fetched from the server and populated. If it was, then it has already been taken into account by the intial statistics fetch in init.js

            if (wasAlreadyAccountedFor){
                return;
            }

            current  = model.get("state");
            previous = model.previous("state");

            app.statistics.tasks[current]  += 1;
            app.statistics.tasks[previous] -= 1;

            app.trigger("change:statistics", app.statistics, app);
        }
    }, Backbone.Events);

// LANGUAGE
// For a custom installation, don't override the text in this file. Instead use /lang/custom.js and add your own text to the relevant property in that file.

app.lang = {
    LOADING:                "Loading...",
    DOWNLOAD_ERROR:         "There was a problem downloading data from the server.",
    INIT_ERROR:             "Sorry. There was a problem loading the app. Please <a href=''>refresh and try again</a>.",
    HUB_NO_TASKS:           "No tasks",
    DELETE_HUB_CONFIRM:     "Deleting a project will permanently erase it, and all associated tasks. Continue?",
    ARCHIVE_HUB_CONFIRM:    "Archiving a project will hide it from view.  Archived projects can be restored by selecting 'View archived projects' in the sidebar. Continue?",
    RESTORE_HUB_CONFIRM:    "Restoring a project will make it visible again. Continue?",
    DELETE_TASK_CONFIRM:    "This will permanently delete this task. Continue?",
    HUB:                    "hub",
    MY_HUBS:                "My Hubs",
    ESTIMATED_TIME:         "Estimated Time: "
};

// LANGUAGE
// For a custom installation, don't override the text in this file. Instead use /lang/custom.js and add your own text to the relevant property in that file.

_.extend(app.lang, {
    //LOADING:              "Un moment....",
    // etc
    
    HUB:                    "project",
    MY_HUBS:                "My Projects",
    CANCEL_TASK:            "Actually, I won't do it"
});

/*
// custom js, e.g.
Tasket.settings.USERS_CAN_CREATE_HUBS = false;

app.bind("ready", function () {
    alert("Tasket boilerplate custom code")
});
*/
// Run after app properties have been setup.
app.bind("setup", function() {

    // BIND EVENTS

    // Return to the previous route when the lightbox closes
    app.lightbox.bind("hide", function(){
        app.back(app.lightbox.historyCount);
    });
    
    // Render views
    app.bodyElem
      .append(app.dashboard.el)
      .append(app.lightbox.render().el);

    // We must render after it's appended to the DOM so that the
    // height can be calculated.
    app.dashboard.render();
});

// Called when the app has all dependancies loaded.
app.bind("ready", function onReady () {
    app.notification.hide();
    app.tank.addHubs(Tasket.hubs.models);

    // Destroy the cached user details when the logout button is clicked.
    // This block can be removed once Ticket #84 has been resolved and the
    // server deletes the "sessionid" cookie on logout:
    // https://github.com/dharmafly/tasket/issues/84
    jQuery("form[action='/logout/']").submit(function (event) {
        app.destroyCache();
    });

    // Watch for button clicks that affect the state of tasks. These buttons
    // should have two attributes:
    //
    // data-task-state - The new task state.
    // data-task-id    - The id of the task to update.
    //
    // Example:
    //
    // <button data-task-state="verify" data-task-id="2">Verify Task</button>
    jQuery("[data-task-state][data-task-id]").live("click", function () {
        var button = jQuery(this),
            state = button.data("task-state"),
            id = button.data("task-id"),
            task;

        if (state === Task.states.CLAIMED) {
            if (!app.currentUser) {
                app.notification.error(
                    "Please <a href='#/login/'>login</a> to start claiming tasks"
                );
                return;
            }
            else if (!app.currentUser.canClaimTasks()) {
                app.notification.error(
                    "You cannot claim more than " + Tasket.settings.CLAIMED_LIMIT + " tasks at a time"
                );
                return;
            }
        }

        task = Tasket.getTasks([id]).at(0);
        if (task && state) {
            task.state(state, app.currentUser.id).save();
        }
    });

    // If user lands on root update the url to "/#/" for consistency. This
    // can be removed should the history API be implemented.
    if (!window.location.hash) {
        window.location.hash = "/";
    }

    // Need to restore the user from the cache once all the hubs are loaded.
    // This ensures that the users hubs are not requested before Tasket.hubs
    // is reset.
    app.restoreCache().setupAuthentication();

    Backbone.history.start();
});

// Called when the bootstrap methods fail.
app.bind("error", function (data) {
    app.notification.error(app.lang.INIT_ERROR);
});

if (app.isSupported()) {
    // Bootstrap the app with all open hubs.
    app.init(jQuery.ajax({
        url: "/hubs/",
        success: function (json) {
            Tasket.hubs.reset(json);
        },
        error: function () {
            app.notification.error(app.lang.DOWNLOAD_ERROR);
        }
    }));

    // Load the statistics url.
    app.init(app._cacheStatistics());
    
    // Load the server settings.
    // Override the value of Tasket.settings with the
    // values returned from the server
    app.init(app._cacheServerSettings());

    // Timeout required to prevent notification appearing immediately (seen in Chrome)
    window.setTimeout(function(){
        if (!app.loaded){
            app.notification.warning(app.lang.LOADING);
        }
    }, 0);

    // TODO: setTimeout in case of non-load -> show error and cancel all open xhr
    app.init();
}

else {
    (function () {

        // Display friendly unsupported message to the user.
        var lightbox = new Lightbox();
        app.bodyElem = jQuery("body")
            .find(":not(script)")
            .remove()
            .end()
            .append(lightbox.render().el);
        lightbox.content(tim("unsupported")).show();
    }());
}


Tasket.app = app;
window.Tasket = Tasket;

}(this, this.document));
