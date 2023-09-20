class CalculatorTheme {
    constructor() {
        this.lightThemeBtn = document.querySelector('.btn-light');
        this.darkThemeBtn = document.querySelector('.btn-dark');
    }

    init() {
        this.lightThemeBtn.addEventListener('click', function () {
            (document.body.dataset.darkTheme === "true") && (document.body.dataset.darkTheme = 'false');
        });
        this.darkThemeBtn.addEventListener('click', function () {
            (document.body.dataset.darkTheme === 'false') && (document.body.dataset.darkTheme = 'true');
        });
    }
}