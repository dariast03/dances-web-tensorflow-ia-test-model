import 'rmc-tabs/assets/index.css'
import './App.css'
import { useEffect, useState } from 'react'
import * as tf from '@tensorflow/tfjs'
import { labels } from './data/labels'
import { Tabs } from 'rmc-tabs'
import ImageMode from './components/image-mode'
import CameraMode from './components/camera-mode'

//type Prediction = tf.Tensor<tf.Rank> | tf.Tensor<tf.Rank>[] | null

function App() {

  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [viewMode, setViewMode] = useState<string>('t1')
  const [model, setModel] = useState<tf.LayersModel | null>(null)
  const [prediction, setPrediction] = useState<any>(null);
  /* load mdel from assets/model */
  const loadModel = async () => {
    const model = await tf.loadLayersModel('assets/model/model.json')
    setModel(model)
  }


  const handleImageUpload = async () => {
    if (!selectedImage) return alert('No has seleccionado ninguna imagen')
    if (!model) return alert('No has cargado el modelo')

    const imageElement = document.createElement('img');
    imageElement.src = URL.createObjectURL(selectedImage);
    await new Promise(resolve => {
      imageElement.onload = resolve;
    });
    // Carga la imagen en un tensor
    let image = await tf.browser.fromPixelsAsync(imageElement);
    image = tf.image.resizeBilinear(image, [128, 128]);
    image = image.expandDims(0)
    // Carga tu modelo
    //   const model = await tf.loadLayersModel('ruta/a/tu/modelo.json');

    // Haz la predicción
    const prediction = model.predict(image) as unknown as any;

    const predictionArray = prediction.dataSync();

    // Obtén los índices ordenados de mayor a menor según la predicción
    //@ts-expect-error xdaw
    const sortedIndices = Array.from(predictionArray.keys()).sort((a, b) => predictionArray[b] - predictionArray[a]);

    // Extrae las tres predicciones más altas
    const top3 = sortedIndices.slice(0, 3).map(i => ({
      //@ts-expect-error xdaw
      label: labels[i],
      //@ts-expect-error xdaw
      probability: predictionArray[i]
    }));

    // Muestra las tres predicciones con sus porcentajes de certeza
    top3.forEach((prediction, index) => {
      console.log(`Predicción ${index + 1}: ${prediction.label} - ${(prediction.probability * 100).toFixed(2)}%`);
    });


    //console.log(prediction.);
    //prediction.print()
    //console.log("🚀 ~ handleImageUpload ~ prediction:",prediction.as1D().argMax().print())

    const idLabel = prediction.as1D().argMax().dataSync()[0] as unknown as number;

    // Aquí puedes procesar la predicción como quieras
    setPrediction(labels[idLabel]);
  };


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    setSelectedImage(e.target.files[0])
  }


  useEffect(() => {
    loadModel()
  }, [])

  return (
    /*   <div className="App">
      <h1>Clasificador de imágenes de baile</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleImageUpload}>Cargar imagen</button>
      {prediction && <p>La imagen de baile pertenece a la categoría: {prediction}</p>}
    </div> */

    /* @ts-expect-error xddd */
    <Tabs
      tabs={[
        { key: 't1', title: 'Imagen', },
        { key: 't2', title: 'Camara' },
      ]}
      initalPage={'t1'}
      tabBarBackgroundColor='white'
      onTabClick={(tab) => setViewMode(tab.key ?? "")}

    >
      <div key="t1">
        {viewMode === 't1' && (<ImageMode model={model} />)}
      </div>
      <div key="t2">
        {viewMode === 't2' && (<CameraMode model={model} />)}
      </div>
    </Tabs>
  )
}

export default App
