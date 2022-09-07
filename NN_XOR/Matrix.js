class Matrix {
	constructor(rows = 1, cols = 1, n = 0) {
		this.rows = rows;
		this.cols = cols;
		this.data = new Array();
		this.shape = {rows: this.rows, cols: this.cols}
		for(let i = 0; i < this.rows; i++) {
			this.data[i] = new Array();
			for(let j = 0; j < this.cols; j++) {
				this.data[i][j] = 0;
			}
		}
	}

	randomize() {
		for(let i = 0; i < this.rows; i++) {
			for(let j = 0; j < this.cols; j++) {
				let random = Math.random() * 2 - 1;
				this.data[i][j] = random;
			}
		}
	}

	static fromArray(input) {
		let newMatrix = new Matrix(input.length, 1);
		for (var i = 0; i < input.length; i++) {
			newMatrix.data[i][0] = input[i];
		}
		return newMatrix;
	}

	toArray() {
		let arr = new Array();
		for (var i = 0; i < this.rows; i++) {
			for (var j = 0; j < this.cols; j++) {
				arr.push(this.data[i][j]);
			}
		}
		return arr;
	}

	add(n = 1) {
		if(n instanceof Matrix) {
			for(let i = 0; i < this.rows; i++) {
				for(let j = 0; j < this.cols; j++) {
					this.data[i][j] += n.data[i][j];
				}
			} 
		}

		else {
			for(let i = 0; i < this.rows; i++) {
				for(let j = 0; j < this.cols; j++) {
					this.data[i][j] += n;
				}
			}
		}
	}

	static subtract(a, b) {
		let result = new Matrix(a.rows, a.cols);
		for(let i = 0; i < a.rows; i++) {
			for(let j = 0; j < a.cols; j++) {
				result.data[i][j] = a.data[i][j] - b.data[i][j];
			}
		}
		return result;
	}

	static multiply(a, b) {
		// Matrix multiplication
		let newMatrix = new Matrix(a.rows, b.cols);

		if(a.cols != b.rows) {
			console.error(`ShapeError: shape of a is (${a.rows}, ${a.cols}) and shape of b is (${b.rows}, ${b.cols})`)
			return ;
		}

		for(let i = 0; i < a.rows; i++) {
			let dummy = new Array(b.cols);
			for(let j = 0; j < b.cols; j++) {
				let sum = 0;
				for(let k = 0; k < a.cols; k++) {
					sum += a.data[i][k] * b.data[k][j];
				}
				dummy[j] = sum;
			}
			newMatrix.data[i] = dummy;
		}
		return newMatrix;
	}

	multiply(n = 1) {
		// Scalar multiplication
		if(n instanceof Matrix) {
			if(this.rows !== n.rows && this.cols !== n.cols) {
				console.error(`ShapeError: shape of a (${this.rows}, ${this.cols}) and shape of b (${n.rows}, ${n.cols}) should be equal`);
				return ;
			}
			// Hadamard Product
			for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.data[i][j] *= n.data[i][j];
        }
      }
		}
		// Scalar Product
		else {
			for(let i = 0; i < this.rows; i++) {
				for(let j = 0; j < this.cols; j++) {
					this.data[i][j] *= this.data[i][j] * n;
				}
			}
		}
		
	}

	static transpose(matrix) {
		let newMatrix = new Matrix(matrix.cols, matrix.rows);
		for(let i = 0; i < newMatrix.rows; i++) {
			for(let j = 0; j < newMatrix.cols; j++) {
				newMatrix.data[i][j] = matrix.data[j][i];
			}
		}
		return newMatrix;
	}

	map(fn) {
		for(let i = 0; i < this.rows; i++) {
			for(let j = 0; j < this.cols; j++) {
				this.data[i][j] = fn(this.data[i][j]);
			}
		}
	}

	static map(matrix, fn) {
		let result = new Matrix(matrix.rows, matrix.cols);
		for(let i = 0; i < matrix.rows; i++) {
			for(let j = 0; j < matrix.cols; j++) {
				result.data[i][j] = fn(matrix.data[i][j]);
			}
		}
		return result;
	}

	print() {
		console.table(this.data);
	}
}