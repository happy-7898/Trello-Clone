import Loader from "../components/Loader";
import NavBar from "../components/NavBar";
import Boards from "../components/Boards";
import { createContext, useContext, useEffect, useState } from "react";
import { fetchBoards } from "../utils/api";

const BoardsPageContext=createContext();

const BoardsPage = () => {
  const [boards,setBoards]=useState(null);
  const [loading,setLoading]=useState(true);
  const [remainingCards,setRemainingCards]=useState(0);

  const contextValues={
    boards,
    remainingCards,
    setBoards,
    setRemainingCards,
  };

  useEffect(()=>{
    (async ()=>{
      setLoading(true);
      try {
        const res=await fetchBoards();
        setBoards(res.data);
        setRemainingCards(10-res.data.length);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  },[]);

  return (
    <BoardsPageContext.Provider value={contextValues}>
      <div className="w-full h-screen">
        <NavBar />
        {
          loading?(<Loader />):
            (<Boards />)
        }

      </div>
    </BoardsPageContext.Provider>
  );
};

export default BoardsPage;
export { BoardsPageContext };
