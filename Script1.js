// Stack Visualization JavaScript

let stack = []; // Initialize an empty stack

// Select HTML elements
const stackInput = document.getElementById("stack-input");
const stackView = document.getElementById("stack-view");
const resultOutput = document.getElementById("result-output");

// Push operation
document.getElementById("push").addEventListener("click", function() {
    const value = stackInput.value.trim();
    if (value) {
        stack.push(value); // Push value onto the stack
        updateStackView(); // Update stack visualization
        resultOutput.textContent = `Pushed: ${value}`;
        stackInput.value = ''; // Clear input field
    } else {
        resultOutput.textContent = "Please enter a value to push.";
    }
});

// Pop operation
document.getElementById("pop").addEventListener("click", function() {
    if (stack.length > 0) {
        const poppedValue = stack.pop(); // Remove value from the stack
        updateStackView(); // Update stack visualization
        resultOutput.textContent = `Popped: ${poppedValue}`;
    } else {
        resultOutput.textContent = "Stack is empty. Nothing to pop.";
    }
});

// Peek operation
document.getElementById("peek").addEventListener("click", function() {
    if (stack.length > 0) {
        resultOutput.textContent = `Top item: ${stack[stack.length - 1]}`;
    } else {
        resultOutput.textContent = "Stack is empty.";
    }
});

// Update the stack view on the page
function updateStackView() {
    stackView.innerHTML = ''; // Clear current stack view
    stack.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        stackView.appendChild(li); // Add each item as a list element
    });
}

// Default page load actions
window.onload = () => updateStackView(); // Display empty stack on load
