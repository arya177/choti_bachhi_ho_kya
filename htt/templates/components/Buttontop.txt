import shortid from "shortid";
import React from "react";
import { Button, Box } from "@mui/material";
import CheckboxComponent from "./Components/CheckboxComponent";
import Navbar from "./Components/Navbar";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import image from "../src/Images/Default_Image.jpg"

export const SIDEBAR_ITEM = "sidebarItem";
export const ROW = "row";
export const COLUMN = "column";
export const COMPONENT = "component";

export const SIDEBAR_ITEMS = [
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: "Button",
      content: <Button variant="outlined">Text</Button>,
    },
  },
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: "Checkbox",
      content: <CheckboxComponent />,
    },
  },
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: "Image",
      content: <img src={image} height="100%" width="100%"/>,
    },
  },
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: "Navbar",
      content: <Navbar />,
    },
  },
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: "Text",
      content: <TextareaAutosize />,
    },
  },
];

