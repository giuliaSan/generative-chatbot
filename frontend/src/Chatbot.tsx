// src/pages/ChatbotPage.tsx

import React, { useState } from 'react';
import axios from "axios";
import Modal from './Modal';

const ChatbotPage: React.FC = () => {
  const [question, setQuestion] = useState<string>("");
  const [response, setResponse] = useState<string | null>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showDocuments, setShowDocuments] = useState<boolean>(false);

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };


  const handleSubmit = async () => {
    if (question.trim() === "") return;
  
    setLoading(true);
  
    try {
      const res = await axios.post(
        "http://localhost:8000/generate", 
        { query: question }, 
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      setResponse(res.data.response);
    } catch (error) {
      console.error("Error fetching response:", error);
    } finally {
      setLoading(false);
    }
  };
  
  
  const fetchDocuments = async () => {
    try {
      const res = await axios.get("http://localhost:8000/documents");
      setDocuments(res.data.documents); 
      setShowDocuments(true);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };
  

  return (
    <div className="w-full mx-auto p-6 space-y-6 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-6xl mx-auto p-4 space-y-4">
      <div className="max-w-4xl mx-auto p-4 space-y-4">
          <h1 className="text-2xl font-bold mt-2 mb-2">ChatBot</h1>
        </div>
        <div className="flex space-x-6">
      
        <div className="w-2/5">
        <div className="mb-4">
          <label htmlFor="question" className="block text-lg font-medium mb-2">
            Inserisci la tua domanda
          </label>
          <input
            id="question"
            type="text"
            value={question}
            onChange={handleQuestionChange}
            className="w-full p-3 border border-gray-300 focus:text-gray-700 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 ease-in-out"
            placeholder="Fai una domanda..."
          />
        </div>

        <div>
          <button
            onClick={handleSubmit}
            className="w-auto py-3 px-10 bg-pink-600 text-white font-semibold rounded-md hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-300 transition duration-200 ease-in-out"
          >
            Invia domanda
          </button>
        </div>
        </div>
        <div className="w-3/5">
          {loading ? (
            <div className="text-center text-xl">Caricamento...</div>
          ) : (
            response && (
              <div>
                <h2 className="text-xl font-semibold text-gray-300 mb-2">Risposta:</h2>
                <p className="p-4 rounded-md">{response}</p>
                <button
                  onClick={fetchDocuments}
                  className="mt-6 py-3 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200 ease-in-out"
                >
                  Mostra documenti
                </button>
              </div>
            )
          )}
        </div>
        <Modal show={showDocuments} onClose={() => setShowDocuments(false)} documents={documents} />
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
