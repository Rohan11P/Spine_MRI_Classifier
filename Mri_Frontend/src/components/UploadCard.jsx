
import React, { useState, useRef } from 'react'
import axios from 'axios'

export default function UploadCard({ onResult }){
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const fileRef = useRef(null)

  // Configure backend upload URL here
  const UPLOAD_URL = '' // e.g. 'http://localhost:5000/api/predict'

  function handleFile(e){
    const f = e.target.files[0]
    if(!f) return
    if(!f.type.startsWith('image/')){
      setMessage({ type: 'error', text: 'Please select an image file.'})
      return
    }
    setMessage(null)
    setFile(f)
    const reader = new FileReader()
    reader.onload = () => setPreview(reader.result)
    reader.readAsDataURL(f)
  }

  async function handleSubmit(e){
    e.preventDefault()
    if(!file){ setMessage({type:'error', text:'Choose a file first.'}); return }
    if(!UPLOAD_URL){ setMessage({type:'info', text:'No backend configured. Set UPLOAD_URL in UploadCard.jsx to enable upload.'}); return }
    setLoading(true); setMessage(null)
    try{
      const form = new FormData()
      form.append('file', file, file.name)
      const res = await axios.post(UPLOAD_URL, form, { headers: {'Content-Type':'multipart/form-data'} })
      const data = res.data
      setMessage({ type:'success', text: 'Inference received.'})
      if(onResult) onResult({ fileName: file.name, time: new Date().toISOString(), data })
    }catch(err){
      setMessage({ type:'error', text: err.response && err.response.data ? JSON.stringify(err.response.data) : err.message })
    }finally{
      setLoading(false)
    }
  }

  function clearAll(){
    setFile(null); setPreview(null); setMessage(null)
    if(fileRef.current) fileRef.current.value = ''
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-medium text-slate-700">Upload image</h2>
      <p className="text-sm text-slate-500 mt-1">Accepted: PNG, JPG. For DICOM support, server-side conversion is recommended.</p>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="flex items-center gap-3">
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="block"/>
          <div className="flex items-center gap-2 ml-auto">
            <button type="submit" disabled={loading} className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-60">Analyze</button>
            <button type="button" onClick={clearAll} className="px-3 py-1 border rounded">Clear</button>
          </div>
        </div>

        {message && (
          <div className={`mt-3 p-3 rounded ${message.type==='error' ? 'bg-rose-50 text-rose-700' : message.type==='success' ? 'bg-emerald-50 text-emerald-700' : 'bg-sky-50 text-sky-700'}`}>
            {message.text}
          </div>
        )}

        {preview && (
          <div className="mt-4 grid grid-cols-1 gap-2">
            <div className="rounded overflow-hidden border">
              <img src={preview} alt="preview" className="w-full h-auto object-contain"/>
            </div>
            <div className="text-sm text-slate-600">File: {file.name} — {(file.size/1024).toFixed(1)} KB</div>
          </div>
        )}
      </form>
    </div>
  )
}
