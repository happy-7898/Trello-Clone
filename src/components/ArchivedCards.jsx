import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ArchivedListCard from "./ArchivedListCard";

const ArchivedCards = ({ lists,handleArchivedToggle }) => {
  return (
    <div>
      <Box sx={{ mb: 3 }} >
        <Button variant="outlined" size="medium" sx={{ background:"white" }} onClick={handleArchivedToggle} >
          Back
        </Button>
      </Box>
      <div className="flex gap-3">
        {
          lists.map((curr)=>{
            return <ArchivedListCard key={curr.id} currCard={curr} />;
          })
        }
      </div>
    </div>
  );
};

export default ArchivedCards;
