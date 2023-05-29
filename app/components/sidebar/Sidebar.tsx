import getCurrentUser from "@/app/actions/getCurrentUser";
import DesktopSidebar from "./DesktopSidebar"
import MobileFooter from "./MobileFooter";

async function Sidebar({children}:{
    children: React.ReactNode;
}) {
    const currentUser = await getCurrentUser();

    return (
        <div className="flex justify-center w-full h-screen">
            <DesktopSidebar currentUser={currentUser!} />
            <MobileFooter />
            <main className="flex justify-start w-2/3 h-full">
                {children}
            </main>
        </div>
    )
}

export default Sidebar;