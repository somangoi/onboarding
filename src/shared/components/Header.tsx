import Logo from "@/assets/logo/logo.png";
import { Link } from "@tanstack/react-router";

export function Header({ onLogoClick }: { onLogoClick: () => void }) {
  return (
    <div className="p-4 flex items-center">
      <Link to="/" preload="intent" onClick={onLogoClick}>
        <img src={Logo} alt="logo" className="h-6 object-contain cursor-pointer" />
      </Link>
    </div>
  );
}
