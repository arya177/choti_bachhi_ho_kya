import React from "react";
import { COMPONENT, ROW, COLUMN } from "./constants";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import NavigationBar from "./Components/CheckboxComponent";
import ResponsiveAppBar from "./Components/ResponsiveAppBar";
import TextareaAutosize from "@mui/material/TextareaAutosize";

const initialData = {
  layout: [
    {
      type: ROW,
      id: "row0",
      children: [
        {
          type: COLUMN,
          id: "column0",
          children: [
            {
              type: COMPONENT,
              id: "component0",
            },
            {
              type: COMPONENT,
              id: "component1",
            },
          ],
        },
        {
          type: COLUMN,
          id: "column1",
          children: [
            {
              type: COMPONENT,
              id: "component2",
            },
          ],
        },
      ],
    },
    {
      type: ROW,
      id: "row1",
      children: [
        {
          type: COLUMN,
          id: "column2",
          children: [
            {
              type: COMPONENT,
              id: "component3",
            },
            {
              type: COMPONENT,
              id: "component0",
            },
            {
              type: COMPONENT,
              id: "component2",
            },
          ],
        },
      ],
    },
  ],
  components: {
    component0: {
      id: "component1",
      type: "div",
      content: "",
    },
    component1: {
      id: "component0",
      type: "div",
      content: "",
    },
    component2: {
      id: "component2",
      type: "div",
      content: "",
    },
    component3: {
      id: "component3",
      type: "div",
      content: "",
    },
    component4: {
      id: "component4",
      type: "div",
      content: "",
    },
  },
};

export default initialData;
