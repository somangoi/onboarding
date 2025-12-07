import Logo from "@/assets/logo/logo.png";

export function Header({ onLogoClick }: { onLogoClick: () => void }) {
  return (
    <div className="p-4 flex items-center">
      <img src={Logo} alt="logo" className="h-6 object-contain cursor-pointer" onClick={onLogoClick} />
    </div>
  );
}
