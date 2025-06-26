
# DocuGenius - AI-Powered Document Learning Hub

A modern React frontend with Python backend for intelligent document Q&A using your proven Streamlit tools.

## 🚀 Quick Start

### Prerequisites
- Node.js and npm installed
- Python 3.8+ installed
- Git installed

### 1. Clone the Repository
```bash
git clone <YOUR_GITHUB_URL>
cd your-project-name
```

### 2. Setup Backend
```bash
# Install Python dependencies
python setup_backend.py
```

### 3. Setup Frontend
```bash
# Install Node.js dependencies
npm install
```

### 4. Run the Application

**Terminal 1 - Start Backend:**
```bash
python backend/app.py
```
You should see:
```
🚀 Starting DocuGenius Backend Server...
📄 Using PyPDFLoader for document processing
🤖 Using OpenRouter API for AI responses
🌐 Server will run on http://localhost:5000
```

**Terminal 2 - Start Frontend:**
```bash
npm run dev
```
You should see:
```
➜  Local:   http://localhost:8080/
```

### 5. Access the Application
Open your browser and go to: **http://localhost:8080**

## 🎯 How to Use

1. **Upload Documents**: Click "Choose Files" and select your PDF documents
2. **Ask Questions**: Type your questions about the uploaded documents
3. **Get AI Responses**: Receive intelligent answers based on your document content

## 🛠 Technical Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- Shadcn/ui components
- React Router for navigation
- Vite for development

### Backend
- Flask API server
- PyPDFLoader for document processing
- OpenAI client with OpenRouter API
- CORS enabled for frontend communication

## 📁 Project Structure
```
├── backend/
│   ├── app.py              # Flask backend server
│   └── requirements.txt    # Python dependencies
├── src/
│   ├── pages/
│   │   ├── Index.tsx       # Landing page
│   │   ├── ChatPage.tsx    # Chat interface
│   │   └── FeaturesPage.tsx# Features page
│   ├── services/
│   │   └── api.ts          # Backend API communication
│   └── App.tsx             # Main app component
├── setup_backend.py        # Backend setup script
└── README.md              # This file
```

## 🔧 Configuration

The backend uses your existing OpenRouter API configuration:
- API Base: `https://openrouter.ai/api/v1`
- Model: `meta-llama/llama-3.3-70b-instruct:free`
- API Key: Configured in `backend/app.py`

## 🚨 Troubleshooting

### Backend Issues
- **Port 5000 in use**: Change the port in `backend/app.py` and update `src/services/api.ts`
- **Module not found**: Run `python setup_backend.py` again
- **API errors**: Check your OpenRouter API key in `backend/app.py`

### Frontend Issues
- **Port 8080 in use**: Vite will automatically use the next available port
- **API connection failed**: Ensure backend is running on port 5000
- **Build errors**: Run `npm install` to ensure all dependencies are installed

### Common Solutions
1. **Backend not responding**: 
   ```bash
   # Check if backend is running
   curl http://localhost:5000/api/health
   ```

2. **CORS issues**: Backend has CORS enabled, but ensure both servers are running

3. **Document upload fails**: Check file format (only PDF supported) and file size

## 📝 Features

- ✅ Professional landing page with pricing and testimonials
- ✅ Modern chat interface
- ✅ PDF document processing
- ✅ AI-powered Q&A using your proven backend tools
- ✅ Chat history management
- ✅ Responsive design
- ✅ Real-time document processing feedback

## 🔄 Development Workflow

1. Make changes to frontend code
2. Changes auto-reload in browser (Vite hot reload)
3. For backend changes, restart `python backend/app.py`
4. Test functionality with document upload and questions

## 📞 Support

If you encounter issues:
1. Check that both backend and frontend are running
2. Verify Python dependencies are installed
3. Ensure Node.js dependencies are installed
4. Check browser console for frontend errors
5. Check terminal output for backend errors

---

Built with using your proven Streamlit backend tools in a modern React interface.
## Authors
. Vinayak Aili
. Dhanush R M
