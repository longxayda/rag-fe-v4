import { Mail, School, Users, Landmark, MapPin, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    // Updated background to a warm cream/heritage white to match the screenshot section backgrounds
    <footer className="bg-white text-slate-600 border-t border-slate-100 relative mb-20 md:mb-0">
      {/* Soft divider line */}
      <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Project Info */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center shadow-sm">
                <Landmark className="w-6 h-6 text-brand-accent" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-brand-dark">Di Sản Cà Mau</h3>
                <p className="text-xs uppercase tracking-widest text-slate-400">Heritage Explorer</p>
              </div>
            </div>

            <p className="text-sm text-slate-500 leading-relaxed mb-6">
              Nền tảng khám phá di sản văn hóa Cà Mau với công nghệ AI hiện đại, kết nối lịch sử, con người và thiên nhiên vùng Đất Mũi.
            </p>

            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 text-xs rounded-full bg-slate-100 border border-slate-200">
                🤖 RAG System
              </span>
              <span className="px-3 py-1 text-xs rounded-full bg-slate-100 border border-slate-200">
                🧠 AI Assistant
              </span>
            </div>
          </div>

          {/* Team */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <Users className="w-5 h-5 text-brand-accent" />
              <h3 className="text-lg font-bold text-brand-dark">Đội Ngũ Thực Hiện</h3>
            </div>

            <div className="space-y-4 text-sm text-slate-500">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <p className="text-brand-dark font-semibold">GVHD: Lê Nguyễn Thế Bảo</p>
                <p className="text-xs opacity-70">THPT Chuyên Lý Tự Trọng</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                  <p className="text-brand-dark text-sm">Trương Minh Khiêm</p>
                  <p className="text-xs opacity-60">12A6</p>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                  <p className="text-brand-dark text-sm">Trần Thị Thanh Trúc</p>
                  <p className="text-xs opacity-60">10A2</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="md:text-right">
            <div className="flex items-center md:justify-end gap-2 mb-5">
              <Mail className="w-5 h-5 text-brand-accent" />
              <h3 className="text-lg font-bold text-brand-dark">Liên Hệ</h3>
            </div>

            <div className="space-y-3 text-sm text-slate-500">
              <div className="flex items-center md:justify-end gap-2">
                <School className="w-4 h-4 text-slate-400" />
                <span>Trường THPT Võ Văn Kiệt</span>
              </div>
              <div className="flex items-center md:justify-end gap-2">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>Cà Mau, Việt Nam</span>
              </div>

              <a
                href="mailto:contact@disancamau.vn"
                className="inline-flex items-center gap-2 px-5 py-2.5 mt-4 rounded-xl bg-brand-dark text-white font-semibold hover:opacity-90 transition shadow-sm"
              >
                <Mail className="w-4 h-4" />
                Liên hệ với chúng tôi
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-200 mt-12 pt-6 text-center text-sm text-slate-400">
          © 2026 Di Sản Cà Mau — Bảo tồn và phát huy giá trị di sản văn hóa
        </div>
      </div>
    </footer>
  );
}