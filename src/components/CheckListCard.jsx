import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  LinearProgress,
  List,
  Button,
  Input,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckListItem from "./CheckListItem";
import { checkOrUnCheckItem, createCheckItemInList, deleteCheckListInCard, fetchCheckItemsForList } from "../utils/api";

const CheckListCard = ({ currCheckList,activeCheckListCard,setCheckLists,checkLists }) => {
  const [checkItems,setCheckItems]=useState([]);
  const [isOpened,setIsOpened]=useState(true);
  const [newItemName,setNewItemName]=useState("");
  const [isLoading,setIsLoading]=useState(false);

  useEffect(()=>{
    (async ()=>{
      try {
        const fetchItemsRes=await fetchCheckItemsForList(currCheckList.id);
        setCheckItems(fetchItemsRes.data);
      } catch (error) {
        console.log(error);
      }
    })();
  },[]);

  const completedCount = checkItems.length>0?checkItems.filter(item => item.state === "complete").length:0;
  const progress = checkItems.length > 0 ? (completedCount / checkItems.length) * 100 : 0;

  async function toggleCheckBox(index) {
    try {
      setCheckItems(checkItems.map((curr,i)=>{
        if (i==index) {
          curr.state=curr.state=="complete"?"incomplete":"complete";
        }
        return curr;
      }));
      const checkOrUnCheckRes=await checkOrUnCheckItem(activeCheckListCard.id,checkItems[index].id,checkItems[index].state);
      console.log(checkOrUnCheckRes);
    } catch (error) {
      console.log(error);
    }

  }

  async function handleDelete() {
    try {
      const deleteRes=await deleteCheckListInCard(currCheckList.id);
      setCheckLists(checkLists.filter(curr=>curr.id!=currCheckList.id));
    } catch (error) {
      console.log(error);
    }
  }

  function toggleIsOpened() {
    setIsOpened(!isOpened);
  }

  async function handleAddCheckItem(event) {
    event.preventDefault();
    try {
      setIsLoading(true);
      const itemCreatedRes=await createCheckItemInList(currCheckList.id,newItemName);
      setCheckItems([...checkItems,itemCreatedRes.data]);
    } catch (error) {
      console.log(error);
    } finally {
      setNewItemName("");
      setIsLoading(false);
    }
  }

  return (
    <div className="px-6 py-2">
      <div className="p-2 bg-gray-100 rounded-xl">
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography>{currCheckList.name}</Typography>
          <IconButton color="error" size="small" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Box>
        <div className="pl-5">
          <Box display="flex" alignItems="center" gap={2} mb={1}>
            <Box flex={1}>
              <LinearProgress variant="determinate" value={progress} />
            </Box>
            <Typography variant="caption" sx={{ minWidth: 30 }}>
              {progress && progress.toFixed(2)}%
            </Typography>
          </Box>

          <List dense disablePadding sx={{ mt: 1 }}>
            {checkItems && checkItems.map((item, index) => (
              <CheckListItem checkItems={checkItems} setCheckItems={setCheckItems} item={item} index={index} toggleCheckBox={toggleCheckBox} currCheckList={currCheckList} />
            ))}
          </List>

          {isOpened && <Button variant="outlined" sx={{ mt: 2 }} size="small" onClick={toggleIsOpened}>
            Add Check Item
          </Button>}

          {!isOpened && (
            <Box
              component="form"
              onSubmit={handleAddCheckItem}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                mt: 2,
                maxWidth: 300,
                pointerEvents:isLoading?"none":"auto",
                opacity:isLoading?"0.7":"1",
              }}
            >
              <Input placeholder="Enter check item" fullWidth onChange={(e)=>setNewItemName(e.target.value)} value={newItemName} />

              <Box sx={{ display: "flex", gap: 1 }}>
                <Button variant="outlined" type="submit" size="small">
                  {isLoading?"Adding...":"Add"}
                </Button>
                <Button variant="outlined" size="small" color="error" onClick={toggleIsOpened}>
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

export default CheckListCard;
