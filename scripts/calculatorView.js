class CalculatorView {
    constructor(model, theme) {
        this.calculatorModel = model;
        this.calculatorTheme = theme;
        this.keyboard = document.querySelector('.keyboard-section');
        this.outputHistoryView = document.querySelector('.output-history');
        this.outputResultView = document.querySelector('.output-result');
    }

    initInput() {
        this.keyboard.addEventListener('click', (e) => {
            const inputValue = e.target.textContent;
            this.calculatorModel.handleInput(inputValue, e);
            this.renderOutput();
        });
    };

    initKeyboardInput() {
        document.addEventListener('keydown', (e) => {
            const keyValue = e.key;
            this.calculatorModel.handleInput(keyValue, e);
            this.renderOutput();
        })
    }

    renderOutput() {
        this.outputHistoryView.textContent = this.calculatorModel.outputHistory;
        this.outputResultView.textContent = this.calculatorModel.output;
    }

    init() {
        this.initInput();
        this.initKeyboardInput();
        this.calculatorTheme.init();
    }
}