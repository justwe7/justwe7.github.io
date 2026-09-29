/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/workbox-core/_private/Deferred.js":
/*!********************************************************!*\
  !*** ./node_modules/workbox-core/_private/Deferred.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Deferred": () => (/* binding */ Deferred)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * The Deferred class composes Promises in a way that allows for them to be
 * resolved or rejected from outside the constructor. In most cases promises
 * should be used directly, but Deferreds can be necessary when the logic to
 * resolve a promise must be separate.
 *
 * @private
 */
class Deferred {
    /**
     * Creates a promise and exposes its resolve and reject functions as methods.
     */
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}



/***/ }),

/***/ "./node_modules/workbox-core/_private/WorkboxError.js":
/*!************************************************************!*\
  !*** ./node_modules/workbox-core/_private/WorkboxError.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WorkboxError": () => (/* binding */ WorkboxError)
/* harmony export */ });
/* harmony import */ var _models_messages_messageGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/messages/messageGenerator.js */ "./node_modules/workbox-core/models/messages/messageGenerator.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_1__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/


/**
 * Workbox errors should be thrown with this class.
 * This allows use to ensure the type easily in tests,
 * helps developers identify errors from workbox
 * easily and allows use to optimise error
 * messages correctly.
 *
 * @private
 */
class WorkboxError extends Error {
    /**
     *
     * @param {string} errorCode The error code that
     * identifies this particular error.
     * @param {Object=} details Any relevant arguments
     * that will help developers identify issues should
     * be added as a key on the context object.
     */
    constructor(errorCode, details) {
        const message = (0,_models_messages_messageGenerator_js__WEBPACK_IMPORTED_MODULE_0__.messageGenerator)(errorCode, details);
        super(message);
        this.name = errorCode;
        this.details = details;
    }
}



/***/ }),

/***/ "./node_modules/workbox-core/_private/assert.js":
/*!******************************************************!*\
  !*** ./node_modules/workbox-core/_private/assert.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "assert": () => (/* binding */ finalAssertExports)
/* harmony export */ });
/* harmony import */ var _private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_private/WorkboxError.js */ "./node_modules/workbox-core/_private/WorkboxError.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_1__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/


/*
 * This method throws if the supplied value is not an array.
 * The destructed values are required to produce a meaningful error for users.
 * The destructed and restructured object is so it's clear what is
 * needed.
 */
const isArray = (value, details) => {
    if (!Array.isArray(value)) {
        throw new _private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_0__.WorkboxError('not-an-array', details);
    }
};
const hasMethod = (object, expectedMethod, details) => {
    const type = typeof object[expectedMethod];
    if (type !== 'function') {
        details['expectedMethod'] = expectedMethod;
        throw new _private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_0__.WorkboxError('missing-a-method', details);
    }
};
const isType = (object, expectedType, details) => {
    if (typeof object !== expectedType) {
        details['expectedType'] = expectedType;
        throw new _private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_0__.WorkboxError('incorrect-type', details);
    }
};
const isInstance = (object, 
// Need the general type to do the check later.
// eslint-disable-next-line @typescript-eslint/ban-types
expectedClass, details) => {
    if (!(object instanceof expectedClass)) {
        details['expectedClassName'] = expectedClass.name;
        throw new _private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_0__.WorkboxError('incorrect-class', details);
    }
};
const isOneOf = (value, validValues, details) => {
    if (!validValues.includes(value)) {
        details['validValueDescription'] = `Valid values are ${JSON.stringify(validValues)}.`;
        throw new _private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_0__.WorkboxError('invalid-value', details);
    }
};
const isArrayOfClass = (value, 
// Need general type to do check later.
expectedClass, // eslint-disable-line
details) => {
    const error = new _private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_0__.WorkboxError('not-array-of-class', details);
    if (!Array.isArray(value)) {
        throw error;
    }
    for (const item of value) {
        if (!(item instanceof expectedClass)) {
            throw error;
        }
    }
};
const finalAssertExports =  false
    ? 0
    : {
        hasMethod,
        isArray,
        isInstance,
        isOneOf,
        isType,
        isArrayOfClass,
    };



/***/ }),

/***/ "./node_modules/workbox-core/_private/cacheMatchIgnoreParams.js":
/*!**********************************************************************!*\
  !*** ./node_modules/workbox-core/_private/cacheMatchIgnoreParams.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cacheMatchIgnoreParams": () => (/* binding */ cacheMatchIgnoreParams)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2020 Google LLC
  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

function stripParams(fullURL, ignoreParams) {
    const strippedURL = new URL(fullURL);
    for (const param of ignoreParams) {
        strippedURL.searchParams.delete(param);
    }
    return strippedURL.href;
}
/**
 * Matches an item in the cache, ignoring specific URL params. This is similar
 * to the `ignoreSearch` option, but it allows you to ignore just specific
 * params (while continuing to match on the others).
 *
 * @private
 * @param {Cache} cache
 * @param {Request} request
 * @param {Object} matchOptions
 * @param {Array<string>} ignoreParams
 * @return {Promise<Response|undefined>}
 */
async function cacheMatchIgnoreParams(cache, request, ignoreParams, matchOptions) {
    const strippedRequestURL = stripParams(request.url, ignoreParams);
    // If the request doesn't include any ignored params, match as normal.
    if (request.url === strippedRequestURL) {
        return cache.match(request, matchOptions);
    }
    // Otherwise, match by comparing keys
    const keysOptions = Object.assign(Object.assign({}, matchOptions), { ignoreSearch: true });
    const cacheKeys = await cache.keys(request, keysOptions);
    for (const cacheKey of cacheKeys) {
        const strippedCacheKeyURL = stripParams(cacheKey.url, ignoreParams);
        if (strippedRequestURL === strippedCacheKeyURL) {
            return cache.match(cacheKey, matchOptions);
        }
    }
    return;
}



/***/ }),

/***/ "./node_modules/workbox-core/_private/cacheNames.js":
/*!**********************************************************!*\
  !*** ./node_modules/workbox-core/_private/cacheNames.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cacheNames": () => (/* binding */ cacheNames)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

const _cacheNameDetails = {
    googleAnalytics: 'googleAnalytics',
    precache: 'precache-v2',
    prefix: 'workbox',
    runtime: 'runtime',
    suffix: typeof registration !== 'undefined' ? registration.scope : '',
};
const _createCacheName = (cacheName) => {
    return [_cacheNameDetails.prefix, cacheName, _cacheNameDetails.suffix]
        .filter((value) => value && value.length > 0)
        .join('-');
};
const eachCacheNameDetail = (fn) => {
    for (const key of Object.keys(_cacheNameDetails)) {
        fn(key);
    }
};
const cacheNames = {
    updateDetails: (details) => {
        eachCacheNameDetail((key) => {
            if (typeof details[key] === 'string') {
                _cacheNameDetails[key] = details[key];
            }
        });
    },
    getGoogleAnalyticsName: (userCacheName) => {
        return userCacheName || _createCacheName(_cacheNameDetails.googleAnalytics);
    },
    getPrecacheName: (userCacheName) => {
        return userCacheName || _createCacheName(_cacheNameDetails.precache);
    },
    getPrefix: () => {
        return _cacheNameDetails.prefix;
    },
    getRuntimeName: (userCacheName) => {
        return userCacheName || _createCacheName(_cacheNameDetails.runtime);
    },
    getSuffix: () => {
        return _cacheNameDetails.suffix;
    },
};


/***/ }),

/***/ "./node_modules/workbox-core/_private/canConstructResponseFromBodyStream.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/workbox-core/_private/canConstructResponseFromBodyStream.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "canConstructResponseFromBodyStream": () => (/* binding */ canConstructResponseFromBodyStream)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

let supportStatus;
/**
 * A utility function that determines whether the current browser supports
 * constructing a new `Response` from a `response.body` stream.
 *
 * @return {boolean} `true`, if the current browser can successfully
 *     construct a `Response` from a `response.body` stream, `false` otherwise.
 *
 * @private
 */
function canConstructResponseFromBodyStream() {
    if (supportStatus === undefined) {
        const testResponse = new Response('');
        if ('body' in testResponse) {
            try {
                new Response(testResponse.body);
                supportStatus = true;
            }
            catch (error) {
                supportStatus = false;
            }
        }
        supportStatus = false;
    }
    return supportStatus;
}



/***/ }),

/***/ "./node_modules/workbox-core/_private/executeQuotaErrorCallbacks.js":
/*!**************************************************************************!*\
  !*** ./node_modules/workbox-core/_private/executeQuotaErrorCallbacks.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "executeQuotaErrorCallbacks": () => (/* binding */ executeQuotaErrorCallbacks)
/* harmony export */ });
/* harmony import */ var _private_logger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_private/logger.js */ "./node_modules/workbox-core/_private/logger.js");
/* harmony import */ var _models_quotaErrorCallbacks_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/quotaErrorCallbacks.js */ "./node_modules/workbox-core/models/quotaErrorCallbacks.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_2__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/



/**
 * Runs all of the callback functions, one at a time sequentially, in the order
 * in which they were registered.
 *
 * @memberof workbox-core
 * @private
 */
async function executeQuotaErrorCallbacks() {
    if (true) {
        _private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.log(`About to run ${_models_quotaErrorCallbacks_js__WEBPACK_IMPORTED_MODULE_1__.quotaErrorCallbacks.size} ` +
            `callbacks to clean up caches.`);
    }
    for (const callback of _models_quotaErrorCallbacks_js__WEBPACK_IMPORTED_MODULE_1__.quotaErrorCallbacks) {
        await callback();
        if (true) {
            _private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.log(callback, 'is complete.');
        }
    }
    if (true) {
        _private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.log('Finished running callbacks.');
    }
}



/***/ }),

/***/ "./node_modules/workbox-core/_private/getFriendlyURL.js":
/*!**************************************************************!*\
  !*** ./node_modules/workbox-core/_private/getFriendlyURL.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getFriendlyURL": () => (/* binding */ getFriendlyURL)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

const getFriendlyURL = (url) => {
    const urlObj = new URL(String(url), location.href);
    // See https://github.com/GoogleChrome/workbox/issues/2323
    // We want to include everything, except for the origin if it's same-origin.
    return urlObj.href.replace(new RegExp(`^${location.origin}`), '');
};



/***/ }),

/***/ "./node_modules/workbox-core/_private/logger.js":
/*!******************************************************!*\
  !*** ./node_modules/workbox-core/_private/logger.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "logger": () => (/* binding */ logger)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2019 Google LLC
  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

const logger = ( false
    ? 0
    : (() => {
        // Don't overwrite this value if it's already set.
        // See https://github.com/GoogleChrome/workbox/pull/2284#issuecomment-560470923
        if (!('__WB_DISABLE_DEV_LOGS' in self)) {
            self.__WB_DISABLE_DEV_LOGS = false;
        }
        let inGroup = false;
        const methodToColorMap = {
            debug: `#7f8c8d`,
            log: `#2ecc71`,
            warn: `#f39c12`,
            error: `#c0392b`,
            groupCollapsed: `#3498db`,
            groupEnd: null, // No colored prefix on groupEnd
        };
        const print = function (method, args) {
            if (self.__WB_DISABLE_DEV_LOGS) {
                return;
            }
            if (method === 'groupCollapsed') {
                // Safari doesn't print all console.groupCollapsed() arguments:
                // https://bugs.webkit.org/show_bug.cgi?id=182754
                if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
                    console[method](...args);
                    return;
                }
            }
            const styles = [
                `background: ${methodToColorMap[method]}`,
                `border-radius: 0.5em`,
                `color: white`,
                `font-weight: bold`,
                `padding: 2px 0.5em`,
            ];
            // When in a group, the workbox prefix is not displayed.
            const logPrefix = inGroup ? [] : ['%cworkbox', styles.join(';')];
            console[method](...logPrefix, ...args);
            if (method === 'groupCollapsed') {
                inGroup = true;
            }
            if (method === 'groupEnd') {
                inGroup = false;
            }
        };
        // eslint-disable-next-line @typescript-eslint/ban-types
        const api = {};
        const loggerMethods = Object.keys(methodToColorMap);
        for (const key of loggerMethods) {
            const method = key;
            api[method] = (...args) => {
                print(method, args);
            };
        }
        return api;
    })());



/***/ }),

/***/ "./node_modules/workbox-core/_private/timeout.js":
/*!*******************************************************!*\
  !*** ./node_modules/workbox-core/_private/timeout.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "timeout": () => (/* binding */ timeout)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2019 Google LLC
  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * Returns a promise that resolves and the passed number of milliseconds.
 * This utility is an async/await-friendly version of `setTimeout`.
 *
 * @param {number} ms
 * @return {Promise}
 * @private
 */
function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}


/***/ }),

/***/ "./node_modules/workbox-core/_private/waitUntil.js":
/*!*********************************************************!*\
  !*** ./node_modules/workbox-core/_private/waitUntil.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "waitUntil": () => (/* binding */ waitUntil)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2020 Google LLC
  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * A utility method that makes it easier to use `event.waitUntil` with
 * async functions and return the result.
 *
 * @param {ExtendableEvent} event
 * @param {Function} asyncFn
 * @return {Function}
 * @private
 */
function waitUntil(event, asyncFn) {
    const returnPromise = asyncFn();
    event.waitUntil(returnPromise);
    return returnPromise;
}



/***/ }),

/***/ "./node_modules/workbox-core/_version.js":
/*!***********************************************!*\
  !*** ./node_modules/workbox-core/_version.js ***!
  \***********************************************/
/***/ (() => {


// @ts-ignore
try {
    self['workbox:core:6.5.3'] && _();
}
catch (e) { }


/***/ }),

/***/ "./node_modules/workbox-core/copyResponse.js":
/*!***************************************************!*\
  !*** ./node_modules/workbox-core/copyResponse.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "copyResponse": () => (/* binding */ copyResponse)
/* harmony export */ });
/* harmony import */ var _private_canConstructResponseFromBodyStream_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_private/canConstructResponseFromBodyStream.js */ "./node_modules/workbox-core/_private/canConstructResponseFromBodyStream.js");
/* harmony import */ var _private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_private/WorkboxError.js */ "./node_modules/workbox-core/_private/WorkboxError.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_2__);
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/



/**
 * Allows developers to copy a response and modify its `headers`, `status`,
 * or `statusText` values (the values settable via a
 * [`ResponseInit`]{@link https://developer.mozilla.org/en-US/docs/Web/API/Response/Response#Syntax}
 * object in the constructor).
 * To modify these values, pass a function as the second argument. That
 * function will be invoked with a single object with the response properties
 * `{headers, status, statusText}`. The return value of this function will
 * be used as the `ResponseInit` for the new `Response`. To change the values
 * either modify the passed parameter(s) and return it, or return a totally
 * new object.
 *
 * This method is intentionally limited to same-origin responses, regardless of
 * whether CORS was used or not.
 *
 * @param {Response} response
 * @param {Function} modifier
 * @memberof workbox-core
 */
async function copyResponse(response, modifier) {
    let origin = null;
    // If response.url isn't set, assume it's cross-origin and keep origin null.
    if (response.url) {
        const responseURL = new URL(response.url);
        origin = responseURL.origin;
    }
    if (origin !== self.location.origin) {
        throw new _private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_1__.WorkboxError('cross-origin-copy-response', { origin });
    }
    const clonedResponse = response.clone();
    // Create a fresh `ResponseInit` object by cloning the headers.
    const responseInit = {
        headers: new Headers(clonedResponse.headers),
        status: clonedResponse.status,
        statusText: clonedResponse.statusText,
    };
    // Apply any user modifications.
    const modifiedResponseInit = modifier ? modifier(responseInit) : responseInit;
    // Create the new response from the body stream and `ResponseInit`
    // modifications. Note: not all browsers support the Response.body stream,
    // so fall back to reading the entire body into memory as a blob.
    const body = (0,_private_canConstructResponseFromBodyStream_js__WEBPACK_IMPORTED_MODULE_0__.canConstructResponseFromBodyStream)()
        ? clonedResponse.body
        : await clonedResponse.blob();
    return new Response(body, modifiedResponseInit);
}



/***/ }),

/***/ "./node_modules/workbox-core/models/messages/messageGenerator.js":
/*!***********************************************************************!*\
  !*** ./node_modules/workbox-core/models/messages/messageGenerator.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "messageGenerator": () => (/* binding */ messageGenerator)
/* harmony export */ });
/* harmony import */ var _messages_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./messages.js */ "./node_modules/workbox-core/models/messages/messages.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_1__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/


const fallback = (code, ...args) => {
    let msg = code;
    if (args.length > 0) {
        msg += ` :: ${JSON.stringify(args)}`;
    }
    return msg;
};
const generatorFunction = (code, details = {}) => {
    const message = _messages_js__WEBPACK_IMPORTED_MODULE_0__.messages[code];
    if (!message) {
        throw new Error(`Unable to find message for code '${code}'.`);
    }
    return message(details);
};
const messageGenerator =  false ? 0 : generatorFunction;


/***/ }),

/***/ "./node_modules/workbox-core/models/messages/messages.js":
/*!***************************************************************!*\
  !*** ./node_modules/workbox-core/models/messages/messages.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "messages": () => (/* binding */ messages)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

const messages = {
    'invalid-value': ({ paramName, validValueDescription, value }) => {
        if (!paramName || !validValueDescription) {
            throw new Error(`Unexpected input to 'invalid-value' error.`);
        }
        return (`The '${paramName}' parameter was given a value with an ` +
            `unexpected value. ${validValueDescription} Received a value of ` +
            `${JSON.stringify(value)}.`);
    },
    'not-an-array': ({ moduleName, className, funcName, paramName }) => {
        if (!moduleName || !className || !funcName || !paramName) {
            throw new Error(`Unexpected input to 'not-an-array' error.`);
        }
        return (`The parameter '${paramName}' passed into ` +
            `'${moduleName}.${className}.${funcName}()' must be an array.`);
    },
    'incorrect-type': ({ expectedType, paramName, moduleName, className, funcName, }) => {
        if (!expectedType || !paramName || !moduleName || !funcName) {
            throw new Error(`Unexpected input to 'incorrect-type' error.`);
        }
        const classNameStr = className ? `${className}.` : '';
        return (`The parameter '${paramName}' passed into ` +
            `'${moduleName}.${classNameStr}` +
            `${funcName}()' must be of type ${expectedType}.`);
    },
    'incorrect-class': ({ expectedClassName, paramName, moduleName, className, funcName, isReturnValueProblem, }) => {
        if (!expectedClassName || !moduleName || !funcName) {
            throw new Error(`Unexpected input to 'incorrect-class' error.`);
        }
        const classNameStr = className ? `${className}.` : '';
        if (isReturnValueProblem) {
            return (`The return value from ` +
                `'${moduleName}.${classNameStr}${funcName}()' ` +
                `must be an instance of class ${expectedClassName}.`);
        }
        return (`The parameter '${paramName}' passed into ` +
            `'${moduleName}.${classNameStr}${funcName}()' ` +
            `must be an instance of class ${expectedClassName}.`);
    },
    'missing-a-method': ({ expectedMethod, paramName, moduleName, className, funcName, }) => {
        if (!expectedMethod ||
            !paramName ||
            !moduleName ||
            !className ||
            !funcName) {
            throw new Error(`Unexpected input to 'missing-a-method' error.`);
        }
        return (`${moduleName}.${className}.${funcName}() expected the ` +
            `'${paramName}' parameter to expose a '${expectedMethod}' method.`);
    },
    'add-to-cache-list-unexpected-type': ({ entry }) => {
        return (`An unexpected entry was passed to ` +
            `'workbox-precaching.PrecacheController.addToCacheList()' The entry ` +
            `'${JSON.stringify(entry)}' isn't supported. You must supply an array of ` +
            `strings with one or more characters, objects with a url property or ` +
            `Request objects.`);
    },
    'add-to-cache-list-conflicting-entries': ({ firstEntry, secondEntry }) => {
        if (!firstEntry || !secondEntry) {
            throw new Error(`Unexpected input to ` + `'add-to-cache-list-duplicate-entries' error.`);
        }
        return (`Two of the entries passed to ` +
            `'workbox-precaching.PrecacheController.addToCacheList()' had the URL ` +
            `${firstEntry} but different revision details. Workbox is ` +
            `unable to cache and version the asset correctly. Please remove one ` +
            `of the entries.`);
    },
    'plugin-error-request-will-fetch': ({ thrownErrorMessage }) => {
        if (!thrownErrorMessage) {
            throw new Error(`Unexpected input to ` + `'plugin-error-request-will-fetch', error.`);
        }
        return (`An error was thrown by a plugins 'requestWillFetch()' method. ` +
            `The thrown error message was: '${thrownErrorMessage}'.`);
    },
    'invalid-cache-name': ({ cacheNameId, value }) => {
        if (!cacheNameId) {
            throw new Error(`Expected a 'cacheNameId' for error 'invalid-cache-name'`);
        }
        return (`You must provide a name containing at least one character for ` +
            `setCacheDetails({${cacheNameId}: '...'}). Received a value of ` +
            `'${JSON.stringify(value)}'`);
    },
    'unregister-route-but-not-found-with-method': ({ method }) => {
        if (!method) {
            throw new Error(`Unexpected input to ` +
                `'unregister-route-but-not-found-with-method' error.`);
        }
        return (`The route you're trying to unregister was not  previously ` +
            `registered for the method type '${method}'.`);
    },
    'unregister-route-route-not-registered': () => {
        return (`The route you're trying to unregister was not previously ` +
            `registered.`);
    },
    'queue-replay-failed': ({ name }) => {
        return `Replaying the background sync queue '${name}' failed.`;
    },
    'duplicate-queue-name': ({ name }) => {
        return (`The Queue name '${name}' is already being used. ` +
            `All instances of backgroundSync.Queue must be given unique names.`);
    },
    'expired-test-without-max-age': ({ methodName, paramName }) => {
        return (`The '${methodName}()' method can only be used when the ` +
            `'${paramName}' is used in the constructor.`);
    },
    'unsupported-route-type': ({ moduleName, className, funcName, paramName }) => {
        return (`The supplied '${paramName}' parameter was an unsupported type. ` +
            `Please check the docs for ${moduleName}.${className}.${funcName} for ` +
            `valid input types.`);
    },
    'not-array-of-class': ({ value, expectedClass, moduleName, className, funcName, paramName, }) => {
        return (`The supplied '${paramName}' parameter must be an array of ` +
            `'${expectedClass}' objects. Received '${JSON.stringify(value)},'. ` +
            `Please check the call to ${moduleName}.${className}.${funcName}() ` +
            `to fix the issue.`);
    },
    'max-entries-or-age-required': ({ moduleName, className, funcName }) => {
        return (`You must define either config.maxEntries or config.maxAgeSeconds` +
            `in ${moduleName}.${className}.${funcName}`);
    },
    'statuses-or-headers-required': ({ moduleName, className, funcName }) => {
        return (`You must define either config.statuses or config.headers` +
            `in ${moduleName}.${className}.${funcName}`);
    },
    'invalid-string': ({ moduleName, funcName, paramName }) => {
        if (!paramName || !moduleName || !funcName) {
            throw new Error(`Unexpected input to 'invalid-string' error.`);
        }
        return (`When using strings, the '${paramName}' parameter must start with ` +
            `'http' (for cross-origin matches) or '/' (for same-origin matches). ` +
            `Please see the docs for ${moduleName}.${funcName}() for ` +
            `more info.`);
    },
    'channel-name-required': () => {
        return (`You must provide a channelName to construct a ` +
            `BroadcastCacheUpdate instance.`);
    },
    'invalid-responses-are-same-args': () => {
        return (`The arguments passed into responsesAreSame() appear to be ` +
            `invalid. Please ensure valid Responses are used.`);
    },
    'expire-custom-caches-only': () => {
        return (`You must provide a 'cacheName' property when using the ` +
            `expiration plugin with a runtime caching strategy.`);
    },
    'unit-must-be-bytes': ({ normalizedRangeHeader }) => {
        if (!normalizedRangeHeader) {
            throw new Error(`Unexpected input to 'unit-must-be-bytes' error.`);
        }
        return (`The 'unit' portion of the Range header must be set to 'bytes'. ` +
            `The Range header provided was "${normalizedRangeHeader}"`);
    },
    'single-range-only': ({ normalizedRangeHeader }) => {
        if (!normalizedRangeHeader) {
            throw new Error(`Unexpected input to 'single-range-only' error.`);
        }
        return (`Multiple ranges are not supported. Please use a  single start ` +
            `value, and optional end value. The Range header provided was ` +
            `"${normalizedRangeHeader}"`);
    },
    'invalid-range-values': ({ normalizedRangeHeader }) => {
        if (!normalizedRangeHeader) {
            throw new Error(`Unexpected input to 'invalid-range-values' error.`);
        }
        return (`The Range header is missing both start and end values. At least ` +
            `one of those values is needed. The Range header provided was ` +
            `"${normalizedRangeHeader}"`);
    },
    'no-range-header': () => {
        return `No Range header was found in the Request provided.`;
    },
    'range-not-satisfiable': ({ size, start, end }) => {
        return (`The start (${start}) and end (${end}) values in the Range are ` +
            `not satisfiable by the cached response, which is ${size} bytes.`);
    },
    'attempt-to-cache-non-get-request': ({ url, method }) => {
        return (`Unable to cache '${url}' because it is a '${method}' request and ` +
            `only 'GET' requests can be cached.`);
    },
    'cache-put-with-no-response': ({ url }) => {
        return (`There was an attempt to cache '${url}' but the response was not ` +
            `defined.`);
    },
    'no-response': ({ url, error }) => {
        let message = `The strategy could not generate a response for '${url}'.`;
        if (error) {
            message += ` The underlying error is ${error}.`;
        }
        return message;
    },
    'bad-precaching-response': ({ url, status }) => {
        return (`The precaching request for '${url}' failed` +
            (status ? ` with an HTTP status of ${status}.` : `.`));
    },
    'non-precached-url': ({ url }) => {
        return (`createHandlerBoundToURL('${url}') was called, but that URL is ` +
            `not precached. Please pass in a URL that is precached instead.`);
    },
    'add-to-cache-list-conflicting-integrities': ({ url }) => {
        return (`Two of the entries passed to ` +
            `'workbox-precaching.PrecacheController.addToCacheList()' had the URL ` +
            `${url} with different integrity values. Please remove one of them.`);
    },
    'missing-precache-entry': ({ cacheName, url }) => {
        return `Unable to find a precached response in ${cacheName} for ${url}.`;
    },
    'cross-origin-copy-response': ({ origin }) => {
        return (`workbox-core.copyResponse() can only be used with same-origin ` +
            `responses. It was passed a response with origin ${origin}.`);
    },
    'opaque-streams-source': ({ type }) => {
        const message = `One of the workbox-streams sources resulted in an ` +
            `'${type}' response.`;
        if (type === 'opaqueredirect') {
            return (`${message} Please do not use a navigation request that results ` +
                `in a redirect as a source.`);
        }
        return `${message} Please ensure your sources are CORS-enabled.`;
    },
};


/***/ }),

/***/ "./node_modules/workbox-core/models/quotaErrorCallbacks.js":
/*!*****************************************************************!*\
  !*** ./node_modules/workbox-core/models/quotaErrorCallbacks.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "quotaErrorCallbacks": () => (/* binding */ quotaErrorCallbacks)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

// Callbacks to be executed whenever there's a quota error.
// Can't change Function type right now.
// eslint-disable-next-line @typescript-eslint/ban-types
const quotaErrorCallbacks = new Set();



/***/ }),

/***/ "./node_modules/workbox-precaching/PrecacheController.js":
/*!***************************************************************!*\
  !*** ./node_modules/workbox-precaching/PrecacheController.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PrecacheController": () => (/* binding */ PrecacheController)
/* harmony export */ });
/* harmony import */ var workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-core/_private/assert.js */ "./node_modules/workbox-core/_private/assert.js");
/* harmony import */ var workbox_core_private_cacheNames_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! workbox-core/_private/cacheNames.js */ "./node_modules/workbox-core/_private/cacheNames.js");
/* harmony import */ var workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! workbox-core/_private/logger.js */ "./node_modules/workbox-core/_private/logger.js");
/* harmony import */ var workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! workbox-core/_private/WorkboxError.js */ "./node_modules/workbox-core/_private/WorkboxError.js");
/* harmony import */ var workbox_core_private_waitUntil_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! workbox-core/_private/waitUntil.js */ "./node_modules/workbox-core/_private/waitUntil.js");
/* harmony import */ var _utils_createCacheKey_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/createCacheKey.js */ "./node_modules/workbox-precaching/utils/createCacheKey.js");
/* harmony import */ var _utils_PrecacheInstallReportPlugin_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/PrecacheInstallReportPlugin.js */ "./node_modules/workbox-precaching/utils/PrecacheInstallReportPlugin.js");
/* harmony import */ var _utils_PrecacheCacheKeyPlugin_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/PrecacheCacheKeyPlugin.js */ "./node_modules/workbox-precaching/utils/PrecacheCacheKeyPlugin.js");
/* harmony import */ var _utils_printCleanupDetails_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/printCleanupDetails.js */ "./node_modules/workbox-precaching/utils/printCleanupDetails.js");
/* harmony import */ var _utils_printInstallDetails_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utils/printInstallDetails.js */ "./node_modules/workbox-precaching/utils/printInstallDetails.js");
/* harmony import */ var _PrecacheStrategy_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./PrecacheStrategy.js */ "./node_modules/workbox-precaching/PrecacheStrategy.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_11__);
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/












/**
 * Performs efficient precaching of assets.
 *
 * @memberof workbox-precaching
 */
