import { useState, useEffect } from 'react';
import Head from 'next/head';
import fire from '../config/fire-config';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from "react";
import { Button, Box } from "@mui/material";
import CheckboxComponent from "./Components/CheckboxComponent";
import Navbar from "./Components/Navbar";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import image from "../src/Images/Default_Image.jpg"

const Home = () => {
  return (
    <div>
<div style={{
  display: "flex",
  flexDirection: "row"
}}>
<div style={{
  display: "flex",
  flexDirection: "row"
}}>
<div>
<Navbar />
</div>
</div>
</div>
<div style={{
  display: "flex",
  flexDirection: "row"
}}>
<div style={{
  display: "flex",
  flexDirection: "row"
}}>
<div>
<> </>
<> </>
</div>
<div>
<> </>
</div>
</div>
</div>
<div style={{
  display: "flex",
  flexDirection: "row"
}}>
<div style={{
  display: "flex",
  flexDirection: "row"
}}>
<div>
<> </>
<> </>
<> </>
</div>
</div>
</div>

    </div>
  )
};

export default Home; 
