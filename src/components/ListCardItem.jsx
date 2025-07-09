import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext, useState } from "react";
import { deleteCardInList, fetchCardsForList } from "../utils/api";
import { ListsPageContext } from "../pages/ListsPage";

const ListCardItem = ({ card, id, setCards, setActiveCheckListCard }) => {
  const [loading, setLoading] = useState(false);
  const { setToggleCheckListCard } = useContext(ListsPageContext);

  async function handleDeleteCard() {
    try {
      setLoading(true);
      const deleteRes = await deleteCardInList(card.id);
      const fetchCardsRes = await fetchCardsForList(id);
      setCards(fetchCardsRes.data);
    } catch (error) {
      console.log("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      border="1px solid #ccc"
      borderRadius={1}
      sx={{ cursor: "pointer" }}
      p={1}
      onClick={() => {
        setActiveCheckListCard(card), setToggleCheckListCard(true);
      }}
    >
      <Typography
        variant="body2"
        className={`${loading ? "line-through" : ""}`}
      >
        {card.name}
      </Typography>
      <IconButton
        size="small"
        className="cursor-pointer"
        onClick={(event) => {
          handleDeleteCard(), event.stopPropagation();
        }}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default ListCardItem;
