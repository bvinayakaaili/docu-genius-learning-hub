
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import tempfile
from langchain_community.document_loaders import PyPDFLoader
from openai import OpenAI

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Use OpenAI directly instead of OpenRouter
# You'll need to set your OpenAI API key as an environment variable
# or replace this with your actual OpenAI API key
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY', 'your-openai-api-key-here')

# Initialize OpenAI client
client = OpenAI(api_key=OPENAI_API_KEY)

def extract_text_from_uploads(uploaded_files):
    """Extract text from uploaded PDF files using your existing logic"""
    if not uploaded_files:
        return None

    full_text = ""
    for uploaded_file in uploaded_files:
        # Create temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as temp_file:
            temp_file.write(uploaded_file.read())
            temp_file_path = temp_file.name

        try:
            if uploaded_file.filename.lower().endswith(".pdf"):
                loader = PyPDFLoader(temp_file_path)
                documents = loader.load()
                for doc in documents:
                    full_text += doc.page_content + "\n"
            else:
                print(f"Unsupported file type: {uploaded_file.filename}")
        except Exception as e:
            print(f"Error processing file {uploaded_file.filename}: {e}")
        finally:
            if os.path.exists(temp_file_path):
                os.remove(temp_file_path)

    return full_text if full_text else None

@app.route('/')
def home():
    """Home route to test if server is running"""
    return jsonify({
        'message': 'DocuGenius Backend is running!',
        'status': 'healthy',
        'endpoints': [
            '/api/health',
            '/api/process-documents',
            '/api/ask-question'
        ]
    })

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy'})

@app.route('/api/process-documents', methods=['POST'])
def process_documents():
    """Process uploaded documents and extract text"""
    try:
        files = []
        for key in request.files:
            files.append(request.files[key])
        
        if not files:
            return jsonify({
                'success': False,
                'message': 'No files uploaded'
            }), 400

        document_text = extract_text_from_uploads(files)
        
        if document_text:
            return jsonify({
                'success': True,
                'message': f'Successfully processed {len(files)} file(s)',
                'documentText': document_text
            })
        else:
            return jsonify({
                'success': False,
                'message': 'Failed to extract text from documents'
            }), 400

    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error processing documents: {str(e)}'
        }), 500

@app.route('/api/ask-question', methods=['POST'])
def ask_question():
    """Answer questions using OpenAI API"""
    try:
        data = request.json
        question = data.get('question')
        document_text = data.get('documentText')
        chat_history = data.get('chatHistory', [])

        if not question:
            return jsonify({
                'success': False,
                'answer': 'No question provided'
            }), 400

        if not document_text:
            return jsonify({
                'success': False,
                'answer': 'No document text available. Please upload a document first.'
            }), 400

        # Check if OpenAI API key is set
        if OPENAI_API_KEY == 'your-openai-api-key-here':
            return jsonify({
                'success': False,
                'answer': 'OpenAI API key not configured. Please set your OPENAI_API_KEY environment variable or update the backend code with your API key.'
            }), 400

        # Prepare messages for OpenAI
        messages_for_llm = []
        system_prompt = "You are a helpful assistant. Answer the user's question based on the provided document text and chat history."
        context_prompt = f"Document Text:\n\n{document_text}\n\n"

        messages_for_llm.append({"role": "system", "content": system_prompt})
        messages_for_llm.append({"role": "system", "content": context_prompt})

        # Add chat history
        for msg in chat_history:
            if msg.get("role") in ["user", "assistant"]:
                messages_for_llm.append({
                    "role": msg["role"],
                    "content": msg["content"]
                })

        messages_for_llm.append({"role": "user", "content": question})

        # Get response from OpenAI
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",  # Using a more reliable and cost-effective model
            messages=messages_for_llm,
            max_tokens=1000,
            temperature=0.7
        )
        answer = completion.choices[0].message.content

        return jsonify({
            'success': True,
            'answer': answer
        })

    except Exception as e:
        print(f"Error in ask_question: {str(e)}")
        return jsonify({
            'success': False,
            'answer': f'Error: {str(e)}'
        }), 500

if __name__ == '__main__':
    print("🚀 Starting DocuGenius Backend Server...")
    print("📄 Using PyPDFLoader for document processing")
    print("🤖 Using OpenAI API for AI responses")
    print("🌐 Server will run on http://localhost:5000")
    print("💡 Make sure to start the React frontend on http://localhost:8080")
    print("\n✅ Available endpoints:")
    print("   GET  / - Home page")
    print("   GET  /api/health - Health check")
    print("   POST /api/process-documents - Upload documents")
    print("   POST /api/ask-question - Ask questions")
    print("\n⚠️  Important: Set your OpenAI API key as an environment variable:")
    print("   export OPENAI_API_KEY='your-actual-openai-api-key'")
    print("   Or replace 'your-openai-api-key-here' in the code with your actual key")
    app.run(debug=True, host='0.0.0.0', port=5000)
