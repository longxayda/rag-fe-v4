import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Plus, Upload, Edit2, Trash2, X, ChevronLeft } from 'lucide-react';
import { mapPlacesApi } from '../../services/api';

export default function MapPlacesManagement({ onBack }) {
  const { t } = useTranslation();
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    coordinates: '',
    media_type: 'flat',
  });
  const [narrationFile, setNarrationFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchPlaces = async () => {
    setLoading(true);
    try {
      const res = await mapPlacesApi.adminGetAll();
      setPlaces(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  const resetForm = () => {
    setFormData({ name: '', address: '', coordinates: '', media_type: 'flat' });
    setNarrationFile(null);
    setImageFile(null);
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name?.trim()) {
      alert(t('admin.errPlaceName'));
      return;
    }
    const coords = formData.coordinates?.trim();
    if (!coords) {
      alert(t('admin.errCoordinates'));
      return;
    }

    setSubmitting(true);
    try {
      const data = new FormData();
      data.append('name', formData.name.trim());
      data.append('address', formData.address?.trim() || '');
      data.append('coordinates', coords.includes('[') ? coords : `[${coords}]`);
      data.append('media_type', formData.media_type);
      if (narrationFile) data.append('mapplace_narration', narrationFile);
      if (imageFile) data.append('mapplace_image', imageFile);

      if (editingId) {
        await mapPlacesApi.update(editingId, data);
        alert(t('admin.successPlaceUpdate'));
      } else {
        await mapPlacesApi.create(data);
        alert(t('admin.successPlaceAdd'));
      }
      resetForm();
      fetchPlaces();
    } catch {
      alert(t('admin.errGeneric'));
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (place) => {
    setEditingId(place.id);
    setFormData({
      name: place.name || '',
      address: place.address || '',
      coordinates: Array.isArray(place.coordinates) ? place.coordinates.join(', ') : (place.coordinates || ''),
      media_type: place.media_type || 'flat',
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm(t('admin.confirmDeletePlace'))) return;
    try {
      await mapPlacesApi.delete(id);
      fetchPlaces();
    } catch {
      alert(t('admin.errGeneric'));
    }
  };

  return (
    <div className="p-6">
      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-4"
        >
          <ChevronLeft className="w-5 h-5" />
          {t('common.back')}
        </button>
      )}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          {t('admin.mapPlacesTitle')}
        </h2>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          {t('admin.addPlace')}
        </button>
      </div>

      {showForm && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <h3 className="text-lg font-medium mb-4">{editingId ? t('admin.updatePlace') : t('admin.addPlaceNew')}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">{t('admin.placeName')} *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{t('admin.address')}</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{t('admin.coordinatesLabel')} *</label>
              <input
                type="text"
                placeholder={t('admin.coordinatesPlaceholder')}
                value={formData.coordinates}
                onChange={(e) => setFormData({ ...formData, coordinates: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{t('admin.imageType')}</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="media_type"
                    value="flat"
                    checked={formData.media_type === 'flat'}
                    onChange={(e) => setFormData({ ...formData, media_type: e.target.value })}
                  />
                  {t('admin.flatImage')}
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="media_type"
                    value="360"
                    checked={formData.media_type === '360'}
                    onChange={(e) => setFormData({ ...formData, media_type: e.target.value })}
                  />
                  {t('admin.image360')}
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{t('admin.narrationFile')}</label>
              <input
                type="file"
                accept="audio/*"
                onChange={(e) => setNarrationFile(e.target.files?.[0] || null)}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{t('admin.imageFile')}</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                {editingId ? t('admin.updatePlace') : t('admin.addPlace')}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                {t('common.cancel')}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <p>{t('common.loading')}</p>
      ) : (
        <div className="grid gap-4">
          {places.length === 0 ? (
            <p className="text-gray-500">{t('admin.noPlaces')}</p>
          ) : (
            places.map((place) => (
              <div
                key={place.id}
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 flex justify-between items-start"
              >
                <div>
                  <h3 className="font-medium">{place.name}</h3>
                  {place.address && <p className="text-sm text-gray-500">{place.address}</p>}
                  <p className="text-xs text-gray-400 mt-1">
                    {t('admin.coordinatesLabel')}: {Array.isArray(place.coordinates) ? place.coordinates.join(', ') : place.coordinates}
                    {place.media_type && ` • ${place.media_type === '360' ? t('admin.image360') : t('admin.flatImage')}`}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(place)}
                    className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(place.id)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
