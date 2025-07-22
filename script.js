// Theme Toggling
const toggleThemeButton = document.getElementById('toggle-theme');
const themeIcon = document.getElementById('theme-icon');

// Initial Theme Setup
const currentTheme = localStorage.getItem('theme') || 'light-mode';
document.body.classList.add(currentTheme);
document.querySelector('header').classList.add(currentTheme);
toggleThemeButton.classList.add(currentTheme);
themeIcon.textContent = currentTheme === 'light-mode' ? '🌙' : '☀️';

// Set text color for body content based on theme
function setBodyTextColorBasedOnTheme(theme) {
    if (theme === 'dark-mode') {
        document.body.style.color = '#f1f1f1'; // Lighter color for text in dark mode
    } else {
        document.body.style.color = '#333'; // Darker color for text in light mode
    }
}

// Event Listener for Theme Toggle
toggleThemeButton.addEventListener('click', () => {
    const isDarkMode = document.body.classList.contains('dark-mode');
    const newTheme = isDarkMode ? 'light-mode' : 'dark-mode';

    // Update Classes
    document.body.classList.replace(isDarkMode ? 'dark-mode' : 'light-mode', newTheme);
    document.querySelector('header').classList.replace(isDarkMode ? 'dark-mode' : 'light-mode', newTheme);
    toggleThemeButton.classList.replace(isDarkMode ? 'dark-mode' : 'light-mode', newTheme);

    // Update Button Text and Icon
    themeIcon.textContent = isDarkMode ? '🌙' : '☀️';
    toggleThemeButton.textContent = isDarkMode ? 'Switch to Dark Mode' : 'Switch to Light Mode';

    // Set Text Color for Body Based on New Theme
    setBodyTextColorBasedOnTheme(newTheme);

    // Save Theme to Local Storage
    localStorage.setItem('theme', newTheme);
});

// Apply initial text color for body based on theme
setBodyTextColorBasedOnTheme(currentTheme);

// Expression Conversion Logic
document.getElementById('convert').addEventListener('click', () => {
    const expression = document.getElementById('expression').value.trim();
    const operation = document.getElementById('operation').value;
    const resultOutput = document.getElementById('result-output');

    if (!expression) {
        resultOutput.textContent = "Please enter an expression!";
        return;
    }

    let result;
    try {
        switch (operation) {
            case 'infixToPostfix':
                result = infixToPostfix(expression);
                break;
            case 'infixToPrefix':
                result = infixToPrefix(expression);
                break;
            case 'prefixToPostfix':
                result = prefixToPostfix(expression);
                break;
            case 'balancedParentheses':
                result = balancedParentheses(expression) ? "Balanced" : "Not Balanced";
                break;
            case 'reverseString':
                result = reverseString(expression);
                break;
            case 'palindromeChecker':
                result = isPalindrome(expression) ? "Palindrome" : "Not a Palindrome";
                break;
            case 'evaluatePostfix':
                result = evaluatePostfix(expression);
                break;
            case 'duplicateParentheses':
                result = duplicateParentheses(expression) ? "Duplicate Parentheses Found" : "No Duplicate Parentheses";
                break;
            default:
                result = "Invalid operation";
        }
        resultOutput.textContent = `Result: ${result}`;
    } catch (error) {
        resultOutput.textContent = `Error: ${error.message}`;
    }
});

// Function: Convert Infix to Postfix
function infixToPostfix(expression) {
    const stack = [];
    let postfix = "";

    for (let char of expression) {
        if (/[a-zA-Z0-9]/.test(char)) {
            postfix += char; // Append operands directly
        } else if (char === '(') {
            stack.push(char);
        } else if (char === ')') {
            while (stack.length && stack[stack.length - 1] !== '(') {
                postfix += stack.pop();
            }
            stack.pop(); // Remove '('
        } else if (isOperator(char)) {
            while (
                stack.length &&
                precedence(stack[stack.length - 1]) >= precedence(char)
            ) {
                postfix += stack.pop();
            }
            stack.push(char);
        }
    }

    while (stack.length) {
        postfix += stack.pop();
    }

    return postfix;
}

