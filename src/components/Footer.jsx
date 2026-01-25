import React from 'react';
import { Heart, Mail, School, Users, Landmark, MapPin, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-amber-50 via-yellow-50 to-green-50 text-gray-700 relative mb-20 md:mb-0">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-red-700 via-yellow-500 to-red-700" />

      <div className="container mx-auto px-4 py-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Project Info */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <div className="w-11 h-11 rounded-full bg-red-700 flex items-center justify-center shadow-lg border-2 border-yellow-500">
                <Landmark className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-red-900">
                  Di Sản Cà Mau
                </h3>
                <p className="text-xs text-yellow-700 tracking-wide font-semibold">Heritage Explorer</p>
              </div>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Nền tảng khám phá di sản văn hóa Cà Mau với công nghệ AI tiên tiến, kết nối quá khứ và hiện tại.
            </p>

            {/* Technology badges */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              <span className="px-3 py-1 bg-white/80 backdrop-blur rounded-full text-xs text-yellow-700 border border-yellow-300 shadow-sm font-medium">
                🤖 RAG Technology
              </span>
              <span className="px-3 py-1 bg-white/80 backdrop-blur rounded-full text-xs text-yellow-700 border border-yellow-300 shadow-sm font-medium">
                🧠 LLM Powered
              </span>
            </div>
          </div>

          {/* Team Members */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-yellow-600 flex items-center justify-center shadow-md">
                <Users className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-base font-bold text-red-900">
                Đội Ngũ Thực Hiện
              </h3>
            </div>

            <div className="space-y-3">
              {/* Teacher */}
              <div className="bg-white/80 backdrop-blur rounded-lg p-3 border border-yellow-200 shadow-md">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <School className="w-4 h-4 text-yellow-600" />
                  <span className="text-yellow-700 font-semibold text-sm">
                    Giáo Viên Hướng Dẫn
                  </span>
                </div>
                <p className="text-red-900 font-medium">Lê Nguyễn Thế Bảo</p>
                <p className="text-xs text-gray-600">Trường THPT Chuyên Lý Tự Trọng</p>
              </div>

              {/* Students */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white/80 backdrop-blur rounded-lg p-3 border border-yellow-200 shadow-md">
                  <p className="text-xs text-yellow-700 mb-1 font-semibold">Học Sinh</p>
                  <p className="text-red-900 font-medium text-sm">Trương Minh Khiêm</p>
                  <p className="text-xs text-gray-600">12A6</p>
                </div>
                <div className="bg-white/80 backdrop-blur rounded-lg p-3 border border-yellow-200 shadow-md">
                  <p className="text-xs text-yellow-700 mb-1 font-semibold">Học Sinh</p>
                  <p className="text-red-900 font-medium text-sm">Trần Thị Thanh Trúc</p>
                  <p className="text-xs text-gray-600">10A2</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="text-center md:text-right">
            <div className="flex items-center justify-center md:justify-end gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-red-700 flex items-center justify-center shadow-md">
                <Mail className="w-4 h-4 text-yellow-400" />
              </div>
              <h3 className="text-base font-bold text-red-900">
                Liên Hệ
              </h3>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-center md:justify-end gap-2 text-gray-600">
                <School className="w-4 h-4 text-yellow-600" />
                <span>Trường THPT Chuyên Lý Tự Trọng</span>
              </div>
              <div className="flex items-center justify-center md:justify-end gap-2 text-gray-600">
                <MapPin className="w-4 h-4 text-yellow-600" />
                <span>Cà Mau, Việt Nam</span>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-2 py-2">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-yellow-300/50 to-transparent" />
              </div>

              <a
                href="mailto:contact@disancamau.vn"
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-700 hover:bg-red-600 rounded-lg transition-all duration-300 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Mail className="w-4 h-4" />
                <span>Liên Hệ Với Chúng Tôi</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-yellow-300/40 to-yellow-300/40" />
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-600" />
            <Landmark className="w-4 h-4 text-yellow-600" />
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-600" />
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-yellow-300/40 via-yellow-300/40 to-transparent" />
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-sm text-gray-600 font-medium">
            © 2024 Di Sản Cà Mau - Bảo tồn và phát huy di sản văn hóa
          </p>
          <p className="text-xs mt-2 text-gray-500 flex items-center justify-center gap-1">
            Được làm với
            <Heart className="w-3 h-3 text-red-600 fill-red-600" />
            tại Cà Mau
          </p>
        </div>
      </div>
    </footer>
  );
}