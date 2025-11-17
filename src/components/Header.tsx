import { Logo } from './Logo';
import { WalletDropdown } from './WalletConnect/WalletDropdown';
import { ChevronDown } from 'lucide-react';
import { useGlobalContext } from '../context/GlobalContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
// import { useTranslation } from '../hooks/useTranslation';

interface HeaderProps {
  sticky?: boolean;
  className?: string;
}

export function Header({ sticky = false, className = '' }: HeaderProps) {
  const stickyCls = sticky ? 'sticky top-0 z-40' : '';
  const { language, setLanguage } = useGlobalContext();
  const [isLangOpen, setIsLangOpen] = useState(false);

  return (
    <header className={`border-b border-white/10 bg-black/20 backdrop-blur-lg ${stickyCls} ${className}`.trim()}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-4">
            {/* <div className="flex items-center gap-3">
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
            </div> */}
            <WalletDropdown />
            <DropdownMenu open={isLangOpen} onOpenChange={setIsLangOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="default"
                  className="cursor-pointer gap-2 px-4 py-2 border-purple-500/30 bg-transparent hover:bg-purple-500/20 text-purple-400 hover:text-white transition-all duration-200 h-9"
                >
                  <span className="text-sm font-medium">{language === 'en' ? 'EN' : '中文'}</span>
                  <ChevronDown
                    className={`size-4 transition-transform duration-200 ${isLangOpen ? "rotate-180" : ""}`}
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-40 bg-slate-950/98 border border-purple-500/30 backdrop-blur-lg rounded-xl shadow-2xl p-2 space-y-1"
              >
                <DropdownMenuItem 
                  onClick={() => {
                    setLanguage('en');
                    setIsLangOpen(false);
                  }}
                  className="cursor-pointer px-4 py-2 text-white/80 hover:text-white focus:text-white hover:bg-purple-500/20 focus:bg-purple-500/20 rounded-lg mx-0 transition-all duration-200"
                >
                  English
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => {
                    setLanguage('zh');
                    setIsLangOpen(false);
                  }}
                  className="cursor-pointer px-4 py-2 text-white/80 hover:text-white focus:text-white hover:bg-purple-500/20 focus:bg-purple-500/20 rounded-lg mx-0 transition-all duration-200"
                >
                  中文
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
