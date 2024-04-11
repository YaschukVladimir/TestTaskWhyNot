const numberWithSpaces = (x: number, fullValue?: boolean) => {
    try {
        if (fullValue) {
            let parts = x.toString().split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            return parts.join(".");
        } else {
            const secondNumber = x.toString()[2] === '0' ? '' : x.toString()[2]
            const needDot = secondNumber ? '.' : ''
            const thirdNumber = x.toString()[3] === '0' ? '' : x.toString()[3]
            const needDot3 = thirdNumber ? '.' : ''
            if (x.toString().length > 12) {
                return '999B+'
            } else if (x.toString().length === 12) {
                return x.toString()[0] + x.toString()[1] + x.toString()[2] + needDot3 + thirdNumber + 'B'
            } else if (x.toString().length === 11) {
                if (thirdNumber) {
                    return x.toString()[0] + x.toString()[1] + '.' + x.toString()[2] + x.toString()[3] + 'B'
                } else {
                    return x.toString()[0] + x.toString()[1] + needDot + secondNumber + 'B'
                }
            } else if (x.toString().length === 10) {
                return x.toString()[0] + '.' + x.toString()[1] + secondNumber + 'B'
            } else if (x.toString().length === 9) {
                return x.toString()[0] + x.toString()[1] + x.toString()[2] + needDot3 + thirdNumber + 'M'
            } else if (x.toString().length === 8) {
                if (thirdNumber) {
                    return x.toString()[0] + x.toString()[1] + '.' + x.toString()[2] + x.toString()[3] + 'M'
                } else {
                    return x.toString()[0] + x.toString()[1] + needDot + secondNumber + 'M'
                }
            } else if (x.toString().length === 7) {
                return x.toString()[0] + '.' + x.toString()[1] + secondNumber + 'M'
            } else {
                let parts = x.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                return parts.join(".");
            }
        }
    } catch (e) {
        console.log(`[numberWithSpaces] error with ${e}`);
    }
};

function convertNumberToAbbreviatedForm(number: number, separator: number, char: string): string {
    const preparedNumber = Math.abs(number).toString();

    if (preparedNumber.length < 11) {
        return customNumberRound(number < 0, number, separator, 2, char);
    }

    return customNumberRound(number < 0, number, separator, 1, char);
}

function customNumberRound(isNegative: boolean, value: number, separator: number, floatQuantity: number, char: string): string {
    return isNegative
        ? (Math.ceil(value / separator * 100) / 100).toFixed(floatQuantity) + char
        : (Math.floor(value / separator * 100) / 100).toFixed(floatQuantity) + char
}

function convertNumberToNumberWithSpaces(strOfNumb: string): string {
    let resultString = '';
    let count = 0;
    for (let i = strOfNumb.length - 1; i >= 0; i--) {
        resultString = strOfNumb.charAt(i) + resultString;
        count++;
        if (count % 3 === 0 && i !== 0) {
            resultString = ' ' + resultString;
        }
    }
    return resultString;
}

const newFunc = (x: number, fullValue?: boolean): string => {
    const BILLION = 1000000000;
    const MILLION = 1000000;
    const wholePart = x.toString().split('.')[0];
    const fractionalPart = x.toString().split('.')[1];
    const wholePartWhithSpaces = convertNumberToNumberWithSpaces(wholePart);

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
            return `${fractionalPart ? wholePartWhithSpaces + '.' + fractionalPart : wholePartWhithSpaces}`;
        }
    } 
    return `${fractionalPart ? wholePartWhithSpaces + '.' + fractionalPart : wholePartWhithSpaces}`;
}


(() => {
    const tests = [
        123, 10001, 153056, 5132.51321, -1, -5561321313, 99999, 12345678, 912321561321, 912301561321, 51231411.31313131, 0
    ]

    tests.forEach((number, index) => {
        const old = numberWithSpaces(number, false);
        const old1 = numberWithSpaces(number, true);
        const newN = newFunc(number, false)?.replace(/\xa0/g, ' ')?.replace(/\u202f/g, ' ');
        const newN1 = newFunc(number, true)?.replace(/\xa0/g, ' ')?.replace(/\u202f/g, ' ');
        const status = (old == newN && old1 == newN1);
        console.log(`#${index + 1}`, status ? "OK" : "FAILED", !status ? `${old} == ${newN} | ${old1} == ${newN1}` : '');
    });
})();