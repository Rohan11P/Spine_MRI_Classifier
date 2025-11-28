import React from 'react'

export default function RecentUploads({ items = [] }){
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-md font-medium text-slate-700">Recent uploads</h3>

      {items.length === 0 ? (
        <div className="mt-3 text-sm text-slate-500">No uploads yet.</div>
      ) : (
        <ul className="mt-3 space-y-2">
          {items.map(it => (
            <li key={it.id} className="p-2 border rounded bg-slate-50">
              <div className="text-sm font-medium">{it.fileName}</div>
              <div className="text-xs text-slate-500">{new Date(it.time).toLocaleString()}</div>
              <details className="mt-2 text-xs">
                <summary className="cursor-pointer">Result preview</summary>
                <pre className="mt-2 bg-white p-2 rounded text-xs">{JSON.stringify(it.result ?? it.result, null, 2)}</pre>
              </details>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
