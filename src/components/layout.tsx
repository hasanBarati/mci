import Header from "./header";
import Sidebar from "./sidebar";

export function Layout({ children }) {
  return (
    <div className="app">
      <Header />
      <div className="content">
        <Sidebar />
        {children}
      </div>
    </div>
  );
}
