import React from "react";
import { COMPONENT, ROW, COLUMN } from "./constants";
import Button from "@mui/material/Button";

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
      id: "component0",
      type: "button",
      content: <Button variant="text">Text</Button>,
    },
    component1: { id: "component1", type: "checkbox", content: "Some image" },
    component2: { id: "component2", type: "box", content: "Some email" },
    component3: { id: "component3", type: "search", content: "Some name" },
    component4: { id: "component4", type: "text", content: "Some phone" },
  },
};

export default initialData;
