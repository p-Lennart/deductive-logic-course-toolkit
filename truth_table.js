const colors = {
    Reset: "\x1b[0m",
    Bright: "\x1b[1m", 
    Dim: "\x1b[2m",
    Underscore: "\x1b[4m",
    Blink: "\x1b[5m",
    Reverse: "\x1b[7m",
    Hidden: "\x1b[8m",
  
    FgBlack: "\x1b[30m",
    FgRed: "\x1b[31m",
    FgGreen: "\x1b[32m",
    FgYellow: "\x1b[33m",
    FgBlue: "\x1b[34m",
    FgMagenta: "\x1b[35m",
    FgCyan: "\x1b[36m",
    FgWhite: "\x1b[37m",
  
    BgBlack: "\x1b[40m",
    BgRed: "\x1b[41m",
    BgGreen: "\x1b[42m",
    BgYellow: "\x1b[43m",
    BgBlue: "\x1b[44m",
    BgMagenta: "\x1b[45m",
    BgCyan: "\x1b[46m",
    BgWhite: "\x1b[47m"
};

function renderTF(bool) {
    return bool ? `${colors.FgGreen}T${colors.Reset}` : `${colors.FgRed}F${colors.Reset}`;
}

const negation = '~';

const symbols = {
    '&': 'conjunction', 
    'v': 'disjunction',
    '>': 'implication',
    '=': 'equivalence',
}

const functions = {
    conjunction: [true, false, false, false],
    disjunction: [true, true, true, false],
    implication: [true, false, true, true],
    equivalence: [true, false, false, true],
}

function getBooleanCombinations(size) {
    const columns = [];

    let height = Math.pow(2, size);

    for (let i = 0; i < size; i++) {
        let column = [];
        for (let j = 0; j < height; j++) {
            let range = height * Math.pow(2, -i);
            let flipPoint = range / 2;
            column[j] = (j % range) < flipPoint;
            // console.log(j, range, flipPoint, column[j]);
        }   
        columns[i] = column;
    }

    return columns;
}

function evalFunction(lh, op, rh) {
    let values = functions[op];
    if (lh && rh) {
        return values[0];
    } else if (lh && !rh) {
        return values[1];
    } else if (!lh && rh) {
        return values[2];
    } else if (!lh && !rh) {
        return values[3];
    }
}

const dictionary = {};

const handleComponent = (component, negation, eval) => {
    if (typeof component === 'boolean') {
        return (negation ? !component : component); 
    } else if (typeof component === 'string') {
        if (eval) {
            return (negation ? !dictionary[component] : dictionary[component])
        } else {
            dictionary[component] = 'fill';
            return (negation ? '~' : '') + component; 
        }
    } else {
        if (component.op && negation) {
            component.op = `~${component.op}`; 
        }
        return component;
    }
}

const parse = (str, eval = false) => {
    // console.log(str, eval ? "EVAL" : "");

    let leftResult = false;
    let leftNeg = false;
    let operator = false;
    let rightResult = false;
    let rightNeg = false;

    let openBrackets = [];
    let closedBracketCount = 0;


    for (let i = 0; i < str.length; i++) {
        let c = str[i];
        
        let setResult = (content) => {
            if (operator) {
                if (!rightResult) {
                    rightResult = content;
                } else if (typeof content === 'object') {
                    rightResult = "SYNTAX ERROR";
                } else {   
                    rightResult += content;
                }
            } else {
                if (!leftResult) {
                    leftResult = content;
                } else if (typeof content === 'object') {
                    leftResult = "SYNTAX ERROR";
                } else {
                    leftResult += content;
                }
            }
        }

        if (c === '(') {
            openBrackets.push(i);
        } else if (c === ')') {
            closedBracketCount += 1;
            if (closedBracketCount === openBrackets.length) {
                let sub = str.substring(openBrackets[0] + 1, i);
                
                closedBracketCount = 0;
                openBrackets = [];
                
                setResult(parse(sub, eval));
            } 
        } else if (openBrackets.length == 0) {
            if (Object.keys(symbols).includes(c)) {
                operator = c;
            } else if (c === negation) {
                if (operator) {
                    rightNeg = !rightNeg;
                } else {
                    leftNeg = !leftNeg;
                }
            } else {
                setResult(c);
            }
        }

        // console.log(c, leftResult, operator, rightResult);
    } 
    // Loop END

    if (openBrackets.length !== closedBracketCount) {
        return { error: `Parenthetical mismatch: ${openBrackets.length} open, ${closedBracketCount} close` };
    }

    leftResult = handleComponent(leftResult, leftNeg, eval);

    if (operator) {
        rightResult = handleComponent(rightResult, rightNeg, eval);

        // console.log('Handling', leftResult, operator, rightResult, leftNeg, rightNeg);
        
        if (eval) {
            // console.log('EVAL', leftResult, symbols[operator], rightResult);
            return evalFunction(leftResult, symbols[operator], rightResult);
        } else {
            return { lhs: leftResult, op: operator, rhs: rightResult }; 
        }
    } else {
        return leftResult;
    }
}

