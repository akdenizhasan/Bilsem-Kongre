import React, { useState, useRef, useEffect } from 'react';
import { Message, AssistantConfig, ImageSize } from '../types';
import { generateFastResponse, generateThinkingResponse, generateImage } from '../services/geminiService';

const Assistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Merhaba! Ben Bilim ve Sanat Merkezi Akademik Kongresi yapay zeka asistanıyım. Size kongre temaları, bildiri yazımı veya akademik konularda nasıl yardımcı olabilirim?' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [config, setConfig] = useState<AssistantConfig>({ mode: 'fast', imageSize: '1K' });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text: inputText };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      if (config.mode === 'image') {
        if (config.imageSize !== '1K') {
          const hasKey = await (window as any).aistudio.hasSelectedApiKey();
          if (!hasKey) {
            await (window as any).aistudio.openSelectKey();
          }
        }

        const imageUrl = await generateImage(inputText, config.imageSize || '1K');
        if (imageUrl) {
          setMessages(prev => [...prev, { role: 'model', text: 'İsteğinize uygun görsel oluşturuldu.', image: imageUrl }]);
        } else {
          setMessages(prev => [...prev, { role: 'model', text: 'Görsel oluşturulurken bir hata oluştu.' }]);
        }
      } else if (config.mode === 'thinking') {
        const response = await generateThinkingResponse(inputText);
        setMessages(prev => [...prev, { role: 'model', text: response, isThinking: true }]);
      } else {
        const response = await generateFastResponse(inputText);
        setMessages(prev => [...prev, { role: 'model', text: response }]);
      }
    } catch (err: any) {
      if (err?.message?.includes("Requested entity was not found")) {
        setMessages(prev => [...prev, { role: 'model', text: 'Bu işlem için geçerli bir API anahtarı seçilmelidir.' }]);
        await (window as any).aistudio.openSelectKey();
      } else {
        console.error("AI Assistant error:", err);
        setMessages(prev => [...prev, { role: 'model', text: 'Bir hata oluştu, lütfen daha sonra tekrar deneyin.' }]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 h-[calc(100vh-120px)] flex flex-col">
      <div className="flex flex-col md:flex-row gap-6 h-full">
        <div className="w-full md:w-64 flex-shrink-0 space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
               <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
               </svg>
               Asistan Ayarları
            </h3>
            <div className="space-y-4">
              <label className="block">
                <span className="text-sm font-medium text-gray-700">Çalışma Modu</span>
                <select 
                  value={config.mode}
                  onChange={(e) => setConfig({...config, mode: e.target.value as any})}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-gray-50 p-2"
                >
                  <option value="fast">Hızlı Yanıt (Gemini 3 Flash)</option>
                  <option value="thinking">Düşünme Modu (Gemini 3 Pro)</option>
                  <option value="image">Görsel Oluşturma</option>
                </select>
              </label>
              {config.mode === 'image' && (
                <label className="block">
                  <span className="text-sm font-medium text-gray-700">Görsel Çözünürlüğü</span>
                  <select 
                    value={config.imageSize}
                    onChange={(e) => setConfig({...config, imageSize: e.target.value as ImageSize})}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-gray-50 p-2"
                  >
                    <option value="1K">1K (Standard)</option>
                    <option value="2K">2K (High Res - Pro)</option>
                    <option value="4K">4K (Ultra HD - Pro)</option>
                  </select>
                </label>
              )}
            </div>
            <div className="mt-6 pt-6 border-t border-gray-100">
               <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Kullanılan Modeller</div>
               <p className="text-xs text-gray-500 mt-2">
                 Fast: Gemini 3 Flash Preview<br/>
                 Thinking: Gemini 3 Pro Preview<br/>
                 Image: Gemini 2.5 Flash / 3 Pro
               </p>
            </div>
          </div>
        </div>
        <div className="flex-grow flex flex-col bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex-grow overflow-y-auto p-4 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-2xl ${
                  m.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-gray-100 text-gray-800 rounded-tl-none'
                }`}>
                  {m.isThinking && (
                    <div className="flex items-center space-x-1 mb-2 text-[10px] font-bold uppercase tracking-tighter text-blue-800 bg-blue-100 w-fit px-1.5 py-0.5 rounded">
                       <svg className="w-3 h-3 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                       Derin Düşünme Aktif
                    </div>
                  )}
                  <p className="whitespace-pre-wrap leading-relaxed text-sm">{m.text}</p>
                  {m.image && (
                    <img src={m.image} alt="Generated" className="mt-3 rounded-lg max-w-full shadow-sm" />
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-4 rounded-2xl rounded-tl-none flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-100 bg-gray-50 flex space-x-2">
            <input 
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={config.mode === 'image' ? "Oluşturulacak görseli tarif edin..." : "Mesajınızı yazın..."}
              className="flex-grow rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 px-4 py-3 text-sm"
            />
            <button 
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-sm"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Assistant;