const figureSize = 4; // Площадь фигуры
const defaultArguments6 = [ // Массив аргументов для дерева построения фигуры (на примере 6*6)
	[1, -1, [-6, 6]],
	[6, -6, [1, -1]]
];
const showLogs = true;

function initializeResult(max) {
	var result = []
	for (var i = 0; i < max; i++) {
		result[i] = 0;
	}
	return result;
};

function printResult(result, y, max) {
	var count = 0;

	showLogs ? console.log('===== Field: =====') : '';
	for (var i = 0; i < y; i++) {
		var string = '';
		for (var j = 0; j < y; j++) {
			count += result[i*y + j];
			string += result[i*y + j]+' ';
		}
		showLogs ? console.log(string) : '';
	}
	showLogs ? console.log('===== Used figures: =====') : '';
	showLogs ? console.log(count/figureSize + '/' + max/figureSize) : '';

	if (count === max) {
		console.log('===== Success!!! =====');
	}
};

function check(y, max, result, a, b) {
	if ((b && ((a+b) === ( (a + b - a%y - b%y)/y )*y + 1)) || // проверка, что "следующий" квадрат не "переносится" на следующую/предыдущую строку)
		(a < 1) || // min
		(a > max) || // max
		(result[a - 1] === 1)) { // -1 потому что массив с 0, а ячейки с 1
		return false;
	} else {
		return true;
	}
};

function approveFigure(result, x) {
	var string = '';

	x.forEach(function(item) {
	 	result[item - 1] = 1; // -1 потому что массив с 0, а ячейки с 1
	 	string += item+' ';
	});

	showLogs ? console.log(string) : '';
};

function createFigures(x, y, max, result, arg) {
	if (check(y, max, result, x)) {
		for (var i1 = 0; i1 < 2; i1++) {
			var x0 = x + arg[i1][0];
			var x1 = x + arg[i1][1];
			if (check(y, max, result, x0, x) && check(y, max, result, x1, x)) {
				for (var i2 = 0; i2 < 2; i2++) {
					var x2 = x + arg[i1][2][i2];
					if (check(y, max, result, x2, x)) {
						approveFigure(result, [x, x0, x1, x2]);
						return false;
					}
				}
			}
		}
	}
};

function go(y, arg) { // Единичный запуск алгоритма
	const max = y*y;
	if (max%figureSize === 0) { // Проверка на то, возможно ли вообще заполнить область такого размера
		var result = initializeResult(max);
		showLogs ? console.log('===== ', y, ' =====') : '';
		showLogs ? console.log('===== Figures: =====') : '';
		for (var x = 0; x < max; x++) {
			createFigures(x+1, y, max, result, arg);
		};
		printResult(result, y, max);
	}
}

function createArguments(arg) {
	var Arguments = [];

	for (var i = 0; i < 2; i++) {
		for (var j = 0; j < 2; j++) {
			Arguments.push(
				[
					[arg[i][0], arg[i][1], [arg[i][2][j], arg[i][2][!j*1]]],
					[arg[!i*1][0], arg[!i*1][1], [arg[!i*1][2][j], arg[!i*1][2][!j*1]]]
				]
			);
		}
	};

	return Arguments;
};

function goAll(y) { // Запуск алгоритма со всеми возможными стратегиями
	const arg = [
		[1, -1, [-y, y]],
		[y, -y, [1, -1]]
	];

	var Arguments = createArguments(arg)

	Arguments.forEach(function(arg) {
	 	go(y, arg);
	});
};

function goFor(from, to) { // Запуск алгоритма со всеми возможными стратегиями на различных размерах поля
	for (var y = from; y < to + 1; y++) {
		goAll(y);
	};
};

goFor(6, 10);
// go(6, defaultArguments6);
// goAll(6);
