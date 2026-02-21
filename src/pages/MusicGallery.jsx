import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Music } from "lucide-react";
import { musicApi } from "../services/api";

export const MusicGallery = () => {
  const { t } = useTranslation();
  const [musicList, setMusicList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMusic, setSelectedMusic] = useState(null);

  useEffect(() => {
    fetchMusic();
  }, []);

  const fetchMusic = async () => {
    try {
      const result = await musicApi.getAll(1, 50);
      setMusicList(result.data || []);
    } catch (err) {
      console.error("Failed to load music", err);
    } finally {
      setLoading(false);
    }
  };

  const getVideoId = (url) => {
    try {
      const parsed = new URL(url);

      if (parsed.hostname.includes("youtu.be")) {
        return parsed.pathname.slice(1);
      }

      if (parsed.hostname.includes("youtube.com")) {
        return parsed.searchParams.get("v");
      }

      return null;
    } catch {
      return null;
    }
  };

  const getThumbnail = (url) => {
    const id = getVideoId(url);
    if (!id) return null;
    return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  };

  const getEmbedUrl = (url) => {
    const id = getVideoId(url);
    if (!id) return null;
    return `https://www.youtube.com/embed/${id}`;
  };

  if (loading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">{t('common.loading')}</p>
      </div>
    );
  }

  if (musicList.length === 0) {
    return (
      <div className="w-full h-96 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-400 dark:text-gray-500">
        <Music className="w-16 h-16 mb-4 opacity-50" />
        <h3 className="text-xl font-bold text-gray-500 dark:text-gray-400">{t('heritageList.musicLibrary')}</h3>
        <p>{t('heritageList.noMusic')}</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {musicList.map((music) => (
          <div
            key={music.id}
            className="cursor-pointer group"
            onClick={() => setSelectedMusic(music)}
          >
            <div className="relative overflow-hidden rounded-lg shadow-md">
              <img
                src={getThumbnail(music.youtube_url)}
                alt="thumbnail"
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                <Music className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedMusic && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-3xl p-4 relative border border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setSelectedMusic(null)}
              className="absolute top-2 right-2 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
            >
              ✕
            </button>

            <iframe
              src={getEmbedUrl(selectedMusic.youtube_url)}
              title="Music Player"
              className="w-full h-[500px] rounded"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
};
