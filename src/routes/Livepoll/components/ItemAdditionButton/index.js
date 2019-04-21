import React from "react";
import { withStyles } from '@material-ui/core/styles/index';
import Loadable from "react-loadable";

import ModalOpenerButton from "../../../../components/modal-openers/ModalOpenerButton/ModalOpenerButton";
import LPLoader from "../../../../components/loaders/LPLoader";
import styles from './styles'

const CreateItemForm = Loadable({
  loader: ()=>import('../ItemCreationForm'),
  loading: LPLoader,
});

const ItemAdditionButton = ({pollId, itemFormat, classes}) => (
  <ModalOpenerButton
    className={`${classes.option} ${classes.addButton} fl`}
    ModalComponent={CreateItemForm}
    childProps={{ pollId, format: itemFormat }}
  >+ADD</ModalOpenerButton>
);

export default withStyles(() => styles) (ItemAdditionButton)