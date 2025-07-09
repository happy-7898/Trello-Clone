import React, { useContext, useState } from "react";
import ListCard from "./ListCard";
import CreateList from "./CreateList";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CheckLists from "./CheckLists";
import { ListsPageContext } from "../pages/ListsPage";

const UnArchivedCards = ({ lists, handleArchivedToggle }) => {
  const { toggleCheckListCard } = useContext(ListsPageContext);
  const [activeCheckListCard, setActiveCheckListCard] = useState();
  return (
    <div>
      <Box sx={{ mb: 3 }}>
        <Button
          variant="outlined"
          size="medium"
          sx={{ background: "white" }}
          onClick={handleArchivedToggle}
        >
          Archived Cards
        </Button>
      </Box>
      <div className="flex gap-3">
        {lists.map((curr) => {
          return (
            <ListCard
              key={curr.id}
              currCard={curr}
              setActiveCheckListCard={setActiveCheckListCard}
            />
          );
        })}
        <CreateList />
      </div>
      {toggleCheckListCard && (
        <CheckLists activeCheckListCard={activeCheckListCard} />
      )}
    </div>
  );
};

export default UnArchivedCards;
