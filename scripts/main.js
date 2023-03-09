const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const signs = ['+', '-', '*', '/'];

const keyboard = document.querySelector('.keyboard-section');
const outputHistory = document.querySelector('.output-history');
const outputResult = document.querySelector('.output-result');

const lightThemeBtn = document.querySelector('.btn-light');
const darkThemeBtn = document.querySelector('.btn-dark');

keyboard.addEventListener('click', calculateHandler);

const calculator = {
    firstNumber: '',
    secondNumber: '',
    operator: '',
    output: '',
    outputHistory: '',
    result: '',

    add() {
        return Number(this.firstNumber) + Number(this.secondNumber);
    },

    subtract() {
        return this.firstNumber - this.secondNumber;
    },

    multiply() {
        return this.firstNumber * this.secondNumber;
    },

    divide() {
        return this.firstNumber / this.secondNumber;
    },

    backspace(number) {
        if (this[number].length === 1) {
            this[number] = '0';
        } else {
            this[number] = this[number].slice(0, this[number].length - 1);
        }
    },

    cutLength(number) {
        this[number].length > 10 && (this[number] = this[number].slice(0, 18));
    }

}

function calculate(obj) {
    switch (obj.operator) {
        case '+':
            return obj.add();
        case '-':
            return obj.subtract();
        case '*':
            return obj.multiply();
        case '/':
            return obj.divide();
    }
}

function resetValues(arr){
    arr.forEach(el => calculator[el] = '');
}


function calculateHandler(e) {
    const inputValue = e.target.textContent;

    // ------------------ Numbers ------------------

    if (digits.includes(inputValue)) {
        if(inputValue === '.' && calculator.result) {
            resetValues(['result', 'secondNumber', 'outputHistory', 'operator' ]);
            calculator.firstNumber = '0.';
            calculator.output = calculator.firstNumber;
        } else if (inputValue !== '.' && calculator.result) {
            resetValues(['result', 'firstNumber', 'secondNumber', 'outputHistory', 'operator' ]);
            calculator.output = calculator.firstNumber;
        }

        if (!calculator.operator && !calculator.result) {
            if(inputValue === '.') {
                if(!calculator.firstNumber.includes(inputValue)) {
                    calculator.firstNumber === '' ? calculator.firstNumber = '0.' : calculator.firstNumber += inputValue;
                }
            } else if (inputValue === '0' && calculator.firstNumber === '0') {
                calculator.firstNumber = '0';
            } else if (inputValue !== '0' && calculator.firstNumber === '0') {
                calculator.firstNumber = inputValue;
            } else {
                calculator.firstNumber += inputValue;
                calculator.cutLength('firstNumber');
            }

            calculator.output = calculator.firstNumber;

        } else if(calculator.operator && !calculator.result) {
            if(inputValue === '.') {
                if(!calculator.secondNumber.includes(inputValue)) {
                    calculator.secondNumber === '' ? calculator.secondNumber = '0.' : calculator.secondNumber += inputValue;
                }
            } else if (inputValue === '0' && calculator.secondNumber === '0') {
                calculator.secondNumber = '0';
            } else if (inputValue !== '0' && calculator.secondNumber === '0') {
                calculator.secondNumber = inputValue;
            } else {
                calculator.secondNumber += inputValue;
                calculator.cutLength('secondNumber');
            }

            calculator.output = calculator.secondNumber;
        }
    }

    //  ------------------ Operations -----------------
    if (signs.includes(inputValue)) {

        calculator.result && (calculator.result = '');
        if(!calculator.firstNumber) {
            calculator.firstNumber = '0';
            calculator.output = calculator.firstNumber;
            calculator.operator = inputValue;
        } else if((calculator.firstNumber && !calculator.operator) || (calculator.operator && !calculator.secondNumber)) {
            calculator.operator = inputValue;
        } else if (calculator.secondNumber) {
            calculator.output = calculate(calculator);
            calculator.firstNumber = calculator.output;
            resetValues(['secondNumber']);
            calculator.operator = inputValue;

        }
        calculator.outputHistory = calculator.firstNumber + inputValue;
    }

        // ---------------- Result ---------------

    if (calculator.secondNumber && inputValue === '=') {
        calculator.output = calculate(calculator);
        calculator.result = calculator.output;
        calculator.outputHistory = calculator.firstNumber + calculator.operator + calculator.secondNumber + '=';

        if(calculator.secondNumber === '0') {
            calculator.output = 'Cannot divide by zero';
            resetValues(['firstNumber', 'secondNumber', 'operator', 'result', 'outputHistory']);
        }
    }

    // ------------------- Backspace -------------------------

    if (e.target.classList.contains('backspace-btn') || e.target.parentElement.classList.contains('backspace-btn')) {

        if (calculator.firstNumber && !calculator.operator && !calculator.result) {
            calculator.backspace('firstNumber');
            calculator.output = calculator.firstNumber;
        } else if (calculator.secondNumber && !calculator.result) {
            calculator.backspace('secondNumber');
            calculator.output = calculator.secondNumber;
        } else if(calculator.result) {
            resetValues(['secondNumber', 'operator', 'outputHistory']);
            calculator.firstNumber = calculator.result;
            calculator.output = calculator.firstNumber;
            resetValues(['result']);
        }
    }

    // ------------------------- C --------------------------
    if (inputValue === 'C') {
          resetValues(['firstNumber', 'secondNumber', 'operator', 'result', 'outputHistory']);
          calculator.output = '0';
    }

    // --------------------------  +/-  ----------------------
    if (inputValue === '+/-') {

    }

    outputHistory.textContent = calculator.outputHistory;
    outputResult.textContent = calculator.output;
}


// ================= DARK THEME ====================

lightThemeBtn.addEventListener('click', function () {
    (document.body.dataset.darkTheme === "true") && (document.body.dataset.darkTheme = 'false');
});
darkThemeBtn.addEventListener('click', function () {
    (document.body.dataset.darkTheme === 'false') && (document.body.dataset.darkTheme = 'true');
});



