"use clinet";

import { useRouter } from "next/navigation";
import Link from "next/link";

interface ConditionalRouterLinkProps {
  href: string;
  when?: boolean;
  className?: string;
  children?: React.ReactNode;
  callback?: () => void;
}

const ConditionalRouterLink: React.FC<ConditionalRouterLinkProps> = ({
  href,
  when,
  children,
  className,
  callback,
}) => {
  const router = useRouter();

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (typeof callback === "function" && when) {
      return callback();
    }

    return router.push(href);
  };

  return (
    <Link href={href} onClick={handleLinkClick} className={className}>
      {children}
    </Link>
  );
};

export default ConditionalRouterLink;
