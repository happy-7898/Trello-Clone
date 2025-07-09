import {
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteCheckItemInList } from "../utils/api";

const CheckListItem = ({ item,index,toggleCheckBox,currCheckList,checkItems,setCheckItems }) => {

  async function handleDelete() {
    try {
      const deleteRes=await deleteCheckItemInList(currCheckList.id,item.id);
      setCheckItems(checkItems.filter(curr=>curr.id!=item.id));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ListItem key={index} disableGutters sx={{ py: 0.5 }} secondaryAction={
      <IconButton edge="end" size="small" color="error" onClick={handleDelete}>
        <DeleteIcon fontSize="small" />
      </IconButton>
    }
    >
      <ListItemIcon sx={{ minWidth: 32 }}>
        <Checkbox edge="start" size="small" checked={item.state==="complete"} onClick={()=>toggleCheckBox(index)} />
      </ListItemIcon>
      <ListItemText primary={<Typography variant="body2" className={`${item.state==="complete"?"line-through":""}`}>{item.name}</Typography>} />
    </ListItem>
  );
};

export default CheckListItem;