function evalSingle(argStr) {
    console.log(parse(argStr, false));
    
    let vars = Object.keys(dictionary);
    vars.sort((a, b) => argStr.indexOf(a) - argStr.indexOf(b)); // Sort variables by occurance
    
    let combinations = getBooleanCombinations(vars.length);
    
    let result = [];
    
    for (let combNum = 0; combNum < combinations[0].length; combNum++) {
        let logStr = '';
        
        for (let varNum = 0; varNum < vars.length; varNum++) {
            dictionary[vars[varNum]] = combinations[varNum][combNum];
            logStr += `${vars[varNum]}: ${renderTF(dictionary[vars[varNum]])} | `;
        }

        let val = parse(argStr, true);
        result.push({ ...dictionary, result: val });
        logStr += `${argStr}: ${renderTF(val)}`;

        console.log(logStr);
    }

    return result;
}

function evalMultipleEquiv(argStrArr) {
    for (let str of argStrArr) {
        console.log(parse(str, false));
    }

    let vars = Object.keys(dictionary);
    vars.sort((a, b) => a - b); // Sort variables alphabetically
    
    let combinations = getBooleanCombinations(vars.length);

    let result = [];
    
    for (let combNum = 0; combNum < combinations[0].length; combNum++) {
        let logStr = '';
        
        for (let varNum = 0; varNum < vars.length; varNum++) {
            dictionary[vars[varNum]] = combinations[varNum][combNum];
            logStr += `${vars[varNum]}: ${renderTF(dictionary[vars[varNum]])} | `;
        }
        logStr += '|';

        let resultLine = {};

        for (let str of argStrArr) {
            let val = parse(str, true);

            resultLine[str] = val;
            logStr += `${str}: ${renderTF(val)} | `;
        }

        let equiv = Object.values(resultLine).every(e => evalFunction(e, 'equivalence', Object.values(resultLine)[0]));
        resultLine.equiv = equiv;
        
        if (!equiv) {
            logStr += colors.BgRed;
        }
        logStr += `EQUIV: ${renderTF(equiv)}`;

        console.log(logStr);
        result.push({ ...dictionary, ...resultLine });
    }

    if (result.every(e => e.equiv === true)) {
        console.log(`${colors.FgGreen}Logically Equivalent${colors.Reset}`);
        return [result, true];
    } else if (result.every(e => e.equiv === false)) {
        console.log(`${colors.FgRed}Logically Contradictory${colors.Reset}`);
        return [result, false];
    } else {
        console.log('Neither Equivalent nor Contradictory')
        return [result, 'neither'];
    }

}

function evalArgValidity(argStrArr, csqStr) {
    for (let str of argStrArr) {
        console.log(parse(str, false));
    }
    console.log(parse(csqStr));

    let vars = Object.keys(dictionary);
    vars.sort((a, b) => a - b); // Sort variables alphabetically
    
    let combinations = getBooleanCombinations(vars.length);

    let result = [];
    
    for (let combNum = 0; combNum < combinations[0].length; combNum++) {
        let logStr = '';
        
        for (let varNum = 0; varNum < vars.length; varNum++) {
            dictionary[vars[varNum]] = combinations[varNum][combNum];
            logStr += `${vars[varNum]}: ${renderTF(dictionary[vars[varNum]])} | `;
        }
        logStr = logStr.slice(0, -1) + '| ';

        let resultLine = {};

        for (let str of argStrArr) {
            let val = parse(str, true);
            resultLine[str] = val;
            logStr += `${str}: ${renderTF(val)} | `;
        }
        
        let allArgsTrue = Object.values(resultLine).every(e => e === true);
        // console.log(Object.values(resultLine), allArgsTrue);
        
        let csqVal = parse(csqStr, true);
        resultLine[`∴${csqStr}`] = csqVal;
        logStr += `∴ ${csqStr}: ${renderTF(csqVal)} || `;

        let valid = !allArgsTrue || (csqVal === true);
        resultLine.valid = valid;
        // console.log(!allArgsTrue, csqVal === true);

        if (!valid) {
            logStr += colors.BgRed;
        }
        logStr += `VALID: ${renderTF(valid)}`;

        console.log(logStr);
        result.push({ ...dictionary, ...resultLine });
    }

    if (result.every(e => e.valid === true)) {
        console.log(`${colors.FgGreen}Argument Valid${colors.Reset}`);
        return [result, true];
    } else {
        console.log(`${colors.FgRed}Argument Inalid${colors.Reset}`);
        return [result, false];
    }

}

// test = temp('~(p>q)&~(p&~q)');
// test = evalSingle('~(p>q)&~(p&~q)');
// test = evalMultipleEquiv(['~(p>q)', '~(p&~q)']);
test = evalArgValidity(['a', 'a>b', 'b>c', 'c>d', 'd>e', 'e>f', 'f>g', 'g>h'], 'h');
// test = evalArgValidity(['p>q', '~p'], '~q');
// console.log(test);
// console.log(JSON.stringify(test));