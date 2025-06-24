
const API_BASE_URL = 'http://localhost:5000/api'; // Flask backend URL

export interface DocumentProcessResponse {
  success: boolean;
  message: string;
  documentText?: string;
}

export interface ChatResponse {
  success: boolean;
  answer: string;
  error?: string;
}

export const documentAPI = {
  processDocuments: async (files: File[]): Promise<DocumentProcessResponse> => {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`file_${index}`, file);
    });

    try {
      const response = await fetch(`${API_BASE_URL}/process-documents`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error processing documents:', error);
      return {
        success: false,
        message: 'Failed to process documents. Please ensure your backend is running on port 5000.',
      };
    }
  },

  askQuestion: async (question: string, documentText: string, chatHistory: any[]): Promise<ChatResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/ask-question`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          documentText,
          chatHistory,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error asking question:', error);
      return {
        success: false,
        answer: 'Failed to get response. Please ensure your backend is running on port 5000.',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },
};
