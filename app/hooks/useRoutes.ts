import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { HiChat } from 'react-icons/hi';
import { HiArrowLeftOnRectangle, HiUsers } from 'react-icons/hi2';
import { signOut } from "next-auth/react";
import { Icons } from "@/components/icons";

const useRoutes = () => {
  const pathname = usePathname();

  const routes = useMemo(() => [
    { 
        key: 1,
        label: '', 
        href: '/feed', 
        icon: Icons.logo,
        active: pathname === '/feed'
      },
    { 
      key: 2,
      label: 'Feed', 
      href: '/feed', 
      icon: HiChat,
      active: pathname === '/feed'
    },
    {
      key: 3,
      label: 'Logout', 
      onClick: () => signOut(),
      href: '#',
      icon: HiArrowLeftOnRectangle, 
    }
  ], [pathname]);

  return routes;
};

export default useRoutes;