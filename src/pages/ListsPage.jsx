import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Lists from "../components/Lists";
import { useParams } from "react-router";
import Loader from "../components/Loader";
import { fetchArchivedLists, fetchBoardById, fetchLists } from "../utils/api";
import { createContext } from "react";

const ListsPageContext = createContext();

const ListsPage = () => {
  const { id: boardId } = useParams();
  const [lists, setLists] = useState();
  const [loading, setLoading] = useState(true);
  const [backGround, setBackGround] = useState();
  const [archivedLists, setArchivedLists] = useState();
  const [toggleCheckListCard, setToggleCheckListCard] = useState(false);

  const contextValues = {
    lists,
    loading,
    backGround,
    setLists,
    archivedLists,
    setArchivedLists,
    toggleCheckListCard,
    setToggleCheckListCard,
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const fetchListsRes = await fetchLists(boardId);
        setLists(fetchListsRes.data);
        const fetchBoardRes = await fetchBoardById(boardId);
        setBackGround(
          fetchBoardRes.data.prefs.backgroundColor ||
            fetchBoardRes.data.prefs.backgroundImage);
        const archivedListsRes = await fetchArchivedLists(boardId);
        setArchivedLists(archivedListsRes.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <ListsPageContext.Provider value={contextValues}>
      <div>
        <NavBar />
        {loading ? <Loader /> : <Lists />}
      </div>
    </ListsPageContext.Provider>
  );
};

export default ListsPage;
export { ListsPageContext };
