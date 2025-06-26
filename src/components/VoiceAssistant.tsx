
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { useVoiceAssistant } from '@/hooks/useVoiceAssistant';
import { useToast } from '@/hooks/use-toast';

interface VoiceAssistantProps {
  onQuestionAsked: (question: string) => void;
  onResponseReceived?: (response: string) => void;
  isProcessing?: boolean;
}

const VoiceAssistant = ({ onQuestionAsked, onResponseReceived, isProcessing }: VoiceAssistantProps) => {
  const [lastResponse, setLastResponse] = useState<string>('');
  const { toast } = useToast();

  const {
    isListening,
    isSpeaking,
    isSupported,
    transcript,
    startListening,
    stopListening,
    speak,
    stopSpeaking
  } = useVoiceAssistant({
    onSpeechRecognized: (text) => {
      console.log('Speech recognized:', text);
      onQuestionAsked(text);
      stopListening();
    },
    onSpeechStart: () => {
      toast({
        title: "Listening...",
        description: "Speak your question about the document",
      });
    },
    onSpeechEnd: () => {
      console.log('Speech recognition ended');
    },
    onError: (error) => {
      toast({
        title: "Speech Recognition Error",
        description: `Error: ${error}`,
        variant: "destructive",
      });
    }
  });

  const handleSpeakResponse = (response: string) => {
    setLastResponse(response);
    speak(response);
    onResponseReceived?.(response);
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const toggleSpeaking = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else if (lastResponse) {
      speak(lastResponse);
    }
  };

  if (!isSupported) {
    return (
      <Card className="bg-red-50 border-red-200">
        <CardContent className="p-4">
          <p className="text-red-700">
            Voice features are not supported in your browser. Please use Chrome, Firefox, or Safari.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🎤 Voice Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button
            onClick={toggleListening}
            disabled={isProcessing}
            variant={isListening ? "destructive" : "default"}
            className="flex-1"
          >
            {isListening ? (
              <>
                <MicOff className="mr-2 h-4 w-4" />
                Stop Listening
              </>
            ) : (
              <>
                <Mic className="mr-2 h-4 w-4" />
                Start Listening
              </>
            )}
          </Button>
          
          <Button
            onClick={toggleSpeaking}
            disabled={!lastResponse}
            variant={isSpeaking ? "destructive" : "outline"}
          >
            {isSpeaking ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </Button>
        </div>

        {isListening && (
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-700 mb-1">🎙️ Listening...</p>
            <p className="text-sm text-gray-600">
              {transcript || "Say something..."}
            </p>
          </div>
        )}

        {isSpeaking && (
          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-green-700">🔊 Speaking...</p>
          </div>
        )}

        {isProcessing && (
          <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-700">🧠 Processing your question...</p>
          </div>
        )}

        <div className="text-xs text-gray-500 space-y-1">
          <p>💡 <strong>Tips:</strong></p>
          <ul className="list-disc list-inside space-y-1">
            <li>Click "Start Listening" and ask your question</li>
            <li>The assistant will automatically respond with voice</li>
            <li>Make sure your microphone is enabled</li>
            <li>Speak clearly and wait for the response</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceAssistant;
