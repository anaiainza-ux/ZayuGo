import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Languages, Copy, Volume2 } from 'lucide-react';
import { useLocation } from 'wouter';

interface Language {
  code: string;
  name: string;
  flag: string;
}

interface Translation {
  original: string;
  translated: string;
  fromLang: string;
  toLang: string;
}

export default function Translator() {
  const [, setLocation] = useLocation();
  const [inputText, setInputText] = useState('');
  const [fromLanguage, setFromLanguage] = useState('es');
  const [toLanguage, setToLanguage] = useState('en');
  const [translation, setTranslation] = useState<Translation | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);

  // todo: remove mock functionality
  const languages: Language[] = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  ];

  const quickPhrases = [
    { es: '¿Dónde está el baño?', en: 'Where is the bathroom?', category: 'basic' },
    { es: '¿Cuánto cuesta?', en: 'How much does it cost?', category: 'basic' },
    { es: 'No hablo inglés', en: 'I don\'t speak English', category: 'basic' },
    { es: '¿Dónde está la salida?', en: 'Where is the exit?', category: 'stadium' },
    { es: 'Mi asiento está aquí', en: 'My seat is here', category: 'stadium' },
    { es: '¿A qué hora empieza el partido?', en: 'What time does the match start?', category: 'stadium' },
  ];

  const mockTranslate = async (text: string, from: string, to: string): Promise<string> => {
    // todo: integrate with translation API
    setIsTranslating(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock translation logic
    const mockTranslations: Record<string, Record<string, string>> = {
      'Hola': { en: 'Hello', fr: 'Bonjour', de: 'Hallo' },
      '¿Cómo estás?': { en: 'How are you?', fr: 'Comment allez-vous?', de: 'Wie geht es dir?' },
      'Gracias': { en: 'Thank you', fr: 'Merci', de: 'Danke' },
    };
    
    setIsTranslating(false);
    return mockTranslations[text]?.[to] || `[Translated: ${text}]`;
  };

  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    
    try {
      const translatedText = await mockTranslate(inputText, fromLanguage, toLanguage);
      setTranslation({
        original: inputText,
        translated: translatedText,
        fromLang: fromLanguage,
        toLang: toLanguage
      });
    } catch (error) {
      console.error('Translation error:', error);
    }
  };

  const useQuickPhrase = (phrase: any) => {
    setInputText(phrase.es);
    setFromLanguage('es');
    setToLanguage('en');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    console.log('Copied to clipboard:', text);
  };

  const speak = (text: string, lang: string) => {
    // todo: integrate with speech synthesis
    console.log(`Speaking: "${text}" in ${lang}`);
  };

  return (
    <div className="bg-offwhite min-h-screen font-sans">
      <div className="w-full max-w-md mx-auto bg-offwhite">
        {/* Header */}
        <header className="p-6 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLocation('/')}
            className="hover-elevate active-elevate-2"
            data-testid="button-back"
          >
            <ArrowLeft className="w-6 h-6 text-green" />
          </Button>
          <h1 className="text-2xl font-bold text-green flex items-center gap-2" data-testid="text-page-title">
            <Languages className="w-6 h-6" />
            Traductor
          </h1>
        </header>

        <main className="px-6 pb-6 space-y-6">
          {/* Language Selection */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-600 block mb-2">Desde</label>
                  <Select value={fromLanguage} onValueChange={setFromLanguage}>
                    <SelectTrigger data-testid="select-from-language">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          {lang.flag} {lang.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    const temp = fromLanguage;
                    setFromLanguage(toLanguage);
                    setToLanguage(temp);
                  }}
                  className="mt-6 hover-elevate"
                  data-testid="button-swap-languages"
                >
                  ⇄
                </Button>
                
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-600 block mb-2">Hacia</label>
                  <Select value={toLanguage} onValueChange={setToLanguage}>
                    <SelectTrigger data-testid="select-to-language">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          {lang.flag} {lang.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Input Section */}
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600 block mb-2">
                    Texto a traducir
                  </label>
                  <Input
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Escribe aquí..."
                    className="w-full"
                    data-testid="input-text-to-translate"
                  />
                </div>
                
                <Button
                  onClick={handleTranslate}
                  disabled={!inputText.trim() || isTranslating}
                  className="w-full bg-lime text-green hover:bg-lime/90"
                  data-testid="button-translate"
                >
                  {isTranslating ? 'Traduciendo...' : 'Traducir'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Translation Result */}
          {translation && (
            <Card>
              <CardHeader>
                <CardTitle className="text-green">Traducción</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <p className="flex-1">{translation.translated}</p>
                    <div className="flex gap-1 ml-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard(translation.translated)}
                        className="h-8 w-8 hover-elevate"
                        data-testid="button-copy-translation"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => speak(translation.translated, translation.toLang)}
                        className="h-8 w-8 hover-elevate"
                        data-testid="button-speak-translation"
                      >
                        <Volume2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Phrases */}
          <Card>
            <CardHeader>
              <CardTitle className="text-green">Frases Rápidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {quickPhrases.map((phrase, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    onClick={() => useQuickPhrase(phrase)}
                    className="w-full justify-start text-left hover-elevate"
                    data-testid={`button-quick-phrase-${index}`}
                  >
                    <div>
                      <p className="font-medium">{phrase.es}</p>
                      <p className="text-sm text-gray-500">{phrase.en}</p>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}