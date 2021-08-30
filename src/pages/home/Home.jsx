import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css"

export default function Home({user}) {
  return (
    <>
      <Topbar user={user}/>
      <div className="homeContainer">
        {/* <Sidebar user={user}/> */}
        <Feed user={user}/>
        <Rightbar user={user}/>
      </div>
    </>
  );
}
