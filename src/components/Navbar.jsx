export default function Navbar() {
  return (
    <nav className="bg-[#00549F] text-white h-14 px-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div>
          <p className="text-[10px] leading-none">
            Research and Office of Economist
          </p>

          <h2 className="font-bold text-xl">bank bjb</h2>
        </div>
      </div>

      <ul className="hidden lg:flex gap-8 text-sm">
        <li>Publikasi</li>
        <li>Makroekonomi</li>
        <li>Industry</li>
        <li>Regional</li>
        <li>Market Intelligence</li>
        <li>Outlook Economic Forum</li>
      </ul>

      <button className="bg-yellow-400 text-black px-4 py-2 rounded">
        Profil ▼
      </button>
    </nav>
  )
}
