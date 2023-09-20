class CalculatorModel {
    firstNumber = '';
    secondNumber = '';
    operator = '';
    result = '';
    output = '';
    outputHistory = '';
    digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
    signs = ['+', '-', '*', '/'];

    handleInput(inputValue, e) {

        if (this.digits.includes(inputValue)) {
            this.handleDigitInput(inputValue);
        } else if (this.signs.includes(inputValue)) {
            this.handleOperatorInput(inputValue);
        } else if (this.secondNumber && inputValue === '=') {
            this.handleResult();
        } else if (e.target.classList.contains('backspace-btn') || e.target.parentElement.classList.contains('backspace-btn')) {
            this.handleBackSpace();
        } else if (inputValue === 'C') {
            this.handleClear();
        } else if (inputValue === '+/-') {
            this.handleToggleSign();
        } else if (inputValue === '%') {
            this.handleCalculatePrecantage();
        }
    }

    handleDigitInput(inputValue) {
        if(inputValue === '.' && this.result) {
            this.resetValues(['result', 'secondNumber', 'outputHistory', 'operator' ]);
            this.firstNumber = '0.';
            this.output = this.firstNumber;
        } else if (inputValue !== '.' && this.result) {
            this.resetValues(['result', 'firstNumber', 'secondNumber', 'outputHistory', 'operator' ]);
            this.output = this.firstNumber;
        }

        if (!this.operator && !this.result) {

            if(inputValue === '.') {
                if(!this.firstNumber.includes(inputValue)) {
                    this.firstNumber += this.firstNumber === '' ? '0.' : inputValue;
                }
            } else if (inputValue === '0' && this.firstNumber === '0') {
                this.firstNumber = '0';
            } else if (inputValue !== '0' && this.firstNumber === '0') {
                this.firstNumber = inputValue;
            } else {
                this.firstNumber += inputValue;
                this.cutLength('firstNumber');
            }

            this.output = this.firstNumber;

        } else if(this.operator && !this.result) {

            if(inputValue === '.') {
                if(!this.secondNumber.includes(inputValue)) {
                    this.secondNumber === '' ? this.secondNumber = '0.' : this.secondNumber += inputValue;
                }
            } else if (inputValue === '0' && this.secondNumber === '0') {
                this.secondNumber = '0';
            } else if (inputValue !== '0' && this.secondNumber === '0') {
                this.secondNumber = inputValue;
            } else {
                this.secondNumber += inputValue;
                this.cutLength('secondNumber');
            }

            this.output = this.secondNumber;
        }
    }

    handleOperatorInput(inputValue) {
        if(!this.firstNumber) {
            this.firstNumber = '0';
            this.output = this.firstNumber;
            this.operator = inputValue;
        } else if((this.firstNumber && !this.operator) || (this.operator && !this.secondNumber)) {
            this.operator = inputValue;
        } else if (this.secondNumber && !this.result) {
            this.output = this.calculate();
            this.firstNumber = this.output;
            this.resetValues(['secondNumber']);
            this.operator = inputValue;
        } else if (this.result ) {
            this.output = this.result;
            this.firstNumber = this.result;
            this.resetValues(['secondNumber', 'result']);
            this.operator = inputValue;
        }

        this.outputHistory = this.firstNumber + inputValue;
    }

    handleResult() {
        this.output = this.calculate();
        this.result = this.output;
        this.outputHistory = this.firstNumber + this.operator + this.secondNumber + '=';

        if(this.secondNumber === '0') {
            this.output = 'Cannot divide by zero';
            this.resetValues(['firstNumber', 'secondNumber', 'operator', 'result', 'outputHistory']);
        }
    }

    handleBackSpace() {
        if (this.firstNumber && !this.operator && !this.result) {
            this.backspace('firstNumber');
            this.output = this.firstNumber;
        } else if (this.secondNumber && !this.result) {
            this.backspace('secondNumber');
            this.output = this.secondNumber;
        } else if(this.result) {
            this.resetValues(['secondNumber', 'operator', 'outputHistory']);
            this.firstNumber = this.result;
            this.output = this.firstNumber;
            this.resetValues(['result']);
        }
    }

    handleClear() {
        this.resetValues(['firstNumber', 'secondNumber', 'operator', 'result', 'outputHistory']);
        this.output = '0';
    }

    handleToggleSign() {
        if (this.firstNumber && !this.secondNumber) {
            this.output = -this.output;
            this.firstNumber = -this.firstNumber;
        } else if (this.firstNumber && this.secondNumber && ! this.result) {
            this.output = -this.output;
            this.secondNumber = -this.secondNumber;
        } else if (this.firstNumber && this.secondNumber && this.result) {
            this.output = -this.output;
            this.result = -this.result;
        }
    }

    handleCalculatePrecantage() {
        if (!this.secondNumber) {
            this.firstNumber = '0';
            this.output = '0';
            this.outputHistory = '0';
        } else if (this.secondNumber && !this.result ) {
            const percent = this.getPercent();
            this.secondNumber = percent;
            this.output = percent;
            this.outputHistory += this.secondNumber; 
        }
    }

    add() {
        return Number(this.firstNumber) + Number(this.secondNumber);
    };

    subtract() {
        return this.firstNumber - this.secondNumber;
    };

    multiply() {
        return this.firstNumber * this.secondNumber;
    };

    divide() {
        return this.firstNumber / this.secondNumber;
    };

    backspace(number) {
        if (this[number].length === 1) {
            this[number] = '0';
        } else {
            this[number] = this[number].slice(0, this[number].length - 1);
        }
    };

    getPercent() {
        switch (this.operator) {
            case '+':
            case '-':
                return this.firstNumber*this.secondNumber/100;
            case '/':
            case '*':
                return this.secondNumber / 100;
        }
    };

    cutLength(number) {
        this[number].length > 10 && (this[number] = this[number].slice(0, 18));
    };

    calculate ()  {
        switch (this.operator) {
            case '+':
                return this.add();
            case '-':
                return this.subtract();
            case '*':
                return this.multiply();
            case '/':
                return this.divide();
        }
    };

    resetValues(arr){
        arr.forEach(el => this[el] = '');
    }
}