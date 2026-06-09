import { useState } from 'react'
import Header from './Header'
import LeftSidebar from './LeftSidebar'
import RightSidebar from './RightSidebar'

const MainLayout = ({ children }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [mainContent, rightContent] = Array.isArray(children)
    ? children
    : [children, null]

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <Header onMenuClick={() => setIsMobileSidebarOpen(true)} />
      <main className="mx-auto grid max-w-[1728px] gap-6 px-4 pb-20 pt-3 sm:px-6 md:pt-5 lg:grid-cols-[260px_minmax(0,1fr)] lg:pb-5 xl:grid-cols-[260px_minmax(0,1fr)_320px]">
        <LeftSidebar
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
        />
        <section className="min-w-0">{mainContent}</section>
        <RightSidebar>{rightContent}</RightSidebar>
      </main>
    </div>
  )
}

export default MainLayout
