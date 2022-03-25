import { useRouter } from "next/router";
import Head from "next/head";
import { Fragment } from "react";

import NewBackorderForm from "../../components/backorders/NewBackorderForm";

function NewBackorderPage() {
  const router = useRouter();

  async function addBackorderHandler(enteredBackorderData) {
    console.log('And, upstream...');
    console.log(enteredBackorderData);
    const response = await fetch("/api/backorders", {
      method: "POST",
      body: JSON.stringify(enteredBackorderData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);

    router.push("/backorders");
  }

//   async function getChannels() {
//     let channels = [];
//     const response = await fetch(
//       "https://live-raindog.pantheonsite.io/api/channel"
//     );
//     console.log(response);
//     return (channels = await response.json());
//   }

  return (
    <Fragment>
      <Head>
        <title>Add a new backorder</title>
        <meta
          name="description"
          content="Add backorder information and keep track of existing backorders"
        />
      </Head>
      <NewBackorderForm
        onAddBackorder={addBackorderHandler}
      />
    </Fragment>
  );
}

export default NewBackorderPage;
