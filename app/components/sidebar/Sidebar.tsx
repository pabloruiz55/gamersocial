import getCurrentUser from "@/app/actions/getCurrentUser";
import DesktopSidebar from "./DesktopSidebar"
import MobileFooter from "./MobileFooter";

async function Sidebar({children}:{
    children: React.ReactNode;
}) {
    const currentUser = await getCurrentUser();

    return (
        <div className="flex justify-start">
            <DesktopSidebar currentUser={currentUser!} />
            <MobileFooter />
        </div>
    )
}

export default Sidebar;