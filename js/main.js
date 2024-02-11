// Calcular la fecha y mostrar errores.
import { isValidDate, dateDifference } from "./utils.js";

let valueDay, valueMonth, valueYear, newDate, validDate, daysMonth, inputDay;
let labelsDate = document.getElementsByTagName('label');
let inputsDate = document.getElementsByTagName('input');
let dateNow = new Date();
let actuallyYear = dateNow.getFullYear();
let isValidMonth;
let dataForm = document.getElementById('formDate');
let spanyear = document.getElementsByClassName('span-year');
let spanmonth = document.getElementsByClassName('span-month');
let spandays = document.getElementsByClassName('span-days');

const clearSpan = () => {
    spanyear[0].innerHTML = '--';
    spanmonth[0].innerHTML = '--';
    spandays[0].innerHTML = '--';
}

(() => {

    dataForm.addEventListener('input', (e) => {
        e.preventDefault();
        if (e.target.tagName == 'INPUT') {
            let valor = e.target.value;
            valor = valor.replace(/\D/g, '');
            e.target.value = valor;
        };
    }, true)

    dataForm.addEventListener('focus', (e) => {
        e.preventDefault();
        handleValuesDate(e);
    }, true)

    dataForm.addEventListener('blur', (e) => {
        e.preventDefault();
        handleValuesDate(e);
    }, true)

    dataForm.addEventListener('keyup', (e) => {
        e.preventDefault();
        handleValuesDate(e);
    }, true)

    const handleValuesDate = (e) => {
        // Validamos el mes
        if (e.target.id == "month") {
            // validamos el mes.
            if (e.target.value.trim().length > 0) {
                isValidMonth = parseInt(e.target.value) >= 1 && parseInt(e.target.value) <= 12;
                (isValidMonth) ? e.target.nextElementSibling.classList.add('error')
                    : e.target.nextElementSibling.classList.remove('error');
                if (!isValidMonth){
                    clearSpan()
                    e.target.value = '';
                    return
                }
            }
        }
        // Validamos el día, conforme al mes y al año.

        // Validamos que el año no ser mayor que el actual.
        if (e.target.id == "year") {
            // validamos el mes.
            if (e.target.value.trim().length > 0) {
                if (parseInt(e.target.value) > actuallyYear) {
                    e.target.nextElementSibling.classList.remove('error');
                    e.target.nextElementSibling.classList.add('display-input');
                    clearSpan();
                    return;
                } else {
                    e.target.nextElementSibling.classList.add('error');
                    e.target.nextElementSibling.classList.remove('display-input');
                }
            }
        }

        // Validamos si la fecha es válida.


        valueDay = document.getElementById('day').value.trim().length > 0
            ? document.getElementById('day').value
            : 'xx'

        valueMonth = document.getElementById('month').value.trim().length > 0
            ? document.getElementById('month').value
            : 'xx'
        valueYear = document.getElementById('year').value.trim().length > 0
            ? document.getElementById('year').value.trim()
            : 'xxxx'

        // Si no hay año o si el año es mayor
        if (valueYear === 'xxxx' || valueMonth === 'xx' || valueDay === 'xx' || valueYear > actuallyYear) {
            clearSpan()
            return;
        }
        // Si hay año y mes, vemos si el día ingresado está dentro dle rango de días de ese mes.
        daysMonth = new Date(parseInt(valueYear), parseInt(valueMonth), 0).getDate();
        inputDay = document.getElementById('day');
        if (daysMonth < parseInt(valueDay)) {
            inputDay.nextElementSibling.classList.remove('error');
            inputDay.nextElementSibling.classList.add('display-input');
            clearSpan()
            return
        } else {
            inputDay.nextElementSibling.classList.add('error');
            inputDay.nextElementSibling.classList.remove('display-input');
        }

        // dateTemp = `${valueYear}-${valueMonth}-${valueDay}`;
        newDate = new Date(parseInt(valueYear), parseInt(valueMonth) - 1, parseInt(valueDay));
        validDate = isValidDate(newDate) && newDate <= dateNow;
        // Si la fecha no es válida
        if (!validDate) {
            for (const label of labelsDate) {
                label.classList.add('invalid-date-label')
            }
            for (const input of inputsDate) {
                input.classList.add('invalid-date-input')
            }
            clearSpan()
        } else {
            for (const label of labelsDate) {
                label.classList.remove('invalid-date-label')
            }
            for (const input of inputsDate) {
                input.classList.remove('invalid-date-input')
            }
            let objDifferenceDate = dateDifference(dateNow, newDate);
            spanyear[0].innerHTML = objDifferenceDate.years.toString();
            spanmonth[0].innerHTML = objDifferenceDate.months;
            spandays[0].innerHTML = objDifferenceDate.days;
        }
    }
})();

