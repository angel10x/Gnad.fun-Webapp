export function Logo() {
  return (
    <div className="flex items-center">
      <svg className="w-10 h-10" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="monadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#a855f7', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <path d="M 50 15 L 75 35 L 75 65 L 50 85 L 25 65 L 25 35 Z" fill="none" stroke="url(#monadGrad)" strokeWidth="5" />
        <path d="M 50 30 L 65 42 L 65 58 L 50 70 L 35 58 L 35 42 Z" fill="url(#monadGrad)" opacity="0.3" />
        <circle cx="50" cy="45" r="4" fill="#a855f7" />
        <path d="M 35 48 L 50 58 L 65 48" stroke="url(#monadGrad)" strokeWidth="4" fill="none" strokeLinecap="round" />
      </svg>
      {/* <img src="/imgs/gnad.png" alt="" style={{width: "32px"}}/> */}
      <h1 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
        <a href="/">GNAD.FUN</a>
      </h1>
    </div>
  );
}
