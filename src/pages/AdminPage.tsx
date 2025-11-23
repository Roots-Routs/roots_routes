import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSupabaseData } from '../hooks/useSupabaseData';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { Users, MapPin, Calendar, Utensils, Bed, Heart, Plus, CreditCard as Edit, Trash2, ExternalLink, BarChart3, Settings, LogOut } from 'lucide-react';
import { TourRouteForm, ExperienceForm, AccommodationForm, PartnerForm } from '../components/AdminForms';

const AdminPage: React.FC = () => {
  const { user, signOut } = useAuth();
  const { heritageThemes, tourRoutes, experiences, accommodations, partners, loading, error, refetch } = useSupabaseData();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showForm, setShowForm] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<any>(null);

  const handleDelete = async (table: string, id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      refetch();
      alert('Item deleted successfully!');
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Error deleting item');
    }
  };

  const handleFormClose = () => {
    setShowForm(null);
    setEditingItem(null);
  };

  const handleFormSave = () => {
    refetch();
    alert('Item saved successfully!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="bg-amber-100 border border-amber-400 text-amber-700 px-4 py-3 rounded mb-4">
            <strong>Database Connection Required:</strong> {error}
          </div>
          <p className="text-gray-600 mb-4">
            To use the admin features, you need to set up Supabase. The interface is working, 
            but you'll need database connection to save changes.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded p-4 text-left text-sm">
            <h4 className="font-bold text-blue-800 mb-2">Quick Setup:</h4>
            <ol className="list-decimal list-inside space-y-1 text-blue-700">
              <li>Go to <a href="https://supabase.com" target="_blank" className="underline">supabase.com</a></li>
              <li>Create a free project</li>
              <li>Get your Project URL and API Key</li>
              <li>Update the .env file with your credentials</li>
              <li>Run the database migration</li>
            </ol>
          </div>
          <Link to="/" className="text-green-600 hover:text-green-500 mt-4 inline-block">
            ← Back to Homepage
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'routes', label: 'Tour Routes', icon: MapPin, count: tourRoutes.length },
    { id: 'experiences', label: 'Experiences', icon: Calendar, count: experiences.length },
    { id: 'accommodations', label: 'Hotels', icon: Bed, count: accommodations.length },
    { id: 'themes', label: 'Heritage Themes', icon: Heart, count: heritageThemes.length },
    { id: 'partners', label: 'Partners', icon: Users, count: partners.length }
  ];

  const StatCard: React.FC<{ title: string; count: number; icon: React.ElementType; color: string }> = 
    ({ title, count, icon: Icon, color }) => (
    <div className={`bg-white rounded-lg shadow p-6 border-l-4 ${color}`}>
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Icon className="h-8 w-8 text-gray-600" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{count}</p>
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="bg-green-800 text-white rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-2">Welcome, {user?.email?.split('@')[0] || 'Admin'}</h2>
        <p className="text-green-100">
          Manage your heritage tours, experiences, accommodations, and partners all in one place.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Tour Routes" count={tourRoutes.length} icon={MapPin} color="border-blue-500" />
        <StatCard title="Experiences" count={experiences.length} icon={Calendar} color="border-green-500" />
        <StatCard title="Accommodations" count={accommodations.length} icon={Bed} color="border-purple-500" />
        <StatCard title="Heritage Themes" count={heritageThemes.length} icon={Heart} color="border-red-500" />
        <StatCard title="Partners" count={partners.length} icon={Users} color="border-amber-500" />
        <StatCard title="Featured Routes" count={tourRoutes.filter(r => r.featured).length} icon={MapPin} color="border-indigo-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Tour Routes</h3>
          <div className="space-y-3">
            {tourRoutes.slice(0, 5).map(route => (
              <div key={route.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium text-gray-900">{route.name}</p>
                  <p className="text-sm text-gray-600">{route.duration} days</p>
                </div>
                {route.featured && (
                  <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
                    Featured
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Partner Organizations</h3>
          <div className="space-y-3">
            {partners.slice(0, 5).map(partner => (
              <div key={partner.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium text-gray-900">{partner.name}</p>
                  <p className="text-sm text-gray-600">{partner.contact_person}</p>
                </div>
                {partner.website && (
                  <a 
                    href={partner.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-500"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'routes':
        return (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Tour Routes</h2>
                <button 
                  onClick={() => setShowForm('route')}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Route</span>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid gap-4">
                {tourRoutes.map(route => (
                  <div key={route.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-bold text-gray-900">{route.name}</h3>
                          {route.featured && (
                            <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{route.description}</p>
                        <p className="text-sm text-green-600 mt-1">{route.duration} days</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => {
                            setEditingItem(route);
                            setShowForm('route');
                          }}
                          className="text-blue-600 hover:text-blue-500"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete('tour_routes', route.id)}
                          className="text-red-600 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'experiences':
        return (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Experiences</h2>
                <button 
                  onClick={() => setShowForm('experience')}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Experience</span>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid gap-4">
                {experiences.map(experience => (
                  <div key={experience.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-bold text-gray-900">{experience.name}</h3>
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                            {experience.theme}
                          </span>
                          <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                            {experience.type}
                          </span>
                          {experience.isFullDay && (
                            <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
                              Full Day
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{experience.description}</p>
                        <p className="text-sm text-green-600 mt-1 font-medium">${experience.price}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => {
                            setEditingItem(experience);
                            setShowForm('experience');
                          }}
                          className="text-blue-600 hover:text-blue-500"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete('experiences', experience.id)}
                          className="text-red-600 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'accommodations':
        return (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Accommodations</h2>
                <button 
                  onClick={() => setShowForm('accommodation')}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Hotel</span>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid gap-4">
                {accommodations.map(accommodation => (
                  <div key={accommodation.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">{accommodation.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{accommodation.description}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <p className="text-sm text-green-600 font-medium">${accommodation.pricePerRoom}/room</p>
                          <p className="text-sm text-amber-600">★ {accommodation.rating}</p>
                          <p className="text-sm text-gray-500">{accommodation.amenities.length} amenities</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => {
                            setEditingItem(accommodation);
                            setShowForm('accommodation');
                          }}
                          className="text-blue-600 hover:text-blue-500"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete('accommodations', accommodation.id)}
                          className="text-red-600 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'themes':
        return (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Heritage Themes</h2>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Add Theme</span>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid gap-4">
                {heritageThemes.map(theme => (
                  <div key={theme.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{theme.icon}</span>
                          <h3 className="font-bold text-gray-900">{theme.name}</h3>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{theme.description}</p>
                        <p className="text-sm text-blue-600 mt-1">{theme.experiences.length} experiences</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-500">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete('heritage_themes', theme.id)}
                          className="text-red-600 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'partners':
        return (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Partners</h2>
                <button 
                  onClick={() => setShowForm('partner')}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Partner</span>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid gap-4">
                {partners.map(partner => (
                  <div key={partner.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">{partner.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{partner.description}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          {partner.contact_person && (
                            <p className="text-sm text-blue-600">{partner.contact_person}</p>
                          )}
                          {partner.email && (
                            <p className="text-sm text-green-600">{partner.email}</p>
                          )}
                          {partner.phone && (
                            <p className="text-sm text-purple-600">{partner.phone}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {partner.website && (
                          <a 
                            href={partner.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-green-600 hover:text-green-500"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                        <button 
                          onClick={() => {
                            setEditingItem(partner);
                            setShowForm('partner');
                          }}
                          className="text-blue-600 hover:text-blue-500"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete('partners', partner.id)}
                          className="text-red-600 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-3">
                <img 
                  src="/RnR_Logo_192.png" 
                  alt="Roots & Routes" 
                  className="h-10 w-10"
                />
                <div>
                  <h1 className="text-xl font-bold text-green-800">Admin Dashboard</h1>
                  <p className="text-sm text-gray-600">Roots & Routes Heritage Tours</p>
                </div>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link 
                to="/" 
                className="text-gray-600 hover:text-gray-900 flex items-center space-x-1"
              >
                <ExternalLink className="h-4 w-4" />
                <span>View Site</span>
              </Link>
              <div className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-600">{user?.email || 'Admin'}</span>
                <button 
                  onClick={signOut}
                  className="text-gray-400 hover:text-red-600 ml-2 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-white rounded-lg shadow mr-8">
            <nav className="p-4">
              <div className="space-y-2">
                {tabs.map(tab => {
                  const IconComponent = tab.icon;
                  const isActive = activeTab === tab.id;
                  
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 text-left rounded-lg transition-colors ${
                        isActive
                          ? 'bg-green-100 text-green-800 font-medium'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <IconComponent className="h-5 w-5" />
                        <span>{tab.label}</span>
                      </div>
                      {tab.count !== undefined && (
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          isActive ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-600'
                        }`}>
                          {tab.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Forms */}
      {showForm === 'route' && (
        <TourRouteForm
          onClose={handleFormClose}
          onSave={handleFormSave}
          initialData={editingItem}
        />
      )}
      {showForm === 'experience' && (
        <ExperienceForm
          onClose={handleFormClose}
          onSave={handleFormSave}
          initialData={editingItem}
        />
      )}
      {showForm === 'accommodation' && (
        <AccommodationForm
          onClose={handleFormClose}
          onSave={handleFormSave}
          initialData={editingItem}
        />
      )}
      {showForm === 'partner' && (
        <PartnerForm
          onClose={handleFormClose}
          onSave={handleFormSave}
          initialData={editingItem}
        />
      )}
    </div>
  );
};

export default AdminPage;