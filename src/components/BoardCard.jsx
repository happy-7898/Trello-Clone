import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Box from "@mui/joy/Box";

const BoardCard = ({ board, handleNavigation }) => {
  return (
    <Card sx={{ width: "100%",maxWidth:400,mx: "auto" }}>
      <CardActionArea onClick={() => handleNavigation(board)}>
        <Box
          height={140}
          sx={{
            backgroundColor: `${board.prefs.backgroundColor}`,
            backgroundImage: `${
              board.prefs.backgroundImage
                ? `url(${board.prefs.backgroundImage})`
                : "null"
            }`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <CardContent>
          <Typography gutterBottom component="div">
            {board.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default BoardCard;
