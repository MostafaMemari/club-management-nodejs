const autoBind = require("auto-bind");

class PanelController {
  constructor() {
    autoBind(this);
  }
  async main(req, res, next) {
    try {
      res.render("./pages/panel/main.ejs");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PanelController();
