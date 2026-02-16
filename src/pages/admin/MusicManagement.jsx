import { useEffect, useState } from "react";
import { musicApi } from "../../services/api";

export default function MusicManagement() {
  const [musicList, setMusicList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newLinks, setNewLinks] = useState([""]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchMusic();
  }, []);

  const fetchMusic = async () => {
    try {
      setLoading(true);
      const result = await musicApi.adminGetAll(1, 100);
      setMusicList(result.data || []);
    } catch (err) {
      alert("Failed to load music");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this music?")) return;

    try {
      await musicApi.delete(id);
      fetchMusic();
    } catch (err) {
      alert("Delete failed");
    }
  };

  const handleAddInput = () => {
    setNewLinks([...newLinks, ""]);
  };

  const handleChange = (index, value) => {
    const updated = [...newLinks];
    updated[index] = value;
    setNewLinks(updated);
  };

  const handleRemoveInput = (index) => {
    const updated = newLinks.filter((_, i) => i !== index);
    setNewLinks(updated);
  };

  const handleSubmit = async () => {
    const filteredLinks = newLinks
      .map((l) => l.trim())
      .filter((l) => l !== "");

    if (filteredLinks.length === 0) {
      alert("Please enter at least one link");
      return;
    }

    try {
      setSubmitting(true);
      await musicApi.create(filteredLinks);
      setShowModal(false);
      setNewLinks([""]);
      fetchMusic();
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const getEmbedUrl = (url) => {
    try {
      const parsed = new URL(url);

      if (parsed.hostname.includes("youtu.be")) {
        const id = parsed.pathname.slice(1);
        return `https://www.youtube.com/embed/${id}`;
      }

      if (parsed.hostname.includes("youtube.com")) {
        const id = parsed.searchParams.get("v");
        return `https://www.youtube.com/embed/${id}`;
      }

      return null;
    } catch {
      return null;
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Music Management</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Music
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {musicList.map((music) => (
            <div
              key={music.id}
              className="border rounded p-4 shadow-sm bg-white"
            >
              <iframe
                className="w-full h-48 rounded mb-3"
                src={getEmbedUrl(music.youtube_url)}
                title="music"
                allowFullScreen
              />
              <p className="text-sm break-all mb-2">
                {music.youtube_url}
              </p>
              <button
                onClick={() => handleDelete(music.id)}
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
              Add Multiple Music Links
            </h3>

            <div className="space-y-3">
              {newLinks.map((link, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter YouTube link"
                    value={link}
                    onChange={(e) =>
                      handleChange(index, e.target.value)
                    }
                    className="flex-1 border px-3 py-2 rounded"
                  />
                  {newLinks.length > 1 && (
                    <button
                      onClick={() => handleRemoveInput(index)}
                      className="text-red-500"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={handleAddInput}
              className="mt-3 text-blue-600 text-sm"
            >
              + Add another link
            </button>

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
                {submitting ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
