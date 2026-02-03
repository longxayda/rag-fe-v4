// src/services/api.js
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const heritageApi = {
  // ========================================
  // PUBLIC ROUTES (with language support)
  // ========================================
  
  /**
   * Get paginated heritage list by language
   * Returns: { data: [...], pagination: { page, limit, total, totalPages } }
   */
  async getAll(lang = 'vi', page = 1, limit = 10) {
    const res = await fetch(`${API_BASE_URL}/heritages?lang=${lang}&page=${page}&limit=${limit}`);
    if (!res.ok) throw new Error('Failed to fetch heritages');
    const result = await res.json();
    
    // Backend returns { data, pagination } directly
    return result;
  },

  /**
   * Get heritage detail by ID and language
   * Returns: heritage object with translations, gallery, youtube_links, available_languages
   */
  async getById(id, lang = 'vi') {
    const res = await fetch(`${API_BASE_URL}/heritages/${id}?lang=${lang}`);
    if (!res.ok) throw new Error('Heritage not found');
    const heritage = await res.json();
    
    // Backend returns heritage object directly (not wrapped)
    return heritage;
  },

  // ========================================
  // ADMIN ROUTES
  // ========================================
  
  /**
   * Admin: Get all heritages (Vietnamese only, for management)
   * Returns: { success: true, data: [...], pagination: {...} }
   */
  async adminGetAll(page = 1, limit = 10) {
    const res = await fetch(`${API_BASE_URL}/admin/heritages?page=${page}&limit=${limit}`);
    if (!res.ok) throw new Error('Failed to fetch heritages');
    const result = await res.json();
    
    // Backend returns { success: true, data, pagination }
    return result;
  },

  /**
   * Admin: Get heritage detail by ID
   * Returns: { success: true, data: {...} }
   */
  async adminGetById(id) {
    const res = await fetch(`${API_BASE_URL}/admin/heritages/${id}`);
    if (!res.ok) throw new Error('Heritage not found');
    const result = await res.json();
    
    // Backend returns { success: true, data: {...} }
    return result;
  },

  /**
   * Admin: Create new heritage
   * FormData fields:
   * - name, information, year_built, year_ranked, ranking_type
   * - address, commune, district, province, notes
   * - input_lang (default: 'vi')
   * - image (file - main cover)
   * - audio (file - optional, for original language)
   * - gallery (files[] - up to 20 images)
   * - youtube_links (JSON string array)
   * 
   * Returns: { success: true, data: { id }, message }
   */
  async create(formData) {
    const res = await fetch(`${API_BASE_URL}/admin/heritages`, {
      method: 'POST',
      body: formData, // FormData object
    });
    
    const result = await res.json();
    
    if (!res.ok) {
      throw new Error(result.error || result.message || 'Failed to create heritage');
    }
    
    // Backend returns { success: true, data: { id }, message }
    return result;
  },

  /**
   * Admin: Update existing heritage
   * FormData fields: same as create, plus:
   * - regenerate_translations (boolean/string - force regenerate all translations)
   * - keep_media_ids (JSON string array - media IDs to keep, others deleted)
   * 
   * Returns: { success: true, data: { id }, message }
   */
  async update(id, formData) {
    const res = await fetch(`${API_BASE_URL}/admin/heritages/${id}`, {
      method: 'PUT',
      body: formData,
    });
    
    const result = await res.json();
    
    if (!res.ok) {
      throw new Error(result.error || result.message || 'Failed to update heritage');
    }
    
    // Backend returns { success: true, data: { id }, message }
    return result;
  },

  /**
   * Admin: Delete heritage
   * Cascades to translations, media (files also deleted from disk)
   * Returns: { success: true, message }
   */
  async delete(id) {
    const res = await fetch(`${API_BASE_URL}/admin/heritages/${id}`, {
      method: 'DELETE',
    });
    
    const result = await res.json();
    
    if (!res.ok) {
      throw new Error(result.error || result.message || 'Failed to delete heritage');
    }
    
    // Backend returns { success: true, message }
    return result;
  },

  // ========================================
  // UTILITY
  // ========================================
  
  /**
   * Get supported languages
   * Note: This endpoint may not exist in current backend
   * Supported languages: vi, en, km, zh
   */
  async getLanguages() {
    try {
      const res = await fetch(`${API_BASE_URL}/languages`);
      if (!res.ok) throw new Error('Endpoint not found');
      return res.json();
    } catch (error) {
      // Fallback to hardcoded languages if endpoint doesn't exist
      return {
        success: true,
        data: [
          { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
          { code: 'en', name: 'English', flag: '🇬🇧' },
          { code: 'km', name: 'ភាសាខ្មែរ', flag: '🇰🇭' },
          { code: 'zh', name: '中文', flag: '🇨🇳' }
        ]
      };
    }
  },
};

export default heritageApi;