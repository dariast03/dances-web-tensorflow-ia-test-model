// src/components/ImageMode.tsx
import React, { useState } from 'react'
import * as tf from '@tensorflow/tfjs'
import { labels } from '../data/labels'

const ImageMode = ({ model }: { model: tf.LayersModel | null }) => {
          const [selectedImage, setSelectedImage] = useState<File | null>(null)
          const [prediction, setPrediction] = useState<any>(null);

          const handleImageUpload = async () => {
                    if (!selectedImage) return alert('No has seleccionado ninguna imagen')
                    if (!model) return alert('No has cargado el modelo')

                    const imageElement = document.createElement('img');
                    imageElement.src = URL.createObjectURL(selectedImage);
                    await new Promise(resolve => {
                              imageElement.onload = resolve;
                    });

                    let image = await tf.browser.fromPixelsAsync(imageElement);
                    image = tf.image.resizeBilinear(image, [128, 128]);
                    image = image.expandDims(0);

                    const prediction = model.predict(image) as unknown as any;
                    const predictionArray = prediction.dataSync();

                    //@ts-expect-error xdawawd
                    const sortedIndices = Array.from(predictionArray.keys()).sort((a, b) => predictionArray[b] - predictionArray[a]);
                    const top3 = sortedIndices.slice(0, 3).map(i => ({
                              //@ts-expect-error xdawawd
                              label: labels[i],
                              //@ts-expect-error xdawawd
                              probability: predictionArray[i]
                    }));

                    top3.forEach((prediction, index) => {
                              console.log(`Predicción ${index + 1}: ${prediction.label} - ${(prediction.probability * 100).toFixed(2)}%`);
                    });

                    const idLabel = prediction.as1D().argMax().dataSync()[0] as unknown as number;
                    setPrediction(labels[idLabel]);
          };

          const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                    if (!e.target.files) return
                    setSelectedImage(e.target.files[0])
          }

          return (
                    <div>
                              <h1>Clasificador de imágenes de baile</h1>
                              <input type="file" accept="image/*" onChange={handleImageChange} />
                              <button onClick={handleImageUpload}>Cargar imagen</button>
                              {prediction && <p>La imagen de baile pertenece a la categoría: {prediction}</p>}
                    </div>
          )
}

export default ImageMode;