class PrecacheController {
    /**
     * Create a new PrecacheController.
     *
     * @param {Object} [options]
     * @param {string} [options.cacheName] The cache to use for precaching.
     * @param {string} [options.plugins] Plugins to use when precaching as well
     * as responding to fetch events for precached assets.
     * @param {boolean} [options.fallbackToNetwork=true] Whether to attempt to
     * get the response from the network if there's a precache miss.
     */
    constructor({ cacheName, plugins = [], fallbackToNetwork = true, } = {}) {
        this._urlsToCacheKeys = new Map();
        this._urlsToCacheModes = new Map();
        this._cacheKeysToIntegrities = new Map();
        this._strategy = new _PrecacheStrategy_js__WEBPACK_IMPORTED_MODULE_10__.PrecacheStrategy({
            cacheName: workbox_core_private_cacheNames_js__WEBPACK_IMPORTED_MODULE_1__.cacheNames.getPrecacheName(cacheName),
            plugins: [
                ...plugins,
                new _utils_PrecacheCacheKeyPlugin_js__WEBPACK_IMPORTED_MODULE_7__.PrecacheCacheKeyPlugin({ precacheController: this }),
            ],
            fallbackToNetwork,
        });
        // Bind the install and activate methods to the instance.
        this.install = this.install.bind(this);
        this.activate = this.activate.bind(this);
    }
    /**
     * @type {workbox-precaching.PrecacheStrategy} The strategy created by this controller and
     * used to cache assets and respond to fetch events.
     */
    get strategy() {
        return this._strategy;
    }
    /**
     * Adds items to the precache list, removing any duplicates and
     * stores the files in the
     * {@link workbox-core.cacheNames|"precache cache"} when the service
     * worker installs.
     *
     * This method can be called multiple times.
     *
     * @param {Array<Object|string>} [entries=[]] Array of entries to precache.
     */
    precache(entries) {
        this.addToCacheList(entries);
        if (!this._installAndActiveListenersAdded) {
            self.addEventListener('install', this.install);
            self.addEventListener('activate', this.activate);
            this._installAndActiveListenersAdded = true;
        }
    }
    /**
     * This method will add items to the precache list, removing duplicates
     * and ensuring the information is valid.
     *
     * @param {Array<workbox-precaching.PrecacheController.PrecacheEntry|string>} entries
     *     Array of entries to precache.
     */
    addToCacheList(entries) {
        if (true) {
            workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.isArray(entries, {
                moduleName: 'workbox-precaching',
                className: 'PrecacheController',
                funcName: 'addToCacheList',
                paramName: 'entries',
            });
        }
        const urlsToWarnAbout = [];
        for (const entry of entries) {
            // See https://github.com/GoogleChrome/workbox/issues/2259
            if (typeof entry === 'string') {
                urlsToWarnAbout.push(entry);
            }
            else if (entry && entry.revision === undefined) {
                urlsToWarnAbout.push(entry.url);
            }
            const { cacheKey, url } = (0,_utils_createCacheKey_js__WEBPACK_IMPORTED_MODULE_5__.createCacheKey)(entry);
            const cacheMode = typeof entry !== 'string' && entry.revision ? 'reload' : 'default';
            if (this._urlsToCacheKeys.has(url) &&
                this._urlsToCacheKeys.get(url) !== cacheKey) {
                throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_3__.WorkboxError('add-to-cache-list-conflicting-entries', {
                    firstEntry: this._urlsToCacheKeys.get(url),
                    secondEntry: cacheKey,
                });
            }
            if (typeof entry !== 'string' && entry.integrity) {
                if (this._cacheKeysToIntegrities.has(cacheKey) &&
                    this._cacheKeysToIntegrities.get(cacheKey) !== entry.integrity) {
                    throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_3__.WorkboxError('add-to-cache-list-conflicting-integrities', {
                        url,
                    });
                }
                this._cacheKeysToIntegrities.set(cacheKey, entry.integrity);
            }
            this._urlsToCacheKeys.set(url, cacheKey);
            this._urlsToCacheModes.set(url, cacheMode);
            if (urlsToWarnAbout.length > 0) {
                const warningMessage = `Workbox is precaching URLs without revision ` +
                    `info: ${urlsToWarnAbout.join(', ')}\nThis is generally NOT safe. ` +
                    `Learn more at https://bit.ly/wb-precache`;
                if (false) {}
                else {
                    workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_2__.logger.warn(warningMessage);
                }
            }
        }
    }
    /**
     * Precaches new and updated assets. Call this method from the service worker
     * install event.
     *
     * Note: this method calls `event.waitUntil()` for you, so you do not need
     * to call it yourself in your event handlers.
     *
     * @param {ExtendableEvent} event
     * @return {Promise<workbox-precaching.InstallResult>}
     */
    install(event) {
        // waitUntil returns Promise<any>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return (0,workbox_core_private_waitUntil_js__WEBPACK_IMPORTED_MODULE_4__.waitUntil)(event, async () => {
            const installReportPlugin = new _utils_PrecacheInstallReportPlugin_js__WEBPACK_IMPORTED_MODULE_6__.PrecacheInstallReportPlugin();
            this.strategy.plugins.push(installReportPlugin);
            // Cache entries one at a time.
            // See https://github.com/GoogleChrome/workbox/issues/2528
            for (const [url, cacheKey] of this._urlsToCacheKeys) {
                const integrity = this._cacheKeysToIntegrities.get(cacheKey);
                const cacheMode = this._urlsToCacheModes.get(url);
                const request = new Request(url, {
                    integrity,
                    cache: cacheMode,
                    credentials: 'same-origin',
                });
                await Promise.all(this.strategy.handleAll({
                    params: { cacheKey },
                    request,
                    event,
                }));
            }
            const { updatedURLs, notUpdatedURLs } = installReportPlugin;
            if (true) {
                (0,_utils_printInstallDetails_js__WEBPACK_IMPORTED_MODULE_9__.printInstallDetails)(updatedURLs, notUpdatedURLs);
            }
            return { updatedURLs, notUpdatedURLs };
        });
    }
    /**
     * Deletes assets that are no longer present in the current precache manifest.
     * Call this method from the service worker activate event.
     *
     * Note: this method calls `event.waitUntil()` for you, so you do not need
     * to call it yourself in your event handlers.
     *
     * @param {ExtendableEvent} event
     * @return {Promise<workbox-precaching.CleanupResult>}
     */
    activate(event) {
        // waitUntil returns Promise<any>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return (0,workbox_core_private_waitUntil_js__WEBPACK_IMPORTED_MODULE_4__.waitUntil)(event, async () => {
            const cache = await self.caches.open(this.strategy.cacheName);
            const currentlyCachedRequests = await cache.keys();
            const expectedCacheKeys = new Set(this._urlsToCacheKeys.values());
            const deletedURLs = [];
            for (const request of currentlyCachedRequests) {
                if (!expectedCacheKeys.has(request.url)) {
                    await cache.delete(request);
                    deletedURLs.push(request.url);
                }
            }
            if (true) {
                (0,_utils_printCleanupDetails_js__WEBPACK_IMPORTED_MODULE_8__.printCleanupDetails)(deletedURLs);
            }
            return { deletedURLs };
        });
    }
    /**
     * Returns a mapping of a precached URL to the corresponding cache key, taking
     * into account the revision information for the URL.
     *
     * @return {Map<string, string>} A URL to cache key mapping.
     */
    getURLsToCacheKeys() {
        return this._urlsToCacheKeys;
    }
    /**
     * Returns a list of all the URLs that have been precached by the current
     * service worker.
     *
     * @return {Array<string>} The precached URLs.
     */
    getCachedURLs() {
        return [...this._urlsToCacheKeys.keys()];
    }
    /**
     * Returns the cache key used for storing a given URL. If that URL is
     * unversioned, like `/index.html', then the cache key will be the original
     * URL with a search parameter appended to it.
     *
     * @param {string} url A URL whose cache key you want to look up.
     * @return {string} The versioned URL that corresponds to a cache key
     * for the original URL, or undefined if that URL isn't precached.
     */
    getCacheKeyForURL(url) {
        const urlObject = new URL(url, location.href);
        return this._urlsToCacheKeys.get(urlObject.href);
    }
    /**
     * @param {string} url A cache key whose SRI you want to look up.
     * @return {string} The subresource integrity associated with the cache key,
     * or undefined if it's not set.
     */
    getIntegrityForCacheKey(cacheKey) {
        return this._cacheKeysToIntegrities.get(cacheKey);
    }
    /**
     * This acts as a drop-in replacement for
     * [`cache.match()`](https://developer.mozilla.org/en-US/docs/Web/API/Cache/match)
     * with the following differences:
     *
     * - It knows what the name of the precache is, and only checks in that cache.
     * - It allows you to pass in an "original" URL without versioning parameters,
     * and it will automatically look up the correct cache key for the currently
     * active revision of that URL.
     *
     * E.g., `matchPrecache('index.html')` will find the correct precached
     * response for the currently active service worker, even if the actual cache
     * key is `'/index.html?__WB_REVISION__=1234abcd'`.
     *
     * @param {string|Request} request The key (without revisioning parameters)
     * to look up in the precache.
     * @return {Promise<Response|undefined>}
     */
    async matchPrecache(request) {
        const url = request instanceof Request ? request.url : request;
        const cacheKey = this.getCacheKeyForURL(url);
        if (cacheKey) {
            const cache = await self.caches.open(this.strategy.cacheName);
            return cache.match(cacheKey);
        }
        return undefined;
    }
    /**
     * Returns a function that looks up `url` in the precache (taking into
     * account revision information), and returns the corresponding `Response`.
     *
     * @param {string} url The precached URL which will be used to lookup the
     * `Response`.
     * @return {workbox-routing~handlerCallback}
     */
    createHandlerBoundToURL(url) {
        const cacheKey = this.getCacheKeyForURL(url);
        if (!cacheKey) {
            throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_3__.WorkboxError('non-precached-url', { url });
        }
        return (options) => {
            options.request = new Request(url);
            options.params = Object.assign({ cacheKey }, options.params);
            return this.strategy.handle(options);
        };
    }
}



/***/ }),

/***/ "./node_modules/workbox-precaching/PrecacheFallbackPlugin.js":
/*!*******************************************************************!*\
  !*** ./node_modules/workbox-precaching/PrecacheFallbackPlugin.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PrecacheFallbackPlugin": () => (/* binding */ PrecacheFallbackPlugin)
/* harmony export */ });
/* harmony import */ var _utils_getOrCreatePrecacheController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/getOrCreatePrecacheController.js */ "./node_modules/workbox-precaching/utils/getOrCreatePrecacheController.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_1__);
/*
  Copyright 2020 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/


/**
 * `PrecacheFallbackPlugin` allows you to specify an "offline fallback"
 * response to be used when a given strategy is unable to generate a response.
 *
 * It does this by intercepting the `handlerDidError` plugin callback
 * and returning a precached response, taking the expected revision parameter
 * into account automatically.
 *
 * Unless you explicitly pass in a `PrecacheController` instance to the
 * constructor, the default instance will be used. Generally speaking, most
 * developers will end up using the default.
 *
 * @memberof workbox-precaching
 */
class PrecacheFallbackPlugin {
    /**
     * Constructs a new PrecacheFallbackPlugin with the associated fallbackURL.
     *
     * @param {Object} config
     * @param {string} config.fallbackURL A precached URL to use as the fallback
     *     if the associated strategy can't generate a response.
     * @param {PrecacheController} [config.precacheController] An optional
     *     PrecacheController instance. If not provided, the default
     *     PrecacheController will be used.
     */
    constructor({ fallbackURL, precacheController, }) {
        /**
         * @return {Promise<Response>} The precache response for the fallback URL.
         *
         * @private
         */
        this.handlerDidError = () => this._precacheController.matchPrecache(this._fallbackURL);
        this._fallbackURL = fallbackURL;
        this._precacheController =
            precacheController || (0,_utils_getOrCreatePrecacheController_js__WEBPACK_IMPORTED_MODULE_0__.getOrCreatePrecacheController)();
    }
}



/***/ }),

/***/ "./node_modules/workbox-precaching/PrecacheRoute.js":
/*!**********************************************************!*\
  !*** ./node_modules/workbox-precaching/PrecacheRoute.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PrecacheRoute": () => (/* binding */ PrecacheRoute)
/* harmony export */ });
/* harmony import */ var workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-core/_private/logger.js */ "./node_modules/workbox-core/_private/logger.js");
/* harmony import */ var workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! workbox-core/_private/getFriendlyURL.js */ "./node_modules/workbox-core/_private/getFriendlyURL.js");
/* harmony import */ var workbox_routing_Route_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! workbox-routing/Route.js */ "./node_modules/workbox-routing/Route.js");
/* harmony import */ var _utils_generateURLVariations_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/generateURLVariations.js */ "./node_modules/workbox-precaching/utils/generateURLVariations.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_4__);
/*
  Copyright 2020 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/





/**
 * A subclass of {@link workbox-routing.Route} that takes a
 * {@link workbox-precaching.PrecacheController}
 * instance and uses it to match incoming requests and handle fetching
 * responses from the precache.
 *
 * @memberof workbox-precaching
 * @extends workbox-routing.Route
 */
class PrecacheRoute extends workbox_routing_Route_js__WEBPACK_IMPORTED_MODULE_2__.Route {
    /**
     * @param {PrecacheController} precacheController A `PrecacheController`
     * instance used to both match requests and respond to fetch events.
     * @param {Object} [options] Options to control how requests are matched
     * against the list of precached URLs.
     * @param {string} [options.directoryIndex=index.html] The `directoryIndex` will
     * check cache entries for a URLs ending with '/' to see if there is a hit when
     * appending the `directoryIndex` value.
     * @param {Array<RegExp>} [options.ignoreURLParametersMatching=[/^utm_/, /^fbclid$/]] An
     * array of regex's to remove search params when looking for a cache match.
     * @param {boolean} [options.cleanURLs=true] The `cleanURLs` option will
     * check the cache for the URL with a `.html` added to the end of the end.
     * @param {workbox-precaching~urlManipulation} [options.urlManipulation]
     * This is a function that should take a URL and return an array of
     * alternative URLs that should be checked for precache matches.
     */
    constructor(precacheController, options) {
        const match = ({ request, }) => {
            const urlsToCacheKeys = precacheController.getURLsToCacheKeys();
            for (const possibleURL of (0,_utils_generateURLVariations_js__WEBPACK_IMPORTED_MODULE_3__.generateURLVariations)(request.url, options)) {
                const cacheKey = urlsToCacheKeys.get(possibleURL);
                if (cacheKey) {
                    const integrity = precacheController.getIntegrityForCacheKey(cacheKey);
                    return { cacheKey, integrity };
                }
            }
            if (true) {
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.debug(`Precaching did not find a match for ` + (0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_1__.getFriendlyURL)(request.url));
            }
            return;
        };
        super(match, precacheController.strategy);
    }
}



/***/ }),

/***/ "./node_modules/workbox-precaching/PrecacheStrategy.js":
/*!*************************************************************!*\
  !*** ./node_modules/workbox-precaching/PrecacheStrategy.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PrecacheStrategy": () => (/* binding */ PrecacheStrategy)
/* harmony export */ });
/* harmony import */ var workbox_core_copyResponse_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-core/copyResponse.js */ "./node_modules/workbox-core/copyResponse.js");
/* harmony import */ var workbox_core_private_cacheNames_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! workbox-core/_private/cacheNames.js */ "./node_modules/workbox-core/_private/cacheNames.js");
/* harmony import */ var workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! workbox-core/_private/getFriendlyURL.js */ "./node_modules/workbox-core/_private/getFriendlyURL.js");
/* harmony import */ var workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! workbox-core/_private/logger.js */ "./node_modules/workbox-core/_private/logger.js");
/* harmony import */ var workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! workbox-core/_private/WorkboxError.js */ "./node_modules/workbox-core/_private/WorkboxError.js");
/* harmony import */ var workbox_strategies_Strategy_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! workbox-strategies/Strategy.js */ "./node_modules/workbox-strategies/Strategy.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_6__);
/*
  Copyright 2020 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/







/**
 * A {@link workbox-strategies.Strategy} implementation
 * specifically designed to work with
 * {@link workbox-precaching.PrecacheController}
 * to both cache and fetch precached assets.
 *
 * Note: an instance of this class is created automatically when creating a
 * `PrecacheController`; it's generally not necessary to create this yourself.
 *
 * @extends workbox-strategies.Strategy
 * @memberof workbox-precaching
 */
class PrecacheStrategy extends workbox_strategies_Strategy_js__WEBPACK_IMPORTED_MODULE_5__.Strategy {
    /**
     *
     * @param {Object} [options]
     * @param {string} [options.cacheName] Cache name to store and retrieve
     * requests. Defaults to the cache names provided by
     * {@link workbox-core.cacheNames}.
     * @param {Array<Object>} [options.plugins] {@link https://developers.google.com/web/tools/workbox/guides/using-plugins|Plugins}
     * to use in conjunction with this caching strategy.
     * @param {Object} [options.fetchOptions] Values passed along to the
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters|init}
     * of all fetch() requests made by this strategy.
     * @param {Object} [options.matchOptions] The
     * {@link https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions|CacheQueryOptions}
     * for any `cache.match()` or `cache.put()` calls made by this strategy.
     * @param {boolean} [options.fallbackToNetwork=true] Whether to attempt to
     * get the response from the network if there's a precache miss.
     */
    constructor(options = {}) {
        options.cacheName = workbox_core_private_cacheNames_js__WEBPACK_IMPORTED_MODULE_1__.cacheNames.getPrecacheName(options.cacheName);
        super(options);
        this._fallbackToNetwork =
            options.fallbackToNetwork === false ? false : true;
        // Redirected responses cannot be used to satisfy a navigation request, so
        // any redirected response must be "copied" rather than cloned, so the new
        // response doesn't contain the `redirected` flag. See:
        // https://bugs.chromium.org/p/chromium/issues/detail?id=669363&desc=2#c1
        this.plugins.push(PrecacheStrategy.copyRedirectedCacheableResponsesPlugin);
    }
    /**
     * @private
     * @param {Request|string} request A request to run this strategy for.
     * @param {workbox-strategies.StrategyHandler} handler The event that
     *     triggered the request.
     * @return {Promise<Response>}
     */
    async _handle(request, handler) {
        const response = await handler.cacheMatch(request);
        if (response) {
            return response;
        }
        // If this is an `install` event for an entry that isn't already cached,
        // then populate the cache.
        if (handler.event && handler.event.type === 'install') {
            return await this._handleInstall(request, handler);
        }
        // Getting here means something went wrong. An entry that should have been
        // precached wasn't found in the cache.
        return await this._handleFetch(request, handler);
    }
    async _handleFetch(request, handler) {
        let response;
        const params = (handler.params || {});
        // Fall back to the network if we're configured to do so.
        if (this._fallbackToNetwork) {
            if (true) {
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.warn(`The precached response for ` +
                    `${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_2__.getFriendlyURL)(request.url)} in ${this.cacheName} was not ` +
                    `found. Falling back to the network.`);
            }
            const integrityInManifest = params.integrity;
            const integrityInRequest = request.integrity;
            const noIntegrityConflict = !integrityInRequest || integrityInRequest === integrityInManifest;
            // Do not add integrity if the original request is no-cors
            // See https://github.com/GoogleChrome/workbox/issues/3096
            response = await handler.fetch(new Request(request, {
                integrity: request.mode !== 'no-cors'
                    ? integrityInRequest || integrityInManifest
                    : undefined,
            }));
            // It's only "safe" to repair the cache if we're using SRI to guarantee
            // that the response matches the precache manifest's expectations,
            // and there's either a) no integrity property in the incoming request
            // or b) there is an integrity, and it matches the precache manifest.
            // See https://github.com/GoogleChrome/workbox/issues/2858
            // Also if the original request users no-cors we don't use integrity.
            // See https://github.com/GoogleChrome/workbox/issues/3096
            if (integrityInManifest &&
                noIntegrityConflict &&
                request.mode !== 'no-cors') {
                this._useDefaultCacheabilityPluginIfNeeded();
                const wasCached = await handler.cachePut(request, response.clone());
                if (true) {
                    if (wasCached) {
                        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.log(`A response for ${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_2__.getFriendlyURL)(request.url)} ` +
                            `was used to "repair" the precache.`);
                    }
                }
            }
        }
        else {
            // This shouldn't normally happen, but there are edge cases:
            // https://github.com/GoogleChrome/workbox/issues/1441
            throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_4__.WorkboxError('missing-precache-entry', {
                cacheName: this.cacheName,
                url: request.url,
            });
        }
        if (true) {
            const cacheKey = params.cacheKey || (await handler.getCacheKey(request, 'read'));
            // Workbox is going to handle the route.
            // print the routing details to the console.
            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.groupCollapsed(`Precaching is responding to: ` + (0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_2__.getFriendlyURL)(request.url));
            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.log(`Serving the precached url: ${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_2__.getFriendlyURL)(cacheKey instanceof Request ? cacheKey.url : cacheKey)}`);
            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.groupCollapsed(`View request details here.`);
            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.log(request);
            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.groupEnd();
            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.groupCollapsed(`View response details here.`);
            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.log(response);
            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.groupEnd();
            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.groupEnd();
        }
        return response;
    }
    async _handleInstall(request, handler) {
        this._useDefaultCacheabilityPluginIfNeeded();
        const response = await handler.fetch(request);
        // Make sure we defer cachePut() until after we know the response
        // should be cached; see https://github.com/GoogleChrome/workbox/issues/2737
        const wasCached = await handler.cachePut(request, response.clone());
        if (!wasCached) {
            // Throwing here will lead to the `install` handler failing, which
            // we want to do if *any* of the responses aren't safe to cache.
            throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_4__.WorkboxError('bad-precaching-response', {
                url: request.url,
                status: response.status,
            });
        }
        return response;
    }
    /**
     * This method is complex, as there a number of things to account for:
     *
     * The `plugins` array can be set at construction, and/or it might be added to
     * to at any time before the strategy is used.
     *
     * At the time the strategy is used (i.e. during an `install` event), there
     * needs to be at least one plugin that implements `cacheWillUpdate` in the
     * array, other than `copyRedirectedCacheableResponsesPlugin`.
     *
     * - If this method is called and there are no suitable `cacheWillUpdate`
     * plugins, we need to add `defaultPrecacheCacheabilityPlugin`.
     *
     * - If this method is called and there is exactly one `cacheWillUpdate`, then
     * we don't have to do anything (this might be a previously added
     * `defaultPrecacheCacheabilityPlugin`, or it might be a custom plugin).
     *
     * - If this method is called and there is more than one `cacheWillUpdate`,
     * then we need to check if one is `defaultPrecacheCacheabilityPlugin`. If so,
     * we need to remove it. (This situation is unlikely, but it could happen if
     * the strategy is used multiple times, the first without a `cacheWillUpdate`,
     * and then later on after manually adding a custom `cacheWillUpdate`.)
     *
     * See https://github.com/GoogleChrome/workbox/issues/2737 for more context.
     *
     * @private
     */
    _useDefaultCacheabilityPluginIfNeeded() {
        let defaultPluginIndex = null;
        let cacheWillUpdatePluginCount = 0;
        for (const [index, plugin] of this.plugins.entries()) {
            // Ignore the copy redirected plugin when determining what to do.
            if (plugin === PrecacheStrategy.copyRedirectedCacheableResponsesPlugin) {
                continue;
            }
            // Save the default plugin's index, in case it needs to be removed.
            if (plugin === PrecacheStrategy.defaultPrecacheCacheabilityPlugin) {
                defaultPluginIndex = index;
            }
            if (plugin.cacheWillUpdate) {
                cacheWillUpdatePluginCount++;
            }
        }
        if (cacheWillUpdatePluginCount === 0) {
            this.plugins.push(PrecacheStrategy.defaultPrecacheCacheabilityPlugin);
        }
        else if (cacheWillUpdatePluginCount > 1 && defaultPluginIndex !== null) {
            // Only remove the default plugin; multiple custom plugins are allowed.
            this.plugins.splice(defaultPluginIndex, 1);
        }
        // Nothing needs to be done if cacheWillUpdatePluginCount is 1
    }
}
PrecacheStrategy.defaultPrecacheCacheabilityPlugin = {
    async cacheWillUpdate({ response }) {
        if (!response || response.status >= 400) {
            return null;
        }
        return response;
    },
};
PrecacheStrategy.copyRedirectedCacheableResponsesPlugin = {
    async cacheWillUpdate({ response }) {
        return response.redirected ? await (0,workbox_core_copyResponse_js__WEBPACK_IMPORTED_MODULE_0__.copyResponse)(response) : response;
    },
};



/***/ }),

/***/ "./node_modules/workbox-precaching/_types.js":
/*!***************************************************!*\
  !*** ./node_modules/workbox-precaching/_types.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

// * * * IMPORTANT! * * *
// ------------------------------------------------------------------------- //
// jdsoc type definitions cannot be declared above TypeScript definitions or
// they'll be stripped from the built `.js` files, and they'll only be in the
// `d.ts` files, which aren't read by the jsdoc generator. As a result we
// have to put declare them below.
/**
 * @typedef {Object} InstallResult
 * @property {Array<string>} updatedURLs List of URLs that were updated during
 * installation.
 * @property {Array<string>} notUpdatedURLs List of URLs that were already up to
 * date.
 *
 * @memberof workbox-precaching
 */
/**
 * @typedef {Object} CleanupResult
 * @property {Array<string>} deletedCacheRequests List of URLs that were deleted
 * while cleaning up the cache.
 *
 * @memberof workbox-precaching
 */
/**
 * @typedef {Object} PrecacheEntry
 * @property {string} url URL to precache.
 * @property {string} [revision] Revision information for the URL.
 * @property {string} [integrity] Integrity metadata that will be used when
 * making the network request for the URL.
 *
 * @memberof workbox-precaching
 */
/**
 * The "urlManipulation" callback can be used to determine if there are any
 * additional permutations of a URL that should be used to check against
 * the available precached files.
 *
 * For example, Workbox supports checking for '/index.html' when the URL
 * '/' is provided. This callback allows additional, custom checks.
 *
 * @callback ~urlManipulation
 * @param {Object} context
 * @param {URL} context.url The request's URL.
 * @return {Array<URL>} To add additional urls to test, return an Array of
 * URLs. Please note that these **should not be strings**, but URL objects.
 *
 * @memberof workbox-precaching
 */


/***/ }),

/***/ "./node_modules/workbox-precaching/_version.js":
/*!*****************************************************!*\
  !*** ./node_modules/workbox-precaching/_version.js ***!
  \*****************************************************/
/***/ (() => {


// @ts-ignore
try {
    self['workbox:precaching:6.5.3'] && _();
}
catch (e) { }


/***/ }),

/***/ "./node_modules/workbox-precaching/addPlugins.js":
/*!*******************************************************!*\
  !*** ./node_modules/workbox-precaching/addPlugins.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addPlugins": () => (/* binding */ addPlugins)
/* harmony export */ });
/* harmony import */ var _utils_getOrCreatePrecacheController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/getOrCreatePrecacheController.js */ "./node_modules/workbox-precaching/utils/getOrCreatePrecacheController.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_1__);
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/


/**
 * Adds plugins to the precaching strategy.
 *
 * @param {Array<Object>} plugins
 *
 * @memberof workbox-precaching
 */
function addPlugins(plugins) {
    const precacheController = (0,_utils_getOrCreatePrecacheController_js__WEBPACK_IMPORTED_MODULE_0__.getOrCreatePrecacheController)();
    precacheController.strategy.plugins.push(...plugins);
}



/***/ }),

/***/ "./node_modules/workbox-precaching/addRoute.js":
/*!*****************************************************!*\
  !*** ./node_modules/workbox-precaching/addRoute.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addRoute": () => (/* binding */ addRoute)
/* harmony export */ });
/* harmony import */ var workbox_routing_registerRoute_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-routing/registerRoute.js */ "./node_modules/workbox-routing/registerRoute.js");
/* harmony import */ var _utils_getOrCreatePrecacheController_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/getOrCreatePrecacheController.js */ "./node_modules/workbox-precaching/utils/getOrCreatePrecacheController.js");
/* harmony import */ var _PrecacheRoute_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PrecacheRoute.js */ "./node_modules/workbox-precaching/PrecacheRoute.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_3__);
/*
  Copyright 2019 Google LLC
  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/




/**
 * Add a `fetch` listener to the service worker that will
 * respond to
 * [network requests]{@link https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers#Custom_responses_to_requests}
 * with precached assets.
 *
 * Requests for assets that aren't precached, the `FetchEvent` will not be
 * responded to, allowing the event to fall through to other `fetch` event
 * listeners.
 *
 * @param {Object} [options] See the {@link workbox-precaching.PrecacheRoute}
 * options.
 *
 * @memberof workbox-precaching
 */
function addRoute(options) {
    const precacheController = (0,_utils_getOrCreatePrecacheController_js__WEBPACK_IMPORTED_MODULE_1__.getOrCreatePrecacheController)();
    const precacheRoute = new _PrecacheRoute_js__WEBPACK_IMPORTED_MODULE_2__.PrecacheRoute(precacheController, options);
    (0,workbox_routing_registerRoute_js__WEBPACK_IMPORTED_MODULE_0__.registerRoute)(precacheRoute);
}



/***/ }),

/***/ "./node_modules/workbox-precaching/cleanupOutdatedCaches.js":
/*!******************************************************************!*\
  !*** ./node_modules/workbox-precaching/cleanupOutdatedCaches.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cleanupOutdatedCaches": () => (/* binding */ cleanupOutdatedCaches)
/* harmony export */ });
/* harmony import */ var workbox_core_private_cacheNames_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-core/_private/cacheNames.js */ "./node_modules/workbox-core/_private/cacheNames.js");
/* harmony import */ var workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! workbox-core/_private/logger.js */ "./node_modules/workbox-core/_private/logger.js");
/* harmony import */ var _utils_deleteOutdatedCaches_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/deleteOutdatedCaches.js */ "./node_modules/workbox-precaching/utils/deleteOutdatedCaches.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_3__);
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/




/**
 * Adds an `activate` event listener which will clean up incompatible
 * precaches that were created by older versions of Workbox.
 *
 * @memberof workbox-precaching
 */
function cleanupOutdatedCaches() {
    // See https://github.com/Microsoft/TypeScript/issues/28357#issuecomment-436484705
    self.addEventListener('activate', ((event) => {
        const cacheName = workbox_core_private_cacheNames_js__WEBPACK_IMPORTED_MODULE_0__.cacheNames.getPrecacheName();
        event.waitUntil((0,_utils_deleteOutdatedCaches_js__WEBPACK_IMPORTED_MODULE_2__.deleteOutdatedCaches)(cacheName).then((cachesDeleted) => {
            if (true) {
                if (cachesDeleted.length > 0) {
                    workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_1__.logger.log(`The following out-of-date precaches were cleaned up ` +
                        `automatically:`, cachesDeleted);
                }
            }
        }));
    }));
}



/***/ }),

/***/ "./node_modules/workbox-precaching/createHandlerBoundToURL.js":
/*!********************************************************************!*\
  !*** ./node_modules/workbox-precaching/createHandlerBoundToURL.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createHandlerBoundToURL": () => (/* binding */ createHandlerBoundToURL)
/* harmony export */ });
/* harmony import */ var _utils_getOrCreatePrecacheController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/getOrCreatePrecacheController.js */ "./node_modules/workbox-precaching/utils/getOrCreatePrecacheController.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_1__);
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/


/**
 * Helper function that calls
 * {@link PrecacheController#createHandlerBoundToURL} on the default
 * {@link PrecacheController} instance.
 *
 * If you are creating your own {@link PrecacheController}, then call the
 * {@link PrecacheController#createHandlerBoundToURL} on that instance,
 * instead of using this function.
 *
 * @param {string} url The precached URL which will be used to lookup the
 * `Response`.
 * @param {boolean} [fallbackToNetwork=true] Whether to attempt to get the
 * response from the network if there's a precache miss.
 * @return {workbox-routing~handlerCallback}
 *
 * @memberof workbox-precaching
 */
function createHandlerBoundToURL(url) {
    const precacheController = (0,_utils_getOrCreatePrecacheController_js__WEBPACK_IMPORTED_MODULE_0__.getOrCreatePrecacheController)();
    return precacheController.createHandlerBoundToURL(url);
}



/***/ }),

/***/ "./node_modules/workbox-precaching/getCacheKeyForURL.js":
/*!**************************************************************!*\
  !*** ./node_modules/workbox-precaching/getCacheKeyForURL.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getCacheKeyForURL": () => (/* binding */ getCacheKeyForURL)
/* harmony export */ });
/* harmony import */ var _utils_getOrCreatePrecacheController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/getOrCreatePrecacheController.js */ "./node_modules/workbox-precaching/utils/getOrCreatePrecacheController.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_1__);
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/


/**
 * Takes in a URL, and returns the corresponding URL that could be used to
 * lookup the entry in the precache.
 *
 * If a relative URL is provided, the location of the service worker file will
 * be used as the base.
 *
 * For precached entries without revision information, the cache key will be the
 * same as the original URL.
 *
 * For precached entries with revision information, the cache key will be the
 * original URL with the addition of a query parameter used for keeping track of
 * the revision info.
 *
 * @param {string} url The URL whose cache key to look up.
 * @return {string} The cache key that corresponds to that URL.
 *
 * @memberof workbox-precaching
 */
function getCacheKeyForURL(url) {
    const precacheController = (0,_utils_getOrCreatePrecacheController_js__WEBPACK_IMPORTED_MODULE_0__.getOrCreatePrecacheController)();
    return precacheController.getCacheKeyForURL(url);
}



/***/ }),

/***/ "./node_modules/workbox-precaching/index.js":
/*!**************************************************!*\
  !*** ./node_modules/workbox-precaching/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PrecacheController": () => (/* reexport safe */ _PrecacheController_js__WEBPACK_IMPORTED_MODULE_8__.PrecacheController),
/* harmony export */   "PrecacheFallbackPlugin": () => (/* reexport safe */ _PrecacheFallbackPlugin_js__WEBPACK_IMPORTED_MODULE_11__.PrecacheFallbackPlugin),
/* harmony export */   "PrecacheRoute": () => (/* reexport safe */ _PrecacheRoute_js__WEBPACK_IMPORTED_MODULE_9__.PrecacheRoute),
/* harmony export */   "PrecacheStrategy": () => (/* reexport safe */ _PrecacheStrategy_js__WEBPACK_IMPORTED_MODULE_10__.PrecacheStrategy),
/* harmony export */   "addPlugins": () => (/* reexport safe */ _addPlugins_js__WEBPACK_IMPORTED_MODULE_0__.addPlugins),
/* harmony export */   "addRoute": () => (/* reexport safe */ _addRoute_js__WEBPACK_IMPORTED_MODULE_1__.addRoute),
/* harmony export */   "cleanupOutdatedCaches": () => (/* reexport safe */ _cleanupOutdatedCaches_js__WEBPACK_IMPORTED_MODULE_2__.cleanupOutdatedCaches),
/* harmony export */   "createHandlerBoundToURL": () => (/* reexport safe */ _createHandlerBoundToURL_js__WEBPACK_IMPORTED_MODULE_3__.createHandlerBoundToURL),
/* harmony export */   "getCacheKeyForURL": () => (/* reexport safe */ _getCacheKeyForURL_js__WEBPACK_IMPORTED_MODULE_4__.getCacheKeyForURL),
/* harmony export */   "matchPrecache": () => (/* reexport safe */ _matchPrecache_js__WEBPACK_IMPORTED_MODULE_5__.matchPrecache),
/* harmony export */   "precache": () => (/* reexport safe */ _precache_js__WEBPACK_IMPORTED_MODULE_6__.precache),
/* harmony export */   "precacheAndRoute": () => (/* reexport safe */ _precacheAndRoute_js__WEBPACK_IMPORTED_MODULE_7__.precacheAndRoute)
/* harmony export */ });
/* harmony import */ var _addPlugins_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./addPlugins.js */ "./node_modules/workbox-precaching/addPlugins.js");
/* harmony import */ var _addRoute_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./addRoute.js */ "./node_modules/workbox-precaching/addRoute.js");
/* harmony import */ var _cleanupOutdatedCaches_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cleanupOutdatedCaches.js */ "./node_modules/workbox-precaching/cleanupOutdatedCaches.js");
/* harmony import */ var _createHandlerBoundToURL_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./createHandlerBoundToURL.js */ "./node_modules/workbox-precaching/createHandlerBoundToURL.js");
/* harmony import */ var _getCacheKeyForURL_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getCacheKeyForURL.js */ "./node_modules/workbox-precaching/getCacheKeyForURL.js");
/* harmony import */ var _matchPrecache_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./matchPrecache.js */ "./node_modules/workbox-precaching/matchPrecache.js");
/* harmony import */ var _precache_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./precache.js */ "./node_modules/workbox-precaching/precache.js");
/* harmony import */ var _precacheAndRoute_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./precacheAndRoute.js */ "./node_modules/workbox-precaching/precacheAndRoute.js");
/* harmony import */ var _PrecacheController_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./PrecacheController.js */ "./node_modules/workbox-precaching/PrecacheController.js");
/* harmony import */ var _PrecacheRoute_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./PrecacheRoute.js */ "./node_modules/workbox-precaching/PrecacheRoute.js");
/* harmony import */ var _PrecacheStrategy_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./PrecacheStrategy.js */ "./node_modules/workbox-precaching/PrecacheStrategy.js");
/* harmony import */ var _PrecacheFallbackPlugin_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./PrecacheFallbackPlugin.js */ "./node_modules/workbox-precaching/PrecacheFallbackPlugin.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./_types.js */ "./node_modules/workbox-precaching/_types.js");
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/













