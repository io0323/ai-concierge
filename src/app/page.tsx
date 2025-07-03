"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";

// Three.js はクライアント限定なので動的読み込み
const CharacterCanvas = dynamic(() => import("../components/CharacterCanvas"), {
  ssr: false,
});

type Message = {
  from: "user" | "bot";
  text: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  // AIが回答中かどうかの状態
  const [isBotThinking, setIsBotThinking] = useState(false);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Web Speech APIはこのブラウザでサポートされていません");
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "ja-JP";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const text = event.results[0][0].transcript;
      setMessages((msgs) => [...msgs, { from: "user", text }]);
      generateResponse(text);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;
  }, []);

  function startListening() {
    if (recognitionRef.current && !listening) {
      setListening(true);
      recognitionRef.current.start();
    }
  }

  async function generateResponse(text: string) {
    const knowledgeKeywords = ["何時", "いつ", "誰", "どこ", "何日", "曜日"];
    const usePerplexity = knowledgeKeywords.some((keyword) => text.includes(keyword));

    let botResponse = "";

    if (usePerplexity) {
      try {
        const res = await fetch("/api/perplexity", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text }),
        });
        const data = await res.json();
        botResponse = data.reply;
      } catch (err) {
        console.error("Perplexity API error:", err);
        botResponse = "Perplexity APIの取得中にエラーが発生しました。";
      }
    } else {
      botResponse = "「" + text + "」について教えてください。";
    }

    setIsBotThinking(true); // botメッセージ表示直前でON
    setMessages((msgs) => [...msgs, { from: "bot", text: botResponse }]);
    speak(botResponse);
  }

  function speak(text: string) {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "ja-JP";
    utter.onend = () => setIsBotThinking(false); // 読み上げ終了時にOFF
    window.speechSynthesis.speak(utter);
  }

  return (
    <div className="relative min-h-screen h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 text-gray-800 flex flex-col overflow-hidden">
      {/* 装飾的な背景要素 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-pink-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-20 right-20 w-24 h-24 bg-purple-200 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-blue-200 rounded-full opacity-25 animate-ping"></div>
        <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-yellow-200 rounded-full opacity-20 animate-pulse"></div>
      </div>

      {/* タイトル：中央上部 */}
      <header className="w-full text-center py-6 absolute top-0 left-0 z-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">
          ✨ AIコンシェルジュ ✨
        </h1>
      </header>

      {/* メインエリア：チャット枠とキャラクター枠を横並びで同サイズ表示 */}
      <main className="flex flex-1 w-full items-center justify-center pt-24 pb-24 gap-6 h-[calc(100vh-80px)]">
        {/* キャラクター枠 */}
        <section className="flex-1 max-w-md bg-white/80 backdrop-blur-sm rounded-3xl p-4 flex items-center justify-center h-full min-h-0 shadow-2xl border-2 border-pink-200 hover:border-purple-300 transition-all duration-300">
          <div className="w-full h-full flex items-center justify-center">
            <CharacterCanvas isThinking={isBotThinking} />
          </div>
        </section>
        {/* チャット枠 */}
        <section className="flex-1 max-w-md bg-white/80 backdrop-blur-sm rounded-3xl p-4 overflow-auto flex flex-col items-center h-full min-h-0 shadow-2xl border-2 border-blue-200 hover:border-purple-300 transition-all duration-300">
          <div className="w-full flex-1 flex flex-col justify-end overflow-auto">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`my-2 p-3 rounded-2xl max-w-[80%] shadow-md ${
                  msg.from === "user"
                    ? "bg-gradient-to-r from-pink-400 to-purple-400 text-white self-end"
                    : "bg-gradient-to-r from-blue-400 to-purple-400 text-white self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ボタン：中央下部 */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
        <button
          onClick={startListening}
          disabled={listening}
          className={`px-10 py-5 rounded-full font-bold text-lg shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 ${
            listening
              ? "bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 text-white"
          }`}
        >
          {listening ? "🎤 聞き取り中…" : "💬 話しかける"}
        </button>
      </div>
    </div>
  );
}