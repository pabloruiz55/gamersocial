import Sidebar from "../components/sidebar/Sidebar";

export default async function ConversationsLayout({
  children
}: {
  children: React.ReactNode,
}) {
  return (
    <div className="flex w-screen h-full justify-center">
      {// @ts-expect-error Server Component
      }<Sidebar/>
      <div className="flex h-full w-auto justify-center">
          <main className="flex w-[600px]">
            {children}
          </main>
          <div className="lg:flex hidden p-2 w-[320px]">
          <div className="w-full h-200 bg-gray-500 rounded-lg p-2">
            aaa
          </div>
        </div>
      </div>  
    </div>
   
    
  );
}