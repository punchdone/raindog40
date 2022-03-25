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
    //   console.log(channelCode);
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
        let newLine = [];
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

    console.log(customer);
    console.log(lines);

    // const projectData = {
    //     "title_field": {
    //         "und": [
    //             { "value": "Inside of the React Component" }
    //         ]
    //     },
    //     "type": "wo_projects"
    // };

    // const tokenFetch = await axios.post('https://dev-raindog.pantheonsite.io/rest/user/token.json');
    // const token = tokenFetch.data.token;
    // console.log(token);
    // const loginDetails = { username: 'sreader', password: 'rudy4joy'};
    // const headers = {
    //     'Content-Type': 'application/json',
    //     'X-CSRF-token': token
    // };

    // const projectList = await axios.get('https://dev-raindog.pantheonsite.io/rest/nodes.json', { headers });
    // console.log(projectList);
    // const userLogin = await axios.post('https://dev-raindog.pantheonsite.io/rest/user/login.json', loginDetails, headers);
    // console.log(userLogin);
    // await fetch('https://dev-raindog.pantheonsite.io/rest/user/token.json', {
    //     method: 'POST',
    //     mode: 'cors',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // }).then((response) => {
    //     console.log(response);
    // }).catch((error) => {
    //     alert('Problem while getting token!');
    // });
    // const nodes = await fetch('https://dev-raindog.pantheonsite.io/rest/nodes.json');
    // // const nodeData = await nodes.json();
    // console.log(nodes);
    // const token = await fetch("https://dev-raindog.pantheonsite.io/rest/user/token.json", {
    //     method: "POST",
    //     // body: {
    //     //     "username": "sreader",
    //     //     "password": "rudy4joy"
    //     // },
    //     headers: {
    //         "Content-Type": "application/json",
    //         // "Access-Control-Allow-Origin": "*"
    //     }
    // });
    // console.log(token);
    // const sessionId = await token.json();
    // console.log('sessionId = ' + sessionId);
    // console.log(sessionId);
    // const token = 'G_mx_4TNEv6wAVT45phg1KDgpbHT7muMmBI230CPwIE';
    // const cookie = 'JxYwrJQ1Z8Lre9kBXnFkOYJSVCUpiYr38TWVYS_gXzI';
    // const userLogin = await fetch('https://dev-raindog.pantheonsite.io/rest/user/login.json', {
    //     method: "POST",
    //     body: {
    //         "username": "sreader",
    //         "password": "rudy4joy"
    //     },
    //     headers: {
    //         "Content-Type": "application/json",
    //         "X-CSRF-Token": token
    //     }
    // });
    // console.log(userLogin);

    // const response4 = await axios('/api/projects');
    // // const apiResponse4 = await response4.json();
    // console.log(response4.data);

    // const response = await fetch('https://dev-raindog.pantheonsite.io/rest/node.json')
    // const data = await response.json();
    // console.log(data);

    // const response2 = await axios('https://dev-raindog.pantheonsite.io/rest/node.json');
    // // const apiResponse2 = response2.data.json();
    // console.log(response2.data);
    const projectTitle = customer.dealerName + '-' + customer.projectName;
    console.log(projectTitle);
    const response = await axios.post("/api/projects", { 'title': projectTitle });
    console.log(response.data.nid);
    const fullProject = await axios('/api/projects/' + response.data.nid + '.json');
    console.log(fullProject);

    // const response3 = await axios.post('https://dev-raindog.pantheonsite.io/rest/node.json', { type: 'wo_projects' });
    // console.log(response3);

    // const response3 = await axios.post('/api/projects', projectData);
    // console.log(response3);

    // const addItem = await axios.post('https://dev-raindog.pantheonsite.io/rest/node.json', { "title": "Fighting it!" });
    // console.log(addItem);
    // const presponse = await fetch('https://dev-raindog.pantheonsite.io/rest/node.json', {
    //     method: "POST",
    //     body: JSON.stringify(projectData),
    //     // body: projectData,
    //     // body: {"title_field": "From inside react"},
    //     headers: {
    //         "Content-Type": "application/json",
    //         // "X-CSRF-Token": token,
    //         // "Cookie": cookie
    //     }
    // });
    // const pdata = await presponse.json();
    // console.log(pdata);
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
            defaultValue={channelCode.nid}
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
