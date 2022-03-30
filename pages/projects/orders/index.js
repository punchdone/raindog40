import React, { useEffect } from "react";
import { parse } from "papaparse";
import axios from "axios";

import classes from "./index.module.css";

function OrderDrop() {
  const [highlighted, setHighlighted] = React.useState(false);
  const [lines, setLines] = React.useState([]);
  const [customer, setCustomer] = React.useState({});
  const [channels, setChannels] = React.useState([]);
  const [geographies, setGeographies] = React.useState([]);
  const [channelCode, setChannelCode] = React.useState({});
  const channelInputRef = React.useRef();
  const geographyInputRef = React.useRef();

  async function fetchHandler(dealerName) {
    try {
      let [channels, geographies] = await Promise.all([
        fetch("https://live-raindog.pantheonsite.io/api/channel"),
        fetch("/api/geography"),
      ]);
      const channelData = await channels.json();
      const geographyData = await geographies.json();
      const sortedChannels = channelData.sort((a, b) => {
        if (a.code < b.code) {
          return -1;
        }
        if (a.code > b.code) {
          return 1;
        }
        return 0;
      });
    //   console.log("dealerName = " + dealerName);
      const channelCode = channelData.find(
        ({ company }) => company === dealerName
      );
      console.log(channelCode);
    //   console.log(sortedChannels);
      setChannels(sortedChannels);
      setChannelCode(channelCode);
      setGeographies(geographyData);
    } catch (error) {
      console.log(error.message);
    }
  }

  const channelOptions = channels.map((channel) => (
    <option key={channel.nid} value={channel.nid}>
      {channel.code} - {channel.company}
    </option>
  ));

  const geographyOptions = geographies.map((geography) => (
    <option key={geography._id} value={geography._id}>
      {geography.areaName}
    </option>
  ));

  const dropFileHandler = (e) => {
    e.preventDefault();
    setHighlighted(false);
    let lineEntryArray = [];

    Array.from(e.dataTransfer.files)
      //.filter((file) => file.type === "text/ord")
      .forEach(async (file) => {
        const text = await file.text();
        // console.log(text);
        const nameLocation = text.indexOf("Name=");
        const descriptionLocation = text.indexOf("Description=");
        const poLocation = text.indexOf("PurchaseOrder=");
        const commentLocation = text.indexOf("Comment=");
        const customerLocation = text.indexOf("Customer=");
        const contactLocation = text.indexOf("Contact=");
        const baseDoorLocation = text.indexOf("BaseDoors=");
        const wallDoorLocation = text.indexOf("WallDoors=");
        const drawerFrontLocation = text.indexOf("DrawerFront=");
        const baseEndPanelLocation = text.indexOf("BaseEndPanels=");
        const hingeLocation = text.indexOf("HingeMaterials=");
        const guideLocation = text.indexOf("GuideMaterials=");
        const finishLocation = text.indexOf("ExteriorFinish=");
        const baseMaterialLocation = text.indexOf("BaseCabinetMaterials=");
        const wallMaterialLocation = text.indexOf("WallCabinetMaterials=");

        const projectNum = text.slice(
          nameLocation + 6,
          descriptionLocation - 3
        );
        // console.log("projectNum = " + projectNum);
        const projectName = text.slice(
          descriptionLocation + 13,
          poLocation - 3
        );
        // console.log("projectName = " + projectName);
        const poNum = text.slice(poLocation + 15, commentLocation - 3);
        // console.log("poNum = " + poNum);
        const roomName = text.slice(commentLocation + 9, customerLocation - 3);
        // console.log("roomName = " + roomName);
        const dealerName = text.slice(
          customerLocation + 10,
          contactLocation - 3
        );
        // console.log("dealerName = " + dealerName);
        const details = text.slice(baseDoorLocation + 11, wallDoorLocation - 3);
        const doorEndLocation = details.indexOf(",") - 1;
        const doorStyle = details.slice(0, doorEndLocation);
        // console.log("doorStyle = " + doorStyle);
        // const interimDetail = details.slice(doorEndLocation + 3);
        // const material = interimDetail.slice(0, interimDetail.indexOf(',') - 1 );
        // console.log('material = ' + material);
        const drawerFrontLong = text.slice(
          drawerFrontLocation + 13,
          baseEndPanelLocation - 3
        );
        const drawerEndLocation = drawerFrontLong.indexOf(",") - 1;
        const drawerFront = drawerFrontLong.slice(0, drawerEndLocation);
        // console.log("drawerFront = " + drawerFront);
        const hinge = text.slice(hingeLocation + 16, guideLocation - 3);
        const guide = text.slice(guideLocation + 16, finishLocation - 3);
        // console.log("guide = " + guide);
        const material = text.slice(
          baseMaterialLocation + 22,
          wallMaterialLocation - 3
        );
        // console.log("material = " + material);
        const finishLong = text.slice(finishLocation + 16);
        const finishEndLocation = finishLong.indexOf('"');
        const finish = finishLong.slice(0, finishEndLocation);
        // console.log("finish = " + finish);

        setCustomer({
          projectNum,
          projectName,
          poNum,
          roomName,
          dealerName,
          doorStyle,
          drawerFront,
          hinge,
          guide,
          material,
          finish,
        });

        // console.log("dealerName = " + dealerName);
        fetchHandler(dealerName);

        // console.log('location = ' + location);
        // let cabinetList = text.split('[Cabinets]').pop();
        // console.log(cabinetList);
        // const result = parse(cabinetList);
        // console.log(result.data);
        // // const result = parse(text, { header: true });
        // setLines([result.data]);

        // const lineCount = text.split('[Cabinets]').length - 1;
        // console.log('lineCount = ' + lineCount);
        // const lineIndex = text.indexOf('[Cabinets]');
        // console.log('lineIndex = ' + lineIndex);
        let startIndex = 0,
          index,
          indices = [];
        // let breakLength = ('[Cabinets]').length;
        // console.log('[Cabinets] length = ' + breakLength);
        // let lines = [];
        let newLine = {};
        while ((index = text.indexOf("[Cabinets]", startIndex)) > -1) {
          indices.push(index);
          startIndex = index + "[Cabinets]".length;
        }
        return indices.forEach((x, i) => {
          // console.log(i, x, indices[i - 1], parse(text.slice(indices[i - 1] + 10, x)));
          if (i > 0) {
            newLine = parse(text.slice(indices[i - 1] + 10, x)).data;
            newLine.shift();
            newLine.pop();
            // console.log(newLine);
            setLines((prevState) => [...prevState, newLine]);
          }
        });
      });
  };

  const productionSubmitHandler = async () => {

    const projectTitle = customer.dealerName + '-' + customer.projectName;
    console.log(projectTitle);

    const response = await axios.post("/api/projects/raindog", { 'title': projectTitle });
    console.log('response = ');
    console.log(response);
    console.log('nid = ' + response.data.nid);

    const fullProject = await axios('/api/projects/raindog/' + response.data.nid);
    console.log('WO project # = ' + fullProject.data.field_wo_project_num.und[0].value);

    setCustomer((prevState) => {
      return { ... prevState, 
        woProjectNum: fullProject.data.field_wo_project_num.und[0].value,
        nid: response.data.nid
      }
    }, {async function() {
      console.log('customer = ');
      console.log(customer);
      const newOrder = await axios.post('/api/projects', customer);
      console.log('newOrder = ' + newOrder.data._id);
    }});
    

    const newOrder = await axios.post('/api/projects', customer);
    console.log('newOrder = ' + newOrder.data._id);
    
    let lineArray = [];
    lines.map((line) => {
      console.log('comment = ' + line[0][8]);
      lineArray.push({
        "lineNum": line[0][0],
        "configCode": line[0][1],
        "quantity": line[0][7],
        "width": line[0][2],
        "height": line[0][3],
        "depth": line[0][4],
        "hinging": line[0][5],
        "ends": line[0][6],
        "comment": line[0][8]
      })
    });
    // console.log(lineArray);

    let lineEntryArray = [];
    lineArray.map(async (line) => {
      const lineResponse = await axios.post("/api/projects/" + newOrder.data._id + "/lines", line);
      lineEntryArray.push({ '_id': lineResponse.data._id });
      // console.log('lineId = ' + lineResponse.data._id);
    });

    alert("Went to get production number!");
  };

  const handleChannelChange = (e) => {
    setCustomer((prevState) => {
      return { ... prevState, channelCode: e.target.value }
    });
  };

  const handleGeographyChange = (e) => {
    setCustomer((prevState) => {
      return { ... prevState, geography: e.target.value }
    });
  };

  return (
    <div>
      {/* <h2 className='text-center'>This is where I am going to drop orders.</h2> */}
      {/* <div
                className={`p-6 my-2 mx-auto max-w-md border-2 ${
                highlighted ? "border-green-600 bg-green-100" : "border-gray-600"
                }`}
                onDragEnter={() => {
                setHighlighted(true);
                }}
                onDragLeave={() => {
                setHighlighted(false);
                }}
                onDragOver={(e) => {
                e.preventDefault();
                }}
                onDrop={(e) => {
                    dropFileHandler(e)
                }}
                // e.preventDefault();
                // console.log(e.dataTransfer.files);
                // setHighlighted(false);

                // Array.from(e.dataTransfer.files)
                //     //.filter((file) => file.type === "text/ord")
                //     .forEach(async (file) => {
                //     const text = await file.text();
                //     console.log(text);
                //     let location = text.indexOf('[Cabinets]')
                //     console.log('location = ' + location);
                //     let cabinetList = text.split('[Cabinets]').pop();
                //     console.log(cabinetList);
                //     const result = parse(cabinetList);
                //     console.log(result.data);
                //     // const result = parse(text, { header: true });
                //     setCabinets([result.data]);

                //     const lineCount = text.split('[Cabinets]').length - 1;
                //     console.log('lineCount = ' + lineCount);
                //     const lineIndex = text.indexOf('[Cabinets]');
                //     console.log('lineIndex = ' + lineIndex);
                //     let startIndex = 0, index, indices = [];
                //     let breakLength = ('[Cabinets]').length;
                //     console.log('[Cabinets] length = ' + breakLength);
                //     let lines = [];
                //     let line = [];
                //     while ((index = text.indexOf('[Cabinets]', startIndex)) > -1) {
                //         indices.push(index);
                //         startIndex = index + ('[Cabinets]').length;
                //     }
                //     return indices.forEach((x, i) => {
                //         // console.log(i, x, indices[i - 1], parse(text.slice(indices[i - 1] + 10, x)));
                //         line = parse(text.slice(indices[i - 1] + 10, x)).data;
                //         line.shift();
                //         line.pop()
                //         console.log(line);
                //         lines.push(line);
                //     });
                    
                //     });
                // }}
            >
                DROP HERE
            </div> */}

      {/* <ul>
            {contacts.map((contact) => (
            <li key={contact.email}>
                <strong>{contact.name}</strong>: {contact.email}
            </li>
            ))}
        </ul> */}
      <div className={classes.production}>
        <div
          className={classes.dropZone}
          onDragEnter={() => {
            setHighlighted(true);
          }}
          onDragLeave={() => {
            setHighlighted(false);
          }}
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={(e) => {
            dropFileHandler(e);
          }}
        >
          Drop .ORD File Here
        </div>
        <button onClick={productionSubmitHandler}>Submit to Production</button>
      </div>
      <div className={classes.orderHeader}>
        <h2>Wynnbrooke/David Bradley Cabinet Order</h2>
        <div className={classes.headerLine}>
          <div className={classes.headerLabel}>Project#</div>
          <div className={classes.headerItem}>{customer.projectNum}</div>
        </div>
        <div className={classes.headerLine}>
          <div className={classes.headerLabel}>PO#</div>
          <div className={classes.headerItem}>{customer.poNum}</div>
        </div>
        <div className={classes.headerLine}>
          <div className={classes.headerLabel}>Dealer Name</div>
          <div className={classes.headerItem}>{customer.dealerName}</div>
          <select
            className={classes.channelDrop}
            ref={channelInputRef}
            value={channelCode.nid}
            onChange={handleChannelChange}
          >
            {channelOptions}
          </select>
        </div>
        <div className={classes.headerLine}>
          <div className={classes.headerLabel}>Project Name</div>
          <div className={classes.headerItem}>{customer.projectName}</div>
        </div>
        <div className={classes.headerLine}>
          <div className={classes.headerLabel}>Room Name</div>
          <div className={classes.headerItem}>{customer.roomName}</div>
        </div>
        <div className={classes.headerLine}>
            <label htmlFor="geography" className={classes.headerLabel}>
            Geography
            </label>
            <select
            className={classes.formy}
            ref={geographyInputRef}
            defaultValue='623c9a48faba581e4ff4cdeb'
            onChange={handleGeographyChange}
            >
            {geographyOptions}
            </select>
        </div>
        <p></p>
        <div className={classes.headerLine}>
          <div className={classes.headerLabel}>Door Style</div>
          <div className={classes.headerItem}>{customer.doorStyle}</div>
        </div>
        <div className={classes.headerLine}>
          <div className={classes.headerLabel}>Drawer Front</div>
          <div className={classes.headerItem}>{customer.drawerFront}</div>
        </div>
        <div className={classes.headerLine}>
          <div className={classes.headerLabel}>Hinge</div>
          <div className={classes.headerItem}>{customer.hinge}</div>
        </div>
        <div className={classes.headerLine}>
          <div className={classes.headerLabel}>Guide</div>
          <div className={classes.headerItem}>{customer.guide}</div>
        </div>
        <div className={classes.headerLine}>
          <div className={classes.headerLabel}>Material</div>
          <div className={classes.headerItem}>{customer.material}</div>
        </div>
        <div className={classes.headerLine}>
          <div className={classes.headerLabel}>Finish</div>
          <div className={classes.headerItem}>{customer.finish}</div>
        </div>
        {/* <p>PO#: {customer.poNum}</p>
            <p>Dealer: {customer.dealerName}</p>
            <p>Project Name: {customer.projectName}</p>
            <p>Room Name: {customer.roomName}</p> */}
      </div>
      <div className={classes.lineHeader}>
        <div>Line #</div>
        <div>Code</div>
        <div>Quantity</div>
        <div>Width</div>
        <div>x</div>
        <div>Height</div>
        <div>x</div>
        <div>Depth</div>
        <div>Hinging</div>
        <div>Ends</div>
        <div>Comment</div>
      </div>
      <ul>
        {lines.map((line) => (
          <div className={classes.line}>
            <div>{line[0][0]}</div>
            <div>{line[0][1]}</div>
            <div>{line[0][7]}</div>
            <div>{line[0][2]}</div>
            <div>x</div>
            <div>{line[0][3]}</div>
            <div>x</div>
            <div>{line[0][4]}</div>
            <div>{line[0][5]}</div>
            <div>{line[0][6]}</div>
            <div className={classes.notes}>{line[0][8]}</div>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default OrderDrop;
