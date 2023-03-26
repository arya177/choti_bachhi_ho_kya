import React, { useState, useCallback } from "react";
import Button from '@mui/material/Button';
import DropZone from "./DropZone";
import TrashDropZone from "./TrashDropZone";
import SideBarItem from "./SideBarItem";
import Row from "./Row";
import initialData from "./initial-data";
import { collection, addDoc } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore"; 
import {db} from '../src/firebase';
import {
  handleMoveWithinParent,
  handleMoveToDifferentParent,
  handleMoveSidebarComponentIntoParent,
  handleRemoveItemFromLayout,
} from "./helpers";
import { Paper } from "@mui/material";

import { SIDEBAR_ITEMS, SIDEBAR_ITEM, COMPONENT, COLUMN } from "./constants";
import shortid from "shortid";

let final_layout=[];
let final_component={};

const Container = () => {

  const initialLayout = initialData.layout;
  const initialComponents = initialData.components;
  const [layout, setLayout] = useState(initialLayout);
  const [components, setComponents] = useState(initialComponents);
 

  const handleDropToTrashBin = useCallback(
    (dropZone, item) => {
      const splitItemPath = item.path.split("-");
      setLayout(handleRemoveItemFromLayout(layout, splitItemPath));
    },
    [layout]
    
  );

  const handleDrop = useCallback(
    (dropZone, item) => {
      console.log("dropZone", dropZone);
      console.log("item", item);

      const splitDropZonePath = dropZone.path.split("-");
      const pathToDropZone = splitDropZonePath.slice(0, -1).join("-");

      const newItem = { id: item.id, type: item.type };
      if (item.type === COLUMN) {
        newItem.children = item.children;
      }

      // sidebar into
      if (item.type === SIDEBAR_ITEM) {
        // 1. Move sidebar item into page
        const newComponent = {
          id: shortid.generate(),
          ...item.component,
        };
        const newItem = {
          id: newComponent.id,
          type: COMPONENT,
        };
        setComponents({
          ...components,
          [newComponent.id]: newComponent,
        });
        console.log(components, "up")
        setLayout(
          handleMoveSidebarComponentIntoParent(
            layout,
            splitDropZonePath,
            newItem
          )
        );
        return;
      }

      // move down here since sidebar items dont have path
      const splitItemPath = item.path.split("-");
      const pathToItem = splitItemPath.slice(0, -1).join("-");

      // 2. Pure move (no create)
      if (splitItemPath.length === splitDropZonePath.length) {
        // 2.a. move within parent
        if (pathToItem === pathToDropZone) {
          setLayout(
            handleMoveWithinParent(layout, splitDropZonePath, splitItemPath)
          );
          return;
        }

        // 2.b. OR move different parent
        // TODO FIX columns. item includes children
        setLayout(
          handleMoveToDifferentParent(
            layout,
            splitDropZonePath,
            splitItemPath,
            newItem
          )
        );
        return;
      }

      // 3. Move + Create
      setLayout(
        handleMoveToDifferentParent(
          layout,
          splitDropZonePath,
          splitItemPath,
          newItem
        )
      );
    },
    [layout, components]
  );
console.log(layout, components)
  const renderRow = (row, currentPath) => {
    return (
      <Row
        key={row.id}
        data={row}
        handleDrop={handleDrop}
        components={components}
        path={currentPath}
      />
    );
  };

  const handleSave = async () => {

      // await addData(final_component);
      console.log("component", final_component);
      // let map = new Map()
      let obj = {}
      Object.keys(components).map(item => {
        let tempObj = {
          id : components[item].id,
          type : components[item].type
        };
        obj[item] = tempObj
  })
     
      await addData(obj)
      await addData(layout)
      
  }
  const addData = async (e) => {
    console.log(e)
    // let temp={};
    // e.values.map(item=>{
    //   let id = item.id;
    //   let type = item.type;
    //   temp={id,type}

    // })

   
    try {
        console.log(e);
        if(e===layout){
          // db.collection("layout").doc("hacktank").set(layout)
        // const docRef = await addDoc(collection(db, "layout"), {
        //   layout: layout,    
        // })
        // // console.log("Document written with ID: ", docRef.id);
        await setDoc(doc(db, "layout", "hacktank"), {layout});

        }
        else {
          await setDoc(doc(db, "component", "hacktank"), e);
          // const docRef = await addDoc(collection(db, "component"), {
          //   components:e 
          // });
          // console.log("Document written with ID: ", docRef.id);
        }
      } catch (e) {
        console.error("Error adding document: ", e);
      }
  }


  //handlle change page function
  const handleChangePage = () => {
    handleSave()
    setLayout(initialLayout)
    setComponents(initialComponents)
  }

  return (
    <div className="body">
      <div className="sidePane">
        <div className="multiple">
          <Button
            variant="outlined"
            className="btn1"
            onClick={handleChangePage}
          >
            HomePage
          </Button>
          <Button
            variant="outlined"
            className="btn1"
            onClick={handleChangePage}
          >
            Blogs
          </Button>
          <Button
            variant="outlined"
            className="btn1"
            onClick={handleChangePage}
          >
            About
          </Button>
        </div>
        <div className="sideBar">
          {Object.values(SIDEBAR_ITEMS).map((sideBarItem, index) => (
            <SideBarItem key={sideBarItem.id} data={sideBarItem} />
          ))}
        </div>
        <Button variant="contained" className="btn" onClick={handleSave}>
          Save
        </Button>
      </div>
      <div className="pageContainer">
        <Paper
          elevation={4}
          style={{
            width: "95%",
            alignSelf: "center",
            height: "95%",
            padding: "0 20px",
            margin: "20px",
          }}
        >
          {layout.map((row, index) => {
            const currentPath = `${index}`;
            console.log(currentPath, 1);
            return (
              <React.Fragment key={row.id}>
                <DropZone
                  data={{
                    path: currentPath,
                    childrenCount: layout.length,
                  }}
                  onDrop={handleDrop}
                  path={currentPath}
                />
                {renderRow(row, currentPath)}
              </React.Fragment>
            );
          })}
          <DropZone
            data={{
              path: `${layout.length}`,
              childrenCount: layout.length,
            }}
            onDrop={handleDrop}
            isLast
          />
        </Paper>
        <div
          style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <TrashDropZone
            data={{
              layout,
            }}
            onDrop={handleDropToTrashBin}
          />
        </div>
      </div>
    </div>
  );
};
export default Container;
