/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  res.render('intro', {
    title: 'Home'
  });
};
