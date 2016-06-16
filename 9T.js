const min = 1;
const max = 36;
var x;
const y = 6;

function initializeResult(result) {
	for (var i = 0; i < max; i++) {
		result[i] = 0;
	}
};

function printResult(result) {
	var string = '';
	var count = 0;
	var success = 'Success!'

	for (var i = 0; i < max; i++) {
		count += result[i];
		string += result[i]+'';
	}

	console.log(string, count);
	if (count === max) {
		console.log(sucess);
	}
};

function check(a, b) {
	if (b && ((a+b) === ( (a + b - a%y - b%y)/y )*y + 1)) { // проверка, что "следующий" квадрат не "переносится" на следующую/предыдущую строку)
		return false;
	}

	if (a < min) {
		return false;
	} else if (a > max) {
		return false;
	} else if (result[a - 1] === 1) { // -1 потому что массив с 0, а ячейки с 1
		return false;
	} else {
		return true;
	}
};

var result = [];
initializeResult(result);

function approveFigure(x1, x2, x3, x4) {
	result[x1 - 1] = 1; // -1 потому что массив с 0, а ячейки с 1
	result[x2 - 1] = 1;
	result[x3 - 1] = 1;
	result[x4 - 1] = 1;

	// console.log(result);
	console.log(x1, x2, x3, x4);
};

function createFigures(x) {
	for (var i1 = 0; i1 < 4; i1++) {
		var x0 = x;
		if (i1 === 0 && check(x0)) {
			// console.log('x0 ok', x0);
			var x1 = x0 - y;
			for (var i2 = 0; i2 < 3; i2++) {
				if (i2 === 0 && check(x1, x0)) {
					// console.log('x1 ok', x0, x1);
					var x2 = x1 - y;
					for (var i3 = 0; i2 < 2; i3++) {
						if (i3 === 0 && check(x2, x1)) {
							// console.log('x2 ok', x0, x1, x2);
							var x3 = x2 + y + 1;
							if (check(x3, x2)) {
								// console.log('x3 ok', x0, x1, x2, x3);
								approveFigure(x0, x1, x2, x3);
							}
						} else if (i3 === 1 && check(x2, x1)) {
							var x3 = x2 + y - 1;
							if (check(x3, x2)) {
								approveFigure(x0, x1, x2, x3);
							}
						} else {
							return false;
						}
					}
				// } else if (i2 === 1 && check(x1)) {
				// 	var x2 = x1 + 1;
				// 	//...
				// } else if (i2 === 2 && check(x1)) {
				// 	var x2 = x1 - 1;
				// 	//...
				} else {
					return false;
				}
			}
		} else {
			//...
			return false;
		}
	}
};

for (var x = 0; x < 36; x++) {
	createFigures(x+1);
};
printResult(result);

