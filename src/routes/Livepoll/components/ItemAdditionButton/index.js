import React from "react";
import Loadable from "react-loadable";

import ModalOpenerButton from "../../../../components/modal-openers/ModalOpenerButton/ModalOpenerButton";
import LPLoader from "../../../../components/loaders/LPLoader";

const CreateItemForm = Loadable({
  loader: ()=>import('../ItemCreationForm'),
  loading: LPLoader,
});

const ItemAdditionButton = ({pollId, itemFormat, className}) => (
  <ModalOpenerButton
    className={className}
    ModalComponent={CreateItemForm}
    childProps={{ pollId, format: itemFormat }}
  >+ADD</ModalOpenerButton>
);

export default ItemAdditionButton