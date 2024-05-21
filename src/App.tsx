import { useState } from "react";
// import "./assets/App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function App() {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  const handleOpenSidebar = () => {
    setIsOpenSidebar(!isOpenSidebar);
  };

  return (
    <div className="flex">
      {isOpenSidebar && <Sidebar />}
      <div className="w-full">
        <Header handleOpenSidebar={handleOpenSidebar} />
        <main>
          <h1 className="text-xl">init</h1>
        </main>
      </div>
    </div>
  );
}

export default App;
