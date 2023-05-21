newbut = document.getElementById('new'); // берем кнопочки
startbut = document.getElementById('start');
restart = document.getElementById('restart');

let version = document.querySelector('#version'); //забираем элемент параграфа
let fact = document.querySelector('#fact'); //забираем элемент параграфа
let counter = document.querySelector('#quant');
let record = document.querySelector('#record');
let block = document.querySelector('#block');
let winblock = document.querySelector('#winblock');

let classic = 'Вам необходимо собрать классическую версию игры, где фишки расположены от 1 до 15 в  порядке возрастания, заканчивая пустым полем.';
let unclassic = 'Вам необходимо собрать неклассическую версию игры, где фишки расположены от 1 до 13 в порядке возрастания, далее идет 15, затем 14, заканчивая пустым полем.';

let timerId; // объект таймера
let winh; // время прохождения игры: часы, минуты, секунды
let winm;
let wins;
let tiles = []; // массив с костяшками
let cells = []; // массив с ячейками
let numbers = []; // массив с последовательность. выпавших чисел
let best_time = 0;
let best_count = 0;
let invariant; // логическая переменная, содержащая инвариант
let Win = false; // логическая переменная с проверкой победы
let ide = 0;
let count = 0;

// библиотека с интересными фактами
let library = [
    'Старые версии головоломки «Пятнашки» часто имели фишку с номером 16, которая могла быть удалена для игры в нормальные «Пятнашки». Она была для того, чтобы можно было подумать над созданием «Магического квадрата». В данном случае «Магический квадрат» должен состоять из чисел от 1 до 16, которые располагаются таким образом, что каждый из четырёх рядов, каждый из четырёх столбцов и обе диагонали имеют сумму, равную 34.',
    'Однажды некий дантист привлёк внимание общественности, предложив $1000 за решение задачи: все фишки были размещены в правильном порядке, и только "14" и "15" были переставлены. Желающие найти решение забывали про еду, сон, учёбу и работу. Рассказывали об одном священнике, который простоял ночь под уличным фонарём и всё это время пытался вспомнить, как ему удалось переставить местами фишки "15" и "14". Никто из нашедших решение не мог вспомнить и повторить последовательность ходов, которая привела к победе.',
    'Чтобы подогреть интерес публики, выпускались новые виды пятнашек с большим количеством ячеек, использующие вместо цифр буквы и кусочки картинки. Так головоломка дожила до времен компьютерной техники, где ей тоже нашли применение. С 1960-х годов ее регулярно используют в исследованиях возможностей Искусственного Интелекта.',
    '«Пятнашки» приближаются к беспорядку постепенно, по одному шагу за раз. Многие другие системы, например, тающий лёд, рандомизируются таким же образом. Математики изучают это явление при помощи моделей под названием «цепи Маркова». Цепи Маркова — это формальный способ изучения любого процесса рандомизации, в котором последующая конфигурация системы зависит только от текущей конфигурации. Они находятся на самом острие математического понимания случайности.',
    '«Пятнашки» — самая популярная головоломка во всем мире на рубеже XIX и XX веков. Увлечение этой головоломкой называли "Пятнашечным сумасшествием". Игра распространялась стремительными темпами, мешая труду работников на фабриках, тогровцев в лавках и порождая множество новых задач и желающих их решить.',
    'Шифр скульптуры «Криптос» - головоломка, не дающая покоя миллионам ученых. Хранится реликвия во дворе здания ЦРУ в Штатах. Автором головоломки является скульптор Джим Сенборн. Своеобразный металлический свиток содержит 4 разных фрагмента текста, но найти ответ, каких именно, никому не удалось.'
]