/**
 * Most consumers of this module will want to use the
 * {@link workbox-precaching.precacheAndRoute}
 * method to add assets to the cache and respond to network requests with these
 * cached assets.
 *
 * If you require more control over caching and routing, you can use the
 * {@link workbox-precaching.PrecacheController}
 * interface.
 *
 * @module workbox-precaching
 */




/***/ }),

/***/ "./node_modules/workbox-precaching/matchPrecache.js":
/*!**********************************************************!*\
  !*** ./node_modules/workbox-precaching/matchPrecache.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "matchPrecache": () => (/* binding */ matchPrecache)
/* harmony export */ });
/* harmony import */ var _utils_getOrCreatePrecacheController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/getOrCreatePrecacheController.js */ "./node_modules/workbox-precaching/utils/getOrCreatePrecacheController.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_1__);
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/


/**
 * Helper function that calls
 * {@link PrecacheController#matchPrecache} on the default
 * {@link PrecacheController} instance.
 *
 * If you are creating your own {@link PrecacheController}, then call
 * {@link PrecacheController#matchPrecache} on that instance,
 * instead of using this function.
 *
 * @param {string|Request} request The key (without revisioning parameters)
 * to look up in the precache.
 * @return {Promise<Response|undefined>}
 *
 * @memberof workbox-precaching
 */
function matchPrecache(request) {
    const precacheController = (0,_utils_getOrCreatePrecacheController_js__WEBPACK_IMPORTED_MODULE_0__.getOrCreatePrecacheController)();
    return precacheController.matchPrecache(request);
}



/***/ }),

/***/ "./node_modules/workbox-precaching/precache.js":
/*!*****************************************************!*\
  !*** ./node_modules/workbox-precaching/precache.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "precache": () => (/* binding */ precache)
/* harmony export */ });
/* harmony import */ var _utils_getOrCreatePrecacheController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/getOrCreatePrecacheController.js */ "./node_modules/workbox-precaching/utils/getOrCreatePrecacheController.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_1__);
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/


/**
 * Adds items to the precache list, removing any duplicates and
 * stores the files in the
 * {@link workbox-core.cacheNames|"precache cache"} when the service
 * worker installs.
 *
 * This method can be called multiple times.
 *
 * Please note: This method **will not** serve any of the cached files for you.
 * It only precaches files. To respond to a network request you call
 * {@link workbox-precaching.addRoute}.
 *
 * If you have a single array of files to precache, you can just call
 * {@link workbox-precaching.precacheAndRoute}.
 *
 * @param {Array<Object|string>} [entries=[]] Array of entries to precache.
 *
 * @memberof workbox-precaching
 */
function precache(entries) {
    const precacheController = (0,_utils_getOrCreatePrecacheController_js__WEBPACK_IMPORTED_MODULE_0__.getOrCreatePrecacheController)();
    precacheController.precache(entries);
}



/***/ }),

/***/ "./node_modules/workbox-precaching/precacheAndRoute.js":
/*!*************************************************************!*\
  !*** ./node_modules/workbox-precaching/precacheAndRoute.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "precacheAndRoute": () => (/* binding */ precacheAndRoute)
/* harmony export */ });
/* harmony import */ var _addRoute_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./addRoute.js */ "./node_modules/workbox-precaching/addRoute.js");
/* harmony import */ var _precache_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./precache.js */ "./node_modules/workbox-precaching/precache.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_2__);
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/



/**
 * This method will add entries to the precache list and add a route to
 * respond to fetch events.
 *
 * This is a convenience method that will call
 * {@link workbox-precaching.precache} and
 * {@link workbox-precaching.addRoute} in a single call.
 *
 * @param {Array<Object|string>} entries Array of entries to precache.
 * @param {Object} [options] See the
 * {@link workbox-precaching.PrecacheRoute} options.
 *
 * @memberof workbox-precaching
 */
function precacheAndRoute(entries, options) {
    (0,_precache_js__WEBPACK_IMPORTED_MODULE_1__.precache)(entries);
    (0,_addRoute_js__WEBPACK_IMPORTED_MODULE_0__.addRoute)(options);
}



/***/ }),

/***/ "./node_modules/workbox-precaching/utils/PrecacheCacheKeyPlugin.js":
/*!*************************************************************************!*\
  !*** ./node_modules/workbox-precaching/utils/PrecacheCacheKeyPlugin.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PrecacheCacheKeyPlugin": () => (/* binding */ PrecacheCacheKeyPlugin)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2020 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * A plugin, designed to be used with PrecacheController, to translate URLs into
 * the corresponding cache key, based on the current revision info.
 *
 * @private
 */
class PrecacheCacheKeyPlugin {
    constructor({ precacheController }) {
        this.cacheKeyWillBeUsed = async ({ request, params, }) => {
            // Params is type any, can't change right now.
            /* eslint-disable */
            const cacheKey = (params === null || params === void 0 ? void 0 : params.cacheKey) ||
                this._precacheController.getCacheKeyForURL(request.url);
            /* eslint-enable */
            return cacheKey
                ? new Request(cacheKey, { headers: request.headers })
                : request;
        };
        this._precacheController = precacheController;
    }
}



/***/ }),

/***/ "./node_modules/workbox-precaching/utils/PrecacheInstallReportPlugin.js":
/*!******************************************************************************!*\
  !*** ./node_modules/workbox-precaching/utils/PrecacheInstallReportPlugin.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PrecacheInstallReportPlugin": () => (/* binding */ PrecacheInstallReportPlugin)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2020 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * A plugin, designed to be used with PrecacheController, to determine the
 * of assets that were updated (or not updated) during the install event.
 *
 * @private
 */
class PrecacheInstallReportPlugin {
    constructor() {
        this.updatedURLs = [];
        this.notUpdatedURLs = [];
        this.handlerWillStart = async ({ request, state, }) => {
            // TODO: `state` should never be undefined...
            if (state) {
                state.originalRequest = request;
            }
        };
        this.cachedResponseWillBeUsed = async ({ event, state, cachedResponse, }) => {
            if (event.type === 'install') {
                if (state &&
                    state.originalRequest &&
                    state.originalRequest instanceof Request) {
                    // TODO: `state` should never be undefined...
                    const url = state.originalRequest.url;
                    if (cachedResponse) {
                        this.notUpdatedURLs.push(url);
                    }
                    else {
                        this.updatedURLs.push(url);
                    }
                }
            }
            return cachedResponse;
        };
    }
}



/***/ }),

/***/ "./node_modules/workbox-precaching/utils/createCacheKey.js":
/*!*****************************************************************!*\
  !*** ./node_modules/workbox-precaching/utils/createCacheKey.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createCacheKey": () => (/* binding */ createCacheKey)
/* harmony export */ });
/* harmony import */ var workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-core/_private/WorkboxError.js */ "./node_modules/workbox-core/_private/WorkboxError.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_1__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/


// Name of the search parameter used to store revision info.
const REVISION_SEARCH_PARAM = '__WB_REVISION__';
/**
 * Converts a manifest entry into a versioned URL suitable for precaching.
 *
 * @param {Object|string} entry
 * @return {string} A URL with versioning info.
 *
 * @private
 * @memberof workbox-precaching
 */
function createCacheKey(entry) {
    if (!entry) {
        throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_0__.WorkboxError('add-to-cache-list-unexpected-type', { entry });
    }
    // If a precache manifest entry is a string, it's assumed to be a versioned
    // URL, like '/app.abcd1234.js'. Return as-is.
    if (typeof entry === 'string') {
        const urlObject = new URL(entry, location.href);
        return {
            cacheKey: urlObject.href,
            url: urlObject.href,
        };
    }
    const { revision, url } = entry;
    if (!url) {
        throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_0__.WorkboxError('add-to-cache-list-unexpected-type', { entry });
    }
    // If there's just a URL and no revision, then it's also assumed to be a
    // versioned URL.
    if (!revision) {
        const urlObject = new URL(url, location.href);
        return {
            cacheKey: urlObject.href,
            url: urlObject.href,
        };
    }
    // Otherwise, construct a properly versioned URL using the custom Workbox
    // search parameter along with the revision info.
    const cacheKeyURL = new URL(url, location.href);
    const originalURL = new URL(url, location.href);
    cacheKeyURL.searchParams.set(REVISION_SEARCH_PARAM, revision);
    return {
        cacheKey: cacheKeyURL.href,
        url: originalURL.href,
    };
}


/***/ }),

/***/ "./node_modules/workbox-precaching/utils/deleteOutdatedCaches.js":
/*!***********************************************************************!*\
  !*** ./node_modules/workbox-precaching/utils/deleteOutdatedCaches.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "deleteOutdatedCaches": () => (/* binding */ deleteOutdatedCaches)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

const SUBSTRING_TO_FIND = '-precache-';
/**
 * Cleans up incompatible precaches that were created by older versions of
 * Workbox, by a service worker registered under the current scope.
 *
 * This is meant to be called as part of the `activate` event.
 *
 * This should be safe to use as long as you don't include `substringToFind`
 * (defaulting to `-precache-`) in your non-precache cache names.
 *
 * @param {string} currentPrecacheName The cache name currently in use for
 * precaching. This cache won't be deleted.
 * @param {string} [substringToFind='-precache-'] Cache names which include this
 * substring will be deleted (excluding `currentPrecacheName`).
 * @return {Array<string>} A list of all the cache names that were deleted.
 *
 * @private
 * @memberof workbox-precaching
 */
const deleteOutdatedCaches = async (currentPrecacheName, substringToFind = SUBSTRING_TO_FIND) => {
    const cacheNames = await self.caches.keys();
    const cacheNamesToDelete = cacheNames.filter((cacheName) => {
        return (cacheName.includes(substringToFind) &&
            cacheName.includes(self.registration.scope) &&
            cacheName !== currentPrecacheName);
    });
    await Promise.all(cacheNamesToDelete.map((cacheName) => self.caches.delete(cacheName)));
    return cacheNamesToDelete;
};



/***/ }),

/***/ "./node_modules/workbox-precaching/utils/generateURLVariations.js":
/*!************************************************************************!*\
  !*** ./node_modules/workbox-precaching/utils/generateURLVariations.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateURLVariations": () => (/* binding */ generateURLVariations)
/* harmony export */ });
/* harmony import */ var _removeIgnoredSearchParams_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./removeIgnoredSearchParams.js */ "./node_modules/workbox-precaching/utils/removeIgnoredSearchParams.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_1__);
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/


/**
 * Generator function that yields possible variations on the original URL to
 * check, one at a time.
 *
 * @param {string} url
 * @param {Object} options
 *
 * @private
 * @memberof workbox-precaching
 */
function* generateURLVariations(url, { ignoreURLParametersMatching = [/^utm_/, /^fbclid$/], directoryIndex = 'index.html', cleanURLs = true, urlManipulation, } = {}) {
    const urlObject = new URL(url, location.href);
    urlObject.hash = '';
    yield urlObject.href;
    const urlWithoutIgnoredParams = (0,_removeIgnoredSearchParams_js__WEBPACK_IMPORTED_MODULE_0__.removeIgnoredSearchParams)(urlObject, ignoreURLParametersMatching);
    yield urlWithoutIgnoredParams.href;
    if (directoryIndex && urlWithoutIgnoredParams.pathname.endsWith('/')) {
        const directoryURL = new URL(urlWithoutIgnoredParams.href);
        directoryURL.pathname += directoryIndex;
        yield directoryURL.href;
    }
    if (cleanURLs) {
        const cleanURL = new URL(urlWithoutIgnoredParams.href);
        cleanURL.pathname += '.html';
        yield cleanURL.href;
    }
    if (urlManipulation) {
        const additionalURLs = urlManipulation({ url: urlObject });
        for (const urlToAttempt of additionalURLs) {
            yield urlToAttempt.href;
        }
    }
}


/***/ }),

/***/ "./node_modules/workbox-precaching/utils/getOrCreatePrecacheController.js":
/*!********************************************************************************!*\
  !*** ./node_modules/workbox-precaching/utils/getOrCreatePrecacheController.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getOrCreatePrecacheController": () => (/* binding */ getOrCreatePrecacheController)
/* harmony export */ });
/* harmony import */ var _PrecacheController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../PrecacheController.js */ "./node_modules/workbox-precaching/PrecacheController.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_1__);
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/


let precacheController;
/**
 * @return {PrecacheController}
 * @private
 */
const getOrCreatePrecacheController = () => {
    if (!precacheController) {
        precacheController = new _PrecacheController_js__WEBPACK_IMPORTED_MODULE_0__.PrecacheController();
    }
    return precacheController;
};


/***/ }),

/***/ "./node_modules/workbox-precaching/utils/printCleanupDetails.js":
/*!**********************************************************************!*\
  !*** ./node_modules/workbox-precaching/utils/printCleanupDetails.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "printCleanupDetails": () => (/* binding */ printCleanupDetails)
/* harmony export */ });
/* harmony import */ var workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-core/_private/logger.js */ "./node_modules/workbox-core/_private/logger.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_1__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/


/**
 * @param {string} groupTitle
 * @param {Array<string>} deletedURLs
 *
 * @private
 */
const logGroup = (groupTitle, deletedURLs) => {
    workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.groupCollapsed(groupTitle);
    for (const url of deletedURLs) {
        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.log(url);
    }
    workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.groupEnd();
};
/**
 * @param {Array<string>} deletedURLs
 *
 * @private
 * @memberof workbox-precaching
 */
function printCleanupDetails(deletedURLs) {
    const deletionCount = deletedURLs.length;
    if (deletionCount > 0) {
        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.groupCollapsed(`During precaching cleanup, ` +
            `${deletionCount} cached ` +
            `request${deletionCount === 1 ? ' was' : 's were'} deleted.`);
        logGroup('Deleted Cache Requests', deletedURLs);
        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.groupEnd();
    }
}


/***/ }),

/***/ "./node_modules/workbox-precaching/utils/printInstallDetails.js":
/*!**********************************************************************!*\
  !*** ./node_modules/workbox-precaching/utils/printInstallDetails.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "printInstallDetails": () => (/* binding */ printInstallDetails)
/* harmony export */ });
/* harmony import */ var workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-core/_private/logger.js */ "./node_modules/workbox-core/_private/logger.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_1__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/


/**
 * @param {string} groupTitle
 * @param {Array<string>} urls
 *
 * @private
 */
function _nestedGroup(groupTitle, urls) {
    if (urls.length === 0) {
        return;
    }
    workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.groupCollapsed(groupTitle);
    for (const url of urls) {
        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.log(url);
    }
    workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.groupEnd();
}
/**
 * @param {Array<string>} urlsToPrecache
 * @param {Array<string>} urlsAlreadyPrecached
 *
 * @private
 * @memberof workbox-precaching
 */
function printInstallDetails(urlsToPrecache, urlsAlreadyPrecached) {
    const precachedCount = urlsToPrecache.length;
    const alreadyPrecachedCount = urlsAlreadyPrecached.length;
    if (precachedCount || alreadyPrecachedCount) {
        let message = `Precaching ${precachedCount} file${precachedCount === 1 ? '' : 's'}.`;
        if (alreadyPrecachedCount > 0) {
            message +=
                ` ${alreadyPrecachedCount} ` +
                    `file${alreadyPrecachedCount === 1 ? ' is' : 's are'} already cached.`;
        }
        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.groupCollapsed(message);
        _nestedGroup(`View newly precached URLs.`, urlsToPrecache);
        _nestedGroup(`View previously precached URLs.`, urlsAlreadyPrecached);
        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.groupEnd();
    }
}


/***/ }),

/***/ "./node_modules/workbox-precaching/utils/removeIgnoredSearchParams.js":
/*!****************************************************************************!*\
  !*** ./node_modules/workbox-precaching/utils/removeIgnoredSearchParams.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "removeIgnoredSearchParams": () => (/* binding */ removeIgnoredSearchParams)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * Removes any URL search parameters that should be ignored.
 *
 * @param {URL} urlObject The original URL.
 * @param {Array<RegExp>} ignoreURLParametersMatching RegExps to test against
 * each search parameter name. Matches mean that the search parameter should be
 * ignored.
 * @return {URL} The URL with any ignored search parameters removed.
 *
 * @private
 * @memberof workbox-precaching
 */
function removeIgnoredSearchParams(urlObject, ignoreURLParametersMatching = []) {
    // Convert the iterable into an array at the start of the loop to make sure
    // deletion doesn't mess up iteration.
    for (const paramName of [...urlObject.searchParams.keys()]) {
        if (ignoreURLParametersMatching.some((regExp) => regExp.test(paramName))) {
            urlObject.searchParams.delete(paramName);
        }
    }
    return urlObject;
}


/***/ }),

/***/ "./node_modules/workbox-routing/RegExpRoute.js":
/*!*****************************************************!*\
  !*** ./node_modules/workbox-routing/RegExpRoute.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RegExpRoute": () => (/* binding */ RegExpRoute)
/* harmony export */ });
/* harmony import */ var workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-core/_private/assert.js */ "./node_modules/workbox-core/_private/assert.js");
/* harmony import */ var workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! workbox-core/_private/logger.js */ "./node_modules/workbox-core/_private/logger.js");
/* harmony import */ var _Route_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Route.js */ "./node_modules/workbox-routing/Route.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-routing/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_3__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/




/**
 * RegExpRoute makes it easy to create a regular expression based
 * {@link workbox-routing.Route}.
 *
 * For same-origin requests the RegExp only needs to match part of the URL. For
 * requests against third-party servers, you must define a RegExp that matches
 * the start of the URL.
 *
 * @memberof workbox-routing
 * @extends workbox-routing.Route
 */
class RegExpRoute extends _Route_js__WEBPACK_IMPORTED_MODULE_2__.Route {
    /**
     * If the regular expression contains
     * [capture groups]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp#grouping-back-references},
     * the captured values will be passed to the
     * {@link workbox-routing~handlerCallback} `params`
     * argument.
     *
     * @param {RegExp} regExp The regular expression to match against URLs.
     * @param {workbox-routing~handlerCallback} handler A callback
     * function that returns a Promise resulting in a Response.
     * @param {string} [method='GET'] The HTTP method to match the Route
     * against.
     */
    constructor(regExp, handler, method) {
        if (true) {
            workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.isInstance(regExp, RegExp, {
                moduleName: 'workbox-routing',
                className: 'RegExpRoute',
                funcName: 'constructor',
                paramName: 'pattern',
            });
        }
        const match = ({ url }) => {
            const result = regExp.exec(url.href);
            // Return immediately if there's no match.
            if (!result) {
                return;
            }
            // Require that the match start at the first character in the URL string
            // if it's a cross-origin request.
            // See https://github.com/GoogleChrome/workbox/issues/281 for the context
            // behind this behavior.
            if (url.origin !== location.origin && result.index !== 0) {
                if (true) {
                    workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_1__.logger.debug(`The regular expression '${regExp.toString()}' only partially matched ` +
                        `against the cross-origin URL '${url.toString()}'. RegExpRoute's will only ` +
                        `handle cross-origin requests if they match the entire URL.`);
                }
                return;
            }
            // If the route matches, but there aren't any capture groups defined, then
            // this will return [], which is truthy and therefore sufficient to
            // indicate a match.
            // If there are capture groups, then it will return their values.
            return result.slice(1);
        };
        super(match, handler, method);
    }
}



/***/ }),

/***/ "./node_modules/workbox-routing/Route.js":
/*!***********************************************!*\
  !*** ./node_modules/workbox-routing/Route.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Route": () => (/* binding */ Route)
/* harmony export */ });
/* harmony import */ var workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-core/_private/assert.js */ "./node_modules/workbox-core/_private/assert.js");
/* harmony import */ var _utils_constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/constants.js */ "./node_modules/workbox-routing/utils/constants.js");
/* harmony import */ var _utils_normalizeHandler_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/normalizeHandler.js */ "./node_modules/workbox-routing/utils/normalizeHandler.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-routing/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_3__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/




/**
 * A `Route` consists of a pair of callback functions, "match" and "handler".
 * The "match" callback determine if a route should be used to "handle" a
 * request by returning a non-falsy value if it can. The "handler" callback
 * is called when there is a match and should return a Promise that resolves
 * to a `Response`.
 *
 * @memberof workbox-routing
 */
class Route {
    /**
     * Constructor for Route class.
     *
     * @param {workbox-routing~matchCallback} match
     * A callback function that determines whether the route matches a given
     * `fetch` event by returning a non-falsy value.
     * @param {workbox-routing~handlerCallback} handler A callback
     * function that returns a Promise resolving to a Response.
     * @param {string} [method='GET'] The HTTP method to match the Route
     * against.
     */
    constructor(match, handler, method = _utils_constants_js__WEBPACK_IMPORTED_MODULE_1__.defaultMethod) {
        if (true) {
            workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.isType(match, 'function', {
                moduleName: 'workbox-routing',
                className: 'Route',
                funcName: 'constructor',
                paramName: 'match',
            });
            if (method) {
                workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.isOneOf(method, _utils_constants_js__WEBPACK_IMPORTED_MODULE_1__.validMethods, { paramName: 'method' });
            }
        }
        // These values are referenced directly by Router so cannot be
        // altered by minificaton.
        this.handler = (0,_utils_normalizeHandler_js__WEBPACK_IMPORTED_MODULE_2__.normalizeHandler)(handler);
        this.match = match;
        this.method = method;
    }
    /**
     *
     * @param {workbox-routing-handlerCallback} handler A callback
     * function that returns a Promise resolving to a Response
     */
    setCatchHandler(handler) {
        this.catchHandler = (0,_utils_normalizeHandler_js__WEBPACK_IMPORTED_MODULE_2__.normalizeHandler)(handler);
    }
}



/***/ }),

/***/ "./node_modules/workbox-routing/Router.js":
/*!************************************************!*\
  !*** ./node_modules/workbox-routing/Router.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Router": () => (/* binding */ Router)
/* harmony export */ });
/* harmony import */ var workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-core/_private/assert.js */ "./node_modules/workbox-core/_private/assert.js");
/* harmony import */ var workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! workbox-core/_private/getFriendlyURL.js */ "./node_modules/workbox-core/_private/getFriendlyURL.js");
/* harmony import */ var _utils_constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/constants.js */ "./node_modules/workbox-routing/utils/constants.js");
/* harmony import */ var workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! workbox-core/_private/logger.js */ "./node_modules/workbox-core/_private/logger.js");
/* harmony import */ var _utils_normalizeHandler_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/normalizeHandler.js */ "./node_modules/workbox-routing/utils/normalizeHandler.js");
/* harmony import */ var workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! workbox-core/_private/WorkboxError.js */ "./node_modules/workbox-core/_private/WorkboxError.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-routing/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_6__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/







/**
 * The Router can be used to process a `FetchEvent` using one or more
 * {@link workbox-routing.Route}, responding with a `Response` if
 * a matching route exists.
 *
 * If no route matches a given a request, the Router will use a "default"
 * handler if one is defined.
 *
 * Should the matching Route throw an error, the Router will use a "catch"
 * handler if one is defined to gracefully deal with issues and respond with a
 * Request.
 *
 * If a request matches multiple routes, the **earliest** registered route will
 * be used to respond to the request.
 *
 * @memberof workbox-routing
 */
class Router {
    /**
     * Initializes a new Router.
     */
    constructor() {
        this._routes = new Map();
        this._defaultHandlerMap = new Map();
    }
    /**
     * @return {Map<string, Array<workbox-routing.Route>>} routes A `Map` of HTTP
     * method name ('GET', etc.) to an array of all the corresponding `Route`
     * instances that are registered.
     */
    get routes() {
        return this._routes;
    }
    /**
     * Adds a fetch event listener to respond to events when a route matches
     * the event's request.
     */
    addFetchListener() {
        // See https://github.com/Microsoft/TypeScript/issues/28357#issuecomment-436484705
        self.addEventListener('fetch', ((event) => {
            const { request } = event;
            const responsePromise = this.handleRequest({ request, event });
            if (responsePromise) {
                event.respondWith(responsePromise);
            }
        }));
    }
    /**
     * Adds a message event listener for URLs to cache from the window.
     * This is useful to cache resources loaded on the page prior to when the
     * service worker started controlling it.
     *
     * The format of the message data sent from the window should be as follows.
     * Where the `urlsToCache` array may consist of URL strings or an array of
     * URL string + `requestInit` object (the same as you'd pass to `fetch()`).
     *
     * ```
     * {
     *   type: 'CACHE_URLS',
     *   payload: {
     *     urlsToCache: [
     *       './script1.js',
     *       './script2.js',
     *       ['./script3.js', {mode: 'no-cors'}],
     *     ],
     *   },
     * }
     * ```
     */
    addCacheListener() {
        // See https://github.com/Microsoft/TypeScript/issues/28357#issuecomment-436484705
        self.addEventListener('message', ((event) => {
            // event.data is type 'any'
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            if (event.data && event.data.type === 'CACHE_URLS') {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                const { payload } = event.data;
                if (true) {
                    workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.debug(`Caching URLs from the window`, payload.urlsToCache);
                }
                const requestPromises = Promise.all(payload.urlsToCache.map((entry) => {
                    if (typeof entry === 'string') {
                        entry = [entry];
                    }
                    const request = new Request(...entry);
                    return this.handleRequest({ request, event });
                    // TODO(philipwalton): TypeScript errors without this typecast for
                    // some reason (probably a bug). The real type here should work but
                    // doesn't: `Array<Promise<Response> | undefined>`.
                })); // TypeScript
                event.waitUntil(requestPromises);
                // If a MessageChannel was used, reply to the message on success.
                if (event.ports && event.ports[0]) {
                    void requestPromises.then(() => event.ports[0].postMessage(true));
                }
            }
        }));
    }
    /**
     * Apply the routing rules to a FetchEvent object to get a Response from an
     * appropriate Route's handler.
     *
     * @param {Object} options
     * @param {Request} options.request The request to handle.
     * @param {ExtendableEvent} options.event The event that triggered the
     *     request.
     * @return {Promise<Response>|undefined} A promise is returned if a
     *     registered route can handle the request. If there is no matching
     *     route and there's no `defaultHandler`, `undefined` is returned.
     */
    handleRequest({ request, event, }) {
        if (true) {
            workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.isInstance(request, Request, {
                moduleName: 'workbox-routing',
                className: 'Router',
                funcName: 'handleRequest',
                paramName: 'options.request',
            });
        }
        const url = new URL(request.url, location.href);
        if (!url.protocol.startsWith('http')) {
            if (true) {
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.debug(`Workbox Router only supports URLs that start with 'http'.`);
            }
            return;
        }
        const sameOrigin = url.origin === location.origin;
        const { params, route } = this.findMatchingRoute({
            event,
            request,
            sameOrigin,
            url,
        });
        let handler = route && route.handler;
        const debugMessages = [];
        if (true) {
            if (handler) {
                debugMessages.push([`Found a route to handle this request:`, route]);
                if (params) {
                    debugMessages.push([
                        `Passing the following params to the route's handler:`,
                        params,
                    ]);
                }
            }
        }
        // If we don't have a handler because there was no matching route, then
        // fall back to defaultHandler if that's defined.
        const method = request.method;
        if (!handler && this._defaultHandlerMap.has(method)) {
            if (true) {
                debugMessages.push(`Failed to find a matching route. Falling ` +
                    `back to the default handler for ${method}.`);
            }
            handler = this._defaultHandlerMap.get(method);
        }
        if (!handler) {
            if (true) {
                // No handler so Workbox will do nothing. If logs is set of debug
                // i.e. verbose, we should print out this information.
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.debug(`No route found for: ${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_1__.getFriendlyURL)(url)}`);
            }
            return;
        }
        if (true) {
            // We have a handler, meaning Workbox is going to handle the route.
            // print the routing details to the console.
            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.groupCollapsed(`Router is responding to: ${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_1__.getFriendlyURL)(url)}`);
            debugMessages.forEach((msg) => {
                if (Array.isArray(msg)) {
                    workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.log(...msg);
                }
                else {
                    workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.log(msg);
                }
            });
            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.groupEnd();
        }
        // Wrap in try and catch in case the handle method throws a synchronous
        // error. It should still callback to the catch handler.
        let responsePromise;
        try {
            responsePromise = handler.handle({ url, request, event, params });
        }
        catch (err) {
            responsePromise = Promise.reject(err);
        }
        // Get route's catch handler, if it exists
        const catchHandler = route && route.catchHandler;
        if (responsePromise instanceof Promise &&
            (this._catchHandler || catchHandler)) {
            responsePromise = responsePromise.catch(async (err) => {
                // If there's a route catch handler, process that first
                if (catchHandler) {
                    if (true) {
                        // Still include URL here as it will be async from the console group
                        // and may not make sense without the URL
                        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.groupCollapsed(`Error thrown when responding to: ` +
                            ` ${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_1__.getFriendlyURL)(url)}. Falling back to route's Catch Handler.`);
                        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.error(`Error thrown by:`, route);
                        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.error(err);
                        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.groupEnd();
                    }
                    try {
                        return await catchHandler.handle({ url, request, event, params });
                    }
                    catch (catchErr) {
                        if (catchErr instanceof Error) {
                            err = catchErr;
                        }
                    }
                }
                if (this._catchHandler) {
                    if (true) {
                        // Still include URL here as it will be async from the console group
                        // and may not make sense without the URL
                        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.groupCollapsed(`Error thrown when responding to: ` +
                            ` ${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_1__.getFriendlyURL)(url)}. Falling back to global Catch Handler.`);
                        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.error(`Error thrown by:`, route);
                        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.error(err);
                        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.groupEnd();
                    }
                    return this._catchHandler.handle({ url, request, event });
                }
                throw err;
            });
        }
        return responsePromise;
    }
    /**
     * Checks a request and URL (and optionally an event) against the list of
     * registered routes, and if there's a match, returns the corresponding
     * route along with any params generated by the match.
     *
     * @param {Object} options
     * @param {URL} options.url
     * @param {boolean} options.sameOrigin The result of comparing `url.origin`
     *     against the current origin.
     * @param {Request} options.request The request to match.
     * @param {Event} options.event The corresponding event.
     * @return {Object} An object with `route` and `params` properties.
     *     They are populated if a matching route was found or `undefined`
     *     otherwise.
     */
    findMatchingRoute({ url, sameOrigin, request, event, }) {
        const routes = this._routes.get(request.method) || [];
        for (const route of routes) {
            let params;
            // route.match returns type any, not possible to change right now.
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const matchResult = route.match({ url, sameOrigin, request, event });
            if (matchResult) {
                if (true) {
                    // Warn developers that using an async matchCallback is almost always
                    // not the right thing to do.
                    if (matchResult instanceof Promise) {
                        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.warn(`While routing ${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_1__.getFriendlyURL)(url)}, an async ` +
                            `matchCallback function was used. Please convert the ` +
                            `following route to use a synchronous matchCallback function:`, route);
                    }
                }
                // See https://github.com/GoogleChrome/workbox/issues/2079
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                params = matchResult;
                if (Array.isArray(params) && params.length === 0) {
                    // Instead of passing an empty array in as params, use undefined.
                    params = undefined;
                }
                else if (matchResult.constructor === Object && // eslint-disable-line
                    Object.keys(matchResult).length === 0) {
                    // Instead of passing an empty object in as params, use undefined.
                    params = undefined;
                }
                else if (typeof matchResult === 'boolean') {
                    // For the boolean value true (rather than just something truth-y),
                    // don't set params.
                    // See https://github.com/GoogleChrome/workbox/pull/2134#issuecomment-513924353
                    params = undefined;
                }
                // Return early if have a match.
                return { route, params };
            }
        }
        // If no match was found above, return and empty object.
        return {};
    }
    /**
     * Define a default `handler` that's called when no routes explicitly
     * match the incoming request.
     *
     * Each HTTP method ('GET', 'POST', etc.) gets its own default handler.
     *
     * Without a default handler, unmatched requests will go against the
     * network as if there were no service worker present.
     *
     * @param {workbox-routing~handlerCallback} handler A callback
     * function that returns a Promise resulting in a Response.
     * @param {string} [method='GET'] The HTTP method to associate with this
     * default handler. Each method has its own default.
     */
    setDefaultHandler(handler, method = _utils_constants_js__WEBPACK_IMPORTED_MODULE_2__.defaultMethod) {
        this._defaultHandlerMap.set(method, (0,_utils_normalizeHandler_js__WEBPACK_IMPORTED_MODULE_4__.normalizeHandler)(handler));
    }
    /**
     * If a Route throws an error while handling a request, this `handler`
     * will be called and given a chance to provide a response.
     *
     * @param {workbox-routing~handlerCallback} handler A callback
     * function that returns a Promise resulting in a Response.
     */
    setCatchHandler(handler) {
        this._catchHandler = (0,_utils_normalizeHandler_js__WEBPACK_IMPORTED_MODULE_4__.normalizeHandler)(handler);
    }
    /**
     * Registers a route with the router.
     *
     * @param {workbox-routing.Route} route The route to register.
     */
    registerRoute(route) {
        if (true) {
            workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.isType(route, 'object', {
                moduleName: 'workbox-routing',
                className: 'Router',
                funcName: 'registerRoute',
                paramName: 'route',
            });
            workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.hasMethod(route, 'match', {
                moduleName: 'workbox-routing',
                className: 'Router',
                funcName: 'registerRoute',
                paramName: 'route',
            });
            workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.isType(route.handler, 'object', {
                moduleName: 'workbox-routing',
                className: 'Router',
                funcName: 'registerRoute',
                paramName: 'route',
            });
            workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.hasMethod(route.handler, 'handle', {
                moduleName: 'workbox-routing',
                className: 'Router',
                funcName: 'registerRoute',
                paramName: 'route.handler',
            });
            workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.isType(route.method, 'string', {
                moduleName: 'workbox-routing',
                className: 'Router',
                funcName: 'registerRoute',
                paramName: 'route.method',
            });
        }
        if (!this._routes.has(route.method)) {
            this._routes.set(route.method, []);
        }
        // Give precedence to all of the earlier routes by adding this additional
        // route to the end of the array.
        this._routes.get(route.method).push(route);
    }
    /**
     * Unregisters a route with the router.
     *
     * @param {workbox-routing.Route} route The route to unregister.
     */
    unregisterRoute(route) {
        if (!this._routes.has(route.method)) {
            throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_5__.WorkboxError('unregister-route-but-not-found-with-method', {
                method: route.method,
            });
        }
        const routeIndex = this._routes.get(route.method).indexOf(route);
        if (routeIndex > -1) {
            this._routes.get(route.method).splice(routeIndex, 1);
        }
        else {
            throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_5__.WorkboxError('unregister-route-route-not-registered');
        }
    }
}



