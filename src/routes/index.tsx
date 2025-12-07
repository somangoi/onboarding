import { createFileRoute } from "@tanstack/react-router";
import TextLogo from "@/assets/logo/text-logo.png";
import { Button } from "@/shared/components/Button";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="h-[calc(100vh-56px)] flex flex-col items-center justify-center">
      <img src={TextLogo} alt="logo" className="h-9 object-contain mb-2" />
      <p className="text-[length:var(--font-size-heading)] text-[color:var(--color-text)] font-[var(--font-weight-heading)] text-center mb-8">
        차원이 다른 <span className="bg-gradient-to-b from-blue-500 to-purple-600 bg-clip-text text-transparent font-[var(--font-weight-heading)]">AI</span> 투자비서
      </p>

      <Button as="link" to="/step-1" label="서비스 시작하기" variant="primary" />
    </div>
  );
}
