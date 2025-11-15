import { Logo } from './Logo';
import { WalletDropdown } from './WalletConnect/WalletDropdown';
import { SOCIAL_LINKS } from '../constants/socialLinks';

interface HeaderProps {
  sticky?: boolean;
  className?: string;
}

export function Header({ sticky = false, className = '' }: HeaderProps) {
  const stickyCls = sticky ? 'sticky top-0 z-40' : '';

  return (
    <header className={`border-b border-white/10 bg-black/20 backdrop-blur-lg ${stickyCls} ${className}`.trim()}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-9 rounded-full border border-purple-500/30 flex items-center justify-center text-purple-400 hover:text-white hover:border-purple-400 hover:bg-purple-500/20 transition-all"
                  aria-label={label}
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
            <WalletDropdown />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