// обновления таймера
function Update(starttime) {
    counter.innerHTML = count;

    let timer = document.getElementById('timer'); // берем блок, в котором будет таймер
    let date = new Date(); // заберем дату, текущие часы, минуты, секунды
    let hours0 = date.getHours();
    let minutes0 = date.getMinutes();
    let seconds0 = date.getSeconds();

    let time = hours0 * 60 * 60 + minutes0 * 60 + seconds0; // переведем текущее время в секунды
    time = time - starttime; // вычтем из текущего времени время старта

    let hours = Math.floor(time / 3600); // переведем секунды в часы, минуты и секунды
    let minutes = Math.floor((time - 3600 * hours) / 60);
    let seconds = Math.floor(time - 3600 * hours - 60 * minutes);

    if (hours < 10) hours = '0' + hours; // если часы, минуты, секунды состоят из
    timer.children[0].innerHTML = hours; // одной цифры, то добавим перед ней ноль


    if (minutes < 10) minutes = '0' + minutes;
    timer.children[1].innerHTML = minutes;


    if (seconds < 10) seconds = '0' + seconds;
    timer.children[2].innerHTML = seconds;
}

//функции для jquery
function PopUpShow() {
    ide = 1;
    WinHide(); // прячем окно победы
    cleaning(); // очищаем поле

    $("#popup").show(); // вызовем окно старта

    clearInterval(timerId); // остановка запусков функции таймера

    let timer = document.getElementById('timer'); // обнулим таймер
    timer.children[0].innerHTML = '00';
    timer.children[1].innerHTML = '00';
    timer.children[2].innerHTML = '00';
}

function howShow(){
    $("#how").show();
    setTimeout(howHide, 1800);
}

function howHide(){
    $("#how").hide();
}

function WinShow() {
    ide = 1;
    let wincount = count;
    cleaning(); // очищаем поле

    $("#winning").show(); // вызовем окно победы

    clearInterval(timerId); // остановка запусков функции таймера

    let ho = document.getElementById('ho'); // заберем время окончания игры
    let min = document.getElementById('min'); // перед тем, как стереть его
    let sec = document.getElementById('sec');
    let winquant = document.querySelector('#winquant'); // ходы

    winh = ho.textContent; // здесь записано ВРЕМЯ
    winm = min.textContent;
    wins = sec.textContent;

    let wintime = document.getElementById('wintime');
    wintime.children[0].innerHTML = winh;
    wintime.children[1].innerHTML = winm;
    wintime.children[2].innerHTML = wins;
    winquant.innerHTML = wincount;

    fact.innerHTML = library[Math.floor(Math.random() * (4 + 1))]; // выводим рандомный факт из
    // библиотеки

    if ((best_time == 0) && (best_count == 0)) {

        best_time = Number(winh) * 60 * 60 + Number(winm) * 60 + Number(wins);
        best_count = wincount;

    } else if ((best_time > Number(winh) * 60 * 60 + Number(winm) * 60 + Number(wins)) && (best_count > wincount)) {
        //рекорд по обоим пунктам
        let hours = Math.floor(best_time / 3600);
        let minutes = Math.floor((best_time - 3600 * hours) / 60);
        let seconds = Math.floor(best_time - 3600 * hours - 60 * minutes);

        if (hours < 10) hours = '0' + hours; // если часы, минуты, секунды состоят из
        if (minutes < 10) minutes = '0' + minutes;
        if (seconds < 10) seconds = '0' + seconds;
        record.innerHTML = 'Вы установили новый рекорд по времени и по количеству ходов!' +
            ' ' + 'Старый рекорд: ' + hours + ':' + minutes + ':' + seconds + ', ' + best_count;

        best_time = Number(winh) * 60 * 60 + Number(winm) * 60 + Number(wins);
        best_count = wincount;

    } else if (best_time > Number(winh) * 60 * 60 + Number(winm) * 60 + Number(wins)) {
        //рекорд по времени
        let hours = Math.floor(best_time / 3600);
        let minutes = Math.floor((best_time - 3600 * hours) / 60);
        let seconds = Math.floor(best_time - 3600 * hours - 60 * minutes);

        if (hours < 10) hours = '0' + hours; // если часы, минуты, секунды состоят из
        if (minutes < 10) minutes = '0' + minutes;
        if (seconds < 10) seconds = '0' + seconds;
        record.innerHTML = 'Вы установили новый рекорд по времени!' + ' ' + 'Старый рекорд: ' + hours + ':' + minutes + ':' + seconds;

        best_time = Number(winh) * 60 * 60 + Number(winm) * 60 + Number(wins);

    } else if (best_count > wincount) {
        //рекорд по количеству ходов
        record.innerHTML = 'Вы установили новый рекорд по количеству ходов!' +
            ' ' + 'Старый рекорд: ' + best_count;

        best_count = wincount;


    }
}

