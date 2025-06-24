
import streamlit as st
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import tempfile
from langchain_community.document_loaders import PyPDFLoader
from openai import OpenAI

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Constants from your original code
OPENROUTER_API_BASE = "https://openrouter.ai/api/v1"
OPENROUTER_MODEL_NAME = "meta-llama/llama-3.3-70b-instruct:free"
OPENROUTER_API_KEY = "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"

# Initialize OpenAI client
client = OpenAI(
    base_url=OPENROUTER_API_BASE,
    api_key=OPENROUTER_API_KEY
)

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
    """Answer questions using your existing OpenAI integration"""
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

        # Prepare messages for LLM using your existing logic
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

        # Get response from OpenAI using your existing setup
        completion = client.chat.completions.create(
            model=OPENROUTER_MODEL_NAME,
            messages=messages_for_llm
        )
        answer = completion.choices[0].message.content

        return jsonify({
            'success': True,
            'answer': answer
        })

    except Exception as e:
        return jsonify({
            'success': False,
            'answer': f'Error: {str(e)}'
        }), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy'})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
