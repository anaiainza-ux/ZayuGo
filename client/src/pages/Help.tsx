import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Phone, Mail, MessageCircle, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useLocation } from 'wouter';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export default function Help() {
  const [, setLocation] = useLocation();
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  // todo: remove mock functionality
  const faqs: FAQ[] = [
    {
      id: '1',
      question: '¿Cómo puedo descargar mi boleto?',
      answer: 'Ve a la sección "Mis Boletos" y selecciona el partido. Luego presiona "Mostrar QR" para ver tu boleto digital.',
      category: 'tickets'
    },
    {
      id: '2',
      question: '¿Qué hago si mi boleto no funciona?',
      answer: 'Si tu código QR no escanea correctamente, contacta al personal del estadio o usa la opción de contacto en esta app.',
      category: 'tickets'
    },
    {
      id: '3',
      question: '¿Cómo llego al estadio?',
      answer: 'Usa la función "Ruta al Estadio" que te mostrará las mejores opciones de transporte y rutas en tiempo real.',
      category: 'navigation'
    },
    {
      id: '4',
      question: '¿Puedo cambiar el idioma de la app?',
      answer: 'Sí, puedes cambiar el idioma en tu perfil o usar el traductor integrado para frases específicas.',
      category: 'app'
    },
    {
      id: '5',
      question: '¿Qué objetos puedo llevar al estadio?',
      answer: 'Consulta las reglas del estadio. Generalmente se permiten banderas pequeñas, pero no objetos punzocortantes ni bebidas.',
      category: 'stadium'
    },
    {
      id: '6',
      question: '¿Hay WiFi en el estadio?',
      answer: 'Sí, la mayoría de estadios tienen WiFi gratuito. Busca la red "FIFAWC26" y sigue las instrucciones.',
      category: 'stadium'
    }
  ];

  const contactOptions = [
    {
      icon: Phone,
      title: 'Teléfono',
      description: '+52 81 1234-5678',
      action: () => console.log('Calling support'),
      buttonText: 'Llamar'
    },
    {
      icon: Mail,
      title: 'Email',
      description: 'support@zayu-go.com',
      action: () => console.log('Opening email'),
      buttonText: 'Enviar email'
    },
    {
      icon: MessageCircle,
      title: 'Chat en vivo',
      description: 'Disponible 24/7',
      action: () => console.log('Opening live chat'),
      buttonText: 'Iniciar chat'
    }
  ];

  const toggleFAQ = (faqId: string) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting contact form:', contactForm);
    // todo: integrate with support system
    setContactForm({ name: '', email: '', message: '' });
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
            <HelpCircle className="w-6 h-6" />
            Ayuda
          </h1>
        </header>

        <main className="px-6 pb-6 space-y-6">
          {/* Emergency Contact */}
          <Card className="border-red border-2">
            <CardHeader>
              <CardTitle className="text-red">Emergencia</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-3">Si tienes una emergencia en el estadio:</p>
              <Button 
                className="w-full bg-red text-white hover:bg-red/90"
                data-testid="button-emergency"
              >
                <Phone className="w-4 h-4 mr-2" />
                Llamar Seguridad: 911
              </Button>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-green">Preguntas Frecuentes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {faqs.map((faq) => (
                <div key={faq.id} className="border rounded-lg overflow-hidden">
                  <Button
                    variant="ghost"
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full justify-between text-left p-3 hover-elevate"
                    data-testid={`button-faq-${faq.id}`}
                  >
                    <span className="font-medium">{faq.question}</span>
                    {expandedFAQ === faq.id ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </Button>
                  {expandedFAQ === faq.id && (
                    <div className="p-3 pt-0 text-sm text-gray-600">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Contact Options */}
          <Card>
            <CardHeader>
              <CardTitle className="text-green">Contacto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {contactOptions.map((option, index) => {
                const IconComponent = option.icon;
                return (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green/10 rounded-lg">
                        <IconComponent className="w-5 h-5 text-green" />
                      </div>
                      <div>
                        <h3 className="font-medium text-green">{option.title}</h3>
                        <p className="text-sm text-gray-600">{option.description}</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={option.action}
                      className="hover-elevate"
                      data-testid={`button-contact-${option.title.toLowerCase()}`}
                    >
                      {option.buttonText}
                    </Button>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-green">Envíanos un mensaje</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600 block mb-2">
                    Nombre
                  </label>
                  <Input
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    placeholder="Tu nombre completo"
                    required
                    data-testid="input-contact-name"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600 block mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    placeholder="tu@email.com"
                    required
                    data-testid="input-contact-email"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600 block mb-2">
                    Mensaje
                  </label>
                  <Textarea
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    placeholder="Describe tu problema o pregunta..."
                    rows={4}
                    required
                    data-testid="textarea-contact-message"
                  />
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-lime text-green hover:bg-lime/90"
                  data-testid="button-submit-contact"
                >
                  Enviar Mensaje
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* App Info */}
          <Card>
            <CardContent className="p-4 text-center text-sm text-gray-600">
              <p>Zayu Go - FIFA World Cup 2026</p>
              <p>Versión 1.0.0</p>
              <p className="mt-2">Desarrollado para la mejor experiencia mundialista</p>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}