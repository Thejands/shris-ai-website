import type { LanguageVoice } from '../types';

export const LANGUAGES: LanguageVoice[] = [
  {
    id: 'english-in',
    name: 'Indian English',
    nativeName: 'English (India)',
    code: 'en-IN',
    dialects: ['Neutral Corporate', 'Urban Contemporary', 'South Indian Nuance', 'North Indian Nuance'],
    status: 'Production',
    latency: '280ms',
    sampleText: 'Good afternoon! I am calling from Shris AI to confirm your consultation schedule for tomorrow.',
    audioDuration: '0:04'
  },
  {
    id: 'hindi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    code: 'hi-IN',
    dialects: ['Standard Khari Boli', 'Delhi Urban', 'Bhojpuri Inflected', 'Awadhi Nuance'],
    status: 'Production',
    latency: '295ms',
    sampleText: 'नमस्ते! मैं श्रिस एआई से बात कर रहा हूँ। क्या आप अपनी बुकिंग की पुष्टि करना चाहते हैं?',
    audioDuration: '0:05'
  },
  {
    id: 'tamil',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    code: 'ta-IN',
    dialects: ['Chennai Modern', 'Madurai Colloquial', 'Coimbatore Nuance'],
    status: 'Production',
    latency: '310ms',
    sampleText: 'வணக்கம்! உங்கள் அப்பாயின்ட்மென்ட் உறுதி செய்ய ஷ்ரிஸ் ஏஐ அழைக்கிறது.',
    audioDuration: '0:04'
  },
  {
    id: 'telugu',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    code: 'te-IN',
    dialects: ['Hyderabad Urban', 'Coastal Andhra', 'Rayalaseema Nuance'],
    status: 'Production',
    latency: '315ms',
    sampleText: 'నమస్కారం! మీ ఆర్డర్ వివరాలను ధృవీకరించడానికి ష్రిస్ ఏఐ కాల్ చేస్తోంది.',
    audioDuration: '0:05'
  },
  {
    id: 'kannada',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    code: 'kn-IN',
    dialects: ['Bengaluru Urban', 'Mysuru Classical', 'Hubballi-Dharwad'],
    status: 'Production',
    latency: '320ms',
    sampleText: 'ನಮಸ್ಕಾರ! ನಿಮ್ಮ ಸಮಾಲೋಚನೆ ವೇಳಾಪಟ್ಟಿಯನ್ನು ಖಚಿತಪಡಿಸಲು ಶ್ರಿಸ್ AI ಕರೆಯುತ್ತಿದೆ.',
    audioDuration: '0:05'
  },
  {
    id: 'malayalam',
    name: 'Malayalam',
    nativeName: 'മലയാളം',
    code: 'ml-IN',
    dialects: ['Central Travancore', 'Malabar Nuance', 'Kochi Urban'],
    status: 'Live Preview',
    latency: '330ms',
    sampleText: 'നമസ്കാരം! നിങ്ങളുടെ ബുക്കിംഗ് സ്ഥിരീകരിക്കുന്നതിനാണ് ഷ്രിസ് AI വിളിക്കുന്നത്.',
    audioDuration: '0:04'
  },
  {
    id: 'bengali',
    name: 'Bengali',
    nativeName: 'বাংলা',
    code: 'bn-IN',
    dialects: ['Kolkata Standard', 'Rarh Accent', 'North Bengal'],
    status: 'Production',
    latency: '305ms',
    sampleText: 'নমস্কার! আপনার স্বাস্থ্য পরীক্ষা সময়সূচী নিশ্চিত করতে শ্রিস এআই থেকে কল করা হচ্ছে।',
    audioDuration: '0:05'
  },
  {
    id: 'marathi',
    name: 'Marathi',
    nativeName: 'मराठी',
    code: 'mr-IN',
    dialects: ['Pune Standard', 'Mumbai Colloquial', 'Nagpur Vidarbha'],
    status: 'Production',
    latency: '310ms',
    sampleText: 'नमस्कार! आपल्या अपॉइंटमेंटची पुष्टी करण्यासाठी श्रीस एआय कडून संपर्क साधला आहे.',
    audioDuration: '0:04'
  },
  {
    id: 'gujarati',
    name: 'Gujarati',
    nativeName: 'ગુજરાતી',
    code: 'gu-IN',
    dialects: ['Ahmedabad Standard', 'Surati Nuance', 'Kathiyawadi'],
    status: 'Live Preview',
    latency: '325ms',
    sampleText: 'નમસ્તે! તમારી લોન અરજીની પ્રક્રિયા આગળ વધારવા માટે શ્રીસ AI કોલ કરી રહ્યું છે.',
    audioDuration: '0:05'
  },
  {
    id: 'punjabi',
    name: 'Punjabi',
    nativeName: 'ਪੰਜਾਬੀ',
    code: 'pa-IN',
    dialects: ['Majhi Standard', 'Doabi Nuance', 'Malwai'],
    status: 'Live Preview',
    latency: '335ms',
    sampleText: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਤੁਹਾਡੀ ਨਵੀਂ ਬੁਕਿੰਗ ਦੀ ਪੁਸ਼ਟੀ ਕਰਨ ਲਈ ਸ਼੍ਰਿਸ ਏਆਈ ਕਾਲ ਕਰ ਰਿਹਾ ਹੈ।',
    audioDuration: '0:04'
  }
];