/***/ }),

/***/ "./node_modules/workbox-routing/_version.js":
/*!**************************************************!*\
  !*** ./node_modules/workbox-routing/_version.js ***!
  \**************************************************/
/***/ (() => {


// @ts-ignore
try {
    self['workbox:routing:6.5.3'] && _();
}
catch (e) { }


/***/ }),

/***/ "./node_modules/workbox-routing/registerRoute.js":
/*!*******************************************************!*\
  !*** ./node_modules/workbox-routing/registerRoute.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "registerRoute": () => (/* binding */ registerRoute)
/* harmony export */ });
/* harmony import */ var workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-core/_private/logger.js */ "./node_modules/workbox-core/_private/logger.js");
/* harmony import */ var workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! workbox-core/_private/WorkboxError.js */ "./node_modules/workbox-core/_private/WorkboxError.js");
/* harmony import */ var _Route_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Route.js */ "./node_modules/workbox-routing/Route.js");
/* harmony import */ var _RegExpRoute_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./RegExpRoute.js */ "./node_modules/workbox-routing/RegExpRoute.js");
/* harmony import */ var _utils_getOrCreateDefaultRouter_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/getOrCreateDefaultRouter.js */ "./node_modules/workbox-routing/utils/getOrCreateDefaultRouter.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-routing/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_5__);
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/






/**
 * Easily register a RegExp, string, or function with a caching
 * strategy to a singleton Router instance.
 *
 * This method will generate a Route for you if needed and
 * call {@link workbox-routing.Router#registerRoute}.
 *
 * @param {RegExp|string|workbox-routing.Route~matchCallback|workbox-routing.Route} capture
 * If the capture param is a `Route`, all other arguments will be ignored.
 * @param {workbox-routing~handlerCallback} [handler] A callback
 * function that returns a Promise resulting in a Response. This parameter
 * is required if `capture` is not a `Route` object.
 * @param {string} [method='GET'] The HTTP method to match the Route
 * against.
 * @return {workbox-routing.Route} The generated `Route`.
 *
 * @memberof workbox-routing
 */
function registerRoute(capture, handler, method) {
    let route;
    if (typeof capture === 'string') {
        const captureUrl = new URL(capture, location.href);
        if (true) {
            if (!(capture.startsWith('/') || capture.startsWith('http'))) {
                throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_1__.WorkboxError('invalid-string', {
                    moduleName: 'workbox-routing',
                    funcName: 'registerRoute',
                    paramName: 'capture',
                });
            }
            // We want to check if Express-style wildcards are in the pathname only.
            // TODO: Remove this log message in v4.
            const valueToCheck = capture.startsWith('http')
                ? captureUrl.pathname
                : capture;
            // See https://github.com/pillarjs/path-to-regexp#parameters
            const wildcards = '[*:?+]';
            if (new RegExp(`${wildcards}`).exec(valueToCheck)) {
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.debug(`The '$capture' parameter contains an Express-style wildcard ` +
                    `character (${wildcards}). Strings are now always interpreted as ` +
                    `exact matches; use a RegExp for partial or wildcard matches.`);
            }
        }
        const matchCallback = ({ url }) => {
            if (true) {
                if (url.pathname === captureUrl.pathname &&
                    url.origin !== captureUrl.origin) {
                    workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.debug(`${capture} only partially matches the cross-origin URL ` +
                        `${url.toString()}. This route will only handle cross-origin requests ` +
                        `if they match the entire URL.`);
                }
            }
            return url.href === captureUrl.href;
        };
        // If `capture` is a string then `handler` and `method` must be present.
        route = new _Route_js__WEBPACK_IMPORTED_MODULE_2__.Route(matchCallback, handler, method);
    }
    else if (capture instanceof RegExp) {
        // If `capture` is a `RegExp` then `handler` and `method` must be present.
        route = new _RegExpRoute_js__WEBPACK_IMPORTED_MODULE_3__.RegExpRoute(capture, handler, method);
    }
    else if (typeof capture === 'function') {
        // If `capture` is a function then `handler` and `method` must be present.
        route = new _Route_js__WEBPACK_IMPORTED_MODULE_2__.Route(capture, handler, method);
    }
    else if (capture instanceof _Route_js__WEBPACK_IMPORTED_MODULE_2__.Route) {
        route = capture;
    }
    else {
        throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_1__.WorkboxError('unsupported-route-type', {
            moduleName: 'workbox-routing',
            funcName: 'registerRoute',
            paramName: 'capture',
        });
    }
    const defaultRouter = (0,_utils_getOrCreateDefaultRouter_js__WEBPACK_IMPORTED_MODULE_4__.getOrCreateDefaultRouter)();
    defaultRouter.registerRoute(route);
    return route;
}



/***/ }),

/***/ "./node_modules/workbox-routing/utils/constants.js":
/*!*********************************************************!*\
  !*** ./node_modules/workbox-routing/utils/constants.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defaultMethod": () => (/* binding */ defaultMethod),
/* harmony export */   "validMethods": () => (/* binding */ validMethods)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-routing/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * The default HTTP method, 'GET', used when there's no specific method
 * configured for a route.
 *
 * @type {string}
 *
 * @private
 */
const defaultMethod = 'GET';
/**
 * The list of valid HTTP methods associated with requests that could be routed.
 *
 * @type {Array<string>}
 *
 * @private
 */
const validMethods = [
    'DELETE',
    'GET',
    'HEAD',
    'PATCH',
    'POST',
    'PUT',
];


/***/ }),

/***/ "./node_modules/workbox-routing/utils/getOrCreateDefaultRouter.js":
/*!************************************************************************!*\
  !*** ./node_modules/workbox-routing/utils/getOrCreateDefaultRouter.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getOrCreateDefaultRouter": () => (/* binding */ getOrCreateDefaultRouter)
/* harmony export */ });
/* harmony import */ var _Router_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Router.js */ "./node_modules/workbox-routing/Router.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-routing/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_1__);
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/


let defaultRouter;
/**
 * Creates a new, singleton Router instance if one does not exist. If one
 * does already exist, that instance is returned.
 *
 * @private
 * @return {Router}
 */
const getOrCreateDefaultRouter = () => {
    if (!defaultRouter) {
        defaultRouter = new _Router_js__WEBPACK_IMPORTED_MODULE_0__.Router();
        // The helpers that use the default Router assume these listeners exist.
        defaultRouter.addFetchListener();
        defaultRouter.addCacheListener();
    }
    return defaultRouter;
};


/***/ }),

/***/ "./node_modules/workbox-routing/utils/normalizeHandler.js":
/*!****************************************************************!*\
  !*** ./node_modules/workbox-routing/utils/normalizeHandler.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "normalizeHandler": () => (/* binding */ normalizeHandler)
/* harmony export */ });
/* harmony import */ var workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-core/_private/assert.js */ "./node_modules/workbox-core/_private/assert.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-routing/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_1__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/


/**
 * @param {function()|Object} handler Either a function, or an object with a
 * 'handle' method.
 * @return {Object} An object with a handle method.
 *
 * @private
 */
const normalizeHandler = (handler) => {
    if (handler && typeof handler === 'object') {
        if (true) {
            workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.hasMethod(handler, 'handle', {
                moduleName: 'workbox-routing',
                className: 'Route',
                funcName: 'constructor',
                paramName: 'handler',
            });
        }
        return handler;
    }
    else {
        if (true) {
            workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.isType(handler, 'function', {
                moduleName: 'workbox-routing',
                className: 'Route',
                funcName: 'constructor',
                paramName: 'handler',
            });
        }
        return { handle: handler };
    }
};


/***/ }),

/***/ "./node_modules/workbox-strategies/Strategy.js":
/*!*****************************************************!*\
  !*** ./node_modules/workbox-strategies/Strategy.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Strategy": () => (/* binding */ Strategy)
/* harmony export */ });
/* harmony import */ var workbox_core_private_cacheNames_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-core/_private/cacheNames.js */ "./node_modules/workbox-core/_private/cacheNames.js");
/* harmony import */ var workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! workbox-core/_private/WorkboxError.js */ "./node_modules/workbox-core/_private/WorkboxError.js");
/* harmony import */ var workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! workbox-core/_private/logger.js */ "./node_modules/workbox-core/_private/logger.js");
/* harmony import */ var workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! workbox-core/_private/getFriendlyURL.js */ "./node_modules/workbox-core/_private/getFriendlyURL.js");
/* harmony import */ var _StrategyHandler_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./StrategyHandler.js */ "./node_modules/workbox-strategies/StrategyHandler.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-strategies/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_5__);
/*
  Copyright 2020 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/






/**
 * An abstract base class that all other strategy classes must extend from:
 *
 * @memberof workbox-strategies
 */
class Strategy {
    /**
     * Creates a new instance of the strategy and sets all documented option
     * properties as public instance properties.
     *
     * Note: if a custom strategy class extends the base Strategy class and does
     * not need more than these properties, it does not need to define its own
     * constructor.
     *
     * @param {Object} [options]
     * @param {string} [options.cacheName] Cache name to store and retrieve
     * requests. Defaults to the cache names provided by
     * {@link workbox-core.cacheNames}.
     * @param {Array<Object>} [options.plugins] [Plugins]{@link https://developers.google.com/web/tools/workbox/guides/using-plugins}
     * to use in conjunction with this caching strategy.
     * @param {Object} [options.fetchOptions] Values passed along to the
     * [`init`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters)
     * of [non-navigation](https://github.com/GoogleChrome/workbox/issues/1796)
     * `fetch()` requests made by this strategy.
     * @param {Object} [options.matchOptions] The
     * [`CacheQueryOptions`]{@link https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions}
     * for any `cache.match()` or `cache.put()` calls made by this strategy.
     */
    constructor(options = {}) {
        /**
         * Cache name to store and retrieve
         * requests. Defaults to the cache names provided by
         * {@link workbox-core.cacheNames}.
         *
         * @type {string}
         */
        this.cacheName = workbox_core_private_cacheNames_js__WEBPACK_IMPORTED_MODULE_0__.cacheNames.getRuntimeName(options.cacheName);
        /**
         * The list
         * [Plugins]{@link https://developers.google.com/web/tools/workbox/guides/using-plugins}
         * used by this strategy.
         *
         * @type {Array<Object>}
         */
        this.plugins = options.plugins || [];
        /**
         * Values passed along to the
         * [`init`]{@link https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters}
         * of all fetch() requests made by this strategy.
         *
         * @type {Object}
         */
        this.fetchOptions = options.fetchOptions;
        /**
         * The
         * [`CacheQueryOptions`]{@link https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions}
         * for any `cache.match()` or `cache.put()` calls made by this strategy.
         *
         * @type {Object}
         */
        this.matchOptions = options.matchOptions;
    }
    /**
     * Perform a request strategy and returns a `Promise` that will resolve with
     * a `Response`, invoking all relevant plugin callbacks.
     *
     * When a strategy instance is registered with a Workbox
     * {@link workbox-routing.Route}, this method is automatically
     * called when the route matches.
     *
     * Alternatively, this method can be used in a standalone `FetchEvent`
     * listener by passing it to `event.respondWith()`.
     *
     * @param {FetchEvent|Object} options A `FetchEvent` or an object with the
     *     properties listed below.
     * @param {Request|string} options.request A request to run this strategy for.
     * @param {ExtendableEvent} options.event The event associated with the
     *     request.
     * @param {URL} [options.url]
     * @param {*} [options.params]
     */
    handle(options) {
        const [responseDone] = this.handleAll(options);
        return responseDone;
    }
    /**
     * Similar to {@link workbox-strategies.Strategy~handle}, but
     * instead of just returning a `Promise` that resolves to a `Response` it
     * it will return an tuple of `[response, done]` promises, where the former
     * (`response`) is equivalent to what `handle()` returns, and the latter is a
     * Promise that will resolve once any promises that were added to
     * `event.waitUntil()` as part of performing the strategy have completed.
     *
     * You can await the `done` promise to ensure any extra work performed by
     * the strategy (usually caching responses) completes successfully.
     *
     * @param {FetchEvent|Object} options A `FetchEvent` or an object with the
     *     properties listed below.
     * @param {Request|string} options.request A request to run this strategy for.
     * @param {ExtendableEvent} options.event The event associated with the
     *     request.
     * @param {URL} [options.url]
     * @param {*} [options.params]
     * @return {Array<Promise>} A tuple of [response, done]
     *     promises that can be used to determine when the response resolves as
     *     well as when the handler has completed all its work.
     */
    handleAll(options) {
        // Allow for flexible options to be passed.
        if (options instanceof FetchEvent) {
            options = {
                event: options,
                request: options.request,
            };
        }
        const event = options.event;
        const request = typeof options.request === 'string'
            ? new Request(options.request)
            : options.request;
        const params = 'params' in options ? options.params : undefined;
        const handler = new _StrategyHandler_js__WEBPACK_IMPORTED_MODULE_4__.StrategyHandler(this, { event, request, params });
        const responseDone = this._getResponse(handler, request, event);
        const handlerDone = this._awaitComplete(responseDone, handler, request, event);
        // Return an array of promises, suitable for use with Promise.all().
        return [responseDone, handlerDone];
    }
    async _getResponse(handler, request, event) {
        await handler.runCallbacks('handlerWillStart', { event, request });
        let response = undefined;
        try {
            response = await this._handle(request, handler);
            // The "official" Strategy subclasses all throw this error automatically,
            // but in case a third-party Strategy doesn't, ensure that we have a
            // consistent failure when there's no response or an error response.
            if (!response || response.type === 'error') {
                throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_1__.WorkboxError('no-response', { url: request.url });
            }
        }
        catch (error) {
            if (error instanceof Error) {
                for (const callback of handler.iterateCallbacks('handlerDidError')) {
                    response = await callback({ error, event, request });
                    if (response) {
                        break;
                    }
                }
            }
            if (!response) {
                throw error;
            }
            else if (true) {
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_2__.logger.log(`While responding to '${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_3__.getFriendlyURL)(request.url)}', ` +
                    `an ${error instanceof Error ? error.toString() : ''} error occurred. Using a fallback response provided by ` +
                    `a handlerDidError plugin.`);
            }
        }
        for (const callback of handler.iterateCallbacks('handlerWillRespond')) {
            response = await callback({ event, request, response });
        }
        return response;
    }
    async _awaitComplete(responseDone, handler, request, event) {
        let response;
        let error;
        try {
            response = await responseDone;
        }
        catch (error) {
            // Ignore errors, as response errors should be caught via the `response`
            // promise above. The `done` promise will only throw for errors in
            // promises passed to `handler.waitUntil()`.
        }
        try {
            await handler.runCallbacks('handlerDidRespond', {
                event,
                request,
                response,
            });
            await handler.doneWaiting();
        }
        catch (waitUntilError) {
            if (waitUntilError instanceof Error) {
                error = waitUntilError;
            }
        }
        await handler.runCallbacks('handlerDidComplete', {
            event,
            request,
            response,
            error: error,
        });
        handler.destroy();
        if (error) {
            throw error;
        }
    }
}

/**
 * Classes extending the `Strategy` based class should implement this method,
 * and leverage the {@link workbox-strategies.StrategyHandler}
 * arg to perform all fetching and cache logic, which will ensure all relevant
 * cache, cache options, fetch options and plugins are used (per the current
 * strategy instance).
 *
 * @name _handle
 * @instance
 * @abstract
 * @function
 * @param {Request} request
 * @param {workbox-strategies.StrategyHandler} handler
 * @return {Promise<Response>}
 *
 * @memberof workbox-strategies.Strategy
 */


/***/ }),

/***/ "./node_modules/workbox-strategies/StrategyHandler.js":
/*!************************************************************!*\
  !*** ./node_modules/workbox-strategies/StrategyHandler.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StrategyHandler": () => (/* binding */ StrategyHandler)
/* harmony export */ });
/* harmony import */ var workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-core/_private/assert.js */ "./node_modules/workbox-core/_private/assert.js");
/* harmony import */ var workbox_core_private_cacheMatchIgnoreParams_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! workbox-core/_private/cacheMatchIgnoreParams.js */ "./node_modules/workbox-core/_private/cacheMatchIgnoreParams.js");
/* harmony import */ var workbox_core_private_Deferred_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! workbox-core/_private/Deferred.js */ "./node_modules/workbox-core/_private/Deferred.js");
/* harmony import */ var workbox_core_private_executeQuotaErrorCallbacks_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! workbox-core/_private/executeQuotaErrorCallbacks.js */ "./node_modules/workbox-core/_private/executeQuotaErrorCallbacks.js");
/* harmony import */ var workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! workbox-core/_private/getFriendlyURL.js */ "./node_modules/workbox-core/_private/getFriendlyURL.js");
/* harmony import */ var workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! workbox-core/_private/logger.js */ "./node_modules/workbox-core/_private/logger.js");
/* harmony import */ var workbox_core_private_timeout_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! workbox-core/_private/timeout.js */ "./node_modules/workbox-core/_private/timeout.js");
/* harmony import */ var workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! workbox-core/_private/WorkboxError.js */ "./node_modules/workbox-core/_private/WorkboxError.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-strategies/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_8__);
/*
  Copyright 2020 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/









function toRequest(input) {
    return typeof input === 'string' ? new Request(input) : input;
}
/**
 * A class created every time a Strategy instance instance calls
 * {@link workbox-strategies.Strategy~handle} or
 * {@link workbox-strategies.Strategy~handleAll} that wraps all fetch and
 * cache actions around plugin callbacks and keeps track of when the strategy
 * is "done" (i.e. all added `event.waitUntil()` promises have resolved).
 *
 * @memberof workbox-strategies
 */
class StrategyHandler {
    /**
     * Creates a new instance associated with the passed strategy and event
     * that's handling the request.
     *
     * The constructor also initializes the state that will be passed to each of
     * the plugins handling this request.
     *
     * @param {workbox-strategies.Strategy} strategy
     * @param {Object} options
     * @param {Request|string} options.request A request to run this strategy for.
     * @param {ExtendableEvent} options.event The event associated with the
     *     request.
     * @param {URL} [options.url]
     * @param {*} [options.params] The return value from the
     *     {@link workbox-routing~matchCallback} (if applicable).
     */
    constructor(strategy, options) {
        this._cacheKeys = {};
        /**
         * The request the strategy is performing (passed to the strategy's
         * `handle()` or `handleAll()` method).
         * @name request
         * @instance
         * @type {Request}
         * @memberof workbox-strategies.StrategyHandler
         */
        /**
         * The event associated with this request.
         * @name event
         * @instance
         * @type {ExtendableEvent}
         * @memberof workbox-strategies.StrategyHandler
         */
        /**
         * A `URL` instance of `request.url` (if passed to the strategy's
         * `handle()` or `handleAll()` method).
         * Note: the `url` param will be present if the strategy was invoked
         * from a workbox `Route` object.
         * @name url
         * @instance
         * @type {URL|undefined}
         * @memberof workbox-strategies.StrategyHandler
         */
        /**
         * A `param` value (if passed to the strategy's
         * `handle()` or `handleAll()` method).
         * Note: the `param` param will be present if the strategy was invoked
         * from a workbox `Route` object and the
         * {@link workbox-routing~matchCallback} returned
         * a truthy value (it will be that value).
         * @name params
         * @instance
         * @type {*|undefined}
         * @memberof workbox-strategies.StrategyHandler
         */
        if (true) {
            workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.isInstance(options.event, ExtendableEvent, {
                moduleName: 'workbox-strategies',
                className: 'StrategyHandler',
                funcName: 'constructor',
                paramName: 'options.event',
            });
        }
        Object.assign(this, options);
        this.event = options.event;
        this._strategy = strategy;
        this._handlerDeferred = new workbox_core_private_Deferred_js__WEBPACK_IMPORTED_MODULE_2__.Deferred();
        this._extendLifetimePromises = [];
        // Copy the plugins list (since it's mutable on the strategy),
        // so any mutations don't affect this handler instance.
        this._plugins = [...strategy.plugins];
        this._pluginStateMap = new Map();
        for (const plugin of this._plugins) {
            this._pluginStateMap.set(plugin, {});
        }
        this.event.waitUntil(this._handlerDeferred.promise);
    }
    /**
     * Fetches a given request (and invokes any applicable plugin callback
     * methods) using the `fetchOptions` (for non-navigation requests) and
     * `plugins` defined on the `Strategy` object.
     *
     * The following plugin lifecycle methods are invoked when using this method:
     * - `requestWillFetch()`
     * - `fetchDidSucceed()`
     * - `fetchDidFail()`
     *
     * @param {Request|string} input The URL or request to fetch.
     * @return {Promise<Response>}
     */
    async fetch(input) {
        const { event } = this;
        let request = toRequest(input);
        if (request.mode === 'navigate' &&
            event instanceof FetchEvent &&
            event.preloadResponse) {
            const possiblePreloadResponse = (await event.preloadResponse);
            if (possiblePreloadResponse) {
                if (true) {
                    workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_5__.logger.log(`Using a preloaded navigation response for ` +
                        `'${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_4__.getFriendlyURL)(request.url)}'`);
                }
                return possiblePreloadResponse;
            }
        }
        // If there is a fetchDidFail plugin, we need to save a clone of the
        // original request before it's either modified by a requestWillFetch
        // plugin or before the original request's body is consumed via fetch().
        const originalRequest = this.hasCallback('fetchDidFail')
            ? request.clone()
            : null;
        try {
            for (const cb of this.iterateCallbacks('requestWillFetch')) {
                request = await cb({ request: request.clone(), event });
            }
        }
        catch (err) {
            if (err instanceof Error) {
                throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_7__.WorkboxError('plugin-error-request-will-fetch', {
                    thrownErrorMessage: err.message,
                });
            }
        }
        // The request can be altered by plugins with `requestWillFetch` making
        // the original request (most likely from a `fetch` event) different
        // from the Request we make. Pass both to `fetchDidFail` to aid debugging.
        const pluginFilteredRequest = request.clone();
        try {
            let fetchResponse;
            // See https://github.com/GoogleChrome/workbox/issues/1796
            fetchResponse = await fetch(request, request.mode === 'navigate' ? undefined : this._strategy.fetchOptions);
            if (true) {
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_5__.logger.debug(`Network request for ` +
                    `'${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_4__.getFriendlyURL)(request.url)}' returned a response with ` +
                    `status '${fetchResponse.status}'.`);
            }
            for (const callback of this.iterateCallbacks('fetchDidSucceed')) {
                fetchResponse = await callback({
                    event,
                    request: pluginFilteredRequest,
                    response: fetchResponse,
                });
            }
            return fetchResponse;
        }
        catch (error) {
            if (true) {
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_5__.logger.log(`Network request for ` +
                    `'${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_4__.getFriendlyURL)(request.url)}' threw an error.`, error);
            }
            // `originalRequest` will only exist if a `fetchDidFail` callback
            // is being used (see above).
            if (originalRequest) {
                await this.runCallbacks('fetchDidFail', {
                    error: error,
                    event,
                    originalRequest: originalRequest.clone(),
                    request: pluginFilteredRequest.clone(),
                });
            }
            throw error;
        }
    }
    /**
     * Calls `this.fetch()` and (in the background) runs `this.cachePut()` on
     * the response generated by `this.fetch()`.
     *
     * The call to `this.cachePut()` automatically invokes `this.waitUntil()`,
     * so you do not have to manually call `waitUntil()` on the event.
     *
     * @param {Request|string} input The request or URL to fetch and cache.
     * @return {Promise<Response>}
     */
    async fetchAndCachePut(input) {
        const response = await this.fetch(input);
        const responseClone = response.clone();
        void this.waitUntil(this.cachePut(input, responseClone));
        return response;
    }
    /**
     * Matches a request from the cache (and invokes any applicable plugin
     * callback methods) using the `cacheName`, `matchOptions`, and `plugins`
     * defined on the strategy object.
     *
     * The following plugin lifecycle methods are invoked when using this method:
     * - cacheKeyWillByUsed()
     * - cachedResponseWillByUsed()
     *
     * @param {Request|string} key The Request or URL to use as the cache key.
     * @return {Promise<Response|undefined>} A matching response, if found.
     */
    async cacheMatch(key) {
        const request = toRequest(key);
        let cachedResponse;
        const { cacheName, matchOptions } = this._strategy;
        const effectiveRequest = await this.getCacheKey(request, 'read');
        const multiMatchOptions = Object.assign(Object.assign({}, matchOptions), { cacheName });
        cachedResponse = await caches.match(effectiveRequest, multiMatchOptions);
        if (true) {
            if (cachedResponse) {
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_5__.logger.debug(`Found a cached response in '${cacheName}'.`);
            }
            else {
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_5__.logger.debug(`No cached response found in '${cacheName}'.`);
            }
        }
        for (const callback of this.iterateCallbacks('cachedResponseWillBeUsed')) {
            cachedResponse =
                (await callback({
                    cacheName,
                    matchOptions,
                    cachedResponse,
                    request: effectiveRequest,
                    event: this.event,
                })) || undefined;
        }
        return cachedResponse;
    }
    /**
     * Puts a request/response pair in the cache (and invokes any applicable
     * plugin callback methods) using the `cacheName` and `plugins` defined on
     * the strategy object.
     *
     * The following plugin lifecycle methods are invoked when using this method:
     * - cacheKeyWillByUsed()
     * - cacheWillUpdate()
     * - cacheDidUpdate()
     *
     * @param {Request|string} key The request or URL to use as the cache key.
     * @param {Response} response The response to cache.
     * @return {Promise<boolean>} `false` if a cacheWillUpdate caused the response
     * not be cached, and `true` otherwise.
     */
    async cachePut(key, response) {
        const request = toRequest(key);
        // Run in the next task to avoid blocking other cache reads.
        // https://github.com/w3c/ServiceWorker/issues/1397
        await (0,workbox_core_private_timeout_js__WEBPACK_IMPORTED_MODULE_6__.timeout)(0);
        const effectiveRequest = await this.getCacheKey(request, 'write');
        if (true) {
            if (effectiveRequest.method && effectiveRequest.method !== 'GET') {
                throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_7__.WorkboxError('attempt-to-cache-non-get-request', {
                    url: (0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_4__.getFriendlyURL)(effectiveRequest.url),
                    method: effectiveRequest.method,
                });
            }
            // See https://github.com/GoogleChrome/workbox/issues/2818
            const vary = response.headers.get('Vary');
            if (vary) {
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_5__.logger.debug(`The response for ${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_4__.getFriendlyURL)(effectiveRequest.url)} ` +
                    `has a 'Vary: ${vary}' header. ` +
                    `Consider setting the {ignoreVary: true} option on your strategy ` +
                    `to ensure cache matching and deletion works as expected.`);
            }
        }
        if (!response) {
            if (true) {
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_5__.logger.error(`Cannot cache non-existent response for ` +
                    `'${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_4__.getFriendlyURL)(effectiveRequest.url)}'.`);
            }
            throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_7__.WorkboxError('cache-put-with-no-response', {
                url: (0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_4__.getFriendlyURL)(effectiveRequest.url),
            });
        }
        const responseToCache = await this._ensureResponseSafeToCache(response);
        if (!responseToCache) {
            if (true) {
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_5__.logger.debug(`Response '${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_4__.getFriendlyURL)(effectiveRequest.url)}' ` +
                    `will not be cached.`, responseToCache);
            }
            return false;
        }
        const { cacheName, matchOptions } = this._strategy;
        const cache = await self.caches.open(cacheName);
        const hasCacheUpdateCallback = this.hasCallback('cacheDidUpdate');
        const oldResponse = hasCacheUpdateCallback
            ? await (0,workbox_core_private_cacheMatchIgnoreParams_js__WEBPACK_IMPORTED_MODULE_1__.cacheMatchIgnoreParams)(
            // TODO(philipwalton): the `__WB_REVISION__` param is a precaching
            // feature. Consider into ways to only add this behavior if using
            // precaching.
            cache, effectiveRequest.clone(), ['__WB_REVISION__'], matchOptions)
            : null;
        if (true) {
            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_5__.logger.debug(`Updating the '${cacheName}' cache with a new Response ` +
                `for ${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_4__.getFriendlyURL)(effectiveRequest.url)}.`);
        }
        try {
            await cache.put(effectiveRequest, hasCacheUpdateCallback ? responseToCache.clone() : responseToCache);
        }
        catch (error) {
            if (error instanceof Error) {
                // See https://developer.mozilla.org/en-US/docs/Web/API/DOMException#exception-QuotaExceededError
                if (error.name === 'QuotaExceededError') {
                    await (0,workbox_core_private_executeQuotaErrorCallbacks_js__WEBPACK_IMPORTED_MODULE_3__.executeQuotaErrorCallbacks)();
                }
                throw error;
            }
        }
        for (const callback of this.iterateCallbacks('cacheDidUpdate')) {
            await callback({
                cacheName,
                oldResponse,
                newResponse: responseToCache.clone(),
                request: effectiveRequest,
                event: this.event,
            });
        }
        return true;
    }
    /**
     * Checks the list of plugins for the `cacheKeyWillBeUsed` callback, and
     * executes any of those callbacks found in sequence. The final `Request`
     * object returned by the last plugin is treated as the cache key for cache
     * reads and/or writes. If no `cacheKeyWillBeUsed` plugin callbacks have
     * been registered, the passed request is returned unmodified
     *
     * @param {Request} request
     * @param {string} mode
     * @return {Promise<Request>}
     */
    async getCacheKey(request, mode) {
        const key = `${request.url} | ${mode}`;
        if (!this._cacheKeys[key]) {
            let effectiveRequest = request;
            for (const callback of this.iterateCallbacks('cacheKeyWillBeUsed')) {
                effectiveRequest = toRequest(await callback({
                    mode,
                    request: effectiveRequest,
                    event: this.event,
                    // params has a type any can't change right now.
                    params: this.params, // eslint-disable-line
                }));
            }
            this._cacheKeys[key] = effectiveRequest;
        }
        return this._cacheKeys[key];
    }
    /**
     * Returns true if the strategy has at least one plugin with the given
     * callback.
     *
     * @param {string} name The name of the callback to check for.
     * @return {boolean}
     */
    hasCallback(name) {
        for (const plugin of this._strategy.plugins) {
            if (name in plugin) {
                return true;
            }
        }
        return false;
    }
    /**
     * Runs all plugin callbacks matching the given name, in order, passing the
     * given param object (merged ith the current plugin state) as the only
     * argument.
     *
     * Note: since this method runs all plugins, it's not suitable for cases
     * where the return value of a callback needs to be applied prior to calling
     * the next callback. See
     * {@link workbox-strategies.StrategyHandler#iterateCallbacks}
     * below for how to handle that case.
     *
     * @param {string} name The name of the callback to run within each plugin.
     * @param {Object} param The object to pass as the first (and only) param
     *     when executing each callback. This object will be merged with the
     *     current plugin state prior to callback execution.
     */
    async runCallbacks(name, param) {
        for (const callback of this.iterateCallbacks(name)) {
            // TODO(philipwalton): not sure why `any` is needed. It seems like
            // this should work with `as WorkboxPluginCallbackParam[C]`.
            await callback(param);
        }
    }
    /**
     * Accepts a callback and returns an iterable of matching plugin callbacks,
     * where each callback is wrapped with the current handler state (i.e. when
     * you call each callback, whatever object parameter you pass it will
     * be merged with the plugin's current state).
     *
     * @param {string} name The name fo the callback to run
     * @return {Array<Function>}
     */
    *iterateCallbacks(name) {
        for (const plugin of this._strategy.plugins) {
            if (typeof plugin[name] === 'function') {
                const state = this._pluginStateMap.get(plugin);
                const statefulCallback = (param) => {
                    const statefulParam = Object.assign(Object.assign({}, param), { state });
                    // TODO(philipwalton): not sure why `any` is needed. It seems like
                    // this should work with `as WorkboxPluginCallbackParam[C]`.
                    return plugin[name](statefulParam);
                };
                yield statefulCallback;
            }
        }
    }
    /**
     * Adds a promise to the
     * [extend lifetime promises]{@link https://w3c.github.io/ServiceWorker/#extendableevent-extend-lifetime-promises}
     * of the event event associated with the request being handled (usually a
     * `FetchEvent`).
     *
     * Note: you can await
     * {@link workbox-strategies.StrategyHandler~doneWaiting}
     * to know when all added promises have settled.
     *
     * @param {Promise} promise A promise to add to the extend lifetime promises
     *     of the event that triggered the request.
     */
    waitUntil(promise) {
        this._extendLifetimePromises.push(promise);
        return promise;
    }
    /**
     * Returns a promise that resolves once all promises passed to
     * {@link workbox-strategies.StrategyHandler~waitUntil}
     * have settled.
     *
     * Note: any work done after `doneWaiting()` settles should be manually
     * passed to an event's `waitUntil()` method (not this handler's
     * `waitUntil()` method), otherwise the service worker thread my be killed
     * prior to your work completing.
     */
    async doneWaiting() {
        let promise;
        while ((promise = this._extendLifetimePromises.shift())) {
            await promise;
        }
    }
    /**
     * Stops running the strategy and immediately resolves any pending
     * `waitUntil()` promises.
     */
    destroy() {
        this._handlerDeferred.resolve(null);
    }
    /**
     * This method will call cacheWillUpdate on the available plugins (or use
     * status === 200) to determine if the Response is safe and valid to cache.
     *
     * @param {Request} options.request
     * @param {Response} options.response
     * @return {Promise<Response|undefined>}
     *
     * @private
     */
    async _ensureResponseSafeToCache(response) {
        let responseToCache = response;
        let pluginsUsed = false;
        for (const callback of this.iterateCallbacks('cacheWillUpdate')) {
            responseToCache =
                (await callback({
                    request: this.request,
                    response: responseToCache,
                    event: this.event,
                })) || undefined;
            pluginsUsed = true;
            if (!responseToCache) {
                break;
            }
        }
        if (!pluginsUsed) {
            if (responseToCache && responseToCache.status !== 200) {
                responseToCache = undefined;
            }
            if (true) {
                if (responseToCache) {
                    if (responseToCache.status !== 200) {
                        if (responseToCache.status === 0) {
                            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_5__.logger.warn(`The response for '${this.request.url}' ` +
                                `is an opaque response. The caching strategy that you're ` +
                                `using will not cache opaque responses by default.`);
                        }
                        else {
                            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_5__.logger.debug(`The response for '${this.request.url}' ` +
                                `returned a status code of '${response.status}' and won't ` +
                                `be cached as a result.`);
                        }
                    }
                }
            }
        }
        return responseToCache;
    }
}



