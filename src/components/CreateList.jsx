import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import { useContext, useState } from "react";
import { useParams } from "react-router";
import { createListForBoard, fetchLists } from "../utils/api";
import { ListsPageContext } from "../pages/ListsPage";

const CreateList = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setLists } = useContext(ListsPageContext);
  const { id: boardId } = useParams();

  function handleToggle() {
    setIsOpened(!isOpened);
  }

  async function handleFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newListName = formData.get("boardName");
    try {
      setLoading(true);
      const res = await createListForBoard(boardId, newListName);
      const lists = await fetchLists(boardId);
      setLists(lists.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setIsOpened(false);
    }
  }

  return (
    <div>
      {!isOpened && (
        <Box sx={{ minWidth: 245 }}>
          <Card variant="soft" onClick={handleToggle}>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography level="title-md">Add Another List</Typography>
            </CardContent>
          </Card>
        </Box>
      )}

      {isOpened && (
        <div className="w-full ">
          <form onSubmit={(event) => handleFormSubmit(event)}>
            <Stack
              variant="soft"
              spacing={1}
              sx={{ minWidth: 245, maxWidth: 345 }}
            >
              <Input placeholder="Enter List Name" name="boardName" required />
              <Button type="submit" disabled={loading}>
                {loading ? "Creating" : "Create List"}
              </Button>
            </Stack>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateList;
