import { useState, useEffect } from "react";
import './Bot.css'; // Import the CSS file

const Bot = ({ isBotStarted, setIsBotStarted,selectedLanguage,setSelectedLanguage }) => {
  const [text, setText] = useState("");
  const [textList, setTextList] = useState([]);

  const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    chatLi.innerHTML = `${className === "outgoing" ? '<p></p>' : '<span class="material-symbols-outlined">smart_toy</span><p></p>'}`;
    const pElement = chatLi.querySelector("p");
    if (pElement) {
      pElement.textContent = message;
    }
    return chatLi;
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && text) {
      event.preventDefault();
      handleChat();
    }
  };

  const generateResponse = async (classN, userMessage) => {
    try {
      // Simulating a response
      setTimeout(() => {
        classN.innerHTML = `<span class="material-symbols-outlined">smart_toy</span><p>Generated Response for: ${userMessage}</p>`;
        const chatbox = document.querySelector(".chatbox");
        chatbox?.scrollTo(0, chatbox.scrollHeight);
      }, 1000);
    } catch (error) {
      console.error("Error generating response:", error);
    }
  };

  const handleChat = async () => {
    const chatbox = document.querySelector(".chatbox");
    if (chatbox) {
      chatbox.appendChild(createChatLi(text, "outgoing"));
    }
    let userMessage = text;
    setText("");
    setTimeout(() => {
      const incomingChatLi = createChatLi("Thinking...", "incoming");
      chatbox?.appendChild(incomingChatLi);
      chatbox?.scrollTo(0, chatbox.scrollHeight);
      generateResponse(incomingChatLi, userMessage);
    }, 600);
    chatbox?.scrollTo(0, chatbox.scrollHeight);
  };

  const handleVoice = () => {
    window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.interimResults = true;

    recognition.addEventListener("result", (e) => {
      const transcript = Array.from(e.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      setText(transcript);
    });

    recognition.start();
  };

  const handleSpeech = () => {
    let utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-GB';
    const voices = speechSynthesis.getVoices();
    const hindiVoice = voices.find(voice => voice.lang === 'hi-IN');
    if (hindiVoice) {
      utterance.voice = hindiVoice;
    }
    speechSynthesis.speak(utterance);
  };

  return (
    <div className={`bot-container ${isBotStarted ? "show-chatbot" : ""}`}>
      {isBotStarted && (
        <div className="chatbot">
          <header>
            <h2>
              ExploreBot 
              <div>
            <button onClick={() => {
              if(selectedLanguage==="english"){
                setSelectedLanguage("hindi");
              }
              else{
                setSelectedLanguage("english");
              }
            }}>
            <span className="material-symbols-outlined">translate</span>
            </button>
            <button onClick={() => setIsBotStarted(false)}>
            <span className="material-symbols-outlined">close</span>
            </button>
            </div>
            </h2>
          </header>
          <ul className="chatbox">
            <li className="chat incoming">
              <span className="material-symbols-outlined">smart_toy</span>
              <p>Hi there! How can I help you today?</p>
            </li>
          </ul>
          <div className="chat-input">
            <textarea
              onKeyDown={handleKeyDown}
              placeholder="Enter a message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
            <div className="mic-send">
              <button id="send-button" onClick={handleVoice}>
                <span id="voice-button" className="material-symbols-outlined">mic</span>
              </button>
              <button id="send-button" onClick={handleSpeech}>
                <span id="speech-button" className="material-symbols-outlined">text_to_speech</span>
              </button>
              {text !== "" && (
                <button id="send-button" onClick={handleChat}>
                  <span id="send-btn" className="material-symbols-outlined">send</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bot;
