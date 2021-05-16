class NewsController {
    // [GET] /new
    index(req, res) {
        res.render('new');
    }

    // [GET] /new/:id
    show(req, res) {
        res.send('new Detail!!');
    }
}
module.exports = new NewsController();
