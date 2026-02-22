import React from 'react';
import { useTranslation } from 'react-i18next';

const PopularDestinations = () => {
  const { t } = useTranslation();
  // Sample data - destinations in Ca Mau region
  const destinationsData = [
  {
    id: 1,
    name: 'Mũi Cà Mau',
    places: '05',
    imageUrl: 'https://res.cloudinary.com/dybmh6wnf/image/upload/v1770215043/muicamau_hukadp.jpg',
  },
  {
    id: 2,
    name: 'Vườn Quốc gia U Minh Hạ',
    places: '03',
    imageUrl: 'https://res.cloudinary.com/dybmh6wnf/image/upload/v1770215239/vuonquocgia_rgz2mx.jpg',
  },
  {
    id: 3,
    name: 'Hòn Khoai',
    places: '02',
    imageUrl: 'https://res.cloudinary.com/dybmh6wnf/image/upload/v1770215043/dao-hon-khoai_mv6mal.jpg',
  },
  {
    id: 4,
    name: 'Vườn Cò Bạc Liêu',
    places: '04',
    imageUrl: 'https://res.cloudinary.com/dybmh6wnf/image/upload/v1770215042/vuonco_c1kqei.jpg',
  },
  {
    id: 5,
    name: 'Nhà Công Tử Bạc Liêu',
    places: '06',
    imageUrl: 'https://res.cloudinary.com/dybmh6wnf/image/upload/v1770215041/congtubaclieu_eaqpd7.jpg',
  },
  {
    id: 6,
    name: 'Cánh Đồng Điện Gió',
    places: '08',
    imageUrl: 'https://res.cloudinary.com/dybmh6wnf/image/upload/v1770215042/canhdongdiengio_djnmfh.jpg',
  },
];

  return (
    <section className="py-16 px-4 bg-white dark:bg-gray-900 theme-transition">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {t('home.popularDestinations.title')}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {t('home.popularDestinations.description')}
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {destinationsData.map((item) => (
            <div 
              key={item.id} 
              className="group relative h-[250px] rounded-md overflow-hidden cursor-pointer shadow-md hover:-translate-y-2 transition-transform duration-300"
            >
              {/* Background Image with Zoom Effect */}
              <img 
                src={item.imageUrl} 
                alt={item.name} 
                className="w-full h-full object-cover transition-transform duration-500"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

              {/* Card Content */}
              <div className="absolute bottom-0 left-0 p-6 w-full flex items-center">
                <h3 className="text-white text-2xl font-semibold mr-3">
                  {item.name}
                </h3>
                {/* <span className="bg-[#1ebba3] text-white text-xs font-medium px-3 py-1 rounded-full">
                  {item.places} Places
                </span> */}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PopularDestinations;