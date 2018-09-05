import React from "react";
import PropTypes from "prop-types";

// REDUX 
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {nomeDaFuncao} from "../redux/paymentAction";


// UTILS
import i18n from "../../../utils/i18n";

// STYLES
import style from "./style.css";

// MATERIAL
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";

// COMPONENTS
import CustomSwitch from "./component/customSwitch";
import ButtonContinue from "./component/buttonContinue";

class DetailsPayment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  validateForm = () => {
    const {handleStep} = this.props;
    // validar gpdr etc 
    
    // atualizar reducer com o proximo modal 
    handleStep("next"); // aqui tem que ser chamado redux
  }

  render() {
    const { loading, payment } = this.props;
    return (
      <div className={style.modalBox}>
        {i18n.t("PAYMENT_DETAILS_TEXT_1")}
        <div className={style.strongText} style={{ marginTop: 20 }}>
          <span className={style.textGreen}>{payment.amount} {payment.coin}</span>
          {i18n.t("PAYMENT_DETAILS_TEXT_2")}
          <span className={style.textGreen}>R$ {payment.value}</span>
          {i18n.t("PAYMENT_DETAILS_TEXT_3")}
        </div>
        <Grid container className={style.inlineInfo}>
          <Grid item xs={6} md={3}>
            <label className={style.inlineInfoLabel}>{i18n.t("PAYMENT_TITLE_BANK")}</label>
            {payment.bank}
          </Grid>
          <Grid item xs={6} md={3}>
            <label className={style.inlineInfoLabel}>{i18n.t("PAYMENT_TITLE_NAME")}</label>
            {payment.name}
          </Grid>
          <Grid item xs={6} md={2}>
            <label className={style.inlineInfoLabel}>{i18n.t("PAYMENT_TITLE_DATE")}</label>
            {payment.dateend}
          </Grid>
          <Grid item xs={6} md={2}>
            <label className={style.inlineInfoLabel}>{i18n.t("PAYMENT_TITLE_DOC")}</label>
            {payment.doc}
          </Grid>
          <Hidden smDown>
            <Grid item xs={6} md={2}>
              <label className={style.inlineInfoLabel}>{i18n.t("PAYMENT_TITLE_VALUE")}</label>
              R$ {payment.value}
            </Grid>
          </Hidden>
        </Grid>
        <CustomSwitch
          title={i18n.t("GDPR_TITLE")}
          description={i18n.t("GDPR_DESC")}
          action={() => alert("teste")}
          checked={this.state["check1"]}
        />

        <ButtonContinue 
          label={i18n.t("BTN_CONFIRM")}
          action={()=>this.validateForm()}
          loading={loading} 
        />

      </div>
    );
  }
}

const mapStateToProps = store => ({
  payment: store.payment.payment,
  loading: store.payment.loading
});

const mapDispatchToProps = dispatch =>bindActionCreators(
  {
    nomeDaFuncao
  }, 
  dispatch
);

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(DetailsPayment);
