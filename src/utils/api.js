import axios from "axios";

const baseURL=import.meta.env.VITE_BASE_URL;
const apiKey=import.meta.env.VITE_API_KEY;
const apiToken=import.meta.env.VITE_API_TOKEN;

export async function fetchBoards() {
  const res=await axios.get(`${baseURL}/members/me/boards?key=${apiKey}&token=${apiToken}`);
  return res;
}

export async function createBoard(name,backGround,backGroundType) {
  if (backGroundType=="color") {
    const res=await axios.post(`${baseURL}/boards/?name=${name}&prefs_background=${backGround}&key=${apiKey}&token=${apiToken}`);
    return res;
  } else {
    const encodedURL=encodeURIComponent(backGround);
    const res=await axios.post(`${baseURL}/boards/?name=${name}&prefs_background_url=${encodedURL}&key=${apiKey}&token=${apiToken}`);
    return res;
  }
}

export async function fetchLists(boardId) {
  const res=await axios.get(`${baseURL}/boards/${boardId}/lists?key=${apiKey}&token=${apiToken}`);
  return res;
}

export async function fetchCardsForList(listId) {
  const res=await axios.get(`${baseURL}/lists/${listId}/cards?key=${apiKey}&token=${apiToken}`);
  return res;
}

export async function fetchBoardById(boardId) {
  const res=await axios.get(`${baseURL}/boards/${boardId}?key=${apiKey}&token=${apiToken}`);
  return res;
}

export async function createCardForList(listId,name) {
  const res=await axios.post(`${baseURL}/cards?idList=${listId}&name=${name}&key=${apiKey}&token=${apiToken}`);
  return res;
}

export async function createListForBoard(boardId,name) {
  const res=await axios.post(`${baseURL}/lists?name=${name}&idBoard=${boardId}&pos=bottom&key=${apiKey}&token=${apiToken}`);
  return res;
}

export async function deleteCardInList(id) {
  const res=await axios.delete(`${baseURL}/cards/${id}?key=${apiKey}&token=${apiToken}`);
  return res;
}

export async function fetchArchivedLists(boardId) {
  const res=await axios.get(`${baseURL}/boards/${boardId}/lists/closed?key=${apiKey}&token=${apiToken}`);
  return res;
}

export async function archivedList(listId) {
  const res=await axios.put(`${baseURL}/lists/${listId}/closed?key=${apiKey}&token=${apiToken}`,
    { value: true });
  return res;
}

export async function unArchivedList(listId) {
  const res=await axios.put(`${baseURL}/lists/${listId}/closed?key=${apiKey}&token=${apiToken}`,
    { value: false });
  return res;
}

export async function fetchCheckListsForCard(cardId) {
  const res=await axios.get(`${baseURL}/cards/${cardId}/checklists?key=${apiKey}&token=${apiToken}`);
  return res;
}

export async function fetchCheckItemsForList(listId) {
  const res=await axios.get(`${baseURL}/checklists/${listId}/checkItems?key=${apiKey}&token=${apiToken}`);
  return res;
}

export async function checkOrUnCheckItem(cardId,checkItemId,state) {
  const res=await axios.put(`${baseURL}/cards/${cardId}/checkItem/${checkItemId}?state=${state}&key=${apiKey}&token=${apiToken}`);
  return res;
}

export async function deleteCheckListInCard(listId) {
  const res=await axios.delete(`${baseURL}/checklists/${listId}?key=${apiKey}&token=${apiToken}`);
  return res;
}

export async function deleteCheckItemInList(listId,itemId) {
  const res=await axios.delete(`${baseURL}/checklists/${listId}/checkItems/${itemId}?key=${apiKey}&token=${apiToken}`);
  return res;
}

export async function createCheckItemInList(listId,name) {
  const res=await axios.post(`${baseURL}/checklists/${listId}/checkItems?name=${name}&key=${apiKey}&token=${apiToken}`);
  return res;
}

export async function createListInCard(cardId,name) {
  const res=await axios.post(`${baseURL}/checklists?idCard=${cardId}&name=${name}&pos=bottom&key=${apiKey}&token=${apiToken}`);
  return res;
}