/***/ }),

/***/ "./node_modules/workbox-strategies/_version.js":
/*!*****************************************************!*\
  !*** ./node_modules/workbox-strategies/_version.js ***!
  \*****************************************************/
/***/ (() => {


// @ts-ignore
try {
    self['workbox:strategies:6.5.3'] && _();
}
catch (e) { }


/***/ }),

/***/ "./node_modules/workbox-precaching/index.mjs":
/*!***************************************************!*\
  !*** ./node_modules/workbox-precaching/index.mjs ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PrecacheController": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_0__.PrecacheController),
/* harmony export */   "PrecacheFallbackPlugin": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_0__.PrecacheFallbackPlugin),
/* harmony export */   "PrecacheRoute": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_0__.PrecacheRoute),
/* harmony export */   "PrecacheStrategy": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_0__.PrecacheStrategy),
/* harmony export */   "addPlugins": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_0__.addPlugins),
/* harmony export */   "addRoute": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_0__.addRoute),
/* harmony export */   "cleanupOutdatedCaches": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_0__.cleanupOutdatedCaches),
/* harmony export */   "createHandlerBoundToURL": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_0__.createHandlerBoundToURL),
/* harmony export */   "getCacheKeyForURL": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_0__.getCacheKeyForURL),
/* harmony export */   "matchPrecache": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_0__.matchPrecache),
/* harmony export */   "precache": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_0__.precache),
/* harmony export */   "precacheAndRoute": () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_0__.precacheAndRoute)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "./node_modules/workbox-precaching/index.js");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*******************************************************!*\
  !*** ./node_modules/@docusaurus/plugin-pwa/lib/sw.js ***!
  \*******************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var workbox_precaching__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-precaching */ "./node_modules/workbox-precaching/index.mjs");
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/* eslint-disable no-restricted-globals */

function parseSwParams() {
    const params = JSON.parse(new URLSearchParams(self.location.search).get('params'));
    if (params.debug) {
        console.log('[Docusaurus-PWA][SW]: Service Worker params:', params);
    }
    return params;
}
// Doc advises against dynamic imports in SW
// https://developers.google.com/web/tools/workbox/guides/using-bundlers#code_splitting_and_dynamic_imports
// https://twitter.com/sebastienlorber/status/1280155204575518720
// but looks it's working fine as it's inlined by webpack, need to double check
async function runSWCustomCode(params) {
    if (false) {}
}
/**
 * Gets different possible variations for a request URL. Similar to
 * https://git.io/JvixK
 */
