import React from "react";
import { useDrag } from "react-dnd";
import { List, ListItemText, ListItemButton, Divider } from "@mui/material";

const SideBarItem = ({ data }) => {
  const [{ opacity }, drag] = useDrag({
    item: data,
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.4 : 1
    })
  });


  return (
    <List ref={drag} style={{ opacity }}>
      <ListItemButton>
        <ListItemText primary={data.component.type} />
      </ListItemButton>
      <Divider/>
    </List>
  );
};
export default SideBarItem;
