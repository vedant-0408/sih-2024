import { useState, useEffect} from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import './Bot.css'; // Ensure the same CSS file is imported
// import Alert from "./Alert";

const Bot = () => {
    const [show, setShow] = useState(false);
    const [text, setText] = useState("");
    const [textList, setTextList] = useState([]);

//     const inputRef = useRef(null);

//     useEffect(() => {
//     const handleKeyPress = (event) => {
//       if (event.key === "Enter") {
//         event.preventDefault();
//         document.getElementById("send-button").click();
//       }
//     };

//     const input = inputRef.current;
//     input.addEventListener("keydown", handleKeyPress);

//     return () => {
//       input.removeEventListener("keydown", handleKeyPress);
//     };
//   }, []);

    const createChatLi = (message, className) => {
        const chatLi = document.createElement("li");
        chatLi.classList.add("chat", className);
        let chatContent = className === "outgoing"
            ? `<p></p>`
            : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
        chatLi.innerHTML = chatContent;
        const pElement = chatLi.querySelector("p");
        if (pElement) {
            pElement.textContent = message;
        }
        return chatLi;
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && text) {
            event.preventDefault(); // Prevent the default action of Enter key (such as form submission)
            handleChat();
        }
        else{
           
        }
    };
    // console.log(process.env.REACT_APP_API_KEY);
    // const API_KEY = process.env.REACT_APP_API_KEY;
    // console.log(API_KEY);

    const generateResponse = async (classN, userMessage) => {
        const genAI = new GoogleGenerativeAI("AIzaSyAHaW4rjCCWetJXH88TkmpHa41-rlzIFIk");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        try {
            const result = await model.generateContent(userMessage);
            console.log(result.response.text());
            classN.innerHTML = `<span class="material-symbols-outlined">smart_toy</span><p>${result.response.text()}</p>`;
            const chatbox = document.querySelector(".chatbox");
            chatbox?.scrollTo(0, chatbox.scrollHeight);
        } catch (error) {
            console.error("Error generating response:", error);
        }
    }

    const handleChat = () => {
        console.log(text);
        setTextList((textList) => [...textList, text]);

        const chatbox = document.querySelector(".chatbox");
        if (chatbox) {
            chatbox.appendChild(createChatLi(text, "outgoing"));
        } else {
            console.error("Element with class 'chatbox' not found.")
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

    useEffect(() => {
        console.log("Updated Text List:", textList);
    }, [textList]);

    return (
        <div className="show-chatbot">
            <button className="chatbot-toggler" onClick={() => setShow(!show)}>
                {show ? (
                    <span className="material-symbols-outlined">close</span>
                ) : (
                    <span className="material-symbols-outlined">mode_comment</span>
                )}
            </button>
            {show && (
                <div className="chatbot">
                    <header>
                        <h2>Chatbot</h2>
                    </header>
                    <ul className="chatbox">
                        <li className="chat incoming">
                            <span className="material-symbols-outlined">smart_toy</span>
                            <p>Hi there !! How can I help you today?</p>
                        </li>
                    </ul>
                    <div className="chat-input">
                        <textarea id="myInput"
                            // ref={inputRef}
                            onKeyDown={handleKeyDown}
                            placeholder="Enter a message..."
                            required
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        ></textarea>
                        {text !== "" && (
                            <button id="send-button" onClick={handleChat}>
                                <span id="send-btn" className="material-symbols-outlined">send</span>
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Bot;
