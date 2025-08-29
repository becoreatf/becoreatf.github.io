import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Settings, 
  Users, 
  FileText, 
  BarChart3, 
  Shield, 
  LogOut,
  Plus,
  Edit,
  Trash2,
  Eye,
  Save,
  X,
  Search,
  Download,
  Database,
  Home,
  Mail,
  Globe,
  Tag,
  Type,
  BookOpen,
  Atom,
  CheckCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { siteConfig } from '../../config/siteConfig';
import { useMessages } from '../../contexts/MessageContext';
import type { Message } from '../../contexts/MessageContext';
import type { SiteConfig } from '../../config/siteConfig';





const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { messages, markAsRead, markAsReplied, deleteMessage, getUnreadCount } = useMessages();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editedConfig, setEditedConfig] = useState<SiteConfig>(() => {
    const savedConfig = localStorage.getItem('siteConfig');
    return savedConfig ? JSON.parse(savedConfig) : siteConfig;
  });

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'messages', label: 'Mesajlar', icon: MessageSquare },
    { id: 'content', label: 'İçerik Yönetimi', icon: FileText },
    { id: 'settings', label: 'Ayarlar', icon: Settings },
    { id: 'analytics', label: 'Analitik', icon: Database }
  ];

  const filteredMessages = messages.filter(msg =>
    msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteMessage = (messageId: string) => {
    deleteMessage(messageId);
    setSelectedMessage(null);
  };

  const saveConfig = () => {
    try {
      // Değişiklikleri localStorage'a kaydet
      localStorage.setItem('siteConfig', JSON.stringify(editedConfig));
      
      // Başarı mesajı göster
      alert('Değişiklikler başarıyla kaydedildi!');
      
      // Edit modunu kapat
      setEditMode(false);
      
      // Sayfayı yenile (değişikliklerin uygulanması için)
      window.location.reload();
    } catch (error) {
      console.error('Config kaydedilirken hata oluştu:', error);
      alert('Değişiklikler kaydedilirken bir hata oluştu!');
    }
  };

  const handleLogout = () => {
    // Gerçek uygulamada context'ten logout çağrılır
    navigate('/admin');
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl bg-gradient-to-br from-neutron-cyan/10 to-neutron-cyan/5 border border-neutron-cyan/20"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-neutron-cyan/20 border border-neutron-cyan/30">
              <MessageSquare className="w-6 h-6 text-neutron-cyan" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Toplam Mesaj</p>
              <p className="text-white text-2xl font-bold">{messages.length}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-2xl bg-gradient-to-br from-safety-yellow/10 to-safety-yellow/5 border border-safety-yellow/20"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-safety-yellow/20 border border-safety-yellow/30">
              <Eye className="w-6 h-6 text-safety-yellow" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Okunmamış</p>
                             <p className="text-white text-2xl font-bold">
                 {getUnreadCount()}
               </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-green-500/20 border border-green-500/30">
              <Users className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Ekip Üyeleri</p>
              <p className="text-white text-2xl font-bold">{editedConfig.team.members.length}</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10">
          <h3 className="text-white text-lg font-semibold mb-4">Son Mesajlar</h3>
          <div className="space-y-3">
            {messages.slice(0, 3).map((message) => (
              <div
                key={message.id}
                className="p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
                onClick={() => setSelectedMessage(message)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">{message.name}</p>
                    <p className="text-gray-400 text-sm">{message.subject}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {message.status === 'unread' && (
                      <div className="w-2 h-2 bg-neutron-cyan rounded-full" />
                    )}
                    <span className="text-gray-500 text-xs">{message.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10">
          <h3 className="text-white text-lg font-semibold mb-4">Hızlı İşlemler</h3>
          <div className="space-y-3">
            
            <button 
              onClick={() => setActiveTab('content')}
              className="w-full p-3 rounded-xl bg-safety-yellow/10 border border-safety-yellow/20 text-safety-yellow hover:bg-safety-yellow/20 transition-colors flex items-center gap-3"
            >
              <Edit className="w-4 h-4" />
              İçerik Düzenle
            </button>
            <button className="w-full p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500/20 transition-colors flex items-center gap-3">
              <Download className="w-4 h-4" />
              Rapor İndir
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMessages = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Mesajlarda ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-neutron-cyan/30"
            />
          </div>
          <select className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-neutron-cyan/30">
            <option value="">Tüm Durumlar</option>
            <option value="unread">Okunmamış</option>
            <option value="read">Okunmuş</option>
            <option value="replied">Yanıtlandı</option>
          </select>
        </div>
        <button className="px-4 py-2 bg-neutron-cyan/10 border border-neutron-cyan/20 text-neutron-cyan rounded-xl hover:bg-neutron-cyan/20 transition-colors flex items-center gap-2">
          <Download className="w-4 h-4" />
          Dışa Aktar
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="space-y-2">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedMessage?.id === message.id
                    ? 'bg-neutron-cyan/10 border-neutron-cyan/30'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
                onClick={() => {
                  setSelectedMessage(message);
                  markAsRead(message.id);
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-white font-medium">{message.name}</p>
                  {message.status === 'unread' && (
                    <div className="w-2 h-2 bg-neutron-cyan rounded-full" />
                  )}
                </div>
                <p className="text-gray-400 text-sm mb-1">{message.subject}</p>
                <p className="text-gray-500 text-xs">{message.date}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          {selectedMessage ? (
            <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white text-xl font-semibold">Mesaj Detayı</h3>
                <div className="flex items-center gap-2">
                                     <button
                     onClick={() => markAsReplied(selectedMessage.id)}
                     className="p-2 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500/20 transition-colors"
                   >
                     Yanıtla
                   </button>
                   <button
                     onClick={() => handleDeleteMessage(selectedMessage.id)}
                     className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors"
                   >
                     <Trash2 className="w-4 h-4" />
                   </button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 text-sm">Gönderen</p>
                  <p className="text-white font-medium">{selectedMessage.name}</p>
                  <p className="text-neutron-cyan">{selectedMessage.email}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Konu</p>
                  <p className="text-white font-medium">{selectedMessage.subject}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Tarih</p>
                  <p className="text-white">{selectedMessage.date}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Mesaj</p>
                  <p className="text-white leading-relaxed">{selectedMessage.message}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400">Mesaj seçin</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderContentManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-white text-xl font-semibold">İçerik Yönetimi</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setEditMode(!editMode)}
            className="px-4 py-2 bg-neutron-cyan/10 border border-neutron-cyan/20 text-neutron-cyan rounded-xl hover:bg-neutron-cyan/20 transition-colors flex items-center gap-2"
          >
            {editMode ? <X className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
            {editMode ? 'İptal' : 'Düzenle'}
          </button>
          {editMode && (
            <button
              onClick={saveConfig}
              className="px-4 py-2 bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl hover:bg-green-500/20 transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Kaydet
            </button>
          )}
        </div>
      </div>

      {/* Site Bilgileri */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10">
        <h4 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5" />
          Site Bilgileri
        </h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="text-gray-400 text-sm flex items-center gap-2">
              <Tag className="w-4 h-4" />
              Site Adı
            </label>
            <input
              type="text"
              value={editedConfig.siteName}
              onChange={(e) => setEditedConfig(prev => ({ ...prev, siteName: e.target.value }))}
              disabled={!editMode}
              className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-neutron-cyan/30"
            />
          </div>
          <div>
            <label className="text-gray-400 text-sm flex items-center gap-2">
              <Type className="w-4 h-4" />
              Proje Adı
            </label>
            <input
              type="text"
              value={editedConfig.projectName}
              onChange={(e) => setEditedConfig(prev => ({ ...prev, projectName: e.target.value }))}
              disabled={!editMode}
              className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-neutron-cyan/30"
            />
          </div>
          <div>
            <label className="text-gray-400 text-sm flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Slogan
            </label>
            <input
              type="text"
              value={editedConfig.tagline}
              onChange={(e) => setEditedConfig(prev => ({ ...prev, tagline: e.target.value }))}
              disabled={!editMode}
              className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-neutron-cyan/30"
            />
          </div>
          <div>
            <label className="text-gray-400 text-sm flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Açıklama
            </label>
            <textarea
              value={editedConfig.description}
              onChange={(e) => setEditedConfig(prev => ({ ...prev, description: e.target.value }))}
              disabled={!editMode}
              rows={3}
              className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-neutron-cyan/30"
            />
          </div>
        </div>
      </div>

             {/* Hero Section */}
       <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10">
         <h4 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
           <Home className="w-5 h-5" />
           Hero Section
         </h4>
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           <div>
             <label className="text-gray-400 text-sm">Başlık</label>
             <input
               type="text"
               value={editedConfig.hero.title}
               onChange={(e) => setEditedConfig(prev => ({ 
                 ...prev, 
                 hero: { ...prev.hero, title: e.target.value }
               }))}
               disabled={!editMode}
               className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-neutron-cyan/30"
             />
           </div>
           <div>
             <label className="text-gray-400 text-sm">Alt Başlık</label>
             <input
               type="text"
               value={editedConfig.hero.subtitle}
               onChange={(e) => setEditedConfig(prev => ({ 
                 ...prev, 
                 hero: { ...prev.hero, subtitle: e.target.value }
               }))}
               disabled={!editMode}
               className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-neutron-cyan/30"
             />
           </div>
         </div>
         <div className="mt-4">
           <label className="text-gray-400 text-sm">Typewriter Sloganları (virgülle ayırın)</label>
           <textarea
             value={editedConfig.hero.typewriterSlogans.join(', ')}
             onChange={(e) => setEditedConfig(prev => ({ 
               ...prev, 
               hero: { ...prev.hero, typewriterSlogans: e.target.value.split(',').map(s => s.trim()) }
             }))}
             disabled={!editMode}
             rows={2}
             className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-neutron-cyan/30"
           />
         </div>

         {/* Hero Badges */}
         <div className="mt-6">
           <label className="text-gray-400 text-sm mb-3 block">Hero Rozetleri</label>
           <div className="space-y-3">
             {editedConfig.hero.badges.map((badge, index) => (
               <div key={index} className="flex gap-2">
                 <input
                   type="text"
                   value={badge}
                   onChange={(e) => {
                     const newBadges = [...editedConfig.hero.badges];
                     newBadges[index] = e.target.value;
                     setEditedConfig(prev => ({
                       ...prev,
                       hero: { ...prev.hero, badges: newBadges }
                     }));
                   }}
                   disabled={!editMode}
                   className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-neutron-cyan/30"
                 />
                 {editMode && (
                   <button
                     onClick={() => {
                       const newBadges = editedConfig.hero.badges.filter((_, i) => i !== index);
                       setEditedConfig(prev => ({
                         ...prev,
                         hero: { ...prev.hero, badges: newBadges }
                       }));
                     }}
                     className="px-3 py-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
                   >
                     <Trash2 className="w-4 h-4" />
                   </button>
                 )}
               </div>
             ))}
             {editMode && (
               <button
                 onClick={() => {
                   const newBadges = [...editedConfig.hero.badges, 'Yeni rozet'];
                   setEditedConfig(prev => ({
                     ...prev,
                     hero: { ...prev.hero, badges: newBadges }
                   }));
                 }}
                 className="w-full px-3 py-2 bg-neutron-cyan/10 border border-neutron-cyan/20 text-neutron-cyan rounded-lg hover:bg-neutron-cyan/20 transition-colors flex items-center gap-2"
               >
                 <Plus className="w-4 h-4" />
                 Rozet Ekle
               </button>
             )}
           </div>
         </div>

         {/* Hero CTA Buttons */}
         <div className="mt-6">
           <label className="text-gray-400 text-sm mb-3 block">Hero Butonları</label>
           <div className="space-y-4">
             {editedConfig.hero.ctaButtons.map((button, index) => (
               <div key={index} className="p-4 rounded-xl bg-white/5 border border-white/10">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div>
                     <label className="text-gray-400 text-sm">Buton Metni</label>
                     <input
                       type="text"
                       value={button.text}
                       onChange={(e) => {
                         const newButtons = [...editedConfig.hero.ctaButtons];
                         newButtons[index] = { ...button, text: e.target.value };
                         setEditedConfig(prev => ({
                           ...prev,
                           hero: { ...prev.hero, ctaButtons: newButtons }
                         }));
                       }}
                       disabled={!editMode}
                       className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-neutron-cyan/30"
                     />
                   </div>
                   <div>
                     <label className="text-gray-400 text-sm">Buton Linki</label>
                     <input
                       type="text"
                       value={button.href}
                       onChange={(e) => {
                         const newButtons = [...editedConfig.hero.ctaButtons];
                         newButtons[index] = { ...button, href: e.target.value };
                         setEditedConfig(prev => ({
                           ...prev,
                           hero: { ...prev.hero, ctaButtons: newButtons }
                         }));
                       }}
                       disabled={!editMode}
                       className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-neutron-cyan/30"
                     />
                   </div>
                 </div>
                 <div className="mt-4">
                   <label className="text-gray-400 text-sm">Buton Tipi</label>
                   <select
                     value={button.variant}
                     onChange={(e) => {
                       const newButtons = [...editedConfig.hero.ctaButtons];
                       newButtons[index] = { ...button, variant: e.target.value as 'primary' | 'secondary' };
                       setEditedConfig(prev => ({
                         ...prev,
                         hero: { ...prev.hero, ctaButtons: newButtons }
                       }));
                     }}
                     disabled={!editMode}
                     className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-neutron-cyan/30"
                   >
                     <option value="primary">Primary</option>
                     <option value="secondary">Secondary</option>
                   </select>
                 </div>
                 {editMode && (
                   <button
                     onClick={() => {
                       const newButtons = editedConfig.hero.ctaButtons.filter((_, i) => i !== index);
                       setEditedConfig(prev => ({
                         ...prev,
                         hero: { ...prev.hero, ctaButtons: newButtons }
                       }));
                     }}
                     className="mt-3 px-3 py-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
                   >
                     <Trash2 className="w-4 h-4" />
                   </button>
                 )}
               </div>
             ))}
             {editMode && (
               <button
                 onClick={() => {
                   const newButton = {
                     text: 'Yeni Buton',
                     href: '#',
                     variant: 'primary' as const
                   };
                   const newButtons = [...editedConfig.hero.ctaButtons, newButton];
                   setEditedConfig(prev => ({
                     ...prev,
                     hero: { ...prev.hero, ctaButtons: newButtons }
                   }));
                 }}
                 className="w-full px-3 py-2 bg-neutron-cyan/10 border border-neutron-cyan/20 text-neutron-cyan rounded-lg hover:bg-neutron-cyan/20 transition-colors flex items-center gap-2"
               >
                 <Plus className="w-4 h-4" />
                 Buton Ekle
               </button>
             )}
           </div>
         </div>
       </div>

             {/* Summary Section */}
       <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10">
         <h4 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
           <FileText className="w-5 h-5" />
           Proje Özeti
         </h4>
         <div className="space-y-4">
           <div>
             <label className="text-gray-400 text-sm">Başlık</label>
             <input
               type="text"
               value={editedConfig.summary.title}
               onChange={(e) => setEditedConfig(prev => ({ 
                 ...prev, 
                 summary: { ...prev.summary, title: e.target.value }
               }))}
               disabled={!editMode}
               className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-neutron-cyan/30"
             />
           </div>
           <div>
             <label className="text-gray-400 text-sm">Açıklama</label>
             <textarea
               value={editedConfig.summary.description}
               onChange={(e) => setEditedConfig(prev => ({ 
                 ...prev, 
                 summary: { ...prev.summary, description: e.target.value }
               }))}
               disabled={!editMode}
               rows={3}
               className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-neutron-cyan/30"
             />
           </div>
         </div>
       </div>

       {/* Summary Cards */}
       <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10">
         <h4 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
           <BarChart3 className="w-5 h-5" />
           Özet Kartları
         </h4>
         <div className="space-y-6">
           {/* Problem Card */}
           <div className="p-4 rounded-xl bg-white/5 border border-white/10">
             <h5 className="text-white font-semibold mb-3">Problem Kartı</h5>
             <div className="space-y-3">
               <div>
                 <label className="text-gray-400 text-sm">Başlık</label>
                 <input
                   type="text"
                   value={editedConfig.summary.cards.problem.title}
                   onChange={(e) => setEditedConfig(prev => ({ 
                     ...prev, 
                     summary: { 
                       ...prev.summary, 
                       cards: { 
                         ...prev.summary.cards, 
                         problem: { ...prev.summary.cards.problem, title: e.target.value }
                       }
                     }
                   }))}
                   disabled={!editMode}
                   className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-neutron-cyan/30"
                 />
               </div>
               <div>
                 <label className="text-gray-400 text-sm">İçerik</label>
                 <textarea
                   value={editedConfig.summary.cards.problem.content}
                   onChange={(e) => setEditedConfig(prev => ({ 
                     ...prev, 
                     summary: { 
                       ...prev.summary, 
                       cards: { 
                         ...prev.summary.cards, 
                         problem: { ...prev.summary.cards.problem, content: e.target.value }
                       }
                     }
                   }))}
                   disabled={!editMode}
                   rows={2}
                   className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-neutron-cyan/30"
                 />
               </div>
             </div>
           </div>

           {/* Solution Card */}
           <div className="p-4 rounded-xl bg-white/5 border border-white/10">
             <h5 className="text-white font-semibold mb-3">Çözüm Kartı</h5>
             <div className="space-y-3">
               <div>
                 <label className="text-gray-400 text-sm">Başlık</label>
                 <input
                   type="text"
                   value={editedConfig.summary.cards.solution.title}
                   onChange={(e) => setEditedConfig(prev => ({ 
                     ...prev, 
                     summary: { 
                       ...prev.summary, 
                       cards: { 
                         ...prev.summary.cards, 
                         solution: { ...prev.summary.cards.solution, title: e.target.value }
                       }
                     }
                   }))}
                   disabled={!editMode}
                   className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-neutron-cyan/30"
                 />
               </div>
               <div>
                 <label className="text-gray-400 text-sm">İçerik</label>
                 <textarea
                   value={editedConfig.summary.cards.solution.content}
                   onChange={(e) => setEditedConfig(prev => ({ 
                     ...prev, 
                     summary: { 
                       ...prev.summary, 
                       cards: { 
                         ...prev.summary.cards, 
                         solution: { ...prev.summary.cards.solution, content: e.target.value }
                       }
                     }
                   }))}
                   disabled={!editMode}
                   rows={2}
                   className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-neutron-cyan/30"
                 />
               </div>
             </div>
           </div>

           {/* Impact Card */}
           <div className="p-4 rounded-xl bg-white/5 border border-white/10">
             <h5 className="text-white font-semibold mb-3">Etki Kartı</h5>
             <div className="space-y-3">
               <div>
                 <label className="text-gray-400 text-sm">Başlık</label>
                 <input
                   type="text"
                   value={editedConfig.summary.cards.impact.title}
                   onChange={(e) => setEditedConfig(prev => ({ 
                     ...prev, 
                     summary: { 
                       ...prev.summary, 
                       cards: { 
                         ...prev.summary.cards, 
                         impact: { ...prev.summary.cards.impact, title: e.target.value }
                       }
                     }
                   }))}
                   disabled={!editMode}
                   className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-neutron-cyan/30"
                 />
               </div>
               <div>
                 <label className="text-gray-400 text-sm">İçerik</label>
                 <textarea
                   value={editedConfig.summary.cards.impact.content}
                   onChange={(e) => setEditedConfig(prev => ({ 
                     ...prev, 
                     summary: { 
                       ...prev.summary, 
                       cards: { 
                         ...prev.summary.cards, 
                         impact: { ...prev.summary.cards.impact, content: e.target.value }
                       }
                     }
                   }))}
                   disabled={!editMode}
                   rows={2}
                   className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-neutron-cyan/30"
                 />
               </div>
             </div>
           </div>

           {/* Summary Highlights */}
           <div>
             <label className="text-gray-400 text-sm mb-3 block">Özet Vurguları</label>
             <div className="space-y-3">
               {editedConfig.summary.highlights.map((highlight, index) => (
                 <div key={index} className="flex gap-2">
                   <input
                     type="text"
                     value={highlight}
                     onChange={(e) => {
                       const newHighlights = [...editedConfig.summary.highlights];
                       newHighlights[index] = e.target.value;
                       setEditedConfig(prev => ({
                         ...prev,
                         summary: { ...prev.summary, highlights: newHighlights }
                       }));
                     }}
                     disabled={!editMode}
                     className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-neutron-cyan/30"
                   />
                   {editMode && (
                     <button
                       onClick={() => {
                         const newHighlights = editedConfig.summary.highlights.filter((_, i) => i !== index);
                         setEditedConfig(prev => ({
                           ...prev,
                           summary: { ...prev.summary, highlights: newHighlights }
                         }));
                       }}
                       className="px-3 py-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
                     >
                       <Trash2 className="w-4 h-4" />
                     </button>
                   )}
                 </div>
               ))}
               {editMode && (
                 <button
                   onClick={() => {
                     const newHighlights = [...editedConfig.summary.highlights, 'Yeni vurgu'];
                     setEditedConfig(prev => ({
                       ...prev,
                       summary: { ...prev.summary, highlights: newHighlights }
                     }));
                   }}
                   className="w-full px-3 py-2 bg-neutron-cyan/10 border border-neutron-cyan/20 text-neutron-cyan rounded-lg hover:bg-neutron-cyan/20 transition-colors flex items-center gap-2"
                 >
                   <Plus className="w-4 h-4" />
                   Vurgu Ekle
                 </button>
               )}
             </div>
           </div>
         </div>
       </div>

             {/* Research Section */}
       <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10">
         <h4 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
           <Atom className="w-5 h-5" />
           Araştırma & Analiz
         </h4>
         <div className="space-y-4">
           <div>
             <label className="text-gray-400 text-sm">Başlık</label>
             <input
               type="text"
               value={editedConfig.research.title}
               onChange={(e) => setEditedConfig(prev => ({ 
                 ...prev, 
                 research: { ...prev.research, title: e.target.value }
               }))}
               disabled={!editMode}
               className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-neutron-cyan/30"
             />
           </div>
           <div>
             <label className="text-gray-400 text-sm">Açıklama</label>
             <textarea
               value={editedConfig.research.description}
               onChange={(e) => setEditedConfig(prev => ({ 
                 ...prev, 
                 research: { ...prev.research, description: e.target.value }
               }))}
               disabled={!editMode}
               rows={3}
               className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-neutron-cyan/30"
             />
           </div>
         </div>
       </div>

       {/* Project Scope */}
       <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10">
         <h4 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
           <Database className="w-5 h-5" />
           Proje Kapsamı
         </h4>
         <div className="space-y-4">
           <div>
             <label className="text-gray-400 text-sm">Başlık</label>
             <input
               type="text"
               value={editedConfig.research.projectScope.title}
               onChange={(e) => setEditedConfig(prev => ({ 
                 ...prev, 
                 research: { 
                   ...prev.research, 
                   projectScope: { ...prev.research.projectScope, title: e.target.value }
                 }
               }))}
               disabled={!editMode}
               className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-neutron-cyan/30"
             />
           </div>
           <div>
             <label className="text-gray-400 text-sm">Açıklama</label>
             <textarea
               value={editedConfig.research.projectScope.description}
               onChange={(e) => setEditedConfig(prev => ({ 
                 ...prev, 
                 research: { 
                   ...prev.research, 
                   projectScope: { ...prev.research.projectScope, description: e.target.value }
                 }
               }))}
               disabled={!editMode}
               rows={3}
               className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-neutron-cyan/30"
             />
           </div>
           
           {/* Project Scope Highlights */}
           <div>
             <label className="text-gray-400 text-sm mb-3 block">Proje Kapsamı Özellikleri</label>
             <div className="space-y-3">
               {editedConfig.research.projectScope.highlights.map((highlight, index) => (
                 <div key={index} className="flex gap-2">
                   <input
                     type="text"
                     value={highlight}
                     onChange={(e) => {
                       const newHighlights = [...editedConfig.research.projectScope.highlights];
                       newHighlights[index] = e.target.value;
                       setEditedConfig(prev => ({
                         ...prev,
                         research: {
                           ...prev.research,
                           projectScope: {
                             ...prev.research.projectScope,
                             highlights: newHighlights
                           }
                         }
                       }));
                     }}
                     disabled={!editMode}
                     className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-neutron-cyan/30"
                   />
                   {editMode && (
                     <button
                       onClick={() => {
                         const newHighlights = editedConfig.research.projectScope.highlights.filter((_, i) => i !== index);
                         setEditedConfig(prev => ({
                           ...prev,
                           research: {
                             ...prev.research,
                             projectScope: {
                               ...prev.research.projectScope,
                               highlights: newHighlights
                             }
                           }
                         }));
                       }}
                       className="px-3 py-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
                     >
                       <Trash2 className="w-4 h-4" />
                     </button>
                   )}
                 </div>
               ))}
               {editMode && (
                 <button
                   onClick={() => {
                     const newHighlights = [...editedConfig.research.projectScope.highlights, 'Yeni özellik'];
                     setEditedConfig(prev => ({
                       ...prev,
                       research: {
                         ...prev.research,
                         projectScope: {
                           ...prev.research.projectScope,
                           highlights: newHighlights
                         }
                       }
                     }));
                   }}
                   className="w-full px-3 py-2 bg-neutron-cyan/10 border border-neutron-cyan/20 text-neutron-cyan rounded-lg hover:bg-neutron-cyan/20 transition-colors flex items-center gap-2"
                 >
                   <Plus className="w-4 h-4" />
                   Özellik Ekle
                 </button>
               )}
             </div>
           </div>
         </div>
       </div>

       {/* Research Areas */}
       <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10">
         <h4 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
           <Atom className="w-5 h-5" />
           Araştırma Alanları
         </h4>
         <div className="space-y-6">
           {editedConfig.research.areas.map((area, areaIndex) => (
             <div key={areaIndex} className="p-4 rounded-xl bg-white/5 border border-white/10">
               <div className="space-y-4">
                 <div>
                   <label className="text-gray-400 text-sm">Araştırma Alanı Adı</label>
                   <input
                     type="text"
                     value={area.name}
                     onChange={(e) => {
                       const newAreas = [...editedConfig.research.areas];
                       newAreas[areaIndex] = { ...area, name: e.target.value };
                       setEditedConfig(prev => ({
                         ...prev,
                         research: { ...prev.research, areas: newAreas }
                       }));
                     }}
                     disabled={!editMode}
                     className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-neutron-cyan/30"
                   />
                 </div>
                 
                 <div>
                   <label className="text-gray-400 text-sm">Açıklama</label>
                   <textarea
                     value={area.description}
                     onChange={(e) => {
                       const newAreas = [...editedConfig.research.areas];
                       newAreas[areaIndex] = { ...area, description: e.target.value };
                       setEditedConfig(prev => ({
                         ...prev,
                         research: { ...prev.research, areas: newAreas }
                       }));
                     }}
                     disabled={!editMode}
                     rows={2}
                     className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-neutron-cyan/30"
                   />
                 </div>

                 <div>
                   <label className="text-gray-400 text-sm">Metodoloji</label>
                   <textarea
                     value={area.methodology}
                     onChange={(e) => {
                       const newAreas = [...editedConfig.research.areas];
                       newAreas[areaIndex] = { ...area, methodology: e.target.value };
                       setEditedConfig(prev => ({
                         ...prev,
                         research: { ...prev.research, areas: newAreas }
                       }));
                     }}
                     disabled={!editMode}
                     rows={2}
                     className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-neutron-cyan/30"
                   />
                 </div>

                 <div>
                   <label className="text-gray-400 text-sm mb-2 block">Yazılımlar</label>
                   <div className="space-y-2">
                     {area.software.map((software, softwareIndex) => (
                       <div key={softwareIndex} className="flex gap-2">
                         <input
                           type="text"
                           value={software}
                           onChange={(e) => {
                             const newAreas = [...editedConfig.research.areas];
                             const newSoftware = [...area.software];
                             newSoftware[softwareIndex] = e.target.value;
                             newAreas[areaIndex] = { ...area, software: newSoftware };
                             setEditedConfig(prev => ({
                               ...prev,
                               research: { ...prev.research, areas: newAreas }
                             }));
                           }}
                           disabled={!editMode}
                           className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-neutron-cyan/30"
                         />
                         {editMode && (
                           <button
                             onClick={() => {
                               const newAreas = [...editedConfig.research.areas];
                               const newSoftware = area.software.filter((_, i) => i !== softwareIndex);
                               newAreas[areaIndex] = { ...area, software: newSoftware };
                               setEditedConfig(prev => ({
                                 ...prev,
                                 research: { ...prev.research, areas: newAreas }
                               }));
                             }}
                             className="px-3 py-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
                           >
                             <Trash2 className="w-4 h-4" />
                           </button>
                         )}
                       </div>
                     ))}
                     {editMode && (
                       <button
                         onClick={() => {
                           const newAreas = [...editedConfig.research.areas];
                           const newSoftware = [...area.software, 'Yeni yazılım'];
                           newAreas[areaIndex] = { ...area, software: newSoftware };
                           setEditedConfig(prev => ({
                             ...prev,
                             research: { ...prev.research, areas: newAreas }
                           }));
                         }}
                         className="w-full px-3 py-2 bg-neutron-cyan/10 border border-neutron-cyan/20 text-neutron-cyan rounded-lg hover:bg-neutron-cyan/20 transition-colors flex items-center gap-2"
                       >
                         <Plus className="w-4 h-4" />
                         Yazılım Ekle
                       </button>
                     )}
                   </div>
                 </div>

                 <div>
                   <label className="text-gray-400 text-sm">Temel Bulgular</label>
                   <textarea
                     value={area.findings}
                     onChange={(e) => {
                       const newAreas = [...editedConfig.research.areas];
                       newAreas[areaIndex] = { ...area, findings: e.target.value };
                       setEditedConfig(prev => ({
                         ...prev,
                         research: { ...prev.research, areas: newAreas }
                       }));
                     }}
                     disabled={!editMode}
                     rows={3}
                     className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-neutron-cyan/30"
                   />
                 </div>

                 <div>
                   <label className="text-gray-400 text-sm">Sonuç</label>
                   <textarea
                     value={area.conclusion}
                     onChange={(e) => {
                       const newAreas = [...editedConfig.research.areas];
                       newAreas[areaIndex] = { ...area, conclusion: e.target.value };
                       setEditedConfig(prev => ({
                         ...prev,
                         research: { ...prev.research, areas: newAreas }
                       }));
                     }}
                     disabled={!editMode}
                     rows={2}
                     className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-neutron-cyan/30"
                   />
                 </div>
               </div>
             </div>
           ))}
           
           {editMode && (
             <button
               onClick={() => {
                 const newArea = {
                   name: 'Yeni Araştırma Alanı',
                   title: 'Yeni Araştırma Alanı',
                   description: 'Açıklama',
                   icon: 'atom',
                   methodology: 'Metodoloji',
                   keyFindings: ['Temel bulgu 1'],
                   software: ['Yazılım 1'],
                   findings: 'Temel bulgular',
                   conclusion: 'Sonuç',
                   results: 'Sonuçlar'
                 };
                 const newAreas = [...editedConfig.research.areas, newArea];
                 setEditedConfig(prev => ({
                   ...prev,
                   research: { ...prev.research, areas: newAreas }
                 }));
               }}
               className="w-full px-4 py-3 bg-neutron-cyan/10 border border-neutron-cyan/20 text-neutron-cyan rounded-xl hover:bg-neutron-cyan/20 transition-colors flex items-center gap-2"
             >
               <Plus className="w-4 h-4" />
               Araştırma Alanı Ekle
             </button>
           )}
         </div>
       </div>

       {/* Conclusions */}
       <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10">
         <h4 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
           <CheckCircle className="w-5 h-5" />
           Sonuçlar
         </h4>
         <div className="space-y-4">
           <div>
             <label className="text-gray-400 text-sm">Başlık</label>
             <input
               type="text"
               value={editedConfig.research.conclusions.title}
               onChange={(e) => setEditedConfig(prev => ({ 
                 ...prev, 
                 research: { 
                   ...prev.research, 
                   conclusions: { ...prev.research.conclusions, title: e.target.value }
                 }
               }))}
               disabled={!editMode}
               className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-neutron-cyan/30"
             />
           </div>
           
           <div>
             <label className="text-gray-400 text-sm mb-3 block">Sonuç Maddeleri</label>
             <div className="space-y-3">
               {editedConfig.research.conclusions.items.map((item, index) => (
                 <div key={index} className="flex gap-2">
                   <textarea
                     value={item}
                     onChange={(e) => {
                       const newItems = [...editedConfig.research.conclusions.items];
                       newItems[index] = e.target.value;
                       setEditedConfig(prev => ({
                         ...prev,
                         research: {
                           ...prev.research,
                           conclusions: {
                             ...prev.research.conclusions,
                             items: newItems
                           }
                         }
                       }));
                     }}
                     disabled={!editMode}
                     rows={2}
                     className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-neutron-cyan/30"
                   />
                   {editMode && (
                     <button
                       onClick={() => {
                         const newItems = editedConfig.research.conclusions.items.filter((_, i) => i !== index);
                         setEditedConfig(prev => ({
                           ...prev,
                           research: {
                             ...prev.research,
                             conclusions: {
                               ...prev.research.conclusions,
                               items: newItems
                             }
                           }
                         }));
                       }}
                       className="px-3 py-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
                     >
                       <Trash2 className="w-4 h-4" />
                     </button>
                   )}
                 </div>
               ))}
               {editMode && (
                 <button
                   onClick={() => {
                     const newItems = [...editedConfig.research.conclusions.items, 'Yeni sonuç maddesi'];
                     setEditedConfig(prev => ({
                       ...prev,
                       research: {
                         ...prev.research,
                         conclusions: {
                           ...prev.research.conclusions,
                           items: newItems
                         }
                       }
                     }));
                   }}
                   className="w-full px-3 py-2 bg-neutron-cyan/10 border border-neutron-cyan/20 text-neutron-cyan rounded-lg hover:bg-neutron-cyan/20 transition-colors flex items-center gap-2"
                 >
                   <Plus className="w-4 h-4" />
                   Sonuç Maddesi Ekle
                 </button>
               )}
             </div>
           </div>
         </div>
       </div>

      {/* Team Section */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10">
        <h4 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
          <Users className="w-5 h-5" />
          Ekip
        </h4>
        <div>
          <label className="text-gray-400 text-sm">Başlık</label>
          <input
            type="text"
            value={editedConfig.team.title}
            onChange={(e) => setEditedConfig(prev => ({ 
              ...prev, 
              team: { ...prev.team, title: e.target.value }
            }))}
            disabled={!editMode}
            className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-neutron-cyan/30"
          />
        </div>
      </div>

             {/* Contact Section */}
       <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10">
         <h4 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
           <Mail className="w-5 h-5" />
           İletişim
         </h4>
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           <div>
             <label className="text-gray-400 text-sm">Başlık</label>
             <input
               type="text"
               value={editedConfig.contact.title}
               onChange={(e) => setEditedConfig(prev => ({ 
                 ...prev, 
                 contact: { ...prev.contact, title: e.target.value }
               }))}
               disabled={!editMode}
               className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-neutron-cyan/30"
             />
           </div>
           <div>
             <label className="text-gray-400 text-sm">Email</label>
             <input
               type="email"
               value={editedConfig.contact.email}
               onChange={(e) => setEditedConfig(prev => ({ 
                 ...prev, 
                 contact: { ...prev.contact, email: e.target.value }
               }))}
               disabled={!editMode}
               className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-neutron-cyan/30"
             />
           </div>
           <div>
             <label className="text-gray-400 text-sm">Konum</label>
             <input
               type="text"
               value={editedConfig.contact.location}
               onChange={(e) => setEditedConfig(prev => ({ 
                 ...prev, 
                 contact: { ...prev.contact, location: e.target.value }
               }))}
               disabled={!editMode}
               className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-neutron-cyan/30"
             />
           </div>
           <div>
             <label className="text-gray-400 text-sm">Kurum</label>
             <input
               type="text"
               value={editedConfig.contact.institution}
               onChange={(e) => setEditedConfig(prev => ({ 
                 ...prev, 
                 contact: { ...prev.contact, institution: e.target.value }
               }))}
               disabled={!editMode}
               className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-neutron-cyan/30"
             />
           </div>
         </div>
         <div className="mt-4">
           <label className="text-gray-400 text-sm">Açıklama</label>
           <textarea
             value={editedConfig.contact.description}
             onChange={(e) => setEditedConfig(prev => ({ 
               ...prev, 
               contact: { ...prev.contact, description: e.target.value }
             }))}
             disabled={!editMode}
             rows={3}
             className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-neutron-cyan/30"
           />
         </div>

         {/* Contact Form */}
         <div className="mt-6">
           <h5 className="text-white font-semibold mb-3">İletişim Formu</h5>
           <div className="space-y-4">
             <div>
               <label className="text-gray-400 text-sm">Form Başlığı</label>
               <input
                 type="text"
                 value={editedConfig.contact.form.title}
                 onChange={(e) => setEditedConfig(prev => ({ 
                   ...prev, 
                   contact: { 
                     ...prev.contact, 
                     form: { ...prev.contact.form, title: e.target.value }
                   }
                 }))}
                 disabled={!editMode}
                 className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-neutron-cyan/30"
               />
             </div>
             <div>
               <label className="text-gray-400 text-sm">Form Alt Başlığı</label>
               <input
                 type="text"
                 value={editedConfig.contact.form.subtitle}
                 onChange={(e) => setEditedConfig(prev => ({ 
                   ...prev, 
                   contact: { 
                     ...prev.contact, 
                     form: { ...prev.contact.form, subtitle: e.target.value }
                   }
                 }))}
                 disabled={!editMode}
                 className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-neutron-cyan/30"
               />
             </div>

             {/* Form Fields */}
             <div>
               <label className="text-gray-400 text-sm mb-3 block">Form Alanları</label>
               <div className="space-y-3">
                 {Object.entries(editedConfig.contact.form.fields).map(([fieldName, field]) => (
                   <div key={fieldName} className="p-4 rounded-xl bg-white/5 border border-white/10">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div>
                         <label className="text-gray-400 text-sm">Alan Etiketi</label>
                         <input
                           type="text"
                           value={field.label}
                           onChange={(e) => setEditedConfig(prev => ({ 
                             ...prev, 
                             contact: { 
                               ...prev.contact, 
                               form: { 
                                 ...prev.contact.form, 
                                 fields: { 
                                   ...prev.contact.form.fields, 
                                   [fieldName]: { ...field, label: e.target.value }
                                 }
                               }
                             }
                           }))}
                           disabled={!editMode}
                           className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-neutron-cyan/30"
                         />
                       </div>
                       <div>
                         <label className="text-gray-400 text-sm">Placeholder</label>
                         <input
                           type="text"
                           value={field.placeholder}
                           onChange={(e) => setEditedConfig(prev => ({ 
                             ...prev, 
                             contact: { 
                               ...prev.contact, 
                               form: { 
                                 ...prev.contact.form, 
                                 fields: { 
                                   ...prev.contact.form.fields, 
                                   [fieldName]: { ...field, placeholder: e.target.value }
                                 }
                               }
                             }
                           }))}
                           disabled={!editMode}
                           className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-neutron-cyan/30"
                         />
                       </div>
                     </div>
                   </div>
                 ))}
               </div>
             </div>

             {/* Submit Button */}
             <div>
               <label className="text-gray-400 text-sm">Gönder Butonu Metni</label>
               <input
                 type="text"
                 value={editedConfig.contact.form.submitButton}
                 onChange={(e) => setEditedConfig(prev => ({ 
                   ...prev, 
                   contact: { 
                     ...prev.contact, 
                     form: { ...prev.contact.form, submitButton: e.target.value }
                   }
                 }))}
                 disabled={!editMode}
                 className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-neutron-cyan/30"
               />
             </div>

             {/* Success Message */}
             <div>
               <label className="text-gray-400 text-sm">Başarı Mesajı</label>
               <textarea
                 value={editedConfig.contact.form.successMessage}
                 onChange={(e) => setEditedConfig(prev => ({ 
                   ...prev, 
                   contact: { 
                     ...prev.contact, 
                     form: { ...prev.contact.form, successMessage: e.target.value }
                   }
                 }))}
                 disabled={!editMode}
                 rows={2}
                 className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-neutron-cyan/30"
               />
             </div>
           </div>
         </div>

         {/* Social Links */}
         <div className="mt-6">
           <h5 className="text-white font-semibold mb-3">Sosyal Medya Linkleri</h5>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div>
               <label className="text-gray-400 text-sm">GitHub</label>
               <input
                 type="text"
                 value={editedConfig.contact.socialLinks.github || ''}
                 onChange={(e) => setEditedConfig(prev => ({ 
                   ...prev, 
                   contact: { 
                     ...prev.contact, 
                     socialLinks: { ...prev.contact.socialLinks, github: e.target.value }
                   }
                 }))}
                 disabled={!editMode}
                 className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-neutron-cyan/30"
               />
             </div>
             <div>
               <label className="text-gray-400 text-sm">LinkedIn</label>
               <input
                 type="text"
                 value={editedConfig.contact.socialLinks.linkedin || ''}
                 onChange={(e) => setEditedConfig(prev => ({ 
                   ...prev, 
                   contact: { 
                     ...prev.contact, 
                     socialLinks: { ...prev.contact.socialLinks, linkedin: e.target.value }
                   }
                 }))}
                 disabled={!editMode}
                 className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-neutron-cyan/30"
               />
             </div>
           </div>
         </div>
       </div>

             {/* Footer Section */}
       <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10">
         <h4 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
           <FileText className="w-5 h-5" />
           Footer
         </h4>
         <div className="space-y-4">
           <div>
             <label className="text-gray-400 text-sm">Açıklama</label>
             <textarea
               value={editedConfig.footer.description}
               onChange={(e) => setEditedConfig(prev => ({ 
                 ...prev, 
                 footer: { ...prev.footer, description: e.target.value }
               }))}
               disabled={!editMode}
               rows={3}
               className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-neutron-cyan/30"
             />
           </div>
           <div>
             <label className="text-gray-400 text-sm">Copyright</label>
             <input
               type="text"
               value={editedConfig.footer.copyright}
               onChange={(e) => setEditedConfig(prev => ({ 
                 ...prev, 
                 footer: { ...prev.footer, copyright: e.target.value }
               }))}
               disabled={!editMode}
               className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-neutron-cyan/30"
             />
           </div>
         </div>
       </div>

       {/* Team Section */}
       <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10">
         <h4 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
           <Users className="w-5 h-5" />
           Ekip Bilgileri
         </h4>
         <div className="space-y-4">
           <div>
             <label className="text-gray-400 text-sm">Ekip Başlığı</label>
             <input
               type="text"
               value={editedConfig.team.title}
               onChange={(e) => setEditedConfig(prev => ({ 
                 ...prev, 
                 team: { ...prev.team, title: e.target.value }
               }))}
               disabled={!editMode}
               className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-neutron-cyan/30"
             />
           </div>
           
           {/* Team Members */}
           <div>
             <label className="text-gray-400 text-sm mb-3 block">Ekip Üyeleri</label>
             <div className="space-y-4">
               {editedConfig.team.members.map((member, index) => (
                 <div key={index} className="p-4 rounded-xl bg-white/5 border border-white/10">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                       <label className="text-gray-400 text-sm">İsim</label>
                       <input
                         type="text"
                         value={member.name}
                         onChange={(e) => {
                           const newMembers = [...editedConfig.team.members];
                           newMembers[index] = { ...member, name: e.target.value };
                           setEditedConfig(prev => ({
                             ...prev,
                             team: { ...prev.team, members: newMembers }
                           }));
                         }}
                         disabled={!editMode}
                         className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-neutron-cyan/30"
                       />
                     </div>
                     <div>
                       <label className="text-gray-400 text-sm">Rol</label>
                       <input
                         type="text"
                         value={member.role}
                         onChange={(e) => {
                           const newMembers = [...editedConfig.team.members];
                           newMembers[index] = { ...member, role: e.target.value };
                           setEditedConfig(prev => ({
                             ...prev,
                             team: { ...prev.team, members: newMembers }
                           }));
                         }}
                         disabled={!editMode}
                         className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-neutron-cyan/30"
                       />
                     </div>
                   </div>
                   <div className="mt-4">
                     <label className="text-gray-400 text-sm">Uzmanlık</label>
                     <textarea
                       value={member.expertise}
                       onChange={(e) => {
                         const newMembers = [...editedConfig.team.members];
                         newMembers[index] = { ...member, expertise: e.target.value };
                         setEditedConfig(prev => ({
                           ...prev,
                           team: { ...prev.team, members: newMembers }
                         }));
                       }}
                       disabled={!editMode}
                       rows={2}
                       className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-neutron-cyan/30"
                     />
                   </div>
                 </div>
               ))}
             </div>
           </div>
         </div>
       </div>
    </div>
  );



  const renderSettings = () => (
    <div className="space-y-6">
      <h3 className="text-white text-xl font-semibold">Ayarlar</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10">
          <h4 className="text-white text-lg font-semibold mb-4">Genel Ayarlar</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Bakım Modu</span>
              <button className="w-12 h-6 rounded-full bg-gray-600 relative">
                <div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1 transition-transform"></div>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Analitik</span>
              <button className="w-12 h-6 rounded-full bg-neutron-cyan relative">
                <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1 transition-transform"></div>
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10">
          <h4 className="text-white text-lg font-semibold mb-4">Güvenlik</h4>
          <div className="space-y-4">
            <button className="w-full p-3 rounded-xl bg-neutron-cyan/10 border border-neutron-cyan/20 text-neutron-cyan hover:bg-neutron-cyan/20 transition-colors">
              Şifre Değiştir
            </button>
            <button className="w-full p-3 rounded-xl bg-safety-yellow/10 border border-safety-yellow/20 text-safety-yellow hover:bg-safety-yellow/20 transition-colors">
              İki Faktörlü Doğrulama
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => {
    // Gerçek veriler
    const totalMessages = messages.length;
    const unreadMessages = getUnreadCount();
    const repliedMessages = messages.filter(msg => msg.status === 'replied').length;
    const thisMonthMessages = messages.filter(msg => {
      const messageDate = new Date(msg.date);
      const now = new Date();
      return messageDate.getMonth() === now.getMonth() && messageDate.getFullYear() === now.getFullYear();
    }).length;

    return (
      <div className="space-y-6">
        <h3 className="text-white text-xl font-semibold">Analitik</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-neutron-cyan/10 to-neutron-cyan/5 border border-neutron-cyan/20">
            <div className="text-center">
              <p className="text-gray-400 text-sm">Toplam Mesaj</p>
              <p className="text-white text-2xl font-bold">{totalMessages}</p>
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-safety-yellow/10 to-safety-yellow/5 border border-safety-yellow/20">
            <div className="text-center">
              <p className="text-gray-400 text-sm">Bu Ay</p>
              <p className="text-white text-2xl font-bold">{thisMonthMessages}</p>
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20">
            <div className="text-center">
              <p className="text-gray-400 text-sm">Yanıtlanan</p>
              <p className="text-white text-2xl font-bold">{repliedMessages}</p>
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/20">
            <div className="text-center">
              <p className="text-gray-400 text-sm">Okunmamış</p>
              <p className="text-white text-2xl font-bold">{unreadMessages}</p>
            </div>
          </div>
        </div>

        {/* Mesaj İstatistikleri */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10">
            <h4 className="text-white text-lg font-semibold mb-4">Mesaj Durumu Dağılımı</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Okunmamış</span>
                <span className="text-neutron-cyan font-semibold">{unreadMessages}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Okunmuş</span>
                <span className="text-safety-yellow font-semibold">{messages.filter(msg => msg.status === 'read').length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Yanıtlanmış</span>
                <span className="text-green-400 font-semibold">{repliedMessages}</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10">
            <h4 className="text-white text-lg font-semibold mb-4">Son Aktiviteler</h4>
            <div className="space-y-3">
              {messages.slice(0, 5).map((message) => (
                <div key={message.id} className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                  <div>
                    <p className="text-white text-sm font-medium">{message.name}</p>
                    <p className="text-gray-400 text-xs">{message.subject}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    message.status === 'unread' ? 'bg-neutron-cyan/20 text-neutron-cyan' :
                    message.status === 'read' ? 'bg-safety-yellow/20 text-safety-yellow' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {message.status === 'unread' ? 'Yeni' :
                     message.status === 'read' ? 'Okundu' : 'Yanıtlandı'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'messages':
        return renderMessages();
      case 'content':
        return renderContentManagement();
      case 'settings':
        return renderSettings();
      case 'analytics':
        return renderAnalytics();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-navy via-graphite to-dark-navy">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/10">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-xl bg-neutron-cyan/20 border border-neutron-cyan/30">
            <Shield className="w-6 h-6 text-neutron-cyan" />
          </div>
          <div>
            <h2 className="text-white text-xl font-bold">Admin Panel</h2>
            <p className="text-gray-400 text-sm">Site Yönetimi</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors flex items-center gap-2"
        >
          <LogOut className="w-5 h-5" />
          Çıkış
        </button>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <div className="w-64 bg-white/5 border-r border-white/10 p-4">
          <nav className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === tab.id
                      ? 'bg-neutron-cyan/10 border border-neutron-cyan/30 text-neutron-cyan'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
