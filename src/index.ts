import * as mermaid from "mermaid";
import fs from "fs";
// @ts-ignore
import FlowChart from "./Charts/Flowchart.ts"; import ClassDiagram from "./Charts/ClassDiagram.ts"; import ERDiagram from "./Charts/ERDiagram.ts"; import SequenceDiagram from "./Charts/SequenceDiagram.ts"; import StateDiagram from "./Charts/StateDiagram.ts";

try {
let qf = {};
if (fs.existsSync("qf.json")) {
    qf = JSON.parse(fs.readFileSync("qf.json").toString());
}

var temp: any;

if (qf.hasOwnProperty('answer')) {
    //@ts-ignore
    temp = mermaid.default.mermaidAPI.parse(qf.answer).parser.yy;
} else {
    //@ts-ignore
    temp = mermaid.default.mermaidAPI.parse(qf.embeddedAnswer).parser.yy;
}
//const qf.answer qf.embeddedAnswer


//add type and tsconfig and tsnode
switch (temp.graphType) {
  case "flowchart-v2":
    const flowchart = {chart: new FlowChart(temp.getVertices(), temp.getEdges()), chartType: temp.graphType};
    qf = Object.assign(qf, flowchart);
    break;
  case "sequence":
    const sequence = {chart: new SequenceDiagram(temp.getActors(), temp.getMessages()), chartType: temp.graphType};
    qf = Object.assign(qf, sequence);
    break;
  case "classDiagram":
    //to do
    const classDiagram = {chart: new ClassDiagram(temp.getClasses(), temp.getRelations()), chartType: temp.graphType};
    qf = Object.assign(qf, classDiagram);
    break;
  case "stateDiagram":
    const stateDiagram = {chart: StateDiagram(temp.getClasses(), temp.getRelations()), chartType: temp.graphType};
    qf = Object.assign(qf, stateDiagram);
    break;
  case "er":
    const er = {chart: new ERDiagram(temp.getEntities(), temp.getRelationships()), chartType: temp.graphType};
    qf = Object.assign(qf, er);
    break;
  default:
    throw new Error("Error");
}

fs.writeFileSync("qf.json", JSON.stringify(qf));
} catch(Error) {
  console.log("Error!")
}

//write qf object to file