function sigmoid(x){	
	return 1 / (1 + Math.pow(Math.E, -x));
}

function dsigmoid(y) {
	// return sigmoid(x) * (1 - sigmoid(x));
	return y * (1 - y);
}

class NeuralNetwork {
	constructor(n_inputs, n_hidden, n_outputs) {
		this.input_nodes = n_inputs;
		this.hidden_nodes = n_hidden;
		this.output_nodes = n_outputs;

		this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes);	
		this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes);
		this.bias_h = new Matrix(this.hidden_nodes, 1);
		this.bias_o = new Matrix(this.output_nodes, 1);

		this.weights_ih.randomize(); 
		this.weights_ho.randomize();
		this.bias_h.randomize(); 
		this.bias_o.randomize();

		this.learningRate = 0.25;
	}

	setLrate(x) {
		this.learningRate = x;
	}

	feedforward(input) {
		let inputs = Matrix.fromArray(input);

		// Input Layer to Hidden Layer -->
		// Calculating the weighted sum and adding the bias
		let hidden = Matrix.multiply(this.weights_ih, inputs);
		hidden.add(this.bias_h);

		// Activation Function
		hidden.map(sigmoid);

		// Hidden Layer to Output Layer -->
		// Calculating the weighted sum and adding the bias
		let output = Matrix.multiply(this.weights_ho, hidden);
		output.add(this.bias_o);

		// Activation Function
		output.map(sigmoid);

		return output.toArray();
	}

	train(input_array, target_array) {
		let inputs = Matrix.fromArray(input_array);

		// Input Layer to Hidden Layer -->
		// Calculating the weighted sum and adding the bias
		let hidden = Matrix.multiply(this.weights_ih, inputs);
		hidden.add(this.bias_h);

		// Activation Function
		hidden.map(sigmoid);

		// Hidden Layer to Output Layer -->
		// Calculating the weighted sum and adding the bias
		let outputs = Matrix.multiply(this.weights_ho, hidden);
		outputs.add(this.bias_o);

		// Activation Function
		outputs.map(sigmoid);


		// -------- training starts here --------------
		let targets = Matrix.fromArray(target_array);

		// Calculating the error --> [TARGET - ERROR]
		let output_errors = Matrix.subtract(targets, outputs);

		// delta in weights_ho = LR * E * (O * (1 - O)) * H'
		let gradients = Matrix.map(outputs, dsigmoid);
		gradients.multiply(this.learningRate);
		gradients.multiply(output_errors); // Hadamard Product

		let hidden_T = Matrix.transpose(hidden);
		let deltas_weights_ho = Matrix.multiply(gradients, hidden_T);

		// Correcting the weights and biases between output and hidden by gradient descent
		this.weights_ho.add(deltas_weights_ho);
		this.bias_o.add(gradients);

		// Calculating errors of hidden using output errors
		let weights_ho_t = Matrix.transpose(this.weights_ho);
		let hidden_errors = Matrix.multiply(weights_ho_t, output_errors);

		// delta in weights_ih = LR * H.E. * (H * (1 - H)) * I'
		let hidden_gradients = Matrix.map(hidden, dsigmoid);
		hidden_gradients.multiply(this.learningRate);
		hidden_gradients.multiply(hidden_errors);	// Hadamard Product

		let inputs_T = Matrix.transpose(inputs);
		let deltas_weights_ih = Matrix.multiply(hidden_gradients, inputs_T);

		// Correcting the weights and biases between input and hidden by gradient descent
		this.weights_ih.add(deltas_weights_ih);
		this.bias_h.add(hidden_gradients);
	}
}