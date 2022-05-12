import { Fragment, useState, useEffect } from "react";
import axios from "axios";

import FinishList from './FinishList';
import FinishFilter from "./FinishFilter";
import NewFinish from './NewFinish';
// import EditFinish from './EditFinish';
import Spinner from '../../layout/spinner';
import classses from './FinishModule.module.css';

function FinishModule(props) {
  const [isLoading, setIsLoading] = useState(true);
  //   const [modalIsShown, setModalIsShown] = useState(false);
  const [finishTypes, setFinishTypes] = useState([]);
  const [finishes, setFinishes] = useState(props.finishes);
  const [materials, setMaterials] = useState([]);
  const [stockingLevels, setStockingLevels] = useState([]);
  const [productLines, setProductLines] = useState([]);

  useEffect(() => {
    fetchHandler();
  }, []);

  const fetchHandler = async () => {
    const types = await axios.get("/api/taxonomy");
    setFinishTypes(types.data.filter((type) => type.area === "FinishType"));
    setMaterials(types.data.filter((type) => type.area === "Material"));
    setStockingLevels(
      types.data.filter((type) => type.area === "StockingLevel")
    );
    setProductLines(types.data.filter((type) => type.area === 'ProductLine'));
    setIsLoading(false);
  };

  function filterHandler(finishType) {}

  return (
    <Fragment>
      {/* {modalIsShown && <EditFinish />} */}
      {isLoading && <Spinner /> || (
          <div>
            <FinishFilter
                types={finishTypes}
                materials={materials}
                stocking={stockingLevels}
                productLines={productLines}
                filterHandler={filterHandler}
            />
            <div className={classses.list}>
                <FinishList
                    finishes={finishes} 
                />
            </div>
            <div className={classses.newForm}>
                <NewFinish 
                    types={finishTypes}
                    materials={materials}
                    stockingLevels={stockingLevels}
                    productLines={productLines}
                />
            </div>
        </div>
      )}
    </Fragment>
  );
}

export default FinishModule;
