/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/basic-types/A18-webpack/Validator.ts":
/*!**************************************************!*\
  !*** ./src/basic-types/A18-webpack/Validator.ts ***!
  \**************************************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var Validator = /** @class */ (function () {
    function Validator() {
        this.form = document.querySelector('.signin-form');
        this.values = {
            name: document.querySelector('#w3lName'),
            phone: document.querySelector('#w3lPhone'),
            email: document.querySelector('#w3lSender'),
            subject: document.querySelector('#w3lSubject')
        };
        this.handleSubmit();
    }
    Validator.prototype.handleSubmit = function () {
        var _this = this;
        this.form.addEventListener('submit', function (e) {
            e.preventDefault();
            _this.handleErrors();
        });
    };
    Validator.prototype.handleErrors = function () {
        var strippedName = this.values.name.value.trim().replace(/<\/?[^>]+(>|$)/g, '');
        var strippedEmail = this.values.email.value.trim().replace(/<\/?[^>]+(>|$)/g, '');
        var strippedsubject = this.values.subject.value.trim().replace(/<\/?[^>]+(>|$)/g, '');
        var strippedphoneNumber = this.values.phone.value.trim().replace(/<\/?[^>]+(>|$)/g, '');
        var spanName = document.querySelector('.span-name');
        var spanEmail = document.querySelector('.span-email');
        var spanPhone = document.querySelector('.span-phone');
        var spanSubject = document.querySelector('.span-subject');
        if (strippedName === '') {
            spanName.style.color = 'red';
            spanName.innerHTML = 'Por favor, preencha o campo nome.';
        }
        else {
            spanName.innerText = '';
        }
        if (strippedsubject === '') {
            spanSubject.style.color = 'red';
            spanSubject.innerText = 'Por favor, preencha o campo assunto.';
        }
        else {
            spanSubject.innerText = '';
        }
        if (strippedEmail === '') {
            spanEmail.style.color = 'red';
            spanEmail.innerText = 'Por favor, preencha o campo email.';
        }
        else {
            spanEmail.innerText = '';
        }
        if (strippedphoneNumber === '') {
            spanPhone.style.color = 'red';
            spanPhone.innerText = 'Por favor, preencha o campo telefone.';
        }
        else {
            spanPhone.innerText = '';
        }
    };
    return Validator;
}());
exports.default = Validator;


/***/ }),

/***/ "./src/basic-types/A18-webpack/index.ts":
/*!**********************************************!*\
  !*** ./src/basic-types/A18-webpack/index.ts ***!
  \**********************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/*! CommonJS bailout: this is used directly at 2:23-27 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var Validator_1 = __importDefault(__webpack_require__(/*! ./Validator */ "./src/basic-types/A18-webpack/Validator.ts"));
var form = new Validator_1.default();


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/basic-types/A18-webpack/index.ts");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=bundle.js.map