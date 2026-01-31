import { Mail, School, Users, Landmark, MapPin, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    // Updated background to a warm cream/heritage white to match the screenshot section backgrounds
    <footer className=" text-gray-700 relative mb-20 md:mb-0 border-t border-amber-200">
      {/* Decorative top border - using heritage red/gold gradient */}
      <div className="h-1 bg-gradient-to-r from-[#991B1B] via-[#D97706] to-[#991B1B]" />

      <div className="container mx-auto px-4 py-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Project Info */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              {/* Primary Icon Circle - Heritage Red with Gold Border */}
              <div className="w-11 h-11 rounded-full bg-[#991B1B] flex items-center justify-center shadow-lg border-2 border-[#D97706]">
                <Landmark className="w-5 h-5 text-[#FBBF24]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#7F1D1D]">
                  Di Sản Cà Mau
                </h3>
                <p className="text-xs text-[#B45309] tracking-wide font-semibold">Heritage Explorer</p>
              </div>
            </div>

            <p className="text-sm text-[#451A03] leading-relaxed mb-4 opacity-80">
              Nền tảng khám phá di sản văn hóa Cà Mau với công nghệ AI tiên tiến, kết nối quá khứ và hiện tại.
            </p>

            {/* Technology badges - Matching the subtle gold theme */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              <span className="px-3 py-1 bg-[#FEF3C7] rounded-full text-xs text-[#92400E] border border-[#FDE68A] shadow-sm font-medium">
                🤖 Mô hình RAG
              </span>
              <span className="px-3 py-1 bg-[#FEF3C7] rounded-full text-xs text-[#92400E] border border-[#FDE68A] shadow-sm font-medium">
                🧠 Mô hình LLM
              </span>
            </div>
          </div>

          {/* Team Members */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#D97706] flex items-center justify-center shadow-md">
                <Users className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-base font-bold text-[#7F1D1D]">
                Đội Ngũ Thực Hiện
              </h3>
            </div>

            <div className="space-y-3">
              {/* Teacher - Card style matching UI */}
              <div className="bg-white/50 backdrop-blur rounded-lg p-3 border border-[#FDE68A] shadow-sm">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <School className="w-4 h-4 text-[#D97706]" />
                  <span className="text-[#B45309] font-semibold text-sm">
                    Giáo Viên Hướng Dẫn
                  </span>
                </div>
                <p className="text-[#7F1D1D] font-medium">Lê Nguyễn Thế Bảo</p>
                <p className="text-xs text-[#92400E]/70">Trường THPT Chuyên Lý Tự Trọng</p>
              </div>

              {/* Students */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white/50 backdrop-blur rounded-lg p-3 border border-[#FDE68A] shadow-sm">
                  <p className="text-xs text-[#B45309] mb-1 font-semibold">Học Sinh</p>
                  <p className="text-[#7F1D1D] font-medium text-sm">Trương Minh Khiêm</p>
                  <p className="text-xs text-[#92400E]/70">12A6</p>
                </div>
                <div className="bg-white/50 backdrop-blur rounded-lg p-3 border border-[#FDE68A] shadow-sm">
                  <p className="text-xs text-[#B45309] mb-1 font-semibold">Học Sinh</p>
                  <p className="text-[#7F1D1D] font-medium text-sm">Trần Thị Thanh Trúc</p>
                  <p className="text-xs text-[#92400E]/70">10A2</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="text-center md:text-right">
            <div className="flex items-center justify-center md:justify-end gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#991B1B] flex items-center justify-center shadow-md">
                <Mail className="w-4 h-4 text-[#FBBF24]" />
              </div>
              <h3 className="text-base font-bold text-[#7F1D1D]">
                Liên Hệ
              </h3>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-center md:justify-end gap-2 text-[#451A03]/80">
                <School className="w-4 h-4 text-[#D97706]" />
                <span>Trường THPT Võ Văn Kiệt</span>
              </div>
              <div className="flex items-center justify-center md:justify-end gap-2 text-[#451A03]/80">
                <MapPin className="w-4 h-4 text-[#D97706]" />
                <span>Cà Mau, Việt Nam</span>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-2 py-2">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#D97706]/30 to-transparent" />
              </div>

              <a
                href="mailto:contact@disancamau.vn"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#991B1B] hover:bg-[#7F1D1D] rounded-lg transition-all duration-300 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Mail className="w-4 h-4" />
                <span>Liên Hệ Với Chúng Tôi</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider with Landmark Icon */}
        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#D97706]/40 to-[#D97706]/40" />
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
            <Landmark className="w-4 h-4 text-[#D97706]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-[#D97706]/40 via-[#D97706]/40 to-transparent" />
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-sm text-[#451A03]/60 font-medium">
            © 2026 Di Sản Cà Mau - Bảo tồn và phát huy di sản văn hóa
          </p>
        </div>
      </div>
    </footer>
  );
}