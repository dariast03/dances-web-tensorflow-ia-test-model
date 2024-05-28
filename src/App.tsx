import { useEffect, useState } from 'react'
import './App.css'
import * as tf from '@tensorflow/tfjs'

type Prediction = tf.Tensor<tf.Rank> | tf.Tensor<tf.Rank>[] | null

function App() {
  
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [model, setModel] = useState<tf.LayersModel | null>(null)
  const [prediction, setPrediction] = useState<Prediction>(null);
  /* load mdel from assets/model */
  const loadModel = async () => {
    const model = await tf.loadLayersModel('assets/model/model.json')
    setModel(model)
  }


  const handleImageUpload = async() => {
    if(!selectedImage) return alert('No has seleccionado ninguna imagen')
    if(!model) return alert('No has cargado el modelo')

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
    const prediction = model.predict(image);
//console.log(prediction.);

console.log("🚀 ~ handleImageUpload ~ prediction:", prediction)
    // Aquí puedes procesar la predicción como quieras
    setPrediction(prediction);
  };

  const getMetadataFromModelNoFromMetadaJons = async () => {
  
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(!e.target.files) return
    setSelectedImage(e.target.files[0])
  }

  
  useEffect(() => {
    loadModel()
  }, [])


 /*  console.log("🚀 ~ xd:", model)
  
  console.log("🚀 ~ App ~ prediction:", prediction) */
  return (
    <div className="App">
    <h1>Clasificador de imágenes de baile</h1>
    <input type="file" accept="image/*" onChange={handleImageChange} />
    <button onClick={handleImageUpload}>Cargar imagen</button>
    {prediction && <p>La imagen de baile pertenece a la categoría: {JSON.stringify(prediction)}</p>}
  </div>
  )
}

export default App
