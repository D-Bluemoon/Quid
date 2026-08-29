'use client';

import { useRouter } from 'next/navigation';
import { UserPlus } from 'lucide-react';
import { ONBOARDING_ROUTES } from '@/lib/onboarding';

interface SignUpButtonProps {
  className?: string;
  variant?: 'primary' | 'nav';
}

export default function SignUpButton({
  className = '',
  variant = 'primary',
}: SignUpButtonProps) {
  const router = useRouter();

  const baseStyles =
    variant === 'nav'
      ? 'brutal-border brutal-shadow bg-brutal-pink px-7 py-3 text-sm font-black uppercase tracking-wide text-foreground hover:translate-x-[-2px] hover:translate-y-[-2px]'
      : 'brutal-border brutal-shadow bg-brutal-yellow px-6 py-2 text-sm font-black uppercase tracking-wide text-foreground';

  const handleClick = () => {
    router.push(ONBOARDING_ROUTES.signUp);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center justify-center gap-2 cursor-pointer transition ${baseStyles} ${className}`}
    >
      <UserPlus className="h-5 w-5" />
      <span>Sign Up</span>
    </button>
  );
}
