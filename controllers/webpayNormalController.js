const Transbank = require("transbank-sdk");

exports.webpayPlusControllerInit = (req, res, next) => {
    const configuration = Transbank.Configuration.forTestingWebpayPlusNormal();
    let Webpay = new Transbank.Webpay(configuration).getNormalTransaction();
    let url = "http://" + req.get("host");
    let amount = req.params.price;

    Webpay.initTransaction(
      9999,
      Math.round(Math.random()*999999999),
      req.sessionId,
      url + '/webpay-normal/response',
      url + '/webpay-normal/finish'
    )
    .then((data) => {
      res.render('redirect-transbank', { url: data.url, token: data.token, inputName: "TBK_TOKEN" });
    });
};

exports.webpayPlusControllerResponse = (req, res, next) => {
  const configuration = Transbank.Configuration.forTestingWebpayPlusNormal();
  let Webpay = new Transbank.Webpay(configuration).getNormalTransaction();
  let token = req.body.token_ws;
  Webpay.getTransactionResult(token)
  .then(response => {
    res.render('redirect-transbank', { url: response.urlRedirection, token, inputName: "token_ws" });
  })
  .catch((e) => {
    console.log(e)
    res.send('Error');
  })
};



/*
Webpay.initTransaction (
  amount,
  Math.round(Math.random()*999999999),
  req.sessionId,

)
*/