function PopUpHide() {
   // block.classList.add('hide');
    $("#popup").hide(); // спрячем всплывающее окно старта
 //   block.classList.remove('hide');
}

function WinHide() {
    $("#winning").hide(); // спрячем всплывающее окно победы
}

// создадим объект ячейки и вернем его
function createCellNull() {
    let cell = document.createElement('div');
    cell.classList.add('cell', 'cellnull'); // присваиваем объекту классы

    return cell;
}

// установим расположение ячейки
function setCellOffset(cell) {
    let left = 16 + (16 + 105) * cell.x; // сдвиг от родительского элемента вправо и вниз
    let top = 16 + (16 + 105) * cell.y;

    cell.style.left = left + 'px';
    cell.style.top = top + 'px';
}

// добавим ячейку в родительский элемент
function appendCell(cell) {
    $('#field').append(cell);
}

// запустим отрисовку игровых ячеек (нарисуем поле)
function createField() {
    for (let y = 0; y < 4; ++y) {
        for (let x = 0; x < 4; ++x) {
            let cell = createCellNull(); // создаем ячейки
            cell.y = y; // присваеваем ей номер столбца и строки от 0 до 3
            cell.x = x;

            setCellOffset(cell); // высчитываем положение ячейки в родительском элементе
            appendCell(cell); // добавляем ячейку в родительский элемент
            cells.push(cell); // добавляем ячейку в массив ячеек
        }
    }
}

// создадим объект костяшки и вернем его
function createTileNull() {
    let tile = document.createElement('div');
    tile.classList.add('cell', 'tilenull'); // присваиваем объекту классы

    return tile;
}

// установим расположение костяшки
function setTileOffset(tile) {
    let left = 16 + (16 + 105) * tile.x; // сдвиг от родительского элемента вправо и вниз
    let top = 16 + (16 + 105) * tile.y;

    tile.style.left = left + 'px';
    tile.style.top = top + 'px';
    tile.style.transition = 'all 0.3s ease-in-out'; // добавим костяшке анимацию
}

// добавим костяшку в родительский элемент
function appendTile(tile) {
    $('#field').append(tile);
}

// запустим отрисовку костяшек
function createTiles() {
    tiles = []; // очистим массив для повторных запусков
    for (let y = 0; y < 4; ++y) {
        for (let x = 0; x < 4; ++x) {
            let tile = createTileNull(); // создаем костяшки
            tile.y = y;
            tile.x = x;

            tile.number = 4 * tile.y + tile.x + 1; // вычислим номер костяшки и присвоим его ей

            setTileOffset(tile);

            if (tile.number !== 16) { // избежим создания 16-й ячейки
                tile.innerHTML = tile.number;
                appendTile(tile);
                tile.addEventListener('click', () => move(tile));
            }
            tiles.push(tile); // добавим костяшку в массив костяшек
        }
    }
}

function move(tile) {
    let FreeCell;
    for (let i = 0; i < 16; ++i) {
        if (tiles[i].number == 16) {
            FreeCell = tiles[i];
        }
    }

    if (((tile.x == FreeCell.x - 1) && (tile.y == FreeCell.y)) || ((tile.x - 1 == FreeCell.x) && (tile.y == FreeCell.y)) || ((tile.y == FreeCell.y - 1) && (tile.x == FreeCell.x)) || ((tile.y - 1 == FreeCell.y) && (tile.x == FreeCell.x))) {

        x = tile.x;
        y = tile.y;

        tile.x = FreeCell.x;
        tile.y = FreeCell.y;
        FreeCell.x = x;
        FreeCell.y = y;
        setTileOffset(tile);
        setTileOffset(FreeCell);
        count += 1;
    }
    win();
}

