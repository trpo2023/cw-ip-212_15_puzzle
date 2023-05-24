const odd = (numbers) => {
    let w = false;

    if ((numbers[14] == 14) && (numbers[13] == 15)) { // проверяем, на правильных ли местах фишки 15 и 14
        for (let j = 1; j < 14; ++j) {
            if (j !== numbers[j - 1]) {
                w = false;
                break;
            } else {
                w = true;
            }
        }
    }
    return w;
}

const even = (numbers) => {
    let w = false; // временная переменная

    for (let j = 1; j < 16; ++j) { // если элемент массива не равен числу от 1 до 15,
        if (j !== numbers[j - 1]) { // то возвращаем false и выходим из цикла
            w = false;
            break;
        } else {
            w = true; // иначе возвращаем true
        }
    }
    return w;
}

module.exports = { 
    odd,
    even,
};