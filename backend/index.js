const express = require('express');
const app = express();
const fs = require('fs');
const { exec } = require('child_process');
const firebase = require('firebase-admin');
firebase.initializeApp({
  credential: firebase.credential.cert({
    "type": "service_account",
    "project_id": "hacktank-5277b",
    "private_key_id": "b5944800015e5428aae44534be4fe50790806e0c",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCupN3OS5CllDyw\nwiFYpqGwtFM4xIXPGV+HY66QKJ3fGLEH7LnfY2t+lzcCJMcI4m56gfp63yN4oDsn\nm5arz+I0dN3RqwVPtYTaemLgjcuLCpoihPB6yaJVpYqD4HTe5hbf2JdA1fUj4lQX\nogFQ5hpqO3NY8ex5on3ZpOheBYjoHGY/C1LrCpdkpTBqiOMrfhLciNXKlpgLOSwn\nlGMDJ7a3b0W0Vk/RxoiUIHcplOcmc1h5ty9SExdJjweyP9fVi5/bXXPHLp33j6rU\nqD2ZqJ921K9TimeCaVJHB7vD8XkhfAscN0VrX+NJtEtSdzK7RpezFZs5a3wKkoCs\nGgBXAK0tAgMBAAECggEAFOVqGrBk7sLlXhrkRYiuiQeSe5TcE9ML4JW3Qc1yUkrQ\nh8u107pAFuX98XY4EGKTaHob387KHjlByrPtm8IkZTVkgx1M5eQosMF7CjY9F/Zd\nSesRIQf2Mfw8LhpRsYfjTcZLFrli+veuKyO5t5XIrFRPsWFE86rTFxMJsJJF9suY\nf2lGsdYmP991ktzouqdlTQHu6vra61O9xGn46fEV0/2W7LuxhpvigAkEosJRiSkT\nS6UzuxRAhkJZpiv+YyKZk93F2iJ9xRaYlyDZ9UrpvXO753gOR7Vr4HHaD+tIm8BX\nL6zTbHeCar3rJ+Lpis/LLBkFYip4w0PXRyL0heTwUQKBgQDWmJtZGDhIRhsXw9c1\neVXUjG76Cc7uom9suGa3oUX+PD7HOUY1E8haCWc6KzxdiXoKN80/ohtSYi53ylsn\n0pkqq7NO+1ye3E9bQ64Iist+Ek6i0nuDWCKkluWKUXftaGej4mcYRtrwkgKOwB/K\nRAg+rK0Mc1Sn8W4oMV67xBEJtQKBgQDQVu738VGYn3R0BOF0QHXpYqcwXC+pVoyx\n9mCap1Z9Tm7vEazVV2tl7gjbtpsgnyhVufTLnqpkkA0SJksEXd5wNWpUEmALwSZ/\nZyRzDLabK3EHa8Hm5hpbjZHHnRmpRGbSeFkHT8+qBW6FKPi8ESVfm16Z3hsK0qd0\nLlSSdTZgmQKBgQCqojfMNSzzkwMR94AVHgC4fF315XysVW7CBTJvywXLrP3CDfGc\nXLmPljCFmUFrotfubgZ/FZgh/r2yNK4c0SFHQ7XVFJvGGankCMHGOw6plUb/wtvB\nSYBqXS3xuOviU4UtU+Xj8NtANOlhtrTQcR4ZL9Z9surai2eq/+6y4KknjQKBgQCQ\nIyTvWwBlxCPQRLQqNpKdJgifV5gN4vgyA0+wj4cx6DqtoZ/edb2y5m0wfPR0LEi+\njonC+gHO0y6H2QBbhAnpvbrTcWcLmtTkndpE0o3far2nMbET6yxfHOG3pYPkbJNq\nl6KYgWodqeZdsAvuKTqfG6HmeBhjc3ww0ADo1rkJOQKBgEAU1H3KwTYA9Vta5TRT\nuF68XEXs8pdypE6KWRy70DWQow8GS+ycBr4Em/xKV5VZxg5UCxzkdU5zyq6IJCno\nY3OBJsLtuFzr/JiZLc/huYw38ihbLZ0mYUY0NAZSMTEn+dWsgOllQr1uk3fU+Q1B\n92K+dlmGMZFjsTmWtzcB+SRk\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-8rjxw@hacktank-5277b.iam.gserviceaccount.com",
    "client_id": "106505595061705385981",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-8rjxw%40hacktank-5277b.iam.gserviceaccount.com"
  })
});

const db = firebase.firestore();