function shuffle(positions) { // тасование Фишера-Йетса
    for (let i = 15; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
        [positions[i], positions[j]] = [positions[j], positions[i]];
    }
}

// перемешаем костяшки
function randomize() {
    let positions = [];
    for (let i = 0; i < 16; ++i) { // забираем в массив позицию каждой костяшки в виде xy
        let position = String(tiles[i].x) + String(tiles[i].y);
        positions.push(position);
    }

    shuffle(positions); // мешаем элементы массива

    for (let a = 0; a < 16; ++a) {
        tiles[a].x = Math.floor(positions[a] / 10); // достаем x и y для каждой костяшки
        tiles[a].y = Math.floor(positions[a] % 10);
        setTileOffset(tiles[a]); // меняем положения костяшек на новые x и y
    }
}

function cleaning() {
    for (let i = 0; i < 16; ++i) {
        $(tiles[i]).remove(); // 16 раз удаляем из массива костяшки и ячейки
        $(cells[i]).remove()
    }
    version.textContent = 'Начните игру!';
}

// проверка четности инварианта
function invariantCheck() {
    let A = 0; // число пар
    let B = 0; // номер строки с пустой ячейкой
    UpdateNumbers(); // считаем позиции чисел

    for (let tile of tiles) {
        if (tile.number == 16) {
            B = tile.y + 1;
        }
    }

    for (let f = 0; f < 16; ++f) {
        for (let s = f + 1; s < 16; ++s) {
            if (numbers[f] > numbers[s]) {
                A += 1;
            }
        }
    }

    (A + B) % 2 == 0 ? invariant = true : invariant = false; // проверим четность суммы
}

// в зависимости от выпавшего инварианта изменяем условие победы
function updateVersion() {
    if (invariant) {
        version.textContent = classic; // замена на классический текст.
    } else {
        version.textContent = unclassic; // замена на неклассический текст.
    }
}

// обработка сдвига фишки вниз
function down() {
    let FreeCell; // введем свободную ячейку
    let UpTile; // введем фишку "над"
    for (let i = 0; i < 16; ++i) {
        if (tiles[i].number == 16) {
            FreeCell = tiles[i];
        }
    }
    for (let i = 0; i < 16; ++i) {
        if ((tiles[i].x == FreeCell.x) && (tiles[i].y + 1 == FreeCell.y)) {
            UpTile = tiles[i];
        }
    }

    if (FreeCell.y !== 0) { // проверим, есть ли фишка над пустым полем
        FreeCell.y -= 1;
        UpTile.y += 1;
        setTileOffset(UpTile);
        count += 1;
    }
    win(); // проверка победы
}

// обработка сдвига фишки влево
function left() {
    let FreeCell;
    let RightTile;
    for (let i = 0; i < 16; ++i) {
        if (tiles[i].number == 16) {
            FreeCell = tiles[i];
        }
    }
    for (let i = 0; i < 16; ++i) {
        if ((tiles[i].y == FreeCell.y) && (tiles[i].x - 1 == FreeCell.x)) {
            RightTile = tiles[i];
        }
    }

    if (FreeCell.x !== 3) {
        FreeCell.x += 1;
        RightTile.x -= 1;
        setTileOffset(RightTile);
        count += 1;
    }
    win();
}

// обработка сдвига фишки вправо
function right() {
    let FreeCell;
    let LeftTile;
    for (let i = 0; i < 16; ++i) {
        if (tiles[i].number == 16) {
            FreeCell = tiles[i];
        }
    }
    for (let i = 0; i < 16; ++i) {
        if ((tiles[i].y == FreeCell.y) && (tiles[i].x + 1 == FreeCell.x)) {
            LeftTile = tiles[i];
        }
    }

    if (FreeCell.x !== 0) {
        FreeCell.x -= 1;
        LeftTile.x += 1;
        setTileOffset(LeftTile);
        count += 1;
    }
    win();
}

