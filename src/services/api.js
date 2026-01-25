// src/services/api.js
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const heritageApi = {
  // Lấy danh sách (Public - theo ngôn ngữ)
  async getAll(lang = 'vi', page = 1, limit = 10) {
    const res = await fetch(`${API_BASE_URL}/heritages?lang=${lang}&page=${page}&limit=${limit}`);
    if (!res.ok) throw new Error('Failed to fetch heritages');
    return res.json();
  },

  // Lấy chi tiết (Public - theo ngôn ngữ)
  async getById(id, lang = 'vi') {
    const res = await fetch(`${API_BASE_URL}/heritages/${id}?lang=${lang}`);
    if (!res.ok) throw new Error('Heritage not found');
    return res.json();
  },

  // Admin: Lấy danh sách
  async adminGetAll(page = 1, limit = 10) {
    const res = await fetch(`${API_BASE_URL}/admin/heritages?page=${page}&limit=${limit}`);
    if (!res.ok) throw new Error('Failed to fetch heritages');
    return res.json();
  },

  // Admin: Lấy chi tiết
  async adminGetById(id) {
    const res = await fetch(`${API_BASE_URL}/admin/heritages/${id}`);
    if (!res.ok) throw new Error('Heritage not found');
    return res.json();
  },

  // Admin: Tạo mới
  async create(formData) {
    const res = await fetch(`${API_BASE_URL}/admin/heritages`, {
      method: 'POST',
      body: formData, // FormData object
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to create heritage');
    }
    return res.json();
  },

  // Admin: Cập nhật
  async update(id, formData) {
    const res = await fetch(`${API_BASE_URL}/admin/heritages/${id}`, {
      method: 'PUT',
      body: formData,
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to update heritage');
    }
    return res.json();
  },

  // Admin: Xóa
  async delete(id) {
    const res = await fetch(`${API_BASE_URL}/admin/heritages/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete heritage');
    return res.json();
  },

  // Lấy danh sách ngôn ngữ
  async getLanguages() {
    const res = await fetch(`${API_BASE_URL}/languages`);
    if (!res.ok) throw new Error('Failed to fetch languages');
    return res.json();
  },
};

export default heritageApi;