import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Palette, X } from "lucide-react";
import { fineArtApi } from "../services/api";

export const FineArtsGallery = () => {
  const { t } = useTranslation();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const result = await fineArtApi.getAll(1, 100);
      setImages(result.data || []);
    } catch {
      console.error("Failed to load fine art");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-96 flex items-center justify-center text-gray-500 dark:text-gray-400">
        {t('common.loading')}
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="w-full h-96 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-400 dark:text-gray-500">
        <Palette className="w-16 h-16 mb-4 opacity-50" />
        <h3 className="text-xl font-bold text-gray-500 dark:text-gray-400">{t('heritageList.fineArtsLibrary')}</h3>
        <p>{t('heritageList.noFineArts')}</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((item) => (
          <div
            key={item.id}
            className="overflow-hidden rounded-lg shadow hover:shadow-lg transition cursor-pointer"
            onClick={() => setSelectedImage(item.fineart_url)}
          >
            <img
              src={item.fineart_url}
              alt="fine art"
              className="w-full h-48 object-cover hover:scale-105 transition duration-300"
            />
          </div>
        ))}
      </div>

      {/* Image Preview Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-5 right-5 text-white"
          >
            <X size={32} />
          </button>

          <img
            src={selectedImage}
            alt="preview"
            className="max-h-[90vh] max-w-[90vw] rounded shadow-lg"
          />
        </div>
      )}
    </>
  );
};
