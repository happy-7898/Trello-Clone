import { useContext } from "react";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState } from "react";
import { createBoard } from "../utils/api";
import { BoardsPageContext } from "../pages/BoardsPage";

const CreateBoard = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [type, setType] = useState("color");
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { remainingCards, setBoards, setRemainingCards,boards } = useContext(BoardsPageContext);

  const colors = {
    "#0079bf": "blue",
    "#d29034": "orange",
    "#519839": "green",
    "#b04632": "red",
    "#89609e": "purple",
    "#4bbf6b": "lime",
    "#00aecc": "sky",
    "#838c91": "grey",
  };
  const images = [
    "https://images.unsplash.com/photo-1742156345582-b857d994c84e?auto=format&fit=crop&w=1920&q=100",
    "https://images.unsplash.com/photo-1741812191037-96bb5f12010a?auto=format&q=100&w=1920",
    "https://images.unsplash.com/photo-1742937163916-78fd07cc3b49?auto=format&q=100&w=1920",
    "https://images.unsplash.com/photo-1742845918430-c6093f93f740?auto=format&q=100&w=1920",
    "https://images.unsplash.com/photo-1743024282286-5bfecf55a834?auto=format&q=100&w=1920",
    "https://images.unsplash.com/photo-1734832360218-09cb0e158021?auto=format&q=100&w=1920",
    "https://images.unsplash.com/photo-1739761613270-a48d0d1190ba?auto=format&q=100&w=1920",
    "https://images.unsplash.com/photo-1736077722346-31ba59414728?auto=format&q=100&w=1920",
  ];

  function toggleOpenForm() {
    setIsOpened(!isOpened);
    setSelectedImage(null);
    setSelectedColor(null);
    setType("color");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(event.currentTarget);
      const backGround = selectedImage || selectedColor;
      const name = formData.get("boardName");
      const createBoardRes = await createBoard(name, backGround, type);
      setBoards([...boards,createBoardRes.data]);
      setRemainingCards(prev=>prev-1);
    } catch (error) {
      console.log(error);
    } finally {
      setIsOpened(false);
      setSelectedColor(null);
      setSelectedImage(null);
      setType("color");
      setLoading(false);
    }
  }

  return (
    <div>
      {!isOpened && (
        <Box sx={{ maxWidth: 400 }}>
          <Card variant="soft" onClick={toggleOpenForm}>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography level="title-md">Create a Board</Typography>
              <Typography level="title-sm">
                {remainingCards} remaining
              </Typography>
            </CardContent>
          </Card>
        </Box>
      )}

      {isOpened && (
        <div className="absolute left-0 top-0 w-full pt-6 bg-gray-500/50 min-h-screen h-full flex justify-center items-start">
          <div className="bg-gray-400 p-5 rounded-xl w-1/3 min-w-60 max-w-86">
            <form onSubmit={handleSubmit}>
              <Stack spacing={2} >
                <Input placeholder="Board Name" name="boardName" required  />
                <RadioGroup
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  row
                  name="backgroundType"
                  sx={{ gap: 2 }}
                >
                  <FormControlLabel
                    value="color"
                    control={<Radio />}
                    label="Color"
                  />
                  <FormControlLabel
                    value="image"
                    control={<Radio />}
                    label="Image"
                  />
                </RadioGroup>

                {type === "color" ? (
                  <Box display="flex" gap={2} flexWrap="wrap">
                    {Object.keys(colors).map((curr, index) => (
                      <Box
                        key={index}
                        onClick={() => setSelectedColor(colors[curr])}
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: "50%",
                          backgroundColor: curr,
                          border:
                            selectedColor === colors[curr]
                              ? "3px solid black"
                              : "2px solid white",
                          boxShadow: "0 0 0 1px #ccc",
                          cursor: "pointer",
                        }}
                      />
                    ))}
                  </Box>
                ) : (
                  <Box display="flex" gap={2} flexWrap="wrap">
                    {images.map((src, i) => (
                      <Box
                        key={i}
                        onClick={() => setSelectedImage(src)}
                        component="img"
                        src={src}
                        alt=""
                        sx={{
                          width: 60,
                          height: 40,
                          objectFit: "cover",
                          borderRadius: 1,
                          border:
                            selectedImage === src
                              ? "3px solid black"
                              : "2px solid white",
                          boxShadow: "0 0 0 1px #ccc",
                          cursor: "pointer",
                        }}
                      />
                    ))}
                  </Box>
                )}
                <Button
                  type="submit"
                  disabled={loading}
                  sx={{ opacity: loading ? 0.7 : 1 }}
                >{`${loading ? "Creating" : "Create Board"}`}</Button>
              </Stack>
            </form>
            <div className="mt-2 flex justify-center">
              <button className="cursor-pointer" onClick={toggleOpenForm}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateBoard;
