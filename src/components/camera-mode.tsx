/* eslint-disable react-hooks/exhaustive-deps */
// src/components/CameraMode.tsx
import { useRef, useEffect, useState } from 'react'
import * as tf from '@tensorflow/tfjs'
import { labels } from '../data/labels'
import {
          Select,
          SelectContent,
          SelectGroup,
          SelectItem,
          SelectLabel,
          SelectTrigger,
          SelectValue,
} from "@/components/ui/select"
import { Button } from './ui/button'


const CameraMode = ({ model, fakeData }: { model: tf.LayersModel | null, fakeData: any }) => {
          console.log("🚀 ~ CameraMode ~ fakeData:", fakeData)
          const [cameraPermission, setCameraPermission] = useState<any>(null);


          const videoRef = useRef<HTMLVideoElement>(null)
          const [predictions, setPredictions] = useState<any[]>([]);

          const [devices, setDevices] = useState<MediaDeviceInfo[]>([])
          const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null)


          const [play, setPlay] = useState(false)

          const requestCameraPermission = async () => {
                    try {
                              await navigator.mediaDevices.getUserMedia({
                                        video: { facingMode: 'user' },
                              });
                              setCameraPermission(true);
                    } catch (error) {
                              setCameraPermission(false);
                    }
          };

          useEffect(() => {
                    requestCameraPermission();
          }, []);



          useEffect(() => {
                    const getDevices = async () => {
                              const devices = await navigator.mediaDevices.enumerateDevices()

                              const videoDevices = devices.filter(device => device.kind === 'videoinput')
                              setDevices(videoDevices)
                              if (videoDevices.length > 0) {
                                        setSelectedDeviceId(videoDevices[0].deviceId)
                              }
                    }

                    getDevices()
          }, [])


          useEffect(() => {
                    if (selectedDeviceId) {
                              navigator.mediaDevices.getUserMedia({
                                        video: {
                                                  deviceId: selectedDeviceId
                                        }
                              })
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
          }, [selectedDeviceId])

          useEffect(() => {
                    let interval: any = null

                    if (!play) {
                              interval && clearInterval(interval)
                              return
                    }

                    interval = setInterval(async () => {

                              setPredictions([]);
                              if (videoRef.current && model) {
                                        const video = videoRef.current
                                        let image = tf.browser.fromPixels(video)
                                        image = tf.image.resizeBilinear(image, [128, 128])
                                        image = image.expandDims(0)

                                        const prediction = model.predict(image) as unknown as any
                                        const predictionArray = prediction.dataSync()


                                        //@ts-expect-error eada
                                        const sortedIndices = Array.from(predictionArray.keys()).sort((a, b) => predictionArray[b] - predictionArray[a])
                                        const top3 = sortedIndices.slice(0, 3).map(i => ({
                                                  //@ts-expect-error eada
                                                  label: labels[i],
                                                  //@ts-expect-error eada
                                                  probability: predictionArray[i]
                                        }))

                                        top3.forEach((prediction) => {
                                                  setPredictions((prev: any) => [...prev, {
                                                            label: prediction.label,
                                                            probability: (prediction.probability * 100).toFixed(2)
                                                  }])
                                        })

                              }
                    }, 1000)



                    return () => clearInterval(interval)
          }, [model, play])


          if (!cameraPermission) return <div className='h-[calc(100vh-var(--header-height))] grid place-content-center space-y-4'>
                    <h1 className='text-white font-bold text-4xl text-center'>Clasificador de imágenes en tiempo real</h1>
                    <p className='text-white text-center'>No se puede acceder a la cámara, por favor permite el acceso a la cámara</p>
                    <Button onClick={() => requestCameraPermission()}>Solicitar Permiso</Button>
          </div>

          return (
                    <div className='pt-10 grid place-content-center space-y-4 max-w-2xl mx-auto'>
                              <h1 className='text-white font-bold text-4xl text-center'>Clasificador de imágenes en tiempo real</h1>

                              <Select value={selectedDeviceId || undefined} onValueChange={(e) => setSelectedDeviceId(e)}>
                                        <SelectTrigger className="w-full">
                                                  <SelectValue placeholder="Seleccioan una camara" />
                                        </SelectTrigger>
                                        <SelectContent>
                                                  <SelectGroup>
                                                            <SelectLabel>Camaras</SelectLabel>
                                                            {devices.map((device) => (
                                                                      <SelectItem key={device.deviceId} value={device.deviceId}>{device.label}</SelectItem>
                                                            ))}
                                                  </SelectGroup>
                                        </SelectContent>
                              </Select>

                              <video ref={videoRef} autoPlay width="100%" height="480"></video>

                              <Button onClick={() => {
                                        if (play) {
                                                  setPlay(false)
                                                  videoRef.current?.pause()
                                                  return
                                        }
                                        setPlay(true)
                                        videoRef.current?.play()
                              }}>{play ? "Detener reconocimiento" : "Empezar a capturar"}</Button>

                              {predictions.length > 0 && <div>
                                        <h4 className='text-center text-white text-2xl font-bold'>Posibles danzas</h4>


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
          )
}

export default CameraMode
