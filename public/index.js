let fibbonachi = (n) => {
    let arr = [0, 1]
    for(let i = 1; i < n; i++){
        arr.push(arr[i - 1] + arr[i])
    }
    return arr
}

let isPalindrome = (str) => {
    let temp = str.split('').reverse().join('')
    if(str === temp){
        return 'Its palindrome !'
    }else{
        return 'Its not palindrome !'
    }
}

function showForms(form1, form2, form3){
    if(form1.className === 'hidden'){
        form1.classList.remove('hidden')
        form2.classList.add('hidden')
        form3.classList.add('hidden')
    }else{
        form2.classList.add('hidden')
        form3.classList.add('hidden')
    }
}

document.querySelector('.btnFib').onclick = (e) => {
    e.preventDefault()

    let n = document.querySelector('#fibN').value

    if(n <= 0){
        document.querySelector('#fibResult').value = 'wrong n'
    }else{
        document.querySelector('#fibResult').value = fibbonachi(n)
    }
}

document.querySelector('.btnPal').onclick = (e) => {
    e.preventDefault()

    let str = document.querySelector('#palindromeCheck').value

    if(str < 0){
        document.querySelector('#palResult').value = 'wrong string'
    }else{
        document.querySelector('#palResult').value = isPalindrome(str)
    }
}

let calculatorForm = document.querySelector('#calculator-form')
let fibbonachiForm = document.querySelector('#fibbonachi')
let palindromeForm = document.querySelector('#palindrome')

document.querySelector('#btn-calculator').onclick = (e) => {
    e.preventDefault()

    showForms(calculatorForm, fibbonachiForm, palindromeForm)

}

document.querySelector('#btn-fibbonachi').onclick = (e) => {
    e.preventDefault()

    showForms(fibbonachiForm, calculatorForm, palindromeForm)

}

document.querySelector('#btn-palindrome').onclick = (e) => {
    e.preventDefault()

    showForms(palindromeForm, fibbonachiForm, calculatorForm)

}
