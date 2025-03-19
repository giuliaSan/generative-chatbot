// src/pages/ChatbotPage.tsx

import React, { useState } from "react";
import axios from "axios";

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
            'Content-Type': 'application/json',  // optional but ensures proper content-type
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
      setDocuments(res.data.documents);  // make sure the backend returns an array in `documents`
      setShowDocuments(true);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };
  

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 bg-white">
      <div className="flex space-x-6">
     
      <div className="flex-1">
      <div className="mb-4">
        <label htmlFor="question" className="block text-lg font-medium mb-2 text-gray-700">
          Inserisci la tua domanda
        </label>
        <input
          id="question"
          type="text"
          value={question}
          onChange={handleQuestionChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
          placeholder="Fai una domanda..."
        />
      </div>

      <div>
        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200 ease-in-out"
        >
          Invia domanda
        </button>
      </div>
      </div>
      <div className="flex-1">
        {loading ? (
          <div className="text-center text-gray-500 text-xl">Caricamento...</div>
        ) : (
          response && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Risposta:</h2>
              <p className="bg-gray-100 p-4 rounded-md text-gray-700">{response}</p>
              <button
                onClick={fetchDocuments}
                className="mt-6 py-3 px-6 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-200 ease-in-out"
              >
                Mostra documenti correlati
              </button>
            </div>
          )
        )}
      </div>

      {showDocuments && (
        <div className="mt-8 bg-gray-50 p-6 rounded-md shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Documenti Correlati:</h3>
          {documents.length === 0 ? (
            <p className="text-gray-600">Nessun documento trovato.</p>
          ) : (
            <ul className="space-y-4">
              {documents.map((doc, index) => (
                <li key={index} className="p-4 bg-gray-200 rounded-md shadow-sm hover:bg-gray-300">
                  {doc}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      </div>
    </div>
  );
};

export default ChatbotPage;