// Function: Convert Infix to Prefix
function infixToPrefix(expression) {
    const reverseExpr = expression.split("").reverse().map((char) => {
        if (char === '(') return ')';
        if (char === ')') return '(';
        return char;
    }).join('');

    const postfix = infixToPostfix(reverseExpr);
    return postfix.split("").reverse().join('');
}

// Function: Convert Prefix to Postfix
function prefixToPostfix(expression) {
    const stack = [];
    for (let i = expression.length - 1; i >= 0; i--) {
        const char = expression[i];
        if (/[a-zA-Z0-9]/.test(char)) {
            stack.push(char); // Operand
        } else if (isOperator(char)) {
            const operand1 = stack.pop();
            const operand2 = stack.pop();
            const postfix = operand1 + operand2 + char;
            stack.push(postfix);
        }
    }
    return stack.pop();
}

// Balanced Parentheses Checker
function balancedParentheses(expression) {
    const stack = [];
    const pairs = {
        ')': '(',
        '}': '{',
        ']': '[',
    };
    for (const char of expression) {
        if (['(', '{', '['].includes(char)) {
            stack.push(char);
        } else if ([')', '}', ']'].includes(char)) {
            if (stack.pop() !== pairs[char]) {
                return false;
            }
        }
    }
    return stack.length === 0;
}

// Reverse String Using Stack
function reverseString(str) {
    const stack = [];
    for (const char of str) {
        stack.push(char);
    }
    let reversed = "";
    while (stack.length > 0) {
        reversed += stack.pop();
    }
    return reversed;
}

// Palindrome Checker Using Stack
function isPalindrome(str) {
    const stack = [];
    for (const char of str) {
        stack.push(char);
    }
    let reversed = "";
    while (stack.length > 0) {
        reversed += stack.pop();
    }
    return str === reversed;
}

// Evaluate Postfix Expression
function evaluatePostfix(expression) {
    const stack = [];
    for (const char of expression) {
        if (/[0-9]/.test(char)) {
            stack.push(parseInt(char, 10));
        } else if (isOperator(char)) {
            const b = stack.pop();
            const a = stack.pop();
            const result = evaluate(a, b, char);
            stack.push(result);
        }
    }
    return stack.pop();
}

function evaluate(a, b, operator) {
    switch (operator) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return a / b;
        default: throw new Error("Invalid operator");
    }
}

// Duplicate Parentheses Checker
function duplicateParentheses(expression) {
    const stack = [];
    for (const char of expression) {
        if (char === ')') {
            let count = 0;
            while (stack.length && stack[stack.length - 1] !== '(') {
                stack.pop();
                count++;
            }
            stack.pop(); // Remove '('
            if (count < 1) {
                return true; // Found duplicate
            }
        } else {
            stack.push(char);
        }
    }
    return false;
}

// Helper Functions
function isOperator(char) {
    return ['+', '-', '*', '/', '^'].includes(char);
}

function precedence(operator) {
    switch (operator) {
        case '+':
        case '-': return 1;
        case '*':
        case '/': return 2;
        case '^': return 3;
        default: return 0;
    }
}

// Stack Visualizer
const stack = [];
const stackView = document.getElementById('stack-view');
const stackInput = document.getElementById('stack-input');

document.getElementById('push').addEventListener('click', () => {
    const value = stackInput.value.trim();
    if (value) {
        stack.push(value);
        updateStackView();
        stackInput.value = "";
    }
});

document.getElementById('pop').addEventListener('click', () => {
    if (stack.length > 0) {
        stack.pop();
        updateStackView();
    }
});

document.getElementById('peek').addEventListener('click', () => {
    if (stack.length > 0) {
        alert(`Top of Stack: ${stack[stack.length - 1]}`);
    } else {
        alert("Stack is empty!");
    }
});

function updateStackView() {
    stackView.innerHTML = "";
    for (let i = stack.length - 1; i >= 0; i--) {
        const li = document.createElement('li');
        li.textContent = stack[i];
        stackView.appendChild(li);
    }
}
