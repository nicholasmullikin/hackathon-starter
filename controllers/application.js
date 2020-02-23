/**
 * GET /
 * Application page.
 */
exports.getApi = (req, res) => {
  res.render('api/stars', {
    title: 'Application'
  });
};
