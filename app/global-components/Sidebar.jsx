import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebaseApp";
import { usePathname } from 'next/navigation';

export function Sidebar() {
  // sidebar with 3 tabs: home, journal, mood tracker
  const [user, loading, error] = useAuthState(auth);
  const pathname = usePathname();

  const renderSidebarTab = ({name, href, icon}) => {
    return (
      <Link key={href} href={href} 
      className={"flex items-center p-4 " + 
      (pathname === href ? "text-app-purple-500" : "text-app-black")}>
        {icon}
        <span>{name}</span>
      </Link>
    )
  }

  const tabs = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <i className="fas fa-home mr-3"></i>
    },
    {
      name: "Journal",
      href: "/journal-entries",
      icon: <i className="fas fa-book mr-3"></i>
    },
    {
      name: "Mood Tracker",
      href: "/mood-tracker",
      icon: <i className="fas fa-chart-line mr-3"></i>
    }
  ]

  return (
    <div className="h-screen w-64 text-app-black flex flex-col border-r-2 border-app-purple-700">
      <div className="flex items-center p-4">
        <img src="https://placehold.co/40x40" alt="User profile picture" className="rounded-full w-10 h-10" />
        <div className="ml-3 w-3/4">
          <div className="font-bold">{user.displayName}</div>
          <div className="text-sm text-gray-400 w-fit">{user.email}</div>
        </div>
      </div>
      <div className="h-screen mt-4">
        {tabs.map(tab => renderSidebarTab(tab))}
      </div>
    </div>
  )
}