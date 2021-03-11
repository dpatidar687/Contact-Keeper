import React,{ useRef, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const Speech = (props)=> {
   
        
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);
  const microphoneRef = useRef(null);
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <div className="mircophone-container">
        Browser is not Support Speech Recognition.
      </div>
    );
  }
  const handleListing = () => {  
    if(!isListening){
    setIsListening(true);
    microphoneRef.current.classList.add("listening");
    SpeechRecognition.startListening({
      continuous : false
    });
    // passText();
  }
  else {
    setIsListening(false);
    microphoneRef.current.classList.remove("listening");
    passText();
  }
  };
  const passText = async ()=>{
      const data = transcript;
      if (data){
        props.speechData(data);
      }
  }
  const stopHandle = () => {
    setIsListening(false);
    microphoneRef.current.classList.remove("listening");
    SpeechRecognition.stopListening();

  };

  return (

      <div className="mircophone-container">
        <div
          className="microphone-icon-container"
          ref={microphoneRef}
          onClick={handleListing}
        >
          <i class="fas fa-microphone-alt fa-2x"></i>
        </div>
    </div>
  );
}
export default Speech;