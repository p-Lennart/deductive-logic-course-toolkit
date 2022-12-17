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

let dictionary = {};

function temp(str) {
    
    let dictionary = {};

    const parse = (str, eval = false) => {
        let leftResult = false;
        let operator = false;
        let rightResult = false;
    
        let openBrackets = [];
        let closedBracketCount = 0;
    
    
        for (let i = 0; i < str.length; i++) {
            let c = str[i];
            
            let setResult = (content) => {
                if (typeof content === 'string') {
                    if (eval) {
                        content = dictionary[content];
                    } else {
                        dictionary[content] = 'empty';
                    }
                }
                if (operator) {
                    if (rightResult) {
                        if (typeof content === 'object') {
                            rightResult = "SYNTAX ERROR";
                        } else {   
                            rightResult += content;
                        }
                    } else {
                        rightResult = content;
                    }
                } else {
                    if (leftResult) {
                        if (typeof content === 'object') {
                            leftResult = "SYNTAX ERROR";
                        } else {
                            leftResult += content;
                        }
                    } else {
                        leftResult = content;
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
                    
                    setResult(parse(sub));
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
    
        if (openBrackets.length !== closedBracketCount) {
            return { error: `Parenthetical mismatch: ${openBrackets.length} open, ${closedBracketCount} close` };
        } else if (!operator) {
            return leftResult;
        } else {
            if (eval) {
                return evalFunction(leftResult, symbols[operator], rightResult);
            } else {
                return { lhs: leftResult, op: operator, rhs: rightResult }; 
            }
        }
    }

    console.log(parse(str, false));
    for (let key of Object.keys(dictionary)) {
        dictionary[key] = true;
    }
    console.log(dictionary);
    console.log(parse(str, true));
}


// let testStr = '(pv(p>q))&((r=z)>q)';

test = temp('p>(qvr)');

// console.log(JSON.stringify(test, null, 4));