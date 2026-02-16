import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-6 h-6 flex items-center justify-center">
            <img
              src="/8.png"
              alt="Omni logo"
              className="w-full h-full object-contain"
              style={{ filter: 'brightness(0) saturate(100%) invert(40%) sepia(95%) saturate(1500%) hue-rotate(200deg)' }}
            />
          </div>
          <span className="font-medium text-slate-900">Omni</span>
        </Link>
        <div className="text-sm text-slate-500">
          © {new Date().getFullYear()} Omni Inc. All rights reserved.
        </div>
        <div className="flex gap-6">
          <a
            href="#"
            className="text-slate-400 hover:text-primary transition-colors text-sm"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-slate-400 hover:text-primary transition-colors text-sm"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  )
}
