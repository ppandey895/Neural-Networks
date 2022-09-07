
// Global Variables
var canvasWidth = 600;
var canvasHeight = 600;
var slope = 1.5;
var intercept = -0.2;

// Utility Functions
function f(x) {
	return slope * x + intercept;
}

function mapNum(num, istart, iend, fstart, fend) {
	var ratio = (fend - fstart) / (iend - istart);
	return fstart + (num - istart) * ratio;
}

class Perceptron {
	constructor() {
		this.weights = [Math.random(), Math.random()];
		this.bias = Math.random();
		this.learningRate = 1;
	}

	guess(inputs, target) {
		var w_sum = 0;
		for(var i = 0; i < this.weights.length; i++) {
			w_sum += inputs[i] * this.weights[i];
		}

		w_sum += this.bias;
		var guess = w_sum >= 0 ? 1 : -1;
		var error = target - guess;
		return {guess, error};
	}

	train(inputs, error) {
		for(var i = 0; i < this.weights.length; i++) {
			this.weights[i] += inputs[i] * error * this.learningRate;
		}
		this.bias += error;
	}

	guessY(x) {
		var m = this.weights[0] / this.weights[1];
		return - (m * x) - (this.bias / this.weights[1]);
	}
}

class Point {
	constructor(x = 2 * Math.random() - 1, y = 2 * Math.random() - 1) {
		this.cord = [x, y];
		this.label = this.cord[1] >= f(this.cord[0]) ? 1 : -1;
		this.pixelX = mapNum(this.cord[0], -1, 1, 0, canvasWidth);
		this.pixelY = mapNum(this.cord[1], -1, 1, canvasHeight, 0);
	}

	show(label = this.label) {
		if(label == 1) fill(100);
		else fill(200);

		ellipse(this.pixelX, this.pixelY, 10, 10);
	}
}

var brain = new Perceptron();
var points = [];
for(var i = 0; i < 200; i++) {
	points.push(new Point());
}
var iter = 0;

function setup() {
	createCanvas(canvasWidth, canvasHeight);

	var p1 = new Point(-1, f(-1));
	var p2 = new Point(1, f(1));
	line(p1.pixelX, p1.pixelY, p2.pixelX, p2.pixelY);

}

function draw() {
	noStroke();
	iter += 1;

	var totalCase = 0;
	var success = 0;

	if(iter % 50 == 0){

		for(var pt of points) {
			var {guess, error} = brain.guess(pt.cord, pt.label);

			brain.train(pt.cord, error);

			totalCase += 1;
			if(error == 0) {
				fill(100, 200, 50);
				success += 1;
			}

			else fill(200, 50, 25);
			ellipse(pt.pixelX, pt.pixelY, 15, 15);

			pt.show(guess);
		}
		

		console.log(`Network Accuracy: ${success * 100 / totalCase}%`);
		var p3 = new Point(-1, brain.guessY(-1));
		var p4 = new Point(1, brain.guessY(1));
		if(success === totalCase) {
			console.log(brain.weights);
			stroke(255, 50, 100);
			points = [];
			for(var i = 0; i < 500; i++) {
				points.push(new Point());
			}
		}
		else stroke(200, 200, 0);

		line(p3.pixelX, p3.pixelY, p4.pixelX, p4.pixelY);
	}
	
}