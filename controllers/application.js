/**
 * GET /
 * Application page.
 */
exports.getApi = (req, res) => {
  res.render('api/checkmate', {
    title: 'Application'
  });
};
