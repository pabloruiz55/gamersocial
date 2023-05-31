'use client';

import useRoutes from "@/app/hooks/useRoutes";
import { useState } from "react";
import DesktopItem from "./DesktopItem";
import {User} from "@prisma/client";
//import Avatar from "../Avatar";
//import SettingsModal from "./SettingsModal";

interface DesktopSiderbarProps {
    currentUser: User
}

const DesktopSidebar: React.FC<DesktopSiderbarProps> = (
    {currentUser}
) => {
    const routes = useRoutes();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="
                hidden
                md:flex
                h-full
                border-r
                justify-end
                "
            >
                <nav
                    className="
                        mt-2
                        flex
                        flex-col
                        justify-between
                        lg:w-40
                        w-auto
                    "
                >
                    <ul
                        role="list"
                        className="
                            flex
                            flex-col
                            items-start
                            space-y-1
                    ">
                        {routes.map((item) => (
                            <DesktopItem
                                key={item.label}
                                href={item.href}
                                label={item.label}
                                icon={item.icon}
                                active={item.active}
                                onClick={item.onClick}
                            />
                        ))}
                    </ul>
                </nav>
                <nav className="mt-4 flex flex-col justify-between items-center">
                <div 
                    onClick={() => setIsOpen(true)} 
                    className="cursor-pointer hover:opacity-75 transition"
                >
                </div>
                </nav>
                
            </div>
        </>
    )
}

export default DesktopSidebar;