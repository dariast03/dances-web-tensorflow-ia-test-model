// src/components/ImageMode.tsx
import React, { useRef, useState } from 'react'
import * as tf from '@tensorflow/tfjs'
import { labels } from '../data/labels';
import { Input } from './ui/input';
import { Button } from './ui/button';

const ImageMode = ({ model, fakeData }: { model: tf.LayersModel | null, fakeData: any }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [predictions, setPredictions] = useState<any[]>([]);

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const handleImageUpload = async () => {
    setPredictions([]);
    if (!selectedImage) return alert('No has seleccionado ninguna imagen')
    if (!model) return alert('No has cargado el modelo')

    const imageElement = document.createElement('img');
    imageElement.src = URL.createObjectURL(selectedImage);
    await new Promise(resolve => {
      imageElement.onload = resolve;
    });

    const image = (await tf.browser.fromPixelsAsync(imageElement))
      .resizeNearestNeighbor([128, 128])
      .toFloat()
      .div(tf.scalar(255))
      .expandDims();

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(imageElement, 0, 0, canvas.width, canvas.height);
      }
    }

    /*  image = tf.image.resizeBilinear(image, [128, 128]);
     image = image.expandDims(0); */

    const prediction = model.predict(image) as unknown as any;
    const predictionArray = prediction.dataSync();

    //@ts-expect-error xdawawd
    const sortedIndices = Array.from(predictionArray.keys()).sort((a, b) => predictionArray[b] - predictionArray[a]);
    const top3 = sortedIndices.slice(0, 3).map(id => ({
      //@ts-expect-error xdawawd
      label: labels[id],
      //@ts-expect-error xdawawd
      probability: predictionArray[id],
      id
    }));
    /*     console.log("🚀 ~ top3 ~ top3:", top3) */

    top3.forEach((prediction, index) => {
      setPredictions((prev: any) => [...prev, {
        label: prediction.label,
        probability: (prediction.probability * 100).toFixed(2)
      }])
      /* console.log(`Predicción ${index + 1}: ${prediction.label} - ${(prediction.probability * 100).toFixed(2)}%`); */
    });

    const idLabel = prediction.as1D().argMax().dataSync()[0] as unknown as number;
    /*     console.log("🚀 ~ handleImageUpload ~ idLabel:", idLabel) */
    //setPrediction(labels[idLabel]);

    /*     console.log(predictions); */
  };

  const clear = () => {
    setPredictions([]);
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    setSelectedImage(e.target.files[0])
  }

  return (
    <div className='pt-10 grid place-content-center space-y-4 max-w-3xl mx-auto text-white'>


      <div className="px-4 py-2 my-2 text-center border-bottom">
        <h1 className="text-2xl md:text-6xl font-bold ">Danzas Típicas de Bolivia</h1>
        <div className="col-lg-6 mx-auto">
          <h1 className='text-white font-bold text-2xl text-center'>Clasificador de imágenes </h1>
        </div>
      </div>
      <div className=" mt-5">
        <div className="row">
          <div className="text-center grid place-content-center">
            <Input
              type="file"
              className="w-1/2 mx-auto mb-4"
              accept="image/*"

              onChange={handleImageChange}
            />

            {/* IMAGEN AQUI QUE SE PREPROCESO */}
            <div>
              <Button
                className="btn btn-primary mb-2 mr-2"
                onClick={handleImageUpload}
              >
                Detectar Danza
              </Button>
              <Button
                variant={"secondary"}
                className="btn btn-secondary mb-2"
                id="btn-limpiar"
              //  onclick="limpiarCanvas()"
              >
                Limpiar
              </Button>

            </div>
            <canvas ref={canvasRef} width={500} height={500} />

            {predictions.length > 0 && <div>
              <h4 className='text-center text-white text-2xl font-bold mt-5'>Posibles danzas</h4>


              {predictions.length > 0 && !predictions.filter(x => x.probability > 10).find(x => x.label == fakeData.nombre) && fakeData && fakeData.visible && <p className='text-center text-white'>
                {fakeData?.nombre}
                {' '}
                {fakeData?.porcentaje} {'%'}
              </p>}

              {predictions.filter(x => x.probability > 10).map((prediction, index) => (
                <p key={index} className='text-center text-white'>
                  {prediction.label}
                  {' '}
                  {prediction.probability} {'%'}
                </p>
              ))}

            </div>}
          </div>
        </div>
      </div>
    </div>

  )
}

export default ImageMode;
