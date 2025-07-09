import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CardHeader from "@mui/material/CardHeader";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import { useParams } from "react-router";
import {
  createCardForList,
  fetchCardsForList,
  unArchivedList,
  fetchArchivedLists,
  fetchLists,
} from "../utils/api";
import { ListsPageContext } from "../pages/ListsPage";

const ArchivedListCard = ({ currCard }) => {
  const [cards, setCards] = useState();
  const { setLists, setArchivedLists,lists,archivedLists } = useContext(ListsPageContext);
  const { id: boardId } = useParams();

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

  async function handleArchivedCard() {
    try {
      const res = await unArchivedList(currCard.id);
      setLists([...lists,res.data]);
      setArchivedLists(archivedLists.filter(curr=>curr.id!=currCard.id));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Card sx={{ width: 345 }}>
        <CardHeader
          action={
            <IconButton aria-label="Unarchive" onClick={handleArchivedCard}>
              <UnarchiveIcon />
            </IconButton>
          }
          title={currCard.name}
          titleTypographyProps={{ fontSize: "20px" }}
        />
        <CardContent>
          <Stack spacing={1}>
            {cards &&
              cards.map((card) => (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  border="1px solid #ccc"
                  borderRadius={1}
                  p={1}
                >
                  <Typography variant="body2">{card.name}</Typography>
                </Box>
              ))}
          </Stack>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArchivedListCard;