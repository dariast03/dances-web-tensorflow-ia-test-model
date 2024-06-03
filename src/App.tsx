import 'rmc-tabs/assets/index.css'
import './main.css'
import { useEffect, useState } from 'react'
import * as tf from '@tensorflow/tfjs'
import { labels } from './data/labels'
import { Tabs } from 'rmc-tabs'
import ImageMode from './components/image-mode'
import CameraMode from './components/camera-mode'
import HackMode from './components/hack-mode'
import deviceService from './services/device-service'
import { Toaster } from "@/components/ui/sonner"
//type Prediction = tf.Tensor<tf.Rank> | tf.Tensor<tf.Rank>[] | null

function App() {

  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [viewMode, setViewMode] = useState<string>('t1')
  const [model, setModel] = useState<tf.LayersModel | null>(null)
  const [selectedModel, setSelectedModel] = useState<"model" | "model-old" | "model-old-2">("model")
  const [prediction, setPrediction] = useState<any>(null);
  const [fakeData, setfakeData] = useState<any>(null);


  /* load mdel from assets/model */
  const loadModel = async (modelName: "model" | "model-old" | "model-old-2" = "model") => {
    const model = await tf.loadLayersModel(`assets/${modelName}/model.json`)
    setModel(model)
    setSelectedModel(modelName)
  }


  useEffect(() => {
    loadModel()
  }, [])



  useEffect(() => {
    deviceService.getByIdRealtime('4EuSOQMKWzbFhNeZQ17h', (x) => {
      setfakeData(x)
    })
  }, [])

  return (
    /*   <div className="App">
      <h1>Clasificador de imágenes de baile</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleImageUpload}>Cargar imagen</button>
      {prediction && <p>La imagen de baile pertenece a la categoría: {prediction}</p>}
    </div> */

    <div>
      {/* @ts-expect-error xddd  */}
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
          {viewMode === 't1' && (<ImageMode model={model} fakeData={fakeData} />)}
        </div>
        <div key="t2">
          {viewMode === 't2' && (<CameraMode model={model} fakeData={fakeData} />)}
        </div>
      </Tabs>

      {/* FLOA BUTTON WITH BOOSTRAP ON RIGT SCREEN */}
      <div className="fixed-bottom">
        <button className="" onClick={() => {
          if (selectedModel === "model") {
            loadModel("model-old")
          }
          else if (selectedModel === "model-old") {
            loadModel("model-old-2")
          } else if (selectedModel === "model-old-2") {
            loadModel("model")
          }
        }}>
          {selectedModel}
        </button>

      </div>

      <Toaster />
    </div>
  )
}

export default App
