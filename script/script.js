class Calculator {
    constructor(previousCalculationElement, currentCalculationElement) {
        this.previousCalculationElement = previousCalculationElement
        this.currentCalculationElement = currentCalculationElement
        this.clear()
    }

    clear() {
        this.currentCalculation = ''
        this.previousCalculation = ''
        this.operation = undefined
    }

    delete() {
        this.currentCalculation = this.currentCalculation.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentCalculation.includes('.')) return
        this.currentCalculation = this.currentCalculation.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentCalculation === '') return
        if (this.previousCalculation !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousCalculation = this.currentCalculation
        this.currentCalculation = ''
    }

    compute() {
        let calculation
        const prev = parseFloat(this.previousCalculation)
        const current = parseFloat(this.currentCalculation)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                calculation = prev + current
                break
            case '-':
                calculation = prev - current
                break
            case 'x':
                calculation = prev * current
                break
            case '÷':
                calculation = prev / current
                break
            default:
                return
        }
        this.currentCalculation = calculation
        this.operation = undefined
        this.previousCalculation = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
        if (stringNumber.length >= 12) {
            document.getElementById('current').style.fontSize = '2rem'
        }
    }

    updateDisplay() {
        this.currentCalculationElement.innerText =
            this.getDisplayNumber(this.currentCalculation)
        if (this.operation != null) {
            this.previousCalculationElement.innerText =
                `${this.getDisplayNumber(this.previousCalculation)} ${this.operation}`
        } else {
            this.previousCalculationElement.innerText = ''
        }
        if(this.currentCalculation.length >= 16) this.currentCalculation = this.currentCalculation.substring(0,15)
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousCalculationElement = document.querySelector('[data-previous-calculation]')
const currentCalculationElement = document.querySelector('[data-current-calculation]')
const calculator = new Calculator(previousCalculationElement, currentCalculationElement)

let i = 0

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
        i++
        console.log(i)
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})