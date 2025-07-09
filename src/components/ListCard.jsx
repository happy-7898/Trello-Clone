import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import ListCardHeader from "./ListCardHeader";
import ListCardItem from "./ListCardItem";
import {
  archivedList,
  createCardForList,
  fetchArchivedLists,
  fetchCardsForList,
  fetchLists,
} from "../utils/api";
import { useParams } from "react-router";
import { ListsPageContext } from "../pages/ListsPage";

const ListCard = ({ currCard, setActiveCheckListCard }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [cards, setCards] = useState();
  const [newCardValue, setNewCardValue] = useState("");
  const [loading, setLoading] = useState(false);
  const { id: boardId } = useParams();
  const { setLists, setArchivedLists } = useContext(ListsPageContext);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchCardsForList(currCard.id);
        setCards(res.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  async function handleAddCard() {
    try {
      setLoading(true);
      const name = newCardValue;
      const createCardRes = await createCardForList(currCard.id, name);
      const res = await fetchCardsForList(currCard.id);
      setCards(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setNewCardValue("");
      setLoading(false);
    }
  }

  function handleToggle() {
    setNewCardValue("");
    setIsOpened(!isOpened);
  }

  async function handleArchivedCard() {
    try {
      const res = await archivedList(currCard.id);
      const fetchListsRes = await fetchLists(boardId);
      setLists(fetchListsRes.data);
      const fetchArchivedListsRes = await fetchArchivedLists(boardId);
      setArchivedLists(fetchArchivedListsRes.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Card sx={{ width: 345 }}>
        <ListCardHeader
          listTitle={currCard.name}
          handleArchivedCard={handleArchivedCard}
        />
        <CardContent>
          <Stack spacing={1}>
            {cards &&
              cards.map((card, index) => (
                <ListCardItem
                  card={card}
                  id={currCard.id}
                  setCards={setCards}
                  setActiveCheckListCard={setActiveCheckListCard}
                />
              ))}
          </Stack>

          {!isOpened && (
            <Button
              variant="contained"
              size="small"
              sx={{ mt: 2 }}
              fullWidth
              onClick={handleToggle}
            >
              Create Card
            </Button>
          )}

          {isOpened && (
            <Box mt={2}>
              <TextField
                label="New Card"
                multiline
                rows={1}
                fullWidth
                placeholder="Enter a Title"
                value={newCardValue}
                onChange={(e) => setNewCardValue(e.target.value)}
              />
              <Stack direction="row" spacing={1} mt={1}>
                <Button
                  variant="contained"
                  size="small"
                  fullWidth
                  onClick={handleAddCard}
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Add"}
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleToggle}
                  sx={{ minWidth: 40, px: 0 }}
                  disabled={loading}
                >
                  ✕
                </Button>
              </Stack>
            </Box>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ListCard;
