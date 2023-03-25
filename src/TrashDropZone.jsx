import React from "react";
import classNames from "classnames";
import { useDrop } from "react-dnd";
import { COMPONENT, ROW, COLUMN } from "./constants";
import { Box, Button } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const ACCEPTS = [ROW, COLUMN, COMPONENT];

const TrashDropZone = ({ data, onDrop }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ACCEPTS,
    drop: (item, monitor) => {
      onDrop(data, item);
    },
    canDrop: (item, monitor) => {
      const layout = data.layout;
      const itemPath = item.path;
      const splitItemPath = itemPath.split("-");
      const itemPathRowIndex = splitItemPath[0];
      const itemRowChildrenLength =
        layout[itemPathRowIndex] && layout[itemPathRowIndex].children.length;

      // prevent removing a col when row has only one col
      if (
        item.type === COLUMN &&
        itemRowChildrenLength &&
        itemRowChildrenLength < 2
      ) {
        return false;
      }

      return true;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });

  const isActive = isOver && canDrop;
  return (
    <Button
    variant="contained"
      className={classNames({ active: isActive })}
      ref={drop}
      style={{
        borderRadius: "50px",
        width: "50px"
      }}
    >
      <DeleteOutlineIcon/>
    </Button>
  );
};
export default TrashDropZone;
