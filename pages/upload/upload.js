import React, { useState } from 'react'
import storage from '../../db/storage'
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage'
const upload = () => {
  const [image, setImage] = useState(null)
  const [url, setUrl] = useState("")
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }


  const handleUpload = async () => {
    try {
      if (image == null) {
        return
      }
      setLoading(true)
      const imageRef = ref(storage, `creatorImage/${new Date().getTime()}_${image.name}`)

      const data = await uploadBytes(imageRef, image)
      console.log(data)

      const urlby = await getDownloadURL(data.ref)

      setUrl(urlby)
      console.log(url)
      setLoading(false)

    } catch (error) {
      setLoading(false)
      console.log(error)
    }

  }

  return (
    <>
     
        <h2>upload</h2>
        <input
        type='file'
        onChange={handleChange}
        />
        <button
        onClick={handleUpload}
        >
          upload
        </button>

        {url && (
          <div>
           <h1>url - {url}</h1>
          </div>
        )}
    
    </>
  )
}

export default upload