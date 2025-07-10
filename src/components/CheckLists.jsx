import { useContext, useEffect, useState } from "react";
import CheckListCard from "./CheckListCard";
import { Button, Box, Input } from "@mui/material";
import { ListsPageContext } from "../pages/ListsPage";
import { createListInCard, fetchCheckListsForCard } from "../utils/api";

const CheckLists = ({ activeCheckListCard }) => {
  const { setToggleCheckListCard } = useContext(ListsPageContext);
  const [checkLists, setCheckLists] = useState();
  const [isOpened, setIsOpened] = useState(true);
  const [newListName, setNewListName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleToggleButton() {
    setToggleCheckListCard(false);
  }

  useEffect(() => {
    (async () => {
      try {
        const checkListsRes = await fetchCheckListsForCard(activeCheckListCard.id);
        setCheckLists(checkListsRes.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [activeCheckListCard]);

  async function handleAddList(event) {
    event.preventDefault();
    try {
      if (newListName.length==0) return;
      setIsLoading(true);
      const listCreatedRes = await createListInCard(activeCheckListCard.id,newListName);
      setCheckLists([...checkLists, listCreatedRes.data]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setNewListName("");
    }
  }

  function toggleIsOpened() {
    setIsOpened(!isOpened);
  }

  return (
    <div className=" z-10 absolute w-full h-full left-0 top-0 flex justify-center items-start bg-gray-300/70 overflow-y-auto overflow-x-hidden pt-6">
      <div className="bg-white h-auto max-h-140  w-4/10 min-w-60 max-w-110 rounded-md overflow-x-auto">
        <div className="p-2 flex justify-between">
          <p className="text-xl font-bold ">{activeCheckListCard.name}</p>
          <button
            className="text-gray-500 hover:text-black text-xl cursor-pointer"
            onClick={handleToggleButton}
          >
            ✕
          </button>
        </div>
        {checkLists &&
          checkLists.map((curr) => (
            <CheckListCard
              currCheckList={curr}
              setCheckLists={setCheckLists}
              checkLists={checkLists}
              activeCheckListCard={activeCheckListCard}
            />
          ))}

        <div className="p-2">
          {isOpened && (
            <Button
              variant="outlined"
              sx={{ mt: 2 }}
              size="large"
              onClick={toggleIsOpened}
            >
              Add CheckList
            </Button>
          )}

          {!isOpened && (
            <Box
              component="form"
              onSubmit={handleAddList}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                mt: 2,
                maxWidth: 300,
                pointerEvents: isLoading ? "none" : "auto",
                opacity: isLoading ? "0.7" : "1",
              }}
            >
              <Input
                placeholder="Enter list name"
                fullWidth
                onChange={(e) => setNewListName(e.target.value)}
                value={newListName}
              />

              <Box sx={{ display: "flex", gap: 1 }}>
                <Button variant="outlined" type="submit" size="small">
                  {isLoading ? "Adding..." : "Add"}
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  color="error"
                  onClick={toggleIsOpened}
                >
                  ✕
                </Button>
              </Box>
            </Box>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckLists;
