import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import ArchiveIcon from "@mui/icons-material/Archive";

const ListCardHeader = ({ listTitle,handleArchivedCard }) => {
  return (
    <CardHeader
      action={
        <IconButton aria-label="settings" onClick={handleArchivedCard}>
          <ArchiveIcon />
        </IconButton>
      }
      title={listTitle}
      titleTypographyProps={{ fontSize: "20px" }}
    />
  );
};

export default ListCardHeader;
