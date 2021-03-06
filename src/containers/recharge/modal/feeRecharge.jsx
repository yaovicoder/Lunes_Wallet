import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {setModalStep} from "../redux/rechargeAction";
import ButtonContinue from "./component/buttonContinue";
import ModalBar from "../../../components/modalBar";
import Loading from "../../../components/loading";
import i18n from "../../../utils/i18n";
import style from "./style.css";

class FeeRecharge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feeSelect: 0,
      error: undefined,
      errorMsg: ""
    };
  }

  openError = message => {
    this.setState({
      ...this.state,
      error: true,
      errorMsg: message
    });

    setTimeout(() => {
      this.setState({
        ...this.state,
        error: false,
        errorMsg: ""
      });
    }, 4100);
  };

  calcFee(value) {}

  validateForm = () => {
    const { setModalStep } = this.props;

    setModalStep(3);
  };

  render() {
    const { loading } = this.props;
    const { error, errorMsg } = this.state;

    if (loading) {
      return (
        <div className={style.modalBox}>
          <Loading color="lunes" />
        </div>
      );
    } else {
      return (
        <div className={style.modalBox}>
          <div>
            {error ? <ModalBar type="error" message={errorMsg} timer /> : null}
          </div>
          <img
            src={`/images/icons/coins/lunes.png`}
            className={style.modalIconCoin}
          />
          <div>
            <span>{i18n.t("PAYMENT_FEE_TEXT_1")}</span>
            <span className={style.totalConfirm}>5000 LUNES</span>
          </div>
          <div>
            <span>{i18n.t("PAYMENT_FEE_TEXT_2")}</span>
            <span className={style.addressConfirm}>
              {i18n.t("PAYMENT_MODAL_TITLE")}
            </span>
          </div>

          <div className={style.confirmFee}>
            <div>
              {i18n.t("PAYMENT_FEE_AMOUNT")}
              <span> lunes </span> é
            </div>
            <div className={style.txtamount}>0.001</div>
          </div>

          <div className={style.boxFee}>
            <span
              className={style.greenLabelFee}
              onClick={() => this.calcFee(0.001)}
            >
              {i18n.t("FEE_LOW")} 0.001
            </span>
            <span
              className={style.yellowLabelFee}
              onClick={() => this.calcFee(0.001)}
            >
              {i18n.t("FEE_MEDIUM")} 0.001
            </span>
            <span
              className={style.redLabelFee}
              onClick={() => this.calcFee(0.001)}
            >
              {i18n.t("FEE_HIGHT")} 0.001
            </span>
          </div>

          <ButtonContinue
            label={i18n.t("BTN_CONTINUE")}
            action={() => this.validateForm()}
            loading={loading}
          />
        </div>
      );
    }
  }
}

FeeRecharge.propTypes = {
  loading: PropTypes.bool.isRequired,
  wallet: PropTypes.object.isRequired,
  setModalStep: PropTypes.func,
  getFeePayment: PropTypes.func,
  setFeePayment: PropTypes.func
};

const mapStateToProps = store => ({
  loading: store.recharge.loading,
  wallet: store.skeleton
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setModalStep
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeeRecharge);
