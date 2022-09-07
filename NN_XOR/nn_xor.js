let training_data = [
	{
		inputs: [0, 0],
		targets: [0]
	},
	{
		inputs: [0, 1],
		targets: [1]
	},
	{
		inputs: [1, 0],
		targets: [1]
	},
	{
		inputs: [1, 1],
		targets: [0]
	}
];

let nn;
let lr_slider;

function setup() {
	
	nn = new NeuralNetwork(2, 4, 1);
	
	createCanvas(600, 600);
	background(0);
	// lr_slider = createSlider(0.1, 0.5, 0.1, 0.01);

}

function draw() {

	for (var i = 0; i < 1000; i++) {
		let data = random(training_data);
		nn.train(data.inputs, data.targets);
	}

	// nn.setLrate(lr_slider.value());

	let res = 8;
	let cols = width / res;
	let rows = height / res;

	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			let x1 = i / cols;
			let x2 = j / rows;
			let output = nn.feedforward([x1, x2])[0];
			fill(output * 255);
			rect(i * res, j * res, res, res);
		}
	}
}

