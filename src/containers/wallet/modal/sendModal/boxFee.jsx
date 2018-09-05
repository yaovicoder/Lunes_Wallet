import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setWalletModalStep,
  setWalletSendModalFinalAmount,
  setWalletSendModalLoading,
  setWalletSendModalSelectedFee,
  setWalletSendModalSelectedFeePerByte
} from "../../redux/walletAction";
import { errorInput } from "../../../errors/redux/errorAction";

// COMPONENTS
import ButtonContinue from "./buttonContinue.jsx";

// STYLE
import style from "../../style.css";

class BoxFee extends React.Component {
  constructor() {
    super();
    this.state = {
      error: 0
    };
  }

  calcFee = type => {
    let {
      setWalletSendModalSelectedFee,
      setWalletSendModalSelectedFeePerByte,
      errorInput,
      modal
    } = this.props;

    if (modal.feeValue.fee[type] >= modal.sendAmount) {
      errorInput("Insufficient funds");
      return;
    }

    setWalletSendModalSelectedFee(modal.feeValue.fee[type]);
    setWalletSendModalSelectedFeePerByte(modal.feeValue.feePerByte[type]);
    return;
  };

  confirmFee = () => {
    let {
      modal,
      errorInput,
      setWalletModalStep,
      setWalletSendModalLoading,
      setWalletSendModalFinalAmount
    } = this.props;
    let feeAmount = modal.feeValue.selectedFee;
    let amount = modal.sendAmount - (feeAmount ? feeAmount : 0);

    if (feeAmount) {
      setWalletSendModalLoading();
      setWalletSendModalFinalAmount(amount);
      setWalletModalStep(3);

      return;
    }

    errorInput("Select a Fee");
    return;
  };

  render() {
    let { coin, modal } = this.props;
    let selectedFee = modal.feeValue.selectedFee
      ? modal.feeValue.selectedFee
      : 0;
    let amount = modal.sendAmount - selectedFee;

    return (
      <div className={style.modalBox}>
        <img
          src={"/images/icons/coins/" + coin + ".png"}
          className={style.modalIconCoin}
        />
        <div>
          <span>Voce esta enviando </span>
          <span className={style.totalConfirm}>
            {amount + " " + coin.toUpperCase()}
          </span>
        </div>
        <div>
          <span>para o endereco </span>
          <span className={style.addressConfirm}>{modal.address}</span>
        </div>

        <div className={style.confirmFee}>
          <div>
            Sua taxa de transação na rede <span> {coin.toUpperCase()} </span> é
          </div>
          <div className={style.txtamount}>{selectedFee}</div>
        </div>

        <div className={style.boxFee}>
          <span
            className={style.greenLabelFee}
            onClick={() => this.calcFee("low")}
          >
            Baixa {modal.feeValue.fee.low}
          </span>
          <span
            className={style.yellowLabelFee}
            onClick={() => this.calcFee("medium")}
          >
            Média {modal.feeValue.fee.medium}
          </span>
          <span
            className={style.redLabelFee}
            onClick={() => this.calcFee("high")}
          >
            Alta {modal.feeValue.fee.high}
          </span>
        </div>

        <div className={style.paddingTop8}>
          <ButtonContinue
            action={() => this.confirmFee()}
            loading={modal.loading}
          />
        </div>
      </div>
    );
  }
}

BoxFee.propTypes = {
  modal: PropTypes.object.isRequired,
  coin: PropTypes.string.isRequired,
  coins: PropTypes.array.isRequired,
  errorInput: PropTypes.func.isRequired,
  setWalletModalStep: PropTypes.func.isRequired,
  setWalletSendModalFinalAmount: PropTypes.func.isRequired,
  setWalletSendModalLoading: PropTypes.func.isRequired,
  setWalletSendModalSelectedFee: PropTypes.func.isRequired,
  setWalletSendModalSelectedFeePerByte: PropTypes.func.isRequired
};

const mapSateToProps = store => ({
  modal: store.wallet.modal,
  coins: store.skeleton.coins
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setWalletModalStep,
      setWalletSendModalFinalAmount,
      setWalletSendModalLoading,
      setWalletSendModalSelectedFee,
      setWalletSendModalSelectedFeePerByte,
      errorInput
    },
    dispatch
  );

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(BoxFee);
