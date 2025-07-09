import { useContext } from "react";
import BoardCard from "./BoardCard";
import CreateBoard from "./CreateBoard";
import { BoardsPageContext } from "../pages/BoardsPage";
import { useNavigate } from "react-router-dom";

const Boards = () => {
  const { boards } = useContext(BoardsPageContext);
  const navigate = useNavigate();

  function handleNavigation(board) {
    navigate(`/boards/${board.id}`);
  }

  return (
    <div className="relative">
      <div className="grid gap-4 p-4 justify-center grid-cols-[repeat(auto-fit,_minmax(245px,_1fr))]">
        {boards.map((board) => (
          <BoardCard
            key={board.id}
            board={board}
            handleNavigation={handleNavigation}
          />
        ))}
        <CreateBoard />
      </div>
    </div>
  );
};

export default Boards;
