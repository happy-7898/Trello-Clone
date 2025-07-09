import React, { useContext, useState } from "react";
import { ListsPageContext } from "../pages/ListsPage";
import UnArchivedCards from "./UnArchivedCards";
import ArchivedCards from "./ArchivedCards";

const Lists = () => {
  const { lists, backGround, archivedLists, toggleCheckListCard } = useContext(ListsPageContext);
  const [showArchived, setShowArchived] = useState(false);

  function handleArchivedToggle() {
    setShowArchived(!showArchived);
  }
  return (
    <div
      className={`relative p-5 min-h-screen ${
        toggleCheckListCard ? "overflow-x-hidden" : "overflow-x-auto"
      }`}
      style={{
        background: backGround?.startsWith("http")
          ? `url(${backGround}) center/cover no-repeat`
          : backGround,
      }}
    >
      {showArchived ? (
        <ArchivedCards
          lists={archivedLists}
          handleArchivedToggle={handleArchivedToggle}
        />
      ) : (
        <UnArchivedCards
          lists={lists}
          handleArchivedToggle={handleArchivedToggle}
        />
      )}
    </div>
  );
};

export default Lists;
