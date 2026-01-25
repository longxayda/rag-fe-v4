import React from 'react';
import { motion } from 'framer-motion';

/**
 * AboutPage Component
 * 
 * About page for the heritage website
 * Features: Project information, mission, team, and contact details
 */
const AboutPage = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Về Dự Án Di Sản Văn Hóa
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Bảo tồn và phát huy giá trị di sản văn hóa Việt Nam
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Sứ Mệnh
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Dự án Di Sản Văn Hóa được thành lập với sứ mệnh bảo tồn, nghiên cứu và 
              phát huy giá trị của các di sản văn hóa Việt Nam. Chúng tôi tin rằng việc 
              hiểu biết và trân trọng di sản là chìa khóa để xây dựng một tương lai bền vững.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Thông qua nền tảng số hiện đại, chúng tôi mong muốn đưa di sản văn hóa 
              đến gần hơn với mọi người, đặc biệt là thế hệ trẻ, giúp họ khám phá và 
              tự hào về bản sắc văn hóa dân tộc.
            </p>
          </div>
        </motion.section>

        {/* Vision Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Tầm Nhìn
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-300 mb-3">
                📚 Giáo Dục
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Cung cấp kiến thức toàn diện về di sản văn hóa thông qua nội dung 
                đa dạng và dễ tiếp cận.
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-green-900 dark:text-green-300 mb-3">
                🌍 Kết Nối
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Kết nối mọi người với di sản qua công nghệ, tạo cộng đồng yêu thích 
                văn hóa truyền thống.
              </p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-purple-900 dark:text-purple-300 mb-3">
                🔬 Nghiên Cứu
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Thúc đẩy nghiên cứu và bảo tồn di sản thông qua số hóa và lưu trữ 
                dữ liệu.
              </p>
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-amber-900 dark:text-amber-300 mb-3">
                🎯 Truyền Cảm Hứng
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Khơi dậy niềm tự hào và trách nhiệm bảo vệ di sản cho thế hệ tương lai.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Liên Hệ
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              Chúng tôi luôn sẵn sàng lắng nghe ý kiến đóng góp và hợp tác với các 
              tổ chức, cá nhân quan tâm đến bảo tồn di sản văn hóa.
            </p>
            <div className="space-y-3">
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Email:</span> contact@heritage-vn.org
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Điện thoại:</span> +84 123 456 789
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Địa chỉ:</span> Hà Nội, Việt Nam
              </p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default AboutPage;