function getPossibleURLs(url) {
    const urlObject = new URL(url, self.location.href);
    if (urlObject.origin !== self.location.origin) {
        return [];
    }
    // Ignore search params and hash
    urlObject.search = '';
    urlObject.hash = '';
    return [
        // /blog.html
        urlObject.href,
        // /blog/ => /blog/index.html
        // /blog => /blog/index.html
        `${urlObject.href}${urlObject.pathname.endsWith('/') ? '' : '/'}index.html`,
    ];
}
(async () => {
    const params = parseSwParams();
    // eslint-disable-next-line no-underscore-dangle
    const precacheManifest = [{"revision":"f503c04c8f7b43f618d64d47a4dbddf7","url":"404.html"},{"revision":"40593d10ccecb9b41bff319dc1a35609","url":"about/index.html"},{"revision":"6e05c9fb5d47132a8f533a843541a959","url":"archive/index.html"},{"revision":"955934a4b7609d646c04fa643b7c4954","url":"assets/css/styles.f31817f4.css"},{"revision":"88b199fc9d04653e622490456dc8ed19","url":"assets/js/03523e3c.61887834.js"},{"revision":"d74690ebe366cf899edafbe407318465","url":"assets/js/041b4e4e.dcce6d0e.js"},{"revision":"f89630a3f50fdcae04f31c9eec1f27fb","url":"assets/js/05a40d0a.21c48bfe.js"},{"revision":"e24cae5f5724d780c7767b2f46f272a2","url":"assets/js/06b55321.2f0adfaa.js"},{"revision":"b0026325d0b83855288dbf42f6005cd3","url":"assets/js/0780ac60.d9ab37be.js"},{"revision":"df60ee5aa42fae64bdafa715ec7d33e8","url":"assets/js/07d9a7b6.937b8230.js"},{"revision":"86e3d4eb57a631ffd1e2679e2279e92f","url":"assets/js/0843b0a0.36fa2dc5.js"},{"revision":"e00285851042c17109fd131a0a623c9a","url":"assets/js/0af0b115.9e20169b.js"},{"revision":"a4c8d2d8042303b7fe141cc9ea9c3074","url":"assets/js/0d895782.4b028688.js"},{"revision":"0625a33bd8fa756b2b8935aabb073e1c","url":"assets/js/0fa5b208.fea6f05d.js"},{"revision":"7e90eb98b40ae5ee448109e54a037dc6","url":"assets/js/101a315b.cd4813bb.js"},{"revision":"0cd015f989f4d64d7e5ee661f03bbe3d","url":"assets/js/1161d6c7.10492689.js"},{"revision":"d731da5710b28549c88a505bbbc9d885","url":"assets/js/1247f868.47dd6063.js"},{"revision":"f2c7d0808a4b919d214972ed281e45c2","url":"assets/js/12ee085b.7ee46cd9.js"},{"revision":"0f1e69f45341d65266dc9b025c7572c0","url":"assets/js/1498df9c.ab9779f5.js"},{"revision":"9301a50412a5646518afbdb2f770d5eb","url":"assets/js/149ec099.d2931d58.js"},{"revision":"42934be42ea4abe6b712abbb0f808a18","url":"assets/js/14a62d48.5ee841c1.js"},{"revision":"28cf76be8c71450cf30117cb1509404d","url":"assets/js/14a90b39.ff630057.js"},{"revision":"7245a6a2936304ace69a9fad4130d8a3","url":"assets/js/165070cd.f0dd9909.js"},{"revision":"3c53bf57bb032ad684b40e6e56f19486","url":"assets/js/16de4b48.9135374d.js"},{"revision":"3f1ab56f2194ffb633ff5b4bfc2a8802","url":"assets/js/17896441.bd4bc376.js"},{"revision":"aecc4b7f9df0bce23ddf3d3072562ff4","url":"assets/js/18bd96fa.0278b812.js"},{"revision":"a129a094f0ae642469139b6b91dc9d6b","url":"assets/js/192cc362.411502d5.js"},{"revision":"00da6e00e2274fca490e42d402891323","url":"assets/js/19430bfc.75d7f292.js"},{"revision":"d192daf58166451e0e7edc00c075c203","url":"assets/js/19cb9c18.81cc1947.js"},{"revision":"ddd1031eed4197474808976729274f6a","url":"assets/js/1a4e3797.a3fcb195.js"},{"revision":"f36ed76839a759541c2fb8ae73706827","url":"assets/js/1a6d8f56.fcfcaaeb.js"},{"revision":"287a68f550deb026920fe9b110d651aa","url":"assets/js/1a7438fe.afc61ada.js"},{"revision":"d5ac23e10abc4db403276bfd97044962","url":"assets/js/1b8df405.78a16d37.js"},{"revision":"a92460c13ea186cb8d166eafa1901e15","url":"assets/js/1be78505.8a9728cc.js"},{"revision":"de7199a1951cf0d9c97cf771c5abd18c","url":"assets/js/1df93b7f.b94a130d.js"},{"revision":"50507de0b9a1d541ab6d139a20aecb50","url":"assets/js/1e43fa2b.e8f8fa6f.js"},{"revision":"b92960b35a27b0a8df36c6f18d919515","url":"assets/js/1ec266df.972ab490.js"},{"revision":"7e052562613c4d79d34901699c8d4912","url":"assets/js/1f391b9e.9888e890.js"},{"revision":"5fdad0b3192145ba251e6f938b249bb8","url":"assets/js/1f57b463.64dcc605.js"},{"revision":"c477349cacf1c2a34ddad8f36f0ae016","url":"assets/js/21442433.aa79a2a5.js"},{"revision":"7bc38abfdafe40f75ca5fb8c003248e4","url":"assets/js/21d30a3e.9326f61e.js"},{"revision":"bac438cb81af6e71a62a9e307ad4ef33","url":"assets/js/2235.e666946d.js"},{"revision":"4c4a0abe11ba3c50fb4b2c9888672a0f","url":"assets/js/2334f40b.76a31b36.js"},{"revision":"3b27f88ade762901a2fc928bc5293669","url":"assets/js/24c2687a.0abc822d.js"},{"revision":"3484befeb52aa76f16f77836d59c31f4","url":"assets/js/271092f9.fba708a6.js"},{"revision":"306ccbc8cc97716c1c0402025cc82615","url":"assets/js/282102f8.6d32353b.js"},{"revision":"49cec3caed686348f3008ce668bc0083","url":"assets/js/2880.04e8db91.js"},{"revision":"8c7caafbf07f276a183fdcaba6a421d3","url":"assets/js/2af14b9b.55a1a3c0.js"},{"revision":"37848c26e37876c3b6c5a81e627ac6cf","url":"assets/js/2b26bfd6.8e4a10a2.js"},{"revision":"d3933e2ca762af3294085c4455d38b8e","url":"assets/js/2b561b09.46d38a9a.js"},{"revision":"f87da2917de957649d62084590d4f5e1","url":"assets/js/2b646ee9.4775059a.js"},{"revision":"f60d047cfcb7cab9356058830f8cfd63","url":"assets/js/2c0efe9e.733fe102.js"},{"revision":"03b502fd29d5cc3e137158ebd712b9c2","url":"assets/js/2e469471.a852f48a.js"},{"revision":"36ab18fe4ccf967461c136989da1769e","url":"assets/js/2e801cce.ebd9f8e1.js"},{"revision":"25da5c95abb816c7e7f4a06509a769a0","url":"assets/js/31dcbc9e.8fc0c994.js"},{"revision":"8c47b5906a3de73460267fd08f77beeb","url":"assets/js/325f8f26.1636a6f4.js"},{"revision":"446658581800ca29e6a6a1bc18cd2c6c","url":"assets/js/32d608d6.405dc237.js"},{"revision":"add32468b64232c1bc7c8614688cd0b9","url":"assets/js/33848bd7.64955ae3.js"},{"revision":"d25cee2a010f545636599addf299351d","url":"assets/js/3501.124de45f.js"},{"revision":"c5c223698875173ce8a2ed0173bb1871","url":"assets/js/363.b493b04b.js"},{"revision":"25b243c7c2b296b4e7663ea6898d26ed","url":"assets/js/3720c009.5c139bd2.js"},{"revision":"299a7bd25fd269f9f3fec7b6746ae736","url":"assets/js/38690686.17c06e12.js"},{"revision":"3c80464a208c1f8dfc2a9e484591e373","url":"assets/js/3c624c5f.37ee05be.js"},{"revision":"e95117c910900b5f11d5e29ee053b021","url":"assets/js/3c688164.d04f617b.js"},{"revision":"45eec8f8dce335d511c199f14fbfd726","url":"assets/js/3dcacff2.b852ae71.js"},{"revision":"512b045bcee8e649bc75bd17bac9373f","url":"assets/js/3f9efcdf.46f21388.js"},{"revision":"f15e5969fa1c8eade55f9443772902f8","url":"assets/js/40229295.f7cdc175.js"},{"revision":"663c1f68f443b0d48d83e4391ed8149d","url":"assets/js/407a5df3.8c14f54e.js"},{"revision":"48f2978ec3c65668dc244124bc741048","url":"assets/js/410137a7.4e492fca.js"},{"revision":"c83f22cbeac9cfe273f7adee90fb277f","url":"assets/js/4248.c99b8e29.js"},{"revision":"ef8659cccb596ba22364d442fa183df0","url":"assets/js/42eecee7.5391c084.js"},{"revision":"a95276d8907ccfdad62fc48c5722b37f","url":"assets/js/4352.3e39cded.js"},{"revision":"36318afbb0999e14daae0ae332d9a9b9","url":"assets/js/452e2797.d625ab3c.js"},{"revision":"7ec0ae709c24fdf340afa7fe3899e4ce","url":"assets/js/46304e99.5be9569b.js"},{"revision":"518a713bc0f724424a0835fb985c9abd","url":"assets/js/46dc3344.aa69e123.js"},{"revision":"6323cb7c569af7aaeae5521c7dc2dcbb","url":"assets/js/4ad770b1.595d59aa.js"},{"revision":"e0650958e8a95679f69e716467599aa8","url":"assets/js/4afeef3c.10871733.js"},{"revision":"fc5b5f3bac62370b6a8335dd7116e7fd","url":"assets/js/4bc5acf4.c00e8367.js"},{"revision":"3bfcd00b20b29db976271e2ea651afbb","url":"assets/js/4ceb3723.3ce99721.js"},{"revision":"95a861a727efb0f3557c66356b3ee29a","url":"assets/js/4db011df.611fff4f.js"},{"revision":"1f7e3de431c012a588489537a3d4569e","url":"assets/js/4dc4c1ed.9e8d4b31.js"},{"revision":"8f8ee16d951299010a354951504135c3","url":"assets/js/4df0c28e.65cfbf67.js"},{"revision":"e91fadf67ab9053d11daad416a63d403","url":"assets/js/4efc1766.4312ab94.js"},{"revision":"eea19f038ba727391987eacd5ddd1f55","url":"assets/js/4f838265.ae99106f.js"},{"revision":"d887addd44aa6de24eb1ad519f4a2e1d","url":"assets/js/50b24677.cdadc350.js"},{"revision":"cbca5ce62eeb8dfdfd0a59ab1002f6f3","url":"assets/js/50c0f8b3.1b1702c8.js"},{"revision":"4e518da256a2c016eb4812b358bccb9e","url":"assets/js/5131.90a0612a.js"},{"revision":"2bd831742c6675f569ec727af64a6f1c","url":"assets/js/53db62ee.8f7c95e8.js"},{"revision":"b047d9d4b3ab8c2d647192de696103dd","url":"assets/js/54d0b922.9748714d.js"},{"revision":"0e3a24b35d164eec53dd2daaa32851a3","url":"assets/js/54f4ee4c.97877143.js"},{"revision":"07db96dac2e07e00644fd4d5df3f4942","url":"assets/js/5525.12f167c2.js"},{"revision":"c825120484567f6e8b68a5159fd913ec","url":"assets/js/55960ee5.3a78f7fc.js"},{"revision":"67f630cb7c21e00303a68834842b30f6","url":"assets/js/58ed9a85.649a8c33.js"},{"revision":"fe05df491eecdf259bf214dffe0a443b","url":"assets/js/5944.8ca37871.js"},{"revision":"b9d8dfc4ee969a827010e0c8e53d2a91","url":"assets/js/597c234f.b221c082.js"},{"revision":"1864c7a9bc4f71e5dc1357a89f3e3bf6","url":"assets/js/5af75673.7a352fbf.js"},{"revision":"14796fe9bac380e0d54d1ce086d3900c","url":"assets/js/5c46405e.ab4ef4fa.js"},{"revision":"2700394f56d98f60365778f3fd7f10f0","url":"assets/js/5cef977e.dd19d4a4.js"},{"revision":"0a7fb649185a721594142878b7b90821","url":"assets/js/5e59bac0.cdce9237.js"},{"revision":"04ed0e64d5371b05d4b3ac1544ec8940","url":"assets/js/5eaeb543.677ab6dd.js"},{"revision":"3082b8fed7fa048c27b71d387d084e01","url":"assets/js/6046d87c.634e3ade.js"},{"revision":"f59b496e20b2e5b68703d6091761cfe9","url":"assets/js/60f4a9b2.cc024d34.js"},{"revision":"448d355a558e3f541916d5bbf6c659a7","url":"assets/js/627727d9.ac7113d6.js"},{"revision":"37e821137b3756d58ddbb1ae6055a32a","url":"assets/js/65803afc.225dac10.js"},{"revision":"35a0a91e7536e9e516f7ec080ab26ee8","url":"assets/js/6797750a.746f9542.js"},{"revision":"f9cc84509be69db6e48b704152286ecc","url":"assets/js/67fde1f1.c4d7b310.js"},{"revision":"5e5c6ff88eab6ff8ea31c4cd7cc90773","url":"assets/js/68efc260.101e75c7.js"},{"revision":"45dedfd035fc817f808fb222a523ffd8","url":"assets/js/6a0f83f7.946811a4.js"},{"revision":"01e7843a666c5c72c6d554a53a1b0ff5","url":"assets/js/6af14956.362bc41f.js"},{"revision":"71b6ce50a011a22b1a018b2be3d514f7","url":"assets/js/6d2589af.221cc904.js"},{"revision":"40fb1b18c2696d4bbda2360cf6ef0063","url":"assets/js/6d918a23.129c49cd.js"},{"revision":"776780e63ccdeb9d0b318a58a75d4a71","url":"assets/js/6e573e0f.b3e3224c.js"},{"revision":"c2e84a747d2cff3612f315581209275a","url":"assets/js/6e80773a.4c2f82e1.js"},{"revision":"717bdfe3ddb6296d4446220b36c3cb84","url":"assets/js/6fa1b423.8f7b178c.js"},{"revision":"d7c986d83137a07c3515626380291a23","url":"assets/js/704c0f1d.81ebd530.js"},{"revision":"09dabae8481a12c0baf46399e1dfc51d","url":"assets/js/71cc0ae2.e4a83095.js"},{"revision":"1a4e7f9e4c64a70a4bd6d606a6960576","url":"assets/js/71e643cb.1fbfc835.js"},{"revision":"fc7e941fda5210e649c3210cc5820e94","url":"assets/js/73ee2d71.5bed87f2.js"},{"revision":"4378f1ff903b363cc6bf88eb5c7adab2","url":"assets/js/7741b607.cdb30c54.js"},{"revision":"616f0454dd456a9f519d206de38259c9","url":"assets/js/77b07341.01aa4e2d.js"},{"revision":"62068a622d10d3b8c267444d2c4d1798","url":"assets/js/77deccd9.2a30734c.js"},{"revision":"d7b7147b4c3d8f7e3bbbae4ce348b269","url":"assets/js/7a80986c.a3f030b4.js"},{"revision":"5dedda9298cc983718777ebf30e1cea1","url":"assets/js/7abee0d2.a2a2b68f.js"},{"revision":"678f1ea9b057a817acca506e0b66a71a","url":"assets/js/7aede18f.e6644566.js"},{"revision":"cc3fe27aec650282c2966d8ce87587ef","url":"assets/js/7b667a7f.b79dce44.js"},{"revision":"6bbf9dfb82bb16b7cb79dd577725b132","url":"assets/js/7c025958.4573448e.js"},{"revision":"389fb3810269e338ccd810d37dfb4450","url":"assets/js/7f18a550.e18b7b67.js"},{"revision":"c25c736a076d4cece738d92b27052752","url":"assets/js/814f3328.a5c0c349.js"},{"revision":"fc4ec7814a6276d3369b06127a493c34","url":"assets/js/816ceee1.2271d35a.js"},{"revision":"77f537c540cb81d2b43c09ef639ba244","url":"assets/js/82600ec4.5b1696cf.js"},{"revision":"9be35bfca580d935d8241feacdf71411","url":"assets/js/83ead235.aadbe82d.js"},{"revision":"ea4491f60e671624d201a99be1156cfc","url":"assets/js/8443.2a2782f4.js"},{"revision":"ce2027235fd7d7d438bab4f019a097bf","url":"assets/js/8451328b.cc3ae718.js"},{"revision":"e57f5647495638de9b09035be3d58051","url":"assets/js/85b45223.0a898926.js"},{"revision":"40f165ba2288ed1ba8a68fe3b0e18695","url":"assets/js/85b89f2e.610cde6d.js"},{"revision":"f5baf019aaf11565d5e7e1ada201e1f8","url":"assets/js/85ecabc4.d720641a.js"},{"revision":"10ca502af8370193886792e5e0cb274c","url":"assets/js/88fde273.cd95d1cb.js"},{"revision":"9b34a8271045eb5b2cf673d9c3f0325e","url":"assets/js/8b106245.c372de6a.js"},{"revision":"045396465f99478b50f6b343191ea276","url":"assets/js/8b66cfb1.02ee69a7.js"},{"revision":"ec5faad27982a7fabba5ddaa39eecd9e","url":"assets/js/8c4c2d78.c6b09529.js"},{"revision":"04348201e0fabafa179abd8ec9d7af6e","url":"assets/js/8db97543.1821d2e1.js"},{"revision":"887601afa61a54bf2db06963a6017f9d","url":"assets/js/8f0372ab.5d55995e.js"},{"revision":"93f4556bf3b189ed747f6cf441bf60de","url":"assets/js/918336e7.543ef534.js"},{"revision":"9fcdfb8450d3d611565f46ae109af2c5","url":"assets/js/9246ce66.0a02975a.js"},{"revision":"e8a17a281ef21bce23269e96036bf081","url":"assets/js/930a7f81.87867cec.js"},{"revision":"412b9eb929d8ae4ee49c6289cc88f5ee","url":"assets/js/935f2afb.78f043ad.js"},{"revision":"47fc71ae3cca8c39cc77c8139af8a7be","url":"assets/js/93eb5514.57bb4df1.js"},{"revision":"e012dd9d8ca84fba85c0a90bd27968bb","url":"assets/js/94ff640e.399828ea.js"},{"revision":"427c352b6a4b7b9bf8d8cb979725fe16","url":"assets/js/968f7726.b5d09b0c.js"},{"revision":"8598a4e20aad7a1684d159b34bfee795","url":"assets/js/97b727aa.f44202f9.js"},{"revision":"5ac20df0763abf0a333a8d26e1e45193","url":"assets/js/97bb48b0.b5a9ee24.js"},{"revision":"46a75fb3dd0e5025ec2f61ea1a1d0bb9","url":"assets/js/98d0de8f.f3d409f9.js"},{"revision":"15aec6eba7f9ba9e96d6f1024c5ff591","url":"assets/js/9c0cc864.3636d0a5.js"},{"revision":"d2ed3bb1a138ed0b218e24f1fa6a5d7e","url":"assets/js/9ca5f3db.8b8031d2.js"},{"revision":"619e3206f15be559d3d19d8f22619000","url":"assets/js/9da2c611.4db0613a.js"},{"revision":"f8a5b504b1ae3cfda0d5c26a5137bce4","url":"assets/js/9e227252.24236968.js"},{"revision":"b804888b7e81f67f523cf103d7571536","url":"assets/js/9e4087bc.963de802.js"},{"revision":"827b3cbc9bb8af22216495419f737962","url":"assets/js/9fe11839.f984863f.js"},{"revision":"8befdda6ff489195d880e50a0c824c22","url":"assets/js/a10dead0.04139160.js"},{"revision":"541dd81764e607946a67bf9c1c9eba0b","url":"assets/js/a1dc35ba.e0b90f17.js"},{"revision":"f7228b3f99396e4dfa99dc28a195ecf0","url":"assets/js/a29f262d.8f0e81de.js"},{"revision":"682e8785ded01f29cd28200c03312aa6","url":"assets/js/a3e787c5.a157e567.js"},{"revision":"db910d42f483ab6b211a685f927c5f1b","url":"assets/js/a3ed3a77.613d7492.js"},{"revision":"f916c89fb71e1edb73ef9e9502aaac86","url":"assets/js/a48b988b.ff2de7ba.js"},{"revision":"9705dc5d7ec653d2e50faaf02e4d0bb9","url":"assets/js/a512d139.55e9f0d6.js"},{"revision":"6b46e0f58f30e99534d0c23ae688489d","url":"assets/js/a5313bdc.74fab9d8.js"},{"revision":"6e7d9e4a0001fbf8bdb6cf00c31486eb","url":"assets/js/a5557bb9.2710da3f.js"},{"revision":"cd36eba58b72eb2069f307c60e978f6f","url":"assets/js/a6aa9e1f.dd01315e.js"},{"revision":"2156d04b890c320d0e502a03cb432412","url":"assets/js/a6e47070.f22b9975.js"},{"revision":"8eaeda3a6029ceeb80d6f05ed96ad7e8","url":"assets/js/a7fa6704.f186fc2e.js"},{"revision":"cd8b27f9f39ee78dc1dbc812fec0e050","url":"assets/js/aa0b4132.4dff97f9.js"},{"revision":"f43ccb47fb821a149f69102195e1bef1","url":"assets/js/aa10dad8.4fd63be5.js"},{"revision":"723ac40dbdcbd1cd8e698c798a3a88e3","url":"assets/js/aa3fafcd.cb344a32.js"},{"revision":"95ace49247204df392923c6bb32b1236","url":"assets/js/ab902358.10cbfcb4.js"},{"revision":"78b56843e2fe6f316de89b36b6b51dd0","url":"assets/js/ac4cbdd5.e1dd2316.js"},{"revision":"47ae2e11ad36596592e647dbe08c830e","url":"assets/js/b173fa5b.49b52f8a.js"},{"revision":"c91ea9765424f331b2c77e6b5ce177b8","url":"assets/js/b2a8b4b3.aed9e700.js"},{"revision":"513c9a495d01c1083ab5d20d0573acf0","url":"assets/js/b38baa9e.1f062251.js"},{"revision":"21ace9d1e0439c1877b1ca1ab73b7b45","url":"assets/js/b7336e88.634bc8a9.js"},{"revision":"af0e66e365486cb1e446b48b84abd1c7","url":"assets/js/b99044b9.b50b7421.js"},{"revision":"3e4d5f8fba518ec8ea71453ac847e4fe","url":"assets/js/bb546bb0.7f17af03.js"},{"revision":"dc7e10b6101b8dc8189df1d3de912236","url":"assets/js/bba5a3a5.83d7bf03.js"},{"revision":"4819ad7e5729a371a8c8240b9ec6cb4f","url":"assets/js/bc36713c.1465d9b2.js"},{"revision":"49d99c1820d14cfef62077b9baff233c","url":"assets/js/bea99eb0.2edc8542.js"},{"revision":"cc7cc559f9da4bc8e7610c62dc979bec","url":"assets/js/bee3cb37.90b64e02.js"},{"revision":"cea5581577a7b5c3e5c1f3e783d5e7c9","url":"assets/js/bf784083.c10c1b02.js"},{"revision":"b4d834333fb6aa58bdd184f3e0cef631","url":"assets/js/bfa38861.59fa93ba.js"},{"revision":"f3af5320b3b28fd54217722d0d000c33","url":"assets/js/c1d4f0b0.ceac4103.js"},{"revision":"61498b79b47e36cd8ecbd0f866f4e245","url":"assets/js/c24dbbfa.c8f60841.js"},{"revision":"e9ca8c115965a941916d30da988617d2","url":"assets/js/c4994511.2666666f.js"},{"revision":"4d652f87d51f7563141475d6c3ab9416","url":"assets/js/c577cc16.4699c518.js"},{"revision":"07699b2e61bce5453dff22936beb6c7c","url":"assets/js/c5a0828b.a5f65497.js"},{"revision":"14eb1d5b822367cf5e68fbafdaa8b112","url":"assets/js/c6f7dcf2.75167f47.js"},{"revision":"bc953cb4f1cb0d0f31872680304fb109","url":"assets/js/c736c059.b075f8ef.js"},{"revision":"bdfd85b5464c011650e70c07e02cc561","url":"assets/js/c94da60e.89f67907.js"},{"revision":"3c24ad73090c3093c1fd2ac536e3dc6f","url":"assets/js/c9f0f47d.604e8c27.js"},{"revision":"80865557bda67f5613272df6f9441c8e","url":"assets/js/c9f32de9.9f536986.js"},{"revision":"1dc1181a91616a3b6c5d711c4bdfab78","url":"assets/js/caf05a90.3408055c.js"},{"revision":"eccfae41ad64a084ae677285d234efc7","url":"assets/js/cb0e0c74.a4ab0500.js"},{"revision":"2665b4be8afa37082257d9697ec0c27e","url":"assets/js/cc51f857.49270e8f.js"},{"revision":"793f355b6c3adec083b7be872874170b","url":"assets/js/ccc49370.91b72f03.js"},{"revision":"99f7f568b11ea10f8a69e27d25502e65","url":"assets/js/ce776735.d6550c57.js"},{"revision":"e0f79b4616418d46152a3b5e69e6eed6","url":"assets/js/d03dbf48.8d83788b.js"},{"revision":"2f50cf19336f57b116ebec9f87916d76","url":"assets/js/d1970fa0.8375016f.js"},{"revision":"bd12b4350f2316e5d80f8dfb75eb0a2d","url":"assets/js/d25941f6.d94b9f4a.js"},{"revision":"cbaa88a9c0c372679142164368bcc0fb","url":"assets/js/d353c3ef.9c3f0bb5.js"},{"revision":"d2848861b3ef766684f727c1a7c7c684","url":"assets/js/d3dcf24a.66e30107.js"},{"revision":"bfc8c997a5b98d89102698543432e895","url":"assets/js/d3e9d477.6e9fed0d.js"},{"revision":"d075907ddcef68b06a44fa73b6c65fc4","url":"assets/js/d526066d.9c303577.js"},{"revision":"f1d134f689f8ea2f730da4f3dbcad166","url":"assets/js/d5a4cb95.16c13474.js"},{"revision":"cd3e56a75c21e6778ad9b945ab7cfd54","url":"assets/js/d6a29e59.2d7bb0dc.js"},{"revision":"9a10ed0d8f7a00dd2edcb3c9e866966c","url":"assets/js/d71b4700.10e33839.js"},{"revision":"ea0ad11fadf5176601e6293394e2c8f8","url":"assets/js/d727d6b0.7cc13277.js"},{"revision":"6a5bc40ee12b595be2b7ea13d866e76c","url":"assets/js/d7b3e9d0.d62020e3.js"},{"revision":"07b6dcf93f2fdd1afbaee96fdaec0698","url":"assets/js/d7f3cfd4.16dcb17e.js"},{"revision":"68b1c758cf3b19ac9ab30b6b8dc344ed","url":"assets/js/d85e8601.ad8cfc2d.js"},{"revision":"d4aa825490e27b8d2d593294a8f4af4e","url":"assets/js/db2e0839.709ceec5.js"},{"revision":"2a7b1d2a88231e2e2b5bb9b02dc3b0a8","url":"assets/js/dc0570e8.24bb8a2a.js"},{"revision":"98e9884c6658d30ee88800f5db3f2d04","url":"assets/js/dc1b045f.064397c7.js"},{"revision":"e8e7df06957419b32fa7875fcf175539","url":"assets/js/dc348b66.9f4b616f.js"},{"revision":"3bcbf226f83cc226049b5a8d60475929","url":"assets/js/dcdaf62e.ce686120.js"},{"revision":"81eb5a1cc8c592c51e3591c544a906b2","url":"assets/js/de95ed8c.8ee70742.js"},{"revision":"5233f226400ac36974e36ae8d74e4cc6","url":"assets/js/decc28f6.7b6b5264.js"},{"revision":"9625f8cc06cf5d0f09598baf19af339b","url":"assets/js/df203c0f.f3ae6384.js"},{"revision":"8563db52a15f7ac540f993d94490d7df","url":"assets/js/e3b6b5cd.32766686.js"},{"revision":"b18a89a888a251d1448b3162d0dfc0a4","url":"assets/js/e6a29607.a8e73c69.js"},{"revision":"f0f1b608ad62a8eb0ba85c063641bf4c","url":"assets/js/e7bc8063.2c21ef1d.js"},{"revision":"08f78e6ea5bc21c97198655ca605cabe","url":"assets/js/ead54aa2.6b5c3d6c.js"},{"revision":"9caec9eea79cd2b2b11b04a16a72a812","url":"assets/js/eb2910ad.d51db802.js"},{"revision":"c7acfcb3041a18512d81f6a14f44c72d","url":"assets/js/ecea4178.af4275c0.js"},{"revision":"2bad7dfee329d4fad031e4de73c544fc","url":"assets/js/eeaaf8cd.165d24e6.js"},{"revision":"df082db56387a7a6af6d03046bee6b3f","url":"assets/js/f2bc055c.fcff0440.js"},{"revision":"c437dbd06302685344cca48bc7a75b1a","url":"assets/js/f3c2f67e.80985404.js"},{"revision":"52150fa46f335884f147b6c443d852fc","url":"assets/js/f4610fc2.91537c0b.js"},{"revision":"c23ada3befa511137e609837e17c2b19","url":"assets/js/fbab298c.17f1540d.js"},{"revision":"2d7cf3e7139b1935064a2d5cdc33f613","url":"assets/js/fbeb1638.cdc6b885.js"},{"revision":"09daa095a77718e3e0b3e4d50dd2bd0b","url":"assets/js/fbec5dcc.53617cc4.js"},{"revision":"f3bf9b36a5e969a1783757c32dc2488b","url":"assets/js/fc713ac2.cb3698d3.js"},{"revision":"fbdf9a726d90283832987f3256329d32","url":"assets/js/fca8a546.e7f639d1.js"},{"revision":"62254a209ad830826229d802c1a8f170","url":"assets/js/fde80389.9a115eb9.js"},{"revision":"809fe979d0151c6c6ace4fa7653cb4f1","url":"assets/js/fe3ec235.bbd9e799.js"},{"revision":"4ae6972d3b6f59b5683fe058242647ee","url":"assets/js/fe7bb564.3aac1d6c.js"},{"revision":"9e0925742201ef995adbe09c6ba737ad","url":"assets/js/main.acf34b21.js"},{"revision":"068c20b553672cc7b063b03294470ccd","url":"assets/js/runtime~main.eb99a723.js"},{"revision":"6ce6b0379fb7d986821486cd5d3cb72c","url":"demos/css/css_1px_dpr_explainer.html"},{"revision":"383792b2604ff14db0010b115f6873d8","url":"demos/css/font_dpr_visual.html"},{"revision":"eb9d1cd772299a4e77db835415443840","url":"devtools/author/css-vars.html"},{"revision":"33a29ef7b14901692dbc9a62b88d8554","url":"devtools/console/console.html"},{"revision":"80d457f109e091c094d8aa4f97648145","url":"devtools/debug-js/get-started.html"},{"revision":"f9641fc330ba4afb2f8d9eb723dd2857","url":"devtools/debug-js/get-started.js"},{"revision":"7fb703da7685b555022659387913be08","url":"devtools/element/element.html"},{"revision":"1e55ed914ca965440b647f6d1b6f5d89","url":"devtools/jank/app.js"},{"revision":"22e34133325cb0cd86beab40cf454089","url":"devtools/jank/index.html"},{"revision":"953f9a0fc5d2d106aa2b40a25d4d22bc","url":"devtools/jank/styles.css"},{"revision":"467cde0f97c600be26e136f2c0988e63","url":"devtools/network/features.json"},{"revision":"02211f8e1c8f91e7142f9ac7b0d95af7","url":"devtools/network/gs/main.css"},{"revision":"77dbb1b27129a858fa2ddf52bacc837e","url":"devtools/network/gs/main.js"},{"revision":"86bf8167f4fac8e00adbc845cea4c655","url":"devtools/network/gs/v1.html"},{"revision":"4c651bac78a0f09db3277163828fdc03","url":"devtools/network/gs/v2.html"},{"revision":"cb805c946b61035fa2adc0768e6a21be","url":"devtools/network/panels.json"},{"revision":"16f1838a980aa6010b506d3ed2e72401","url":"devtools/network/queue.html"},{"revision":"5ed1c7b7d1c0bb7025944fb49a95a60c","url":"devtools/perf/activitytabs.html"},{"revision":"6b709ab510c4c41d3e78774ef2b75a05","url":"devtools/perf/v1/content.css"},{"revision":"5ccf4e959796e2a162636bbef2daa6ef","url":"devtools/perf/v1/header.css"},{"revision":"69141d20a09dfe8083baf145405048e1","url":"devtools/perf/v1/index.html"},{"revision":"b843c4a62d95732ad64b5b8e5bb299de","url":"devtools/perf/v1/main.js"},{"revision":"e33f158d04a3ee98755e246bfafd7da6","url":"devtools/perf/v1/nav.css"},{"revision":"f6fb787f2970f48c5c5aadc9803f2d66","url":"devtools/perf/v1/v1.css"},{"revision":"4692edd9992e6b63df989a6824e4f48a","url":"devtools/perf/v2/index.html"},{"revision":"cff38f29bf6231324d66d60af667a7a3","url":"devtools/perf/v2/main.js"},{"revision":"f49141c35c9aca86fe796a89f2b731e7","url":"devtools/template.css"},{"revision":"58278eef7e95c4fe6daebb49fe598f91","url":"devtools/template.html"},{"revision":"c2f9eda8fd42055b1f1053d9d5806fe1","url":"devtools/template.js"},{"revision":"2d6b84c59dd5d718ce5ec3822279e25b","url":"devtools/whatsnew/m59/async.html"},{"revision":"8343c917513706285d9af9804e88a339","url":"devtools/whatsnew/m59/async.js"},{"revision":"1a1569dcf85ac4486b7633053650a3ed","url":"devtools/whatsnew/m62/cache.html"},{"revision":"cf3a24316df527c792936a64e6530633","url":"devtools/whatsnew/m62/queryobjects-iframe.html"},{"revision":"7b493572ae70cb58b954cc09ed2dafcd","url":"devtools/whatsnew/m62/queryobjects.html"},{"revision":"f567d5eacaca496c2a25c0b93e71110c","url":"devtools/whatsnew/m63/multiclient/app.js"},{"revision":"7ef0466e3ae1b9c4c94a8724478a6371","url":"devtools/whatsnew/m63/multiclient/index.html"},{"revision":"be5859d51a469189e61fe38907282ef0","url":"devtools/whatsnew/m63/push.html"},{"revision":"c2f9eda8fd42055b1f1053d9d5806fe1","url":"devtools/whatsnew/m63/push.js"},{"revision":"96371117b81091d0de514d7d15d5d3de","url":"devtools/whatsnew/m63/sync.html"},{"revision":"e76cb4f88c0778de9ae10df4e1f09f05","url":"devtools/whatsnew/m63/sync.js"},{"revision":"57bbe19ce516bb1556f6c40e8fdd2439","url":"docs/AI/AI 开发工作流总结/index.html"},{"revision":"1c73b85c59c131f0495bcc196345412a","url":"docs/AI/AI 生图和视频生成入门/index.html"},{"revision":"90939bf853d9e75a8db1cc620c393531","url":"docs/AI/AI绘图/index.html"},{"revision":"a883714508d113d92c16610589186bfd","url":"docs/AI/Boris Cherny分享：高质量 AI Coding 工作流总结/index.html"},{"revision":"4462d48bed0edb2dae709c7383293d0c","url":"docs/AI/Claude Code 与 Codex 命令速查/index.html"},{"revision":"21fb5881ead1e2a445660d58f36ed5b4","url":"docs/AI/copilot备忘录/index.html"},{"revision":"6fdc378d0c82a20116f11d6877409fdf","url":"docs/AI/GEO-生成式引擎优化入门/index.html"},{"revision":"93bd327bd36723601860876e3598fdd3","url":"docs/AI/Gpts提示词攻防/index.html"},{"revision":"6484b0b278c7f685a70a1546fd008f0a","url":"docs/AI/Skill管理-从重复复制到单一来源/index.html"},{"revision":"94c53255110bc9fbeaa0f4ed97e1dbd7","url":"docs/AI/不找配乐也能出片-TTS 驱动的手绘动画短片手把手教程/index.html"},{"revision":"aabb0ff57de8a75fb47aa96d9442b862","url":"docs/AI/为笔记添加插图工作流/index.html"},{"revision":"03ce2626f149733705fb992d72b24dc2","url":"docs/AI/全局AGENTS.md-统一所有项目的agent默认行为/index.html"},{"revision":"529349c982657f50f9237b71e7c36aa2","url":"docs/AI/把 Codex 当成会分工的工程代理/index.html"},{"revision":"1862d6cee73f894929afb1f8bd78d28f","url":"docs/AI/用 grill-with-docs 做好需求澄清/index.html"},{"revision":"cbe96b34362f117675c306d078d36eed","url":"docs/AI/用代码逐帧画一支 MV-PDoomVideo 全流程拆解/index.html"},{"revision":"dd6177c7ca63f983d356ae4e0386f8a5","url":"docs/AI/给 AI 编程加一套前端工程规范/index.html"},{"revision":"383ed1a3e34d5e064f3b186fe9db99ad","url":"docs/AI/自定义 Claude Code 状态栏：额度、context 与花费监控/index.html"},{"revision":"60abe7645b76821151d76f019a0fb15e","url":"docs/AI/解决Cursor没有Claude模型切换选项/index.html"},{"revision":"207c9eb63665ddbf95a49707de2c53a3","url":"docs/Flutter/flutter_native_splash启动页图片尺寸与规范/index.html"},{"revision":"1cc7e83a5e848c7dfcfcda61ff01318c","url":"docs/Flutter/flutterSdk升级降级/index.html"},{"revision":"dafe546ec14ba8e0310dd49e8961960a","url":"docs/Flutter/Flutter中的class/index.html"},{"revision":"fc1c39660d0f24c54762f6b808dc48fb","url":"docs/Flutter/flutter原生android插件aar资源引入问题/index.html"},{"revision":"e6cbde4c75a711d9f758d137fe99edc7","url":"docs/Flutter/flutter自动构建ipa/index.html"},{"revision":"0ae5a21e36109e39203fac6ba6790aa9","url":"docs/Flutter/flutter通过插件对接旷视原生sdk/index.html"},{"revision":"36a52e2167b33a568e613885aabc753c","url":"docs/Flutter/Future和Completer的区别/index.html"},{"revision":"b1f54a06eb66632c619e2f610b7bb07e","url":"docs/Flutter/getx/index.html"},{"revision":"38bda72940d0b3e31f32b0e58d4f1698","url":"docs/Flutter/GetX安卓schame唤起出现的GlobalKey错误/index.html"},{"revision":"d5379b998cf6611f38522dfa0d73e2d9","url":"docs/Flutter/一、常用基础控件/index.html"},{"revision":"bdf6e64c58d5d636adb1eeb2d24f6439","url":"docs/Flutter/七、数据共享/index.html"},{"revision":"10a9ffe7f98773db6abd9947eab83fb7","url":"docs/Flutter/三、常用布局控件/index.html"},{"revision":"e6497838bfeeb3be3ce0328be912ab7c","url":"docs/Flutter/九、事件机制/index.html"},{"revision":"6565656a3f19aa0812c44a406a88e33a","url":"docs/Flutter/二、布局控件原理及约束/index.html"},{"revision":"5d9cd5d4a93969c8bfa65fb8e668c4d2","url":"docs/Flutter/五、滚动组件/index.html"},{"revision":"2a2515c3d18da0f0242fdfa4f50830fb","url":"docs/Flutter/八、弹窗Alert/index.html"},{"revision":"3dbe0ee52fe9740f06676b172546fe5d","url":"docs/Flutter/六、常用滚动组件/index.html"},{"revision":"37fbabbc3dce264ce3ca3e834e0bd071","url":"docs/Flutter/分包构建buildNumber膨胀问题/index.html"},{"revision":"ba49a9a70418593abe03ac63750a6875","url":"docs/Flutter/十、接入原生插件/index.html"},{"revision":"b11c78afa72617d0a81ba702f450352c","url":"docs/Flutter/四、容器组件/index.html"},{"revision":"b018dd77c530fd23da600435ab991879","url":"docs/Flutter/安卓真机开启wifi调试/index.html"},{"revision":"3cc65bfe4b3409221e69e3532c2b45d9","url":"docs/Flutter/权限申请/index.html"},{"revision":"a4246bc65f4342e7aa40a529b75cfa3e","url":"docs/Flutter/知识碎片/index.html"},{"revision":"03e9ebb26ab013ebb5cd4f9d2e528b4d","url":"docs/Flutter/简单效果实现/index.html"},{"revision":"66f0d3c565b514dc55f1bd52cd3e9950","url":"docs/Flutter/运行项目报错/index.html"},{"revision":"8f15ce5bcd7d27a61bc69e4235fca240","url":"docs/Flutter/项目经验面试笔记/index.html"},{"revision":"f9c41aa04611002e913632352e0e6181","url":"docs/Flutter/风控字段收集/index.html"},{"revision":"d9038699178bc3922afbe2001de9fd65","url":"docs/index.html"},{"revision":"ac37a38b122b67b9d46f0062aa7e28dd","url":"docs/tags/css/index.html"},{"revision":"14b9c05cb493bdcad9313d4a3c5cc511","url":"docs/tags/git/index.html"},{"revision":"9b8f54c0cc47ad3a98bd026d5ba12cd0","url":"docs/tags/index.html"},{"revision":"36186c908b12d63d01beec6425329be4","url":"docs/tags/linux/index.html"},{"revision":"bde9104d48c511aef1c3b44afc7ae172","url":"docs/tags/markdown/index.html"},{"revision":"21439e8078e65d0e156811583985a22c","url":"docs/tags/responsive-design/index.html"},{"revision":"0b92964273d767e0282c84975e697b32","url":"docs/tags/tech/index.html"},{"revision":"1631d9d9176230008fe1d22a756e3743","url":"docs/tags/vue/index.html"},{"revision":"f66eb572632321d5e932453ea48a915a","url":"docs/tags/webpack/index.html"},{"revision":"efca8b587bc64772f6caffbfe07aa218","url":"docs/tags/开发工具/index.html"},{"revision":"347a1d0a8104d9379315885635b2ee45","url":"docs/tags/效率/index.html"},{"revision":"ef45104f974d51b63c4ea1033b1a24cb","url":"docs/前端开发/CSS/css-variable实战/index.html"},{"revision":"9335e727a59b25fc4e2505c8864a9943","url":"docs/前端开发/CSS/CSS像素、DPR与1px边框/index.html"},{"revision":"b5df84c73e3cff1a19bebd132b0d5582","url":"docs/前端开发/CSS/css卡券/index.html"},{"revision":"8e03ed69e5cb370ee068f9080452ebc5","url":"docs/前端开发/CSS/css文本截断换行/index.html"},{"revision":"19fe635c5dedb917e09844c54ecf3e51","url":"docs/前端开发/JavaScript/ES6 class 的 constructor 与 super/index.html"},{"revision":"37f2456a6ca6b69483e6ccc5eeed63e7","url":"docs/前端开发/JavaScript/for-in遍历对象属性的顺序与定义是否相同/index.html"},{"revision":"972f419cc17ab0e2b18ea19eb1d73471","url":"docs/前端开发/JavaScript/JavaScript中的柯里化/index.html"},{"revision":"4940acfcb065d880c169007e95c9d88a","url":"docs/前端开发/JavaScript/js-utils速查/index.html"},{"revision":"7e2f7d32567b170a2518af871cd18235","url":"docs/前端开发/JavaScript/从0开始手写一个promise/index.html"},{"revision":"ce5392d36cf5c6ac87e03069b695a5ea","url":"docs/前端开发/JavaScript/函数定义的5种方式/index.html"},{"revision":"03fca3801d507673b572b09dec01aada","url":"docs/前端开发/JavaScript/发布订阅模式/index.html"},{"revision":"972338544c1b8e771f42eb6d42ade4ba","url":"docs/前端开发/JavaScript/模块化/index.html"},{"revision":"8aac81973a3156eca769e23897592859","url":"docs/前端开发/JavaScript/模块化权衡原则/index.html"},{"revision":"61b4976e1ff82c873c59a265a65f6db6","url":"docs/前端开发/JavaScript/正则速查表/index.html"},{"revision":"93e99f09bc19b8b997183ceaddf7aa56","url":"docs/前端开发/前端框架/antdpro/index.html"},{"revision":"c1724f923dc6318562d446410adaf1e6","url":"docs/前端开发/前端框架/echarts地图绘制代码留用/index.html"},{"revision":"e816c82c045980a8b973a1b5a9bbbf4f","url":"docs/前端开发/前端框架/Next.js目录约束/index.html"},{"revision":"85c1d9d6d30d3a631af8104e6d585688","url":"docs/前端开发/前端框架/npmrc配置/index.html"},{"revision":"32541bbee09e4ee4308335219f5635f0","url":"docs/前端开发/前端框架/react相关/index.html"},{"revision":"a897c8d702b3ac2f68a1edbac68aceaf","url":"docs/前端开发/前端框架/unicloud/index.html"},{"revision":"0cda1b18e32c3054f55d14a66aaf2cf9","url":"docs/前端开发/前端框架/vue2-keepalive与page-alive页面缓存方案/index.html"},{"revision":"cc107ab66dc1d2306b79f0862e3b1440","url":"docs/前端开发/前端框架/vue2.6+插槽slot总结/index.html"},{"revision":"51e1b2ecb9f09c44b7667c507c0c14eb","url":"docs/前端开发/前端框架/vue2迁移vue3/index.html"},{"revision":"9e01d2d5bb8e6bf5ed4e44e7278a4e8f","url":"docs/前端开发/前端框架/vue中v-model和sync修饰符/index.html"},{"revision":"7e7be657cae506a9060a7536c8a30a4f","url":"docs/前端开发/前端框架/vue实现原理/index.html"},{"revision":"42231880bbe3ab143162c1ec7d65424b","url":"docs/前端开发/前端框架/vue生命周期/index.html"},{"revision":"9a0e49c06d4d9d1ebb814ebc2d4d01b9","url":"docs/前端开发/工程化/eslint针对文件忽略语法/index.html"},{"revision":"cf3a6f7f9af1ad09203e24963cb52f18","url":"docs/前端开发/工程化/gitpage+vuepress+jenkins静态博客/index.html"},{"revision":"d192c7fc0b20fdb9ea38fb38ffec2519","url":"docs/前端开发/工程化/lerna初体验/index.html"},{"revision":"76b853f9f9cd7bcf6b2a146864d3d687","url":"docs/前端开发/工程化/require.context/index.html"},{"revision":"03f91953513476a23e5ab5576bfe5bc0","url":"docs/前端开发/工程化/testcafe/index.html"},{"revision":"5cd35f52a4ed2e06cdc873b33f71567c","url":"docs/前端开发/工程化/vite/index.html"},{"revision":"693dea45541b80bed6afe921159c1567","url":"docs/前端开发/工程化/webpack-loader/index.html"},{"revision":"74626d34c3f685740a008a345145e436","url":"docs/前端开发/工程化/webpack-plugin/index.html"},{"revision":"fbeb948206937400ef4847ca2ce18fdc","url":"docs/前端开发/工程化/webpack5/index.html"},{"revision":"8470a711f9c3d62108a88bbe964f3d13","url":"docs/前端开发/工程化/webpack打包library/index.html"},{"revision":"1509b444e7d0b9f8c6a4a6154b90ffbd","url":"docs/前端开发/工程化/webpack构建分析/index.html"},{"revision":"180ed6c340bd8fe9a6f35a0b6dd9b517","url":"docs/前端开发/工程化/使用msw结合faker创建mock服务/index.html"},{"revision":"e57bb8749f0a403e26a7798adf832cbf","url":"docs/前端开发/工程化/前端性能优化/index.html"},{"revision":"6495af995a67af1dfd7a985fee1442a4","url":"docs/前端开发/工程化/前端自动化测试的一些思考/index.html"},{"revision":"f5559d4a4a1848da1a87cc6164ba6709","url":"docs/前端开发/工程化/基于webpack5+vue2搭建企业SSR应用/index.html"},{"revision":"e23e788cdc037d1be12e8e7eb504884e","url":"docs/前端开发/工程化/微信公众号前后端开发/index.html"},{"revision":"521c0574f2bfb7dae65f7c8a21d8abd5","url":"docs/前端开发/搞定typescript/声明文件/index.html"},{"revision":"60710ad746b286d6855102e075528448","url":"docs/前端开发/搞定typescript/工具类型之Exclude/index.html"},{"revision":"e8774fa7af6f6dbbbae01b787fbabf2a","url":"docs/前端开发/搞定typescript/工具类型之Extract/index.html"},{"revision":"2ccf21e28a4198023abee011bf455697","url":"docs/前端开发/搞定typescript/工具类型之NonNullable/index.html"},{"revision":"e3db5dd3af97bc76bb0f0a6d230166da","url":"docs/前端开发/搞定typescript/工具类型之Omit/index.html"},{"revision":"da0febf6a1adb35d64da7b0a6b3ec6ee","url":"docs/前端开发/搞定typescript/工具类型之Parameters/index.html"},{"revision":"85915af2bd69e839f5f51cc2227d67a4","url":"docs/前端开发/搞定typescript/工具类型之Partial/index.html"},{"revision":"c4f415f1dca0634cae542f6802b1fbd9","url":"docs/前端开发/搞定typescript/工具类型之Pick/index.html"},{"revision":"3814717a9c887f4689c8f691cf3213b2","url":"docs/前端开发/搞定typescript/工具类型之Readonly/index.html"},{"revision":"9c6227c78a238befc346f67bc74a483d","url":"docs/前端开发/搞定typescript/工具类型之Record/index.html"},{"revision":"f59bcd53f995a5557b9d6fde920ccb0b","url":"docs/前端开发/搞定typescript/工具类型之Required/index.html"},{"revision":"4f21f067fbf382ea03074013cade39e3","url":"docs/前端开发/搞定typescript/工具类型之ReturnType/index.html"},{"revision":"7f223d6be707e59f4ae8a74143f608f1","url":"docs/前端开发/搞定typescript/问题记录/index.html"},{"revision":"97bb51aea118a78172d01bbefbaba8f8","url":"docs/前端开发/攻略chrome控制台/index.html"},{"revision":"c614e3ce08778310fe66bd1894b2fec3","url":"docs/前端开发/面试/javascript基础/index.html"},{"revision":"1a04066c6ae6311457a26e5b388d039d","url":"docs/前端开发/面试/vue/index.html"},{"revision":"5ad461ebf4d3e8109ac29c6f084a1c1d","url":"docs/前端开发/面试/需复习/index.html"},{"revision":"76807c6367f96926669ae45b5189f4db","url":"docs/应用上架与生态/Android打包及签名配置/index.html"},{"revision":"9c1fdb76d113b539c590578eee2dd2c2","url":"docs/应用上架与生态/iOS4.3a被拒自审清单/index.html"},{"revision":"f6747d1cbff0bc9f678ae230c6ae2565","url":"docs/应用上架与生态/iOS企业开发者账号申请/index.html"},{"revision":"9a941546e1091e3fcdb29be4bb95e6ee","url":"docs/应用上架与生态/IOS本地证书创建及使用/index.html"},{"revision":"c39dadb39f839b214def8cda38e7dc69","url":"docs/应用上架与生态/ios项目构建/index.html"},{"revision":"2fecb1d28269b17078b45abcbcd48966","url":"docs/应用上架与生态/国内安卓应用市场上架指南/index.html"},{"revision":"12645b2187805cd039ce5bf8f00fe20b","url":"docs/应用上架与生态/开发者账号申请/index.html"},{"revision":"76790720d6d74d55b9f824b1c706983e","url":"docs/服务端基础/http/HTTP2常见问题/index.html"},{"revision":"a707dc299156e10dc971e62b74e7cd6e","url":"docs/服务端基础/http/http报文-概念状态码/index.html"},{"revision":"4f7d98260bdf5c7cc23896df890fb29f","url":"docs/服务端基础/http/http报文-首部/index.html"},{"revision":"84ee4314c9f71e1be234e7c589af21c3","url":"docs/服务端基础/http/web及网络基础/index.html"},{"revision":"df6ba6d2d0b6f1e917f088511f4bc74c","url":"docs/服务端基础/http/什么是https/index.html"},{"revision":"15e0b4f4ca9987db05e0ff46056e24c3","url":"docs/服务端基础/http/简单了解http协议/index.html"},{"revision":"9aa25079a894703cde94c0b6c39713af","url":"docs/服务端基础/shell/shell-echo&printf/index.html"},{"revision":"c164dea319865c04ba30641b88bf14c6","url":"docs/服务端基础/shell/shell-test验证/index.html"},{"revision":"2d3886c1aff6dd9dc0b2f17d770e4227","url":"docs/服务端基础/shell/shell-传递参数/index.html"},{"revision":"5c062460e58aec8d4276a1d98ad0de5f","url":"docs/服务端基础/shell/shell-函数/index.html"},{"revision":"36d4b288457c50c193da2c9ae088137f","url":"docs/服务端基础/shell/shell-基础/index.html"},{"revision":"9c11948e1f1ee92e0d90b0803c39732b","url":"docs/服务端基础/shell/shell-模块化/index.html"},{"revision":"51c5df402e1af088aa696dc9953e02d7","url":"docs/服务端基础/shell/shell-流程控制-if&for/index.html"},{"revision":"1c3501abbfa93d1dbacf2ec09ccd5254","url":"docs/服务端基础/shell/shell-疑问记录/index.html"},{"revision":"57430861c646cdda8a119b66da50247f","url":"docs/服务端基础/shell/shell-输入输出重定向/index.html"},{"revision":"1b6013af99d576fea8bb8d1071b84565","url":"docs/服务端基础/shell/shell-运算符/index.html"},{"revision":"4e1b0c115f9992e50800f019d386f37b","url":"docs/服务端基础/开发实践/curl/index.html"},{"revision":"f5480e685026291facb273d0b7bb0e94","url":"docs/服务端基础/开发实践/linux常用指令/index.html"},{"revision":"015d8d6d33ce30cd89151e7dec3be0be","url":"docs/服务端基础/开发实践/NestJS 路由装饰器原理/index.html"},{"revision":"bf6c53ab164e6f7af1ba0c34d5cbdc1a","url":"docs/服务端基础/开发实践/NestJS+uniapp项目业务与设计笔记/index.html"},{"revision":"0cec3296f4d625fa799ed461ed893b19","url":"docs/服务端基础/开发实践/nest学习笔记-mooc/index.html"},{"revision":"d386041cf7ba3d86c99357ff84172ba4","url":"docs/服务端基础/开发实践/nginx控制/index.html"},{"revision":"2150d3e04268d34b30913c066b926ee2","url":"docs/服务端基础/开发实践/PostgreSQL 核心概念与常用操作/index.html"},{"revision":"f066740b92398139d7f950b3d30a0c7d","url":"docs/服务端基础/开发实践/Prisma、Node.js 与数据库入门教程/index.html"},{"revision":"d69e6ad0415cdd37bf828552e1863d08","url":"docs/服务端基础/开发实践/SQL 语法入门/index.html"},{"revision":"bb9a1612810d1e5d702f8ea386fe7489","url":"docs/服务端基础/开发实践/后端扫盲/index.html"},{"revision":"858f661c3c42d81f17eee1369befe8cf","url":"docs/服务端基础/开发实践/备份-服务器ng/index.html"},{"revision":"6f74ee6509482a2845f0d8badf5a4797","url":"docs/服务端基础/开发实践/服务器带宽/index.html"},{"revision":"733e288c2d6011c1ac3889ac23dbe8d4","url":"docs/服务端基础/开发实践/编程思想/index.html"},{"revision":"d9e4ae4b8514d1abc2c91b60d4e0fb42","url":"docs/编程备忘录/Git/git tag常用操作/index.html"},{"revision":"3ac86986f81ef3dff97e8a0258454a79","url":"docs/编程备忘录/Git/git worktree与Codex/index.html"},{"revision":"73f2ec8c31c51d4da634bd4d7f34e02c","url":"docs/编程备忘录/Git/gitcherry-pick备忘/index.html"},{"revision":"c45974e07e4448470bcd9cb7949763e3","url":"docs/编程备忘录/Git/git删除已提交并推送的文件或文件夹/index.html"},{"revision":"0968a0105e1d5570d81d08b4058ea34e","url":"docs/编程备忘录/Git/git基本工作流程/index.html"},{"revision":"81983297cb417dc20dc8b297efdc2efd","url":"docs/编程备忘录/Git/git如何保持commit信息整洁/index.html"},{"revision":"0cae345a1b826a365822adf81d7050e7","url":"docs/编程备忘录/Git/git常用的分支操作/index.html"},{"revision":"ba7fec366e3d252897ab3574dc2549c4","url":"docs/编程备忘录/Git/rebase/index.html"},{"revision":"e30e2b4aea5f602a658736c45bafa0d8","url":"docs/编程备忘录/Git/配置多个git-ssh/index.html"},{"revision":"223567bc080f298bf16c959639d24f7b","url":"docs/编程备忘录/工具/clashverge内网域名绕过代理/index.html"},{"revision":"5219da244a1982ec4a1ef5a9f50f60bc","url":"docs/编程备忘录/工具/iterm2使用技巧/index.html"},{"revision":"3728ade3b3d008ed6375e863ffabe45f","url":"docs/编程备忘录/工具/markdown/index.html"},{"revision":"cbff47de9b8f410d92a35037b4ab5df2","url":"docs/编程备忘录/工具/Shell指令速查/index.html"},{"revision":"0c3848aaf7705e3123ac8efd00f851d5","url":"docs/编程备忘录/工具/vscode/index.html"},{"revision":"fef0e029cbb8600c018839dca216ba46","url":"docs/编程备忘录/工具/vscode主题色/index.html"},{"revision":"8c106d6efc82d2bc4ac0f32f4d69bfaf","url":"docs/编程备忘录/工具/使用jsdelivr作为图床/index.html"},{"revision":"46d6fea2a21a545ef4f3971e23e8b204","url":"docs/编程备忘录/快捷键/mac快捷键/index.html"},{"revision":"8e2e82ec4fa2ff62ef023eb501ee9f2e","url":"docs/编程备忘录/快捷键/ohmyzsh下的git-alias/index.html"},{"revision":"6809b3081a50972af8e72e64cfc53112","url":"docs/编程备忘录/快捷键/vimium自用速查/index.html"},{"revision":"6a47a2dbaa6595799b434bf66f9f9e19","url":"docs/编程备忘录/快捷键/windows快捷键/index.html"},{"revision":"897cb956a4c241aca8c879e8d4e3c29a","url":"docs/编程备忘录/快捷键/window超好用的终端配置/index.html"},{"revision":"0b0fa54802da228f7edc169042d8485d","url":"docs/编程备忘录/快捷键/提升命令行效率的Bash快捷键/index.html"},{"revision":"e5fec688333de044eb546af315841daa","url":"docs/编程备忘录/调试/chrome-devtools加载数据失败/index.html"},{"revision":"610ad97de420ca25b5fb708e58750272","url":"docs/编程备忘录/调试/Edge浏览器点击会有光标闪烁/index.html"},{"revision":"b2149d159038c24893a133be9ba8a5df","url":"docs/编程备忘录/调试/mac查看端口占用/index.html"},{"revision":"f157db78deec62ce1a3001f749cf9d89","url":"docs/编程备忘录/调试/微信xweb真机调试/index.html"},{"revision":"dd05993eb8757edfac8862da2ddfc8d7","url":"docs/编程备忘录/调试/本地远程宝塔创建的postgresql/index.html"},{"revision":"e9959e149cda8493757af91dd375fe88","url":"docs/编程备忘录/调试/访问ssl证书错误的网站/index.html"},{"revision":"fdd96f6825a059e317fdc171c635b674","url":"docs/面试知识/Flutter面试知识整理/index.html"},{"revision":"2c5b656776f10cae95cbaa30a5a5281d","url":"docs/面试知识/HTML-CSS面试知识整理/index.html"},{"revision":"ac8b4b125cc70ce520db57775a84c494","url":"docs/面试知识/JavaScript面试知识整理/index.html"},{"revision":"ce989b948686b4b2107eef816cb596a2","url":"docs/面试知识/Node.js面试知识整理/index.html"},{"revision":"d04fd1a26fa67edad146e29ab6d11ef3","url":"docs/面试知识/React面试知识整理/index.html"},{"revision":"f8c548a0be2b89b9fa8992200996582d","url":"docs/面试知识/Vite面试知识整理/index.html"},{"revision":"5fe4ef697b9d67dde02d53067368957c","url":"docs/面试知识/Vue2面试知识整理/index.html"},{"revision":"2cfe1ffdda45b864a66fedad187c89e4","url":"docs/面试知识/Vue3面试知识整理/index.html"},{"revision":"1ade789ab8c83cede7654e1b4c4b1642","url":"docs/面试知识/Webpack面试知识整理/index.html"},{"revision":"5c673ad22abd98c9e67d45beb1f4f89c","url":"docs/面试知识/微前端面试知识整理/index.html"},{"revision":"e3d6c40ea3eec8c8c62cc0a569b70630","url":"docs/面试知识/手写面试题/index.html"},{"revision":"50c4003827439831c14856262e0f7aff","url":"docs/面试知识/算法面试知识整理/index.html"},{"revision":"70cb8b9141c36b1b49d3179745bbf907","url":"feed.json"},{"revision":"29f5f57d27e359744517c0ece05011e1","url":"hold/index.html"},{"revision":"0dc894586c352825571c9fef7ea61431","url":"htmls/尾调用.html"},{"revision":"3974bc8f3e72158ceaa0c62dd8e6a4ea","url":"index.html"},{"revision":"85070590b3e2d48283ffaf26c0311fae","url":"life/game/游戏备忘/index.html"},{"revision":"9526d34312cd9c58bf9bee0b448ff1ee","url":"life/index.html"},{"revision":"966a13463188e96ce89aca7482db0605","url":"life/tags/index.html"},{"revision":"8370259bed16464001e81109a76fd317","url":"life/tags/switch/index.html"},{"revision":"b9b8e414250b0effea5340663d9085f8","url":"life/tags/游戏/index.html"},{"revision":"4c5e3be9ee8506a095f015741317a7af","url":"life/生活/filo87/index.html"},{"revision":"deaf0fc49c68aea4d8498c8c9d6e227f","url":"life/生活/Google Play商店更换国家/index.html"},{"revision":"56a8b973eb152895142d6c10a7f7abe4","url":"life/生活/Google登录多个账号后，移除指定账号/index.html"},{"revision":"a7f6b3beda81a4c3dd2e2e80135da228","url":"life/生活/surge备份/index.html"},{"revision":"6b695d1fb3b31764de0222959126a381","url":"life/生活/安卓tv远程装apk/index.html"},{"revision":"c182e29a1862f94f46a2f7568a5a818e","url":"life/生活/训练/index.html"},{"revision":"97c92b55c285267bbf42117d22353f16","url":"manifest.json"},{"revision":"96f2116c6614e88f1cef7d9cbe3876d5","url":"mvvm/compile.js"},{"revision":"dc70b350fc6d1264b4c9fec37e7b5fdc","url":"mvvm/index.html"},{"revision":"210c2d3487e155b2d194fb0923c889a4","url":"mvvm/mvvm copy.js"},{"revision":"128388465822eaa58e1ad5952886d77b","url":"mvvm/mvvm.js"},{"revision":"3d97f201725795a2833d87223a704101","url":"mvvm/watcher.js"},{"revision":"c492caf6ff69cde8ac16b3d0f889ac8a","url":"project/index.html"},{"revision":"62ecce340cca2a5914b2296186d8ada3","url":"search/index.html"},{"revision":"ee6782f2d24d5af72c7004ce569488d0","url":"website/index.html"},{"revision":"7775b459b43d2978825fec902d7f14e0","url":"弹性盒模型/1.html"},{"revision":"ff047b68b563deb17778d7f9ac11b1ad","url":"弹性盒模型/align-self.html"},{"revision":"4bc2e6fc882326f28e766bc10c827072","url":"弹性盒模型/alignitem.html"},{"revision":"b56cd96a159a9ebaa7dcac3fe924a276","url":"弹性盒模型/justify.html"},{"revision":"abfb18edb24ec5b393c5bab8d49a0ee3","url":"弹性盒模型/order.html"},{"revision":"230c93c63b4014f4c7a4630bb714d1de","url":"弹性盒模型/shrink.html"},{"revision":"db3ad47f8504e6f63c139c113e4baa39","url":"弹性盒模型/wrap.html"},{"revision":"0b73a7ac943dded87b8fb8dc9fe4f4fd","url":"弹性盒模型/固定底部.html"},{"revision":"335befd3f43495f51354b478224f2811","url":"弹性盒模型/圣杯.html"},{"revision":"f51c2fe800f235acbe4a4fb0813e857e","url":"弹性盒模型/左图右文.html"},{"revision":"7a37ee82c04d2f6a639336e6bd26eb3d","url":"弹性盒模型/流式布局.html"},{"revision":"aaa27e7e389fae0cb37f332892250235","url":"弹性盒模型/百分比.html"},{"revision":"5231176bc18dd6e18905abb68ffec848","url":"弹性盒模型/输入框.html"},{"revision":"d7a0624484efad96738b15bda8f01a2f","url":"assets/images/1-load-c7d8fbdaaf81e4ebc327ed40e5a77a45.png"},{"revision":"213d0a9e7905636a4fa174824ee7c17b","url":"assets/images/2+load-ddcb94e4ce1f758f8d7bbbb703f45e7f.png"},{"revision":"13a0ee7eb5d7d1cbd1177deb74f36afd","url":"assets/images/baowen-058c016d9db3db850518a2cef8f2f4f6.png"},{"revision":"6f714df0aa84ed93667f72489036a49e","url":"assets/images/chmod-9ae7dae5d20947aebacc5c50aa2edfd1.png"},{"revision":"c516e13ceeb91878abf1a7e6d6f749f5","url":"assets/images/gongkaimiyao-eea0a4fe4c01aee09e81a9685d614144.png"},{"revision":"bad32eddfb46fd6abe8e8291152f9190","url":"assets/images/google-play-add-new-payment-method-abd6e1691e0f1ec3a6d9f6f017d1ab1a.png"},{"revision":"2f21957ff1b098450d437df9ffe0a06e","url":"assets/images/google-play-bolivia-claude-pro-subscription-2abdc5e23108412bd735fdb22608cdcb.jpg"},{"revision":"c783b857cdfbc42cd818f07e267a303a","url":"assets/images/google-play-remove-old-payment-method-d507fab2850529b5cd8c8e8740a5a8bd.png"},{"revision":"33f8d488b222f2c3b66b4ca546861789","url":"assets/images/http-8a203942cc15a8da60315880f8dc88dd.png"},{"revision":"9387f1e0dbbfc7e67be6bcff4cdb4a84","url":"assets/images/httpsguopcheng-556aa1ad2c53cbe06ca2079a2ceeb3ca.png"},{"revision":"847321fec17b6d21316a7e34365935c4","url":"assets/images/httpsliucheng-82f576853a7d465743db44936a7af812.png"},{"revision":"efbf64c2161897efab0f2d481a1da3df","url":"assets/images/httpstongxin-2df1866432e23e8fbf0acbe441bf0e44.png"},{"revision":"803480f30f533ec99df6fe639998449f","url":"assets/images/huancun-63d9065b4f33aef0dff47d4fdb4a8efc.jpg"},{"revision":"b71e920671a84ef1fc65f82a11bda53a","url":"assets/images/hunhejiami-3380770b5afdd10335b893574579e23b.png"},{"revision":"92a38619cc4f1103490def55f7d4db58","url":"assets/images/iShot_2024-01-30_10.12.00-51eae9a29d440f8a3750bb58162bc4a6.gif"},{"revision":"99cfa004c14f1f7c966c6e43500dd0e7","url":"assets/images/iShot_2024-01-30_10.58.33-539ee09e321f1a317080e1fc5b3cfbf4.gif"},{"revision":"e8d921373c7f8c659fefe7a7907ece97","url":"assets/images/iTerm2 2026-09-07 11.58.34-c90cc5e4a931e25b8fe4486fd14ad6df.png"},{"revision":"8e509d184d8a8fba00b7d06d4c102571","url":"assets/images/Pasted image 20240129180308-dda0ec7928e5d24331ac98bec3e4f2a6.jpeg"},{"revision":"49c554c887703f9f8a73f0247c015c1d","url":"assets/images/Pasted image 20240130103455-a6c6f655f6faaea404776df26fd91f06.jpeg"},{"revision":"f25ba0568cfd3c86c4504d016d4442a2","url":"assets/images/Pasted image 20240130110803-80df9a89090f6fd6a93f4a7063444f09.jpeg"},{"revision":"c2af7e978b6c820109e6b0d455dbbdf7","url":"assets/images/Pasted image 20240130155245-2ed9fb68c79885da7911c4f996221df8.jpeg"},{"revision":"a0f10764f5bb541d8fa771eaa92f4517","url":"assets/images/Pasted image 20240130184757-ce29ada94b2b4c24e85e403884ef6cbd.jpeg"},{"revision":"f6174dd7a3fc58e21517fb7a6d0159de","url":"assets/images/Pasted image 20240130185004-782b26e6d9709f99da66f52dbd9a4bdf.jpeg"},{"revision":"3b3446704987a664e79a083d18eeb233","url":"assets/images/Pasted image 20240131114802-614a21eabad356883351bf7abb2707df.jpeg"},{"revision":"bc17f376f624c156bd5b149084aebfea","url":"assets/images/Pasted image 20240131150234-c65b3ab85d1a2b966d5edfacb22a90a3.jpeg"},{"revision":"0651b55c432550f5b19d71efe3206f67","url":"assets/images/Pasted image 20240131152432-b928dc46c7d0860d6f83ec2e14ebf69f.jpeg"},{"revision":"fb4b2100b5323dfc4c766c62018c339e","url":"assets/images/Pasted image 20240131153725-5eb353a734ff3335d673462f16eb689d.jpeg"},{"revision":"d7e7536a51e5d2a67587fe9c1ae267a3","url":"assets/images/Pasted image 20240131154032-442e73a53bc114955c952d539447b1f3.jpeg"},{"revision":"3d55a9fa83c77d11ef289094b3bd4d5e","url":"assets/images/Pasted image 20240131160412-ed53cd6e2a59d70c014c80bcc9c480f2.jpeg"},{"revision":"c495eda5c3354f5fe4a9f0dbdd2f47e9","url":"assets/images/Pasted image 20240131161030-b6fb0034eccdb53de2e4f52c5927dd3d.jpeg"},{"revision":"8ef01117d916e9219341873a403ace0c","url":"assets/images/Pasted image 20240131162807-75cf5a418e893738bf04f2cdb2339469.jpeg"},{"revision":"364fa0b0838bcb4c6db8be039a70506d","url":"assets/images/Pasted image 20240131164907-a72df6b7a1dca78c19c61181da72f324.jpeg"},{"revision":"62d79e0178fcb1c585e235d183e05ab8","url":"assets/images/Pasted image 20240131171734-bf224f343f37cc1a83f8b2ad1b647d08.jpeg"},{"revision":"0c3eaef4c112e1b7af3be1be7379abe9","url":"assets/images/Pasted image 20240131175558-a983f5155ce54aa7ab03226ae7ddf497.jpeg"},{"revision":"087f77cbbbb8f96e9b4ee8cf25ead104","url":"assets/images/Pasted image 20240201105815-5436c91dab06e690ec34be01e391c754.jpeg"},{"revision":"5533b04d4078cd53ecb5189861c22df5","url":"assets/images/Pasted image 20240201114031-6d087ad7299cbe3b927cd3e58f9c15f2.png"},{"revision":"4532b57939fb880ae91c7560b98dfe05","url":"assets/images/Pasted image 20240201123112-bb24c686291822cc942e3a2b4b52172f.png"},{"revision":"bfff793a5b3c343741c2bdcd88d331ed","url":"assets/images/Pasted image 20240201180558-bc44a7b1a3a1e328fcad5fc4858af2f0.png"},{"revision":"6bdbc56d3a418c93742075f02856e296","url":"assets/images/Pasted image 20240201180753-d5bc332251f52b5dccce63e7dd44b812.png"},{"revision":"59bc7a70b2943c93403bf042831ad236","url":"assets/images/Pasted image 20240201184011-74c16105658495f5d3920f906cfe14e6.png"},{"revision":"a3c0054636e0644dc5b150ef4e7e1893","url":"assets/images/Pasted image 20240201185856-d2e1d25edaef59a9ddde2f3c6f2df715.png"},{"revision":"4f045790b08d319a70f77bfb7b43ae24","url":"assets/images/Pasted image 20240201191447-ee91fa057a76e3f9c124681000e33169.png"},{"revision":"bf8549836299756723b843155f868108","url":"assets/images/Pasted image 20240201222630-b0386c7ea16e5fbbe08df58c161f0af2.png"},{"revision":"d587307cf0ac4eb5fc3ce0f634ad159b","url":"assets/images/Pasted image 20240201224948-c09e5fd74ad3de23b24d60c78630a74e.png"},{"revision":"d12859b176df671322be92f81618c5b5","url":"assets/images/Pasted image 20240201225130-98daf99738182fb059838376bf6cd16d.png"},{"revision":"20a6b507e71ee9a45e5c82323d0c947a","url":"assets/images/Pasted image 20240201232635-4b06930f9f938adefd82dd71bbdec4d5.png"},{"revision":"9127c565975bce548f969ebe6d8bc031","url":"assets/images/Pasted image 20240202113929-be57273c52b4be93e292ee60d8d5b711.png"},{"revision":"22d82c31b9cee609c9b43c76f04e2cb1","url":"assets/images/Pasted image 20240202141515-19a6227452401a6ac5cc849d679ea1bd.png"},{"revision":"850fc2b4521b50108bfb8b85dd121c3e","url":"assets/images/Pasted image 20240202143440-2089e610a43a2b7a0880d1c6783b773a.png"},{"revision":"91c09dccfdfb34ef051a0d2b5e85411a","url":"assets/images/Pasted image 20240202144550-883d5c6d61a08813f1641f235830e36c.png"},{"revision":"93c6deb673a1f6b0199245e5d84a39a7","url":"assets/images/Pasted image 20240202144821-775f860d2d0898f3c53be50527a94015.png"},{"revision":"b4c33e9400742cf4ce4832b551ec6dee","url":"assets/images/Pasted image 20240202150654-009a6ae61c6b383838a992a4008b86e5.png"},{"revision":"d211e1610f8cce7576194b0bbce75198","url":"assets/images/Pasted image 20240202164647-7316cd36b6fa5633e3d9510d3f3d69a0.png"},{"revision":"27407b269446376a2f4f78d51965599b","url":"assets/images/Pasted image 20240202172916-c4dbbc45be631068a6c56e2c976efea4.png"},{"revision":"6b0b35bb531dff9b3dff0223a8997d36","url":"assets/images/Pasted image 20240219112345-7f10dcf1885a23e06a875fa7b3126849.png"},{"revision":"3af5e9c87b98c0e2d02a90bf0bd95ade","url":"assets/images/Pasted image 20240221110012-67e89aa8438bfab13c9fcfdf54d6597e.png"},{"revision":"e2e703f8456135cdd369078fbb9dfb50","url":"assets/images/Pasted image 20240221111143-f33740bc0fee838a2b8e3046b790d53a.png"},{"revision":"f26d776dca4d4254678e9fa177036b84","url":"assets/images/Pasted image 20240222105609-551b376e42221873fa929efcc542413e.png"},{"revision":"bea93dea4bed21b8a5ab13ad7417697e","url":"assets/images/Pasted image 20240222105654-6d95407f20add91ac1319f8f8e49b0bb.png"},{"revision":"403d3d7b8325fac46c6bb903af18439f","url":"assets/images/Pasted image 20240222105710-ad884582feb7055aaf144b2ab3ea1bba.png"},{"revision":"f6986de728283699a1a470385263d4e8","url":"assets/images/Pasted image 20240227153315-e648c86d52d8cacf89523020eef3bd6f.png"},{"revision":"f1629c2fbbc33f46c6d496117a18af5a","url":"assets/images/Pasted image 20240227153400-47ac6249dae4d9e3c4e70223ce0b061f.png"},{"revision":"bcb3948c3eeb15cdfbfac5f99833e42f","url":"assets/images/Pasted image 20240428181858-66633701082df80d1ea85438950fdd21.png"},{"revision":"8b29d8966cf85e99412764c9970a7b0f","url":"assets/images/Pasted image 20240428181951-2792af0219ef3e396754d7fdd12ff2cb.png"},{"revision":"5d6f6ddc26fe54fbcdab825eef1d96d2","url":"assets/images/Pasted image 20240428183103-1c8b957ba022160363e0e6b5ef3d9c2f.png"},{"revision":"6f457c695694cc865e7a7cd595a4627e","url":"assets/images/Pasted image 20240428184809-bc0c06676403c41dbcc54b395fb90484.png"},{"revision":"bec406f01c9338bbd5edd9256b860b2a","url":"assets/images/Pasted image 20240428193348-1e1b093afda12a3d3360e9b382efb274.png"},{"revision":"509a7be5776ac84b144770def0cd7108","url":"assets/images/Pasted image 20240718102453-5ffe0cf208ef45969c9ed31a0c7f46c1.png"},{"revision":"4af868a650fbd4bd8148c6ee68813c86","url":"assets/images/Pasted image 20240718104654-54723f940cdc4eb7cebfac29438d45a0.png"},{"revision":"259d1726cbfffbeffe24ff9d391462ec","url":"assets/images/Pasted image 20240718104858-a3f9d6b74dc55130e91b4ec3e4232e4f.png"},{"revision":"188cab96aefcc44d0dc338b9f198a0b1","url":"assets/images/Pasted image 20240718143629-4f0b71fc5802c984bc6a0f62dc16e656.png"},{"revision":"f3ffbf78392139198a183f5b772aabf2","url":"assets/images/Pasted image 20240718144504-0307bbed3333d20df03734071067ba25.png"},{"revision":"72a4642dcb926193c4793a44b558a8a8","url":"assets/images/Pasted image 20240718144727-234203191e9920411d42b2d3aa5371cc.png"},{"revision":"ead0a3a0b4c98a6df84e661c7d898dd1","url":"assets/images/Pasted image 20240718145116-fd85682e74d71614c74e99827b254f47.png"},{"revision":"a6954f40d77fc1f1f515aabfe3ef757f","url":"assets/images/Pasted image 20240801141923-f415391a996aca3c45ca2e2fa2358893.png"},{"revision":"710e61d9e8bf4d40ee63e93e7d4fa563","url":"assets/images/Pasted image 20240801144412-e20ff43bc9eb5822752eda5f1367bde5.png"},{"revision":"addd5e32fecf1144a1c4bfe8aa03a3b4","url":"assets/images/Pasted image 20240801144502-1ed73f01392e917473da0dc971430a77.png"},{"revision":"f7bdb9f33401ceafba0155e50072fc96","url":"assets/images/Pasted image 20240801144817-1d4e15b8d887f1a13aa7e41f91df7a98.png"},{"revision":"9f1d7426603ff3be3246a05eeffa53f3","url":"assets/images/Pasted image 20240801150053-6e084ee14077b38ef78761319319da99.png"},{"revision":"a9da2c067c0eb5e9525d2a814eb4a615","url":"assets/images/Pasted image 20240801150156-88b3d0cc98daf31cb936338689f5176a.png"},{"revision":"307a5c4394871dac9f37d278a47fe222","url":"assets/images/Pasted image 20240801150329-8650df1ccf8c0364b62f06e234fe6de1.png"},{"revision":"4df0ed572b2430d3504caede8881257b","url":"assets/images/Pasted image 20240801151047-b71bae29538419ef3ced55638b767040.png"},{"revision":"7f97e6d9b9f6a0f56b322f05a551e003","url":"assets/images/Pasted image 20240801152147-a16f947c9e3ae6442ef1058d4736e70f.png"},{"revision":"ed8bf6a75f58cfc1255b29ae58b8178d","url":"assets/images/Pasted image 20240801152355-c29c785597f616ba08b43706048d43c9.png"},{"revision":"a9f4ba344e7cf69baf11d253d9b908c5","url":"assets/images/Pasted image 20240925155737-c29ea011050eecda68a351885494d512.png"},{"revision":"7ba10c395d25637f42b1462c5f023f82","url":"assets/images/Pasted image 20240925161610-6da29316c4246d32cc6315555699c9f4.png"},{"revision":"3b99f58bef6aeb91eb8640c14f90c2e7","url":"assets/images/Pasted image 20250410152257-082869f71004d616a43df93d8e2aa38c.png"},{"revision":"1448b05d2cc78d2680cee297656a0947","url":"assets/images/Pasted image 20250410153008-fb7eaf0862fc7984832e57ff64328a28.png"},{"revision":"dd6b30319c2ee68347da40a4257062b4","url":"assets/images/Pasted image 20250410153247-f539d86936626d1aa3b979d169ecb05e.png"},{"revision":"b82f5290c14b4a4d94b3f4aed6296360","url":"assets/images/Pasted image 20250410153638-ef915de71dac3b9625822a446c6c14ff.png"},{"revision":"9595873f9f8bf49736064a5e71b4127c","url":"assets/images/Pasted image 20250410154810-96ef378a581f3585d3d2c6cebae838d8.png"},{"revision":"20fa5c20db991da970da5ed7c95d3f67","url":"assets/images/Pasted image 20250414111720-de2f68f1866dc7e41d25fd117a55978d.png"},{"revision":"232bcc24bc48d293ba3091e9a14dfafe","url":"assets/images/Pasted image 20250414111750-7278c60398205d835e485186211768ed.png"},{"revision":"47df7600cfa2e28c94ff0c5a6c397ccb","url":"assets/images/Pasted image 20250415141921-3bbc73087c5c8474fa4433862e18fa32.png"},{"revision":"451e5d55bc3aef807ac7b3d2ab9694f9","url":"assets/images/Pasted image 20250415142551-a0c7e6037b72738add91b323f84ad89d.png"},{"revision":"b9844a5d37611ab1779656e788fb785f","url":"assets/images/Pasted image 20250415145810-bc7dcc71ffd106282cb6500e4ce7c691.png"},{"revision":"6897c739c31f0413b32ffbf18398a848","url":"assets/images/Pasted image 20250415145822-7629ef7656cf3bb8afaecf8be6ed1e4f.png"},{"revision":"6f3914221730a0a8dcc93b1d8b5558e8","url":"assets/images/Pasted image 20250415150304-5b33abbe5425b0b4be62c4a1a8dd2ac2.png"},{"revision":"3384b7272a280d01791d09626d411741","url":"assets/images/Pasted image 20250415152336-e369f6dd0058861856c85396c555bd88.png"},{"revision":"f5c4dd9548217cd5eb25027297e4deb5","url":"assets/images/Pasted image 20250415153123-e3441c50df7f81596ba5f013cdb1128d.png"},{"revision":"d11c5284d38261cfaf465c1c819fe036","url":"assets/images/Pasted image 20250415153250-a25ab9c8c361b800a6749fe1ee92fd52.png"},{"revision":"86fe25e1ccf18d3ec11bf0d468915b2d","url":"assets/images/Pasted image 20250715101717-f9bc1ea3023044987e86b17feb7208d0.png"},{"revision":"59c8e9a7c38deb4845adb56693a09c4f","url":"assets/images/Pasted image 20250715105446-e042aed4cde76053d058fd3e5b2ee48f.png"},{"revision":"1d72b69b5e3f95f4f5048e83b2e0656d","url":"assets/images/Pasted image 20250715114722-76929d62ca4fc4032883a95822ff39ee.png"},{"revision":"0078a99277524668190f971766a3f9d3","url":"assets/images/Pasted image 20250715182816-ceddf5c5721623dbc48b07c2f49246b3.png"},{"revision":"5b318da88eb7379891d776659787411d","url":"assets/images/Pasted image 20250716145257-eae5fbfc3f8e0852bcfa76f221e61df1.png"},{"revision":"a3abc9160674ad5a0f04f9b8a71854d5","url":"assets/images/Pasted image 20250716151101-e99b0f05574b23eb919dcf45d5d84cc8.png"},{"revision":"f121e7a75ff86ba5c4d519ff232c8be7","url":"assets/images/Pasted image 20250716151512-8b424d18a30f8d03a961d912df92aadb.png"},{"revision":"cab38491ebb14600ceb3755b798aa80d","url":"assets/images/Pasted image 20250716151800-e96a8d4ab03a31a5e6a25f399310562d.png"},{"revision":"7f4ede4bdd14ba6333080350d29a5161","url":"assets/images/Pasted image 20250716154355-9fc362c4b332cb87602972687ccf89e6.png"},{"revision":"4a024796de4051cb1d4ec8236d7e1860","url":"assets/images/Pasted image 20250717211500-f16ab2b357539c9585b201db91aefc02.png"},{"revision":"128d63c3e95701b8a7a19d607ac07c22","url":"assets/images/Pasted image 20250806103640-0e9c8f3f882318e8e33f7f784dabcf3f.png"},{"revision":"b6536b8165ea560777531b7490173524","url":"assets/images/Pasted image 20250806103711-d122b07e72f6e08a4d503db74f04a59a.png"},{"revision":"6eb87d49ff65f8df5e5ea272e71b5b70","url":"assets/images/Pasted image 20250806103837-dbd14e124fb69cdf1e30346f4cb8f21d.png"},{"revision":"171712bb3f12e1e41e903370cb8c3297","url":"assets/images/Pasted image 20250812104240-4f502367b688ce48de74f79ec95285dc.png"},{"revision":"134bbe337bf0c04529a4e77ca53afcfc","url":"assets/images/Pasted image 20260410102727-0930c013ffd425912349ca8dc417aa77.png"},{"revision":"c51dae4db693dec52ccef6b6fbbf9529","url":"assets/images/Pasted image 20260410102755-ba18541c7746b98017537cb10fd6e890.png"},{"revision":"d422e72d2c443d53c3b41af389a836c4","url":"assets/images/Pasted image 20260410112109-0a4c3bdf2491c36ba82457d4102bd8db.png"},{"revision":"c2d6d146ee716e55084d7d473c10c7c7","url":"assets/images/Pasted image 20260410172340-8dd67f2db93417be9abf25ffd7e9e4ff.png"},{"revision":"9d0c655812387541ff29565fff9c9342","url":"assets/images/Pasted image 20260410172414-ebf610ee72ea19d6edc6537191097035.png"},{"revision":"2c3fb1ab4b954deda8ec077ffcdab321","url":"assets/images/Pasted image 20260410172523-e1e2c6acd46d090f02cac01960c23597.png"},{"revision":"3ebbcb52e74a0e429d4cf6344f12f386","url":"assets/images/Pasted image 20260410172905-979a487301a453d7cdca12d998b6220c.png"},{"revision":"35fa6f584a3a9532e171b7d72c96bdb8","url":"assets/images/Pasted image 20260410173515-a0bb5ba6240389cb3783523c40c3068d.png"},{"revision":"18b83ba7d6f6e2dfe73ed336cd6787e3","url":"assets/images/Pasted image 20260410181208-26c4d1df714ebb1b86e78aac51ae4a59.png"},{"revision":"a43124598b6fe633d7f0ba0441ffe74a","url":"assets/images/Pasted image 20260410185148-e54de8b378e81a4d7a6554e2d1efc381.png"},{"revision":"44fab455799035fccffbb387aa59986e","url":"assets/images/Pasted image 20260414104932-2a7cbc5449559e27c5ea5ebfbe2d0a3f.png"},{"revision":"c51fae48b4e23e01ab6479d09688fd26","url":"assets/images/Pasted image 20260414105100-6b769db1c7b8da12f620a30b57a01880.png"},{"revision":"5ec9b164d86c7b9d1cceb996804e33e9","url":"assets/images/Pasted image 20260414105209-c183d6a639371be2487e46c174ccb282.png"},{"revision":"bccfa8a153a75d6cc9548456044b8cce","url":"assets/images/Pasted image 20260414105311-032954a24e759c6b79bbc9bb975da287.png"},{"revision":"84ad0df29cfc4866ffeef202547a5528","url":"assets/images/Pasted image 20260414105320-c71f04623af9b10b2692efe282eed255.png"},{"revision":"9cef55e061f79b140ff84badae33504e","url":"assets/images/Pasted image 20260414105343-1bc690457699e02cdaa3cbdf05725262.png"},{"revision":"799e3204f44f8b01a4b903c44d227470","url":"assets/images/Pasted image 20260709154255-5c3566a68c5a09f60a6dbbd4cadea8f8.png"},{"revision":"5e58da58dbc90cfa87d1268cb2ce3439","url":"assets/images/Pasted image 20260714215433-9e78c4fd22d3c1fba68aa36a386ed4f6.png"},{"revision":"afba92fba2c971e9ba482bbca9a3142d","url":"assets/images/Pasted image 20260714215810-b378a23f1599bc867f186bdd914a301a.png"},{"revision":"782db07a1c104749390378539fc0ac3e","url":"assets/images/Pasted image 20260714215844-1568e3c71abb94015c2673a87e68c6ab.png"},{"revision":"3245504dbcb1d70d6ef616f75ee43712","url":"assets/images/Pasted image 20260714215931-669285be18d219ae10e8de6f1953274e.png"},{"revision":"f98ad3e826dda952882880a348b05e4a","url":"assets/images/Pasted image 20260714220055-06bb35e0e3cd8727b5c6c0c36d09f615.png"},{"revision":"fd8a9c4971652cf18aa516db64dc80a7","url":"assets/images/Pasted image 20260901111506-aa6e95627bee788bb53974d31b053165.png"},{"revision":"25773f2e0fcf26d18f382c6e6da5e139","url":"assets/images/Pasted image 20260910104615-8f476e82df9c7642494537d3983b5e26.png"},{"revision":"fc14f8e784b7aefc05f54662b8a31263","url":"assets/images/Pasted image 20260914151347-614ae6309eec5ac13c0c9d0443ad91b8.png"},{"revision":"14a213e98c865858850315de96e50620","url":"assets/images/Pasted image 20260926143940-a599ca4f3bb9d311430b8a9c375712de.png"},{"revision":"bae535e16ed7ea2253e5a0532f175ad4","url":"assets/images/tcpip-d75c3b5fc6403ea5be93069d8466420a.png"},{"revision":"2891d7c97f17353cf3dab3b6caa97cf4","url":"assets/images/vue-2-7c479e2dbc4892e7692e9545bba0ba93.png"},{"revision":"5254804e2d00c02b4758d8f3d64f00b6","url":"assets/images/vue-lifecycle-1a5722657e1a091efe12853cbfdec74e.png"},{"revision":"d79f56aa1e059cea8a591c018ca6c5bd","url":"assets/images/vue-render2-b979d53fa101c17d7fe878612be0bcb2.png"},{"revision":"dace3497305ebfc1aa4dc1f3d0ae6903","url":"assets/images/yahoo-bac2208c750f3db54882b44a4be647fe.jpg"},{"revision":"89c129bd9849b767bc85f790ffbdafd7","url":"assets/images/zhibiao-6fc11fac62ca1fbaf47058893eca335c.jpg"},{"revision":"8595e990160d5025a785ceb2a4d2de6c","url":"devtools/favicon-96x96.png"},{"revision":"9ea23273f6746b2acbf634e4b45ef465","url":"devtools/network/gs/logo-1024px.png"},{"revision":"273f013703dea5e78db580350eb9452a","url":"devtools/network/gs/logo.svg"},{"revision":"08b1f8a276ad0881a7a1c89a8a23c5b2","url":"docs/AI/agent-e2e-validation.svg"},{"revision":"16be885b44763fb6a23218675f301f3d","url":"docs/AI/ai-development-workflow.svg"},{"revision":"8465280deb6c84009c6eff9b128ee265","url":"docs/aiRender/应用上架与生态/developer-account-payment-flow.png"},{"revision":"9f416027d6b64ca17c144d2276e02871","url":"docs/aiRender/应用上架与生态/developer-account-platform-compare.png"},{"revision":"bad32eddfb46fd6abe8e8291152f9190","url":"docs/google-play-add-new-payment-method.png"},{"revision":"2f21957ff1b098450d437df9ffe0a06e","url":"docs/google-play-bolivia-claude-pro-subscription.jpg"},{"revision":"c783b857cdfbc42cd818f07e267a303a","url":"docs/google-play-remove-old-payment-method.png"},{"revision":"92a38619cc4f1103490def55f7d4db58","url":"docs/iShot_2024-01-30_10.12.00.gif"},{"revision":"99cfa004c14f1f7c966c6e43500dd0e7","url":"docs/iShot_2024-01-30_10.58.33.gif"},{"revision":"e8d921373c7f8c659fefe7a7907ece97","url":"docs/iTerm2 2026-09-07 11.58.34.png"},{"revision":"abb33fe8e1220370ea51af8aa556b7a4","url":"docs/Pasted image 20240129180048.jpeg"},{"revision":"8e509d184d8a8fba00b7d06d4c102571","url":"docs/Pasted image 20240129180308.jpeg"},{"revision":"37b7ed11c9c0460daa42cadfc18ae000","url":"docs/Pasted image 20240130100336.jpeg"},{"revision":"b1648e5dc73347b0ff862da6c59c5ede","url":"docs/Pasted image 20240130101705.jpeg"},{"revision":"b1648e5dc73347b0ff862da6c59c5ede","url":"docs/Pasted image 20240130101730.jpeg"},{"revision":"99acd5a196e8d4533389bb2041f68f3e","url":"docs/Pasted image 20240130102025.jpeg"},{"revision":"3c25839beb0743f2e95a6d6e1fb6b4d0","url":"docs/Pasted image 20240130102229.jpeg"},{"revision":"49c554c887703f9f8a73f0247c015c1d","url":"docs/Pasted image 20240130103455.jpeg"},{"revision":"060d6007e8933672c627ffb005a9dd4f","url":"docs/Pasted image 20240130110105.jpeg"},{"revision":"f25ba0568cfd3c86c4504d016d4442a2","url":"docs/Pasted image 20240130110803.jpeg"},{"revision":"15e630712c8aaa15c3adf1ecbe8d375c","url":"docs/Pasted image 20240130112928.jpeg"},{"revision":"c2af7e978b6c820109e6b0d455dbbdf7","url":"docs/Pasted image 20240130155245.jpeg"},{"revision":"9bd363ef3041b853d317074de37e1274","url":"docs/Pasted image 20240130182655.jpeg"},{"revision":"e42293050fc3a2618015db17da415bf5","url":"docs/Pasted image 20240130183457.jpeg"},{"revision":"a0f10764f5bb541d8fa771eaa92f4517","url":"docs/Pasted image 20240130184757.jpeg"},{"revision":"f6174dd7a3fc58e21517fb7a6d0159de","url":"docs/Pasted image 20240130185004.jpeg"},{"revision":"3b3446704987a664e79a083d18eeb233","url":"docs/Pasted image 20240131114802.jpeg"},{"revision":"bc17f376f624c156bd5b149084aebfea","url":"docs/Pasted image 20240131150234.jpeg"},{"revision":"0651b55c432550f5b19d71efe3206f67","url":"docs/Pasted image 20240131152432.jpeg"},{"revision":"fb4b2100b5323dfc4c766c62018c339e","url":"docs/Pasted image 20240131153725.jpeg"},{"revision":"afd92e9e3d0958fa4496e2f25e51d44e","url":"docs/Pasted image 20240131153813.png"},{"revision":"d7e7536a51e5d2a67587fe9c1ae267a3","url":"docs/Pasted image 20240131154032.jpeg"},{"revision":"3d55a9fa83c77d11ef289094b3bd4d5e","url":"docs/Pasted image 20240131160412.jpeg"},{"revision":"c495eda5c3354f5fe4a9f0dbdd2f47e9","url":"docs/Pasted image 20240131161030.jpeg"},{"revision":"8ef01117d916e9219341873a403ace0c","url":"docs/Pasted image 20240131162807.jpeg"},{"revision":"364fa0b0838bcb4c6db8be039a70506d","url":"docs/Pasted image 20240131164907.jpeg"},{"revision":"62d79e0178fcb1c585e235d183e05ab8","url":"docs/Pasted image 20240131171734.jpeg"},{"revision":"9d51c10333ff1f6c1c727604c279dcd5","url":"docs/Pasted image 20240131173135.jpeg"},{"revision":"2b60e810888aa0964ea6c53ac1321c81","url":"docs/Pasted image 20240131175555.png"},{"revision":"0c3eaef4c112e1b7af3be1be7379abe9","url":"docs/Pasted image 20240131175558.jpeg"},{"revision":"b39f552f9c24909b4fea10e01afb3618","url":"docs/Pasted image 20240131180041.jpeg"},{"revision":"087f77cbbbb8f96e9b4ee8cf25ead104","url":"docs/Pasted image 20240201105815.jpeg"},{"revision":"5533b04d4078cd53ecb5189861c22df5","url":"docs/Pasted image 20240201114031.png"},{"revision":"4532b57939fb880ae91c7560b98dfe05","url":"docs/Pasted image 20240201123112.png"},{"revision":"bfff793a5b3c343741c2bdcd88d331ed","url":"docs/Pasted image 20240201180558.png"},{"revision":"6bdbc56d3a418c93742075f02856e296","url":"docs/Pasted image 20240201180753.png"},{"revision":"59bc7a70b2943c93403bf042831ad236","url":"docs/Pasted image 20240201184011.png"},{"revision":"a3c0054636e0644dc5b150ef4e7e1893","url":"docs/Pasted image 20240201185856.png"},{"revision":"4f045790b08d319a70f77bfb7b43ae24","url":"docs/Pasted image 20240201191447.png"},{"revision":"c0b9a60c4e345f82f773d70fd350da63","url":"docs/Pasted image 20240201215929.png"},{"revision":"bf8549836299756723b843155f868108","url":"docs/Pasted image 20240201222630.png"},{"revision":"d587307cf0ac4eb5fc3ce0f634ad159b","url":"docs/Pasted image 20240201224948.png"},{"revision":"d12859b176df671322be92f81618c5b5","url":"docs/Pasted image 20240201225130.png"},{"revision":"20a6b507e71ee9a45e5c82323d0c947a","url":"docs/Pasted image 20240201232635.png"},{"revision":"9127c565975bce548f969ebe6d8bc031","url":"docs/Pasted image 20240202113929.png"},{"revision":"22d82c31b9cee609c9b43c76f04e2cb1","url":"docs/Pasted image 20240202141515.png"},{"revision":"850fc2b4521b50108bfb8b85dd121c3e","url":"docs/Pasted image 20240202143440.png"},{"revision":"91c09dccfdfb34ef051a0d2b5e85411a","url":"docs/Pasted image 20240202144550.png"},{"revision":"93c6deb673a1f6b0199245e5d84a39a7","url":"docs/Pasted image 20240202144821.png"},{"revision":"b4c33e9400742cf4ce4832b551ec6dee","url":"docs/Pasted image 20240202150654.png"},{"revision":"d211e1610f8cce7576194b0bbce75198","url":"docs/Pasted image 20240202164647.png"},{"revision":"27407b269446376a2f4f78d51965599b","url":"docs/Pasted image 20240202172916.png"},{"revision":"6b0b35bb531dff9b3dff0223a8997d36","url":"docs/Pasted image 20240219112345.png"},{"revision":"348546622479282da52a13f13652a160","url":"docs/Pasted image 20240221104433.png"},{"revision":"3af5e9c87b98c0e2d02a90bf0bd95ade","url":"docs/Pasted image 20240221110012.png"},{"revision":"e2e703f8456135cdd369078fbb9dfb50","url":"docs/Pasted image 20240221111143.png"},{"revision":"f26d776dca4d4254678e9fa177036b84","url":"docs/Pasted image 20240222105609.png"},{"revision":"bea93dea4bed21b8a5ab13ad7417697e","url":"docs/Pasted image 20240222105654.png"},{"revision":"403d3d7b8325fac46c6bb903af18439f","url":"docs/Pasted image 20240222105710.png"},{"revision":"f6986de728283699a1a470385263d4e8","url":"docs/Pasted image 20240227153315.png"},{"revision":"f1629c2fbbc33f46c6d496117a18af5a","url":"docs/Pasted image 20240227153400.png"},{"revision":"450509fc5134de08ac958ad1bbd326a2","url":"docs/Pasted image 20240320095748.png"},{"revision":"19ddc63b95073fa111c3724352a71521","url":"docs/Pasted image 20240320100147.png"},{"revision":"9effcef575a48207e509281ff24d8eb2","url":"docs/Pasted image 20240320100235.png"},{"revision":"86db2792f8d586bdcbfdae8c579efcdb","url":"docs/Pasted image 20240320100345.png"},{"revision":"71a2d40d40cf830ebeebd1e7afaa5fb3","url":"docs/Pasted image 20240320101339.png"},{"revision":"d01dd28b91acd7423aec10355b0bbafe","url":"docs/Pasted image 20240320101446.png"},{"revision":"0f2ee6970bf113c5c3e50beea785d8db","url":"docs/Pasted image 20240320101527.png"},{"revision":"85d05f3f28fcc616ceba868d0b39b4ac","url":"docs/Pasted image 20240320101549.png"},{"revision":"63a14afb4aca4db99781992041db10e4","url":"docs/Pasted image 20240320110617.png"},{"revision":"bcb3948c3eeb15cdfbfac5f99833e42f","url":"docs/Pasted image 20240428181858.png"},{"revision":"8b29d8966cf85e99412764c9970a7b0f","url":"docs/Pasted image 20240428181951.png"},{"revision":"5d6f6ddc26fe54fbcdab825eef1d96d2","url":"docs/Pasted image 20240428183103.png"},{"revision":"6f457c695694cc865e7a7cd595a4627e","url":"docs/Pasted image 20240428184809.png"},{"revision":"bec406f01c9338bbd5edd9256b860b2a","url":"docs/Pasted image 20240428193348.png"},{"revision":"ce7b75cefd5974d0a8de7eaff34c98df","url":"docs/Pasted image 20240627143945.png"},{"revision":"3d6c89eb779074e053513eaf9f2de3b5","url":"docs/Pasted image 20240628110350.png"},{"revision":"509a7be5776ac84b144770def0cd7108","url":"docs/Pasted image 20240718102453.png"},{"revision":"4af868a650fbd4bd8148c6ee68813c86","url":"docs/Pasted image 20240718104654.png"},{"revision":"259d1726cbfffbeffe24ff9d391462ec","url":"docs/Pasted image 20240718104856.png"},{"revision":"259d1726cbfffbeffe24ff9d391462ec","url":"docs/Pasted image 20240718104858.png"},{"revision":"188cab96aefcc44d0dc338b9f198a0b1","url":"docs/Pasted image 20240718143629.png"},{"revision":"f3ffbf78392139198a183f5b772aabf2","url":"docs/Pasted image 20240718144504.png"},{"revision":"72a4642dcb926193c4793a44b558a8a8","url":"docs/Pasted image 20240718144727.png"},{"revision":"ead0a3a0b4c98a6df84e661c7d898dd1","url":"docs/Pasted image 20240718145114.png"},{"revision":"ead0a3a0b4c98a6df84e661c7d898dd1","url":"docs/Pasted image 20240718145116.png"},{"revision":"a6954f40d77fc1f1f515aabfe3ef757f","url":"docs/Pasted image 20240801141915.png"},{"revision":"a6954f40d77fc1f1f515aabfe3ef757f","url":"docs/Pasted image 20240801141923.png"},{"revision":"b1806a610f452d3d6bd5ef98050e32ae","url":"docs/Pasted image 20240801142751.png"},{"revision":"df30be3455bc88736725e9f7d4ff1877","url":"docs/Pasted image 20240801143134.png"},{"revision":"df30be3455bc88736725e9f7d4ff1877","url":"docs/Pasted image 20240801143140.png"},{"revision":"710e61d9e8bf4d40ee63e93e7d4fa563","url":"docs/Pasted image 20240801144405.png"},{"revision":"710e61d9e8bf4d40ee63e93e7d4fa563","url":"docs/Pasted image 20240801144412.png"},{"revision":"addd5e32fecf1144a1c4bfe8aa03a3b4","url":"docs/Pasted image 20240801144502.png"},{"revision":"f7bdb9f33401ceafba0155e50072fc96","url":"docs/Pasted image 20240801144817.png"},{"revision":"9f1d7426603ff3be3246a05eeffa53f3","url":"docs/Pasted image 20240801150053.png"},{"revision":"a9da2c067c0eb5e9525d2a814eb4a615","url":"docs/Pasted image 20240801150156.png"},{"revision":"307a5c4394871dac9f37d278a47fe222","url":"docs/Pasted image 20240801150329.png"},{"revision":"4df0ed572b2430d3504caede8881257b","url":"docs/Pasted image 20240801151047.png"},{"revision":"7f97e6d9b9f6a0f56b322f05a551e003","url":"docs/Pasted image 20240801152147.png"},{"revision":"ed8bf6a75f58cfc1255b29ae58b8178d","url":"docs/Pasted image 20240801152355.png"},{"revision":"a9f4ba344e7cf69baf11d253d9b908c5","url":"docs/Pasted image 20240925155737.png"},{"revision":"7ba10c395d25637f42b1462c5f023f82","url":"docs/Pasted image 20240925161610.png"},{"revision":"31b1083054b5fc5b8b545a33fc97a04a","url":"docs/Pasted image 20241224140815.png"},{"revision":"132be84d52c8f4476b528177e7351b16","url":"docs/Pasted image 20241224140829.png"},{"revision":"3b99f58bef6aeb91eb8640c14f90c2e7","url":"docs/Pasted image 20250410152257.png"},{"revision":"1448b05d2cc78d2680cee297656a0947","url":"docs/Pasted image 20250410153008.png"},{"revision":"dd6b30319c2ee68347da40a4257062b4","url":"docs/Pasted image 20250410153247.png"},{"revision":"b82f5290c14b4a4d94b3f4aed6296360","url":"docs/Pasted image 20250410153638.png"},{"revision":"9595873f9f8bf49736064a5e71b4127c","url":"docs/Pasted image 20250410154810.png"},{"revision":"20fa5c20db991da970da5ed7c95d3f67","url":"docs/Pasted image 20250414111720.png"},{"revision":"232bcc24bc48d293ba3091e9a14dfafe","url":"docs/Pasted image 20250414111750.png"},{"revision":"47df7600cfa2e28c94ff0c5a6c397ccb","url":"docs/Pasted image 20250415141921.png"},{"revision":"451e5d55bc3aef807ac7b3d2ab9694f9","url":"docs/Pasted image 20250415142551.png"},{"revision":"b9844a5d37611ab1779656e788fb785f","url":"docs/Pasted image 20250415145810.png"},{"revision":"6897c739c31f0413b32ffbf18398a848","url":"docs/Pasted image 20250415145822.png"},{"revision":"6f3914221730a0a8dcc93b1d8b5558e8","url":"docs/Pasted image 20250415150304.png"},{"revision":"3384b7272a280d01791d09626d411741","url":"docs/Pasted image 20250415152336.png"},{"revision":"f5c4dd9548217cd5eb25027297e4deb5","url":"docs/Pasted image 20250415153123.png"},{"revision":"d11c5284d38261cfaf465c1c819fe036","url":"docs/Pasted image 20250415153250.png"},{"revision":"c37ddc343e55a65fad85d95236c0d7da","url":"docs/Pasted image 20250513152727.png"},{"revision":"85c51c4fb66ebb459e414ad183b8421f","url":"docs/Pasted image 20250513152752.png"},{"revision":"86fe25e1ccf18d3ec11bf0d468915b2d","url":"docs/Pasted image 20250715101717.png"},{"revision":"59c8e9a7c38deb4845adb56693a09c4f","url":"docs/Pasted image 20250715105446.png"},{"revision":"1d72b69b5e3f95f4f5048e83b2e0656d","url":"docs/Pasted image 20250715114722.png"},{"revision":"0078a99277524668190f971766a3f9d3","url":"docs/Pasted image 20250715182816.png"},{"revision":"5b318da88eb7379891d776659787411d","url":"docs/Pasted image 20250716145257.png"},{"revision":"a3abc9160674ad5a0f04f9b8a71854d5","url":"docs/Pasted image 20250716151101.png"},{"revision":"f121e7a75ff86ba5c4d519ff232c8be7","url":"docs/Pasted image 20250716151512.png"},{"revision":"cab38491ebb14600ceb3755b798aa80d","url":"docs/Pasted image 20250716151800.png"},{"revision":"7f4ede4bdd14ba6333080350d29a5161","url":"docs/Pasted image 20250716154355.png"},{"revision":"4a024796de4051cb1d4ec8236d7e1860","url":"docs/Pasted image 20250717211500.png"},{"revision":"600522667b79119df0c51482f5b52eb6","url":"docs/Pasted image 20250730095256.png"},{"revision":"128d63c3e95701b8a7a19d607ac07c22","url":"docs/Pasted image 20250806103640.png"},{"revision":"b6536b8165ea560777531b7490173524","url":"docs/Pasted image 20250806103711.png"},{"revision":"6eb87d49ff65f8df5e5ea272e71b5b70","url":"docs/Pasted image 20250806103837.png"},{"revision":"171712bb3f12e1e41e903370cb8c3297","url":"docs/Pasted image 20250812104240.png"},{"revision":"fe7302583fc012cf072bf03ccbac1dde","url":"docs/Pasted image 20250825105457.png"},{"revision":"c9e0b9b776a764f8deeaad3014417ef0","url":"docs/Pasted image 20250825110224.png"},{"revision":"542eec22498ecaa6a3b9cac567ca57ad","url":"docs/Pasted image 20250827144201.png"},{"revision":"b38f502e412e33a47445ed08ebb599ea","url":"docs/Pasted image 20250827161058.png"},{"revision":"336e73bc1b9e22d9c00ac92c766d1526","url":"docs/Pasted image 20250827161136.png"},{"revision":"11746eee0fd7d766fa41e1c79e17a844","url":"docs/Pasted image 20250827163047.png"},{"revision":"7e67b810b7ded225da2ad47e96a14c19","url":"docs/Pasted image 20250828184703.png"},{"revision":"14c9d39d0ffbfecbfadefa62c2bf2486","url":"docs/Pasted image 20250925101507.png"},{"revision":"134bbe337bf0c04529a4e77ca53afcfc","url":"docs/Pasted image 20260410102727.png"},{"revision":"c51dae4db693dec52ccef6b6fbbf9529","url":"docs/Pasted image 20260410102755.png"},{"revision":"d422e72d2c443d53c3b41af389a836c4","url":"docs/Pasted image 20260410112109.png"},{"revision":"c2d6d146ee716e55084d7d473c10c7c7","url":"docs/Pasted image 20260410172340.png"},{"revision":"9d0c655812387541ff29565fff9c9342","url":"docs/Pasted image 20260410172414.png"},{"revision":"2c3fb1ab4b954deda8ec077ffcdab321","url":"docs/Pasted image 20260410172523.png"},{"revision":"3ebbcb52e74a0e429d4cf6344f12f386","url":"docs/Pasted image 20260410172905.png"},{"revision":"35fa6f584a3a9532e171b7d72c96bdb8","url":"docs/Pasted image 20260410173515.png"},{"revision":"18b83ba7d6f6e2dfe73ed336cd6787e3","url":"docs/Pasted image 20260410181208.png"},{"revision":"a43124598b6fe633d7f0ba0441ffe74a","url":"docs/Pasted image 20260410185148.png"},{"revision":"44fab455799035fccffbb387aa59986e","url":"docs/Pasted image 20260414104932.png"},{"revision":"c51fae48b4e23e01ab6479d09688fd26","url":"docs/Pasted image 20260414105100.png"},{"revision":"5ec9b164d86c7b9d1cceb996804e33e9","url":"docs/Pasted image 20260414105209.png"},{"revision":"bccfa8a153a75d6cc9548456044b8cce","url":"docs/Pasted image 20260414105311.png"},{"revision":"84ad0df29cfc4866ffeef202547a5528","url":"docs/Pasted image 20260414105320.png"},{"revision":"9cef55e061f79b140ff84badae33504e","url":"docs/Pasted image 20260414105343.png"},{"revision":"799e3204f44f8b01a4b903c44d227470","url":"docs/Pasted image 20260709154255.png"},{"revision":"35ccdcae44c8857514cff6cbd5a57e89","url":"docs/Pasted image 20260709154459.png"},{"revision":"5e58da58dbc90cfa87d1268cb2ce3439","url":"docs/Pasted image 20260714215433.png"},{"revision":"afba92fba2c971e9ba482bbca9a3142d","url":"docs/Pasted image 20260714215810.png"},{"revision":"782db07a1c104749390378539fc0ac3e","url":"docs/Pasted image 20260714215844.png"},{"revision":"3245504dbcb1d70d6ef616f75ee43712","url":"docs/Pasted image 20260714215931.png"},{"revision":"f98ad3e826dda952882880a348b05e4a","url":"docs/Pasted image 20260714220055.png"},{"revision":"fd8a9c4971652cf18aa516db64dc80a7","url":"docs/Pasted image 20260901111506.png"},{"revision":"25773f2e0fcf26d18f382c6e6da5e139","url":"docs/Pasted image 20260910104615.png"},{"revision":"fc14f8e784b7aefc05f54662b8a31263","url":"docs/Pasted image 20260914151347.png"},{"revision":"14a213e98c865858850315de96e50620","url":"docs/Pasted image 20260926143940.png"},{"revision":"784beff3ca9ba8687f6572da667adeba","url":"favorite.ico"},{"revision":"36bf92af2912417cfd2de441c6df13de","url":"hero.png"},{"revision":"d7a0624484efad96738b15bda8f01a2f","url":"img/1-load.png"},{"revision":"213d0a9e7905636a4fa174824ee7c17b","url":"img/2+load.png"},{"revision":"13a0ee7eb5d7d1cbd1177deb74f36afd","url":"img/baowen.png"},{"revision":"c7c9c7831da370fb888541c1e20ccf8a","url":"img/buildwith.png"},{"revision":"6f714df0aa84ed93667f72489036a49e","url":"img/chmod.png"},{"revision":"7fa1a026116afe175cae818030d4ffc4","url":"img/docusaurus.png"},{"revision":"784beff3ca9ba8687f6572da667adeba","url":"img/favicon.ico"},{"revision":"c516e13ceeb91878abf1a7e6d6f749f5","url":"img/gongkaimiyao.png"},{"revision":"33f8d488b222f2c3b66b4ca546861789","url":"img/http.png"},{"revision":"a50261b989bb176ff772fc58233fbd97","url":"img/http2.png"},{"revision":"9387f1e0dbbfc7e67be6bcff4cdb4a84","url":"img/httpsguopcheng.png"},{"revision":"847321fec17b6d21316a7e34365935c4","url":"img/httpsliucheng.png"},{"revision":"efbf64c2161897efab0f2d481a1da3df","url":"img/httpstongxin.png"},{"revision":"2e7c0bac22c4aba6792783bdc2316520","url":"img/httpvshttps.png"},{"revision":"fa28266061eb9d9297c611b17c61ebf3","url":"img/http中间人攻击.png"},{"revision":"803480f30f533ec99df6fe639998449f","url":"img/huancun.jpg"},{"revision":"b71e920671a84ef1fc65f82a11bda53a","url":"img/hunhejiami.png"},{"revision":"aa4fa2cdc39d33f2ee3b8f245b6d30d9","url":"img/logo.svg"},{"revision":"c85484ece7710acf1e2ca2a67c1525e4","url":"img/map.png"},{"revision":"bae535e16ed7ea2253e5a0532f175ad4","url":"img/tcpip.png"},{"revision":"a6b83d7b4c3cf36cb21eb7a9721716dd","url":"img/undraw_docusaurus_mountain.svg"},{"revision":"b64ae8e3c10e5ff2ec85a653cfe6edf8","url":"img/undraw_docusaurus_react.svg"},{"revision":"8fa6e79a15c385d7b2dc4bb761a2e9e3","url":"img/undraw_docusaurus_tree.svg"},{"revision":"6f62d0db78d11931923862716a8f1577","url":"img/vue-1.png"},{"revision":"2891d7c97f17353cf3dab3b6caa97cf4","url":"img/vue-2.png"},{"revision":"5254804e2d00c02b4758d8f3d64f00b6","url":"img/vue-lifecycle.png"},{"revision":"06a9177e08eb4e803834666126a923ac","url":"img/vue-render1.png"},{"revision":"d79f56aa1e059cea8a591c018ca6c5bd","url":"img/vue-render2.png"},{"revision":"ead15afc8659ed4a171c7df59d6dd6b6","url":"img/website/antv.png"},{"revision":"f4bc27c77d6c694a8f102400b47a0f8c","url":"img/website/any-rule.ico"},{"revision":"901b00933f6f11b2f1a6a5599f8c1262","url":"img/website/apifox.png"},{"revision":"b96c95e3c8bcbb9e7c4ee3d700f18e3e","url":"img/website/atoolbox.ico"},{"revision":"f74ef9646e0ce62d91bd1f386ddea182","url":"img/website/axios.ico"},{"revision":"f2d2896c488493e18c1b112cdd9bb1d9","url":"img/website/bilibili.ico"},{"revision":"46a4dee218eae406decc106f9172ad8f","url":"img/website/bun.svg"},{"revision":"3d83f3fab770c2a29d3a78e7a87cd187","url":"img/website/chatgpt.png"},{"revision":"633ba93467bb1d9193e64649ad384a48","url":"img/website/coding.png"},{"revision":"b052a4bef57c1aa73cd7cff5bc4fb61d","url":"img/website/component party.svg"},{"revision":"9069c3d1357b5404790869a73dc6c4a7","url":"img/website/coolify.png"},{"revision":"4dd24c08b90ddd2ed308e21a1aa93f35","url":"img/website/css-inspiration.png"},{"revision":"e67ffbf9f1b0922984b8f7f679c7d9f2","url":"img/website/cssfx.png"},{"revision":"bccc2805bbb49ba2a229eccd9d6336de","url":"img/website/cypress.png"},{"revision":"e6dbdc5d73afb6259d59b047cf0e796a","url":"img/website/dbyun.png"},{"revision":"ed1ea8d1835045039ee20a25a0c1119b","url":"img/website/digitalocean.png"},{"revision":"106e45640bf6465e840987f8d0809cac","url":"img/website/docusaurus.svg"},{"revision":"fff84f43a8b8da380fc7f09a820b5cc1","url":"img/website/electron.ico"},{"revision":"03094a3f1a2133a2e482161f0ea880b7","url":"img/website/es6.png"},{"revision":"d249a627f5d1dc56064e6e5e51591e4e","url":"img/website/figma.png"},{"revision":"54a5811e46ae339fe0748c7e19ee13cf","url":"img/website/gitee.ico"},{"revision":"7f969f62ee272a3be19966806fff4ad5","url":"img/website/github.ico"},{"revision":"ca1ef68de99bb1c21b54a2de9c2f5603","url":"img/website/github.png"},{"revision":"42442ce03d1ed3af099667a09ae3d9bf","url":"img/website/google_fonts.ico"},{"revision":"268d07772e674f7727b22d43feea87cd","url":"img/website/graphQL.svg"},{"revision":"18796448b4d2c235ef28174ea8fd3df3","url":"img/website/hoppscotch.png"},{"revision":"a017103bc249c013451e62ab18267655","url":"img/website/igoutu.png"},{"revision":"0c1f700da144243c526f252e59362138","url":"img/website/javascript.svg"},{"revision":"ced24ba3036e65440698d9f4a5d3d7ee","url":"img/website/jest.png"},{"revision":"91f205ab264c6166b2f0cdfa15dcb998","url":"img/website/juejin.png"},{"revision":"ee94dbce87dfc0bcdee0c8f526d75e75","url":"img/website/loading.ico"},{"revision":"cbbd161ba4740677c61b6c0b5cb5f08e","url":"img/website/mdn.png"},{"revision":"86e699e394c20125f4c0cc23d318dc57","url":"img/website/naiveUI.svg"},{"revision":"f30aab085c20efcdee28b9d16750d3c5","url":"img/website/nuxt.svg"},{"revision":"0c390c49eafedc9d0b9eab5f48eae811","url":"img/website/ossinsight.png"},{"revision":"3a2e616a4c02faa220f078f403535bfa","url":"img/website/playwright.svg"},{"revision":"0f8eab4686969701a3f4b1853714f39a","url":"img/website/prisma.png"},{"revision":"0e32bdb3d2bb46ade327d020267b88eb","url":"img/website/railway.png"},{"revision":"ae74fdaee9fbeefec73131e08c2b4853","url":"img/website/runoob.png"},{"revision":"b653c6e07999f2b00977c97e126edf79","url":"img/website/rust-logo-blk.svg"},{"revision":"b653c6e07999f2b00977c97e126edf79","url":"img/website/rust.svg"},{"revision":"e62acc5edf1a5489565848df8b6b0e15","url":"img/website/shields.png"},{"revision":"c7eaca1932ec1bca09b2a6e7f943395e","url":"img/website/stackblitz.png"},{"revision":"b80e8429f2dd86602ba9bedaee2372bf","url":"img/website/stateofjs.svg"},{"revision":"eb33422a859d1e43141bae4e314aec24","url":"img/website/strapi.png"},{"revision":"603a01f9397b9c1bac708ab63c2f0ca9","url":"img/website/swr.png"},{"revision":"6b0b3baf7667b855c81b9521bc1bd545","url":"img/website/taro.png"},{"revision":"31c4413e9d4fff5adb58792f8900d65c","url":"img/website/terminalgif.ico"},{"revision":"b2f84f958493f6b6643428b0d38c65c4","url":"img/website/turbopack.svg"},{"revision":"3d86b98e3d7c252c00dad343f37e6191","url":"img/website/turborepo.svg"},{"revision":"778664dab30dd2c4f8c12feab032f3b8","url":"img/website/twind.svg"},{"revision":"a1e9f66a2d4c49efc0e723e29e75c6da","url":"img/website/typeorm.ico"},{"revision":"a285ab8bd5ea48234315d7b223a5e727","url":"img/website/uiverse.png"},{"revision":"6f2fe057bbbb1e0577ef779818eb9a77","url":"img/website/vben-admin.png"},{"revision":"2ccd6960a9ed152749f34a16174686fa","url":"img/website/webgradients.png"},{"revision":"de88d6acf04f16debb7521f2644ed756","url":"img/website/webpack.png"},{"revision":"2233ab8d63b1bff9b704dbbaf731f2b0","url":"img/website/zhubai.png"},{"revision":"dace3497305ebfc1aa4dc1f3d0ae6903","url":"img/yahoo.jpg"},{"revision":"89c129bd9849b767bc85f790ffbdafd7","url":"img/zhibiao.jpg"},{"revision":"6bdafd801c878b10edb5fed5d00969e9","url":"svg/juejin.svg"}];
    const controller = new workbox_precaching__WEBPACK_IMPORTED_MODULE_0__.PrecacheController({
        // Safer to turn this true?
        fallbackToNetwork: true,
    });
    if (params.offlineMode) {
        controller.addToCacheList(precacheManifest);
        if (params.debug) {
            console.log('[Docusaurus-PWA][SW]: addToCacheList', { precacheManifest });
        }
    }
    await runSWCustomCode(params);
    self.addEventListener('install', (event) => {
        if (params.debug) {
            console.log('[Docusaurus-PWA][SW]: install event', { event });
        }
        event.waitUntil(controller.install(event));
    });
    self.addEventListener('activate', (event) => {
        if (params.debug) {
            console.log('[Docusaurus-PWA][SW]: activate event', { event });
        }
        event.waitUntil(controller.activate(event));
    });
    self.addEventListener('fetch', async (event) => {
        if (params.offlineMode) {
            const requestURL = event.request.url;
            const possibleURLs = getPossibleURLs(requestURL);
            for (const possibleURL of possibleURLs) {
                const cacheKey = controller.getCacheKeyForURL(possibleURL);
                if (cacheKey) {
                    const cachedResponse = caches.match(cacheKey);
                    if (params.debug) {
                        console.log('[Docusaurus-PWA][SW]: serving cached asset', {
                            requestURL,
                            possibleURL,
                            possibleURLs,
                            cacheKey,
                            cachedResponse,
                        });
                    }
                    event.respondWith(cachedResponse);
                    break;
                }
            }
        }
    });
    self.addEventListener('message', async (event) => {
        if (params.debug) {
            console.log('[Docusaurus-PWA][SW]: message event', { event });
        }
        const type = event.data?.type;
        if (type === 'SKIP_WAITING') {
            // lib def bug, see https://github.com/microsoft/TypeScript/issues/14877
            self.skipWaiting();
        }
    });
})();

})();

/******/ })()
;
//# sourceMappingURL=sw.js.map