// обработка сдвига фишки вверх
function up() {
    let FreeCell;
    let DownTile;
    for (let i = 0; i < 16; ++i) {
        if (tiles[i].number == 16) {
            FreeCell = tiles[i];
        }
    }
    for (let i = 0; i < 16; ++i) {
        if ((tiles[i].x == FreeCell.x) && (tiles[i].y - 1 == FreeCell.y)) {
            DownTile = tiles[i];
        }
    }

    if (FreeCell.y !== 3) {
        FreeCell.y += 1;
        DownTile.y -= 1;
        setTileOffset(DownTile);
        count += 1;
    }
    win();
}

// проверка победы по четному инварианту
function even() {
    let w = false; // временная переменная
    UpdateNumbers(); // заберем последовательность чисел

    for (let j = 1; j < 16; ++j) { // если элемент массива не равен числу от 1 до 16,
        if (j !== numbers[j - 1]) { // то возвращаем ложь и выходим из цикла
            w = false;
            break;
        } else {
            w = true; // иначе возвращаем правду
        }
    }
    Win = w;
    return Win;
}

// проверка победы по нечетному инварианту
function odd() {
    let w = false;

    UpdateNumbers();

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
    Win = w;
    return Win;
}

// обновляем массив с последовательность. чисел
function UpdateNumbers() {
    numbers.length = 0; // очищаем массив
    for (let y = 0; y < 4; ++y) {
        for (let x = 0; x < 4; ++x) {
            for (let tile of tiles) {
                if ((tile.x == x) && (tile.y == y) && (tile.number !== 16)) {
                    numbers.push(tile.number);
                }
            }
        }
    }
}

// функция проверки победы и запуска окна победы
function win() {
    if (invariant) { // проверка для четного инварианта
        even();
    } else { // проверка для нечетного инварианта
        odd();
    }
    if (Win) {
        setTimeout(WinShow, 900); // при победе запустим окно победы с небольшой задержкой
    }
}

// функция запуска игры вызовет все остальные функции после старта
function StartAGame() {
    howShow();
    count = 0;
    ide = 2;
    PopUpHide(); // спрячем всплывающее окно

    let date = new Date(); // заберем время старта в секундах
    let starttime = date.getHours() * 60 * 60 + date.getMinutes() * 60 + date.getSeconds() + 2;

    setTimeout(time, 1800, starttime); // первый раз запустим функцию

    createField(); // нарисуем игровые ячейки (поле)
    createTiles(); // нарисуем костяшки
    randomize(); // запустим перемешивание

    invariantCheck(); // проверка инварианта
    updateVersion(); // обновляем условие игры
}

function time(starttime) {
    timerId = setInterval(Update, 100, starttime); // установим перезапуск функции, считающей время в таймере
}

newbut.addEventListener('click', PopUpShow); // обработчики событий
startbut.addEventListener('click', StartAGame); // для кнопок
restart.addEventListener('click', PopUpShow);

$(document).ready(function () { // изначально при загрузке документа всплывающее окно видно
    PopUpShow();
    WinHide(); // изначально при загрузке документа всплывающее окно не видно
    howHide();
});

addEventListener('keydown', function (event) { // обработчик клавиатурных событий
    if (event.keyCode == 40) {
        down();
    }
    if (event.keyCode == 39) {
        right();
    }
    if (event.keyCode == 38) {
        up();
    }
    if (event.keyCode == 37) {
        left();
    }
});

addEventListener('keydown', function (enter) {
    if ((enter.keyCode == 13) && (ide == 1)) {
        StartAGame();

    } else if ((enter.keyCode == 13) && (ide == 2)) {
        console.log(ide);
        PopUpShow();
    }
})
