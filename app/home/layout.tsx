import Sidebar from "../components/sidebar/Sidebar";

export default async function ConversationsLayout({
  children
}: {
  children: React.ReactNode,
}) {
  return (
    <div className="flex w-screen h-screen justify-center">
     <div className="flex h-full w-[1400px]">
        {// @ts-expect-error Server Component
        }<Sidebar/>
        <main className="flex w-full justify-start">
          {children}
        </main>
      </div>
    </div>
   
    
  );
}