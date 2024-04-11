"use strict";
var numberWithSpaces = function (x, fullValue) {
    try {
        if (fullValue) {
            var parts = x.toString().split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            return parts.join(".");
        }
        else {
            var secondNumber = x.toString()[2] === '0' ? '' : x.toString()[2];
            var needDot = secondNumber ? '.' : '';
            var thirdNumber = x.toString()[3] === '0' ? '' : x.toString()[3];
            var needDot3 = thirdNumber ? '.' : '';
            if (x.toString().length > 12) {
                return '999B+';
            }
            else if (x.toString().length === 12) {
                return x.toString()[0] + x.toString()[1] + x.toString()[2] + needDot3 + thirdNumber + 'B';
            }
            else if (x.toString().length === 11) {
                if (thirdNumber) {
                    return x.toString()[0] + x.toString()[1] + '.' + x.toString()[2] + x.toString()[3] + 'B';
                }
                else {
                    return x.toString()[0] + x.toString()[1] + needDot + secondNumber + 'B';
                }
            }
            else if (x.toString().length === 10) {
                return x.toString()[0] + '.' + x.toString()[1] + secondNumber + 'B';
            }
            else if (x.toString().length === 9) {
                return x.toString()[0] + x.toString()[1] + x.toString()[2] + needDot3 + thirdNumber + 'M';
            }
            else if (x.toString().length === 8) {
                if (thirdNumber) {
                    return x.toString()[0] + x.toString()[1] + '.' + x.toString()[2] + x.toString()[3] + 'M';
                }
                else {
                    return x.toString()[0] + x.toString()[1] + needDot + secondNumber + 'M';
                }
            }
            else if (x.toString().length === 7) {
                return x.toString()[0] + '.' + x.toString()[1] + secondNumber + 'M';
            }
            else {
                var parts = x.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                return parts.join(".");
            }
        }
    }
    catch (e) {
        console.log("[numberWithSpaces] error with ".concat(e));
    }
};
function convertNumberToAbbreviatedForm(number, separator, char) {
    var preparedNumber = Math.abs(number).toString();
    if (preparedNumber.length < 11) {
        return customNumberRound(number < 0, number, separator, 2, char);
    }
    return customNumberRound(number < 0, number, separator, 1, char);
}
function customNumberRound(isNegative, value, separator, floatQuantity, char) {
    return isNegative
        ? (Math.ceil(value / separator * 100) / 100).toFixed(floatQuantity) + char
        : (Math.floor(value / separator * 100) / 100).toFixed(floatQuantity) + char;
}
function convertNumberToNumberWithSpaces(strOfNumb) {
    var resultString = '';
    var count = 0;
    for (var i = strOfNumb.length - 1; i >= 0; i--) {
        resultString = strOfNumb.charAt(i) + resultString;
        count++;
        if (count % 3 === 0 && i !== 0) {
            resultString = ' ' + resultString;
        }
    }
    return resultString;
}
var newFunc = function (x, fullValue) {
    var BILLION = 1000000000;
    var MILLION = 1000000;
    var wholePart = x.toString().split('.')[0];
    var fractionalPart = x.toString().split('.')[1];
    var wholePartWhithSpaces = convertNumberToNumberWithSpaces(wholePart);
    if (!fullValue) {
        if (wholePart.length > 12) {
            return '999B+';
        }
        if (wholePart.length > 9 && wholePart.length <= 12) {
            return convertNumberToAbbreviatedForm(x, BILLION, 'B');
        }
        if (wholePart.length >= 7 && wholePart.length < 9) {
            return convertNumberToAbbreviatedForm(x, MILLION, 'M');
        }
        if (wholePart.length < 7) {
            return "".concat(fractionalPart ? wholePartWhithSpaces + '.' + fractionalPart : wholePartWhithSpaces);
        }
    }
    return "".concat(fractionalPart ? wholePartWhithSpaces + '.' + fractionalPart : wholePartWhithSpaces);
};
(function () {
    var tests = [
        123, 10001, 153056, 5132.51321, -1, -5561321313, 99999, 12345678, 912321561321, 912301561321, 51231411.31313131, 0
    ];
    tests.forEach(function (number, index) {
        var _a, _b, _c, _d;
        var old = numberWithSpaces(number, false);
        var old1 = numberWithSpaces(number, true);
        var newN = (_b = (_a = newFunc(number, false)) === null || _a === void 0 ? void 0 : _a.replace(/\xa0/g, ' ')) === null || _b === void 0 ? void 0 : _b.replace(/\u202f/g, ' ');
        var newN1 = (_d = (_c = newFunc(number, true)) === null || _c === void 0 ? void 0 : _c.replace(/\xa0/g, ' ')) === null || _d === void 0 ? void 0 : _d.replace(/\u202f/g, ' ');
        var status = (old == newN && old1 == newN1);
        console.log("#".concat(index + 1), status ? "OK" : "FAILED", !status ? "".concat(old, " == ").concat(newN, " | ").concat(old1, " == ").concat(newN1) : '');
    });
})();
