// src/components/CameraMode.tsx
import React, { useRef, useEffect, useState } from 'react'
import * as tf from '@tensorflow/tfjs'
import { labels } from '../data/labels'

const CameraMode = ({ model }: { model: tf.LayersModel | null }) => {
          const videoRef = useRef<HTMLVideoElement>(null)
          const [prediction, setPrediction] = useState<any>(null)

          useEffect(() => {
                    if (navigator.mediaDevices.getUserMedia) {
                              navigator.mediaDevices.getUserMedia({ video: true })
                                        .then(stream => {
                                                  if (videoRef.current) {
                                                            videoRef.current.srcObject = stream
                                                  }
                                        })
                                        .catch(err => {
                                                  console.error('Error accessing webcam: ', err)
                                        })
                    }

                    return () => {
                              if (videoRef.current && videoRef.current.srcObject) {
                                        const stream = videoRef.current.srcObject as MediaStream
                                        const tracks = stream.getTracks()
                                        tracks.forEach(track => track.stop())
                              }
                    }
          }, [])

          useEffect(() => {
                    const interval = setInterval(async () => {
                              if (videoRef.current && model) {
                                        const video = videoRef.current
                                        let image = tf.browser.fromPixels(video)
                                        image = tf.image.resizeBilinear(image, [128, 128])
                                        console.log(image.pad([[0, 0], [0, 0], [128, 128]]).shape);// [7,7,256]


                                        image = image.expandDims(0)

                                        const prediction = model.predict(image) as unknown as any
                                        const predictionArray = prediction.dataSync()

                                        //@ts-expect-error awdadwa
                                        const sortedIndices = Array.from(predictionArray.keys()).sort((a, b) => predictionArray[b] - predictionArray[a])
                                        const top3 = sortedIndices.slice(0, 3).map(i => ({
                                                  //@ts-expect-error awdadwa
                                                  label: labels[i],
                                                  //@ts-expect-error awdadwa
                                                  probability: predictionArray[i]
                                        }))

                                        top3.forEach((prediction, index) => {
                                                  console.log(`Predicción ${index + 1}: ${prediction.label} - ${(prediction.probability * 100).toFixed(2)}%`)
                                        })

                                        const idLabel = prediction.as1D().argMax().dataSync()[0] as unknown as number
                                        setPrediction(labels[idLabel])
                              }
                    }, 1000)

                    return () => clearInterval(interval)
          }, [model])

          return (
                    <div>
                              <h1>Clasificador de imágenes en tiempo real</h1>
                              <video ref={videoRef} autoPlay width="640" height="480"></video>
                              {prediction && <p>La imagen de baile pertenece a la categoría: {prediction}</p>}
                    </div>
          )
}

export default CameraMode
