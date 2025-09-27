import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, User, Mail, Globe, Edit, Save, X } from 'lucide-react';
import { useLocation } from 'wouter';

interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  preferredLanguage: string;
  avatar?: string;
}

export default function Profile() {
  const [, setLocation] = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<UserProfile>({
    // todo: remove mock functionality - get from authenticated user
    id: '1',
    firstName: 'Juan',
    lastName: 'Pérez',
    username: 'juanperez',
    email: 'juan@example.com',
    preferredLanguage: 'es'
  });
  const [editData, setEditData] = useState<UserProfile>(profileData);

  const languages = [
    { code: 'es', name: 'Español', flag: 'ES' },
    { code: 'en', name: 'English', flag: 'US' },
    { code: 'fr', name: 'Français', flag: 'FR' },
    { code: 'de', name: 'Deutsch', flag: 'DE' },
    { code: 'pt', name: 'Português', flag: 'BR' }
  ];

  const handleEdit = () => {
    setEditData(profileData);
    setIsEditing(true);
  };

  const handleSave = () => {
    // todo: integrate with API to save profile
    console.log('Saving profile:', editData);
    setProfileData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  const getLanguageName = (code: string) => {
    const lang = languages.find(l => l.code === code);
    return lang ? `[${lang.flag}] ${lang.name}` : code;
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="bg-offwhite min-h-screen font-sans">
      <div className="w-full max-w-md mx-auto bg-offwhite">
        {/* Header */}
        <header className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLocation('/')}
              className="hover-elevate active-elevate-2"
              data-testid="button-back"
            >
              <ArrowLeft className="w-6 h-6 text-green" />
            </Button>
            <h1 className="text-2xl font-bold text-green" data-testid="text-page-title">
              Mi Perfil
            </h1>
          </div>
          
          {!isEditing ? (
            <Button
              variant="outline"
              size="icon"
              onClick={handleEdit}
              className="hover-elevate active-elevate-2"
              data-testid="button-edit-profile"
            >
              <Edit className="w-4 h-4" />
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleCancel}
                className="hover-elevate active-elevate-2"
                data-testid="button-cancel-edit"
              >
                <X className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                onClick={handleSave}
                className="bg-lime text-green hover:bg-lime/90"
                data-testid="button-save-profile"
              >
                <Save className="w-4 h-4" />
              </Button>
            </div>
          )}
        </header>

        <main className="px-6 pb-6 space-y-6">
          {/* Avatar Section */}
          <Card>
            <CardContent className="p-6 text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src={profileData.avatar} />
                <AvatarFallback className="text-2xl bg-green text-white">
                  {getInitials(profileData.firstName, profileData.lastName)}
                </AvatarFallback>
              </Avatar>
              
              {!isEditing ? (
                <div>
                  <h2 className="text-xl font-bold text-green" data-testid="text-user-name">
                    {profileData.firstName} {profileData.lastName}
                  </h2>
                  <p className="text-gray-600" data-testid="text-username">
                    @{profileData.username}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      value={editData.firstName}
                      onChange={(e) => setEditData({...editData, firstName: e.target.value})}
                      placeholder="Nombre"
                      data-testid="input-first-name"
                    />
                    <Input
                      value={editData.lastName}
                      onChange={(e) => setEditData({...editData, lastName: e.target.value})}
                      placeholder="Apellido"
                      data-testid="input-last-name"
                    />
                  </div>
                  <Input
                    value={editData.username}
                    onChange={(e) => setEditData({...editData, username: e.target.value})}
                    placeholder="Nombre de usuario"
                    data-testid="input-username"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Profile Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-green flex items-center gap-2">
                <User className="w-5 h-5" />
                Información Personal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600 block mb-2">
                  Email
                </label>
                {!isEditing ? (
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span data-testid="text-email">{profileData.email}</span>
                  </div>
                ) : (
                  <Input
                    type="email"
                    value={editData.email}
                    onChange={(e) => setEditData({...editData, email: e.target.value})}
                    placeholder="tu@email.com"
                    data-testid="input-email"
                  />
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600 block mb-2">
                  Idioma Preferido
                </label>
                {!isEditing ? (
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <Globe className="w-4 h-4 text-gray-500" />
                    <span data-testid="text-language">
                      {getLanguageName(profileData.preferredLanguage)}
                    </span>
                  </div>
                ) : (
                  <Select 
                    value={editData.preferredLanguage} 
                    onValueChange={(value) => setEditData({...editData, preferredLanguage: value})}
                  >
                    <SelectTrigger data-testid="select-language">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          [{lang.flag}] {lang.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-green">Estadísticas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 bg-green/10 rounded-lg">
                  <div className="text-2xl font-bold text-green" data-testid="text-tickets-count">3</div>
                  <div className="text-sm text-gray-600">Boletos</div>
                </div>
                <div className="p-4 bg-gold/10 rounded-lg">
                  <div className="text-2xl font-bold text-gold" data-testid="text-matches-count">2</div>
                  <div className="text-sm text-gray-600">Partidos</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Actions */}
          <Card>
            <CardContent className="p-4 space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start hover-elevate"
                onClick={() => console.log('Change password')}
                data-testid="button-change-password"
              >
                Cambiar Contraseña
              </Button>
              
              <Button
                variant="outline"
                className="w-full justify-start hover-elevate"
                onClick={() => console.log('Privacy settings')}
                data-testid="button-privacy-settings"
              >
                Configuración de Privacidad
              </Button>
              
              <Button
                variant="outline"
                className="w-full justify-start text-red border-red hover:bg-red/10"
                onClick={() => console.log('Logout')}
                data-testid="button-logout"
              >
                Cerrar Sesión
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}