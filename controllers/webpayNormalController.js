const Transbank = require("transbank-sdk");

exports.webpayPlusControllerInit = (req, res, next) => {
    const configuration = Transbank.Configuration.forTestingWebpayPlusNormal();
    let Webpay = new Transbank.Webpay(configuration).getNormalTransaction();
    let url = "http://" + req.get("host");
    let amount = req.params.price;

    Webpay.initTransaction (
      amount,
      Math.round(Math.random()*999999999),
      req.sessionId,
      
    )
    console.log(url);
    console.log(amount);
};
