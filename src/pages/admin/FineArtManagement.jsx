import { useEffect, useState } from "react";
import { fineArtApi } from "../../services/api";

export default function FineArtManagement() {
  const [fineArtList, setFineArtList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchFineArt();
  }, []);

  const fetchFineArt = async () => {
    try {
      setLoading(true);
      const result = await fineArtApi.adminGetAll(1, 100);
      setFineArtList(result.data || []);
    } catch (err) {
      alert("Failed to load fine art");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this image?")) return;

    try {
      await fineArtApi.delete(id);
      fetchFineArt();
    } catch (err) {
      alert("Delete failed");
    }
  };

  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };

  const handleSubmit = async () => {
    if (selectedFiles.length === 0) {
      alert("Please select at least one image");
      return;
    }

    try {
      setSubmitting(true);

      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append("fineart", file);
      });

      await fineArtApi.create(formData);

      setShowModal(false);
      setSelectedFiles([]);
      fetchFineArt();
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Fine Art Management</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Images
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {fineArtList.map((item) => (
            <div
              key={item.id}
              className="border rounded p-3 shadow-sm bg-white"
            >
              <img
                src={item.fineart_url}
                alt="fine art"
                className="w-full h-48 object-cover rounded mb-3"
              />

              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-full max-w-lg">
            <h3 className="text-lg font-semibold mb-4">
              Upload Multiple Images
            </h3>

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="mb-4"
            />

            {selectedFiles.length > 0 && (
              <div className="text-sm text-gray-600 mb-4">
                {selectedFiles.length} file(s) selected
              </div>
            )}

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                {submitting ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
