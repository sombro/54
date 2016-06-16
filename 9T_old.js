function createFigures(x, y, max, result) {
	if (check(y, max, result, x)) {
		var x0 = x;
		for (var i1 = 0; i1 < 2; i1++) {
			if (i1 === 0) {
				var x1 = x0 + 1;
				var x2 = x0 - 1;
				if (check(y, max, result, x1, x0) && check(y, max, result, x2, x0)) {
					for (var i2 = 0; i2 < 2; i2++) {
						if (i2 === 0) {
							var x3 = x0 - y;
							if (check(y, max, result, x3, x0)) {
								approveFigure(result, x0, x1, x2, x3);
								i2 = 2;
							}
						} else if (i2 === 1) {
							var x3 = x0 + y;
							if (check(y, max, result, x3, x0)) {
								approveFigure(result, x0, x1, x2, x3);
							}
						}
					}
				}
			} else if (i1 === 1) {
				var x1 = x0 + y;
				var x2 = x0 - y;
				if (check(y, max, result, x1, x0) && check(y, max, result, x2, x0)) {
					for (var i2 = 0; i2 < 2; i2++) {
						if (i2 === 0) {
							var x3 = x0 + 1;
							if (check(y, max, result, x3, x0)) {
								approveFigure(result, x0, x1, x2, x3);
								i2 = 2;
							}
						} else if (i2 === 1) {
							var x3 = x0 - 1;
							if (check(y, max, result, x3, x0)) {
								approveFigure(result, x0, x1, x2, x3);
							}
						}
					}
				}
			}
		}
	}
};
