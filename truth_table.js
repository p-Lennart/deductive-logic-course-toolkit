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

const handleComponent = (component, eval) => {
    if (typeof component !== 'string') return component;

    let negation = component.indexOf('~');
    
    if (negation > 0) {
        return "ERR";
    } else {
        let compStr = component.slice(negation + 1);
        
        if (eval) {
            return (negation === 0 ? !dictionary[compStr] : dictionary[compStr])
        } else {
            dictionary[compStr] = 'fill';
            return component; 
        }
    } 
}

const parse = (str, eval = false) => {
    // console.log(str, eval ? "EVAL" : "");

    let leftResult = false;
    let operator = false;
    let rightResult = false;

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
            openBrackets.push(i + 1);
        } else if (c === ')') {
            closedBracketCount += 1;
            if (closedBracketCount === openBrackets.length) {
                let sub = str.substring(openBrackets[0], i);
                
                closedBracketCount = 0;
                openBrackets = [];
                
                setResult(parse(sub, eval));
            } 
        } else if (openBrackets.length == 0) {
            if (Object.keys(symbols).includes(c)) {
                operator = c;
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

    leftResult = handleComponent(leftResult, eval);

    if (operator) {
        rightResult = handleComponent(rightResult, eval);

        // console.log('Handling', leftResult, operator, rightResult)
        
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

function temp(str) {
    console.log(parse(str, false));
    
    let vars = Object.keys(dictionary);
    vars.sort((a, b) => str.indexOf(a) - str.indexOf(b)); // Sort variables by occurance
    
    let combinations = getBooleanCombinations(vars.length);
    
    let result = [];
    
    for (let combNum = 0; combNum < combinations[0].length; combNum++) {
        let logStr = '';
        
        for (let varNum = 0; varNum < vars.length; varNum++) {
            dictionary[vars[varNum]] = combinations[varNum][combNum];
            logStr += `${vars[varNum]}: ${dictionary[vars[varNum]]? 'T' : 'F'} | `;
        }

        let val = parse(str, true);
        result.push({ ...dictionary, result: val });
        logStr += `${str}: ${val? 'T' : 'F'}`;

        console.log(logStr);
    }

    return result;
}

test = temp('(p>(qvr))=(r&x)');
// console.log(test);
// console.log(JSON.stringify(test));