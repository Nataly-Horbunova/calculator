const theme = new CalculatorTheme();
const model = new CalculatorModel()
const calculator = new CalculatorView(model, theme);

calculator.init();
