import { Link } from 'react-router-dom'
import { MdMovie } from 'react-icons/md'
import { FaGithub, FaInstagram, FaXTwitter } from 'react-icons/fa6'

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/miral-harsora/entertainment-app-m5', icon: FaGithub },
  { label: 'Instagram', href: 'https://www.instagram.com/', icon: FaInstagram },
  { label: 'X', href: 'https://x.com/', icon: FaXTwitter },
]

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-[#283044] bg-[#10141E] px-4 py-10 text-[#BFC4CE] md:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link to="/" aria-label="CineVault home" className="inline-flex items-center gap-2 text-lg font-semibold text-white"><MdMovie className="text-[#E50914]" size={27} />CineVault</Link>
          <p className="mt-3 max-w-sm text-sm leading-6">Discover what to watch next, save the titles you love, and explore movies and series in one place.</p>
          <div className="mt-5 flex gap-3">
            {socialLinks.map(({ label, href, icon: Icon }) => <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={`Open ${label}`} className="rounded-lg bg-[#161D2F] p-2.5 text-white transition hover:-translate-y-0.5 hover:bg-[#FC4747] focus:outline-none focus:ring-2 focus:ring-[#FC4747]"><Icon size={18} /></a>)}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Explore</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li><Link to="/" className="transition hover:text-white">Home</Link></li>
            <li><Link to="/movies" className="transition hover:text-white">Movies</Link></li>
            <li><Link to="/tvseries" className="transition hover:text-white">TV series</Link></li>
            <li><Link to="/bookmarked" className="transition hover:text-white">My bookmarks</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Support</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li><Link to="/login" className="transition hover:text-white">Sign in</Link></li>
            <li><Link to="/signup" className="transition hover:text-white">Create an account</Link></li>
            <li><a href="mailto:miralharsora18@gmail.com" className="transition hover:text-white">Contact support</a></li>
            <li><a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer" className="transition hover:text-white">Powered by TMDB</a></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-[#283044] pt-5 text-xs text-[#87898E]">© {new Date().getFullYear()} Built for discovering great entertainment.</div>
    </footer>
  )
}
