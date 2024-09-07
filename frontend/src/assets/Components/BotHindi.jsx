import { useState ,useRef,useEffect} from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import './Bot.css'; // Ensure the same CSS file is imported

const BotHindi = ({ isBotStarted, setIsBotStarted , selectedLanguage,setSelectedLanguage}) => {
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([
    {
      message: "नमस्ते !! आज मैं आपकी मदद करने में कैसे सक्षम हूं?",
      className: "incoming",
    },
  ]);
  const [isListening, setIsListening] = useState(false); // Track if microphone is on

  const chatboxRef = useRef(null);

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages]); // Scroll to bottom when messages change


  // Function to handle speech recognition
  const handleVoice = () => {
    // Check if browser supports SpeechRecognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.continuous = false; // Stop listening automatically after a pause

    recognition.onstart = () => {
      setIsListening(true); // Microphone is on
    };

    recognition.onresult = (e) => {
      const transcript = Array.from(e.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      setText(transcript); // Update the text field with recognized speech
      console.log(transcript);
    };

    recognition.onend = () => {
      setIsListening(false); // Microphone is off after recognition ends
    };

    if (isListening) {
      recognition.stop(); // Stop listening if already active
      setIsListening(false); // Ensure that microphone state is reset
    } else {
      recognition.start(); // Start listening if not active
    }
  };

  // Function to simulate API call and response generation
  const generateResponse = async (userMessage) => {
    try {
      const genAI = new GoogleGenerativeAI("AIzaSyAHaW4rjCCWetJXH88TkmpHa41-rlzIFIk");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(userMessage);
      const responseText = result.response.text();

      // Remove "typing..." message and add bot's actual response
      setMessages((prev) =>
        prev.filter((msg) => msg.message !== "मैं आपके लिए सर्वोत्तम उत्तर ढूंढ रही हूं...")
      );
      setMessages((prev) => [
        ...prev,
        { message: responseText, className: "incoming" },
      ]);
    } catch (error) {
      console.error("Error generating response:", error);
    }
  };

  // Function to handle sending and receiving messages
  const handleChat = async () => {
    // Add user's message to the message list
    setMessages((prev) => [...prev, { message: text, className: "outgoing" }]);

    const userMessage = text;
    setText(""); // Clear the text input
    

    // Add "Bot is typing..." message temporarily
    setMessages((prev) => [
      ...prev,
      { message: "मैं आपके लिए सर्वोत्तम उत्तर ढूंढ रही हूं...", className: "incoming" },
    ]);
    setText("");
    const chatbox = document.getElementsByClassName('chatbox')[0]; // Get the first element from the collection
if (chatbox) {
    chatbox.scrollTop = chatbox.scrollHeight; // Use scrollTop instead of scrollTo
}
    // Simulate bot typing delay and remove it when actual response is ready
    setTimeout(() => {
      generateResponse(userMessage);
    }, 600);
  };

  // Text-to-Speech function for reading each message
  const handleSpeech = (messageText) => {
    let utterance = new SpeechSynthesisUtterance(messageText);
    utterance.lang = 'hi-IN'; // Set language to Hindi
    utterance.volume = 1;   // Volume from 0 to 1
    utterance.rate = 1;     // Speech rate (1 is normal)
    utterance.pitch = 1;    // Pitch (1 is normal)

    // Speak the utterance
    const voices = speechSynthesis.getVoices();
    const hindiVoice = voices.find(voice => voice.lang === 'hi-IN');
    if (hindiVoice) {
        utterance.voice = hindiVoice;
    }

    speechSynthesis.speak(utterance);
  };

  // Function to copy text to clipboard
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        console.log("Text copied to clipboard");
      })
      .catch(err => {
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <div className={`bot-container ${isBotStarted ? "show-chatbot" : ""}`}>
      {/* <button className="chatbot-toggler" onClick={() => setShow(!show)}>
                {show ? (
                    // <span className="material-symbols-outlined">close</span>
                    <span>Close session</span>

                ) : (
                    // <span className="material-symbols-outlined">mode_comment</span>
                    <span>Get Started</span>
                )}
        </button> */}

      {isBotStarted && (
        <div className="chatbot">
          <header>
            <h2>ExploreBot 
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

          {/* Chatbox for rendering messages */}
          <ul className="chatbox" ref={chatboxRef}>
            {messages.map((msg, index) => (
              <li key={index} className={`chat ${msg.className}`}>
                {msg.className === "incoming" && (
                  <span className="material-symbols-outlined">smart_toy</span>
                )}
                <div className="ex-robot">
                <p>{msg.message}</p>
                {msg.className==="incoming" && ( <div className="chat-options">
                <button className="speak-button" onClick={() => handleSpeech(msg.message)}>
                  <span className="material-symbols-outlined">volume_up</span>
                </button>
                <button className="copy-button" onClick={() => handleCopy(msg.message)}>
                  <span className="material-symbols-outlined">content_copy</span>
                </button>
                </div>)}
               
                </div>
               
              </li>
            ))}
          </ul>

          <div className="chat-input">
            <textarea
              onKeyDown={(e) => e.key === "Enter" && text && handleChat()}
              placeholder="एक संदेश दर्ज करें..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            ></textarea>

            <div className="mic-send">
              <button className="send-button" onClick={handleVoice}>
                <span id="voice-button" className="material-symbols-outlined">
                  {isListening ? "mic_off" : "mic"}
                </span>
              </button>
              {text && (
                <button className="send-button" onClick={handleChat}>
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

export default BotHindi;
