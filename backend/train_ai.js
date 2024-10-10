const tf = require('@tensorflow/tfjs-node');

// Sample data - simple text input and labels
const texts = ['Hej hvordan har du det?', 'Jeg har det godt, tak!', 'Hvad laver du?', 'Jeg bygger en AI!'];
const labels = [0, 1, 0, 1]; // Dummy labels for simplicity

// Tokenize the text data
function tokenizeText(texts) {
  const tokenizer = {};
  let tokenIndex = 1;

  texts.forEach(text => {
    text.split(' ').forEach(word => {
      if (!tokenizer[word]) {
        tokenizer[word] = tokenIndex++;
      }
    });
  });

  return texts.map(text => text.split(' ').map(word => tokenizer[word] || 0));
}

const tokenizedTexts = tokenizeText(texts);
const maxLen = Math.max(...tokenizedTexts.map(seq => seq.length));

// Pad sequences to the same length
const paddedSequences = tokenizedTexts.map(seq => {
  const padded = new Array(maxLen).fill(0);
  seq.forEach((val, index) => (padded[index] = val));
  return padded;
});

// Convert the data to tensors
const inputTensor = tf.tensor2d(paddedSequences, [paddedSequences.length, maxLen]);
const labelTensor = tf.tensor2d(labels, [labels.length, 1]);

// Build a simple sequential model
const model = tf.sequential();
model.add(tf.layers.dense({ units: 8, activation: 'relu', inputShape: [maxLen] }));
model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));

// Compile the model
model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });

// Train the model
async function trainModel() {
  console.log('Training the model...');
  await model.fit(inputTensor, labelTensor, {
    epochs: 10,
    batchSize: 2,
    validationSplit: 0.2,
    callbacks: {
      onEpochEnd: (epoch, logs) => {
        console.log(`Epoch ${epoch + 1}: loss = ${logs.loss.toFixed(4)}, accuracy = ${logs.acc.toFixed(4)}`);
      },
    },
  });

  // Save the trained model to the file system
  await model.save('file://./backend/ai-model');
  console.log('Model training complete and saved to ./backend/ai-model');
}

trainModel();