const components = ["Navbar", "Button", "CheckboxComponent", "Box", "Image"];
const pages = ["index"];
const type = (filename) => {
  filename = filename.split(".")[0];
  for (let x in components) {
    if (components[x] === filename)
      return "components";
  }
  for (let x in pages) {
    if (pages[x] === filename)
      return "pages";
  }
  return "element";
}

let arr = [];
let object = [];
const getdata = async (projectName) => {
  const layoutRef = db.collection('layout').doc(projectName);
  const objectRef = db.collection('component').doc(projectName);
  const layoutSnapshot = await layoutRef.get();
  arr = layoutSnapshot.data();
  const objectSnapshot = await objectRef.get();
  object = objectSnapshot.data();
}

class file {
  constructor(name, directory) {
    this.name = name;
    this.directory = directory;
    this.location = type(name);
  }
}

class Queue {
  constructor() {
    this.items = {}
    this.frontIndex = 0
    this.backIndex = 0
  }
  enqueue(item) {
    this.items[this.backIndex] = item
    this.backIndex++
  }
  dequeue() {
    const item = this.items[this.frontIndex]
    delete this.items[this.frontIndex]
    this.frontIndex++
    return item
  }
  peek() {
    return this.items[this.frontIndex]
  }
  isEmpty() {
    return this.items.length == 0;
  }
}

const donePages = [];
const universal = {
  "Navbar": "<Navbar />\n",
  "Checkbox": "<CheckboxComponent />\n",
  "Button": "<Button />\n",
  "TextareaAutosize": "<TextareaAutosize />\n",
  "Box": "<Box />\n",
  "Image": "<Image />\n"
};

const initial = (arr, projectName, page, index) => {
  console.log(arr);
  const projectDirectory = __dirname + "/projects/" + projectName;
  const parentDirectory = __dirname + "/templates";
  const obj = new file(page, projectDirectory);
  const copyto = obj.directory + "/" + obj.location + "/" + obj.name + (obj.location === "components" ? ".jsx" : ".js");
  let divfiletop = parentDirectory + "/components/Divtop.txt";
  let divfilebottom = parentDirectory + "/components/Divbottom.txt";
  let divStylefiletop = parentDirectory + "/components/DivStyletop.txt";
  let divStylefilebottom = parentDirectory + "/components/DivStylebottom.txt";

  for (let x in arr) {
    const dt = fs.readFileSync(divfiletop, 'utf-8', { flag: 'r' });
    fs.appendFileSync(copyto, dt, { flag: "a+" });
    if (arr[x].type === "column") {
      const dst = fs.readFileSync(divStylefiletop, 'utf-8', { flag: 'r' });
      fs.appendFileSync(copyto, dst, { flag: "a+" });
    } if (arr[x].type === "row") {
      const dsb = fs.readFileSync(divfiletop, 'utf-8', { flag: 'r' });
      fs.appendFileSync(copyto, dsb, { flag: "a+" });
    }
    if (Array.isArray(arr[x]["children"]) === "true") {
      initial(arr[x]["children"], projectName, page, index + 1);
    } else {
      for (let y in arr[x]["children"]) {
        for (let z in arr[x]["children"][y]["children"])
          fs.writeFileSync(copyto, universal[object[arr[x]["children"][y]["children"][z].id].type], { flag: "a+" });
      }
      const dt = fs.readFileSync(divfilebottom, 'utf-8', { flag: 'r' });
      fs.appendFileSync(copyto, dt, { flag: "a+" });
    }
    if (arr[x].type === "column") {
      const dst = fs.readFileSync(divStylefilebottom, 'utf-8', { flag: 'r' });
      fs.appendFileSync(copyto, dst, { flag: "a+" });
    } if(arr[x].type === "row") {
      const dsb = fs.readFileSync(divfilebottom, 'utf-8', { flag: 'r' });
      fs.appendFileSync(copyto, dsb, { flag: "a+" });
    }
  }
  const db = fs.readFileSync(parentDirectory + "/pages/" + obj.name + "bottom.txt", 'utf-8', { flag: 'r' });
  fs.appendFileSync(copyto, db, { flag: "a+" });
}
const process = async (projectName) => {
  const projectDirectory = __dirname + "/projects/" + projectName;
  const parentDirectory = __dirname + "/templates";
  const home = new file("index", projectDirectory);
  const queue = new Queue();
  queue.enqueue(home);
  while (queue.isEmpty() == false) {
    const obj = queue.dequeue();
    if (obj === undefined)
      break;
    if (data[obj.name] === undefined)
      continue;
    donePages.push(obj);
    data[obj.name].item.forEach(x => {
      const part = new file(x, projectDirectory);
      if (part.directory !== "element") {
        queue.enqueue(part);
      }
      let copyto = obj.directory + "/" + obj.location + "/" + obj.name + (obj.location === "components" ? ".jsx" : ".js");
      fs.writeFileSync(copyto, universal[part.name], { flag: 'a+' });
    });
    const copyfile = obj.directory + "/" + obj.location + "/" + obj.name + (obj.location === "components" ? ".jsx" : ".js");
    const projectfile = parentDirectory + "/" + obj.location + "/" + obj.name + "bottom.txt";
    const dt = fs.readFileSync(projectfile, 'utf-8', { flag: 'r' });
    fs.appendFileSync(copyfile, dt, { flag: "a+" });
  }
  components.forEach(x => {
    let found = true;
    const obj = new file(x, projectDirectory);
    donePages.forEach(y => {
      if (obj === y)
        found = false;
    })
    if (found) {
      console.log(obj);
      const copyfile = obj.directory + "/" + obj.location + "/" + obj.name + (obj.location === "components" ? ".jsx" : ".js");
      const projectfile = parentDirectory + "/" + obj.location + "/" + obj.name + "bottom.txt";
      const dt = fs.readFileSync(projectfile, 'utf-8', { flag: 'r' });
      fs.appendFileSync(copyfile, dt, { flag: "a+" });
    }
  })
  pages.forEach(x => {
    let found = true;
    const obj = new file(x, projectDirectory);
    donePages.forEach(y => {
      if (obj === y)
        found = false;
    })
    if (found) {
      console.log(obj);
      const copyfile = obj.directory + "/" + obj.location + "/" + obj.name + (obj.location === "components" ? ".jsx" : ".js");
      const projectfile = parentDirectory + "/" + obj.location + "/" + obj.name + "bottom.txt";
      const dt = fs.readFileSync(projectfile, 'utf-8', { flag: 'r' });
      fs.appendFileSync(copyfile, dt, { flag: "a+" });
    }
  })
}

