
Healthcare Image Uploader (Vite + React + Tailwind)
==================================================

What's included:
- Vite React project scaffold
- Tailwind CSS configuration for modern UI
- Axios for upload requests
- Components: UploadCard, RecentUploads, App layout

Running locally:
1. Install dependencies:
   npm install

2. Run developer server:
   npm run dev
   Open http://localhost:3000

How to configure backend endpoint:
- Edit src/components/UploadCard.jsx and set the UPLOAD_URL constant near the top of the file to your backend API (e.g., 'http://localhost:5000/api/predict').

Notes on healthcare UX choices:
- Clear, readable typography with high contrast for clinical settings.
- Large actionable buttons for quick interaction.
- Preview of the image and recent history for traceability.
- Accessible color choices and simple state messages (success/error/info).

If you want, I can also:
- Add authentication (JWT) + token storage in UI.
- Add DICOM preview support (client or server conversion).
- Wire this frontend to your existing backend and produce a final ZIP with both.

