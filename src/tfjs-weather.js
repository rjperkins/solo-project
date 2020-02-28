const tf = require('@tensorflow/tfjs-node')

const model = tf.sequential();
model.add(tf.layers.dense())