const createFolder = (projectName) => {
  const projectDirectory = __dirname + "/projects/" + projectName;
  const parentDirectory = __dirname + "/templates";
  fs.mkdirSync(projectDirectory, { recursive: true });
  fs.mkdirSync(projectDirectory + "/components", { recursive: true });
  fs.mkdirSync(projectDirectory + "/pages/users", { recursive: true });
  fs.mkdirSync(projectDirectory + "/pages/blog", { recursive: true });
  fs.mkdirSync(projectDirectory + "/config", { recursive: true });
  fs.cpSync(parentDirectory + "/styles", projectDirectory + "/styles", { recursive: true });
  fs.copyFileSync(parentDirectory + "/_app.js", projectDirectory + "/pages/_app.js");
  fs.copyFileSync(parentDirectory + "/fire-config.js", projectDirectory + "/config/fire-config.js");
  fs.copyFileSync(parentDirectory + "/.env.local", projectDirectory + "/.env.local");
  exec(`cd ${projectDirectory} && npm init -y`, (error, stdout, stderr) => { });
  exec(`cd ${projectDirectory} &&  npm i @emotion/react @emotion/styled @material-ui/core @material-ui/icons @mui/base @mui/icons-material @mui/material classnames firebase immutability-helper lodash react react-dnd react-dnd-html5-backend react-dom react-frame-component react-scripts shortid`, (error, stdout, stderr) => {
    if (error) console.log(error);
    if (stdout) { console.log(stdout); exec(`cd ${projectDirectory} &&  npm i @emotion/react @emotion/styled @material-ui/core @material-ui/icons @mui/base @mui/icons-material @mui/material classnames firebase immutability-helper lodash react react-dnd react-dnd-html5-backend react-dom react-frame-component react-scripts shortid`, (error, stdout, stderr) => { }); }
    if (stderr) console.log(stderr);
  });
  components.forEach(x => {
    const obj = new file(x, projectDirectory);
    const copyfile = obj.directory + "/" + obj.location + "/" + obj.name + (obj.location === "components" ? ".jsx" : ".js");
    const projecfile = parentDirectory + "/" + obj.location + "/" + obj.name + "top.txt";
    fs.copyFileSync(projecfile, copyfile);
  })
  pages.forEach(x => {
    const obj = new file(x, projectDirectory);
    const copyfile = obj.directory + "/" + obj.location + "/" + obj.name + (obj.location === "components" ? ".jsx" : ".js");
    const projecfile = parentDirectory + "/" + obj.location + "/" + obj.name + "top.txt";
    fs.copyFileSync(projecfile, copyfile);
  })
}

app.listen(3000, async () => {
  console.log(`server is running at port 3000`);
  await getdata('hacktank');
  console.log(arr);
  console.log(object);
  createFolder('hacktank');
  initial(arr.layout, 'hacktank', 'index', 0);
});
